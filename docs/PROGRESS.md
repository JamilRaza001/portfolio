# PROGRESS.md

Append-only log of where the work actually stands. Newest entry at the bottom.
Write here **before** a session ends, is compacted, or runs low on context.

**Current phase:** Phase 0 — Environment (at gate, awaiting user approval)
**Next action:** User reviews Phase 0 gate report. On approval, begin Phase 1 (Content).

---

## 2026-09-11 — Session 1 — Phase 0 (Opus)

### Done

**Audit.** Full inventory taken of skills, plugins, MCP servers, hooks, sub-agents, runtimes.
Project was a genuine cold start: two files (`CLAUDE.md`, `BUILD-INSTRUCTIONS.md`), no git, no
`docs/`, no `.mcp.json`.

- Plugins enabled: `frontend-design`, `code-review`, `superpowers` (6.3.0), `ecc` (2.0.0, stale),
  `ponytail` (4.9.0). 278 ECC skills / 67 agents / 94 commands + 14 superpowers skills.
- Hooks: none user-defined. All active hooks came from plugins (ECC Bash/Write/Edit preflight,
  ponytail + superpowers SessionStart).
- Runtimes: Node v24.15.0, npm 11.12.1, git 2.55.0. Python absent (irrelevant to this build).

**MCP servers tested live, not assumed.**

| Server | Result |
|---|---|
| `chrome-devtools` (ecc plugin) | PASS — `list_pages` returned |
| Claude Browser (built-in) | PASS — navigated |
| GitHub connector | PASS — auth'd as `JamilRaza001`, 54 public repos |
| `playwright` | FAIL — diagnosed, see below |

**Repair.** `playwright` MCP root cause found by running the binary outside Claude Code: npx cache
entry `_npx/9833c18b2d85bc59` was half-written — `@playwright/mcp` present, its `playwright-core`
dependency missing (`MODULE_NOT_FOUND` on `utilsBundle.js`). Not auth, not transport, not runtime.
Removed the corrupted cache directory so it re-resolves cleanly on next use. Config entry retained
as a dormant fallback per user instruction (D1).

**Installed / configured.**
- `.mcp.json` at project root with `chrome-devtools`, `context7`, `stitch` (D2).
- Context7 configured direct as HTTP (`https://mcp.context7.com/mcp`) — works anonymously, no key.
- Stitch verified by live JSON-RPC handshake before trusting any documentation (D4): HTTP 200,
  protocol `2025-06-18`, 15 tools including `upload_design_md`.
- Secrets wired via gitignored `.claude/settings.local.json` env block (D3). `.env.example` added.

**Hooks configured** in `.claude/settings.json` (project-scoped, committed):
- `SessionStart` — prints the CLAUDE.md §0 read-order reminder.
- `PostToolUse` on `Edit|Write` — `.claude/hooks/verify.cjs`. Runs `npm run typecheck`/`lint`,
  returns failures to Claude as blocking (exit 2). Throttled to one run per 15s. Silent no-op
  until a `package.json` with those scripts exists, so it costs nothing before Phase 3.
- `Stop` — warns if `docs/PROGRESS.md` has not been touched in over 2 hours.

**Scaffolded** `docs/PLAN.md`, `docs/PROGRESS.md`, `docs/DECISIONS.md`. Git initialised on `main`,
local only, no remote (D5). Verified `.env` and `.claude/settings.local.json` are both gitignored.

**Wrote `docs/PLAN.md`** — the Phase 0 deliverable.

### Decisions recorded
D1–D6. See `DECISIONS.md`.

### Open / carried forward
- **Stack not yet chosen.** PLAN.md §Phase 3 carries a recommendation (Vite + React + R3F, static
  to Cloudflare Pages) and the reasoning against Next.js. Must be locked before Phase 3 starts.
- **GitHub private-repo reach untested.** The connector works for the authenticated user; whether
  it reads private repos is unverified. Test at Phase 1 step 1.2 and only then ask for a PAT.
- **ECC plugin is ~2 months stale** (local `754b8dd` 2026-07-17 vs remote `c9148d0`). Not updated —
  updating mid-build changes hook behaviour under us. Revisit between phases if an ECC skill misfires.
- **Git email is `jamilraza001@gamil.com`** — likely a typo for `gmail`. Commits will not link to
  the GitHub account. Left unchanged (user's config); flagged for the user to fix.

### Phase 0 verification (end of session 1)

`claude mcp list` run from the project root:

```
plugin:ecc:chrome-devtools  - Connected
playwright                  - Connected   <- repair confirmed working
chrome-devtools  (.mcp.json) - Pending approval
context7         (.mcp.json) - Pending approval
stitch           (.mcp.json) - Pending approval
```

- **playwright is fixed.** It went from `CONNECTION_CLOSED` to `Connected` after the corrupted
  npx cache directory was removed. Dormant fallback per D1, but a working one.
- **The three project-scoped servers show `Pending approval`** — this is normal and expected.
  Claude Code requires a one-time user approval for servers declared in a project `.mcp.json`,
  because that file is executable config that travels with a repo. **The user must approve them
  once** before Phase 2/3 can use them.
- Both HTTP servers were additionally verified out-of-band with raw JSON-RPC, independent of
  Claude Code: Stitch returned 15 tools, Context7 returned `resolve-library-id` + `query-docs`.
- `chrome-devtools` is now declared twice — once by the ECC plugin, once project-scoped. They get
  distinct tool prefixes so there is no collision, and each only spawns when called. **Phase 3
  should consistently use the project-scoped one** so the build does not depend on ECC staying
  installed.

---

## 2026-09-11 — Session 1 (cont.) — Phase 1 Content (Opus)

### Done
- MCP approvals confirmed: `chrome-devtools` and `context7` Connected. Stitch's `claude mcp list`
  timeout was a transient health-check window — direct retry returned 15 tools in 3.5s. Not a fault.
- Raw PDFs gitignored (`*.pdf`, with `!public/**/*.pdf` so a published resume can still be committed).
- Read `MJR_CV_9 6 2026.pdf` (3pp) and `Profile.pdf` (LinkedIn export, 4pp) in full.
- **GitHub private-repo access CONFIRMED** — connector returned 2 private repos. **No PAT needed.**
  PLAN.md step 1.2 resolved.
- Repo inventory: 55 total (53 public, 2 private). ~35 are 2024 bootcamp exercises.
- Dispatched 3 `Explore` sub-agents in parallel, READMEs only, across 12 candidate repos.
- Wrote `docs/CONTENT.md` — the structured content model.

### Headline finding
**The GitHub evidence is materially weaker than the CV implies.** Of 12 candidates: 4 have no
README at all, 1 README is 0 bytes (`SecureVision-AI`, public and CV-linked), 3 describe projects
explicitly at an early phase, and 1 (`CB_voice-agent`) carries a clone URL pointing at a third
party's repository. **The two strongest CV projects — Call Center QA and the Qurbani Dashboard —
have no repo on his account at all.**

Only ~5 hard numbers exist across the entire corpus. This directly threatens the result-first card
inversion that `PLAN.md` §1.5 carries over from the reference site.

### Open — blocking Phase 2
1. Outcome numbers: get them, or Phase 2 switches to an architecture-first hierarchy.
2. Locate Call Center QA + Qurbani repos, or treat as link-less case studies.
3. Employer permission for publishing internal Saylani system details.

### Next action
User answers the Phase 1 gate questions. Then Phase 2 (Design) — **model switches to Fable**.

### Phase 1 gate — closed 2026-09-11

User supplied outcome metrics. **Blocking gaps 1 and 2 resolved**; enough defensible numbers now
exist for the result-first card inversion. Decisions D7–D9 recorded.

- **Permission resolved:** text + metrics + original diagrams. **No screenshots of internal UI.**
- **Shoe-shop receipt automation promoted to featured case study** (new, not on CV).
- Withdrew the `CB_voice-agent` plagiarism flag — branch contribution to an upstream repo.

**Still needed before Phase 2 step 2.2 (design system):**
- Shoe shop: extraction stack, receipt volume, manual hours removed.
- `whatsapp-new`: owning org, if it is to be referenced at all.

**Next action:** Phase 2 — Design. **Requires model switch to Fable** per CLAUDE.md §2.
Awaiting user go-ahead at the gate.

---

## 2026-09-11 — Session 1 (cont.) — Phase 2 Design (Fable 5.1)

- Model switched to Fable 5.1 by user (`/model`). Confirmed.
- Skills loaded per PLAN: `superpowers:brainstorming` (classified architectural), `frontend-design`.
- Reference research done as user requested (three roundups read, three sites inspected in
  browser). Principles and the rejected game-world pattern recorded in `docs/design/DIRECTIONS.md`.
- Proposed 3 directions (A/B/C); user asked for more; proposed 3 more (D/E/F). User shortlisted
  **D and B** and asked to see both before choosing.
- Stitch MCP tools are not registered in this session (session predates `.mcp.json`); drove the
  endpoint via raw JSON-RPC instead. Project `11074993871830386819`. Generated D and B hero
  stills, one refinement pass each. Stills + token plans in `docs/design/`.
- Shoe-shop metrics: none available (user). `whatsapp-new`: team project, no link.

**Next action:** user picks D or B → record in DECISIONS.md → Phase 2.2 design system via Stitch
`upload_design_md` → 2.3 motion spec → 2.4 layout → 2.5 reduced-motion → 2.6 sub-agent critique
→ 2.7 performance budget.
- Round 2 (user asked for wow): rendered G The Lair and H The Observatory, hero + Voice Agent
  case study each. Caught a fabricated metric in G's hero and a defaulted SaaS card in G's case
  section; both logged in DIRECTIONS.md. H's star-chart case study is the strongest screen so far.
  **Decision pending: D / G / H.**
- User chose **G — The Lair** provisionally (D10) on condition of seeing it move. Built a
  Three.js/GSAP motion prototype (spike, throwaway) against Context7-verified current APIs and
  published it as an artifact. Awaiting verdict to lock D10 and proceed to 2.2.
- Prototype verified running via local preview server: module loads, scroll scrub works, no
  console errors. Replaced deprecated `THREE.Clock` with `THREE.Timer` (Context7-confirmed) and
  republished. Artifact: https://claude.ai/code/artifact/98072a00-d091-4bb0-8379-f9e0dce55cd2
  **Gate: awaiting user verdict on the motion to lock D10.**
- **v2 prototype** (user: "make it like Oryzo"): one hero object. Rigged Quaternius bat (CC0,
  228 KB, `Bat_Flying` clip) with a physical fur-sheen material; keyed by a real Poly Haven oil
  lamp with a flickering flame, cool rim, moonless-night HDRI fill; `rock_face_01` walls and
  instanced `moon_rock_01` rubble; ScrollSmoother inertia; spherical camera rig scrubbed through
  three moves. Assets downloaded with permission, logged in `docs/ASSETS.md` — **user decides
  after review whether they stay.** Verified over local server; one legacy call fixed
  (`PCFSoftShadowMap` removed in r186 → `PCFShadowMap`). Published with 21 asset files.
  **Gate: awaiting user verdict on v2 to lock D10.**
- **v3 prototype** (D11: no bat, more cinematic, dark cave with neon): camera rides a spline
  through the cave with inertia; warm light = three oil lamps with flicker and shafts; cold light =
  900 twinkling glow-worm points, sonar rings, and a light pulse running ahead down a shader-lit
  trail; half-res UnrealBloom. Verified locally; wall scale normalised after the look. Bat removed
  from the artifact. **Gate: awaiting user verdict on v3 to lock D10/D11.**
- User rejected the cave for the Oryzo treatment (D12). Assets removed from tree. **v4 prototype
  = Direction I, The Instrument**: procedural speaker driver on a drafting mat, studio light,
  drawing overlay with metrics as dimension lines. Verified locally (renders correctly, no
  errors), published. **Gate: awaiting user verdict on v4 to lock the direction.**
- User rejected v4 (D13): brief restated as dark + motion + must relate to AI engineering.
  **v5 = Direction J, The Lab** — underground AI laboratory, all procedural. Verified in the pane;
  found and fixed a reduced-motion camera bug (`scrub:false` → `scrub:true`) present since v1.
  Published. **Gate: awaiting user verdict on v5 to lock the direction.**

## 2026-09-12 — Session 2 — Phase 2.1 continued (Opus)

**Model note:** CLAUDE.md §2 routes design to Fable; the user switched the session to Opus 5
themselves, so Phase 2 continues on Opus. Recorded rather than silently substituted.

- **v6 = "Jamil's Laboratory"** (D14) — direction J refined toward the show's lab, modernised.
  Entrance reveal hero, giant computer showing the title, archive racks, bubbling tubes, pods,
  levers, prop winks, vault door.
- Four defects found and fixed, each diagnosed by raycast/light probing rather than guessed:
  shell geometry cutting through the screen; the chrome entrance deck blowing out under the
  hero copy; bloom+env washing the scene white; and copy legibility left to chance.
- Added a **copy scrim** so text contrast no longer depends on where the scene's lights fall —
  this is a structural answer to BUILD-INSTRUCTIONS §2.6's first named failure mode.
- Verified desktop + mobile 375×812, console clean.

**Gate: awaiting user verdict on v6 to lock the direction and start 2.2.**

### Phase 2.1 CLOSED — direction locked 2026-09-12 (D15, D16)

User locked "Jamil's Laboratory" with three changes, all applied:

1. **Screen shows only "JAMIL'S LABORATORY"** — status text removed; the panel now reads as a real
   CRT (scanlines, a slightly misconverged cyan ghost behind the title, tube vignette).
2. **Nav mark is MJR** with a small cyan power indicator.
3. **Professional polish pass:**
   - **4× MSAA via a multisampled render target** — an EffectComposer bypasses the renderer's own
     antialias, so every edge in the lab was jagged. Single biggest quality gain.
   - **Half-float composer buffer** so the bloom stops banding across the large flat blues.
   - **The one orchestrated moment (D16):** the lab powers up on load — strip lights strike,
     stutter, and settle in series down the hall, then the computer's tube strikes and the title
     resolves. Skipped entirely under reduced motion.
   - **Visible light fixtures** — housings and tubes, because a light with no source on screen
     always reads as fake.
   - **Camera banks into turns from the path's own curvature**, eased, replacing a sine-timer
     roll; idle drift rebuilt from two unrelated frequencies so it never resolves into a loop.
   - `ScrollTrigger.refresh()` on resize.

**Verification note:** the browser pane forces `prefers-reduced-motion: reduce`, so the power-up
sequence cannot be seen there — its objects and tween shapes were verified programmatically
instead (6 lights, 6 fixtures, no throw). Late in the session the pane stopped painting frames
entirely (window occlusion, reported by the tool); DOM and scene state were probed directly to
confirm the page was correct rather than trusting a blank capture.

**Next action:** Phase 2.2 — design system and `DESIGN.md` via Stitch, motion spec with named GSAP
mechanisms, section-by-section layout, reduced-motion path, sub-agent critique, performance budget.

### Phase 2.6 critique — 22 findings, 7 blocking (2026-09-12)

An independent sub-agent reviewed `DESIGN.md`, `CONTENT.md` and the prototype. It was told that
being agreeable would be a failure, and it earned that brief. Full disposition table is
`DESIGN.md` §10 — every finding fixed, or accepted with a reason, or escalated.

**Thirteen fixed this session.** The sharpest:
- **The pause control desynchronised the whole page, and the spec specified the defect.**
  `gsap.globalTimeline.timeScale(0)` freezes the scrubbed camera tween, so after pressing pause the
  copy scrolls on while the camera stays parked in one bay. Verified fixed: `timeScale` now stays
  at 1 and the camera is driven straight from scroll progress while paused.
- **No call to action existed anywhere** on a site whose only job is to get him hired. The email
  was plain body text; two of three nav links pointed at the same section.
- **The `u`-to-section map was arithmetically impossible** — unequal camera ranges driven by one
  linear tween across equal-height sections, five unbudgeted pins, and a tween ending at 0.92 for a
  table needing 1.00. §5.2 rewritten to per-section triggers.
- **The lead slot only ever worked for the easy case.** Two of five case studies have a figure;
  "Bilingual Urdu and English" at 150px in a 440px column is four lines and ~510px tall. §4.2 now
  has figure and phrase modes.
- **The scrim protected the text column but not the nav, pause control or footer**, which sit past
  its 68% stop directly over the lit scene. I had only measured to 46vw.
- Diagram connectors were cyan with a 4px glow, breaking the two-colour rule in the single most
  meaning-dense element on the page.
- `nav a{outline:none}` deleted the focus ring §4.6 mandates.
- Reduced motion still ran bubbles and a drifting, rolling camera.
- `composer.setSize` silently re-allocates bloom at full resolution — 4x cost after any resize.

**One finding was a stale file, not a violation:** `CONTENT.md` §12 still said employer permission
was unresolved, though D7 settled it at the Phase 1 gate. Corrected to defer to `DECISIONS.md`.

**Two escalated to the user** (`DESIGN.md` §10.1): whether to cut the fan-service props, and
whether AlphaLens is actually running.

**Next action:** Phase 2 gate. User decides §10.1 items 1–4. Then Phase 3 (Build, Sonnet).

### PHASE 2 COMPLETE — gate closed 2026-09-12

Direction locked (D15/D16), design system written, critique run and dispositioned, gate questions
answered (D20–D22).

**Deliverables:** `docs/DESIGN.md` (the Phase 3 contract, §10 carries the critique disposition),
`docs/design/DESIGN-system-for-stitch.md`, Stitch project `4379139906673047730` with a design
system and a validation screen, and the locked motion prototype.

**Phase 3 must start by reading `DESIGN.md` §10.2** — the amendments list. In particular:
`index.html` needs a viewport meta or the entire mobile design is dead code; the budget is
per-bay, not whole-site; the case grid breakpoint is 1080px; and the scene state must be derived
from `cam.u` on refresh, not only from enter/leave callbacks.

**Still outstanding, and not blocking Phase 3 start:** a resume PDF (Resume is removed from the
nav until one exists); shoe-shop extraction stack and receipt volume for its case study; the
`whatsapp-new` owning org.

**Next action:** Phase 3 — Build. **Model switches to Sonnet** per CLAUDE.md §2.

### 2026-09-13 — Portfolio identity, motion and artwork refinement

Current application is the Astro portfolio under D23/D24, not the earlier Three.js prototype. User requested stronger personal branding, section separation, actual motion, project-specific generated images and use of supplied portraits.

Implemented: name-led hero with AI Engineer role, Saylani/SMIT background, studio portrait; revised about, experience and contact; 80–144px section spacing and alternating surfaces; seven original concept covers in responsive local WebP; finite intro motion, viewport image/divider emphasis, project hover/focus, filter transitions, architecture reading state, reduced-motion and no-JS fallbacks. Full case studies remain on individual pages. All four themes retained and verified. No paid runtime APIs.

Sources: live public README refresh for AlphaLens, Crypto Agent, Pizza chatbot; SecureVision README empty; private CB_voice-agent unavailable unauthenticated. Approved CONTENT.md supplied private-project context. Portrait uses both owner-provided photos as references; originals untouched.

Evidence: 8 tests pass, Astro check 0 errors/warnings/hints, 10-page build and resource checks pass; all four theme builds pass; 20 Chromium layout checks pass; filters, keyboard demo controls, no-network examples and email copy checked. Full details in REFINEMENT-VERIFICATION.md. README includes run and theme-change instructions; ARTWORK.md records provenance. Fontconfig emits nonfatal cache messages during social PNG rendering in the restricted environment.

Next: user visual/portrait review on http://127.0.0.1:4321. Existing environment theme is Aubergine–Silver. No publication or push; owner resume and domain remain optional unconfigured inputs. Changes are uncommitted in the existing redesign branch.

### 2026-09-14 — D25 interaction correction implemented and verified

Resumed the unfinished browser validation. Experience now uses four selectable career chapters with directional transitions, replacing the row/table composition. Expertise is a capability explorer with animated tool groups and linked project evidence. Featured work uses a sticky introduction and stacking cards on desktop, with normal vertical flow on mobile. Hero portrait responds to scroll; About uses a large statement with reading emphasis; Contact offers project, opportunity and greeting intents. Full case studies remain on individual pages.

Final polish: skill tablist orientation follows responsive layout; case navigation clears the sticky header. New components and scripts are documented in README. All interactions are local browser code, with reduced-motion and no-JS fallbacks.

Verification: 8 tests; 27-file Astro check with zero diagnostics; 10-page build; all four palette builds; 20 responsive route combinations; 35 panel selections. Browser observed actual 500ms panel animation and changing portrait transform. Zero requests from the career, skill and contact controls. Desktop showcase and mobile career panel visually inspected. Full results and limits: INTERACTION-VERIFICATION.md.

Next: owner visual review at http://127.0.0.1:4321/#experience. Preview runs locally with the existing Aubergine–Silver selection. No publication, push or commit performed.

### 2026-09-14 — D26 Black Studio and project viewport correction

User screenshot showed the project's large cover consuming the visible screen. Featured cards now reserve measured text height before sizing images; short-screen introduction typography is more compact. When a screen cannot fit even the minimum image and full copy, cards unpin instead of clipping information. Black Studio is a fifth palette and the current config/environment selection; the four prior palettes remain available. Career and skill selection now have a sliding shared highlight, and the active project has a silver border emphasis. Reference rationale is appended to INTERACTION-PLAN.md.

Verified 24 card/viewport combinations including 1280×585 and 900×500, with all desktop pinned titles, summaries and actions visible; no overflow or page errors. Foreground browser testing verified the 550ms moving indicator and final alignment. Reduced-motion and no-JS fallbacks pass. Build checks and all-five-palette contrast/config tests pass. Details in INTERACTION-VERIFICATION.md. No dependencies added, no paid runtime services, no publication or commit.

Current review URL: http://127.0.0.1:4321/#work. Restarting the server retains Black Studio through PUBLIC_SITE_THEME. Owner review remains next.

### 2026-09-14 — D27 portrait, restrained neon and text motion

Edited the existing owner portrait using built-in imagegen: low-key black/graphite studio, natural skin lighting, faint mint rim on the shoulder. New 480px/960px WebPs are local and selected only for Black Studio; previous portrait assets remain. Source prompt and provenance are in ARTWORK.md.

Added a centralized mint signal token, active-control/project lighting and pointer-led portrait edge light. Finite masked word reveals animate the name, introduction, section headings and employer names on entry. Text is present without JS; reduced-motion suppresses all reveals. No repeated typing or idle glow animation.

Validation: 8 tests including signal contrast, 29-file Astro check with zero diagnostics, 10-page build/resource checks. Six responsive homepage/career widths from 320 to 1440 show no horizontal overflow or page errors. Browser observed running 850ms name animations with advancing time; portrait pointer light coordinates updated. Reduced-motion produced zero document animations; no-JS retained the name, new photo and all four career chapters. Desktop hero visually inspected. No publication or commit. Review at http://127.0.0.1:4321/.

### 2026-09-14 — D28 neon correction

Removed permanent mint control backgrounds, progress bars, active borders and underline treatments. Buttons and career selection are silver again. Neon mint/violet/rose is restricted to finite text highlights and interaction halos; portrait edge light is invisible at rest. No looping effects. The obsolete signal theme token was removed.

Browser verified button and career selection backgrounds as neutral RGB(228,228,223). During interaction, animation keyframes include all three neon hues; after completion there are zero running animations and only the existing neutral hover shadow remains. Reduced motion yields zero animations. `npm run check` passes: 8 tests, zero diagnostics, 10-page build. README updated. No deployment or commit.

### 2026-09-14 — D29 all seven software covers integrated

Continued from seven generated vector compositions, reviewed each visual, and integrated all seven into the homepage, project listing and individual cases via ProjectArtwork.astro. Covers now explain project workflows rather than physical desk objects. Existing context/status/private-source restrictions remain. All images have descriptive alt text and an Interface concept label. Containment replaces image zoom/crop so software details stay inside the frame. Croplogic raster was refined from a checkerboard into spatially clustered vegetation colors; redundant internal-data disclaimers removed from image footers.

References and generation-method boundary are recorded in ARTWORK.md. Built-in image generation had returned usage_limit_reached, so these are original scripted SVG/WebP illustrations, not newly model-generated screenshots. `scripts/create-software-covers.mjs` regenerates editable SVG sources plus both runtime sizes. The 960px assets are 15–20KB each. No paid service, customer data or copied brand graphics.

Validation: each of seven images visually inspected; 18 browser route/width combinations across home, listing and seven cases at 390/1280px passed image-load, contain-fit and overflow checks, with no page errors. All three pinned cards fit the 1280×585 viewport (bottoms about 561px). The initial test waited indefinitely on offscreen lazy image decode; corrected the test to request eager loading with an 8-second bound, without changing runtime lazy loading. `npm run check`: 8 tests, 30 Astro files with zero diagnostics, 10-page build/resource checks; conservative homepage asset estimate 271,506 bytes. Nonfatal Fontconfig cache messages remain. Preview running at http://127.0.0.1:4321/projects/. No deployment, push or commit.

### 2026-09-14 — D30 content aligned to supplied CV and LinkedIn export

Read all three CV pages and all four Profile (1).pdf pages with pypdf, including embedded links. Updated expertise to AI, Software & ML Engineering; Multi-cloud Data Engineering (AWS/Azure explicitly confirmed by owner); Data Science & Analytics. Intro, About, contact, metadata/social copy and project categories now reflect that grouping. Employment titles/dates and project evidence remain source-based. Added ETL/SQL/API work to Saylani, data analysis/deployment mentoring to SMIT, query analytics to the internship, full surname in About and source-listed training/job-simulation credentials. Source files were not edited or published.

CONTENT-ALIGNMENT-REVIEW.md contains the comparison, intentional differences and required source-document corrections: 30+/50+ teaching context, duplicate Omdena dates, unsupported internship evaluation statement, unqualified manual-review/FTE claims, incomplete education dates and new cloud positioning missing from PDFs. SecureVision remains outside the selected cases; no status or deployment was invented. Existing owner metric/privacy decisions preserved.

Validation: eight tests and 30-file Astro diagnostics pass. A new raw ampersand in SVG social text initially failed image generation; XML escaping fixed it, and the rebuilt 10-page site plus all artifact/resource checks passed. Fifteen skill selections across widths 320, 390, 768, 1280 and 1440 show no overflow or JS errors; project filters return 7/5/2. Conservative homepage estimate 271,780 bytes. No source CV/LinkedIn edits, push or deployment. Preview: http://127.0.0.1:4321/#expertise.

### 2026-09-14 — D31 background section and LinkedIn action

Replaced the sparse organization strip with three responsive role cards: Build at Saylani Welfare, Teach at SMIT and Collaborate at Omdena. Each includes the role, a concise source-based contribution and date range. Native links select and scroll to the matching career chapter; direct fragment navigation and keyboard activation work. The hero Let's connect button opens the existing configured LinkedIn profile in a new tab with noopener/noreferrer. New heading reveals and card halos reuse the finite motion system; resting surfaces stay neutral.

Validation: npm run check passes (8 tests, 31 Astro files with zero diagnostics, 10-page build and artifact checks). Five widths from 320 to 1440 pass overflow/card-fit checks; desktop and mobile layouts visually reviewed. All three card destinations select the correct visible panel, with desktop target positions clearing the header by 120–125px. Direct fragment navigation and Enter activation pass. Browser observed mint/violet/rose halo keyframes, neutral backgrounds and zero remaining animations after completion. Reduced-motion and no-JS fallbacks pass; no page errors. Existing nonfatal Fontconfig cache messages remain. Preview: http://127.0.0.1:4321/#background. No publication or commit.

### 2026-09-14 — D32 mobile navigation toggle

Added a shared compact Menu/Close disclosure at 800px and below. Navigation and résumé now open beneath the 72px sticky header; desktop retains inline links. Controls expose aria-expanded/aria-controls; collapsed links are hidden and inert. Escape restores toggle focus, outside click/focus and link activation close the menu, and crossing the desktop breakpoint resets the state. Finite panel/icon motion respects reduced-motion preferences. Short landscape viewports get a bounded, scrollable menu; no-JS navigation remains visible.

Validation: npm run check passes (8 tests, 32 checked files with zero diagnostics, 10-page build and artifact checks). Twelve route/width combinations cover home, project listing and a case at 390, 800, 801 and 1440px with no overflow or browser errors. Keyboard entry/exit, Escape/focus restoration, anchor navigation (target clears header at 110px), outside dismissal, cross-page Work navigation/current-page state and responsive reset pass. An immediate resize snapshot preceded the media-query event; waiting for the event confirmed reset. Additional 320px portrait and 667×375 landscape checks pass, including access to the résumé link. Reduced motion yields zero header animations; no-JS retains all five links. Mobile closed/open screenshots reviewed. A cached dev import error was cleared by restarting the server; build had already passed. Existing nonfatal Fontconfig cache messages remain. Preview runs at http://127.0.0.1:4321/. No deployment or commit.

### 2026-09-14 — D33 résumé and Vercel release preparation

Copied the user-supplied June 2026 CV into the single public download path `public/resumes/muhammad-jamil-raza-resume.pdf`; byte-for-byte SHA-256 comparison with the supplied PDF matched. Header and footer now expose same-origin `Download résumé` controls using a stable download filename. Content was not rewritten; the alignment report now states that this public CV retains its documented discrepancies and needs owner approval before replacement.

Added Vercel configuration (`npm ci`, `npm run check`, `dist`, Node 24.x, static cache/referrer/content-type headers and deploy-input exclusions) plus a Vercel deployment/rollback guide. Build-time metadata uses Vercel's stable production project domain or a production-only `PUBLIC_SITE_URL`; preview/static local builds are noindex, produce no sitemap URLs and disallow crawling. Initial production simulation exposed an Astro static-build boundary: unprefixed Vercel system variables were absent from `import.meta.env`, making output incorrectly noindex. A new red regression test against `getSettings` failed with an undefined origin; the minimal fix merges Node build environment values, then the test and full suite passed. Production build simulation with `VERCEL_ENV=production` and a stable project host now produced canonical URLs, Open Graph image URLs, robots sitemap and nine public sitemap routes. Preview simulation produced `noindex, nofollow`, `Disallow: /` and an empty sitemap. Twelve tests, 32 Astro diagnostics with zero issues, ten-page builds and artifact checks pass for local, simulated-production and simulated-preview environments. Browser checked both résumé controls, the actual PDF response/signature, desktop and mobile header layouts, no overflow and no page errors. Asset estimate is 273,394 bytes for homepage transfer plus images; the 130,892-byte CV is not fetched by the homepage. No Git remote, Vercel account action, deployment, commit or source CV rewrite occurred. Guide: VERCEL-DEPLOYMENT.md.
