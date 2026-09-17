# Image manifest (corrected)

**Every entry below was re-verified by directly opening each source file one at a time — do not trust any earlier version of this file or any description of these images from memory.** An earlier draft of this manifest had three filename/content mismatches (004↔007 swapped, and the poster identities rotated across 013/015/016), which a design-review pass caught before any harm was done. If this file is ever edited again, re-open the actual source PNG before writing a description — do not transcribe from recollection.

Each source photo produced two WebP sizes: `gym-XXX-full.webp` (≤1920px, hero/section use) and `gym-XXX-thumb.webp` (≤700px, gallery/cards).

## Use freely — real environmental photography of the space
- **002** — cardio row (treadmills) + red beam + orange-brick "Never Give Up" mural. Strong hero candidate.
- **003** — brick pillar with red trim, cable/functional stations, red bench.
- **004** — JOEL-branded dumbbell rack, close-up row. Great equipment/branding detail shot.
- **005** — reception-area wide shot, green LED panel backdrop, diamond-plate bench, leg press.
- **006** — floor shot with red LED ceiling outline, member walking through.
- **009** — reception desk with the real "JOEL GYM" LED sign. Best reference for the logo, and a strong "About" shot.
- **010** — brick pillars, blue neon accent, plate-loaded machines.
- **011** — low-angle floor shot toward the cable towers, LED ceiling. Dynamic; strong hero candidate.
- **013** — cable/functional zone, members training, natural light window at back.
- **014** — tight, clean shot of the "Never Give Up" fist/barbell mural, no people. Good texture/section-divider background.
- **017** — wide shot, big rectangular ceiling LED loops, brick pillar, squat rack, natural light at back. Strongest hero candidate.
- **018** — grey wall, red beam, brick pillar, general equipment floor.
- **019** — member mid-workout on a cable/row machine, brick wall backdrop.

## Use with a caveat
- **008** — real wide shot of the space, but a single Dwayne Johnson poster is visible in the background, mounted on the wall. Fine to use uncropped/wide as an ambient shot; do not crop in on the poster itself (celebrity likeness, not the gym's own IP).
- **012** — the real 3D "JOEL GYM" turf-wall lettering (great logo reference), but a personal devotional picture hangs directly above it. If used, crop to the lettering only and keep the picture out of frame.

## Do not use as "facility photography" — printed marketing posters, not photos of the space
- **007** — "FITNESS IS MY PASSION" poster (stock-style photo of two models, baked-in yellow text).
- **015** — single-model poster with VFX sparks, "JOIN TO FIT" + phone number baked in.
- **016** — Dwayne Johnson triple-image collage poster, "Never Give Up" baked in. **Hard ban — do not publish this image on the website** (celebrity likeness).

**No `-full.webp`/`-thumb.webp` derivatives exist for 007, 015, or 016 — `scripts/optimize-images.py` deliberately skips them.** Only the raw source PNGs remain, in `images/`, as the owner's own unmodified photo library. Do not regenerate web-ready copies of these three.

Text worth reusing from these posters (not the images themselves): the mantra **"NEVER GIVE UP"**, the tagline **"JOIN TO FIT"**, and the contact number **99402 21323**.

## Not present
There is no `gym-image-001` in the source folder — numbering starts at 002. Not an error, just a gap in the original filenames.
