# Muhammad Jamil Raza — portfolio

Static Astro portfolio with five configurable palettes, separate project case studies, self-hosted fonts, original project artwork and a portrait-led introduction.

## Run locally

```powershell
cd "C:\MJR Work Space\portfolio"
npm install
npm run dev -- --port 4321
```

Open http://127.0.0.1:4321. To run in the background, add `--background`. Stop a running server with `node scripts/astro.mjs dev stop`.

## Change the color palette

Set `PUBLIC_SITE_THEME` in your existing `.env` to one of:

- `black-studio` (current preview/default)
- `blue-amber`
- `charcoal-copper`
- `olive-champagne`
- `aubergine-silver`

Alternatively edit `theme` in `site.config.ts`. The environment value takes precedence over the config file. Restart the dev server after changing either. All pages share the selected palette; there is no public theme picker. Photographs retain their natural neutral colors across themes.

```powershell
node scripts/astro.mjs dev stop
npm run dev -- --port 4321
```

## Check and build

```powershell
npm run check
npm run preview -- --port 4322
```

`check` runs configuration/content/contrast tests, Astro/TypeScript diagnostics, static build and artifact/link/asset checks. Static output is in `dist`. No backend or paid AI service is needed by this website. Project walkthroughs are authored examples, not live inference.

## Content and assets

- `src/pages/index.astro`: introduction, about and homepage composition.
- `src/components/ProfessionalBackground.astro`: linked Build, Teach and Collaborate role cards; each opens its matching career chapter. The hero connection button uses the LinkedIn URL in `src/lib/config.ts`.
- `src/components/FeaturedWork.astro`: scroll-linked project showcase.
- `src/components/Expertise.astro`: selectable capabilities and related projects.
- `src/components/Experience.astro`: selectable career chapters.
- `src/layouts/Base.astro`: navigation, contact and metadata.
- `src/styles/navigation.css` and `src/scripts/navigation.ts`: mobile menu disclosure at 800px and below; desktop links remain inline.
- `src/data/projects.ts`: project summaries, status and full case-study content.
- `src/components/ProjectArtwork.astro`: responsive project covers.
- `src/styles/refinement.css`: identity, section spacing and motion styling.
- `src/scripts/motion.ts`: progressive enhancement and motion preference handling.
- `src/styles/experience.css`: distinct section layouts and responsive interaction styling.
- `src/scripts/interactions.ts`: keyboard-accessible panels, contact intent and scroll-linked states.
- `src/styles/studio.css` and `src/scripts/studio-motion.ts`: finite text reveals and temporary mint/violet/rose motion highlights. Resting buttons, bars and selected states stay neutral.
- `public/images`: optimized local WebP assets. These are included in the project and need no generation step to run the site.
- `docs/REFINEMENT-PLAN.md`: content and image refinement rationale.
- `docs/INTERACTION-PLAN.md`: latest section layout and motion direction.
- `docs/INTERACTION-VERIFICATION.md`: browser and build verification for the interaction pass.
- `docs/ARTWORK.md`: image provenance, source boundaries and image preparation.
- `docs/CONTENT-ALIGNMENT-REVIEW.md`: CV/LinkedIn export comparison, owner-confirmed AWS/Azure positioning and source discrepancies requiring follow-up.

All seven project covers are now original software-interface illustrations. Edit `scripts/create-software-covers.mjs`, then run `node scripts/create-software-covers.mjs` to regenerate the editable SVGs and 480/960px WebPs. They illustrate project workflows with sample data and are not screenshots of private deployments. All cards and case pages share these assets.

Private case studies expose no repository URL, internal UI or customer data. Preserve the source qualifications and work-in-progress labels when editing. Detailed architecture and results stay on individual project pages.

## Review the interactions

On screens up to 800px wide, Menu opens the navigation and résumé action beneath the compact header. It closes after a link selection, Escape, an outside click or keyboard focus leaving the header. Hidden links cannot receive focus. The panel scrolls within short landscape screens, respects reduced motion and falls back to visible links without JavaScript.

Scroll the homepage to see portrait movement, project-card stacking on desktop and the About statement emphasis. Select a capability in Expertise, then switch employers in Experience. Career and skill controls also support arrow keys, Home and End. Contact intent buttons prepare an email subject and message without sending anything. Mobile uses vertically flowing project cards. With reduced motion enabled, animation is suppressed; with JavaScript disabled, all career and skill content remains readable.

Black Studio uses the matching `jamil-black-studio` portrait assets; the other palettes retain the original studio portrait. Main headings and the introduction reveal once as they enter view, with temporary colored light that clears afterwards. Enter the portrait or hover/focus/click a control for a brief mint/violet/rose highlight. These effects finish within 1.1 seconds even if the pointer stays over the control; backgrounds and progress bars remain silver/grey. No flashing, looping text or runtime image service is used.

The header and footer now download the owner-approved June 2026 CV from `public/resumes/muhammad-jamil-raza-resume.pdf`. Replace that file only after approving a revised CV; keep the filename to preserve the download link. Raw source PDFs outside `public/resumes/` are not deployment assets.

## Deploy to Vercel

The site is static Astro and needs no adapter, database or paid runtime service. `vercel.json` runs `npm ci`, then `npm run check`, and publishes `dist`. Node 24.x is pinned in `package.json`, matching Vercel's supported Node release line. Full deployment and rollback steps are in `docs/VERCEL-DEPLOYMENT.md`.

On Vercel, import the Git repository with the repository root as Root Directory. Vercel automatically provides `VERCEL_PROJECT_PRODUCTION_URL`; production builds use that stable project domain for canonical URLs, Open Graph images and the sitemap. Preview builds send `noindex, nofollow` and do not publish sitemap entries. After a custom domain is connected, set `PUBLIC_SITE_URL` to its HTTPS origin in the **Production** environment and redeploy. Do not set it in Preview.
