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
# the face keeps its fine marks (spectacle frames, brows, mouth) from a lightly smoothed copy
fine = cv2.cvtColor(cv2.GaussianBlur(img, (3, 3), 0), cv2.COLOR_BGR2GRAY)
roi = np.zeros((H, W), np.uint8); roi[345:500, 462:622] = 255
detail = cv2.bitwise_and(cv2.bitwise_and((fine < 92).astype(np.uint8) * 255, roi), fg)
detail = cv2.morphologyEx(detail, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
mid = cv2.bitwise_and(mid, cv2.bitwise_not(roi))

# 3. hard-edged polygons
def polys(m, e, min_area):
    cs, hier = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        a = cv2.approxPolyDP(c, e, True)
        if len(a) >= 3: out.append(a.reshape(-1, 2))
    return out
layers = [('light', polys(fg, eps * 1.4, 2000)), ('mid', polys(mid, eps, 220)), ('red', polys(red, eps, 260)), ('dark', polys(dark, eps * 0.7, 60) + polys(detail, 1.1, 14))]

x0, y0, wbox, hbox = cv2.boundingRect(fg)
def d(ps):
    return ' '.join('M' + ' L'.join(f'{int(x - x0)} {int(y - y0)}' for x, y in p) + ' Z' for p in ps)
shapes = {name: d(ps) for name, ps in layers}
json.dump({'width': int(wbox), 'height': int(hbox), 'shapes': shapes}, open(outdir + '/portrait.json', 'w'))

# preview
cols = {'light': (168, 231, 246), 'mid': (150, 120, 70), 'red': (30, 60, 215), 'dark': (34, 26, 11)}
prev = np.full((H, W, 3), (60, 40, 20), np.uint8)
for name, ps in layers:
    for p in ps: cv2.fillPoly(prev, [p.astype(np.int32)], cols[name])
cv2.imwrite(outdir + '/portrait-preview.png', prev[y0:y0 + hbox, x0:x0 + wbox])
print(wbox, hbox, {k: (len(ps), sum(len(p) for p in ps)) for k, ps in layers}, sum(len(v) for v in shapes.values()))
