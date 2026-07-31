# Carousel report — DFW Housing Watch — 2026-07-31 (unattended scheduled run)

## Chosen topic + why
**"Texas is now the #1 state in the nation for foreclosure starts"** — score **76/100**, clears the ≥50 bar comfortably. Won mainly on **surprise** (30/35 — most readers assume foreclosures are a 2008 relic; a quiet FHA rule change made Texas #1 nationally) and **demand corroboration** (15/20 — three independent threads: a watchlisted IG account already using this exact angle, national mortgage-industry press, and primary ATTOM data with Dallas-specific numbers). Full breakdown in `topic-scoring.md`.

## Content brief
This carousel explains a policy change most homeowners haven't heard of — FHA quietly ended over 4 years of pandemic-era loan-modification relief (capped at 1 mod per 24 months, Oct 2025; new 3-month trial-payment requirement, Feb 2026) — and connects it to a concrete result: Texas leading all 50 states in foreclosure starts in Q1 2026, with Dallas-specific numbers. Audience: DFW homeowners (who should know their options narrowed) and DFW buyers (who should watch rising REO inventory). Not doom content — the takeaway is process/options education, not a crash prediction.

1. Hook cover — "One quiet rule change just made Texas #1 in foreclosures nationwide."
2. Setup — foreclosures never left, they went quiet; a federal rule reopened the door; open loop on "who it hits first."
3. Problem — miss the new rule, get one shot instead of four to catch up.
4. Mechanism — **diagram (timeline)**: Oct 2025 rule cap → Feb 2026 trial-payment requirement → Q1 2026 result (Texas #1, 10,617 starts).
5. Payoff/numbers — 14,020 REOs nationally (+45% YoY), 2,427 Dallas foreclosure starts in Q1 2026.
6. Rules/urgency — one trial period to prove you can catch up; open loop into slide 7.
7. Scale play — bulleted loop: filings +20% nationally, REO inventory +45% YoY, more of these homes hitting DFW listings before buyers notice.
8. Positioning — why follow: tracks rule/inventory shifts before they're common knowledge.
9. CTA — "Follow for more," @dfw_housing_watch, no DM keyword (brand rule).

## Fact sheet (sourced in research.md)
- Texas: 10,617 foreclosure starts in Q1 2026, #1 of any state (ATTOM, direct-verified 2026-07-31)
- Dallas: 2,427 foreclosure starts in Q1 2026 (ATTOM, direct-verified 2026-07-31)
- Nationally: 14,020 REOs in Q1 2026, +45% YoY (ATTOM)
- FHA: 1 loan mod per 24 months (Oct 2025), new 3-month trial-payment requirement (Feb 2026) (National Mortgage News)
- Nothing flagged as unverifiable and cut — all core numbers traced to primary/near-primary sources, two (Texas Comptroller homestead figures, ATTOM foreclosure figures) re-verified live during this run via direct fetch/search rather than carried over from Phase 1 unverified.

## Auto-selected hook + score
**Winner: "One quiet rule change just made Texas #1 in foreclosures nationwide."** — 87/100 (Shock 34/40, Curiosity gap 26/30, Specificity 12/15, Brevity 15/15). Withholds *what* the rule change is (the swipe-worthy gap) while naming the surprising result (Texas #1) — balances specificity against curiosity gap per the scoring system's guidance.

Runner-up candidates:
- "The loan protection Texas homeowners didn't know they had just ran out." — 73/100 (weaker specificity, no named stakes/ranking)
- "Texas just became the #1 state in America for foreclosures." — 62/100 (fully states the fact, no curiosity gap — disqualifying weakness on that dimension)

## Disclaimers + compliance notes
- Added: "Educational only, not legal or financial advice. If you're behind on mortgage payments, contact your loan servicer or a HUD-approved housing counselor directly." (caption.txt) — appropriate given this touches loss-mitigation/foreclosure process, a financial/legal-adjacent topic.
- No guaranteed-outcome language; no specific-person claims; fair-housing clean (content is about process/numbers, not who lives where).
- DFW Housing Watch brand rule followed: no personal name, no email, no DM keyword — CTA is "Follow for more" only.

## Top 10 audience questions
None available this cycle — comment volume on qualifying watchlist posts was too thin (0-4 comments) to extract a signal. See `comment-questions.md` for detail.

## Cover photo sourcing
`slide_1.html` hotlinks (does not locally copy — matches the 2026-07-30 post's pattern, avoids requiring local network-fetch tooling) a Wikimedia Commons photo of a single-family home in Southlake, TX (CC-BY-SA 3.0, https://commons.wikimedia.org/wiki/File:Home_in_Southlake.JPG) — within the DFW focus area (northeast Tarrant county), reads as a normal North Texas residential home (verified before selecting, per the palette doc's 2026-07-30 lesson about wrong-region photos).

## Decision point
Topic score 76/100 clears the ≥50 bar and the script above is complete → per CLAUDE.md's scheduled-run auto-approval rule, this stands in for the live "go." Proceeding directly to Phase 3 (build/render/QA) and Phase 4 (handoff) without pausing.

---

## Phase 3/4 outcome (final)

**Phase 3 — Review:** Built and rendered all 9 slides. Dispatched a fresh subagent (no authorship bias) to QA the rendered JPGs against structural/brand rules and the engagement bar. It found 3 required fixes: (1) slide 3 had a fabricated "four chances" number not backed by `research.md` — reworded to remove it; (2) the original cover photo (a Southlake home) had a legible "MODEL HOME" yard sign, thematically mismatched with a foreclosure story — swapped for a different, sign-free Wikimedia Commons Southlake home photo (same license/region-verification standard); (3) slide 6 raised stakes without giving at-risk homeowners anything actionable, which risked reading as doom content despite the research justification for why this topic isn't — added "Call your servicer first" plus a forward-pull line into slide 7. Applied all three fixes and re-rendered once (the one allowed pass); re-reviewed the affected slides visually and confirmed all three are resolved cleanly. `posts/topics-log.md` updated with today's entry.

**Phase 4 — Handoff:** The Artifact tool (used in interactive sessions to publish a private hosted page) was **not available in this unattended scheduled session** — confirmed via tool search, not assumed. Built the equivalent deliverable as a local static page instead: `posts/dfw-foreclosure-surge/handoff.html`, showing all 9 rendered slides in a grid plus the copy-ready caption and a posting-time recommendation. This is a real functional gap versus a normal interactive run (no shareable link to hand off) — flagging it plainly rather than claiming a hosted link exists. Ishant can open `handoff.html` locally (or the `out/` folder directly) and AirDrop the images to his phone.

**Posting-time recommendation:** Friday 2026-07-31, generated at ~12:18 PM local — currently midday, so recommend today's 6-9pm evening window (the strongest carousel window per `posting-times.md`). Friday is flagged as a historically weaker engagement day for carousels, but same-day posting is still preferred over delaying.

**Outcome:** Carousel fully built, QA'd, and packaged. Topic: "Texas #1 in the nation for foreclosure starts" (score 76/100). No blocking issues remain. Ready for Ishant's manual review and posting — see `handoff.html` for the full package.
