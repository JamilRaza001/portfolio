# Design directions — Phase 2.1

Six directions were proposed (A Signal Path, B Retrieval Space, C Ground Truth, D The Ledger,
E Blueprint, F Turn-Taking). User shortlisted **D and B** for visual comparison. Both were
rendered as desktop hero stills in Stitch (project `11074993871830386819`) and refined once.
Stitch cannot render 3D, so each still is a *frozen frame* of the intended 3D moment.

Research grounding: Utsubo "Best Three.js Websites 2026", Hon Tran "Best Award-Winning
Websites 2026" (juror), CreativeDevJobs portfolio roundup; sites inspected directly: Iventions,
Minh Pham, Oryzo. Principles adopted: one hard idea; scroll as narrative; a single well-rendered
object over a busy scene; 60 fps on a mid-range phone is non-negotiable. Pattern rejected: the
developer-portfolio-as-game-world (floating island / spaceman / drive-a-car).

---

## D — The Ledger  (`direction-D-ledger-hero.png`, screen `d2058535581242a3b8cf1ea6e3cae68b`)

**Idea:** every project turns documents into structured data. The 3D subject is paper; the one
motion verb is *lift-and-split* — printed text detaches from the sheet and breaks into chunks.

| Token | Value | Why |
|---|---|---|
| Paper | `#ECEAE4` | Thermal-receipt grey-white. Deliberately cooler than the warm-cream default. |
| Carbon copy | `#EDB8C2` | NCR second sheet, used as a second document tint. |
| Ledger rule | `#B9D0C4` | Faint horizontal rules on documents. |
| Ink | `#000000` | True black. Not tinted near-black. |
| Ballpoint | `#1F3A93` | One handwritten margin note per view. |
| Stamp | `#C0392B` | Rubber-stamp impressions only. **Metrics are stamped, never typeset** — this is where the boldness is spent. |

**Type:** Bricolage Grotesque (site voice; black weight for display) + Martian Mono condensed
(everything printed on a document). Two families, clearly distinct. Sentence case; the only
uppercase is stamp impressions.

**Layout:** asymmetric, left-aligned. Document 55% left, headline 45% right. No cards, no
shadows, no gradients.

**Still-image critique:** strongest as a still. Stamps read instantly. Risk in build: paper can
drift into "accounting" if motion is slow or type is timid.

## B — Retrieval Space  (`direction-B-retrieval-hero.png`, screen `c5df9105e5b54440a5ba5042a214ac76`)

**Idea:** the page is an embedding space. Scroll is a query; projects are clusters that resolve
on approach (k-NN pull → rerank). The one motion verb is *retrieve*.

| Token | Value | Why |
|---|---|---|
| Field | `#F3F4F6` | Pale cool grey. Refuses the dark-void-with-neon default. |
| Far points | `#B8BCC4` / `#8A8F98` | Depth gradient. |
| Query / ink | `#000000` | |
| Retrieved | `#1F77B4` | matplotlib C0 — the colour an ML engineer stares at most. |
| Category 2 | `#FF7F0E` | matplotlib C1. |
| Category 3 | `#2CA02C` | matplotlib C2. Palette is literally a research figure's. |

**Type:** IBM Plex Sans Condensed (display) + IBM Plex Sans (body) + IBM Plex Mono (live
similarity-score readout only). One superfamily.

**Layout:** full-bleed field; annotations with leader lines, never cards; headline lower-right.

**Still-image critique:** undersold by a still — the metaphor lives in motion (the pull, the
reorder), which a frozen frame cannot show. Field remains sparser than the build would be.
Stitch ignored the green-cluster label on the refinement pass. Cheapest of all directions to
render (instanced points). Structural weakness: voice agent and dashboard work do not naturally
belong in a vector index.

---

**Recommendation carried from 2.1:** D, on coverage — it holds every project without strain.
B is the sharper positioning for RAG roles. **Decision pending user review.**

---

# Round 2 — user asked for "wow factor" (2026-09-11)

User verdict on D: correct but not exciting. Asked for (1) a scenery direction and (2) a
cave-lair direction inspired by the Batcave — theme only, no branding — each shown as hero AND a
case-study section. Both grounded in content rather than fandom, and both rendered with the
same Voice Agent case study so the comparison is fair.

## G — The Lair  (hero `11ecd938240e4b5b9d81c4044685776c`, case `b733dc2015614201a59fd0039d7246ba`)

**Idea:** underground cave command centre. **Content spine: echolocation** — sound out, echo
back — which is the voice agent (speech in → answer out) and retrieval (query out → neighbours
back). Bats and echo rings are the metaphor, not the fandom.

| Token | Value | Why |
|---|---|---|
| Cave depth | `#15181B` | Dark cool stone. Not pure black, not navy. |
| Rock | `#3A3F45` | Lit stone surfaces. |
| Bone | `#E6E1D6` | Text and echo rings. |
| Lamplight | `#E8B86D` | Light shaft and the single metric. The only accent. |

**Type:** Big Shoulders Display black condensed (display) + Atkinson Hyperlegible (body — chosen
for legibility on dark, and because it is an unusual, meaningful choice).
**Motion vocabulary:** flock sweep as page transition; lamp travels deeper on scroll; echo ring on
each metric reveal.
**IP guard (binding):** no emblem, no signal, no cowl, no vehicle, no character or place names.

**Still critique:** hero delivers the most immediate wow of any direction. Two faults: Stitch
**fabricated a metric** in the hero body ("10,000 queries each week") — must never ship, see D9;
and the case section collapsed the stone plinth into a **rounded grey SaaS card** — exactly the
default the brief forbade. Both are prompt-level fixes, but they show how hard this direction
pulls toward the generic dark-tech look.

## H — The Observatory  (hero `00c911983f154a03a7da283251cb6981`, case `5080d2371f314e399130fd31306fac7c`)

**Idea:** mountain observatory at night. **Content spine: one true point of light among
millions** — what a retrieval engineer does. Dome slit opens on load (the one orchestrated
moment); scroll pans the sky from object to object; architecture drawn as **star charts**.

| Token | Value | Why |
|---|---|---|
| Night | `#101720` | Deep blue-black. |
| Moonlit rock | `#7C8894` | Ridge and dome interior. |
| Dome | `#E9E4D8` | Observatory domes are white. |
| Night-vision red | `#D9453B` | Observatories use red light to preserve night vision. Metric and reticle only. |
| Star / text | `#F2EFE6` | |

**Type:** Newsreader, one family, optical sizes (display for headline and metric, text for body).
**Motion vocabulary:** slit opening; sky pan; constellation lines draw in on approach.

**Still critique:** the case-study section is the **best single screen produced in either round**
— architecture as a star chart through the slit answers the no-screenshots constraint better than
anything else tried. The hero is quieter than G: the sky came back far too sparse for a headline
that says "among millions" (trivially fixed in the build — instanced stars are near-free), and the
low-poly ridge reads slightly "3D template". Least likely of the three to drift generic.

## Standing comparison

| | D Ledger | G Lair | H Observatory |
|---|---|---|---|
| Wow in a still | low | **high** | medium |
| Content truth | **high** | medium (echo spine) | medium-high (retrieval spine) |
| Case-study treatment | stamps | card (defaulted) | **star chart** |
| Risk of going generic | accounting | **dark-tech default** | 3D-template terrain |
| Render cost | lowest | low-medium | low-medium |

**Decision pending user.**
