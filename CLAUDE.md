# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Not a software project — a content-production system that builds educational Instagram carousels, for one of **two locked brand systems** (2026-07-29): Arwa Desai's DFW real estate business (@arwa_buildsxsells_tx, **paused** — she isn't ready to resume yet) or DFW Housing Watch (@dfw_housing_watch, **active** — a page Ishant runs to test carousel engagement in the meantime). Each carousel is 9 static slides (HTML → rendered JPGs) plus a caption; the 9-slide structure, copy rules, and phase pipeline are shared across both brands — only palette, cover treatment, and contact/CTA identity differ. All production logic lives in the `carousel-edit` skill (see its "Brands" section for the full diff table); there is no app code, build system, or test suite here.

## Commands

Render a post's slides to JPG (only run after the user has said "go" on the script — that approval now covers rendering too, part of Phase 3):

```bash
bash .claude/skills/carousel-edit/scripts/render.sh posts/<topic-slug>
```

This headless-Chromes each `posts/<topic-slug>/slide_*.html` at 1080×1350 @3x device scale into `posts/<topic-slug>/out/slide_NN.jpg` (3240×4050, quality 92). Requires Google Chrome at `/Applications/Google Chrome.app` and network access (Google Fonts load in-page). No package manager, linter, or test runner is used in this repo.

## Architecture

**Everything is driven by the `carousel-edit` skill** at `.claude/skills/carousel-edit/SKILL.md` — read it in full before doing any carousel work; it is the source of truth for structure, copy rules, research, and the approval workflow, not summarized here. Supporting docs:

- `.claude/skills/carousel-edit/references/design-system.md` — Arwa brand: locked palette hexes, type scale, layout specs, per-slide-type templates. Read before writing any Arwa slide HTML.
- `.claude/skills/carousel-edit/references/palette-dfw-housing-watch.md` — DFW Housing Watch brand: same role as above, for the active brand.
- `.claude/skills/carousel-edit/assets/` — both brands' boilerplates live here side by side: `cover-template.html`/`slide-template.html`/`carousel.css` (Arwa) and `dfw-housing-watch-badge.svg`/`slide-template-dfw-housing-watch.html`/`carousel-dfw-housing-watch.css` (DFW Housing Watch), plus the shared `neutral-aesthetic-6.js` photo filter (ported from a Lightroom preset — applies `applyNeutralAesthetic6` + `applyGrain` in-page at render time via `<canvas>`, used for Arwa's cover photo).

**Per-post output** lives in `posts/<topic-slug>/`, exactly two directory levels below the project root — the slide templates reference the skill's `assets/` by relative path (`../../.claude/skills/carousel-edit/assets/`), so new post folders must stay at that same depth. A post folder contains `slide_1.html` … `slide_9.html`, `caption.txt`, `cover-photo.jpg`, `research.md` (sourced facts backing every number used in the script), and `out/` (rendered JPGs, git/build artifact — not source). If a request needs **both brands**, Phase 2's research/script stays once in `posts/<topic-slug>/` and each brand's slides/caption go in their own sibling folder instead — `posts/<topic-slug>-arwa/` and `posts/<topic-slug>-dfwhw/`, same depth rule.

**`posts/topics-log.md`** is the append-only record of past topics, used to dedupe topic discovery (no repeat topic within 5 days). Update it after every carousel is built.

**`Arwa photo/`** at the project root holds the rotating pool of source portraits used for Arwa-brand slide-1 covers (filtered via `neutral-aesthetic-6.js` at render time). **`DFW Housing Watch photo/`** holds the equivalent rotating pool for that brand's covers (2026-08-02: switched from live-per-topic Wikimedia sourcing — the cloud automation environment can't fetch external images at render time, confirmed via direct testing — see `references/palette-dfw-housing-watch.md`'s Cover strategy section and that folder's `CREDITS.md`).

## Workflow: 4-phase pipeline

Every carousel moves through four phases, implemented as `## Phase N` sections inside `carousel-edit/SKILL.md` (2026-07-27: merged the old standalone Render phase into Review — judging engagement/legibility honestly requires the actual rendered image, not raw HTML — and renumbered Auto-post to Phase 4). The goal threaded through every phase is carousels that **trend and grow followers**, not just carousels that satisfy the brand checklist — Phase 1 ranks candidate topics for genuine surprise/"wait, what?" value and Phase 3 QAs the rendered result for the same bar.

1. **Research** — check Ishant's user-curated Instagram watchlist (`posts/instagram-watchlist.md` — never auto-discovered) for educational/news carousels and the real-estate questions in their comments, plus DFW forums, local news, and market/appraisal-district sources, for what's both in-demand *and* genuinely attention-grabbing right now. Verify every claim against a primary source. Output: ranked topic candidates + `posts/<slug>/research.md` + `posts/<slug>/comment-questions.md`.
2. **Planning** — topic and hook are picked automatically by weighted scoring systems (no user pick — see SKILL.md's "Topic scoring system" and "Hook scoring system"), then the script gets written for the locked 9-slide structure (same format, fonts, and palette as `design-system.md` — content is the only thing that changes per post). Present the chosen topic/hook with scores + fact sheet + per-slide script + disclaimer notes, and iterate until the user says **"go."** This is the single approval gate — it authorizes Phase 3 (including rendering) to run without asking again.
3. **Review** — build the draft slides, **render them immediately** (`scripts/render.sh`), then QA the actual rendered JPGs (not the HTML) against (a) locked structural/brand rules and (b) the engagement quality bar (thumb-stop test, open loops, colored-word readability, CTA framing) — fix and re-render anything that fails, then present the full set to the user in one reviewable view for their final visual approval.
4. **Handoff** — no automated API posting (direct Graph API and Metricool were both considered and rejected 2026-07-29, not worth the cost/complexity for one post a day). Instead: package the approved carousel into a private web page (all 9 slides + copy-ready caption), recommend a posting time from `references/posting-times.md`, and hand Ishant the link to post manually from his phone.

Non-obvious rules that hold across phases:

- **Never render or re-render slides without asking first** — the phase-2 "go" is that ask, and it now covers rendering too since render is part of Phase 3; don't build/render before it. **Exception: the scheduled daily automation job** (see below) — for that job only, the phase-2 topic-score threshold stands in for the live "go."
- **Research and fact-checking happen before writing copy**, and again as a final check right before render — every number in a script must trace back to a source line in `research.md`.
- The palette, 9-slide structure, typography, and photo filter are locked brand constants — only slide *content* changes per post.

### Scheduled unattended run (2026-08-01: migrated from local LaunchAgent to a cloud routine)

**Mechanism:** a Claude Code cloud routine (not a local Mac process) fires daily at `0 16 * * *` UTC — 11:00 AM Central during CDT (~7.5 months/year), drifting to 10:00 AM Central during CST (~4.5 winter months, roughly Nov–mid-March; accepted tradeoff, not auto-corrected). It runs in an isolated cloud session that clones this project from GitHub (`https://github.com/isharacapitalx/carousel-builder`, public repo) — **your Mac does not need to be on, awake, or even exist for this to run.** Prompt lives at `automation/daily-carousel-prompt.txt`, same as before, adapted for the cloud environment (see constraint below). This is the one context where the interactive "go" gate above does not apply. It targets **DFW Housing Watch** (the active brand) — if Arwa's brand ever comes off pause, update the prompt file to match rather than assuming; the two brands are not interchangeable for this job.

- **Auto-approval substitute for "go":** unchanged from the original design — if Phase 2's topic score clears the ≥50/100 bar (SKILL.md's Topic scoring system) and a complete per-slide script is produced, that stands in for the user's live "go," and the job proceeds straight through Phase 3 and Phase 4 without pausing. If the score doesn't clear the bar, it stops at Phase 2.
- **Still no auto-posting.** The Phase 4 handoff page remains the final checkpoint — Ishant reviews it and posts manually from his phone.
- **Delivery mechanism: the `Artifact` tool, confirmed working in this cloud environment** (verified 2026-07-31 via a direct capability probe — publish actually succeeded). The finished carousel is a real `claude.ai` link. Ishant finds it at `claude.ai/code/artifacts` (newest first) on his phone — no local file, no GitHub Pages needed. The routine also attempts a `PushNotification` as its last action so his phone gets pinged directly, but that's unverified in this environment (same category of surprise as the git-push finding below) — `claude.ai/code/artifacts` is the reliable fallback, not the notification.
- **Hard constraint: this cloud session can read the GitHub repo but cannot push to it** (verified 2026-07-31 — the GitHub↔Claude connection is read/context-only, confirmed by testing and by Anthropic's own description of that integration; not a permissions toggle to fix, a real capability boundary). Concretely:
  - `posts/topics-log.md` is **not** updated by this job — the 5-day dedupe check reads whatever's in the repo as of the last manual push, which will drift stale over time. Ishant/Claude sync it by hand periodically as a known follow-up; this is an accepted gap, not a bug to chase.
  - Nothing else the job builds (research.md, topic-scoring.md, rendered JPGs, etc.) persists anywhere durable after the session ends — the Artifact page is the only lasting output. This is a real regression from the old local design (which saved everything to `posts/<slug>/` on disk) — accepted in exchange for Mac-independence.
- **Old local LaunchAgent (`~/Library/LaunchAgents/com.ishantd.carousel-daily-research.plist`) is disabled, not deleted** — kept on disk as a same-day manual recovery path if the cloud routine ever has an outage. `automation/run-daily-carousel.sh` still works for a manual local run if needed.
- **Scope of the exception:** this auto-approval applies only to that specific scheduled job. Any interactive session — Ishant typing in Claude Code — still requires an explicit live "go" before Phase 3/rendering, unchanged.
