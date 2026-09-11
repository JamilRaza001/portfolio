# PLAN.md

The step-level plan for the whole build. `BUILD-INSTRUCTIONS.md` says *what* each phase must
achieve; this file says *how*. Written in Phase 0, amended only through the unlock procedure in
`CLAUDE.md` §5.

**If you are a future session with no memory of this conversation: this file is executable.**
Read `PROGRESS.md` for where we are, `DECISIONS.md` for what is locked, then execute from the
matching phase below.

---

## Toolchain — the binding list (D6)

Per `BUILD-INSTRUCTIONS.md` §0.4, *"fewer, better."* 278 ECC skills are installed and many
overlap. **For portfolio work, use only these.** Skills not on this list are not invoked, even
when their description sounds relevant — that is the guessing problem the instructions warn about.

### Skills

| Skill | Used in | Purpose |
|---|---|---|
| `frontend-design:frontend-design` | 2, 3 | **Non-optional.** All visual design and UI construction. |
| `superpowers:brainstorming` | 2.1, 3.0 | Before concepts and before build — explore intent, not implementation. |
| `superpowers:writing-plans` | 2.7, 3.0 | Turning the design spec into a build plan. |
| `superpowers:verification-before-completion` | every gate | Nothing is reported done without a real check. |
| `superpowers:systematic-debugging` | 3, 4 | Any bug, before proposing a fix. |
| `ecc:motion-foundations` | 2.3 | Motion *specification* — easing, timing, hierarchy. |
| `ecc:motion-advanced` | 3 | GSAP/ScrollTrigger *implementation*. |
| `ecc:accessibility` | 2.5, 3.7 | Contrast, keyboard, focus, reduced motion, semantics. |
| `ecc:browser-qa` | 3, 4 | The verification loop against a running page. |
| `ecc:react-performance` | 3.3 | Render cost, re-render elimination. |
| `dataviz` | 3 (conditional) | Only if the content model produces charts worth drawing. |

**Explicitly NOT used** (overlap with the above, listed so nobody re-litigates it):
`ecc:motion-ui`, `ecc:motion-patterns`, `ecc:frontend-a11y`, `ecc:design-system`,
`ecc:frontend-design-direction`, `ecc:taste`, `ecc:liquid-glass-design`, `ecc:e2e-testing`,
`ecc:click-path-audit`.

### Sub-agents

| Agent | Used in | Why |
|---|---|---|
| `Explore` | 1.3 | Parallel README reads across repos — keeps them out of main context. |
| `general-purpose` | 2.6 | The design critique. **Must be a sub-agent** so it is not self-approval. |
| `ecc:a11y-architect` | 3.7 | Independent accessibility audit. |
| `ecc:performance-optimizer` | 3.4 | Budget enforcement. |
| `ecc:react-reviewer` | 3.8 | Hook correctness, render performance. |

### MCP servers

| Server | Used in | Purpose |
|---|---|---|
| `chrome-devtools` | 3, 4 | Screenshots, console, `lighthouse_audit`, `performance_start_trace`, CPU `emulate`. |
| `context7` | 3 | **Mandatory per CLAUDE.md §3** — current Three.js / R3F / drei / GSAP APIs. Never write these from memory. |
| `stitch` | 2.2 | Screen generation, `upload_design_md`, design-system iteration. |
| GitHub connector | 1.2, 1.3 | README retrieval. |

---

## PHASE 1 — Content *(Opus)*

**Cannot start without:** LinkedIn PDF + CV from the user.

| # | Step | Done when |
|---|---|---|
| 1.1 | Ask the user for their **LinkedIn profile PDF** and **CV**. Read both in full. | Both files read; roles, dates, employers, education extracted verbatim into notes. |
| 1.2 | Test whether the GitHub connector reaches **private** repos. **Only if it cannot**, ask the user for a PAT with `repo` scope. Then ask which repos to include. | The include-list is confirmed by the user. Private access resolved one way or the other. |
| 1.3 | Read **README files only** across the chosen repos. Dispatch `Explore` sub-agents in parallel, one per batch. **Do not clone. Do not read source. Do not explore beyond the READMEs.** | Every chosen repo has a one-paragraph summary: what it does, stack, and any stated result. |
| 1.4 | Build the **structured content model** into `docs/CONTENT.md`: positions, projects, technical range, measurable outcomes, credentials. | `CONTENT.md` exists and every project has: name, one-line what-it-does, stack, and a metric slot. |
| 1.5 | **Hunt the outcome numbers.** The reference site led every project card with a *result* ("40% fewer escalations"), not a project name — that inversion was its strongest content decision and we are keeping it. For each project find the equivalent: latency cut, accuracy gained, cost saved, volume handled, time reduced. | Each project either has a real number **or** is explicitly tagged `METRIC MISSING`. No silent blanks. |
| 1.6 | **Ask the user directly** for every `METRIC MISSING` where a number probably exists. | User has answered or said "no number exists" for each. |
| 1.7 | Flag content gaps honestly: thin descriptions, READMEs that never say what the thing does, projects too similar to show twice. | Gap list written into `CONTENT.md` under "Gaps". |
| 1.8 | Append to `PROGRESS.md`. | Written. |

**Gate:** present `CONTENT.md` and the gaps. **Stop.**

---

## PHASE 2 — Design *(Fable; fall back to Opus if credits run out — announce which)*

**Cannot start without:** `CONTENT.md` complete and the metric gaps answered.

| # | Step | Done when |
|---|---|---|
| 2.0 | Run `superpowers:brainstorming` on the content model before proposing anything. | Intent explored, not just aesthetics. |
| 2.1 | Propose **three genuinely distinct** visual directions, each traced to something real in `CONTENT.md`. For each: the central metaphor, why it fits *this* person, what the 3D scene physically is. **Not three variations on one idea. Nothing Japanese/shrine — that was the reference site, not the target.** | User has picked one. Recorded in `DECISIONS.md`. |
| 2.2 | Specify the design system fully: colour (restrained palette, single accent — deviate only with a stated reason), type scale and pairing, spacing scale, grid, component styles. Generate and iterate screens with **Stitch** (`generate_screen_from_text`, `generate_variants`), then `upload_design_md` / `create_design_system_from_design_md` so tokens survive into the build. Export `docs/DESIGN.md`. | `DESIGN.md` exists with copy-pasteable tokens. Screens exist in a Stitch project. |
| 2.3 | Specify **motion** as deliberately as the visuals, using `ecc:motion-foundations`. What scroll drives. Where the camera travels and through what. What is pinned, what is parallaxed, what staggers and in what order. What happens at rest. **Name the specific GSAP mechanisms** (ScrollTrigger pin/scrub, timeline position parameters, ScrollSmoother yes or no). | Every section has a named mechanism, not an adjective. |
| 2.4 | Section-by-section layout: every section, its content, its motion, its states (rest / entering / active / reduced). | Each section has all four states written down. |
| 2.5 | **Design the reduced-motion path now, not afterwards.** Honour `prefers-reduced-motion` *and* ship a persistent pause control. | The reduced path is a designed experience, not a disabled one. |
| 2.6 | **Critique via `general-purpose` sub-agent** — not self-review. Test against the reference site's actual failures: decorative layers over body copy; cross-fades where two sections overlap and neither reads; a custom scroll indicator next to the native scrollbar; flat CTA hierarchy; metrics parked in the weakest position; clickable cards with no click affordance; asymmetric grids that read as accidents. | Written critique returned; every finding either fixed in the spec or explicitly accepted with a reason. |
| 2.7 | **Set the performance budget before any asset is chosen.** Total page weight, target frame rate, and what must still work on a mid-range phone. This is where sites in this genre die — the budget constrains the design, not the reverse. | Budget is numeric and in `DECISIONS.md`. Proposed starting point: **2.5 MB or less initial transfer, 60 fps desktop / 45 fps or better mid-range mobile, LCP under 2.5 s on 4x throttled CPU.** |
| 2.8 | Append to `PROGRESS.md` and `DECISIONS.md`. | Written. |

**Gate:** concepts, then user picks, then full design spec. **Stop.**

---

## PHASE 3 — Build *(Sonnet)*

**Cannot start without:** `DESIGN.md`, the motion spec, the performance budget, **and a locked stack.**

### 3.0 — The stack decision (OPEN — lock before writing code)

**Recommendation: Vite + React + `@react-three/fiber` + `drei` + GSAP, built to static assets.**

- Cloudflare Pages serves a Vite static build with no adapter and no config. Next.js on CF Pages
  needs either `output: 'export'` or `@cloudflare/next-on-pages` — complexity bought for features
  (SSR, ISR, `next/image`) that a single-page portfolio does not use, and `next/image` does not
  work under static export without a custom loader anyway.
- The whole page *is* the 3D experience, so Astro's islands advantage mostly evaporates — you would
  end up hydrating nearly everything.
- **Known cost:** a Vite SPA ships an empty HTML shell, which is weak for SEO. Mitigation: prerender
  the real content to static HTML at build time and keep a complete no-JS text fallback. If Phase 3
  measurement shows LCP or crawlability actually suffering, **Astro + React islands is the fallback**
  — reconsider then, with numbers, not now.

**Before writing a single line against Three.js, R3F, drei, GSAP, or the bundler: pull current docs
via Context7.** These libraries move fast and training data is behind (CLAUDE.md §3).

### 3.1 – 3.8

| # | Step | Done when |
|---|---|---|
| 3.1 | Scaffold the project. Confirm `npm run typecheck` exists so the `PostToolUse` verify hook activates. | Hook fires on a deliberate type error and blocks. |
| 3.2 | Build what Phase 2 specified — **not an interpretation of it, not an improvement on it.** If something proves unbuildable inside the budget, **stop and raise it.** Never quietly substitute. | Each section matches its `DESIGN.md` entry. |
| 3.3 | **Verify continuously with `chrome-devtools`**: `take_screenshot`, `list_console_messages`, `performance_start_trace`, `emulate` for 4x CPU throttle. Prefer targeted screenshots over full accessibility-tree snapshots — snapshots cost dramatically more tokens and visual work rarely needs them. | Console clean. Frame rate measured, not assumed. Every breakpoint screenshotted. |
| 3.4 | **Hold the budget as a hard limit.** Draco or Meshopt for geometry, KTX2 for textures, lazy-load everything below the fold. Measure on throttled CPU, not this machine. **Blowing the budget is a stop-and-report event, not a later problem.** | Measured transfer and fps are inside 2.7's numbers. |
| 3.5 | **CC0 assets only** — Poly Haven, Kenney, Quaternius. No mixed-license sources where each item needs its own check. Log every asset and its source. | `docs/ASSETS.md` lists every asset with source and licence. |
| 3.6 | **Decide mobile deliberately.** A scroll-driven 3D scene often needs a genuinely different treatment on a phone, not the desktop scene scaled down. Pick one and **say which**. | Decision recorded in `DECISIONS.md` with reasoning. |
| 3.7 | **Accessibility is part of done**, audited by `ecc:a11y-architect`: contrast ratios, keyboard navigation, visible focus states, reduced motion, semantic structure, real alt text. | Audit returned; every finding fixed or explicitly accepted. |
| 3.8 | Review with `ecc:react-reviewer`. Update `PROGRESS.md` at **every** session boundary — this is a long build across many sessions and it is exactly where drift happens. | Review clean. `PROGRESS.md` current. |

**Gate:** working site, verified, inside budget. **Stop.**

---

## PHASE 4 — Deploy *(Sonnet)*

| # | Step | Done when |
|---|---|---|
| 4.1 | Create the GitHub remote and push (**first time a remote is used — D5 unlocks here, confirm with the user**). | Repo pushed. |
| 4.2 | Deploy to **Cloudflare Pages** — free, no bandwidth ceiling, no non-commercial restriction. (Vercel's Hobby tier is free but forbids commercial use, a bad fit for a portfolio that may advertise services.) | Live URL responds. |
| 4.3 | Verify the **live** site, not the local build: Lighthouse via `chrome-devtools`, real-device check, console clean, every link working, resume download working. | All five pass, evidenced. |
| 4.4 | SEO basics, Open Graph, favicon, custom domain if the user has one. | OG card previews correctly. |
| 4.5 | Handover: what was built, how to run it locally, how to update content, what to watch. | `README.md` written. |

**Gate:** live URL, verified. **Stop.**

---

## Standing rules

- **Phase gates are hard stops.** Report, then wait. Do not roll into the next phase because this
  one went well, and do not do "just a bit" of the next phase to save time.
- **Decisions go into `DECISIONS.md` the moment they are made**, not at the end of the session.
- **Running low on context? Write `PROGRESS.md` first.** Losing the state file is worse than
  losing the session.
- **Never write a Three.js / R3F / drei / GSAP / Next.js API from memory.** Context7 first.
- **Everything must be free.** No paid tiers, no trials, no card. If the only good option costs
  money, stop and flag it.
- The user is an AI engineer — comfortable with Python, RAG, computer vision; **new to 3D, motion,
  and UI/UX.** Explain design and graphics reasoning. Skip basic programming explanations.
