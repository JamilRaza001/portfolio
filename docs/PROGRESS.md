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
