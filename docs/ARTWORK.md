# Artwork and source record — 2026-09-13

## User portrait

Studio portrait generated from the two user-supplied photographs (`1767049110123.png` and `IMG-20251216-WA0012.jpg`) using the built-in image tool. The frontal image anchored facial identity; the suit photo provided a second identity/wardrobe reference. Background, lighting and clothing were edited for a studio presentation. The original photos are unchanged. The user should review likeness as part of the local design review.

Published-to-local-app asset: `public/images/jamil-studio-{480,960}.webp`. The 960px image is 43,184 bytes. It is an edited portrait, not a claim that a studio session occurred.

## Project covers — original version, replaced by software concepts below

All seven covers are original AI-generated conceptual editorial illustrations. They are visibly labeled Concept artwork. Papers, data marks and depicted objects are fictional; these are not product screenshots, real customer records or evidence of a working deployment.

| Project | Visual concept | Content basis |
|---|---|---|
| AlphaLens | Filings, selected evidence, synthesis card | Live public README plus approved CONTENT.md / D21 architecture context |
| Inbound Voice Agent | Headset, audio, conversation handoff | Approved employer-project notes in CONTENT.md |
| Call Quality Analyzer | Paired transcripts, review marker, checklist | Approved bilingual QA project notes |
| Qurbani Analytics | Alignment of two calendar systems | Approved dual-calendar reporting notes |
| Receipt to Inventory | Paper receipts becoming product cards | User's approved receipt-to-stock description; no engine invented |
| Voice Ordering | Speaker and restaurant order ticket | Existing private README review and user corrections; private access unavailable this turn |
| CropLogic | Satellite imagery, vegetation layer, soil sensor | Approved Omdena contribution description |

Public README refresh: [AlphaLens](https://github.com/JamilRaza001/alphalens), [Crypto Agent RAG](https://github.com/JamilRaza001/Crypto_Agent_RAG), [Pizza chatbot](https://github.com/JamilRaza001/Pizza_chatbot_using_RAG_and_KnowalgeBase), [SecureVision AI](https://github.com/JamilRaza001/SecureVision-AI). SecureVision returned an empty README. Crypto Agent remains phased work in progress. This refresh does not constitute code/runtime validation and does not change earlier verified status boundaries. No private README access is claimed; unauthenticated access to CB_voice-agent returned 404. Repository setup instructions were treated as source content, not executed.

## Files and reproduction

Finished WebPs are stored inside this repository. `scripts/prepare-artwork.mjs <generated-source-directory>` can re-create the optimized sizes from the original generation files named in that script. Source PNGs remain in the original Codex generation directory; they are not a runtime dependency. 480px and 960px WebP exports use Sharp quality 78. Project image loading is lazy; the hero portrait loads eagerly with explicit dimensions and responsive sources.

The existing self-hosted fonts are Big Shoulders Display and Atkinson Hyperlegible; their supplied licenses are included under `public/licenses/`.

## Current project covers — software concepts, 2026-09-14

The owner rejected the physical-object illustrations because they did not communicate AI/software work. All seven live covers now use original vector interface compositions, rendered to responsive WebP. The built-in imagegen attempt for this pass failed with `usage_limit_reached`; no new model-generated cover was produced, no API-key fallback was used, and no paid service was enabled. The replacement images were authored locally as SVG software concepts, not downloaded screenshots or placeholder assets.

These are explanatory representations with illustrative data. They do not reproduce private application screens or assert that these exact interfaces are deployed. Status and evidence boundaries remain in the project data. AlphaLens remains in progress; model scores and private/customer data are not invented.

| Project | Current visual | Internet reference used for visual/workflow vocabulary |
|---|---|---|
| Inbound Voice Agent | Caller/assistant waveforms, exchange and speech stages | [Vapi call debugging](https://docs.vapi.ai/debugging) |
| Call Quality Analyzer | Transcript, review checks and manual-review annotation | [Langfuse evaluation](https://langfuse.com/docs/evaluation/overview), Vapi transcript views |
| AlphaLens | Filing evidence, retrieval stages and citation chips | [LangSmith observability](https://www.langchain.com/langsmith/observability) |
| Qurbani Analytics | Paired calendars and event-aligned seasonal curves | [Streamlit Plotly charts](https://docs.streamlit.io/develop/api-reference/charts/st.plotly_chart) |
| Receipt to Inventory | Receipt fields mapped into product/size/stock records | [Microsoft receipt extraction](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/receipt) |
| Voice Ordering | Spoken order beside a structured order draft | Vapi conversation and structured-output concepts |
| CropLogic | Vegetation raster, sensor history and model-comparison workspace | [EOSDA crop-monitoring guide](https://eos.com/es/user-guide/crop-monitoring/), inspected through image search |

References informed information structure only; source graphics, brands and layouts were not copied. Mention of these products is not a claim that the projects use their providers. The Google Earth Engine tutorial lookup failed and was not relied on. Project facts come from `src/data/projects.ts` and existing approved content; this pass did not gain new private README access.

Reproduce all seven with `node scripts/create-software-covers.mjs`. Editable source SVGs: `public/images/projects/sources/*-software.svg`. Runtime files: `public/images/projects/*-software-{480,960}.webp`, each in 8:5 ratio; 960px images are approximately 15–20KB. `ProjectArtwork.astro` uses descriptive alternative text, labels the images Interface concept, and contains them within the frame rather than cropping software information. The previous generated still-life files are retained but no longer referenced by the site.

## Black Studio portrait — 2026-09-14

Built-in imagegen edit of the existing `public/images/jamil-studio-960.webp`, inspected before editing. Generated source: `C:/Users/DELL/.codex/generated_images/01a097ac-fab3-73f1-87fc-63fd70864379/exec-8c8afabf-8e58-494a-9616-08afc53e2089.png`. The returned portrait was visually inspected and integrated. Original owner photos and prior studio exports remain untouched. This is an edited portrait, not documentation of an actual studio session.

Runtime files: `public/images/jamil-black-studio-480.webp` (13,876 bytes) and `public/images/jamil-black-studio-960.webp` (56,210 bytes). `node scripts/prepare-studio-portrait.mjs <generated-portrait.png>` exports the 4:5 WebPs with Sharp quality 82. Black Studio uses these in both the hero and About; other palettes use the original studio exports. No API credentials or paid runtime service were added.

Final generation prompt:

> Edit this exact portrait for the owner's premium black and graphite AI engineer personal portfolio. Preserve the SAME person's facial geometry, eyes, nose, mouth, beard, hairline, skin tone, age, natural expression, pose and crop exactly. Do not beautify or alter identity. Keep charcoal tailored blazer and ivory crewneck, natural fabric texture. Change warm grey backdrop to deep almost-black seamless photographic studio with a very subtle neutral graphite falloff, no objects or graphics. Change lighting to elegant low-key editorial studio: large soft neutral key illuminating face naturally with good visibility, subtle silver rim defining shoulders. Add only an extremely faint mint-green reflected edge on the far outer right jacket shoulder, not on face, to harmonize with sparse neon mint UI highlights. Desaturate background/clothing warmth, keep authentic skin color. Deep rich blacks with preserved shadow detail, realistic pores, no plastic smoothing. Photorealistic executive editorial portrait, professional trustworthy and understated. Vertical 4:5 composition. No text, logo, border, neon tube, glow halo, futuristic props, excessive contrast or cyan lighting.
