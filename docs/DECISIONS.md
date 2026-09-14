# DECISIONS.md

Current implementation authority: D23 below and `REDESIGN-PLAN.md` supersede historical laboratory-specific requirements for the new application. Earlier entries remain history.

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

## D13 — I superseded: dark theme, must relate to AI engineering → "The Lab"

**Date:** 2026-09-11
**Decision:** The user rejected The Instrument (v4) and restated the brief: **dark theme with
motion, and it must relate to his AI engineering work**; failing that, refine the lair, or draw on
Dexter's Laboratory, SWAT Kats, or ThunderCats — colour themes and locations only, **no
branding, no characters, no names**. New direction **J — "The Lab"**: a hidden underground AI
laboratory. Content mapping: a central console that listens and answers (voice agent); archive
racks with blinking storage (retrieval, 22K chunks); pipes carrying signal pulses between
machines (pipelines); a work bench under a hazard lamp (the case study); a blast door that slides
open at the end (the contact CTA). Location grammar from the SWAT Kats hangar (hidden, launch
tunnel, blast door); palette from the Dexter's Lab world (deep teal, cool metal, hazard yellow).
ThunderCats not used — a fortress and a sword do not read as software.
**IP guard (binding):** no character, no logo, no name, no catchphrase, no signature object.
**Superseded:** D12 (The Instrument). D10/D11 already superseded.
**Carried forward:** typography, pause control, reduced-motion path, spline camera with inertia,
bloom on emissives only, no downloaded assets (all procedural).

## D14 — J locked in spirit; refine toward Dexter's Laboratory, modernised

**Date:** 2026-09-11
**Decision:** The user accepted the lab world (J) and asked to refine it explicitly toward
Dexter's Laboratory: reference the show's actual lab scenes, animate the space the way the lab
looked (modernised), add prop winks such as the pink ballet slippers, and show "Jamil's
Laboratory" on the big screen in the show's title style.
**IP boundary (binding):** no characters, no names of characters or the show, no logo lettering
reproduction. The title is set in a free display face of the same mid-century cartoon spirit,
not the show's logo. Props that evoke the world (slippers, lab coat + purple gloves on a hook,
round glasses on a desk, bubbling tubes, giant levers, a curved computer wall) are fine.
**Method:** research the lab's set from a reference source before building; render it with modern
materials and lighting rather than flat cel colour.

## D15 — Direction LOCKED: "Jamil's Laboratory" (J, refined per D14)

**Date:** 2026-09-12
**Decision:** The user locked the direction with changes. This settles Phase 2.1. Do not revisit.
**The locked changes:**
1. The giant screen carries **only** the words "JAMIL'S LABORATORY" — no status text, no labels.
2. The navigation mark is **MJR**, not the lab name.
3. Animation and 3D quality raised to a professional finish (see PROGRESS for what that meant).
**Superseded:** D10, D11, D12 as directions; D13/D14 stand as the lineage of this one.
**Model note:** the user moved the session to Opus 5, so Phase 2 continues on Opus rather than
Fable (CLAUDE.md §2 fallback). Recorded, not silently substituted.

## D16 — One orchestrated motion moment, not scattered effects

**Date:** 2026-09-12
**Decision:** The page spends its motion budget on a single page-load sequence — the lab powers
up: ceiling strip lights strike, stutter, and settle in series down the hall, then the giant
computer's tube strikes and the title resolves. Sections themselves do **not** fade-and-slide in.
**Why:** a fade-up on every section plus a hover transition on every card is the generic default
and reads as machine-made. One orchestrated moment lands harder and leaves the scroll motion
(camera, pipelines, archive) as the continuous layer. Everything else stays ambient or
scroll-driven.
**Reduced motion:** the sequence does not play; the lab is simply already on.

## D17 — Body copy is full `--bone`; `--bone-dim` is metadata only

**Date:** 2026-09-12
**Decision:** All prose, captions, headings and metric labels use `--bone` (#EAF2F7).
`--bone-dim` is restricted to metadata — organisation line, stack line, footer.
**Why — measured, not aesthetic:** against a blown-white worst case at the text column's far edge
(~46vw), `--bone-dim` scores **2.97**, below the 4.5 AA bar, while `--bone` scores **6.24**.
`--bone-dim` on the lit floor tile measures 3.66, also failing. Metadata survives because it sits
in the first 30vw where the scrim holds .86 and the ratio is 4.89. Dimmed body text is also a
common generated-design tell.
**Rejected:** thickening the scrim to rescue dimmed text — it would have needed ~.84 opacity right
across the column, which reads as a black panel bolted over the scene rather than as lighting.

## D18 — The copy scrim is an accessibility component with derived stops

**Date:** 2026-09-12
**Decision:** Scrim stops are `.90 / .86 @30% / .72 @46% / .40 @58% / transparent @68%`
(desktop) and a bottom-up equivalent on mobile. **It must not be lightened to reveal more scene.**
**Why:** derived against a blown-white worst case so the text column holds AA wherever the
camera's lights fall. This is the build's structural answer to the first failure mode in
BUILD-INSTRUCTIONS §2.6.

## D19 — Performance budget, set before assets and grounded in measurement

**Date:** 2026-09-12
**Decision:** See `DESIGN.md` §7. Headlines: **≤600 KB total transfer (brotli, incl. fonts)**,
60 fps desktop / **≥40 fps mid-range Android**, LCP <2.5 s on 4× throttled CPU, **≤260 draw
calls**, **≤65,000 triangles**, **≤16 lights**, zero console errors.
**Why these numbers:** measured on the locked prototype on Intel UHD Graphics 620 — 212 draw
calls, 43,532 triangles, 32 programs, **2.59 ms per render**, 450 KB uncompressed JS+HTML,
DOMContentLoaded 196 ms. The budget is set just above measured reality so regressions are caught,
rather than at a round number the build could drift into.
**Note:** `PLAN.md` §2.7 proposed ≤2.5 MB. That is now **superseded as far too loose** — the scene
is fully procedural, so there is no asset weight to spend. Banking that slack would have invited
exactly the bloat the budget exists to prevent.
**Mobile is a decision, not a port** (DESIGN.md §7.5): the corridor is kept because a
forward-moving camera down a narrow space suits 9:16 better than landscape; bloom off, DPR capped
1.5, lights 6→3, LEDs 1600→500. Must be validated on a real mid-range Android in Phase 3.

## D20 — The cartoon props stay, over the critique's objection

**Date:** 2026-09-12
**Decision:** The pink ballet slippers, purple gloves and round glasses remain in the scene.
**Why:** the user's explicit call, made after reading the objection in full.
**The objection, recorded so it is not lost and does not get re-litigated:** the Phase 2.6 critique
judged the composite — slippers, white coat, purple gloves, a cartoon-caps title on a CRT — to be
recognisable trade dress, and argued the risk is not legal but perception: a hiring manager who
recognises it may read it as a professional identity built out of someone else's IP. It
recommended keeping the machine room (which it called the strongest idea in the project) and
cutting the fan service.
**Standing guard (unchanged from D14):** no characters, no names, no logo lettering, no
reproduction of the show's title type. Luckiest Guy is a free face, not the show's mark.
**Reversible:** removing three props is a small change if the user later wants it.

## D21 — AlphaLens is presented as in progress, in its own copy

**Date:** 2026-09-12
**Decision:** The AlphaLens case study states plainly that the system is still being built. Its
architecture (LangGraph pipeline, hybrid pgvector + tsvector retrieval, Reciprocal Rank Fusion,
cross-encoder reranking, dual-backend embeddings with failover) is described as designed and
implemented; the `~22K chunks / 200 filings` corpus figures stay, since they describe the dataset;
**`~15 seconds` is a design target and must never be stated as measured.**
**Why:** the user confirmed it is not running. The repo README is public and badged "Phase 1 setup
in progress" — a reader who clicks through after reading "measured, not promised" finds the one
thing that undoes the credibility of everything else on the page. Saying so first costs nothing;
being caught costs the interview.
**Consequence:** `DESIGN.md` §6 section 5 cannot use the word "measured" and must not sit under a
proof framing that implies a running system.

## D22 — Hero copy is drawn from the user's own CV and LinkedIn positioning

**Date:** 2026-09-12
**Decision:** The hero leads with **"Production AI that replaces manual effort at scale."** —
built from his own LinkedIn line, *"shipping solutions that replace manual effort at scale"* — and
carries the 20 hrs/week figure in the opening paragraph.
**Why:** the user asked for the professional content from the CV and LinkedIn rather than invented
copy, and the Phase 2.6 critique found the previous hero ("Welcome to the lab.") carried no number,
no company and no role on the one screen every visitor sees.
**Rejected:** his LinkedIn tagline verbatim ("Building Production-Grade AI Systems That Drive Real
Organizational Value") — accurate but corporate-register, and "drive real organisational value"
says less than "replaces manual effort", which is concrete and measurable.

## D23 — Approved configurable redesign and implementation

**Date:** 2026-09-13
**Decision:** User approved implementing the discussed AI Systems, Made Visible portfolio, with blue-amber, charcoal-copper, olive-champagne and aubergine-silver palettes selected through config/environment. Landing and project listings show summaries; full case studies live on separate project pages. Demonstrations are deterministic browser-only illustrative examples, with no paid APIs/services. Astro + TypeScript builds static routes with reusable components and semantic CSS tokens. Default charcoal-copper is a review starting point, not a final palette choice.
**Authority:** User explicitly requested a detailed plan, required skills and implementation in the same instruction. No additional planning gate is needed for this authorized scope.
**Supersedes:** D14-D16/D20 laboratory presentation, D17-D18 scene-dependent scrims, and the old continuous-3D build recommendation for the new app. Original prototype retained. D7/D9/D21 evidence/privacy constraints remain binding; D22 headline retained.
**Limits:** No publication, remote push or private source exposure. Resume stays request-by-email until a configured public PDF exists; no raw CV is copied. Current Codex model is used because repository-specific Claude models are not available in this session.

## D24 — Identity, imagery, spacing and motion refinement

**Date:** 2026-09-13
**Decision:** User explicitly requested a prominent personal introduction and professional background, improved about/experience/contact copy, stronger section separation, purposeful animations and README-informed project imagery, plus studio editing of two supplied photos. Name-led hero supersedes D22 headline placement. D23 themes, private-source boundaries and free browser-only demos remain. Generated artwork is conceptual; only publicly accessible READMEs and existing approved private-project notes inform it. User portraits may be edited and included in the local website. No publication authorized.

## D25 — Layout and interaction correction

**Date:** 2026-09-13
**Decision:** User rejected the static section compositions and especially the table-like experience layout. Implement distinct section interactions: scroll-driven featured-work presentation, skill exploration, career chapter selection, statement-led About and intent-aware contact. Preserve D23/D24 identity, four themes, source/privacy rules and local-only scope. The new direction supersedes the row-based experience presentation and minimal-reveal-only motion pass.

## D26 — Black Studio preview and viewport-aware project frames

**Date:** 2026-09-14
**Decision:** User supplied a screenshot where large project artwork pushed the title and information below the screen, requested further modern motion references and a dark black/grey studio combination. Add `black-studio` as a fifth palette and select it in config and the existing environment's theme field. Preserve all four previous options. Allocate artwork height only after reserving measured project-copy height and sticky-header clearance. Disable pinning when a viewport cannot accommodate the minimum image plus copy. Use a shared moving selection highlight and active-project border emphasis. No paid runtime libraries or services; no publication.

## D27 — Matching portrait, neon accents and elegant text motion

**Date:** 2026-09-14
**Decision:** User approved matching the portrait to Black Studio and trying neon interaction lighting plus animated text, with elegance preserved. Use a low-key graphite portrait with natural face lighting and faint mint shoulder rim. Preserve the earlier image files; select the new portrait only for Black Studio. Mint `#8CF5C6` highlights interactive states and the portrait boundary, while reading text remains neutral. Main headings and introductory copy use finite masked word reveals; long-form copy remains still. No flashes, idle loops, fake typing or paid runtime services. Original personal content and case-study separation remain unchanged.

## D28 — Neon is transient motion, never control fill

**Date:** 2026-09-14
**Decision:** User corrected D27: neon must appear only in animation highlights, not button fills, bars or persistent selected states; use multiple neon colors. Restored all UI surfaces and progress indicators to neutral palette tokens. Mint, violet and rose now appear in finite text-reveal light and 1.1-second interaction halos, including a temporary portrait boundary. Effects return to neutral even with the pointer held in place. Reduced motion disables the colored animation. This supersedes D27's permanent mint UI treatment.

## D29 — Software-focused covers for every project

**Date:** 2026-09-14
**Decision:** User rejected the object-based covers and requested internet-informed images for all projects that clearly communicate AI/software. Replaced all seven live covers with original vector software-interface concepts: speech, call review, cited retrieval, seasonal reporting, receipt extraction, ordering and agricultural ML. The imagegen request was blocked by usage limit; user was informed and work continued using locally authored SVGs rendered to WebP, without paid API fallback. Images are labeled Interface concept, use illustrative data and preserve project status/privacy boundaries. Entire software frames remain visible through object-fit containment. Prior covers remain on disk but are no longer referenced.

## D30 — Three expertise areas and CV/LinkedIn reconciliation

**Date:** 2026-09-14
**Decision:** User requested combining AI, software and ML engineering; replacing the standalone software capability with Multi-cloud Data Engineering; adding analytics alongside data science; and matching portfolio content to the two supplied PDFs. Owner explicitly confirmed AWS and Azure. These platforms may be listed as owner-confirmed skills, with no invented services, certifications or provider-specific deployment evidence. Employer job titles remain source-based. D9/D21 and prior metric corrections override conflicting older CV/LinkedIn wording. Full comparison and unresolved source mismatches are in CONTENT-ALIGNMENT-REVIEW.md. Source PDFs and live LinkedIn remain unchanged.

## D31 — Professional background cards and LinkedIn connection

**Date:** 2026-09-14
**Decision:** User requested improving the sparse Saylani/SMIT/Omdena strip and connecting the hero connection button to LinkedIn. Replace the strip with three compact Build, Teach and Collaborate cards containing source-based roles, contributions and dates. Each card opens its matching career chapter through a native anchor and progressive tab selection. The hero Let's connect action opens the configured LinkedIn profile in a new tab. Preserve neutral surfaces and finite mint/violet/rose interaction highlights under D28. No external profile edits or connection requests.

## D32 — Compact mobile navigation

**Date:** 2026-09-14
**Decision:** User requested a toggle instead of the two-row navigation on mobile and small screens. At widths up to 800px, use a 72px logo/Menu header with a non-modal dropdown containing the four links and résumé action. Desktop navigation stays inline. Use finite 240ms open/160ms close transitions and a neutral Menu/Close icon. Escape, outside interaction and link activation close it; reduced-motion and no-JS fallbacks remain. No new dependency or service.

## D33 — Approved résumé download and Vercel deployment preparation

**Date:** 2026-09-14
**Decision:** User requested adding the supplied June 2026 CV and preparing the portfolio for Vercel. Publish the owner-provided PDF unchanged at a stable same-origin download path, with header and footer download controls. Add static Vercel configuration, Node 24.x pinning, safe cache/security headers, deployment-input exclusions and production/preview metadata policy. Production may derive its canonical HTTPS origin from Vercel's stable project domain or an explicit production-only custom origin. Vercel system metadata is read from the Node build environment because Astro's `import.meta.env` did not propagate those unprefixed system variables in a static build. Preview routes remain noindex and disallowed by robots. No deploy, Git remote, Vercel account change, live LinkedIn edit or CV content rewrite is authorized by this preparation.
