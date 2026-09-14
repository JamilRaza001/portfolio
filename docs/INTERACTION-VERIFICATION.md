# Interaction verification — 2026-09-14

Scope: D25 section compositions and real browser interactions, following the user's rejection of the static refinement. Tests ran against the local Astro application. Nothing was published.

## Build and content checks

- `npm run check`: 8 tests pass; Astro diagnostics across 27 files report zero errors, warnings or hints; 10 HTML pages build and pass resource, privacy and metadata checks.
- All four palette builds pass `scripts/verify-build.mjs`: blue-amber, charcoal-copper, olive-champagne and aubergine-silver. Existing `.env` was not edited. Local preview retains Aubergine–Silver.
- Final current-theme output: 6,378 bytes of external decoded JavaScript; conservative homepage Brotli asset estimate 329,356 bytes including fallback images and shared fonts/styles. This is a build estimate, not a measured field performance score.
- Social PNG generation emits nonfatal Fontconfig cache-directory messages in this restricted Windows environment. PNG signature and build checks pass.

## Browser evidence

Chromium, widths 320, 390, 768, 1024 and 1440:

- 20 route/layout combinations across homepage, project listing, voice-agent case and AlphaLens case: HTTP 200, no horizontal overflow, initial main heading below the sticky header.
- 35 panel selections across the five widths: exactly one career or skill panel visible in its group; no overflow. No page-level JavaScript errors in this matrix.
- Career selection: observed an actual running 500ms Web Animation, starting at transform matrix `(0.98, 0, 0, 0.98, 36, 0)`. Right-arrow from SMIT selected Omdena.
- Hero scroll: portrait transform changed from the identity matrix to `(0.999788, -0.0206089, 0.0206089, 0.999788, 0, -25.5859)` after a 440px scroll. This confirms live scroll motion, not just animation classes.
- Desktop project stacking: first card remained at its 118px sticky position while the next card advanced and the active chapter changed to Call Quality Analyzer. Visually inspected overlapping image-led cards and sticky introduction. Image scale holds while a card is pinned, as its viewport position is stable.
- Visually inspected desktop Expertise and the mobile Experience selector and SMIT panel. Roles, dates and contribution text remain readable in the single-column panel.
- Skill tablist orientation follows its responsive layout: vertical at 390px, horizontal at 768px, vertical at 1440px.
- Desktop case navigation sits at 120px, below the header bottom at 92px.
- Career, skill and contact-intent selections generated zero network requests after page load. The opportunity intent prepares a mailto subject; no email was sent.
- Reduced motion: no career panel animations; work cards use normal relative positioning.
- JavaScript disabled at 390px: all four career chapters and three skill panels visible, enhanced tab strips hidden.

## Review boundary

This is local Chromium verification, not cross-browser certification or a field Core Web Vitals measurement. Latest visual inspection used Aubergine–Silver; the other palettes passed build and contrast checks. Owner review of appearance, copy and portrait remains the final subjective review. Resume and production domain remain configurable inputs. No deployment or remote push occurred.

## D26 follow-up — Black Studio and short viewports

Later on 2026-09-14, the owner supplied a screenshot with project copy below the viewport. Added Black Studio and switched the existing theme field to it, preserving other environment values and previous palettes. The previous section's Aubergine visual-review statement describes D25 only.

Browser matrix: all three featured cards at 1920×880, 1440×900, 1366×650, 1280×585, 1024×600, 900×500, 390×844 and 320×568: 24 checks, no horizontal overflow or page JavaScript errors. All desktop pinned cards fit between the header and viewport bottom, including title, summary and CTA. At 1280×585 the first card ends at approximately 561px and the CTA at 542px. Mobile cards remain ordinary scrollable document content, so small mobile screens may require scrolling to read a full card. Screenshot visually inspected at 1280×585 and mobile career selector at 390px.

The new selection indicator was observed mid-transition with advancing animation time and a 550ms duration; final alignment was within 0.34px of the selected button. Initial background-tab sampling deferred CSS animation updates; bringing the browser tab to the foreground resolved the test discrepancy without changing application code. Reduced motion produced zero running career animations. No-JS retained four career chapters and three skill panels.

`npm run check` passed after the additions: 8 tests including all five theme resolutions/contrast checks, zero Astro diagnostics, 10-page build and resource/privacy budgets. Only Black Studio received the new visual inspection; previous palettes retain their prior build validation.

## D27 follow-up — portrait and text reveals

Black Studio now selects the matching edited portrait. Six homepage/career viewport checks at 1440×900, 1280×585, 1024×600, 768×900, 390×844 and 320×568 retained readable names and no horizontal overflow or page errors. Desktop hero visually inspected. Browser sampled active 850ms text-reveal animations at approximately 143ms with nonzero glyph translation, and pointer movement updated portrait light coordinates. Reduced-motion loaded with zero document animations; a no-JS mobile context retained the name, new image and all four career chapters. Original text content and links remain intact.

Final check passes: 8 tests including mint signal contrast; 29 Astro files with zero diagnostics; 10-page build; 9,258 bytes external decoded JS; 347,099-byte conservative homepage Brotli asset estimate. A TypeScript global-name collision found during the first check was resolved by making the new animation script an explicit module. Existing nonfatal Fontconfig cache messages remain limited to social-image generation. This remains Chromium/local verification, not field performance or a cross-browser certification.
