# Square WebP avatars (160px, or 320px where set in SIZES) from the client photos in public/testimonials/.
# Crop per photo: face center (cx, cy) and square side, as fractions of the shorter edge.
# Run: python3 scripts/testimonial-photos.py
from PIL import Image, ImageEnhance
import os, sys

DIR = os.path.join(os.path.dirname(__file__), "..", "public", "testimonials")
CROPS = {
    "chris-simon": (0.50, 0.30, 0.55),
    "colt-blumenthal": (0.45, 0.19, 0.28),
    "eric-thompson": (0.60, 0.46, 0.60),
    # New photo (8 Nov). YuNet face detection: eyes at y 94, chin about y 190 of 400px; the hair nearly touches
    # the top edge, so the crop starts at y 0. Eyes sit about 43% down and the face fills about 71% of the circle.
    "kerry-moore": (0.4625, 0.275, 0.55),
    "matthew-white": (0.46, 0.46, 0.62),
    "tanner-tinsley": (0.50, 0.35, 0.60),
}
SIZE = 160
# Per-photo overrides: output size (320 for retina) and gentle (brightness, contrast). No other processing.
SIZES = {"kerry-moore": 320}
TONE = {"kerry-moore": (1.04, 1.06)}

for name, (cx, cy, side) in CROPS.items():
    im = Image.open(os.path.join(DIR, f"{name}.jpg")).convert("RGB")
    w, h = im.size
    s = side * min(w, h)
    x0 = min(max(cx * w - s / 2, 0), w - s)
    y0 = min(max(cy * h - s / 2, 0), h - s)
    im = im.crop((round(x0), round(y0), round(x0 + s), round(y0 + s))).resize((SIZES.get(name, SIZE),) * 2, Image.LANCZOS)
    if name in TONE:
        b, c = TONE[name]
        im = ImageEnhance.Contrast(ImageEnhance.Brightness(im).enhance(b)).enhance(c)
    out = os.path.join(DIR, f"{name}.webp")
    im.save(out, "WEBP", quality=82, method=6)
    print(f"{name}.webp {os.path.getsize(out)} bytes")
