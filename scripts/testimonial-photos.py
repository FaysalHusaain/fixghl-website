# Square 160px WebP avatars from the client photos in public/testimonials/.
# Crop per photo: face center (cx, cy) and square side, as fractions of the shorter edge.
# Run: python3 scripts/testimonial-photos.py
from PIL import Image
import os, sys

DIR = os.path.join(os.path.dirname(__file__), "..", "public", "testimonials")
CROPS = {
    "chris-simon": (0.50, 0.30, 0.55),
    "colt-blumenthal": (0.45, 0.19, 0.28),
    "eric-thompson": (0.60, 0.46, 0.60),
    "kerry-moore": (0.48, 0.42, 0.34),
    "matthew-white": (0.46, 0.46, 0.62),
    "tanner-tinsley": (0.50, 0.35, 0.60),
}
SIZE = 160

for name, (cx, cy, side) in CROPS.items():
    im = Image.open(os.path.join(DIR, f"{name}.jpg")).convert("RGB")
    w, h = im.size
    s = side * min(w, h)
    x0 = min(max(cx * w - s / 2, 0), w - s)
    y0 = min(max(cy * h - s / 2, 0), h - s)
    im = im.crop((round(x0), round(y0), round(x0 + s), round(y0 + s))).resize((SIZE, SIZE), Image.LANCZOS)
    out = os.path.join(DIR, f"{name}.webp")
    im.save(out, "WEBP", quality=82, method=6)
    print(f"{name}.webp {os.path.getsize(out)} bytes")
