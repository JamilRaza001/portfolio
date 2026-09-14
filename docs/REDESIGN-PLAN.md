# Portfolio redesign implementation plan

Date: 2026-09-13. Status: authorized for implementation in this conversation.

## Goal and approval

Build one premium AI Engineer portfolio with four complete color themes, concise landing/project listings, and separate detailed case-study pages. The user approved the proposed redesign and explicitly requested the detailed plan and implementation together. This supersedes the laboratory-specific visual decisions for the new application; the historical prototype remains intact.

## Architecture

Astro renders static HTML for every route. TypeScript defines content, configuration, and browser interactions. CSS tokens theme the entire application before first paint. Original SVG/CSS system illustrations and deterministic sample demos run locally without AI endpoints, subscriptions, API keys, microphones, or backend services. Native navigation and readable HTML survive disabled JavaScript.

## Skills and tooling

- Available and applied: brainstorming, writing-plans, frontend-design, test-driven-development, verification-before-completion, requesting-code-review.
- Current official Astro documentation replaces unavailable Context7 tools for API verification.
- Browser verification uses the available Playwright MCP. No additional plugin installation is needed.
- Repository model names Opus/Fable/Sonnet are not callable in this Codex session. Current Codex model performs implementation, with an independent reviewer where supported; no model switch is claimed.
- Existing project is edited locally; no publication, Git push, external messaging, or paid service setup is part of this execution.

## Approved experience

### Routes

- `/`: personal positioning, a compact illustrative system visual, 3 featured project summaries, expertise linked to evidence, experience/teaching, about, contact.
- `/projects/`: complete curated collection with accessible category filtering; summaries only.
- `/projects/[slug]/`: problem, role, solution, original architecture diagram, outcomes/evidence, limitations, related work. Private source is clearly labeled and never linked.
- `/404.html`: useful recovery links.
- `/sitemap.xml` and `/robots.txt`: use an explicitly configured public origin; omit invented canonical URLs when no domain is configured.

### Four themes

One semantic token contract: background, surface, raised, ink, muted, accent, accent-ink, border. Same content and layout in every theme.

| ID | Background | Ink | Accent |
|---|---|---|---|
| `blue-amber` | #081A2C | #EAF2F7 | #F5B42C |
| `charcoal-copper` | #191917 | #F2EFE8 | #D99A6C |
| `olive-champagne` | #191E19 | #F1F0E7 | #D8C69F |
| `aubergine-silver` | #211A24 | #F2EDF3 | #C3B6CC |

Default: charcoal-copper, for initial review only. `PUBLIC_SITE_THEME` overrides `site.config.ts`. Unknown nonempty values must fail clearly rather than silently choosing another theme. Changing environment/config requires restarting development or rebuilding production. No public theme-picker is required; comparison is performed one theme at a time as requested.

### Content and visual rules

- Headline: Production AI that replaces manual effort at scale. AI Engineer is primary; software/data capabilities support it.
- Use the content model and its later corrections, with D7/D9/D21 guardrails retained.
- ~20 hours/week belongs to automation workflows; 10% belongs to the employer voice system; 1.24s TTFC belongs to the separate voice ordering project and remains qualified.
- AlphaLens remains in progress. ~22K chunks/200 filings are corpus figures, not quality results. Do not present target latency as measured.
- No internal UI/screenshots/data, no invented benchmarks, no fake clients/testimonials, no skill percentages.
- Shoe-shop extraction stack and measurements remain unspecified; the page explains only the confirmed transformation and missing validation.
- Resume uses an optional local public PDF path only if that file exists. Until a publication-ready file is supplied, show Request résumé by email. Do not publish the raw source PDFs.
- Typography: self-hosted Big Shoulders Display for deliberate display headings; Atkinson Hyperlegible for text. Include font license notices.
- Original composed system artwork, minimal surface treatments, ample space, strong contrast, no fictional terminal, brain, robot, neural mesh or decorative camera tour.
- Motion responds to actions; reduced-motion makes transitions immediate. No autoplay audio or recurring idle frame loop.

## File responsibilities

| Files | Responsibility |
|---|---|
| `package.json`, `astro.config.mjs`, `tsconfig.json` | pinned dependency/build/check configuration |
| `site.config.ts`, `src/lib/config.ts`, `src/lib/themes.ts` | validated configuration and semantic palettes |
| `src/data/projects.ts` | source-qualified project records, case-study content, demo stages |
| `src/layouts/Base.astro` | document head, theme application, shared header/footer and accessibility |
| `src/components/ProjectCard.astro` | short reusable project preview |
| `src/components/SystemVisual.astro` | original overview illustration, no confidential data |
| `src/components/Demo.astro` | manually controlled illustrative project walkthrough |
| `src/pages/index.astro`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro` | distinct page responsibilities |
| `src/styles/global.css` | responsive design system and motion settings |
| `public/favicon.svg`, `public/social.svg` | original identity assets |
| `tests/config.test.ts`, `tests/content.test.ts`, `scripts/verify-build.mjs` | behavioral configuration/content and built-route checks |
| `README.md`, `.env.example`, this plan, `docs/DECISIONS.md`, `docs/PROGRESS.md` | operation, decisions, evidence and remaining limits |

## Task 1 — Configuration and build foundation

- [ ] Add pinned Astro/TypeScript and self-hosted font dependencies, install with a lockfile.
- [ ] Write failing behavior tests for default theme, valid overrides, unknown theme rejection, unsafe resume paths, and invalid public origins.
- [ ] Implement typed theme/config resolution and a static document shell.
- [ ] Validate fonts, shared token contract and contrast for all palettes.
- [ ] Run `npm test` and `npm run typecheck`.

## Task 2 — Source-qualified content and pages

- [ ] Create typed project records from CONTENT.md, preserving later corrections.
- [ ] Cover private source suppression, in-progress evidence, unique slugs, and valid related-project references with behavior tests.
- [ ] Build landing, listing, individual case pages and recovery page.
- [ ] Use summary components on landing/listing only. Architecture, problems and results belong on detail routes.
- [ ] Build contact links, experience, evidence-linked capabilities, public-only repository links and résumé fallback.
- [ ] Verify routes render useful content with JavaScript disabled.

## Task 3 — Purposeful visuals and interactions

- [ ] Compose responsive original illustrations that inherit theme tokens.
- [ ] Add voice and retrieval walkthroughs with explicit Illustrative demo labeling, manual next/back/restart controls, no network calls, and accessible live status.
- [ ] Add category filtering with result count and keyboard controls.
- [ ] Add functional email-copy feedback with a direct-email fallback.
- [ ] Respect reduced motion; avoid layout shifts and hidden-on-load content.

## Task 4 — Validation and handoff

- [ ] Run typecheck, tests, production build and artifact checks.
- [ ] Rebuild with all four environment values; verify theme on landing, listing and detail routes. Restore default build afterward.
- [ ] Check desktop/tablet/mobile layouts, filter/demo/navigation/contact behavior, missing-route behavior and browser console.
- [ ] Verify first-load asset sizes and test normal/reduced-motion and no-JS paths. Report synthetic checks honestly; do not claim real-device or field CWV validation.
- [ ] Independent review; fix material findings and rerun affected checks.
- [ ] Document exact startup, theme switching, content edits, resume setup and deployment prerequisites.
- [ ] Append progress/decision evidence and show the local preview. No deployment in this task.

## Acceptance checklist

- All four palettes apply before paint across all routes using only config/environment selection.
- Homepage and project listing remain concise; every listed project has a complete separate detail page.
- Private projects expose no source link or confidential assets.
- Every demo is explicitly illustrative, works without paid services and makes no API requests.
- Responsive at 390, 768, 1024 and 1440 CSS pixels; text never overlaps fixed chrome.
- Core content and navigation usable without JavaScript; interactive features have readable static content.
- Keyboard controls, visible focus, contrast, reduced motion and contact fallback verified.
- Unknown theme/configuration fails clearly; raw source documents and environment secrets never enter `dist`.
- Missing resume/domain are honest configuration boundaries, not fake files/URLs.
- Build and checks pass, with exact verification evidence recorded.
