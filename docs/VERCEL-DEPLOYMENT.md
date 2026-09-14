# Vercel deployment guide

## What is ready

This is a static Astro site. The deployment has no database, server function, paid AI service or secret needed at runtime. `vercel.json` installs the locked packages with `npm ci`, runs the full local gate through `npm run check`, then serves `dist/`. It adds conservative content-type/referrer headers, immutable caching for built assets, and revalidation for the downloadable résumé.

`VERCEL_PROJECT_PRODUCTION_URL` is a Vercel system value. Production builds turn it into the HTTPS canonical origin if `PUBLIC_SITE_URL` is not set. This prevents a temporary preview domain becoming the permanent sitemap or Open Graph domain. Preview builds are noindex and their robots file disallows crawling.

## First deployment

1. Create a Git repository from this workspace and push the approved branch. The workspace had no remote when this guide was written, so this action has not been done here.
2. In Vercel, choose **Add New → Project**, import that repository, and keep the repository root as the Root Directory.
3. Confirm **Astro**, Node **24.x**, `npm ci`, `npm run check`, and `dist` are detected. These values are committed in `vercel.json` and `package.json`; no dashboard override is required.
4. Leave `PUBLIC_SITE_URL` unset for the initial deployment. The Vercel production project domain supplies a correct temporary canonical origin automatically.
5. Deploy a preview first and test it using the smoke checks below. Preview output intentionally has `noindex, nofollow`, an empty sitemap, and `Disallow: /` in robots.txt.
6. Promote the verified deployment to Production. The production build supplies canonical links, nine public sitemap entries, and the social preview image.

## Custom domain

After the domain is connected and HTTPS is active, set one **Production-only** environment variable:

```text
PUBLIC_SITE_URL=https://your-domain.example
```

Use only an HTTPS origin with no path, query, credential or trailing page path. Redeploy after setting it. Do not put this variable in Preview; previews should remain unindexed. `PUBLIC_SITE_THEME` is optional and defaults to `black-studio`. `PUBLIC_RESUME_PATH` is optional because the approved résumé is configured in `site.config.ts`.

## Production smoke checks

- `/` loads with the black studio theme, portrait, responsive navigation and all project artwork.
- Header and footer download `/resumes/muhammad-jamil-raza-resume.pdf`.
- `/robots.txt` permits crawling and names the production `/sitemap.xml`.
- `/sitemap.xml` contains homepage, projects page and seven case-study URLs.
- View page source: canonical, `og:url`, `og:image`, and the social image use the final HTTPS domain.
- Mobile Menu opens, closes via Escape/outside click/link activation, and the reduced-motion preference suppresses transitions.
- The main contact email, GitHub and LinkedIn links open their intended destinations.

## Rollback

If a production smoke check fails, use Vercel's deployment list to promote the previous known-good production deployment. There is no migration or user data to reverse. Correct the source, run `npm run check`, then create a new preview before retrying production.

## Content boundary

The downloadable résumé is the owner-supplied June 2026 PDF, copied without rewriting. It has known content discrepancies described in `CONTENT-ALIGNMENT-REVIEW.md`; replace it only after a revised CV is approved. Do not add raw CV exports, private repositories, customer data or environment files to `public/`.
