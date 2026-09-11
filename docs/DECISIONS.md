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
