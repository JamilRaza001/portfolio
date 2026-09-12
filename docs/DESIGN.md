# DESIGN.md — Jamil's Laboratory

The design system for the portfolio. Written in Phase 2.2–2.7 against the locked direction
(D15, D16). **This is the contract Phase 3 builds against.** Phase 3 builds what is specified
here — not an interpretation of it. If something proves unbuildable inside §7's budget, stop and
raise it; do not substitute.

Every colour, ratio and number below was either measured or derived. Where a value has a reason,
the reason is written next to it, so a later session does not "tidy" it away.

---

## 1. Foundations — colour

### 1.1 The two-temperature rule

The palette has two chromatic colours. They are **not** two accents competing — they have
strictly separate jobs, and that separation is what keeps the page from reading as noisy:

| | Cyan `#5FE3F0` | Amber `#F5B42C` |
|---|---|---|
| Means | **The machines' own light** | **Human attention** |
| Where | Screens, storage LEDs, pipeline pulses, ceiling fixtures, the nav power dot | Every number, every section heading accent, hazard bands, the bench lamp |
| Carries meaning you must read? | **Never** | **Always** |
| Allowed on a button or link? | **No** | **Yes — it is the only interactive accent** |

**Consequence:** there is exactly one accent for interactive and semantic purposes — amber. This
is what prevents the flat-CTA-hierarchy failure mode. Cyan is atmosphere. If cyan ever marks a
call to action, the rule has been broken.

### 1.2 Tokens

```css
:root{
  /* ground */
  --lab:      #0E2A44;   /* page + scene background + fog. Never pure black. */
  --tile:     #1B4F73;   /* floor base */
  --tile-a:   #1E5A82;   /* chequer light square */
  --tile-b:   #174668;   /* chequer dark square */
  --wall:     #2A6E8C;   /* riveted steel panel */
  --panel:    #14395A;   /* machine bodies, bezels, racks */
  --scrim:    #081A2C;   /* copy scrim only — see §1.4 */

  /* light */
  --cyan:     #5FE3F0;   /* machine light. Atmosphere only. */
  --amber:    #F5B42C;   /* attention. The single accent. */

  /* ink */
  --bone:     #EAF2F7;   /* all prose, all captions, all headings */
  --bone-dim: rgba(234,242,247,.64);  /* metadata ONLY — see §1.3 */

  /* 3D-only, never in UI */
  --pink:     #F48FB1;   /* the ballet slippers on the entrance deck */
  --chrome:   #B4C3CC;
  --red:      #E23D3D;   /* lever knobs */
}
```

### 1.3 Measured contrast, and the rule it forces

Computed as WCAG relative luminance against the real grounds:

| Foreground | Ground | Ratio | AA body (4.5) | AA large (3.0) |
|---|---|---|---|---|
| `--bone` | `--lab` | **12.94** | pass | pass |
| `--bone-dim` | `--lab` | 6.16 | pass | pass |
| `--bone-dim` | `--tile` | **3.66** | **FAIL** | pass |
| `--amber` | `--lab` | 7.99 | pass | pass |
| `--cyan` | `--lab` | 9.58 | pass | pass |
| `--bone` | `--wall` | 5.00 | pass | pass |
| `--amber` | `--wall` | **3.09** | **FAIL** | pass |

The scene moves and its lights move with it, so text can end up over any of these grounds.
Measured against a blown-white worst case at the text column's far edge (~46vw), `--bone-dim`
scores **2.97** — below the bar — while `--bone` scores **6.24**.

> **Binding rule.** All prose, all captions, all headings, all metric labels use **`--bone`**.
> `--bone-dim` is for **metadata only** — the organisation line, the stack line, the footer —
> all of which sit in the first 30vw where the scrim measures .86 and `--bone-dim` scores 4.89.
> Dimmed body text is also a common generated-design tell. Do not reintroduce it.

### 1.4 The copy scrim is an accessibility component, not decoration

```css
.scrim{ position:fixed; inset:0; z-index:1; pointer-events:none;
  background:linear-gradient(100deg,
    rgba(8,26,44,.90) 0%, rgba(8,26,44,.86) 30%, rgba(8,26,44,.72) 46%,
    rgba(8,26,44,.40) 58%, transparent 68%); }
@media (max-width:760px){ .scrim{ background:linear-gradient(0deg,
    rgba(8,26,44,.93) 0%, rgba(8,26,44,.88) 46%, rgba(8,26,44,.5) 70%, transparent 92%); } }
```

Stops are derived, not eyeballed. Against a blown-white worst case: at 30% it holds `--bone` at
10.26, at 46% (the column's far edge) at 6.24, and large `--amber` at 3.85.

**Do not lighten it to show more of the scene.** It is the mechanism that keeps the page legible
when the camera passes a light, and it is this build's answer to the first failure mode in
`BUILD-INSTRUCTIONS.md` §2.6 — decorative layers destroying body-copy legibility.

---

## 2. Foundations — type

| Face | Weights | Role | Why this one |
|---|---|---|---|
| **Luckiest Guy** | 400 | The lab title on the giant screen; the `MJR` nav mark | A free face carrying the mid-century cartoon-title spirit. **It is not the show's lettering and must never be presented as it** (D14). |
| **Big Shoulders Display** | 700, 900 | All page headings, all metric figures | Tall, narrow, industrial. Holds enormous sizes without eating the column, which a scroll-driven page needs. |
| **Atkinson Hyperlegible** | 400, 700 | All body, captions, navigation, metadata | Designed by the Braille Institute specifically to disambiguate similar letterforms at low contrast. On a moving 3D ground that is a functional choice, not a decorative one. |

Two families do the work; the third appears only as the lab's own sign. Body and display are
clearly distinct, so no third "UI" face is needed.

### 2.1 Scale

Base 17px / 1.55. Display sizes are fluid because the page is a full-viewport experience.

| Token | Value | Use |
|---|---|---|
| `--t-hero` | `clamp(60px, 9.5vw, 140px)` | h1, once per page |
| `--t-h2` | `clamp(44px, 6.5vw, 96px)` | section headings |
| `--t-h3` | `clamp(34px, 4.2vw, 58px)` | case-study titles |
| `--t-metric-lead` | `clamp(72px, 10vw, 150px)` | the one figure leading a case study |
| `--t-metric` | `clamp(40px, 5vw, 72px)` | figures in the proof strip |
| `--t-lead` | `20px` | the sentence beside a lead metric |
| `--t-body` | `17px / 1.55` | prose |
| `--t-small` | `15px` | captions, nav |
| `--t-micro` | `13px` | metadata, footer |

Headings set `line-height:.9` and `text-wrap:balance`. Prose caps at **56ch**.

### 2.2 Typographic prohibitions

Carried from the design skill's list of generated-page tells, and binding here:

- No tracked-out ALL-CAPS eyebrow labels above headings.
- No accenting a single word inside a headline in a different colour or style.
- No `→` appended to link or button text.
- No middle-dot meta strings (`A · B · C`).
- No monospace face for data labels. Figures use Big Shoulders with `font-variant-numeric: tabular-nums`.

---

## 3. Foundations — space and grid

4px base. `--s1:4 --s2:8 --s3:12 --s4:16 --s5:24 --s6:32 --s7:48 --s8:64 --s9:96 --s10:128 --s11:192`

- Page gutter: **40px** desktop, **20px** ≤760px.
- Content max width: **1200px**. Prose column max **600px**.
- Case study: two columns, `minmax(280px,440px) 1fr`, gap `--s7`, aligned to `end`.
- Sections are `min-height:100vh`, vertically centred; on ≤760px they align to the bottom with
  `padding-bottom:12vh`, so copy sits over the strongest part of the mobile scrim.

**The grid is symmetric and deliberate.** The reference site's asymmetric grids read as accidents;
the two-column case layout here is a consistent, repeated structure, and every case study uses it
identically so the reader learns it once.

---

## 4. Components

### 4.1 Case study
The only repeated composite on the page. Left column: lead metric, title, organisation, prose,
stack. Right column: the architecture diagram. Same edges, same baselines, same order every time.

**It is not a card.** No border, no fill, no radius, no shadow. Separation comes from the 3D bay
it sits in and from whitespace. This is deliberate: identical rounded cards with one shadow
stamped on each is the generated-page default, and it would also fight the scene behind it.

### 4.2 Lead slot — two modes, one position

**The lead comes first and the project name second** — the content inversion carried from Phase 1
(`PLAN.md` §1.5). Only **2 of 5** case studies have a defensible figure, so the slot has two modes.
Hierarchy is carried by **position and `--amber`**, not by size.

| | **Figure mode** (§6 cases 3, 5) | **Phrase mode** (§6 cases 4, 6, 7) |
|---|---|---|
| Example | `10%` · `22,000 chunks` | "Bilingual Urdu and English" · "A shop with no database" |
| Size | `--t-metric-lead` `clamp(72px,10vw,150px)` | `--t-h3` `clamp(34px,4.2vw,58px)` |
| Sentence | beside it, baseline-aligned | **below it**, not beside |
| Align | `align-items: baseline` | `align-items: start` |

> **Why phrase mode is not simply the same type.** "Bilingual Urdu and English" is 26 characters.
> At 150px Big Shoulders 900 in a 440px column that is four-plus lines and ~510px tall,
> baseline-aligned against a one-line sentence — it reads as a bug, not a composition. The
> prototype only ever demonstrated the easy case (`10%`). Never an invented figure (D9).

### 4.3 Architecture diagram
Inline SVG. Stroke `--amber` at 1.1–1.2px on nodes and connectors; node fill `--lab`; labels
`--bone` at 13px, sentence case. Draws itself in on approach (§5.4).

These diagrams are the site's substitute for product screenshots, which D7 forbids. They are
original drawings of systems, contain no internal data, and are the reason the no-screenshot
constraint improves this design rather than limiting it.

### 4.4 Navigation
Fixed. `MJR` mark in Luckiest Guy, `--amber`, preceded by a 9px `--cyan` square with a matching
glow — the lab's power indicator. Links in `--bone` at 15px, underline on hover and focus with
`text-underline-offset:4px`.

### 4.5 Motion pause control
A persistent 34px circular button, always present, never hidden behind a menu. It sits **outside**
the `<nav>` landmark — a motion control is not navigation. `aria-pressed` reflects state; the label
swaps between "Pause motion" and "Resume motion". Focus ring `--amber`, 2px, 3px offset.

**Mechanism — and note what it must NOT do.** Pause freezes the **ambient clock only**:
```js
if (!paused) t += timer.getDelta();              // ambient motion stops
if (paused && camST) cam.u = camST.progress * 0.92;  // camera stays under the reader's hand
```
> **Never `gsap.globalTimeline.timeScale(0)`.** The camera is driven by a scrubbed tween, which
> lives on the global timeline — freezing it parks the camera in one bay while the copy scrolls on
> past it, so the scene becomes a still photograph of the wrong room for the rest of the page. The
> accessibility control would desynchronise the site for exactly the people who need it. **An
> earlier version of this spec specified that defect**; it was caught by the Phase 2.6 critique.

### 4.6 Focus
Every interactive element shows a visible `--amber` focus ring. The pause control and nav links
are reachable in DOM order. There is no focus trap anywhere on the page.

---

## 5. Motion specification

The named mechanisms. Versions are pinned: **GSAP 3.15.0**, **three.js 0.186.0**.

### 5.1 The inertia layer
```js
ScrollSmoother.create({ smooth: 1.3, effects: false, smoothTouch: 0.1 })
```
Not created at all under reduced motion. `effects:false` because no element uses `data-speed`;
all parallax is real camera movement in 3D, not layered 2D.

### 5.2 The camera — per-section triggers writing a shared `u`

The camera rides a `CatmullRomCurve3` through the lab. **It must NOT be driven by one linear tween
across the whole page.** Each section owns a ScrollTrigger that writes into a shared `u`:

```js
SECTIONS.forEach(({ id, uFrom, uTo }) => {
  ScrollTrigger.create({ trigger: `#${id}`, start: "top bottom", end: "bottom top",
    scrub: reduce ? true : 1.2,
    onUpdate: self => { cam.u = uFrom + (uTo - uFrom) * self.progress; } });
});
```

> **Why, and this is a correction.** An earlier version specified a single
> `gsap.to(cam, { u: 0.92 })` across `#smooth-content` while §6 assigned sections *unequal* `u`
> widths (12, 10, 14, 14, 14, 10, 10, 6, 4, 6) and §3 gave every section an *equal* `100vh`. A
> single linear tween cannot produce unequal widths from equal heights — camera and copy would
> drift apart by construction. Worse, §5.4 pins five case studies for `+=60%` each, adding three
> viewports of scroll per case with no `u` budget allocated, and the tween ended at `u:0.92` while
> §6 needs the camera to reach `1.00` for the alcove and the vault door. Per-section triggers make
> §6's table a real contract: each section's scroll range — **including its pin spacer** — maps to
> exactly its own `u` range, and the last section ends at `u = 1.00`.

Pinned sections must use `pinSpacing: true` so the spacer is part of that section's own trigger
range; otherwise the pin's extra scroll silently belongs to the next section.
- `ease:"none"` — the scrollbar is the easing; anything else fights the user's hand.
- `scrub: 1.2` — a 1.2s catch-up, which is what makes it feel filmed rather than dragged.
- **`scrub: true` under reduced motion, never `false`.** `false` makes ScrollTrigger play the
  tween to completion on enter, which parks the camera at the far end of the lab for the whole
  page. This was a real bug in v1–v4; do not reintroduce it.

**Look-ahead and banking:**
```js
curve.getPointAt(min(u + 0.06, 1), A); A.y -= 0.25; camera.lookAt(A);
curve.getTangentAt(min(u + 0.02, 1), T2);
bank += ((T2.x*F.t.z - T2.z*F.t.x) * 9 - bank) * 0.06;   // roll from real curvature, eased
camera.rotateZ(bank + sin(t*0.11)*0.004);
```
Idle drift is the sum of two unrelated frequencies (`0.17`+`0.09` lateral, `0.23`+`0.13` vertical)
so it never resolves into a loop a viewer can spot.

### 5.3 Section state — ScrollTrigger, no pinning on the corridor
```js
ScrollTrigger.create({ trigger: "#<section>", start: "top 60%",
  onEnter:     () => { /* raise this bay's activity */ },
  onLeaveBack: () => { /* restore the previous state */ } })
```
Every `onEnter` has a matching `onLeaveBack`. Scrolling up must return the scene to exactly the
state it had on the way down.

**The corridor itself is never pinned.** Pinning a scroll-driven corridor fights the camera scrub
and produces the dead, stuck feeling the reference site had. The one exception is §5.4.

### 5.4 The diagram draw-in — the only pin
Each case study pins for the length of its diagram reveal, then releases:
```js
gsap.timeline({ scrollTrigger: { trigger: "#case-n", start: "top 20%", end: "+=60%",
                                 pin: true, scrub: 1, anticipatePin: 1 } })
```
Stroke reveal via `stroke-dasharray` / `stroke-dashoffset`, `stagger: 0.12`, `ease:"power2.out"`,
`toggleActions:"play none none reverse"`. This is the "one room per item" pattern the research
identified in the award-winning sites: each case gets a held beat rather than sliding past.

### 5.5 The one orchestrated moment — the lab powers up (D16)
On load only, once:
```js
const boot = gsap.timeline({ delay: 0.35 });
ceiling.forEach((c, i) => { const at = i * 0.09;
  boot.to(c.l, { intensity: c.target*0.35, duration: 0.05 }, at)          // strike
      .to(c.l, { intensity: c.target*0.05, duration: 0.07 }, at + 0.05)   // stutter
      .to(c.l, { intensity: c.target,      duration: 0.45, ease:"power2.out" }, at + 0.12)
      .to(c.tube.material.color, { r:.624, g:.847, b:.906, duration: 0.5 }, at + 0.12); });
boot.to(power, { on: 1, duration: 1.5, ease: "power2.inOut" }, 0.7);      // the screen strikes
```
Total ≈ 2.2s. The strike-stutter-settle is what makes it read as fluorescent tubes rather than a
dimmer.

**Sections do not fade-and-slide in, and cards do not animate on hover.** That combination is the
clearest generated-design tell and it would compete with the boot sequence. The motion budget is
spent in one place; everything else is either ambient or directly scroll-driven.

### 5.6 Ambient motion (continuous, never attention-seeking)
| Element | Mechanism |
|---|---|
| Archive storage LEDs | Per-point phase, `sin(t*3.1 + phase) > 1 - activity*1.2`; `activity` raised by the retrieval section |
| Pipeline pulses | Custom `ShaderMaterial` on a `TubeGeometry`, `uHead` advanced per frame, exponential falloff trail |
| Bubbling tubes | `BufferAttribute` positions cycled upward per frame |
| Screen | Canvas redrawn per frame: scanlines, misconverged cyan ghost, tube vignette |
| Camera | §5.2 idle drift |

### 5.7 Timing and easing vocabulary
| Purpose | Duration | Ease |
|---|---|---|
| Scroll catch-up | 1.2s | (scrub) |
| Boot light settle | 0.45s | `power2.out` |
| Screen strike | 1.5s | `power2.inOut` |
| Diagram stroke | 0.9s, stagger 0.12 | `power2.out` |
| Vault door | 2.2s | `power3.inOut` |
| Scene state change | 0.6–0.8s | `power2.out` |

Nothing bounces, nothing overshoots. This is heavy machinery in a concrete room.

---

## 6. Section-by-section layout

Each section maps to a physical bay in the lab, so scroll position and narrative position are the
same thing. `u` is the camera's normalised position along the curve.

| # | Section | `u` | The bay | Leads with |
|---|---|---|---|---|
| 1 | Hero | 0.00–0.12 | Entrance deck, doorway behind, lab below | "Welcome to the lab." |
| 2 | Proof | 0.12–0.22 | Descending into the hall | **20 hrs/week**, each figure named to its system |
| 3 | Voice agent | 0.22–0.36 | The console | **10%** |
| 4 | Call centre QA | 0.36–0.50 | Transcription bench | **Bilingual Urdu and English** |
| 5 | AlphaLens | 0.50–0.64 | Archive racks | **22,000 chunks** — *stated as in progress, see D21* |
| 6 | Qurbani dashboard | 0.64–0.74 | Chart wall | **3 years, two calendars** |
| 7 | Shoe-shop receipts | 0.74–0.84 | Scanner bench | **A shop with no database** |
| 8 | Range | 0.84–0.90 | Capability wall | technical range |
| 9 | Teaching | 0.90–0.94 | Alcove | **50+ per batch** |
| 10 | Contact | 0.94–**1.00** | Vault door | "Ask me something." |

**The camera reaches `u = 1.00`, not 0.92.** Each range above is realised by that section's own
ScrollTrigger (§5.2), pin spacer included — not by a single tween across the page.

### 6.1 The four states, per section

| State | Behaviour |
|---|---|
| **Rest** | Copy fully visible and readable with no scrolling required. Bay lit at ambient level. Ambient motion continues. |
| **Entering** | `start:"top 60%"`. The bay's own activity rises (LEDs quicken, pulses brighten, lamp raises). Copy does **not** animate. |
| **Active** | Camera centred in the bay. For cases 3–7 the diagram draws in during the pin. |
| **Reduced** | Identical layout and identical content. Camera still follows scroll position (`scrub:true`). Boot sequence skipped — lab already on. Diagram pre-drawn. No flicker, no pulse, no bubbles. |

**Everything meant to be read is visible at rest**, without scrolling to trigger it. No section is
parked at `opacity:0` waiting on an observer.

### 6.2 Specific content bindings
- §3 leads **10%**, not the project name (`PLAN.md` §1.5).
- §4 has no defensible metric, so it leads with its distinctive fact. No invented figure (D9).
- §6 must **not** claim the 32% donation growth causally. Approved wording lives in
  `CONTENT.md` §9.1.
- §7 must **not** use the seasonal +20%. The lead is that the shop had no database at all
  (`CONTENT.md` §9.2).
- The phrase "validated on a labeled eval set" appears nowhere (D9).
- §5 (AlphaLens) **must say in its own copy that the system is still being built** (D21). Its
  corpus figures describe the dataset and are fine; the `~15 s` answer time is a design target and
  must never be written as measured. The word "measured" cannot appear in that section.

---

## 7. Performance budget

**Set before assets, as required.** Grounded in measurements of the locked prototype taken on
**Intel UHD Graphics 620** — deliberately weak integrated hardware, roughly a mid-range phone.

### 7.1 Measured today

| | Measured | Budget | Headroom |
|---|---|---|---|
| Draw calls (scene) | 212 | **≤ 260** | 48 |
| Draw calls (with composer) | 226 | **≤ 280** | 54 |
| Triangles | 43,532 | **≤ 65,000** | 21,468 |
| Shader programs | 32 | **≤ 40** | 8 |
| Lights | 15 | **≤ 16** | 1 |
| Cost per render @1024×768 dpr1 | **2.59 ms** | **≤ 8 ms @1080p** | — |
| JS + HTML uncompressed | 450 KB | **≤ 550 KB** | 100 KB |
| DOMContentLoaded | 196 ms | **≤ 600 ms** | — |

### 7.2 The hard limits

| Metric | Limit |
|---|---|
| **Total transfer, first load (brotli)** | **≤ 600 KB** including fonts |
| **Frame rate, desktop** | **60 fps** sustained |
| **Frame rate, mid-range Android** | **≥ 40 fps** sustained |
| **LCP on 4× throttled CPU** | **< 2.5 s** |
| **Text readable before WebGL initialises** | **always** — copy is DOM, never rendered into the canvas |
| **Console errors** | **zero** |

Because the scene is **fully procedural — no models, no downloaded textures, no HDRI** — this
build has no asset budget to blow. That is the single biggest performance decision on the project
and it was made by choosing this direction. Guard it: a downloaded model would need its own
justification against §7.2.

### 7.3 Where the weight actually is
`three.core.js` is 260 KB of the 450 KB uncompressed total. **Phase 3 must bundle and tree-shake
three.js (Vite), not load the full CDN module.** That alone should take the largest line item down
substantially. GSAP's three plugins total 46 KB and all three are used.

### 7.4 Lights are the real risk
15 lights in a forward renderer multiply per-light cost inside every lit material's shader. The
budget ceiling is 16. If a new bay needs a light, **retire one**, do not add. Emissive geometry
plus bloom is the cheap way to suggest a light source without paying for one.

### 7.5 Mobile — a decision, not a port
The corridor is **kept** on mobile, not replaced. A forward-moving camera down a tall narrow space
suits a 9:16 portrait viewport better than it suits landscape, so replacing it would throw away the
one thing that already works. What changes:

| Change | Reason |
|---|---|
| Bloom pass **off** below 760px | Largest single GPU cost; the scene still reads without it |
| `devicePixelRatio` capped at **1.5** | Retina phones otherwise render 4× the pixels |
| Ceiling lights **6 → 3** | §7.4 |
| Archive LEDs **1600 → 500**, ceiling stars **700 → 300** | Invisible at phone scale |
| Camera sits **lower and nearer the wall** | The space reads at 9:16 |
| Scrim flips to **bottom-up** | Copy sits at the bottom on mobile |
| `ScrollSmoother` `smoothTouch: 0.1` | Near-native touch scrolling; heavy smoothing feels broken on touch |

**This must be validated on a real mid-range Android in Phase 3**, not only in an emulator.
Blowing the budget is a stop-and-report event.

---

## 8. Accessibility — part of done, not a pass at the end

| Requirement | How it is met |
|---|---|
| Contrast | §1.3 measured; `--bone` everywhere that matters; scrim derived to hold AA over a worst case |
| Reduced motion | §6.1 "Reduced" column. A designed path, not a disabled one — the lab is simply already powered up |
| Persistent pause | §4.5. Always visible, not hidden in a menu. Required in addition to honouring `prefers-reduced-motion` |
| Keyboard | All interactive elements reachable in DOM order, visible `--amber` focus ring, no traps |
| Semantics | Real `<nav>`, `<main>`, `<section>`, one `<h1>`, ordered headings. The canvas is `aria-hidden` |
| Alt text | Every diagram carries a `role="img"` and an `aria-label` describing the actual pipeline |
| Scroll | **Native scrollbar is never replaced or hidden, and no custom scroll indicator is added.** The reference site put a custom indicator next to the native bar; that mistake is not repeated |
| No-JS | Copy is DOM and renders without WebGL. The page is readable if the canvas never initialises |

---

## 9. What this design deliberately does not do

Recorded so a later session does not add them back thinking they were forgotten:

- No decorative layer ever sits over body copy (§1.4).
- No cross-fade between sections where two are simultaneously half-readable.
- No custom scroll indicator beside the native scrollbar.
- No second call to action competing with the primary one — amber is the only interactive accent (§1.1).
- Metrics are never placed in a weak position; they **lead** (§4.2).
- No clickable element without a visible affordance.
- No asymmetric grid presented as composition (§3).
- No product screenshots — forbidden by D7 and replaced by original architecture diagrams (§4.3).

---

## 10. Phase 2.6 critique — every finding, and its disposition

An independent sub-agent reviewed this spec, `CONTENT.md` and the prototype against the seven
named failure modes and on its own terms. It returned **22 findings, 7 blocking**. Per
`BUILD-INSTRUCTIONS.md` §2.6 every one is either fixed here or explicitly accepted with a reason.
Nothing is quietly dropped.

### Fixed in this revision

| # | Finding | Disposition |
|---|---|---|
| 1 | Spec designs around content `CONTENT.md` said was permission-gated | **Not a violation — `CONTENT.md` §12 was stale.** D7 resolved permission at the Phase 1 gate (text, metrics, original diagrams; no screenshots; employer may be named) and that file was never updated. `CONTENT.md` §12 corrected to defer to `DECISIONS.md`. |
| 2 | No call to action anywhere; the email was plain text; two of three nav links pointed at the same section | Contact now has one primary `mailto:` CTA in `--amber` plus secondary GitHub and LinkedIn links. Nav reduced to two honest destinations. **"Resume" removed until a real PDF exists** — see §10.1. |
| 4 | The `u`-to-section map was arithmetically impossible | §5.2 rewritten: per-section ScrollTriggers writing a shared `u`, pin spacers inside their own section's range, camera reaches `1.00`. |
| 5 | The lead slot breaks for 3 of 5 case studies | §4.2 rewritten with two modes — figure and phrase — sharing one position and one colour. |
| 7 | The scrim protects the text column; nav, pause control and footer live past its 68% stop over the lit scene | Added top and bottom scrim **bands** sized to those elements at 100vw. Footer promoted to `--bone`. |
| 8 | The two-colour rule violated in the architecture diagram — cyan connectors with a 4px glow | Diagram strokes and nodes now `--amber`; drop-shadow removed. |
| 10 | In-page anchors broken under ScrollSmoother; mid-page landing replays the boot sequence | Anchor clicks intercepted through `smoother.scrollTo`; boot skipped when `scrollY > 0` and the lab set to powered directly. |
| 11 | Reduced motion still ran bubbles and a drifting, rolling camera | `updateBubbles` gated; drift and roll gated. |
| 12 | `composer.setSize` re-allocates the bloom mip chain at full resolution, so bloom silently cost 4x after any resize | `bloom.setSize()` called explicitly after `composer.setSize`. |
| 13 | Metrics in a weak position; hero carried no claim; the spec broke its own middle-dot rule in §6's table | §6 table corrected. Hero and proof-strip copy — see §10.1. |
| 15 | `aria-label` ignored on bare `span`/`div`; his name unannounced; pause button inside the nav list | Name is now a link with real visually-hidden text; `role="group"` on the metrics; pause moved outside `<nav>`. |
| 16 | `nav a { outline: none }` deleted the focus ring §4.6 mandates; `opacity:.85` reintroduced dimmed text | Both removed. Hover underlines, focus shows an `--amber` ring, text is full `--bone`. |
| 17 | The pause control desynchronised the page — the spec specified the defect | §4.5 rewritten with the correct mechanism and a warning about the wrong one. |

### Accepted, with a reason

| # | Finding | Why it stands |
|---|---|---|
| 6 | No doctype, `lang`, `charset` or **viewport** meta | **Correct for Phase 3 and recorded as a hard requirement in §10.2.** Not fixable in the prototype: it is published as an Artifact, which supplies its own doctype/head wrapper and rejects those tags. The consequence the finding names is real — without a viewport meta a phone renders at ~980px and **every mobile rule in §3 and §7.5 is dead code**. The mobile layout has therefore only ever been seen under emulation. |
| 9 | Budget measured on four sections and three bays, presented as headroom for ten | **Accepted as a real limitation.** §7.1's figures are honest for what exists, but six more bays at one light each breaches the 16-light ceiling with nothing to retire. §7 gains a per-bay allowance in §10.2 rather than a whole-site ceiling. Transmission (five glass tubes, two meshes each) forces a scene re-render and is the single most expensive thing in the build on integrated and mobile GPUs — **added to the §7.5 mobile retirement list**. |
| 14 | Diagram unreadable 760–1100px; its "13px" labels are viewBox units, not pixels | **Valid.** Breakpoint moves to **1080px** for the case grid, and diagram label sizing must be verified at the narrowest two-column width in Phase 3. Not fixed in the prototype, which has one case study. |
| 18 | No wayfinding on a ten-section page | **Agreed, and it does not conflict with §8.** The rule forbids duplicating the native scrollbar, not navigation. §4.4 gains a section list with `aria-current`, driven by the ScrollTriggers that already exist. Deferred to Phase 3 because the prototype has four sections. |
| 19 | The orchestrated moment is gated on a network font and can re-render mid-sequence | **Valid.** Phase 3: `Promise.race([document.fonts.ready, delay(800)])` before `boot`, and self-host and subset the faces. Luckiest Guy needs ~16 glyphs. Fonts also gain a line item in §7.1, which §7.2's "600 KB including fonts" currently lacks. |
| 20 | A WebGL failure leaves the pause button inert | **Valid, deferred.** Phase 3 wraps renderer construction in try/catch and hides `#stage` and the pause control on failure. Copy already survives — it is DOM. |
| 22 | Type-scale drift: `16px`/`14px` literals and an inline `style` standing in for `--t-h3` | **Valid.** Phase 3 implements §2.1 as real custom properties and adds a `.case-title` class. Prototype left as-is; it is a spike. |

### Escalated to the user — not mine to decide

| # | Finding | Why |
|---|---|---|
| 3 | The fan-service props (pink slippers, purple gloves, round glasses) read as recognisable trade dress, and the theme costs a hiring manager's scarce attention | The user asked for these props by name. The critique's argument is serious and is put to them in full; **the call is theirs.** See §10.1. |
| 21 | AlphaLens's README says "Phase 1 setup in progress" while §6 gives it a case slot stating figures as present-tense fact | Unresolved since Phase 1. **Blocks building §6 section 5.** See §10.1. |

### 10.1 Open questions that block Phase 3

1. **The props.** Keep or cut the slippers, purple gloves and round glasses. The machine room —
   racks that blink faster on the retrieval section, pipes that carry signal — is what earns the
   theme; the cartoon references spend it. The critique's view is that they read as building a
   professional identity out of someone else's IP. **User decides.**
2. **Is AlphaLens actually running?** If yes, update its README badge and measure real latency. If
   no, its case study must say so in its own copy. A reader who finds "Phase 1 setup in progress"
   after reading "measured, not promised" has found the one thing that undoes the rest of the page.
3. **Resume PDF.** "Resume" is removed from the nav until a real file exists.
4. **Hero claim.** The hero currently carries no number, company or role in a heading. Proposal:
   lead with **20 hrs/week**, naming the system. Needs the user's wording.

### 10.2 Amendments carried into Phase 3

- **Required in `index.html`:** doctype, `<html lang="en">`, `<meta charset>`, and
  `<meta name="viewport" content="width=device-width,initial-scale=1">`. Without the last one the
  entire mobile design is dead code.
- **Per-bay budget**, replacing a whole-site ceiling: **1 light**, **20 draw calls**,
  **5,000 triangles** per bay. Ten bays then fits inside §7.2 alongside the corridor's own cost.
- **Add transmission to the §7.5 mobile retirement list** — opaque emissive glass at phone scale.
- **Case grid breakpoint at 1080px**, not 760px.
- **Re-baseline §7.1** after the two heaviest remaining bays (chart wall, capability wall) are
  built, before the rest.
- **Derive scene state from `cam.u` on `ScrollTrigger.refresh()`**, not only from enter/leave
  callbacks, so a mid-page landing is consistent.
