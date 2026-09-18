"""
Pipeline: convert the raw gym photos in images/ into compressed, responsive
WebP files in assets/img/ so the site loads fast and looks sharp.

The source photos are social-media-compressed exports (574-1024px on the
long edge — see assets/img/MANIFEST.md), too small to serve full-bleed on a
modern display without visible upscale blur. Each one is run through a
pretrained 4x super-resolution model (FSRCNN) before being downscaled to its
final web size, recovering plausible detail instead of leaving the browser
to stretch a tiny source image at display time.

Requires opencv-contrib-python for the super-resolution step (cv2.dnn_superres).
Falls back to a plain Lanczos upscale, with a warning, if that isn't installed.

Run: python scripts/optimize-images.py
"""

from pathlib import Path
from PIL import Image, ImageOps, ImageFilter
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
OUT = ROOT / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)
MODEL_PATH = Path(__file__).resolve().parent / "models" / "FSRCNN_x4.pb"

# (max width in px, webp quality)
SIZES = {
    "full": (1920, 82),   # hero / full-bleed sections
    "thumb": (700, 75),   # gallery grid / cards
}

# Printed marketing posters, not facility photography — see assets/img/MANIFEST.md.
# gym-016 in particular carries a real person's likeness with no connection to this
# gym and must never exist as a web-ready asset. Never generate optimized copies of
# these, even if new source photos get added to images/ later.
EXCLUDED_INDICES = {"007", "015", "016"}

try:
    import cv2
    _sr = cv2.dnn_superres.DnnSuperResImpl_create()
    _sr.readModel(str(MODEL_PATH))
    _sr.setModel("fsrcnn", 4)
    HAS_SR = True
except Exception as e:
    print(f"Super-resolution unavailable ({e}); falling back to plain Lanczos upscale.")
    HAS_SR = False


def upscale_4x(pil_img):
    """Real super-resolution via FSRCNN, or a plain Lanczos upscale as fallback."""
    if HAS_SR:
        cv_img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        result = _sr.upsample(cv_img)
        return Image.fromarray(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
    w, h = pil_img.size
    return pil_img.resize((w * 4, h * 4), Image.LANCZOS)


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

    enhanced = upscale_4x(img)  # once per source; both sizes below resize from this

    written = []
    for label, (max_w, quality) in SIZES.items():
        w, h = enhanced.size
        if w > max_w:
            new_h = round(h * (max_w / w))
            resized = enhanced.resize((max_w, new_h), Image.LANCZOS)
        else:
            resized = enhanced
        # Mild unsharp mask: counters the softening any resample introduces,
        # tuned low to avoid haloing on the brick/rubber-floor textures.
        resized = resized.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
        out_path = OUT / f"gym-{idx}-{label}.webp"
        resized.save(out_path, "WEBP", quality=quality, method=6)
        total_after += out_path.stat().st_size
        written.append((label, out_path.stat().st_size))

    rows.append((idx, before, written))

print(f"\n{'file':<8}{'orig KB':>10}{'full KB':>10}{'thumb KB':>10}")
for idx, before, written in rows:
    full_kb = written[0][1] / 1024
    thumb_kb = written[1][1] / 1024
    print(f"{idx:<8}{before / 1024:>10.0f}{full_kb:>10.0f}{thumb_kb:>10.0f}")

print(f"\nTotal before: {total_before / 1024 / 1024:.1f} MB")
print(f"Total after:  {total_after / 1024 / 1024:.1f} MB")
print(f"Reduction:    {(1 - total_after / total_before) * 100:.0f}%")
print(f"Method:       {'FSRCNN 4x super-resolution' if HAS_SR else 'plain Lanczos upscale (SR unavailable)'}")
