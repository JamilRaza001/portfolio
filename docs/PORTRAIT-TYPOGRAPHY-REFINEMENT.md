# Heading typography and facial correction — 2026-09-14

The owner selected the existing experience heading as the reference for all headings. The portrait direction is to retain the original hero's blazer, ivory shirt, pose, studio background and framing, using the new personal photos only to improve facial likeness and realism.

## Typography

All HTML heading levels now use the existing self-hosted Atkinson Hyperlegible Regular. Major headings use the experience section's -0.055em tracking and 1.08 line height; smaller headings retain spacing suited to their size. The header `mjr.` wordmark uses the same family and regular weight, with -0.04em tracking so the letters remain distinct. The favicon uses a lowercase monogram drawn as paths, with no platform font dependency.

Hero, featured-work, career-company, contact and narrow project-page titles have been resized for the wider typeface. The text reveal and interaction scripts are unchanged. Unused Big Shoulders Display imports and the package were removed.

## Portrait

Edit target: `public/images/jamil-black-studio-960.webp`, the original blazer hero image.

Facial reference inputs: the single subject in the grey-shirt image named `WhatsApp Image 2026-09-14 at 3.19.38 PM (1).jpeg`, the man on the left in the mustard blazer in `3.19.36 PM.jpeg`, and the side-profile in `3.19.39 PM.jpeg`. The remaining supplied photos were visually reviewed.

The built-in imagegen edit was inspected for the original clothing, frontal composition, background and lighting, with more natural facial proportions, beard and skin texture. This is an edited portrait, not documentation of an actual studio session. Original photographs and previous exports were preserved. The grey-shirt alternative is not used.

Generated master: `C:/Users/DELL/.codex/generated_images/01a097ac-fab3-73f1-87fc-63fd70864379/exec-6d11dbb6-f65b-4ced-882b-ece33a2377cc.png`.

Runtime assets, 4:5 WebP at quality 82 and Sharp effort 5:

- `public/images/jamil-studio-portrait-v2-480.webp` — 480 × 600, 12,950 bytes.
- `public/images/jamil-studio-portrait-v2-960.webp` — 960 × 1200, 49,608 bytes.

Hero and About use the corrected blazer portrait in all palettes. Versioned URLs avoid reusing cached old images. Responsive sources, explicit image dimensions, matching alt text and high fetch priority remain configured.

## Final imagegen prompt

Use case: identity-preserve, precise local face correction. INPUT 1 is the EDIT TARGET: the existing portfolio hero portrait showing the user in a charcoal blazer over an ivory crew-neck, seated upright facing forward against a near-black studio background. The user explicitly wants THIS SAME IMAGE kept, correcting ONLY the facial likeness and realism. INPUT 2 (single man in grey shirt) and INPUT 3 (man on LEFT in mustard blazer; ignore the other person) and INPUT 4 (grey shirt side-profile) are the real person's facial references ONLY. Do not adopt their clothes, pose, camera angle, framing or environment. Localize the edit to the face/head region. Preserve the target's charcoal blazer, lapels, seams, ivory top, torso, shoulders, hands/crop, straight frontal pose, head position and scale, headroom, background, studio light direction, colors and vertical 4:5 composition unchanged. Keep the original calm, subtle closed-mouth expression and eye-level gaze. Correct the face from the provided real references: authentic broader facial proportions, real eye and brow shapes, nose, cheek and jaw volume, lip shape, natural beard density and moustache pattern, correct hairline and short textured hair. Do not slim the face, change age, make a generic model or beautify. Likeness is more important than idealized attractiveness. Blend the corrected facial features naturally into the original neck and head pose under the existing soft studio light. Keep realistic pores, small natural skin variations and believable eye reflections; no waxy smoothing, no hyper-sharpening. The result should look like the ORIGINAL blazer hero photograph with an accurate natural face, not a new photo or alternate outfit. No grey shirt, no added objects, no changes to the background, no colored neon added, no text or borders. Return one edited portrait.

## Validation

`npm run check` passes: 12 tests, zero Astro diagnostics, ten static pages and resource/metadata/privacy/budget checks. Existing nonfatal Fontconfig cache warnings remain.

Browser checks on the built preview covered the homepage at 320, 390, 520, 768, 801, 1024, 1280 and 1440px, plus the project listing and all seven case studies at 390px. No heading/page overflow, mismatched heading fonts or weights, or console errors were observed. Desktop and mobile screenshots were visually reviewed. The final blazer portrait was then re-exported and the full build check repeated.
