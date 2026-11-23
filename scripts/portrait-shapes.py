"""Turn the figure photo into a flat, hard-edged poster cut-out.

Usage: python scripts/portrait-shapes.py <figure photo> <out dir> [eps] [frontal face photo]
The figure, hair and clothes are traced from the figure photo. Facial features come from the
optional frontal photo, aligned on the eyes. Writes portrait.json and preview PNGs.
The frontal photo is not committed; only the generated shapes are.
"""
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
# 2b. The face. In the figure photo the face is small and flatly lit, so traced it breaks
# into crumbs. Its features are taken from a second, frontal photo (argv[4], optional) and
# set on this face by lining up the two pairs of eyes; the spectacles are this photo's own
# thick frames, drawn as plain shapes at their measured places.
roi = np.zeros((H, W), np.uint8); cv2.ellipse(roi, (543, 420), (80, 98), 0, 0, 360, 255, -1)
mid = cv2.bitwise_and(mid, cv2.bitwise_not(roi))                 # no stray shade on the face
SEA_EYES = ((521.0, 396.0), (575.0, 401.0))                       # eye centres in the figure photo
ID_EYES = ((227.0, 201.5), (300.0, 202.0))                        # eye centres in the frontal photo
def similarity(src_pair, dst_pair):
    (ax, ay), (bx, by) = src_pair; (cx, cy), (dx, dy) = dst_pair
    v1 = np.array([bx - ax, by - ay]); v2 = np.array([dx - cx, dy - cy])
    scale = np.linalg.norm(v2) / np.linalg.norm(v1)
    ang = np.arctan2(v2[1], v2[0]) - np.arctan2(v1[1], v1[0])
    R = scale * np.array([[np.cos(ang), -np.sin(ang)], [np.sin(ang), np.cos(ang)]])
    m1 = np.array([(ax + bx) / 2, (ay + by) / 2]); m2 = np.array([(cx + dx) / 2, (cy + dy) / 2])
    return (lambda pts: (np.asarray(pts, np.float64) - m1) @ R.T + m2), ang
to_sea, tilt = similarity(ID_EYES, SEA_EYES)

def contours(mask, eps, min_area, scale):
    cs, _ = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        p = cv2.approxPolyDP(c, eps, True)
        if len(p) >= 3: out.append(p.reshape(-1, 2).astype(np.float64) / scale)
    return out

face = {'brows': [], 'nose': [], 'lipline': [], 'lips': [], 'eyes': []}
if len(sys.argv) > 4:
    KI = 3
    idr = cv2.cvtColor(np.array(Image.open(sys.argv[4]).convert('RGB')), cv2.COLOR_RGB2BGR)
    idi = cv2.resize(idr, None, fx=KI, fy=KI, interpolation=cv2.INTER_CUBIC)
    ig = cv2.cvtColor(idi, cv2.COLOR_BGR2GRAY)
    marks = cv2.adaptiveThreshold(cv2.GaussianBlur(ig, (5, 5), 0), 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 41, 12)
    marks = cv2.medianBlur(cv2.morphologyEx(marks, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8)), 5)
    def window(m, x0w, y0w, x1w, y1w):
        o = np.zeros_like(m); o[int(y0w * KI):int(y1w * KI), int(x0w * KI):int(x1w * KI)] = m[int(y0w * KI):int(y1w * KI), int(x0w * KI):int(x1w * KI)]
        return o
    brow = cv2.morphologyEx(window(marks, 200, 164, 330, 183), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_RECT, (31, 7)))
    face['brows'] = contours(brow, 1.6, 200, KI)
    face['nose'] = contours(window(marks, 240, 236, 290, 258), 1.6, 60, KI)
    face['lipline'] = contours(window(marks, 232, 274, 296, 292), 1.6, 80, KI)
    la = cv2.cvtColor(cv2.bilateralFilter(idi, 15, 50, 50), cv2.COLOR_BGR2LAB)[:, :, 1].astype(np.float32)
    skin_a = float(np.median(la[int(230 * KI):int(262 * KI), int(210 * KI):int(320 * KI)]))
    lipm = (cv2.GaussianBlur(la, (0, 0), 3) > skin_a + 7).astype(np.uint8) * 255
    lipm = cv2.medianBlur(cv2.morphologyEx(window(lipm, 232, 268, 296, 300), cv2.MORPH_OPEN, np.ones((7, 7), np.uint8)), 9)
    lp = contours(lipm, 2.4, 200, KI)
    face['lips'] = [max(lp, key=lambda p: cv2.contourArea(p.astype(np.float32)))] if lp else []
    almond = [(-15, 1.2), (-8.5, -4.6), (2.5, -5.8), (11, -3.2), (15, 0.8), (8.5, 4.2), (-5, 4.4)]
    face['eyes'] = [np.array([(ex + f * dx, ey + dy) for dx, dy in almond]) for (ex, ey), f in zip(ID_EYES, (1, -1))]
    face = {k: [to_sea(p) for p in v] for k, v in face.items()}

# the spectacles: thick dark frames, measured on the figure photo
KG = 4
gl = np.zeros((H * KG, W * KG), np.uint8)
def G(x, y): return (int(round(x * KG)), int(round(y * KG)))
def lens(cx, cy, ax, by, n=4.0, steps=48):
    t = np.linspace(0, 2 * np.pi, steps, endpoint=False)
    px = ax * np.sign(np.cos(t)) * np.abs(np.cos(t)) ** (2 / n); py = by * np.sign(np.sin(t)) * np.abs(np.sin(t)) ** (2 / n)
    c, s_ = np.cos(tilt), np.sin(tilt)
    return np.array([G(cx + x * c - y * s_, cy + x * s_ + y * c) for x, y in zip(px, py)], np.int32)
FR = int(round(3.3 * KG))
cv2.polylines(gl, [lens(514.5, 406.0, 26.5, 17.5)], True, 255, FR, cv2.LINE_AA)
cv2.polylines(gl, [lens(584.5, 412.5, 26.0, 17.5)], True, 255, FR, cv2.LINE_AA)
cv2.line(gl, G(540, 401.5), G(559, 403.5), 255, FR, cv2.LINE_AA)
cv2.line(gl, G(488, 397), G(470, 394), 255, FR, cv2.LINE_AA)
cv2.line(gl, G(610.5, 407), G(624, 408), 255, FR, cv2.LINE_AA)
glasses = contours((gl > 127).astype(np.uint8) * 255, 2.2, 200, KG)

# 3. hard-edged polygons
def polys(m, e, min_area):
    cs, hier = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        a = cv2.approxPolyDP(c, e, True)
        if len(a) >= 3: out.append(a.reshape(-1, 2))
    return out
layers = [('light', polys(fg, eps * 1.4, 2000)), ('mid', polys(mid, eps, 220)), ('red', polys(red, eps, 260)), ('dark', polys(dark, eps * 0.7, 60)),
          ('lips', face['lips']), ('lines', face['brows'] + face['nose'] + face['lipline']), ('eyes', face['eyes']), ('glasses', glasses)]

x0, y0, wbox, hbox = cv2.boundingRect(fg)
def d(ps):
    return ' '.join('M' + ' L'.join(f'{round(float(x - x0), 1):g} {round(float(y - y0), 1):g}' for x, y in p) + ' Z' for p in ps)
shapes = {name: d(ps) for name, ps in layers}
json.dump({'width': int(wbox), 'height': int(hbox), 'shapes': shapes}, open(outdir + '/portrait.json', 'w'))

# preview
cols = {'light': (168, 231, 246), 'lips': (70, 100, 214), 'eyes': (34, 26, 11), 'glasses': (34, 26, 11), 'mid': (150, 120, 70), 'red': (30, 60, 215), 'dark': (34, 26, 11), 'lines': (34, 26, 11)}
prev = np.full((H * 3, W * 3, 3), (60, 40, 20), np.uint8)
for name, ps in layers:
    layer = np.zeros((H * 3, W * 3), np.uint8)
    cv2.fillPoly(layer, [np.round(np.asarray(p) * 3).astype(np.int32) for p in ps], 255)
    prev[layer > 0] = cols[name]
cv2.imwrite(outdir + '/portrait-preview.png', prev[y0 * 3:(y0 + hbox) * 3, x0 * 3:(x0 + wbox) * 3])
cv2.imwrite(outdir + '/portrait-face.png', prev[330 * 3:520 * 3, 450 * 3:640 * 3])
print(wbox, hbox, {k: (len(ps), sum(len(p) for p in ps)) for k, ps in layers}, sum(len(v) for v in shapes.values()))
