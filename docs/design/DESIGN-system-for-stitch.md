# Jamil's Laboratory — Design System

A portfolio for an AI engineer. Setting: an underground laboratory, seen dark and lit by its own
machines. Audience: technical hiring managers. Tone: precise, calm, confident. Not cute.

## Colour

Two chromatic colours with strictly separate jobs. Cyan is the machines' own light and is
atmosphere only — it never marks anything the reader must act on. Amber is human attention and is
the ONLY interactive/semantic accent: every figure, every heading accent, every call to action.

- `--lab      #0E2A44`  page ground. Never pure black.
- `--tile     #1B4F73`  floor
- `--wall     #2A6E8C`  steel panel
- `--panel    #14395A`  machine bodies, bezels
- `--cyan     #5FE3F0`  machine light — atmosphere only, never a button or link
- `--amber    #F5B42C`  the single accent — figures, headings accent, CTAs
- `--bone     #EAF2F7`  ALL prose, captions, headings
- `--bone-dim rgba(234,242,247,.64)`  metadata only (organisation line, stack line, footer)

Dark theme only. Body must set an explicit `--lab` background.

## Type

- **Big Shoulders Display** 700/900 — all headings and all figures. Tall, narrow, industrial.
- **Atkinson Hyperlegible** 400/700 — all body, captions, navigation, metadata.
- **Luckiest Guy** 400 — used once only, as the laboratory's own sign on the big screen.

Scale: hero `clamp(60px,9.5vw,140px)`; h2 `clamp(44px,6.5vw,96px)`; h3 `clamp(34px,4.2vw,58px)`;
lead figure `clamp(72px,10vw,150px)`; figure `clamp(40px,5vw,72px)`; body 17px/1.55; small 15px;
micro 13px. Headings `line-height:.9`, `text-wrap:balance`. Prose max 56ch. Figures use
`font-variant-numeric: tabular-nums`.

PROHIBITED: tracked-out ALL-CAPS eyebrow labels; accenting one word in a headline; arrows appended
to link text; middle-dot meta strings; monospace for data labels.

## Space and grid

4px base: 4 8 12 16 24 32 48 64 96 128 192. Page gutter 40px desktop / 20px mobile. Content max
1200px, prose column max 600px. Case study is two columns `minmax(280px,440px) 1fr`, gap 48px,
aligned to the bottom. Sections are full viewport height, vertically centred. The grid is
symmetric and repeated identically for every case study.

## Components

**Case study** — the only repeated composite. Left: lead figure, title, organisation, prose,
stack line. Right: an architecture diagram drawn in line. It is NOT a card: no border, no fill,
no radius, no shadow. Separation comes from whitespace alone.

**Lead figure** — large amber figure baseline-aligned with a short sentence in bone. The FIGURE
COMES FIRST and the project name second. Where a project has no figure, its most distinctive fact
takes the same slot in the same type.

**Architecture diagram** — inline SVG line drawing. 1.1px amber strokes, node fill `--lab`, labels
bone 13px sentence case. These replace product screenshots entirely.

**Navigation** — fixed. An `MJR` mark in Luckiest Guy in amber, preceded by a 9px cyan square. Links
bone 15px, underline on hover and focus.

**Motion pause control** — a persistent 34px circular outline button in the navigation, always
visible.

## Rules

- Every interactive element has a visible amber focus ring.
- No decorative layer ever sits over body copy; a dark scrim behind the text column guarantees
  WCAG AA contrast.
- The native scrollbar is never replaced or hidden, and no custom scroll indicator is added.
- One primary call to action only. Amber is the only interactive accent.
- Figures lead; they are never placed in a weak position.
- No product screenshots anywhere.
