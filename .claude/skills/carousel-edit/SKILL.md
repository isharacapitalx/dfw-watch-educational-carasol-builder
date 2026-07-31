---
name: carousel-edit
description: Generates a complete 9-slide educational real-estate Instagram carousel (4:5, 3240×4050 JPGs + caption) in one of two locked brand systems — Arwa Desai's personal-agent brand, or the DFW Housing Watch page brand. Use this whenever the user asks to create, build, draft, or edit a carousel, an educational IG post, a "swipe post", or gives a real-estate topic and wants Instagram content — even if they only name a topic ("do one on property taxes") without saying "carousel edit" explicitly. If they don't say which brand, ask.
---

# Carousel Edit — educational carousel builder (two brands)

Produces a ready-to-post Instagram carousel: 9 slides rendered as 3240×4050 JPGs, plus a caption file, for **one of two locked brand systems** (see "Brands" below). The structure (9-slide arc, word caps, one diagram slide) is shared and locked across both — only palette, cover treatment, and contact/CTA identity differ per brand. Never restyle the shared structure per post; never mix a post between the two brands' assets.

## Brands

Two brands exist. **Ask which one (or both) if the user doesn't say** — don't assume, they're materially different builds:

| | **Arwa** (paused) | **DFW Housing Watch** (active) |
|---|---|---|
| Status | Ishant's original plan; Arwa isn't ready to do this right now, so this brand is on hold — fully built and ready to resume whenever he says so | The current active brand; a page he's running to test carousel engagement before Arwa (if ever) comes back in |
| Reference doc | `references/design-system.md` | `references/palette-dfw-housing-watch.md` |
| Palette | plaster/oak/espresso/clay/olive/slate (organic-modern) | ivory/navy/gold (civic/corporate) |
| Cover (slide 1) | photo of Arwa from `Arwa photo/`, filtered via `neutral-aesthetic-6.js` | `assets/dfw-housing-watch-badge.svg` composited over a topic-relevant background photo sourced live per carousel (Wikimedia Commons preferred — check the license; avoid unlicensed image-search results on a commercial account) |
| Slide 8 job | "why Arwa specifically" | "why follow this page" |
| Slide 9 CTA | `DM "<keyword>"` + Arwa's name/handle/email | "Follow for more" + `@dfw_housing_watch` only — no personal name, no email, no DM keyword |
| Footer handle | `@arwa_buildsxsells_tx` | `@dfw_housing_watch` |
| Templates | `cover-template.html` / `slide-template.html` / `carousel.css` | `dfw-housing-watch-cover-template.html` / `slide-template-dfw-housing-watch.html` / `carousel-dfw-housing-watch.css` |

Both brands share the exact same slide-markup class structure (`.header`, `.body`, `.em-key/.em-pain/.em-pay/.em-num`, `.footer`, `ul.bullets`, diagram SVG, etc.) — only the linked stylesheet and cover markup differ, so educational content (slides 2-7) can usually be written once and adapted to either brand with a stylesheet swap plus the slide 1/8/9 brand-specific pieces. If asked to build for **both**, run Phases 1-2 (research/topic/script) once — the underlying facts and educational arc don't change — then produce two separate Phase 3 builds, one per brand, as two separate post folders.

Read the relevant brand's reference doc before writing any slide HTML for that brand.

## The four phases

Every carousel moves through four phases (2026-07-27: merged the old standalone Render phase into Review, since judging engagement/legibility honestly requires looking at the actual rendered image, not the raw HTML — and renumbered Auto-post to Phase 4 accordingly). The throughline goal is carousels that **trend and grow the account's followers**, not just carousels that pass the brand checklist — Phase 1 ranks for surprise value and Phase 3 reviews the rendered result for the same bar.

| Phase | What happens | Runs where |
|---|---|---|
| 1. Research | Trend/topic scan (if no topic given) + fact-verification | Dispatched to a subagent (foreground) |
| 2. Planning | Score/select topic and hook automatically, write script, get user approval ("go") | Main thread — needs live back-and-forth with the user |
| 3. Review | Build draft slides, **render them**, QA the actual rendered images against brand rules + engagement bar, fix and re-render as needed, present the full set for Ishant's final review | Build/render in main thread; the QA pass is normally dispatched to a fresh subagent (no authorship bias), though Claude may do it directly in the main thread when walking through a run live with Ishant |
| 4. Auto-post | Publish to Instagram on a recurring daily schedule | **Planned, not implemented** — see Phase 4 below |

Phase 1 goes to a subagent because its raw research (scraped posts, forum threads, search results) is noisy and only the distilled output matters afterward. Phase 3's QA pass benefits from a reviewer that didn't write the script — no sunk-cost bias toward its own copy — so it defaults to a fresh subagent too, dispatched **in the foreground** (`run_in_background: false`) since nothing after it can proceed without the result.

## Inputs to collect

1. **Topic** — the educational subject (e.g., 1031 exchanges, property tax protests, new-build financing). If not given, Phase 1 discovers candidates and the user picks one.
2. **Cover photo** — slide 1 always carries a photo of Arwa, pulled from `Arwa photo/` in the project root (consistency across her grid, and faces lift engagement). Pick the portrait-orientation shot that best fits the topic's mood and rotate — check the covers of recent `posts/*/cover-photo.jpg` and avoid reusing the most recent one or two. Only if `Arwa photo/` is missing or empty: ask the user, and fall back to the no-photo cover variant as a last resort.
3. **DM keyword** — one word the reader DMs to start a conversation (e.g., "TAXES"). Derive from the topic if not given; confirm with the user.

## The locked 9-slide structure

Every carousel follows this arc. One idea per slide. Hard cap ~35 words per interior slide — if a slide feels full, cut words, never shrink type.

| # | Role | Job of the slide | Background |
|---|------|------------------|------------|
| 1 | Hook cover | Photo + specific, number-driven hook + "READ THIS →" pill | Filtered photo, espresso scrim |
| 2 | Setup | Reframe the topic as insider knowledge; promise the blueprint | Espresso |
| 3 | Problem | The pain: what it costs the reader to not know this | Plaster |
| 4 | Mechanism | The rule/law/process, explained in one plain paragraph | Espresso |
| 5 | Payoff | What changes for the reader; concrete dollar example | Plaster |
| 6 | Rules / urgency | Deadlines, conditions, what disqualifies you | Espresso |
| 7 | Scale play | How this compounds; a short bulleted loop | Plaster |
| 8 | Positioning | Why Arwa specifically; what she does for clients here | Espresso |
| 9 | CTA | "DM '<keyword>'" + contact block + small headshot | Plaster |

**One slide among 4–7 must be the diagram slide**: replace its body paragraph with a simple inline-SVG visual (timeline, ladder, before/after bars). This is the save-magnet — never skip it. Specs in the design system doc.

## Content-writing rules

- **Hooks are the highest-stakes line in the carousel — draft at least 3 candidates, score every one with the Hook scoring system below, and auto-select the winner** (2026-07-27: no user pick, same reasoning as topic selection — the daily pipeline can't stop for a manual choice). If none of the first 3 score well, write more and revise rather than settling. Show the winner and its score/rationale in the Phase 2 report. A working hook makes the viewer ask "how?" or "who are these people?" — it opens a gap they must swipe to close.

## Hook scoring system (slide 1 only)

Score every hook candidate 0–100. Highest score wins; tiebreak on the stronger curiosity gap.

| Dimension | Points | What earns a high score |
|---|---|---|
| Shock / surprise value | 40 | A genuine "wait, WHAT?" reaction on first read — not mild interest. Heaviest weight on purpose: this is the one line that decides whether anyone swipes at all. |
| Curiosity gap (open loop) | 30 | Withholds a specific piece of information the reader must swipe to get. A hook that already answers its own question scores low; one that poses an answer-demanding question scores high. |
| Specificity / concreteness | 15 | Real numbers, rankings, or named entities beat vague claims — but specificity that closes the curiosity gap (e.g. naming the city the hook is supposed to be hiding) costs points under the dimension above, so the two need to be balanced, not just both maxed. |
| Thumb-stop brevity | 15 | ≤12 words, reads instantly at feed-thumbnail size, no throat-clearing ("Did you know that..."). |
- **Hook numbers must be aspirational-scale, not transaction-limiting.** "How to own $2M in real estate and pay zero in capital gains" works because $2M is an identity the viewer wants ("who owns $2M and pays nothing?"). "Sell for a $200K profit" fails because it caps the story at one arbitrary transaction that may not match the viewer. Use numbers that describe the *ceiling* (portfolio size, percentage saved, years compressed), never a made-up individual deal. (Also: avoid the literal two-character sequence dollar-sign-zero in this file — the skill loader treats it as a variable; it's fine on slides.)
- **Number discipline on all slides:** only cite numbers that are universally true — tax rates ("up to 20%"), statutory day counts (45/180), percentages — or aspirational scale. Never invent a specific dollar loss/gain ("the IRS takes $50K") as if it were typical; the audience's deals vary and the fake precision reads as either wrong or manipulative.
- **Shorter is stronger.** Target 15–25 words per interior slide (35 is the ceiling, not the norm). The colored emphasis words must carry the whole story on their own — write the slide, then check: do the colored words alone tell it? If not, re-pick them or rewrite.
- **High energy, never boring.** Every slide must earn the next swipe. Short punchy sentences and fragments over long explanations ("Sell. Roll every dollar forward. The IRS waits — your money doesn't."). Second person, concrete stakes, real dollar amounts. The reader should feel smarter and slightly urgent, never lectured. If a slide reads like a textbook paragraph, rewrite it as if telling a friend the wildest part first.
- **Open loops.** Slides 2 and 6 end with a forward-pull line that makes not-swiping feel like leaving money on the table (a promise of what's next, or an unresolved stake). Never label it mechanically ("see next slide") — imply it.
- Energy comes from stakes and specificity, not hype adjectives: no "insane", "secret they don't want you to know", "mind-blowing". Confident advisor voice — a sharp friend explaining something exciting over coffee, leaning in.
- **CTA is always a conversation with Arwa, never a freebie.** There are no lead magnets, PDFs, calculators, game plans, or "current inventory" to send — do not invent or offer any deliverable. Slide 9's ask: DM the keyword to start working with Arwa on finding their **next home** — default to warm, personal framing ("your next home," "wherever life's taking you next") rather than boxing it into "investment property," even on investment-flavored topics (2026-07-27: Ishant flagged that investment-only framing feels narrow/impersonal). Only lean fully into investment language when the topic is explicitly investment-specific end to end (e.g. a 1031 exchange post) — otherwise keep it open to both without forcing an explicit "personal vs. investment" split. The carrot is Arwa's help itself — frame it as the shortcut to what the carousel just taught.
- Emphasis words get semantic colors (oak = key concept, clay = pain/cost, olive = payoff/money, slate = numbers/dates). Color 2–5 word runs, not whole sentences — a skimmer reading only colored words should still get the story.
- Slide 8 always positions **Arwa alone (@arwa_buildsxsells_tx, DFW realtor — resale + custom builds)**. Do not mention Ishant in slides or captions for now. Keep claims true to services she actually offers.
- Contact identity (use everywhere): **Arwa Desai**, handle `@arwa_buildsxsells_tx`, email `arwa.buildsxsells.tx@gmail.com`. Slide 9 shows name line "Arwa Desai · DFW Realtor" + handle + email; caption signature carries the same. Never invent phone numbers or other contact details. (Brokerage name still pending from the user — keep flagging it.)
- Never copy wording from reference carousels; the structure is borrowed, the words are always original.
- Anything tax/legal gets a soft-touch accuracy pass: state rules correctly (e.g., 1031 = investment property only, 45/180-day windows) and avoid promising outcomes.

## Phase 1 — Research (subagent)

Runs at the start of every carousel-edit invocation. Two modes depending on whether a topic was given:

**If the user named a topic:** skip topic discovery, run fact-verification only (step 2 below) for that topic.

**If no topic was given** (including the trigger "what are the carousel topics for today?"): run full discovery first, then fact-verification on whichever topic the user picks.

**DFW focus area** — all research below is scoped to this region (Arwa's service area, from the map she provided 2026-07-27): the northern DFW suburb corridor across Denton, Collin, northeast Tarrant, north Dallas, and Rockwall counties. Representative cities: Denton, Corinth, Lewisville, Flower Mound, Highland Village, The Colony, Little Elm, Oak Point, Justin, Roanoke, Prosper, Celina, McKinney, Melissa, Anna, Fairview, Allen, Lucas, Plano, Frisco, Wylie, Sachse, Murphy, Princeton, Southlake, Grapevine, Colleyville, Keller, North Richland Hills, Euless, Hurst, Carrollton, Addison, Farmers Branch, Irving, Garland, Rowlett, Rockwall, Heath. Flag it to the user if a topic or source seems to fall outside this area — the list may need adjusting.

Dispatch this phase to a subagent (general-purpose, foreground — Phase 2 needs the result immediately) with instructions to run three research threads in parallel, then cross-check them against each other:

1. **Instagram — user-curated watchlist only.** Read the accounts from `posts/instagram-watchlist.md` (Ishant maintains this list himself and sends new handles when he finds them — **never auto-discover accounts** via hashtag/keyword scraping or "top real estate influencer" listicles; a 2026-07-27 attempt at that surfaced lifestyle influencers, listing-showcase-only accounts, and even a non-real-estate account, for ~$1.64 in wasted Apify spend — Ishant rejected all of it, including the accounts that looked legitimate). For each watchlisted account, pull only posts from the **last 5 days** (a hard cap via the post scraper's date-filter input, not a full re-scrape or full history pull) using `mcp__Apify__call-actor` (`apify/instagram-post-scraper`) / `mcp__Apify__get-dataset-items` (already permitted in `.claude/settings.local.json`). Filter to `type === "Sidecar"` (carousel posts only — confirmed Instagram's actual field value for carousels). **Then filter again for content style, into three buckets:** (1) educational/news-style carousels about DFW real estate generally — this is the only bucket that counts as topic signal; (2) listing-showcase carousels (photos of one specific property/address/price that account is trying to sell) — not useful signal, Arwa's carousels are never about one listing; (3) personal-brand/achievement content (awards, magazine features, press mentions, "top producer" badges) — also not useful signal, neither educational nor a listing. Discard buckets 2 and 3, log each bucket-1 carousel's topic and angle.
   - **How long ago the reference account posted about a topic is irrelevant — never treat it as a reason to skip or deprioritize a topic.** A carousel from that account 3 weeks ago is exactly as valid a signal as one from yesterday; it only proves the topic has real audience interest, which doesn't expire. This never risks looking like a copy either way, because the script is always written fresh (see the "never copy wording, only structure/topic" content rule) — there is no "they already covered it recently, so it's stale for us" logic anywhere in this process.
   - **Also scrape comments on the qualifying carousels** (use `dataDetailLevel: "detailedData"` on those specific posts, or a dedicated comments actor if that data-detail level's comment sample is too thin — check `fetch-actor-details` for current options). Read the comment text and keep only comments asking a genuine real-estate question (discard generic replies, compliments, emoji-only, and spam). Aggregate similar/recurring questions across all watchlisted accounts' posts and rank by how many distinct people are asking some version of it. This is a second, separate signal from the carousel-topic scan above — it shows what the audience is actively curious about, independent of what any single account chose to post about.
2. **DFW demand + news signals**, most recent first:
   - Forums and Q&A: Reddit (r/Dallas, r/FortWorth, r/frisco, r/plano, r/mckinney, r/TexasPolitics for policy changes, r/RealEstate + r/FirstTimeHomeBuyer filtered to DFW mentions), BiggerPockets forums, City-Data DFW forum.
   - Real-estate-specific local news: Dallas Morning News, Fort Worth Star-Telegram, Community Impact (DFW editions), D Magazine, WFAA — housing, taxes, development, rates.
   - **General DFW regional news with a residential real estate angle:** a topic doesn't need to be about real estate directly — a company relocating its HQ or a large employer expanding into the focus area, a new venue, mall, or major development opening, transit/infrastructure announcements, school district changes, etc. all move home demand and values nearby. Watch for these and translate them into a residential-impact angle (e.g. "Company X is bringing 3,000 jobs to Frisco — here's what that means for home values in the area").
   - Market/institutional: Texas A&M Real Estate Research Center, NTREIS stats, county appraisal district announcements (DCAD, TAD, Collin CAD), Texas legislature property-tax bills.
3. **Cross-check the two threads against each other**: a topic that shows up in more than one thread (e.g. multiple IG creators covering it *and* a live forum discussion, or a news story *and* real search/question volume) is stronger evidence than a topic sourced from only one thread — favor multi-thread corroboration when ranking.

Then:

4. **Rank by volume × recency × fit × surprise** — and don't skip that last one. Routine market commentary ("rates are around 6.5% this month") is not a topic by itself, even if it's real and recent — it's context. What makes something worth building a carousel on is a genuine "wait, what?" angle: a stat or fact that would make someone stop scrolling, not just confirm what they already assumed. Example from this project's own research: "mortgage rates ticked up" is boring; "Princeton, TX was the fastest-growing city in the ENTIRE US last year, and homes there are still $325K while the county next door is pushing $500K+" is a hook. When a research thread only turns up routine/boring items, keep digging rather than settling — actively hunt for the angle with real shock, contrast, or stakes in it, the same way you'd hunt for a hook. Beyond surprise: repeated questions from many different people beat one viral thread; last 1–2 weeks beats last quarter; the topic must fit the educational 9-slide format and build confidence in Arwa (skip pure news with no actionable lesson, celebrity real estate, doom content).
5. **Dedupe against `posts/topics-log.md`**: skip anything posted in the last 5 days, no exceptions; topics older than 5 days may repeat only with a genuinely fresh angle; brand-new topics always win ties.
6. **Verify claims against primary sources** for the chosen (or given) topic — prefer irs.gov, trec.texas.gov, county appraisal districts, HUD/FHFA, Texas statutes, major-lender published rates over blogs and content farms. Note figures that change over time (rates, exemption amounts, loan limits) with their as-of date. Hunt for 1–2 fresh, surprising stats that could power a hook or the diagram slide.

**Output:** if in discovery mode, 3–5 topic candidates, each with the topic, evidence of demand (which threads corroborated it, and roughly how much), **what the surprise/"wait, what?" angle is** (not just that it's demand-verified — say what makes it worth stopping to read), the educational angle for Arwa, a one-line hook sketch, and enough evidence on each of the scoring dimensions (see "Topic scoring system" below) for Phase 2 to score them without re-researching. **Do not present these to the user for a pick — topic selection is fully automatic in Phase 2 step 1.**

**No `posts/<topic-slug>/` folder exists yet in discovery mode** (no topic has been picked, so there's no slug to name it with) — return all findings (sourced facts, comment-questions list) directly in the subagent's response rather than trying to write files. Once Phase 2 step 1 auto-selects a topic, create `posts/<topic-slug>/` immediately and write three files from the already-gathered findings: `research.md` (each fact as a line with its source name + URL + retrieval date — the script may only use numbers that appear here), `comment-questions.md` (the top 10, or fewer if there isn't enough volume, recurring real-estate questions found in watchlisted accounts' comments — a standing deliverable for Ishant regardless of whether it matches the chosen topic, shown alongside the Phase 2 report per step 3 below), and `topic-scoring.md` (the full scoring table, see below).

If the user gave a topic directly (not discovery mode), the slug is already known and there's nothing to score/select, so write `research.md` and `comment-questions.md` immediately as part of this phase instead of waiting for Phase 2.

## Topic scoring system (Phase 2 step 1 uses this)

Fully automatic — Ishant does not pick the topic; this replaces that decision. Two stages: hard filters first (disqualifying, pass/fail), then a weighted score for whatever survives.

**Hard filters — a candidate failing any of these is disqualified regardless of score:**
1. Not a repeat within the 5-day window (`posts/topics-log.md`) — already enforced in Phase 1 step 5, re-confirm here.
2. Every load-bearing number has a verifiable primary/institutional source, or a credible path to confirm one before the pre-render fact-check pass — if the central claim rests only on a source that failed to fetch or couldn't be confirmed, and no primary alternative exists, disqualify it rather than hoping it resolves later.
3. Fits the locked 9-slide educational format with an actual takeaway — not a pure news recap with no lesson, not celebrity real estate, not doom content.
4. Has a live, current "do something now" angle for the reader — not a deadline that already passed or a purely historical curiosity (this is why the Tarrant County over-appraisal topic from the 2026-07-27 sample run was deprioritized: real hook, but the protest deadline had already passed).
5. Compliant on its face — no guaranteed-outcome claims baked into the core premise, no fair-housing red flags. Needing a topical disclaimer (tax/legal/financing) is normal and does NOT disqualify — that's handled in the Disclaimers section below.

**Weighted score (0–100) for every candidate that clears the filters:**

| Dimension | Points | What earns a high score |
|---|---|---|
| Surprise / "wait, what?" factor | 35 | Contradicts a common assumption or reveals something most readers don't know. Anchor examples: "mortgage rates ticked up" = near 0; "4 of the 5 fastest-growing cities in the ENTIRE US are stacked in one DFW corridor" = near max. |
| Shareability / social currency | 25 | Would a reader tag a friend or send it to their group chat — because it makes them look informed, or because it's directly useful to someone they know who's buying/selling/investing right now. Personal-stakes and "I knew this before you did" angles score highest. |
| Demand corroboration | 20 | How many independent threads validate real audience interest (Instagram comments/posts, forum activity, news volume). Multi-thread beats single-thread. |
| Recency of the underlying event/data | 10 | Days since the real-world news/data itself (not since a reference account posted about it — that's explicitly not a factor, see above). |
| Actionability / CTA strength | 10 | How naturally it leads into "DM me to get started" — urgency, time-boundedness, direct relevance to someone actively in the market right now. |

**Selection:** pick the single highest-scoring candidate that cleared all hard filters. Tiebreak (scores within 5 points of each other): prefer stronger source confidence, then the more actionable CTA.

**Fallback:** if every candidate scores below 50/100, or all fail a hard filter, do not force a weak pick and do not ask Ishant to choose — that's not what this system is for. Instead, go back into Phase 1 and broaden the research (more sources, wider news search) until something clears the bar.

**Log every run** to `posts/<topic-slug>/topic-scoring.md`: the full candidate list, every dimension score, the hard-filter pass/fail result, and the final pick with reasoning — so the decision is auditable even though nobody approved it in the moment.

## Phase 2 — Planning (main thread)

1. If Phase 1 ran in discovery mode, **automatically score and select the topic** using the "Topic scoring system" above — no user pick. Create `posts/<topic-slug>/` and write `research.md`, `comment-questions.md`, and `topic-scoring.md`.
2. Write the script for the locked 9-slide structure, following the content-writing rules above.
3. Present one combined **carousel report** in chat:
   - **Chosen topic + why** — the topic, its final score, and the one or two dimensions that drove the pick (e.g. "won mainly on surprise + shareability"), so Ishant sees the reasoning even though he isn't approving the choice itself.
   - **Content brief** — 2–3 sentences on what the carousel argues and who it's for, then a one-line-per-slide outline of the 9-slide arc.
   - **Fact sheet** — the claims the script relies on, each with its source (from `research.md`). Flag anything that couldn't be verified — it gets cut or softened, never guessed.
   - **Auto-selected hook + score** — the winning hook from the Hook scoring system, its total score, and the 1-2 dimensions that drove the pick, plus the runner-up candidates and their scores for transparency (no user pick, same as topic selection).
   - **Script** — per-slide copy. When working from a reference post, label per slide: **Reference** (paraphrase its technique — never reproduce its text verbatim) / **Current** / **Improved**. Include the diagram slide's concept in words (visual, labels, punchline).
   - **Disclaimers + compliance notes** proposed for the caption (see Disclaimers section below).
   - **Top 10 audience questions** from `posts/<topic-slug>/comment-questions.md` — shown every time regardless of whether today's topic matches them, so Ishant sees what people are actually asking about even when it's not what got turned into a carousel today.
   - **Next steps** — a one-line statement of what happens the moment he says "go": Phase 3 builds/renders/QAs, then Phase 4 packages a delivery link with a posting-time recommendation — so he knows exactly what he's authorizing, not just approving text in isolation.
4. Iterate in text until the user says **"go."** This is the single approval gate — it authorizes Phase 3 (build, render, QA) *and* Phase 4 (package the delivery link) to run back to back without asking again at either step. Do not build or render anything before "go."

## Phase 3 — Review (build, render, QA — main thread + subagent)

On "go," no further user confirmation is needed for any of the steps below — the "go" already authorized them, including rendering.

1. **Build the draft**, using the brand(s) established back when the request came in (see "Brands" above — ask then if it wasn't stated, don't default silently here).
   - **One brand**: write `caption.txt` and `slide_1.html` … `slide_9.html` directly into `posts/<topic-slug>/` (alongside the `research.md` etc. Phase 2 already put there), using that brand's boilerplates from `assets/` (e.g. `cover-template.html`/`slide-template.html`/`carousel.css` for Arwa, or the `-dfw-housing-watch` equivalents). Copy nothing else into the post folder; templates reference `../../.claude/skills/carousel-edit/assets/` by relative path — keep that path depth (exactly two levels below project root).
   - **Both brands**: the shared research/script from Phase 2 stays in `posts/<topic-slug>/` as the source of record. Each brand's actual slides/caption go in their own sibling folder instead — `posts/<topic-slug>-arwa/` and `posts/<topic-slug>-dfwhw/` — each built per that brand's own boilerplates, same depth-two rule. Don't try to put two brands' slide files in one folder.
   - If a cover photo/background was sourced, copy it in as `cover-photo.jpg` inside whichever folder(s) it belongs to.
2. **Render immediately:** `bash <skill-dir>/scripts/render.sh posts/<topic-slug>` — outputs `slide_01.jpg` … `slide_09.jpg` at 3240×4050 into `posts/<topic-slug>/out/`.
3. **QA the actual rendered images** — not the raw HTML. Looking at the real JPGs is the whole point of merging render into this phase: things like the thumb-stop test and text overflow can't be honestly judged from text alone. Normally dispatch this to a fresh subagent (foreground) that did not write the script, so there's no sunk-cost bias toward its own copy; give it the rendered JPGs, `references/design-system.md`, the content-writing rules, and the quality bar below, and ask it to check two things and report specific fixes, not just pass/fail:
   - **Structural/brand compliance**: word caps holding visually, background alternation exactly per the table, exactly one diagram slide and it's legible, footer present and correct (`@arwa_buildsxsells_tx · n/9`), contact/compliance info correct, no text overflow, no pure white/black anywhere.
   - **Engagement quality** (the actual goal — a carousel that trends and grows followers, not just one that passes the checklist): does the cover hook pass a thumb-stop test at feed-thumbnail size, for real, looking at the image? Do slides 2 and 6 leave a real open loop? Do the colored emphasis words alone tell the story if you read only them? Does the CTA read as an invitation, not a lecture?
4. **Fix and re-render.** Apply fixes in the main thread, then re-render only the affected slides (or all, if simpler). Re-review once if fixes were non-trivial; if something still can't be resolved cleanly, surface it to the user rather than shipping it silently — don't loop more than once before flagging.
5. **Present the full rendered set to Ishant** in one reviewable format (a contact-sheet/grid view, not 9 separate attachments he has to click through one at a time), along with a short QA summary: what's working, what got revised and why (or "nothing needed changing" if genuinely true), and an honest read on whether it's actually engaging — not just rule-compliant. This is Ishant's real visual approval gate; offer one revision round by default.
6. Append a line to `posts/topics-log.md`: `| topic | slug | created date | posted date (ask user later) | DM keyword |`.

## Phase 4 — Handoff for manual posting

**Decided 2026-07-29: no automated API posting.** Direct Instagram Graph API integration and Metricool (a paid third-party scheduler, ~$54-65/month for API access) were both considered and explicitly rejected — not worth the cost/complexity for one post a day. Instagram posting stays a human action Ishant does himself from his phone; this phase's job is to make that as easy as possible, not to remove the human.

After Phase 3 approval, on the same "go":

1. **Package a delivery page.** Publish a private web page (via the Artifact tool, same technique as the Phase 3 review contact-sheet) showing all 9 rendered slides at full size — mobile browsers support long-press-to-save on an `<img>`, so no download button is needed — plus the caption text in a copy-ready block.
2. **Recommend a posting time.** Check `references/posting-times.md` for the current best-practice guidance and state the next good posting window (e.g. "today, 7-9pm" or "tomorrow morning, 9-11am") based on what day it is. This is general best-practice guidance, not Arwa-account-specific analytics — no Instagram Insights access exists yet to personalize it further.
3. **Hand Ishant the link.** He opens it on his phone, saves the 9 images, copies the caption, and posts manually at (or near) the recommended time.
4. Once he confirms it's posted, update `posts/topics-log.md`'s "Posted" column — still a manual update, there's no API to detect this automatically.

## Disclaimers and advertising compliance

Educational real-estate content is marketing by a licensed agent, so every caption gets a compliance pass:

- **Topical disclaimers (always, when applicable):** tax or legal topics → "Educational only, not tax/legal advice — consult your CPA/attorney"; financing/rates → "Not lending advice; rates and programs change — confirm with your lender"; market predictions → frame as observation, never a promised outcome. Recommend the right disclaimer proactively; the user has asked for this.
- **TREC advertising basics (Texas):** advertisements by a license holder must be truthful, non-misleading, and identify the license holder and their **brokerage** (broker's name or assumed name). Until the user supplies Arwa's brokerage name, flag its absence on every post — do not publish-ready-stamp a caption without raising it. When provided, add it to the caption signature (and keep IABS + Consumer Protection Notice links in the IG bio, not per-post).
- **Claims discipline:** no "guaranteed", no promised returns or appreciation, no "best/top agent" unless substantiated, no specific client outcomes without consent. "REALTOR®" only if Arwa is an NAR member.
- **Fair housing:** educational content stays about properties, numbers, and process — never about who lives where or "good/bad" neighborhoods framed by demographics.

## Quality bar (Phase 3 review checklist)

- Cover hook ≤ 12 words and legible at thumbnail size
- Every interior slide ≤ 35 words, text block ≤ ~60% of canvas height
- Backgrounds alternate espresso/plaster exactly per the table
- Exactly one diagram slide, exactly one CTA keyword used consistently (slides 1 caption + 9 + caption.txt)
- No pure white (#FFF) or pure black (#000) anywhere — the palette's plaster/espresso are the extremes
- Cover hook passes a thumb-stop test; slides 2 and 6 leave a genuine open loop; colored emphasis words alone tell the story
