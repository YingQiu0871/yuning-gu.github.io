import sys, json
import numpy as np, cv2
from PIL import Image
src, outdir = sys.argv[1], sys.argv[2]
eps = float(sys.argv[3]) if len(sys.argv) > 3 else 3.5
img = cv2.cvtColor(np.array(Image.open(src).convert('RGB')), cv2.COLOR_RGB2BGR)
H, W = img.shape[:2]

# 1. cut the figure out of the sea
mask = np.full((H, W), cv2.GC_PR_BGD, np.uint8)
mask[:250, :] = cv2.GC_BGD; mask[:, :190] = cv2.GC_BGD; mask[:, 800:] = cv2.GC_BGD
prob = np.array([[470,280],[620,285],[650,420],[670,470],[760,640],[785,820],[720,1069],[310,1069],[215,780],[250,640],[330,540],[415,470],[450,330]], np.int32)
cv2.fillPoly(mask, [prob], cv2.GC_PR_FGD)
sure = np.array([[490,320],[600,320],[620,440],[600,520],[680,640],[700,860],[640,1060],[380,1060],[290,800],[320,640],[420,540],[470,440]], np.int32)
cv2.fillPoly(mask, [sure], cv2.GC_FGD)
bgd = np.zeros((1, 65), np.float64); fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(img, mask, None, bgd, fgd, 6, cv2.GC_INIT_WITH_MASK)
fg = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((7, 7), np.uint8))
fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
n, lab, stats, _ = cv2.connectedComponentsWithStats(fg)
big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]); fg = np.where(lab == big, 255, 0).astype(np.uint8)

# 2. flatten to four tones
smooth = cv2.bilateralFilter(img, 13, 60, 60); smooth = cv2.medianBlur(smooth, 11)
hsv = cv2.cvtColor(smooth, cv2.COLOR_BGR2HSV); gray = cv2.cvtColor(smooth, cv2.COLOR_BGR2GRAY)
h, s, v = cv2.split(hsv)
red = ((h >= 6) & (h <= 28) & (s > 105) & (v > 70)).astype(np.uint8) * 255
dark = (gray < 78).astype(np.uint8) * 255
mid = ((gray >= 78) & (gray < 150)).astype(np.uint8) * 255
red = cv2.bitwise_and(red, fg); red = cv2.morphologyEx(red, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
dark = cv2.bitwise_and(dark, fg)
mid = cv2.bitwise_and(cv2.bitwise_and(mid, fg), cv2.bitwise_not(red))
dark = cv2.medianBlur(dark, 5); mid = cv2.medianBlur(mid, 9); red = cv2.medianBlur(red, 9)
# the face is drawn again at four times the size, so its features survive:
# line marks (eyes, brows, nostrils, mouth, spectacle frames) and a soft shade tone
FX0, FY0, FX1, FY1, K = 450, 330, 640, 520, 4
fgray = cv2.cvtColor(img[FY0:FY1, FX0:FX1], cv2.COLOR_BGR2GRAY)
up = cv2.resize(fgray, None, fx=K, fy=K, interpolation=cv2.INTER_CUBIC)
upb = cv2.GaussianBlur(up, (7, 7), 0)
oval = np.zeros_like(up); cv2.ellipse(oval, ((543 - FX0) * K, (420 - FY0) * K), (80 * K, 98 * K), 0, 0, 360, 255, -1)
fgup = cv2.resize(fg[FY0:FY1, FX0:FX1], None, fx=K, fy=K, interpolation=cv2.INTER_NEAREST)
oval = cv2.bitwise_and(oval, fgup)
lines = cv2.adaptiveThreshold(upb, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 45, 11)
lines = cv2.bitwise_or(lines, (upb < 62).astype(np.uint8) * 255)
lines = cv2.bitwise_and(lines, oval)
lines = cv2.morphologyEx(lines, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
lines = cv2.medianBlur(lines, 7)
# tidy the lower face: the ears and the chin carry no marks, and the mouth is one clean lip line
def box(x0b, y0b, x1b, y1b):
    return (slice((y0b - FY0) * K, (y1b - FY0) * K), slice((x0b - FX0) * K, (x1b - FX0) * K))
inner = np.zeros_like(up); cv2.ellipse(inner, ((541 - FX0) * K, (418 - FY0) * K), (70 * K, 96 * K), 0, 0, 360, 255, -1)
band = np.zeros_like(up); band[box(FX0, 372, FX1, 412)] = 255          # the spectacle band keeps its full width
lines = cv2.bitwise_and(lines, cv2.bitwise_or(inner, band))
mouth = box(506, 440, 590, 470)
lip = cv2.adaptiveThreshold(cv2.GaussianBlur(up, (13, 13), 0), 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 61, 9)[mouth]
lip = cv2.morphologyEx(lip, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
nl, ll, sl, _ = cv2.connectedComponentsWithStats(lip)
keep = np.zeros_like(lip)
if nl > 1:
    # the lip line is the widest mark in the box
    widest = 1 + int(np.argmax(sl[1:, cv2.CC_STAT_WIDTH]))
    keep[ll == widest] = 255
    keep = cv2.morphologyEx(keep, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    # keep only the lip line itself: in each column, the first run of the mark, at most 22px deep
    for cx in range(keep.shape[1]):
        col = np.flatnonzero(keep[:, cx])
        if col.size: keep[col[0] + 22:, cx] = 0
    keep = cv2.medianBlur(keep, 7)
lines[box(FX0, 438, FX1, FY1)] = 0
lines[mouth] = keep
wide = cv2.GaussianBlur(up, (31, 31), 0)
local = cv2.blur(wide, (301, 301))
shade = ((wide.astype(np.int16) < local.astype(np.int16) - 3) & (wide > 95)).astype(np.uint8) * 255
shade = cv2.bitwise_and(shade, oval)
shade = cv2.medianBlur(shade, 21)
shade[box(FX0, 436, FX1, FY1)] = 0   # no shade below the nose: it read as stubble
shade = cv2.bitwise_and(shade, inner)
roi = np.zeros((H, W), np.uint8); cv2.ellipse(roi, (543, 420), (80, 98), 0, 0, 360, 255, -1)
mid = cv2.bitwise_and(mid, cv2.bitwise_not(roi))
def face_polys(m, e, min_area):
    cs, _ = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        a2 = cv2.approxPolyDP(c, e, True)
        if len(a2) >= 3: out.append(a2.reshape(-1, 2).astype(np.float32) / K + np.array([FX0, FY0], np.float32))
    return out

# 3. hard-edged polygons
def polys(m, e, min_area):
    cs, hier = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        a = cv2.approxPolyDP(c, e, True)
        if len(a) >= 3: out.append(a.reshape(-1, 2))
    return out
layers = [('light', polys(fg, eps * 1.4, 2000)), ('shade', face_polys(shade, 5.0, 900)), ('mid', polys(mid, eps, 220)), ('red', polys(red, eps, 260)), ('dark', polys(dark, eps * 0.7, 60)), ('lines', face_polys(lines, 1.6, 150))]

x0, y0, wbox, hbox = cv2.boundingRect(fg)
def d(ps):
    return ' '.join('M' + ' L'.join(f'{round(float(x - x0), 1):g} {round(float(y - y0), 1):g}' for x, y in p) + ' Z' for p in ps)
shapes = {name: d(ps) for name, ps in layers}
json.dump({'width': int(wbox), 'height': int(hbox), 'shapes': shapes}, open(outdir + '/portrait.json', 'w'))

# preview
cols = {'light': (168, 231, 246), 'shade': (120, 180, 222), 'mid': (150, 120, 70), 'red': (30, 60, 215), 'dark': (34, 26, 11), 'lines': (34, 26, 11)}
prev = np.full((H * 3, W * 3, 3), (60, 40, 20), np.uint8)
for name, ps in layers:
    layer = np.zeros((H * 3, W * 3), np.uint8)
    cv2.fillPoly(layer, [np.round(p * 3).astype(np.int32) for p in ps], 255)
    prev[layer > 0] = cols[name]
cv2.imwrite(outdir + '/portrait-preview.png', prev[y0 * 3:(y0 + hbox) * 3, x0 * 3:(x0 + wbox) * 3])
cv2.imwrite(outdir + '/portrait-face.png', prev[FY0 * 3:FY1 * 3, FX0 * 3:FX1 * 3])
print(wbox, hbox, {k: (len(ps), sum(len(p) for p in ps)) for k, ps in layers}, sum(len(v) for v in shapes.values()))
