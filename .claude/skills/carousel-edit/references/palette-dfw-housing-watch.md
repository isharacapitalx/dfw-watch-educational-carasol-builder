# Color palette — DFW Housing Watch

Second locked brand alongside Arwa's (`design-system.md`). **Do not mix the two palettes.** Arwa's build is paused (she's not ready right now) but stays fully intact for whenever it resumes — this file governs DFW Housing Watch carousels only, built per Ishant's explicit request when he asks for this brand specifically (see SKILL.md's "Brands" section).

Derived from the DFW Housing Watch logo (navy/gold house-in-magnifying-glass mark) — eyeballed from the reference image, not pixel-sampled. Re-check against exact brand hex values if they ever get formalized elsewhere.

## Palette

| Token | Hex | Use |
|-------|-----|-----|
| ivory | `#EEF1F5` | light slide background (cool-toned, parallel to Arwa's "plaster") |
| mist | `#D7DCE3` | panels, dividers, pill borders (parallel to "bone") |
| steel | `#8FA0B8` | footer text on dark slides (parallel to "taupe") |
| gold | `#BB8F3D` | key-concept emphasis (dark bg), headers — matches the logo's gold ring/roofline |
| gold-deep | `#8C6423` | key-concept emphasis (light bg) |
| navy-mid | `#445066` | footer text on light slides (parallel to "umber") |
| navy | `#14213D` | dark slide background — matches the logo's navy ring/wordmark (parallel to "espresso") |

Semantic emphasis (color 2–5 word runs inside body text):

| Meaning | On navy bg | On ivory bg |
|---------|------------|-------------|
| Key concept | gold `#BB8F3D` | gold-deep `#8C6423` |
| Pain / cost / alert | brick `#A23B3B` | brick-deep `#7A2C2C` |
| Payoff / money | sage `#6B7A4F` | sage-deep `#4E5A38` |
| Numbers / dates | sky-slate `#5B7A9E` | sky-slate-deep `#3E5A78` |

Slide backgrounds use `ivory`/`navy`, never pure white/black — same reasoning as Arwa's system (softer contrast reads more premium on a photo carousel), even though the logo badge itself uses true white for its own circle.

## Contact identity

**No personal name, no email, no DM keyword.** This is a page/brand account, not an individual agent:
- Handle: `@dfw_housing_watch`
- Footer on every interior slide: `@dfw_housing_watch · n/9`
- CTA (slide 9): "Follow for more" — never "DM \"...\"". No lead magnets, same rule as Arwa's system (no fake PDFs/calculators/game plans).

## Cover (slide 1) strategy

Fixed logo badge (`assets/dfw-housing-watch-badge.svg`) composited over a **background photo rotated from a local pool** — `DFW Housing Watch photo/` at the project root (parallel to Arwa's `Arwa photo/`), not sourced live per carousel. Badge stays visually identical every time; only the background varies, so the account grid doesn't look repetitive but the brand mark stays recognizable. See `assets/dfw-housing-watch-cover-template.html`.

**2026-08-02: switched from live-per-topic Wikimedia sourcing to this local pool** — the cloud automation environment cannot fetch external images at render time (headless Chrome there has no route to arbitrary external URLs; confirmed via direct testing, not assumed), so a hotlinked photo silently renders as blank/missing background. Live sourcing still isn't safe to reintroduce for the scheduled job even if a workaround is found later without re-verifying it end-to-end in that exact environment first.

Pick the shot that best fits the topic's mood and rotate — avoid reusing the most recently used photo. See `DFW Housing Watch photo/CREDITS.md` for sourcing/license per image and what got rejected during curation (and why — mostly wrong-region or wrong-tone photos, the same failure mode flagged below). Expand the pool over time using the same standard: **actually look at the photo before adding it**, don't trust a search result's description. A 2026-07-30 run picked a Wikimedia photo of a South LA subdivision for a DFW account — correctly licensed, but the wrong region: industrial/warehouse rooftops in frame, red tile roofs, dry xeriscaped lots — visibly not North Texas. Does it read as a North Texas single-family neighborhood, not overtly a different region's architecture? Also reject anything with an incongruous visible sign/text in frame (e.g. a "MODEL HOME" sign under a foreclosure-themed hook) regardless of region-correctness.

## Caption hashtags

Two audiences, mix hashtags for both — not just DFW-local like a typical local-agent account would use:
1. **Local/DFW residents** already in the market (e.g. `#dfwrealestate`, `#northtexas`, plus the specific city the post is about).
2. **Out-of-state people researching a move to DFW** — this account's "watch" framing attracts relocation-curious browsers, not just current locals. Include relocation-intent tags (e.g. `#movingtotexas`, `#relocatingtodallas`, `#texasrelocation`) alongside the local ones every time.

## Slide 8 (positioning)

Arwa's version answers "why Arwa specifically." This brand has no individual agent to name — reframe as "why follow this account": the page's market-tracking/credibility angle (spots and explains DFW growth/price signals before they're common knowledge), not a person's service pitch.
