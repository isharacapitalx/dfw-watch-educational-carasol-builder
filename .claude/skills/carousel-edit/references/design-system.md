# Carousel design system (locked)

Derived from @rangerhome_nw's organic-modern grade (Neutral Aesthetic 6). Everything here is a brand constant — content changes per post, these do not.

## Canvas

- Design size: **1080×1350** (4:5). Rendered at 3× device scale → 3240×4050 JPG.
- Safe margins: 130px left/right, 150px top/bottom (at 1080 design size). Nothing but background touches outside them except the cover photo.

## Palette

| Token | Hex | Use |
|-------|-----|-----|
| plaster | `#EDE8E1` | light slide background |
| bone | `#D1C5B9` | panels, dividers, pill borders |
| taupe | `#B7A999` | footer text on dark slides |
| oak | `#9E8A65` | key-concept emphasis (dark bg), headers |
| umber | `#6C5E4E` | footer text on light slides |
| espresso | `#26211A` | dark slide background, body text on light |

Semantic emphasis (color 2–5 word runs inside body text):

| Meaning | On espresso bg | On plaster bg |
|---------|----------------|---------------|
| Key concept | oak `#9E8A65` | oak-deep `#7A6845` |
| Pain / cost | clay `#C07A5E` | clay-deep `#7C4A36` |
| Payoff / money | olive `#9A9678` | olive-deep `#5F5C42` |
| Numbers / dates | slate `#98A4AD` | slate-deep `#5C666F` |

Body text: plaster on espresso; espresso on plaster. Never #FFFFFF or #000000 anywhere.

## Typography

Fonts (Google Fonts, loaded in the templates): **Marcellus** (display — elegant, organic-modern) and **Figtree** (body).

| Element | Font | Size @1080 | Case | Notes |
|---------|------|-----------|------|-------|
| Cover hook | Marcellus | 92px, lh 1.12 | ALL CAPS | 8–12 words, 3–4 lines, plaster color |
| Interior header | Marcellus | 46px, ls 0.12em | ALL CAPS | oak (dark bg) / clay-deep (light bg) |
| Body | Figtree 500 | 58px, lh 1.4 | Sentence case | 4–6 words/line |
| Bullets | Figtree 500 | 58px | Sentence case | bone bullet dots |
| Footer | Figtree 400 | 28px, ls 0.06em | lowercase | `@arwa_buildsxsells_tx · n/9`; taupe (dark) / umber (light) |
| Cover pill | Figtree 600 | 34px, ls 0.14em | ALL CAPS | "READ THIS →", plaster border+text |
| CTA contact lines | Figtree 500 | 44px | — | phone/email/handle |

Rules: emphasis never changes size or weight mid-sentence — color only. If a slide feels tight, cut words; never reduce sizes.

## Slide layouts

**Cover (slide 1)** — `assets/cover-template.html`
- Full-bleed `<canvas>`: photo drawn cover-fit, then `applyNeutralAesthetic6` + `applyGrain` run in-page (this is why renders need `--allow-file-access-from-files`).
- Espresso scrim: vertical gradient from transparent (40%) to `rgba(38,33,26,0.82)` at bottom.
- Top-left: small handle mark `ARWA · BUILDS X SELLS` (Figtree 26px, ls 0.2em, plaster).
- Lower third: hook, then pill button. Bottom margin 150px.
- No-photo variant: plaster background, espresso hook at 108px, oak pill.

**Interior text slide (2–9)** — `assets/slide-template.html`
- Vertically centered text block, left-aligned.
- Header, 40px gap, body paragraph(s) separated by 48px gaps.
- Footer pinned bottom-left at the margin.

**Diagram slide (one of 4–7)**
- Same header + footer; body replaced by inline SVG ≤ 700px tall.
- Diagram strokes/fills use only palette colors; labels Figtree ≥ 30px.
- Keep it to one visual idea: a timeline with 2 markers, a 3-step ladder, or 2 comparison bars. Not a chart with axes.
- The diagram must be exciting and topic-relevant, not decorative: it should visualize the money or the deadline (the thing the reader fears or wants), end with a punchline label (the "aha" line), and be instantly readable at thumbnail size. Match the visual metaphor to the topic — ladder for scaling, clock/timeline for deadlines, two bars for with/without comparisons, a path with a fork for decisions.

**CTA (slide 9)**
- Header: `DM "<KEYWORD>"` in clay-deep; body line explaining what they get.
- Contact block: small circular headshot (56px radius, filtered photo if available), name line "Arwa — DFW Realtor", phone, and handle, each on its own line in Figtree 44px.

## Caption template (`caption.txt`)

1. Hook line (mirror the cover, may add one emoji max)
2. Blank line, then 3–5 short 📌-style beats expanding slides 3–7 (plain-text friendly, no markdown)
3. "Swipe →" line referencing the diagram slide
4. CTA: `DM "<KEYWORD>" and let's talk.`
5. Signature: `@arwa_buildsxsells_tx · Arwa Desai — DFW real estate`
6. 5–8 niche hashtags (mix topic + DFW local), lowercase

## Render pipeline

`scripts/render.sh <post-dir>` — for each `slide_*.html`: headless Chrome, `--window-size=1080,1350 --force-device-scale-factor=3 --allow-file-access-from-files --virtual-time-budget=15000`, screenshot PNG → `sips` convert to JPG (quality ~92) in `<post-dir>/out/`. Requires Google Chrome at the standard /Applications path and network access for Google Fonts.
