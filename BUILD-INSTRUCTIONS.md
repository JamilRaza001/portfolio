# BUILD-INSTRUCTIONS.md

**What this file is:** the flow you execute. It tells you *what* each phase must achieve and what
must be true before you leave it. It deliberately does **not** tell you *how*.

**You write the how.** In Phase 0 you author `docs/PLAN.md` — the detailed, step-level plan for
the whole build. From then on, `PLAN.md` is what you execute and this file is what you check it
against.

Read `CLAUDE.md` first. It governs everything here.

---

## Project goal

Build a personal portfolio website for the user — an AI engineer — at the visual and technical
level of an award-winning 3D motion site: a real 3D scene, scroll-driven camera movement,
deliberate motion design, and genuinely good UI/UX. Deploy it free.

**The theme is not decided.** It must emerge from the user's actual content in Phase 2, not be
picked in advance. It must not be Japanese/shrine-themed — that was the reference site, not the
target.

---

## Standing rules for every phase

### Use the full toolchain, always

You have skills, hooks, sub-agents, and MCP servers. Use them. Do not do by hand what a tool does
better, and do not run serially what sub-agents can run in parallel.

- **Skills** — check what is available before starting any phase and load what fits. Design work
  should be running the frontend design skill; testing work should be running the testing skill.
- **Sub-agents** — use them for anything parallelisable (auditing several repos, exploring
  competing design directions, checking multiple breakpoints) and for anything that would
  otherwise flood your main context with material you only need once. A sub-agent that reads
  twelve READMEs and hands back a summary is far cheaper than reading twelve READMEs yourself.
- **Hooks** — set them up in Phase 0 to enforce what you would otherwise have to remember:
  verification after edits, lint/typecheck gates, `PROGRESS.md` reminders at session boundaries.
- **MCP** — browser MCP for seeing your own output, Context7 for current library docs, Stitch for
  design generation.

At each phase you should be able to say which skills, agents, and hooks you used. If the answer
is "none," you have almost certainly done it the slow way.

### Session discipline

Start: read the four files listed in `CLAUDE.md` §0.
End: write `docs/PROGRESS.md` before you run out of room.
Decision made: append to `docs/DECISIONS.md` immediately, not later.

### Gates

Every phase ends with a stop. Report what was done, what is now true, and what the next phase
needs. Then **wait for the user.**

---

## PHASE 0 — Environment

*Model: Opus*

The point of this phase is that nothing later fails because a tool was missing, stale, or broken.

**Achieve:**

1. **Audit** everything currently installed — skills, plugins, MCP servers, hooks, sub-agents.
   Produce an honest inventory: what is there, what version, what state.
2. **Test** each MCP server rather than trusting that it is listed. A server that appears in the
   config and fails on first call is worse than one that is absent, because you will only discover
   it mid-build.
3. **Repair** anything broken — auth expired, wrong transport, missing runtime, version conflict.
   Diagnose the actual cause. Do not remove and reinstall as a reflex.
4. **Install what is missing.** At minimum this project needs:
   - the official Anthropic **frontend design** skill — this is what stops the output looking like
     every other AI-generated site, and it is not optional here
   - a **planning/discipline** skill that enforces clarify → plan → implement → verify
   - a **browser MCP** so you can see and measure what you build (screenshots, console errors,
     performance traces) — without this you are coding a visual medium blind
   - **Context7 MCP** for current library documentation
   - **Stitch MCP** for design generation (free, Google Labs; needs a key from the user)
   - a **web testing** skill for the verification loop
   
   Install what genuinely helps and stop there. Overlapping skills make you guess which to apply,
   and that guessing shows up as inconsistent behaviour. Fewer, better.
5. **Write MCP server config to a project-scoped `.mcp.json` at the project root.** Both the
   Claude Code CLI and the Desktop Code tab read that file, so the user can move between the two
   surfaces without the servers disappearing. Do not configure servers only in a surface-specific
   location. Commit `.mcp.json` to the repo; keep keys and tokens out of it via environment
   variable references.
6. **Configure hooks** that will carry the discipline for you through the rest of the build.
7. **Scaffold** `docs/PLAN.md`, `docs/PROGRESS.md`, `docs/DECISIONS.md`.
8. **Write `docs/PLAN.md`** — the detailed plan. This is the main deliverable of Phase 0. Break
   each remaining phase into concrete steps with checkable success criteria. Name which skills,
   sub-agents, and MCP servers each step will use. Be specific enough that a future session with
   no memory of this conversation can pick it up and execute correctly.

**Ask the user for:** any API keys or tokens you need (Stitch key, GitHub token). Ask when you
reach the step that needs them, explain what each is for, and do not proceed on a placeholder.

**Gate:** present the inventory, the repairs made, the final tool list, and `PLAN.md`. Stop.

---

## PHASE 1 — Content

*Model: Opus*

You cannot design for someone whose material you have not read. This phase happens **before**
design, deliberately: the theme has to come out of the content, not get imposed on it.

**Achieve:**

1. Ask the user for their **LinkedIn profile PDF** and **CV**. Read both properly.
2. Ask which **GitHub repos** to include — public and private. For private repos you need a token
   from the user. **Read README files only.** Do not clone, do not read source, do not go
   exploring beyond what was authorised. Parallelise across repos with sub-agents.
3. Produce a **structured content model** — the real inventory of who this person is: positions,
   the projects worth showing, the technical range, the measurable outcomes, the credentials.
4. **Find the outcome numbers.** The reference site led every project card with a result ("40%
   fewer escalations") rather than a project name, and that inversion was its strongest content
   decision. Dig for the equivalent in this user's material. Where a number is missing but
   probably exists, ask.
5. **Flag the gaps honestly.** Thin project descriptions, missing metrics, a README that does not
   explain what the thing actually does — surface these now. They are far cheaper to fix here than
   after the layout is built around them.
6. Save the content model into `docs/` and note it in `PROGRESS.md`.

**Gate:** present the content model and the gaps. Stop.

---

## PHASE 2 — Design

*Model: Fable (fall back to Opus when credits run out)*

**Achieve:**

1. **Concept.** Propose **three** distinct visual directions, each derived from something real in
   the Phase 1 content — not three variations on one idea, and nothing reaching for the Japanese
   shrine reference. For each: the central metaphor, why it fits this person, and what the 3D
   scene would actually be. Let the user choose.
2. **Design system.** Once a direction is chosen, specify it fully: colour system (a restrained
   palette with a single accent tends to read as premium — deviate only with a reason), type
   scale and font pairing, spacing scale, grid, component styles. Use Stitch to generate and
   iterate on screens; export `DESIGN.md` so the tokens travel into the build.
3. **Motion design.** Specify it as deliberately as the visuals. What does scroll actually drive?
   Where does the camera go? What is parallaxed, what is pinned, what staggers in and in what
   order? What happens at rest? Name the specific GSAP mechanisms.
4. **Section-by-section layout.** Every section, its content, its motion, its states.
5. **Design the reduced-motion path at the same time**, not afterwards. A persistent pause control
   plus honouring `prefers-reduced-motion`. It is the difference between a site that is impressive
   and one that is also usable.
6. **Critique your own design before showing it.** Run a genuine review against the failure modes
   the reference site actually exhibited:
   - decorative layers rendering *over* body copy, destroying legibility
   - cross-fade transitions where two sections overlap and neither is readable
   - custom scroll indicators sitting next to the native scrollbar
   - flat CTA hierarchy — several calls to action, no clear primary
   - the strongest credibility content (metrics) placed in the weakest position
   - clickable cards with no affordance signalling that they are clickable
   - asymmetric grids that read as accidents rather than compositions
   
   Use a sub-agent for the critique so it is not just you approving your own work.
7. **Set the performance budget now**, before any asset is chosen: total page weight, target
   frame rate, and what must still work on a mid-range phone. This is where sites in this genre
   die, and the budget has to constrain the design rather than be discovered after it.

**Gate:** present concepts → user picks → present the full design spec → stop. Record the locked
choices in `DECISIONS.md`.

---

## PHASE 3 — Build

*Model: Sonnet*

**Achieve:**

1. Build what Phase 2 specified. Not an interpretation of it, not an improvement on it. If
   something in the design turns out to be genuinely unbuildable within the performance budget,
   stop and raise it — do not quietly substitute.
2. **Verify as you go with the browser MCP.** Screenshot, read console errors, measure frame rate,
   check every breakpoint. Prefer targeted screenshots over full accessibility-tree snapshots —
   the snapshot is dramatically more expensive in tokens and you rarely need it for visual work.
3. **Hold the performance budget as a hard limit.** Compress every 3D asset — Draco or Meshopt for
   geometry, KTX2 for textures. Lazy-load. Check on a throttled CPU, not just your own machine.
   Blowing the budget is a stop-and-report event, not something to fix later.
4. **Source only CC0 assets.** Poly Haven, Kenney, Quaternius. Do not use mixed-license sources
   where every item needs its own licence check.
5. **Mobile is not a port.** A scroll-driven 3D experience often needs a genuinely different
   treatment on a phone, not the desktop scene scaled down. Decide which, and say which.
6. **Accessibility is part of done:** contrast ratios, keyboard navigation, focus states, reduced
   motion, semantic structure, real alt text.
7. Update `PROGRESS.md` at every session boundary. Long build, multiple sessions — this is where
   drift happens if you let it.

**Gate:** working site, verified, within budget. Stop.

---

## PHASE 4 — Deploy

*Model: Sonnet*

**Achieve:**

1. Deploy to **Cloudflare Pages** — free, no bandwidth ceiling, and no non-commercial restriction.
   (Vercel's Hobby tier is also free but is limited to non-commercial personal use, which is a bad
   fit for a portfolio that may end up advertising services.)
2. Verify the **live** site, not just the local build. Lighthouse, real-device check, console
   clean, every link working, resume download working.
3. Custom domain if the user has one. SEO basics, Open Graph, favicon.
4. Hand over: what was built, how to run it locally, how to update content, what to watch.

**Gate:** live URL, verified. Stop.

---

## If you are lost

If you open a session and cannot tell where you are: **do not guess and do not start work.**
Read `PROGRESS.md`, then `DECISIONS.md`, then `PLAN.md`. If they still do not resolve it, ask the
user. An honest "I need to re-establish where we are" costs one message. Rebuilding something
that already exists, or silently contradicting a locked decision, costs a phase.
