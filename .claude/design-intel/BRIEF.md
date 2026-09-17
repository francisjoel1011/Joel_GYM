# BRIEF — JOEL GYM marketing site

Active creative brief for friday. Supersedes nothing else in `.claude/design-intel/`; read alongside `TRENDS.md`. This is a real, physical, unisex A/C neighborhood gym — not a boutique studio, not a big chain, not a SaaS product. Every decision below defends that fact.

---

## 0. READ THIS FIRST — asset manifest correction (safety-critical)

`assets/img/MANIFEST.md` describes what a photo shows *by number*. **That number-to-content mapping is wrong for at least four files and must not be trusted as-is.** I opened every one of the 18 source photos directly (not just the manifest's prose) to verify. The optimization script (`scripts/optimize-images.py`) is innocent — it's a straight `sorted(glob)` pass that preserves whatever index the raw `images/gym-image-XXX.png` already carried; the mislabeling happened upstream of it, in how the raw files were originally numbered versus how the manifest's prose was written.

**Confirmed by direct visual inspection this session** (thumbnails read; full.webp is the same source per-index so treat as matching, but a final eyeball before publish is cheap insurance):

| File as it exists today | What is ACTUALLY in the frame | Verdict |
|---|---|---|
| `gym-002` | Red beam, "NEVER GIVE UP" brick mural, cardio row | Safe — matches manifest, hero/mural candidate |
| `gym-003` | Brick pillar, cable tower, black bench, receding floor, window light at back | Safe — real environmental photo |
| `gym-004` | **JOEL-branded dumbbell rack close-up** (not the "Fitness Is My Passion" poster the manifest claims) | Safe — real photo, strong branding/equipment detail shot |
| `gym-005` | Wide black-ceiling/red-LED-outline shot, checkerboard floor, reception + green LED sign visible far back | Safe — real photo, atmosphere/hero-adjacent |
| `gym-006` | Wide ceiling-LED-loop shot, person in red shirt, checkerboard floor | Safe — real photo |
| `gym-007` | **"FITNESS IS MY PASSION" poster** — two women, stock-style photo, baked-in yellow text (not the dumbbell rack the manifest claims) | **Not facility photography — do not use as an environmental/facility shot.** |
| `gym-008` | Wide shot of the space with the Dwayne Johnson wall-mural poster visible on the right, gym floor/equipment in foreground | Caveat — matches manifest. Use the wide/uncropped frame only; never crop in tight on the poster side of the image. |
| `gym-009` | Reception desk, the real "JOEL GYM" LED sign (white wordmark, red circular O), green LED backlit panel, string lights, checkerboard floor | Safe — matches manifest. **This is the canonical logo reference.** |
| `gym-010` | Light-brick pillar row (red trim), cable machines, receding floor, person in green shirt | Safe — real photo |
| `gym-011` | Low-angle floor shot toward cable towers, red LED ceiling outlines, dynamic angle | Safe — matches manifest, strong hero candidate |
| `gym-012` | 3D "JOEL GYM" turf-wall lettering (white letters, red-plate O, red drop shadow), wood-slat wall, devotional picture above | Safe with crop — matches manifest. Crop tight to the lettering; keep the picture above it out of frame. Secondary logo reference. |
| `gym-013` | Brick pillar, cable/functional stations, red bench, sliver of green turf visible (not the sparks poster the manifest claims) | Safe — real environmental photo |
| `gym-014` | Tight, clean shot of the fist-and-barbell "NEVER GIVE UP" mural, no people | Safe — matches manifest. Best texture/section-divider background — no people to manage. |
| `gym-015` | **"JOIN TO FIT" poster** — single male model, VFX spark effects, phone number `99402 21323` baked in (not the Dwayne Johnson collage the manifest claims) | **Not facility photography.** The tagline and phone number are real brand copy and are fair game to reuse as *text* on the site — the image itself is not a facility photo. |
| `gym-016` | **The Dwayne Johnson triple-image collage poster** — "JOEL GYM UNISEX A/C" + "NEVER GIVE UP" baked in (not the "wide shot, ceiling LED loops" hero photo the manifest claims) | **HARD BAN. Celebrity likeness. Do not publish this file in any form** — not thumb, not full, not cropped, not as a background-blurred texture. This is the single most important line in this document. |
| `gym-017` | Wide shot, big ceiling LED loops in a rectangle/diamond pattern, checkerboard floor, two people, red equipment foreground, natural light at back | Safe — **this is the photo the manifest's "016" prose was actually describing.** Strong hero candidate; use this file where the plan calls for the "wide ceiling LED loop" hero shot. |
| `gym-018` | Grey walls, red beam, brick pillar, bench, wall-mounted monitor, wood stool | Safe — real photo |
| `gym-019` | Identifiable member mid-workout on a cable-row machine, brick wall, red equipment | Caveat — matches manifest. Usable for gallery/atmosphere; don't isolate or feature this individual as a hero face or testimonial without the gym's confirmation. |

**Net effect**: of 18 files, 15 are genuine, safe environmental photography of the real space; 3 are marketing-poster collateral and must never be used as facility photography (`gym-007`, `gym-015`, `gym-016`); of those three, `gym-016` is an absolute do-not-publish regardless of context because it carries a real person's likeness who has no connection to this gym.

**Action for friday**: use the table above, not the prose in `MANIFEST.md`, when selecting files. Before final build, do one more visual pass on the exact files you place — this correction was done via thumbnails during a research pass, not a pixel-diff audit, and being certain here costs nothing next to the downside of a celebrity image shipping on a real small business's public site. **Action for the project owner** (flagging, not mine to fix — outside my write surface): `assets/img/MANIFEST.md` itself should be corrected or regenerated from the table above; it will keep misleading whoever reads it next otherwise.

---

## 1. Concept and emotional target

**One sentence:** *JOEL GYM is a neighborhood iron temple, not a wellness spa — the site should feel like walking under the red beam into black space, lit by LED strip, and stopped cold by the mural's fist gripping a barbell.*

Emotional target: grounded intensity, earned grit, quiet defiance. Not corporate fitness-tech (Equinox/Peloton polish), not boutique-studio softness (pastel yoga-studio calm). This is a real commercial gym in a real neighborhood — the site's honesty *is* the differentiator. Every choice should read as "we lifted here and photographed it ourselves," never "we licensed this look from a template marketplace."

---

## 2. Type direction

The gym already has a typographic identity — the reception LED sign, the 3D turf-wall lettering, and the mural all use a bold condensed caps wordmark with a filled red circle standing in for the O. Formalize it; do not invent a competing voice.

- **Display / headline / impact tier — Anton** (Google Fonts, free, self-hostable). Closest accessible web font to the actual signage weight. Reserve it for the loudest, rarest moments: the hero statement, the mural reveal, big stat numerals, section-break words. Set tight: `line-height: 0.85–0.9`, `letter-spacing: -0.01 to -0.02em` at large sizes.
- **Secondary condensed tier — Bebas Neue.** Validated by Mission MMA's live site (see `TRENDS.md` #4) as a legitimate "fight-poster" condensed choice in exactly this category. Use where Anton would be too heavy: nav labels, badges, kickers, tags, small stat labels. Keeping two condensed weights in a strict hierarchy (Anton = shout, Bebas = state) is what keeps Anton's impact from wearing out through overuse.
- **Body / UI grotesk — Archivo** (variable font, Google Fonts). Has the width range (condensed through expanded) and weight range (100–900) to cover both UI labels and dense data (membership tables) from one family, and its slightly squared, industrial character keeps it from reading as a default system sans. **Do not** ship it at default weight/tracking and call it done — set uppercase UI labels with deliberate tracking (`+0.03–0.05em`) and a committed weight (600–700), not default-400 body styling reused everywhere.
- Explicitly not Inter, Poppins, or system-ui at default settings anywhere on this site — that's the single fastest tell of a template build.

**Scale** — commit to a real fluid scale, not "big" and "small":
- Hero statement: `clamp(3.5rem, 16vw, 14rem)`, tight leading, negative tracking.
- Section headers: `clamp(2rem, 7vw, 5.5rem)`.
- Stat numerals: `clamp(2.5rem, 9vw, 7rem)`, Anton, tabular figures if available.
- Sub-heads: `clamp(1.5rem, 2.5vw, 2.25rem)`.
- Body: `clamp(1rem, 0.7rem + 1.1vw, 1.125rem)`.

Treat the big numerals (member count, years running, equipment count — real if the owner supplies them, otherwise placeholder-flagged) as a graphic element in their own right, per the standing doctrine — not just larger body text.

---

## 3. Logo and favicon direction

The mark already exists in the physical space — formalize it, don't reinvent it. Reference images: `gym-009` (the LED reception sign — best color, proportion, and spacing reference) and `gym-012` (the 3D turf-wall lettering, cropped to exclude the devotional picture above it — best dimensional/drop-shadow reference).

- **Wordmark**: re-set "JOEL GYM" as a clean vector (SVG), matching the existing signage's bold condensed caps as closely as Anton (or a very close free/licensed match) allows. Do not draw a new competing logotype from scratch — this is a faithful, crisp re-set of what's already on the wall, not a redesign.
- **The non-negotiable detail**: the O in JOEL is a solid filled red circle/plate — not a ring, not a dot, not recolored. It is the mark's entire equity (it appears identically on the reception sign, the turf-wall install, and the printed posters) and it is also a quiet, literal callback to a weight plate. Never let it drift into decorative-sparkle territory.
- **Deliverables**: (1) a horizontal wordmark SVG in white-with-red-O on transparent ground, for nav/header/footer; (2) a reduced, compact circular badge — since the red O is already a circle, the natural favicon is that circle alone, or that circle paired with a bold white "J" or "JG" monogram — built and tested as its own mark, not as a shrunk version of the full wordmark.
- **Legibility check**: the full "JOEL GYM" wordmark will not read at 16×16/32×32px. Test the reduced badge mark at actual favicon (16px, 32px) and apple-touch-icon (180px) sizes before finalizing. A wordmark shrunk into illegibility at tab-icon size is a common tell of an unfinished brand pass — don't ship that.

---

## 4. Palette

Grounded directly in the physical space, refined into a working system:

| Role | Value | Use |
|---|---|---|
| Ink (field) | `#0E0E0F` | Dominant background — ceiling, walls, the site's "room" |
| Structural red | `#E4231C` | Brand/structure only: beams, LED trim, the logo's O, nav underline, hover states on non-CTA elements, section dividers |
| Signal gold | `#FFC72C` | **Conversion only**: Join Now button, pricing CTA, phone number link, any "act now" moment |
| White | `#FFFFFF` | Primary text on dark, wordmark |
| Brick/mortar (sampled from real photos, not a CSS pattern) | ~`#8B6F5E` terracotta / ~`#6B6B6B` mortar | Photographic texture only — pull directly from the photos, never a flat brick-pattern SVG/CSS fill standing in for the real thing |
| Rubber floor | ~`#2B211C` / `#1A1512` | Footer ground plane, floor-level parallax layer |

**The one rule that matters most here**: red and gold never do the same job. Red is the gym's identity color — it must never be the *only* color carrying a clickable call-to-action, because their own posters already taught the audience that gold means "act now" (`JOIN TO FIT` and the phone number are both gold-on-black on the real signage). Red stays structural and brand-level; gold stays actional. At any given viewport, at most three colors should be doing work simultaneously: ink (field), one of {red, gold} (accent, chosen by role not decoration), white (text).

**Accessibility note**: `#E4231C` on `#0E0E0F` is not high-contrast enough to trust for small body text — use it for large type, fills-with-white-text-on-top, underlines, and icons, not as a small-text color on black. Run an actual contrast check before shipping; don't assume the hex values above clear WCAG AA at every size/weight combination.

**Explicitly excluded**: sage green, blush pink, cream/beige, any "boutique wellness" pastel — even as a minor accent. This is a hard black/red/gold/white system.

---

## 5. Section-by-section direction

Following the approved plan's order.

**Sticky nav** — transparent over the hero; on scroll, resolves to solid ink with a red underline in one committed `power2.out`-style ease (~0.4s), not a linear fade. Small circular badge mark (not the full wordmark) at the left on mobile widths. "Join Now" is always the gold pill — never red — so the CTA reads as actionable everywhere in the site, not just in one section.

**Hero** — full-bleed `gym-017` (the real wide ceiling-LED-loop shot — see the asset correction above) or `gym-011` (low-angle dynamic shot toward the cable towers) as the background photograph, graded with the Iron Grade (section 7). Lead with the emotional hook, not the brand name: "NEVER GIVE UP" as the oversized Anton opening statement, with "JOEL GYM" arriving as a smaller payoff on first scroll or as the nav mark — deferring the logo reveal makes it a reward, not a banner. One honest subhead line (Unisex · A/C · real neighborhood claims only, nothing fabricated). Gold CTA. A scroll cue.

**About / why Joel Gym** — anchor image `gym-009` (the real signage in its actual reception context — this is the shot that makes the brand feel real, not modeled). Stat/badge row in big Anton numerals (years running, unisex, A/C, equipment count — placeholder-flagged if not supplied). Count-up-on-scroll is earned here specifically because it's presenting real facts, not decoration for its own sake.

**Facilities** — this is where a scroll mechanic should do real work, not just look nice: a pinned, horizontally-scrubbed "walk the floor" passage across three panels (Strength / Cardio / Functional), each backed by a real verified photo — `gym-004` (dumbbell rack) for strength, a cropped `gym-002` (the cardio-row portion, cropped tighter than the mural-section use of the same source photo — see the crop-reuse note in section 7) for cardio, `gym-003` or `gym-013` (cable/functional stations) for functional. The horizontal axis is justified because it mirrors physically walking the floor — not novelty for its own sake.

**Gallery** — editorial/masonry grid with genuinely varied module sizes (not a symmetric 3-column grid — that's a banned pattern). Each image reveals via the clip-path "un-rack" treatment (section 6/7), Iron Grade applied uniformly across all of them. Draw from the full safe list: `002, 003, 004, 005, 006, 009, 010, 011, 012 (cropped), 013, 014, 017, 018`, plus `008` (wide/uncropped only) and `019` (not isolated as a lone feature).

**Membership** — three placeholder pricing tiers, each clearly marked `<!-- placeholder: replace -->`. Gold accent on the recommended tier. Avoid the generic "middle card scaled 110% with a ribbon" cliché — indicate the recommended tier with something on-brand instead (a hang-tag/corner-tab motif echoing a gym equipment tag, or simply larger Anton numerals on that tier's price).

**Team** — lightweight placeholder cards. Explicitly not real member faces standing in as fake trainer headshots (per the ground truth — no bios were supplied). Make the placeholder read as intentionally placeholder — an initial-badge or icon treatment in brand colors — rather than a generic stock-headshot silhouette dressed up to look like a real photo.

**Testimonials** — placeholder, clearly marked. No fake star-ratings dressed up to look like scraped real reviews. Consider large editorial pull-quotes in the Anton/Archivo mix instead of a carousel-of-cards-with-five-stars.

**Join / contact** — real phone number `99402 21323`, click-to-call on mobile, gold CTA. Address and map are placeholders, marked as such; if a placeholder map is used, apply the site's own dark styling to it (Google Maps supports custom style JSON) rather than dropping in an unstyled default-blue iframe. The magnetic/weighted button feel (section 6) belongs here as the final physical touch before conversion.

**Footer** — mark, nav, socials (placeholder), and a marquee/ribbon reusing real brand language: `NEVER GIVE UP · JOIN TO FIT · UNISEX · A/C ·` looping. This is real brand copy repurposed, not invented filler.

---

## 6. Motion and interaction language — what earns its place

Stack is fixed by the approved plan: GSAP + ScrollTrigger + Lenis. Lenis lerp should sit heavier than a fashion/editorial site's floaty feel — around `0.1–0.12` — so scrolling has resistance, appropriate to an "iron" metaphor rather than airiness.

**Earns its place:**
- **The mural reveal** (see signature moment, section 8) — split-character slam-in on "NEVER GIVE UP," justified because the mural is already hand-painted letter-by-letter on the real wall; the animation re-enacts the mural's own physicality rather than decorating arbitrary text.
- **Horizontal "walk the floor" passage** for facilities — maps 1:1 to physically walking the gym; see section 5.
- **Clip-path "un-rack" image reveals** in the gallery, scrubbed to scroll velocity via ScrollTrigger — each photo arrives like a plate being loaded onto a bar, not a generic fade-up.
- **Magnetic/weighted CTA buttons** — a slight resist-then-snap on hover/press (GSAP `elastic.out(1, 0.4)` on release, transform/opacity only) that echoes the mural's gripped-fist motif. Cheap, 60fps-safe, and tied to the brand rather than a generic hover trend.
- **Count-up stat numerals** on scroll-into-view — earned as ONE ingredient among several, not the whole motion vocabulary (see the standing ban on uniform fade-up-as-the-only-idea).
- **Sticky nav resolve** on scroll — functional, not decorative, with a committed easing curve (`power2.out`, not linear/default).

**Does not earn its place — explicitly skip:**
- Custom cursor gadgets. This audience is checking a gym site on a phone, often standing in the car park before walking in — a desktop-only cursor toy is effort spent on the least relevant viewport.
- WebGL/Three.js/shader/particle effects, floating 3D spheres. No WebGL budget in this stack, and more importantly: the real photography and signage *are* the visual asset — layering synthetic 3D on top of an honest brick-and-steel space undercuts the "this is real" positioning that's the whole point.
- Page-transition frameworks (View Transitions API, route-level FLIP) — this is a single-page site; there are no routes to transition between.
- A long cinematic preloader. Landonorris.com can afford to make you wait; a gym audience wants the phone number and the Join button fast. If anything gates the first paint, cap it under ~600ms or skip it — let the hero and the first scroll do the tone-setting work instead.
- Generic infinite logo-marquee (fake sponsor/partner logos) — nothing was supplied to put there; don't fabricate one. The brand-language marquee in the footer (section 5) is the legitimate version of a marquee here.
- More than ~3 parallax depth layers — discipline matters more than spectacle on the mid-range Android hardware this audience is realistically browsing on.

---

## 7. Art-directing 15 phone photos into one look — "the Iron Grade"

The problem: real environmental photos taken at different times, on different phones, with mixed white balance and lighting, need to read as one cohesive art direction, not a camera-roll dump. Give the treatment a name so it's implemented once as a reusable utility, not freehanded per image.

**The Iron Grade — the spec:**
1. **Uniform base filter**, applied to every environmental photo via one CSS class: `filter: saturate(0.82) contrast(1.12) brightness(0.97);` — crushes blacks slightly so the ceiling/background reads consistently inky instead of muddy-grey in the flatter-lit shots, and quiets phone-camera color noise into consistency.
2. **Selective shadow tint toward brand red, not teal-orange.** The generic cinematic move is a teal-shadow/orange-highlight split tone — skip it, it's the single fastest way this treatment starts looking like a stock LUT. Instead push shadows a few degrees toward the brand red/maroon (either an SVG `feColorMatrix`/`feComponentTransfer` filter for the "real" version, or the cheap fallback: a `background-blend-mode: multiply` layer of `#E4231C` at 6–10% opacity over the image). This ties the grade to the brand's own accent instead of an arbitrary trendy duotone.
3. **Fixed crop ratios, sitewide.** Pick 2–3 and hold the line: e.g. `21:9` or `16:9` for hero/full-bleed, `4:5` for gallery cards, `1:1` for small thumbnails. Never show a photo at its native arbitrary phone-portrait ratio — mixed aspect ratios are the number one tell of an un-art-directed photo dump. Use `object-fit: cover` with a manually chosen `object-position` per image (e.g., keep the LED sign centered in `gym-009`'s crop), not a default center-crop.
4. **Fine grain overlay**, 3–5% opacity, tiled noise texture, blend-mode multiply or overlay, across all photographic areas. Unifies photos from different sensors and reinforces the gritty-gym mood over a clean-SaaS-photo feel.
5. **Per-image brightness nudge on top of the shared filter**, not instead of it — some source photos read a stop or so darker/brighter than their neighbors (this is real, uncorrected phone photography, not something a single global filter fully solves). A small manual `--photo-ev` custom-property nudge per image, eyeballed once, is the honest way to close the gap.
6. **Crop-reuse is a legitimate technique, not corner-cutting**: the same hero-quality source photo can serve two sections with two different crops — e.g. `gym-002` wide (mural + beam, for the emotional/section-divider use) and `gym-002` cropped tight to just the treadmill row (for the facilities/cardio panel). With 15 safe photos covering roughly nine sections, deliberate re-cropping of the strongest 4–5 images stretches the asset budget without ever repeating an identical frame.

---

## 8. Signature moment (the screenshot)

**The mural reveal.** As the user scrolls out of the hero, pin `gym-014` (the clean fist-and-barbell mural shot, no people) full-frame. "NEVER GIVE UP" slams into place letter by letter in Anton — each letter landing on a fast snap (GSAP `power4.out`) with a small settle-overshoot (`back.out(1.7)`), like a plate hitting a rack: a 2–3px scale-punch and a brief red-LED-style glow flash on landing, transform/opacity only. Once fully landed, the mural photograph itself desaturates slightly further and locks into the Iron Grade, visibly "joining" the real wall to the site's own visual world. This is the brand's own hand-painted mantra becoming the site's kinetic-type centerpiece — a direct, physical bridge between the real space and the screen, not type laid decoratively over an unrelated photo. It is buildable entirely in the approved stack (GSAP + ScrollTrigger + SplitType), no WebGL required.

---

## 9. Generic-AI-template checklist — reject on sight

Beyond friday's standing ban list (purple/indigo gradients, glassmorphism, symmetric 3-col feature grids, uniform fade-up-on-scroll, "Elevate your..." copy, Inter/Poppins at default weight, stock 3D blobs/sparkle icons), the gym-specific tells to watch for on this build:

1. **Any stock photo of an unrelated model** replacing real gym photography anywhere. The entire premise of this project is the real space — reaching for stock the moment a section is inconvenient to shoot is an instant rejection.
2. **Any appearance of the Dwayne Johnson image** (`gym-016`, see section 0) in any form, anywhere, including as a blurred background texture.
3. **Inventing new taglines instead of building around the two real ones** ("NEVER GIVE UP," "JOIN TO FIT") — new *supporting* microcopy in the same voice is welcome; replacing the brand's actual established language is not.
4. **The Wix/Squarespace-gym-template structure**: anonymous stock hero model mid-lunge + bold sans headline + "JOIN NOW" button + three icon-boxes reading "Modern Equipment / Expert Trainers / Flexible Hours." This exact template is genuinely common (it turned up repeatedly in this session's own research into gym-site listicles) — avoid it structurally, not just re-skinned in brand colors.
5. **A BMI calculator, class-booking widget, or other fabricated interactive utility** bolted on because "gyms have those." Nothing in the approved plan calls for one; don't invent fake functionality.
6. **Star-rating icons on placeholder testimonials** dressed up to look like scraped real reviews.
7. **An unstyled default Google Maps embed** for the placeholder address — if a map placeholder exists, it should carry the site's own dark map styling, not default blue-pin Maps chrome.
8. **Any boutique-wellness color creep** — sage, blush, cream — even as a minor accent (see section 4).
9. **A generic stock-headshot silhouette** standing in for the team placeholders instead of an intentionally-placeholder brand treatment (see section 5).
10. **Glassmorphic panels anywhere** — flagged twice in `TRENDS.md` (the American Combat Gym counter-example and the current "Liquid Glass" trend on recent.design/godly.website) because it is the single most likely trap on a 2026 build specifically: it is everywhere in current design references, and none of it belongs on an exposed-brick-and-steel brand.

---

## 10. Reference links from TRENDS.md — what to steal

- **landonorris.com** (`TRENDS.md` #1) — steal the vertical→horizontal layout pivot for the facilities passage, and the base/hover image-pair pattern for gallery items.
- **wings.design** (`TRENDS.md` #2) — steal the discipline of one repeated verbal motif stitching every section together; JOEL GYM's own mantras play that role instead of inventing a new one.
- **USAvionix / basement studio** (`TRENDS.md` #3) — steal the confidence of extreme color restraint; richness comes from motion and type craft, not from adding more hues to the palette.
- **Mission MMA** (`TRENDS.md` #4) — direct validation for the Anton/Bebas Neue condensed type system in exactly this category.

---

## 11. Placeholder and content-integrity rules

- Anything not supplied by the owner (trainer bios, class schedule, real address, pricing) must ship as clearly-marked placeholder content, e.g. `<!-- placeholder: replace -->`, never fabricated as if real.
- The only real, verified facts to build around: the phone number `99402 21323`, the "NEVER GIVE UP" and "JOIN TO FIT" brand language, the Unisex/A/C positioning, and the facility zones described in the ground truth (free-weight floor, plate-loaded machines, cable/functional-trainer zone, cardio row, benches, mirrored walls, brick accents, black-ceiling/red-LED lighting).
- No real member's face (`gym-019`, and the person visible in several atmosphere shots) is to be used as a fake "trainer" headshot or featured testimonial face.

---

## 12. Craft floor (non-negotiable, per standing quality bar)

- `prefers-reduced-motion` fallback for every motion idea above, especially the mural-reveal signature moment and the horizontal facilities passage — a designed static/fade fallback, not a broken or frozen page.
- 60fps discipline: transform/opacity only for the mural slam, magnetic buttons, and gallery reveals; no layout-thrashing properties animated.
- Mobile gets its own art direction on the signature moment and the horizontal passage specifically — don't just shrink the desktop scroll-jack; a phone-width horizontal-scroll passage needs its own considered behavior (e.g., a swipeable/snap version) rather than an awkward squeeze.
- Use `-thumb.webp` for gallery/card contexts and `-full.webp` only for hero/full-bleed placements, per the manifest's own intent — with 15+ real photos in play, payload discipline matters.
- Focus states on the nav, CTA, and gallery items styled with the same care as hover states (gold focus ring reads naturally as "actionable," consistent with the palette rule in section 4).
- Contrast-check the red-on-ink pairing per the note in section 4 before relying on it for any text under large/bold sizing.
