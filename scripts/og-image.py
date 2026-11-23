"""Draw the share preview image (public/og.png) from the same shapes as the home hero.

Usage: python scripts/og-image.py scripts/portrait.json public/og.png
Scene coordinates are the hero's 1440 x 800 sheet; the output is 1200 x 630.
"""
import sys, json, math, random
from PIL import Image, ImageDraw, ImageFont, ImageChops

shapes_path, out_path = sys.argv[1], sys.argv[2]
W, H, SS = 1200, 630, 3                      # output size, supersampling
K, DY = W / 1440, -30                        # hero sheet -> image

def oklch(L, C, h):
    a, b = C * math.cos(math.radians(h)), C * math.sin(math.radians(h))
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    rgb = (4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
           -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
           -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_)
    def gam(u):
        u = min(max(u, 0.0), 1.0)
        return 12.92 * u if u <= 0.0031308 else 1.055 * u ** (1 / 2.4) - 0.055
    return tuple(round(255 * gam(u)) for u in rgb)

# the stylesheet's tokens
SKY, INK, ACCENT = oklch(.14, .028, 236), oklch(.93, .075, 96), oklch(.57, .205, 33)
SLATE, SLATE_DEEP, SHADE, LIP = oklch(.56, .07, 228), oklch(.44, .065, 230), oklch(.80, .085, 78), oklch(.74, .085, 52)

img = Image.new('RGB', (W * SS, H * SS), SKY)
d = ImageDraw.Draw(img)
def T(x, y): return (x * K * SS, (y * K + DY) * SS)
def poly(pts, fill): d.polygon([T(x, y) for x, y in pts], fill=fill)
def quad(p0, p1, p2, n=40):
    return [((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]) for t in [i / n for i in range(n + 1)]]

random.seed(11)
for _ in range(150):
    x, y, r = random.uniform(0, 1440), random.uniform(0, 800), random.uniform(0.8, 2.0)
    cx, cy = T(x, y); rr = r * K * SS
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=INK)
def sparkle(x, y, s):
    pts = [(0, -18), (3, -3), (18, 0), (3, 3), (0, 18), (-3, 3), (-18, 0), (-3, -3)]
    poly([(x + px * s, y + py * s) for px, py in pts], INK)
sparkle(820, 150, 1); sparkle(1010, 84, .6); sparkle(1368, 160, .7)

def disc(cx, cy, r, fill):
    x0, y0 = T(cx - r, cy - r); x1, y1 = T(cx + r, cy + r); d.ellipse([x0, y0, x1, y1], fill=fill)
disc(1196, 392, 216, INK); disc(1196, 392, 206, ACCENT)
poly([(420, 800), (1440, 325), (1440, 418), (620, 800)], SLATE_DEEP)
poly([(330, 800), (1440, 283), (1440, 297), (360, 800)], INK)
poly([(700, 800), (1440, 455), (1440, 480), (753, 800)], ACCENT)

for i, (x, y) in enumerate(quad((980, 236), (1172, 81), (1492, 39), 60)):          # the course ahead, dashed
    if i % 2 == 0:
        cx, cy = T(x, y); rr = 1.8 * K * SS; d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=INK)
def ribbon(a0, a1, a2, b0, b1, b2): poly(quad(a0, a1, a2) + quad(b0, b1, b2), INK)
ribbon((660, 800), (716, 440), (927, 268), (938, 281), (768, 452), (752, 800))
ribbon((610, 800), (690, 470), (912, 262), (916, 266), (706, 478), (636, 800))
ribbon((790, 800), (796, 500), (944, 290), (949, 293), (820, 500), (816, 800))

ca, sa = math.cos(math.radians(-39)), math.sin(math.radians(-39))
def R(pts): return [(980 + 1.8 * (x * ca - y * sa), 236 + 1.8 * (x * sa + y * ca)) for x, y in pts]
poly(R([(-26, -11), (-46, -28), (-10, -11)]), ACCENT); poly(R([(-26, 11), (-46, 28), (-10, 11)]), ACCENT)
poly(R([(-26, -8), (-34, -11), (-34, 11), (-26, 8)]), SLATE)
poly(R([(-26, -11), (16, -11), (16, 11), (-26, 11)]), INK)
poly(R([(-4, -11), (2, -11), (2, 11), (-4, 11)]), SKY); poly(R([(6, -11), (8, -11), (8, 11), (6, 11)]), SKY)
poly(R([(-15 + 4.5 * math.cos(t), 4.5 * math.sin(t)) for t in [i * math.pi / 8 for i in range(16)]]), SKY)
poly(R([(16, -11), (46, 0), (16, 11)]), ACCENT)

# the figure
shapes = json.load(open(shapes_path))['shapes']
def subpaths(dstr):
    out = []
    for part in dstr.split('M')[1:]:
        nums = part.replace('Z', '').replace('L', ' ').split()
        out.append([(1016 + .62 * float(nums[i]), 318 + .62 * float(nums[i + 1])) for i in range(0, len(nums) - 1, 2)])
    return out
def layer(name, fill):
    mask = Image.new('1', img.size, 0)
    for sp in subpaths(shapes[name]):
        one = Image.new('1', img.size, 0); ImageDraw.Draw(one).polygon([T(x, y) for x, y in sp], fill=1)
        mask = ImageChops.logical_xor(mask, one)                                       # even-odd, as in the SVG
    img.paste(fill, mask=mask)
for sp in subpaths(shapes['light']):                                                   # dark keyline
    pts = [T(x, y) for x, y in sp]; d.line(pts + [pts[0]], fill=SKY, width=round(16 * .62 * K * SS), joint='curve')
for name, fill in [('light', INK), ('mid', SLATE), ('red', ACCENT), ('neck', SHADE), ('chin', INK), ('dark', SKY), ('ear', INK),
                   ('lips', LIP), ('lines', SKY), ('eyewhite', INK), ('iris', SKY), ('lid', SKY), ('glasses', SKY)]:
    layer(name, fill)

# the words, set on a tilt like the hero head
def font(path, size): return ImageFont.truetype(path, size * SS)
big, mid, small = font('C:/Windows/Fonts/impact.ttf', 128), font('C:/Windows/Fonts/impact.ttf', 35), font('C:/Windows/Fonts/bahnschrift.ttf', 26)
block = Image.new('RGBA', (700 * SS, 330 * SS), (0, 0, 0, 0)); b = ImageDraw.Draw(block)
b.text((0, 0), 'YUNING GU', font=big, fill=INK)
label = 'PHARMACEUTICAL TECHNOLOGY'
lw = b.textlength(label, font=mid); top = 168 * SS
b.polygon([(14 * SS, top), (lw + 44 * SS, top), (lw + 30 * SS, top + 62 * SS), (0, top + 62 * SS)], fill=ACCENT)
b.text((22 * SS, top + 6 * SS), label, font=mid, fill=INK)
b.text((2 * SS, 256 * SS), 'yingqiu.me', font=small, fill=INK)
block = block.rotate(5, resample=Image.BICUBIC, expand=True)
img.paste(block, (56 * SS, 150 * SS), block)

img.resize((W, H), Image.LANCZOS).save(out_path, optimize=True)
print('wrote', out_path, W, H)
