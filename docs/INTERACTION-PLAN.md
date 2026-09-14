# Interaction and layout correction — 2026-09-13

The user rejected the first refinement: faint one-shot entrance/hover effects and a date/role/link grid still felt like a static template. This pass changes the actual composition and interaction model.

## References inspected

- https://raunofreiberg.com/ — expressive personal identity, a collection of individual interaction artifacts and concise content. Browser-loaded text and navigation inspected; a subsequent visual load stalled, so no claim of complete animation review.
- https://emilkowal.ski/ — personal role-led introduction, concrete software artifacts and attention to interaction craft. Browser/text inspected.
- https://brittanychiang.com/ — persistent navigation and concise professional narrative. Browser/text inspected. Its compact experience rows are deliberately not the layout used here, because the user specifically rejected rows.
- https://bruno-simon.com/ — search/reference context only; no claim of full browser interaction review. A 3D game is not required by this brief.

## Section-specific implementation

1. Navigation: compact sticky navigation and reading progress, preserving direct links.
2. Hero: retain name/portrait/professional background; introduce scroll-linked portrait depth and typographic movement. Motion follows scroll, not a repeating idle loop.
3. Projects: sticky section introduction alongside successive image-led project cards. Card stacking and scroll progress create visible choreography; only summaries appear here.
4. Expertise: a vertical capability selector changes the tool collection and linked proof. Large typographic tool groups replace repeated three-column text cards.
5. Experience: four selectable career chapters. Each opens a spacious employer/role story with contributions and an evidence link, using directional panel transitions. No date/role/action table. Concurrent roles are explicitly acknowledged.
6. About: a large personal statement with scroll emphasis; asymmetric supporting biography and education, without repeating the skills or experience layouts.
7. Contact: large invitation plus project/role/general intent controls that prepare a relevant email subject. Nothing is sent by the website.

## Constraints and acceptance

Four palettes, approved copy and private source guards retained. No additional paid services, fabricated metrics or public demos. No scroll hijacking. Native scroll and browser animation APIs; readable content without JS; motion preferences respected. Controls support keyboard and semantic selected states. Verify real transform changes during scrolling and switching, not just class names. Check all routes at narrow/mobile/tablet/desktop widths and production build.

## D26 follow-up — Black Studio and screen-height fit

The owner's laptop screenshot exposed an acceptance gap: width-only responsive checks did not guarantee that a pinned card's title and action were inside a short viewport. Fit now reserves measured copy height, border/padding, sticky offset and a 24px bottom margin before sizing artwork. Below the minimum viable image height, the card returns to normal scrolling. The mobile layout remains normal flow; content is never hidden or internally scrolled to make a card fit.

Black Studio adds a fifth configurable palette: black `#080808`, graphite `#141414`, raised graphite `#242424`, white `#F5F5F3`, muted silver `#B8B8B5`, highlight `#E4E4DF`. Existing display/body typography and editorial alignment remain. Contrast and responsive layout, rather than unrelated decorative objects, carry this pass.

Additional first-party references inspected on 2026-09-14:
- https://linear.app/now/behind-the-latest-design-refresh — content-first dark-interface hierarchy and quieter surrounding controls; article inspected.
- https://rauno.me/craft — interaction artifacts including Toolbar Morph, Staggered Text and Focus Reading; browser and page content inspected. The page exposes embedded video examples; this is not a claim to have audited every example.
- https://lusion.co/ — image-led project selection and visual storytelling; page content inspected, not a full WebGL or motion audit.

Translation into this portfolio: shared moving selection highlights for role/skill changes, silver emphasis on the current project, retained scroll/card choreography, shorter artwork on short screens and compact section introductions. No scroll hijacking, custom cursor or paid runtime animation dependency.
