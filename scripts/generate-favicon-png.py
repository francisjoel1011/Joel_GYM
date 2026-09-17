"""
Rasterize the favicon badge mark (red circle + white J, from assets/logo/favicon.svg)
into PNG/ICO sizes, since no SVG rendering toolchain (cairosvg native lib, Inkscape,
ImageMagick) is available on this machine. The mark is simple enough geometry
(one circle + one polygon) to redraw directly with Pillow at each target size,
supersampled for clean anti-aliasing, matching the SVG's own coordinates exactly.

Run: python scripts/generate-favicon-png.py
"""

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "logo"

RED = "#E4231C"
WHITE = "#FFFFFF"
SUPERSAMPLE = 8

# Polygon points copied exactly from favicon.svg's 100x100 viewBox.
POLY = [(56, 27), (67, 27), (67, 73), (33, 73), (33, 62), (56, 62)]


def render(size: int) -> Image.Image:
    big = size * SUPERSAMPLE
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse([0, 0, big - 1, big - 1], fill=RED)
    scaled_poly = [(x / 100 * big, y / 100 * big) for x, y in POLY]
    draw.polygon(scaled_poly, fill=WHITE)
    return img.resize((size, size), Image.LANCZOS)


# Standard web favicon sizes.
for size in (16, 32, 180, 192, 512):
    render(size).save(OUT / f"favicon-{size}.png")

# iOS looks specifically for this filename at the site root convention.
render(180).save(OUT / "apple-touch-icon.png")

# Classic multi-resolution .ico for older browsers / OS chrome.
render(48).save(
    OUT / "favicon.ico",
    sizes=[(16, 16), (32, 32), (48, 48)],
)

print("Favicon PNG/ICO set generated in", OUT)
