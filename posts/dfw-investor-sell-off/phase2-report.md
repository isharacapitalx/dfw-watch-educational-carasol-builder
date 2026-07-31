# Phase 2 report — 2026-07-30 (DFW Housing Watch, scheduled unattended run)

## Outcome: Phase 1 + Phase 2 complete. Phase 3 blocked on a tool-permission constraint, not a content decision. Phase 4 not reached.

## Topic chosen
**"Wall Street landlords are quietly dumping their DFW rental homes."** Score: **90/100** — clears the ≥50/100 auto-approval bar by a wide margin. Full scoring detail in `topic-scoring.md`.
Won mainly on **surprise** (inverts the standard "investors are pricing out families" assumption) and **demand corroboration** (strongest cross-thread validation of the research run: national business press ×4, DFW local news ×2, 5 independent law-firm regulatory alerts, plus a 2,091-comment IG engagement outlier on adjacent content vs. that account's 20-300 norm).

Runners-up: homestead exemption gap for new buyers (69), DFW insurance/hail (64), foreclosure starts with the unverified claim stripped (64). None beat the winner; no tiebreak needed.

## Hook chosen
**"1 in 4 new Dallas listings are Wall Street landlords selling out."** Score: 84/100 (shock 34, curiosity gap 22, specificity 14, brevity 14). 3 other candidates scored 73-76. Full detail in `topic-scoring.md`.

## Dedupe check
Checked `posts/topics-log.md` against the 5-day window (2026-07-26 through 2026-07-30). "DFW growth corridor / price gap" (created 2026-07-27) was hard-excluded as a candidate topic since a DFW Housing Watch version was already built 3 days ago. Today's chosen topic has no overlap with either logged entry.

## Decision point
Per CLAUDE.md's scheduled-run rule: topic score (90) clears the 50/100 bar and a complete 9-slide script was produced → this stood in for the live "go." Proceeded straight into Phase 3.

## Phase 3 status: build complete, render blocked

- **Build:** all 9 slide HTML files + `caption.txt` written to `posts/dfw-investor-sell-off/`, using the DFW Housing Watch templates/CSS/palette (`carousel-dfw-housing-watch.css`, `dfw-housing-watch-badge.svg`) per the brand table — not Arwa's assets.
- **Cover photo:** sourced live from Wikimedia Commons (per brand rule) — a CC0/public-domain aerial photo of a dense single-family subdivision (Alfred Twu, "South-Los-Angeles-subdivision-houses-near-Darby-Park-Aerial-view-from-north-August-2014.jpg," no attribution required), referenced directly by its Wikimedia URL in `slide_1.html`'s `<img>` tag rather than copied locally — see note below on why.
- **Render step could not run.** `bash .claude/skills/carousel-edit/scripts/render.sh posts/dfw-investor-sell-off` returned "This command requires approval" — this interactive session's Bash tool is not pre-scoped the way the actual scheduled LaunchAgent job is (its runner script launches Claude with `--allowedTools "...Bash(bash .claude/skills/carousel-edit/scripts/render.sh*)"`, a grant that only exists for that specific automated invocation, not for this conversation). The same constraint blocked a plain `curl` download for the cover photo, which is why the photo is referenced by remote URL instead of a local `cover-photo.jpg` — Chrome fetches it live at render time (same mechanism it already uses for Google Fonts), so this doesn't block rendering once the Bash permission itself is granted.
- **QA subagent, fix/re-render pass, and Phase 4 handoff packaging did not run** — all downstream of the blocked render step.

## What's needed to finish
A one-time approval of the render command (or an equivalent pre-scoped grant, matching how the real scheduled job runs). Everything else — topic, hook, script, all 9 slides, caption — is complete and ready to render as soon as that's available. This is a tooling/session-permission gap, not a gap in the research, scoring, or script.

## Files in this folder
`research.md`, `comment-questions.md`, `topic-scoring.md`, `caption.txt`, `slide_1.html`–`slide_9.html`, this report. No `out/` yet (render didn't run).
