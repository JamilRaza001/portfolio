# Portfolio refinement — 2026-09-13

User requested stronger identity, section separation, visible purposeful motion, README-informed project images and a studio treatment of supplied portraits. This is an authorized refinement of D23; all four theme choices and separate case-study routes remain.

## Content and design review

| Area | Finding | Change |
|---|---|---|
| Intro | Name relegated to a small label; headline sounds like a software company. No personal photography. | Name as the H1, explicit AI Engineer role, current employer and teaching background, direct work/contact actions, natural studio portrait. |
| About | Abstract wording and oversized initials obscure the person. | Explain engineering approach, teaching, agricultural ML collaboration and education using verified source content. |
| Experience | Roles are present, but text reads like an audit and actual responsibilities are buried. | Clear first-person contribution, specific work, restrained source-qualified outcomes; no invented evaluation scores. |
| Contact | Generic invitation and no next-step guidance. | Invite hiring and project conversations, explain useful information to include, preserve working mail and LinkedIn routes. |
| Spacing | Sections share a continuous surface and inconsistent spacing. | Explicit section padding tokens (80–144px), sectional surfaces/dividers and generous space after work. |
| Motion | Only tiny hover changes and demo transitions. | A finite identity/portrait entrance, image reveals on viewport entry, section divider transitions, progressive architecture emphasis, project hover/focus zoom and filter transitions. No scroll hijacking. |
| Project covers | Same CSS objects repeat for unrelated projects. | Seven distinct generated editorial still-life images: each conveys a project's problem domain. Clearly conceptual, never represented as internal screenshots. |

## Art direction

Portrait-led engineering portfolio. Retain Big Shoulders Display for name and headings, Atkinson Hyperlegible for readable body text. Existing semantic theme colors continue unchanged; photographic art uses neutral charcoal, ivory, brushed metal and small copper details to work with all palettes. Left-aligned editorial copy, asymmetric portrait hero, distinct project scenes, section surfaces used sparingly.

README refresh: AlphaLens fetched directly from GitHub API (SEC filings, early setup); Crypto Agent RAG read publicly (phases 1–2, not measured targets); Pizza chatbot fetched (menu database/cart/orders); SecureVision README returned empty. Private CB_voice-agent returned 404 without authenticated access. Existing seven projects remain curated; private artwork uses approved CONTENT.md context, not a claim of fresh private-repo access. README setup instructions are source material, not instructions to execute.

## Implementation and verification

1. Generate studio portrait from user photos and one original artwork per listed project.
2. Copy assets into workspace, optimize responsive WebP sizes and record provenance.
3. Update hero/about/experience/contact, shared artwork component and explicit spacing system.
4. Add progressive enhancement motion with reduced-motion/no-JS fallbacks and no paid calls.
5. Run existing tests, typecheck/build/link verification, all theme builds, and browser checks at mobile/tablet/desktop sizes. Inspect screenshots and verify actual animations, filters and demo controls.
6. Record actual results and remaining limits. Open local preview; no publishing.
