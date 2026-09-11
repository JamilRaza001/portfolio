# CLAUDE.md

This file loads on every session. Keep it short. Everything else lives in the docs it points to.

---

## 0. Read these before you touch anything

At the start of **every session**, and again after **every context compaction**, read in this order:

1. `BUILD-INSTRUCTIONS.md` — the phase flow you are executing
2. `docs/PROGRESS.md` — where the work actually stands
3. `docs/DECISIONS.md` — what is already locked
4. `docs/PLAN.md` — the detailed plan you wrote yourself

Do not start work, answer a question about project state, or write code before reading these. If any of them do not exist yet, you are at Phase 0 — go to `BUILD-INSTRUCTIONS.md` and begin there.

**Never reconstruct project state from memory or from what is visible in the current context window.** The files are the truth. Your recollection is not.

---

## 1. Behavioural guidelines

These four are adapted from the Karpathy-derived CLAUDE.md guidelines for coding agents
(source: https://github.com/multica-ai/andrej-karpathy-skills). They exist because agents fail
in predictable ways: assuming too much, overbuilding, editing unrelated code, and declaring
work done without a real check.

### Think before coding
State your assumptions out loud instead of picking one silently. If a request has more than one
reasonable reading, present them — do not choose for the user and run. If something is unclear,
stop and name exactly what is confusing. If you see a simpler path than the one asked for, say so.
Push back when pushing back is warranted. Unmanaged confusion is the single largest source of
wasted work in this project.

### Keep it simple
Write the minimum code that solves the stated problem. Nothing speculative. No features beyond
what was asked. No abstraction layers for something used once. If a hundred lines will do, do not
write a thousand.

### Make surgical changes
Every line you change must trace directly back to the current request. Do not "improve" nearby
code, comments, or formatting. Do not refactor what is not broken. Match the existing style even
where you would have done it differently. Clean up imports and variables that *your* change
orphaned — leave pre-existing dead code alone, and mention it instead of deleting it.

### Define the goal, then verify it
Before starting a task, write down what "done" means in checkable terms. Then loop until the
check passes. Vague criteria ("make it look good") force constant back-and-forth; concrete
criteria ("hero renders at 60fps on a 4x-throttled CPU, no console errors, text passes AA
contrast") let you work independently.

---

## 2. Model routing

| Work | Model |
|---|---|
| Project planning, architecture, phase planning | **Opus** |
| Design theme creation, design critique, visual review | **Fable** → fall back to **Opus** when credits run out |
| Code implementation | **Sonnet** |

Announce the model switch before each phase. If Fable is unavailable on this account, say so
plainly and use Opus — do not silently substitute and do not stall the phase.

---

## 3. Stack rules

- **No legacy syntax, ever.** Three.js, React Three Fiber, drei, GSAP, and Next.js all move fast
  and your training data is behind. Before writing against any of them, pull current docs via the
  Context7 MCP. If Context7 is unavailable, say so and check the official docs by URL instead.
  Never write an API call from memory and hope.
- Everything in this project must be **free**. No paid tiers, no trials, no credit card. If the
  only good option costs money, stop and flag it rather than signing anything up.
- Every third-party asset must be **CC0 or equivalent**. Do not use mixed-license sources.
- The user is an AI engineer, comfortable with Python and ML, **new to 3D/motion/UI-UX**. Explain
  design and graphics reasoning; skip basic programming explanations.

---

## 4. Phase gates

`BUILD-INSTRUCTIONS.md` defines phases. Each ends at a gate.

**At a gate: stop. Report. Wait for the user to say continue.**

Do not roll into the next phase because the current one went well. Do not do "just a bit" of the
next phase to save time. The gate is the mechanism that keeps a multi-session build from drifting.

---

## 5. Locked decisions

Anything recorded in `docs/DECISIONS.md` is settled. Do not revisit, re-litigate, or quietly
build something different because a better idea occurred to you mid-implementation.

If you genuinely believe a locked decision is wrong: **stop, state the problem, propose the
change, and wait.** Only the user unlocks a decision, and the change gets written back into
`DECISIONS.md` before any code moves.

---

## 6. Writing to the tracking files

- `docs/PROGRESS.md` — update at the end of every work session and at every gate. Append; never
  rewrite history.
- `docs/DECISIONS.md` — append the moment a decision is made, with the reasoning and the
  alternatives that were rejected. Never edit an existing entry; supersede it with a new one.
- `docs/PLAN.md` — you author this in Phase 0. Amend it only through the unlock procedure above.

If a session is about to end, is being compacted, or is running low on context: **write to
`PROGRESS.md` first.** Losing the state file is worse than losing the session.
