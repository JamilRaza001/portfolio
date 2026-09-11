# DECISIONS.md

Append-only. A decision recorded here is **locked**. Never edit an entry — supersede it with a
new one that references the old by number. Only the user unlocks a decision.

Format: `## D<n> — <title>` / Date / Decision / Why / Rejected alternatives / Supersedes.

---

## D1 — chrome-devtools is the primary browser MCP; playwright stays as a dormant fallback

**Date:** 2026-09-11
**Decision:** All visual verification, performance measurement, and console checking goes through
the `chrome-devtools` MCP. The `playwright` MCP entry in `~/.claude.json` is kept, repaired, and
left unused.
**Why:** `chrome-devtools` was tested live and passed. It provides `lighthouse_audit`,
`performance_start_trace`, and CPU/network `emulate` — all three are required by Phase 3's
performance budget work and none are offered by `@playwright/mcp`. Playwright's failure was a
corrupted npx cache entry (`playwright-core` missing from `_npx/9833c18b2d85bc59`), not a design
problem, so it costs nothing to keep as a fallback.
**Rejected:** Removing playwright entirely (user wants it available if chrome-devtools ever falls
short). Using playwright as primary (lacks Lighthouse and CPU throttling).

## D2 — MCP servers are configured project-scoped in `.mcp.json`

**Date:** 2026-09-11
**Decision:** `chrome-devtools`, `context7`, and `stitch` are declared in `/.mcp.json` at the
project root and committed to the repo.
**Why:** BUILD-INSTRUCTIONS §0.5 — both the CLI and the Desktop Code tab read this file, so the
toolchain survives the user moving between surfaces. `chrome-devtools` is declared here even
though the ECC plugin also provides it, so the project stays self-contained if ECC is ever
disabled or updated.
**Rejected:** Installing `context7` as a marketplace plugin (adds plugin-scope/project-scope
divergence for what is a three-line HTTP entry). Surface-specific config (explicitly forbidden).

## D3 — Secrets live in `.claude/settings.local.json`, never in `.mcp.json`

**Date:** 2026-09-11
**Decision:** `.mcp.json` contains only `${VAR}` references. The real `STITCH_API_KEY` value is
set in `.claude/settings.local.json` under `env`, which is gitignored. `.env` is retained as the
user's own copy and is also gitignored. `.env.example` documents the variables with no values.
**Why:** Claude Code expands `${VAR}` in `.mcp.json` from the session environment and does not
read `.env`. A project `settings.local.json` `env` block supplies it per-session without touching
the machine's persistent environment and without putting a key anywhere git can reach.
**Rejected:** `setx` / persistent user environment variable (a machine-wide change for one
project's key). Literal key in `.mcp.json` (would be committed — forbidden by §0.5).

## D4 — Stitch MCP endpoint verified by handshake, not by blog post

**Date:** 2026-09-11
**Decision:** Stitch is configured as HTTP transport at `https://stitch.googleapis.com/mcp` with
an `X-Goog-Api-Key` header.
**Why:** The official docs page renders only behind a signed-in session, and the widely-cited
`@google/stitch-mcp` npm package **does not exist** (registry returns 404). The endpoint was
confirmed directly with a JSON-RPC `initialize` call: HTTP 200, protocol `2025-06-18`, followed by
`tools/list` returning 15 tools including `upload_design_md` and `create_design_system_from_design_md`.
**Rejected:** Third-party community forks of a Stitch MCP server found in search results
(`mattferry`, `oogleyskr`, `GreenSheep01201`) — unvetted code holding a live API key.

## D5 — Git initialised locally; no remote until the user says so

**Date:** 2026-09-11
**Decision:** Repo initialised on branch `main`, committed locally. No remote configured, no push.
**Why:** User instruction. Versioning from Phase 0 means the whole build is recoverable; the
remote is a separate decision that Phase 4 (Cloudflare Pages) will need but does not need yet.

## D6 — Skill scope is narrowed by naming, not by disabling

**Date:** 2026-09-11
**Decision:** This build uses a short, explicitly named skill list (see `PLAN.md` §Toolchain).
Skills outside that list are not invoked for portfolio work. No globally installed skill or plugin
is disabled.
**Why:** 278 ECC skills are enabled, including four overlapping motion skills and three
overlapping design skills. BUILD-INSTRUCTIONS §0.4 warns that overlapping skills cause inconsistent
behaviour. Disabling them globally would degrade the user's other projects; a binding named list
gets the same determinism with no collateral damage.
**Status:** Taken as a default — user was asked and did not object. Reversible on request.

## D7 — Employer work is published as text and architecture only; no screenshots

**Date:** 2026-09-11
**Decision:** Saylani internal systems (Call Center QA Analyzer, Qurbani Operations Dashboard,
Voice Agent, the internship RAG chatbot) may be described in words, with their metrics, and
illustrated with **original architecture and data-flow diagrams**. **No screenshots of internal
UI, and no internal data.** The employer may be named.
**Why:** User's explicit answer at the Phase 1 gate.
**Consequence for design — this is a constraint that helps:** the portfolio cannot lean on product
screenshots, which is the default and most generic way portfolios show work. It must instead show
**system architecture**. For a scroll-driven 3D site that is a better fit anyway: screenshots sit
badly inside a 3D scene, whereas pipelines, retrieval flows, and ASR→LLM→TTS chains are naturally
spatial and can *be* the 3D subject rather than a flat image pasted into it.
**Rejected:** Full screenshots (not permitted). Anonymising the employer (permitted to name them,
and the name carries real weight — Pakistan's largest welfare organisation).

## D8 — Shoe-shop receipt automation is a featured case study

**Date:** 2026-09-11
**Decision:** The shoe-shop receipt/bill extraction project gets a full case-study slot, despite
not appearing on the CV.
**Why:** User's choice at the Phase 1 gate, and it closes the widest claim-versus-proof gap in the
corpus — the CV claims OCR, OpenCV, and computer vision as core competencies while the only
supporting public artifact is an undocumented pothole detector.
**Blocked on:** extraction stack, receipt volume, and manual hours removed are all still unknown.
**These are required before Phase 2 step 2.2.** The seasonal revenue figure is NOT usable (see
CONTENT.md §9.2).

## D9 — Claims that will not appear on the site

**Date:** 2026-09-11
**Decision:** Three claims are barred from the portfolio regardless of how the design evolves:
1. Any causal phrasing of the **32% donation growth** — he supported it with visibility, did not
   cause it. Approved wording is in `CONTENT.md` §9.1.
2. The **shoe-shop seasonal +20% revenue** as an outcome of the automation — seasonal retail
   uplift is not attributable to it.
3. **"Validated on a labeled eval set"** for the internship RAG chatbot — the user confirms no
   concrete eval exists.
**Why:** Each would fail under one interviewer question, and a portfolio that collapses under
questioning is worse than a modest one that holds. Flagged to the user for the CV as well.

## D10 — Direction G "The Lair" selected, provisionally, pending a motion prototype

**Date:** 2026-09-11
**Decision:** Of six proposed directions (A–F) plus two "wow" directions (G Lair, H Observatory),
the user selected **G — The Lair**, with the explicit condition that a moving, 3D prototype be
shown before the design is locked. Until that prototype is approved this decision is provisional.
**Why:** User judgment after seeing D, B, G, and H as Stitch stills (hero + case study for G and
H). G had the most immediate wow; the user prioritised that over D's content-truth and H's
stronger case-study treatment.
**Binding constraints carried into G:**
- Content spine is **echolocation** (sound out, echo back) — not fandom. Every motion and
  metaphor must trace to it.
- **No IP:** no emblem, no signal, no cowl, no vehicle, no character or place names. Natural
  bats, rock, lamplight only.
- **No fabricated metrics** (D9). The "10,000 queries" Stitch invented is struck.
- The case-study surface is a **stone plinth**, not a rounded card. Stitch defaulted to a card;
  the build must not.
**Rejected:** D (too quiet for the user), H (better system, less wow), B (structural mismatch
with voice/dashboard work), A/C/E/F (not shortlisted).

## D11 — G amended: no hero bat; cinematic path camera; dark cave with bioluminescent neon

**Date:** 2026-09-11
**Decision:** After reviewing prototype v2 the user asked to (1) remove the bat, (2) make it more
cinematic, (3) go dark-theme with neon animations "like a dark cave". Supersedes the hero-object
approach of v2 while keeping D10's direction G and its constraints.
**How the neon is kept specific rather than generic:** the cold light is **glow-worm
bioluminescence** — a real cave phenomenon — as blue-green points across the ceiling and as
sonar rings of light; the warm light stays the oil lamp's flame. Two motivated hues, no others.
The echolocation spine survives as sonar: signal out, answer back.
**Camera:** a spline path through the cave scrubbed by scroll (the Cartier / Primland pattern),
with bloom post-processing so emissive light actually glows.
**Assets:** bat removed from the page and the artifact. Rocks and lamp stay. HDRI remains unused
in the prototype (host cannot serve it); kept for Phase 3.
**Risk acknowledged:** near-black with a neon accent is the most common AI-generated look. The
mitigation is motivation — every light source is something that exists in a cave — and
restraint: bloom on emissives only, one cold hue.

## D12 — G superseded: an Oryzo-suited direction with a procedural hero object; assets dropped

**Date:** 2026-09-11
**Decision:** After v3 the user judged that the dark cave does not suit the Oryzo treatment he
wants, asked for the downloaded assets to be removed, and for a different theme that does suit
it. New direction **I — "The Instrument"**: a single procedural speaker driver (paper cone,
rubber surround, brushed-metal basket) under studio light on a slate drafting mat with a
millimetre grid, annotated like an engineering drawing. Scroll dollies into the object on Z and
orbits it; annotations draw in per section; **outcome metrics are rendered as dimension lines**
measured against the object.
**Why it suits Oryzo:** one crafted object, product-photography lighting, material realism from
shaders rather than scans, technical-drawing language, calm temperament.
**Why it fits the content:** the driver is the sonar idea made physical — sound out, answer
back — and voice is one of his two strongest areas. The dimension-line metrics keep the
result-first inversion.
**Alternates held in reserve:** a receipt stack (D as an object); a rotary telephone dial.
**Superseded:** D10 (G The Lair) and D11. Bat, rocks, lamp, HDRI removed from the repo tree.
**Carried forward:** typography (Big Shoulders Display + Atkinson Hyperlegible) and the pause /
reduced-motion requirements. Colour system changes: slate mat, kraft paper, amber callouts,
bone text. No neon, no black.
