# Research — DFW growth corridor / price gap

Topic: 4 of the top 5 fastest-growing cities in the US sit inside Arwa's DFW service corridor, and home prices haven't caught up to neighboring, more-established cities yet. Auto-selected by Phase 2 step 1 topic scoring (83/100) — see `topic-scoring.md`. Every number below must trace to this file before it can appear in the script; anything not listed here needs re-verification first.

## Population growth (primary: U.S. Census Bureau)

- Celina, TX: #1 fastest-growing city in the United States, 24.6% population growth, population 64,427. U.S. Census Bureau (July 2024–July 2025 vintage), via [Princeton Herald, "Princeton falls to No. 3 in growth"](https://princetonherald.com/2026/05/14/princeton-falls-to-no-3-in-growth/). Retrieved 2026-07-27.
- Fulshear, TX: #2 fastest-growing, 21.0% growth — Houston metro, **outside Arwa's DFW focus area**, not usable in the script. Same source, retrieved 2026-07-27.
- Princeton, TX: #3 fastest-growing (fell from #1 the prior vintage), 18.1% growth, population 43,524. Same source, retrieved 2026-07-27.
  - Prior-vintage (2023–24) figure for comparison: Princeton was #1 that year at 30.6% growth, population 37,019. Same source, retrieved 2026-07-27.
- Melissa, TX: #4 fastest-growing, 14.5% growth. Same source, retrieved 2026-07-27.
- Anna, TX: #5 fastest-growing, 10.2% growth. Same source, retrieved 2026-07-27.

**Note:** the underlying figure ("4 of the top 5 sit in one DFW corridor") is my synthesis of the Census list — Celina, Princeton, Melissa, and Anna are all within Arwa's northern-corridor focus area; Fulshear is not and must be excluded or explicitly flagged as the exception if the script references "top 5."

## Home price comparison (Redfin / Zillow, market data)

- Celina, TX home prices: ~$435K (last 30 days, reported down 17.1% YoY) to ~$496K (3-month trailing average). [Redfin Celina housing market](https://www.redfin.com/city/30799/TX/Celina/housing-market); [The Real Deal, "New home sales explode in Celina, Texas"](https://therealdeal.com/data/texas/2026/new-home-sales-explode-in-celina-texas/). Retrieved 2026-07-27.
- Frisco, TX home prices: ~$690K (last 30 days) to $799K (May 2026 median). [Redfin/Zillow Frisco housing data](https://www.redfin.com/city/30844/TX/Frisco/housing-market). Retrieved 2026-07-27.
- Princeton, TX average home value: $300,048, down 7.8% YoY (as of April 2026). [Zillow Princeton, TX Home Values](https://www.zillow.com/home-values/49419/princeton-tx/). Retrieved 2026-07-27.

**As-of caveat:** these are live market figures that move month to month — re-check against Redfin/Zillow immediately before the pre-render fact-check pass (Phase 2 step 6 of Phase 1 spec) rather than treating this file's numbers as permanently current.

## Context (not for direct citation, background only)

- Mortgage rates: 30-yr fixed averaged 6.55% (July 16, 2026, Freddie Mac) and 6.60% (July 15, 2026, Bankrate). [Bankrate rate trends](https://www.bankrate.com/mortgages/rate-trends/). Retrieved 2026-07-27. Not a topic driver per se (routine market commentary, explicitly deprioritized by the skill's own ranking rule) — background only, do not build a hook around this figure alone.

## Cross-check / demand signal (Instagram)

- @bansiaminrealtor, post `DbTPOE6j0cA` (2026-07-27, in 5-day window, Sidecar/carousel): named Princeton and Melissa specifically as budget-friendly investment picks.
- @bansiaminrealtor, post `DbLg5DgDNmk` (2026-07-24, in 5-day window, Sidecar/carousel): framed McKinney/Frisco/Melissa/Celina as a head-to-head "which city" comparison.
- Two separate posts, same account, both touching this exact corridor within the research window — corroborates real audience interest in this topic independent of the Census data thread. No second IG account or forum thread corroborating this specific angle was found in this run (flagged in `topic-scoring.md` as the reason demand-corroboration scored 14/20 rather than higher).

## Sources not used / excluded

- Tarrant County over-appraisal story (~200,000 homes, protest deadline May 15 2026 already passed) — deprioritized per the skill's own hard-filter #4 precedent (no live "do something now" angle). [Fort Worth Report](https://fortworthreport.org/2026/05/13/200k-tarrant-county-homes-potentially-overtaxed-deadline-to-protest-is-may-15/); [TAD.org](https://www.tad.org/tad-mails-2026-notices-of-appraised-value-to-property-owners). Not used in this candidate; unrelated to the selected topic in any case.
- No Reddit/BiggerPockets/City-Data thread activity surfaced on this specific growth-corridor angle despite direct searches — noted as a possible search-tool limitation, not treated as evidence against the topic.

## Open items before script-writing / pre-render fact-check

1. Re-pull Celina/Frisco/Princeton price figures immediately before render — Redfin/Zillow numbers shift monthly and the ones above are as of 2026-07-27 retrieval.
2. Confirm the "4 of top 5" framing explicitly excludes Fulshear (Houston metro) if the script cites "top 5" — do not imply all 5 are in Arwa's DFW corridor.
3. Consider going directly to census.gov for the population-growth figures rather than relying on the Princeton Herald's reporting of them, to strengthen primary-source standing ahead of render.
