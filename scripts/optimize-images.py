"""
One-off pipeline: convert the raw gym photos in images/ into compressed,
responsive WebP files in assets/img/ so the site loads fast.

Run: python scripts/optimize-images.py
"""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
OUT = ROOT / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

# (max width in px, webp quality)
SIZES = {
    "full": (1920, 78),   # hero / full-bleed sections
    "thumb": (700, 72),   # gallery grid / cards
}

# Printed marketing posters, not facility photography — see assets/img/MANIFEST.md.
# gym-016 in particular carries a real person's likeness with no connection to this
# gym and must never exist as a web-ready asset. Never generate optimized copies of
# these, even if new source photos get added to images/ later.
EXCLUDED_INDICES = {"007", "015", "016"}

total_before = 0
total_after = 0
rows = []

for src_path in sorted(SRC.glob("gym-image-*.png")):
    idx = src_path.stem.split("-")[-1]  # e.g. "002"
    if idx in EXCLUDED_INDICES:
        print(f"{idx:<8}skipped (excluded — see MANIFEST.md)")
        continue
    img = ImageOps.exif_transpose(Image.open(src_path)).convert("RGB")
    before = src_path.stat().st_size
    total_before += before

    written = []
    for label, (max_w, quality) in SIZES.items():
        w, h = img.size
        if w > max_w:
            new_h = round(h * (max_w / w))
            resized = img.resize((max_w, new_h), Image.LANCZOS)
        else:
            resized = img
        out_path = OUT / f"gym-{idx}-{label}.webp"
        resized.save(out_path, "WEBP", quality=quality, method=6)
        total_after += out_path.stat().st_size
        written.append((label, out_path.stat().st_size))

    rows.append((idx, before, written))

print(f"{'file':<8}{'orig KB':>10}{'full KB':>10}{'thumb KB':>10}")
for idx, before, written in rows:
    full_kb = written[0][1] / 1024
    thumb_kb = written[1][1] / 1024
    print(f"{idx:<8}{before / 1024:>10.0f}{full_kb:>10.0f}{thumb_kb:>10.0f}")

print(f"\nTotal before: {total_before / 1024 / 1024:.1f} MB")
print(f"Total after:  {total_after / 1024 / 1024:.1f} MB")
print(f"Reduction:    {(1 - total_after / total_before) * 100:.0f}%")
