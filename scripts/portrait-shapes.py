"""Turn a plain-background portrait into a flat, hard-edged poster cut-out.

Usage: python scripts/portrait-shapes.py <portrait image> <out dir>
Writes portrait.json (SVG path data per tone layer) and preview PNGs.
The source photo is not committed; only the generated shapes are.
"""
import sys, json
import numpy as np, cv2
from PIL import Image

src, outdir = sys.argv[1], sys.argv[2]
K = 3                                   # trace at three times the size
raw = cv2.cvtColor(np.array(Image.open(src).convert('RGB')), cv2.COLOR_RGB2BGR)
img = cv2.resize(raw, None, fx=K, fy=K, interpolation=cv2.INTER_CUBIC)
H, W = img.shape[:2]
gray0 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 1. silhouette: everything the white backdrop does not reach from the border
near_white = (cv2.GaussianBlur(gray0, (9, 9), 0) > 236).astype(np.uint8)
ff = near_white.copy(); m = np.zeros((H + 2, W + 2), np.uint8)
for x in range(0, W, 8):
    for y in (0, H - 1):
        if ff[y, x] == 1: cv2.floodFill(ff, m, (x, y), 2)
for y in range(0, H, 8):
    for x in (0, W - 1):
        if ff[y, x] == 1: cv2.floodFill(ff, m, (x, y), 2)
fg = (ff != 2).astype(np.uint8) * 255
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((9, 9), np.uint8))
n, lab, stats, _ = cv2.connectedComponentsWithStats(fg)
fg = np.where(lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
x0, y0, wbox, hbox = cv2.boundingRect(fg)

# 2. tones
smooth = cv2.bilateralFilter(img, 15, 50, 50)
gray = cv2.cvtColor(smooth, cv2.COLOR_BGR2GRAY)
lab_img = cv2.cvtColor(smooth, cv2.COLOR_BGR2LAB)
dark = cv2.bitwise_and((cv2.medianBlur(gray, 9) < 78).astype(np.uint8) * 255, fg)     # hair and shirt
dark = cv2.morphologyEx(dark, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
skin = cv2.bitwise_and(fg, cv2.bitwise_not(cv2.dilate(dark, np.ones((5, 5), np.uint8))))
skin_vals = gray[skin > 0]
M = float(np.median(skin_vals))
soft = cv2.GaussianBlur(gray, (0, 0), 5)
shade = cv2.bitwise_and(((soft < M - 13)).astype(np.uint8) * 255, skin)               # the modelling of the face
shade = cv2.medianBlur(shade, 15)
deep = cv2.bitwise_and(((soft < M - 42)).astype(np.uint8) * 255, skin)                # under the chin, by the hair
deep = cv2.medianBlur(deep, 11)
# lips by colour: redder than the skin around them
a = lab_img[:, :, 1].astype(np.int16)
a_med = float(np.median(a[skin > 0]))
lips = cv2.bitwise_and(((cv2.GaussianBlur(a.astype(np.float32), (0, 0), 3) > a_med + 7)).astype(np.uint8) * 255, skin)
lips = cv2.morphologyEx(lips, cv2.MORPH_OPEN, np.ones((7, 7), np.uint8))
nl, ll, sl, cl = cv2.connectedComponentsWithStats(lips)
lips = np.zeros_like(lips)
if nl > 1:
    # the mouth is the largest red patch in the lower half of the skin
    ys = np.flatnonzero(skin.any(axis=1)); mid_y = (ys[0] + ys[-1]) / 2
    cand = [i for i in range(1, nl) if cl[i][1] > mid_y - 40 * K and sl[i, cv2.CC_STAT_AREA] > 200]
    if cand:
        best = max(cand, key=lambda i: sl[i, cv2.CC_STAT_AREA]); lips[ll == best] = 255
lips = cv2.medianBlur(lips, 9)
# fine marks: eyes, brows, nostrils, the lip line, spectacle frames
fine = cv2.GaussianBlur(gray0, (5, 5), 0)
lines = cv2.adaptiveThreshold(fine, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 41, 12)
lines = cv2.bitwise_and(lines, cv2.erode(skin, np.ones((7, 7), np.uint8)))
lines = cv2.morphologyEx(lines, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
lines = cv2.medianBlur(lines, 5)
# The spectacles are thin metal and the eyes are small: traced, both break into crumbs.
# They are drawn instead as plain geometry at their measured places (source-pixel coordinates),
# which is also how a poster artist would set them.
def P(x, y): return (int(round(x * K)), int(round(y * K)))
def superellipse(cx, cy, ax, by, n=3.2, steps=40):
    t = np.linspace(0, 2 * np.pi, steps, endpoint=False)
    xs_ = cx + ax * np.sign(np.cos(t)) * np.abs(np.cos(t)) ** (2 / n)
    ys_ = cy + by * np.sign(np.sin(t)) * np.abs(np.sin(t)) ** (2 / n)
    return np.array([P(x, y) for x, y in zip(xs_, ys_)], np.int32)
band = (slice(int(184 * K), int(237 * K)), slice(int(186 * K), int(342 * K)))
lines[band] = 0; deep[band] = 0; shade[band] = 0
FRAME = max(int(round(2.3 * K)), 3)
for cx in (223.5, 303.0):
    cv2.polylines(lines, [superellipse(cx, 211, 25.5, 20)], True, 255, FRAME, cv2.LINE_AA)
cv2.polylines(lines, [np.array([P(248, 200), P(255, 195.5), P(271, 195.5), P(278, 200)], np.int32)], False, 255, FRAME, cv2.LINE_AA)
cv2.line(lines, P(198, 200), P(188, 198), 255, FRAME, cv2.LINE_AA)
cv2.line(lines, P(329, 200), P(339, 198), 255, FRAME, cv2.LINE_AA)
eyes = np.zeros_like(lines)
for ex, flip in ((227.0, 1), (300.0, -1)):
    eye = [(-12.5, 1.0), (-7, -3.6), (2, -4.6), (9, -2.6), (12.5, 0.6), (7, 3.4), (-4, 3.6)]
    cv2.fillPoly(eyes, [np.array([P(ex + flip * dx, 201.5 + dy) for dx, dy in eye], np.int32)], 255)
lines = (lines > 127).astype(np.uint8) * 255

# what shows on the dark shirt: the zip and the collar edges
body_top = int(y0 + hbox * 0.52)
trim = cv2.adaptiveThreshold(cv2.GaussianBlur(gray0, (7, 7), 0), 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 61, -9)
trim = cv2.bitwise_and(trim, cv2.erode(dark, np.ones((9, 9), np.uint8)))
trim[:body_top, :] = 0
trim = cv2.medianBlur(trim, 5)

# 3. hard-edged polygons
def polys(mask, eps, min_area):
    cs, _ = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in cs:
        if cv2.contourArea(c) < min_area: continue
        p = cv2.approxPolyDP(c, eps, True)
        if len(p) >= 3: out.append(p.reshape(-1, 2))
    return out
layers = [
    ('light', polys(fg, 9.0, 4000)),
    ('shade', polys(shade, 5.0, 900)),
    ('lips', polys(lips, 3.0, 200)),
    ('mid', polys(deep, 5.0, 500)),
    ('dark', polys(dark, 6.0, 500)),
    ('lines', polys(lines, 1.6, 90)),
    ('eyes', polys(eyes, 1.0, 50)),
    ('trim', polys(trim, 3.0, 260)),
]
def d(ps):
    return ' '.join('M' + ' L'.join(f'{round((x - x0) / K, 1):g} {round((y - y0) / K, 1):g}' for x, y in p) + ' Z' for p in ps)
json.dump({'width': round(wbox / K), 'height': round(hbox / K), 'shapes': {k: d(v) for k, v in layers}}, open(outdir + '/portrait.json', 'w'))

cols = {'light': (168, 231, 246), 'shade': (128, 186, 226), 'lips': (64, 96, 214), 'mid': (150, 120, 70), 'dark': (34, 26, 11), 'lines': (34, 26, 11), 'eyes': (34, 26, 11), 'trim': (150, 120, 70)}
prev = np.full((H, W, 3), (30, 50, 214), np.uint8)
cv2.polylines(prev, [p.astype(np.int32) for p in layers[0][1]], True, (168, 231, 246), 14)
for name, ps in layers:
    layer = np.zeros((H, W), np.uint8)
    cv2.fillPoly(layer, [p.astype(np.int32) for p in ps], 255)
    prev[layer > 0] = cols[name]
crop = prev[y0:y0 + hbox, x0:x0 + wbox]
cv2.imwrite(outdir + '/portrait-preview.png', cv2.resize(crop, None, fx=0.6, fy=0.6, interpolation=cv2.INTER_AREA))
ys = np.flatnonzero(skin.any(axis=1)); xs = np.flatnonzero(skin[ys[0]:ys[0] + int((ys[-1] - ys[0]) * 0.75)].any(axis=0))
cv2.imwrite(outdir + '/portrait-face.png', prev[max(ys[0] - 120, 0):ys[0] + int((ys[-1] - ys[0]) * 0.8), max(xs[0] - 60, 0):xs[-1] + 60])
print(round(wbox / K), round(hbox / K), 'skin median', M, {k: (len(v), sum(len(p) for p in v)) for k, v in layers})
