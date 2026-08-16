# Capability Catalog

*A living answer to: "If we need to communicate X, what tools could render X beautifully?"*

Researched 2026-08. Facts marked **[verified]** were confirmed against live docs/pages in Aug 2026; items marked **[unverified]** are from training knowledge — re-check before depending on them.

**Cross-cutting MV3 constraint (see RESEARCH.md):** in the shipped extension, *all* library code must be bundled inside the extension package — MV3 forbids remotely hosted code, so "CDN availability" below matters for the **dev-time static artifacts** in `experiences/` (which are ordinary web pages and can load from CDNs) and for prototyping, not for the runtime. Bundle-size numbers therefore matter twice: page weight *and* extension package size. Prefer lazy `import()` of bundled chunks per experience.

---

## 0. Default stack (use before reaching for a library)

The platform got dramatically better in 2024–2026. Much of what needed GSAP/Lottie in 2020 is now native:

| Native feature | Status (verified Aug 2026) | Use for |
|---|---|---|
| **Web Animations API** (WAAPI) | Universal | Programmatic keyframe animation, runs off main thread for transform/opacity. Zero bytes. |
| **CSS scroll-driven animations** (`animation-timeline: scroll()` / `view()`) | **[verified]** Chrome/Edge 115+, Safari 26+, **Firefox 156+** — now cross-browser, ~85% global | Scroll-linked reveals, progress bars, parallax, scrollytelling — compositor-thread, zero JS. This is the workhorse for Kaleidoweb's scroll grammar. |
| **View Transitions API** (same-document) | **[verified]** Chrome 111+, Safari 18+, Firefox 133+ — cross-browser | Morphing between UI states (scene changes, expand-to-detail). Cross-document version is Chromium + Safari 18.2+; Firefox still flagged/partial — irrelevant for us (we're same-document). |
| **CSS anchor positioning** | **[verified]** all major browsers as of late 2025 (Interop 2025) | Tethering annotations/tooltips/labels to elements without JS positioning math. |
| `@starting-style`, `transition-behavior: allow-discrete` | Baseline 2024–25 [unverified exact versions] | Entry animations and animating `display`/`visibility` in pure CSS. |
| `text-wrap: balance` / `text-wrap: pretty` | **[verified]** broadly shipped; `pretty` the fastest-growing CSS feature per State of CSS 2025 | Headline balancing and paragraph orphan control — free typographic quality. |
| `linear()` easing | Baseline [unverified] | Spring/bounce easings in pure CSS (generate the stops). |
| CSS carousels (`::scroll-marker`, `::scroll-button()`) | **[verified]** shipped in Chromium, arriving elsewhere via Interop 2026 — treat as progressive enhancement | Native, accessible galleries/steppers with zero JS. |
| `popover` attribute + Popover API | Baseline 2024 [unverified] | Layered annotations, source-citation popups. |

**Verdict for Kaleidoweb:** the runtime baseline (vanilla TS + WAAPI + scroll-driven CSS + View Transitions) covers reveals, scroll choreography, and scene transitions with zero bundle cost. Libraries below are for what this can't do.

---

## 1. Motion / transitions (beyond native)

### GSAP 3 — the heavyweight champion, now free
- **[verified]** GSAP is **100% free for all users including every formerly-paid plugin** (SplitText, MorphSVG, ScrollTrigger, ScrollSmoother, DrawSVG, MotionPath…), funded by Webflow; the GSAP team works at Webflow.
- **[verified]** License is **not MIT/OSS** — it's the proprietary "Standard NoCharge License". Commercial use and bundling explicitly allowed; the only real restriction is building no-code animation tools that compete with Webflow, plus a no-reverse-engineering clause. **AI-generated code using GSAP is explicitly permitted** (directly relevant to us). Webflow can change terms prospectively.
- Size: core ~23–27 KB min+gz; ScrollTrigger ~13 KB; SplitText ~7 KB [unverified exact numbers].
- CDN: `cdn.jsdelivr.net/npm/gsap` / official CDN — fine for dev artifacts; must be bundled in extension.
- **Verdict:** the deepest toolbox — timelines, ScrollTrigger pinning/scrub, SplitText line/word/char animation, MorphSVG, DrawSVG. Use when choreography complexity exceeds WAAPI/CSS (pinned scenes, morphing, text FX). The non-OSS license is acceptable (bundling allowed) but note it in attribution.

### Motion (motion.dev, the successor to Framer Motion)
- **[verified]** MIT, v12.x, supports **vanilla JS**, React, Vue. Mini `animate()` is **~2.5 KB** (built on WAAPI); hybrid animate ~17–18 KB; full React `motion` component ~34 KB.
- Springs, timeline sequencing, `scroll()`/`inView()` helpers, layout animations (React).
- **Verdict:** best MIT-licensed choice when we want springs + a tiny footprint in vanilla TS. `animate` mini is nearly free. Prefer Motion over GSAP when the need is "nice tweens/springs", GSAP when the need is "orchestrated scroll scenes / SplitText / morphing".

### Lenis (smooth scroll)
- **[verified]** MIT, darkroom.engineering, <4 KB, the de-facto standard for momentum smooth scroll; Locomotive Scroll is now a wrapper around it. Pairs with GSAP ScrollTrigger. GSAP ScrollSmoother is a free alternative but ~26 KB.
- **Caution:** smooth-scroll hijacking conflicts with CSS scroll-driven animations less than it used to (Lenis keeps native scroll position), but it adds jank risk on low-end devices and harms accessibility if overdone. Respect `prefers-reduced-motion`.
- **Verdict:** optional garnish for specific art directions; never default. Our scroll grammar should work on native scroll.

### Text animation (SplitText alternatives)
- GSAP **SplitText is now free** [verified via GSAP licensing] — the best-in-class option (line/word/char splitting with resize handling, masking, accessibility-aware `aria` handling).
- Free/MIT alternatives: `splitting.js` (~2 KB, MIT, unmaintained but stable) [unverified]; hand-rolled `Range`/`Intl.Segmenter` splitting (`Intl.Segmenter` is baseline — correct grapheme/word splitting in vanilla JS, zero bytes) [unverified].
- **Verdict:** use SplitText since it's free now; `Intl.Segmenter` + WAAPI for minimal builds.

---

## 2. Show chronology (timelines)

- **No dominant "beautiful timeline" library exists** — this is a build-it-yourself space, which suits our "individually art-directed" mandate: a generic timeline widget is exactly the failure mode MISSION.md warns about.
- **Custom SVG/CSS timeline driven by d3-scale** (`scaleTime`, `scaleUtc` — ~10 KB with d3-array/d3-time, MIT): position events on any axis/curve/spiral; render however art direction dictates. **Recommended default.**
- **CSS scroll-driven animations** for "time passes as you scroll" (mission-clock-as-spine concepts) — zero bytes [verified support above].
- vis-timeline (MIT+Apache dual): functional zoom/pan timelines, but visually generic and heavy (~200 KB) [unverified]. Avoid for final experiences.
- Observable Plot can do quick dot/tick chronologies for dense event sets (see §6).
- **Verdict:** chronology = d3-scale + bespoke rendering + scroll-driven progression. Never ship a stock timeline widget.

## 3. Show geography (maps)

### MapLibre GL JS
- Open-source (BSD-3) WebGL vector-map renderer (Mapbox GL JS v1 fork), actively developed (v4/v5 era; globe view landed) [unverified version detail].
- **Style hosting without API keys — [verified]: OpenFreeMap** (openfreemap.org) serves full-planet vector tiles + styles (Positron, Bright, Liberty, Dark, Fiord, 3D) with **no registration, no API keys, no rate limits**, funded by donations. Usage: `style: 'https://tiles.openfreemap.org/styles/liberty'` (see their quick start).
- Also: `demotiles.maplibre.org/style.json` (low-detail demo style, fine for smoke tests) and **Protomaps PMTiles** — a single-file tile archive you can self-host or even bundle regionally; `pmtiles` JS adds a protocol handler for MapLibre [unverified details].
- Size: MapLibre ~230 KB min+gz [unverified] — heavy; load only for map scenes.
- **Extension caveat:** tiles are remote *data* (fine under MV3 — the ban is on remote *code*), fetched cross-origin — needs host permission or SW relay; style JSON + glyphs + sprites also remote.
- **Verdict:** use for genuinely interactive/zoomable geography. For most experiences prefer d3-geo (below) — more art-directable, smaller, no network dependency if we ship TopoJSON.

### d3-geo + TopoJSON — stylized custom maps
- MIT; d3-geo ~30 KB + topojson-client ~5 KB [unverified]. Dozens of projections (orthographic globes, Winkel tripel, azimuthal…), pure SVG/canvas output → fully themeable to match an experience's visual language.
- World atlas TopoJSON via CDN: `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json` (also 50m) [unverified but standard]. For the extension: bundle the TopoJSON (110m is ~700 KB raw, ~100 KB gz).
- Wikipedia gives us coordinates (infobox + `coordinates` in REST summary [verified]) → dots/arcs/routes on a bespoke projection.
- **Verdict:** **default geography tool.** A hand-styled orthographic globe with an animated great-circle route says "art-directed"; a stock street map says "template".

### deck.gl
- MIT, Uber/OpenJS; WebGL/WebGPU-accelerated large-scale data layers (arcs, hexbins, trips) over MapLibre. Heavy (~500 KB+) [unverified].
- **Verdict:** only for data-dense geographic stories (thousands of points/flows). Rare for Wikipedia subjects; skip by default.

## 4. Show quantity / comparison (charts)

### Observable Plot
- MIT, ~2xx KB with its d3 deps [unverified]; concise grammar-of-graphics on top of d3; excellent defaults, SVG output that is **fully restylable with CSS** — good fit for per-experience theming.
- **Verdict:** fastest route from Content Model quantities → correct, elegant marks; theme it per experience. Good default for "show quantity".

### D3 v7 (à la carte)
- MIT; the point in 2026 is **not** `d3.select` charts — it's the utility modules: `d3-scale`, `d3-array`, `d3-shape` (line/area/arc generators), `d3-interpolate`, `d3-force`, `d3-geo`, `d3-hierarchy`. Import individually (a few KB each) and render with our own SVG/canvas code.
- **Verdict:** the backbone of all bespoke visualization in Kaleidoweb. Charts that must feel one-of-a-kind get hand-built with d3 modules + WAAPI.

### ECharts
- **[verified]** Apache-2.0; **ECharts 6.0 shipped 2025** — 12 headline features: chord charts, beeswarm, axis break, matrix coordinate system, design-token theme system, dynamic dark mode, reusable custom series.
- Size: ~350 KB+ min+gz full [unverified]; canvas renderer; looks like ECharts unless heavily themed.
- **Verdict:** powerful but stylistically assertive and heavy. Use only when a chart type would be expensive to hand-build (chord, complex stock/candlestick). Prefer Plot/d3.
- visx (Airbnb, MIT): React-only low-level chart primitives — **not applicable** (we're vanilla TS).

## 5. Show relationships (graphs/networks)

- **d3-force** (MIT, ~8 KB): force simulation, render yourself in SVG/canvas — fully art-directable, fine up to ~1–2k nodes. **Default.**
- **sigma.js v3** (MIT, WebGL) + graphology: for thousands of nodes with pan/zoom [unverified version]. Rarely needed for a Wikipedia subject.
- **d3-hierarchy** (tree, cluster, pack, treemap, partition/icicle, sunburst): family trees, taxonomies, org structures — highly styleable.
- Cosmograph / cosmos (GPU force layout) exists for 100k+ nodes [unverified licensing — check before use].
- **Verdict:** d3-force + bespoke rendering; d3-hierarchy for trees/taxonomies. Avoid stock graph widgets (Cytoscape default styling reads "tool", not "experience").

## 6. Show mechanism / flow / process

- **SVG + d3-shape + WAAPI/GSAP**: diagrams as hand-authored (LLM-authored) SVG with animated `stroke-dashoffset` line drawing (or GSAP DrawSVG, now free), staged reveals, `<marker>` arrows. This is the primary tool — mechanism diagrams *are* the bespoke code the Experience Spec should emit.
- **Sankey/flow**: `d3-sankey` (MIT, tiny) for quantified flows.
- **MorphSVG (GSAP, free)** or **flubber** (MIT) [unverified] for shape-to-shape morphing ("stage 1 → stage 2").
- **CSS `offset-path`** (motion along a path, baseline) for particles/vehicles moving through a system — zero JS.
- **Verdict:** no library "does" mechanism; the capability is SVG craft + line-drawing + staged animation. Invest in reusable primitives (draw-on, flow-particles, staged-reveal) in our own runtime.

## 7. Show scale ("how big/far/old is it?")

- Scale is a *composition* problem: log-scale ladders (d3-scale `scaleLog`/`scaleSymlog`), zoom-out sequences (nested scenes with View Transitions or a single SVG with animated `viewBox` — animating `viewBox` via WAAPI is cheap and dramatic), unit-comparison silhouettes (SVG icons repeated n times), scroll-as-distance (1 px = X km, using scroll-driven animations).
- **Verdict:** own-code + d3-scale + scroll. This is a signature Kaleidoweb move — worth building as a first-class primitive family.

## 8. Imagery display

- Sources: Wikimedia Commons via the media-list endpoint's ready-made `srcset` (see RESEARCH.md — no URL construction needed) **[verified]**.
- Techniques (all zero-dependency):
  - `object-view-box`/`object-position` + slow transform = Ken Burns.
  - **`clip-path` animation** (animatable `path()`/`polygon()`/`inset()` interpolation) for editorial image reveals; `shape()` function is newly available in Chromium [unverified].
  - **SVG filters** on images: duotone via `feColorMatrix`/`feComponentTransfer`, grain via `feTurbulence`, displacement via `feDisplacementMap` — this is how you make heterogeneous Commons images feel like one art-directed set. Cheap, GPU-composited in most cases; test perf on large images.
  - `mix-blend-mode`/`backdrop-filter` for type-over-image treatments.
  - `<canvas>` for pixel-level treatments (halftone, palette extraction for theming the experience from the lead image).
- **Verdict:** an "image treatment" module (duotone/grain/reveal presets parameterized by the experience's palette) is high-leverage for making experiences feel coherent and bespoke.

## 9. Pre-authored motion: Lottie / Rive

- **lottie-web**: MIT, but player is ~250 KB [unverified]; `@dotlottie/player` smaller. Requires pre-authored After Effects/Lottie assets — we generate experiences, we don't have an asset pipeline.
- **Rive**: runtimes open-source (MIT) [unverified], .riv files tiny, state machines. Same problem: assets must be authored in the Rive editor.
- **Verdict:** **skip both.** Kaleidoweb's motion must be generated per-subject; pre-authored asset players don't fit the pipeline. Canvas particle systems (own code, ~100 lines) and SVG/WAAPI cover the same ground generatively.

## 10. 3D / WebGL / WebGPU

- **Three.js**: **[verified]** current release r184+ (Apr 2026); **WebGPURenderer is the recommended renderer since r182** (Dec 2025), with automatic WebGL 2 fallback; **TSL** (Three Shading Language — JS node-based shaders compiling to WGSL *and* GLSL) is stable. MIT. Core ~150–170 KB min+gz [unverified]; tree-shakeable-ish.
- **WebGPU status [verified]:** cross-browser as of Jan 2026 — Chrome 113+, Firefox 141 (Windows)/145 (Apple-Silicon macOS)/147+, Safari 26 (macOS Tahoe/iOS/iPadOS/visionOS 26); Firefox Linux expected during 2026. ~70% of users; always keep the WebGL fallback (Three does this automatically).
- Raw shaders without Three: small hand-rolled WebGL for one full-screen fragment shader (~2 KB of helper code) is often better than importing Three for a background effect.
- **When 3D is worth it:** the subject is *inherently spatial* — spacecraft, anatomy, architecture, molecules, planets/orbits, terrain. Then real 3D (orbit a model, animated camera) earns its cost.
- **When to fake it:** depth cues only — CSS `perspective` + `transform-style: preserve-3d` (cards, parallax stacks, simple orthographic "3D" in SVG with manual projection). Costs zero bytes, no WebGL context, no asset problem.
- **Asset problem:** we have no per-subject 3D models. Feasible 3D is therefore procedural (orbits, starfields, extruded d3-geo globes, data sculptures), not modeled. That constrains but doesn't eliminate 3D.
- **Verdict:** Three.js (WebGPU renderer + WebGL fallback) as an opt-in heavy module for the handful of subjects where procedural 3D is the *right* interpretation; CSS 3D transforms for everything that just needs depth.

## 11. Typography

### Variable fonts — free, self-hostable (all SIL OFL, bundle as WOFF2 inside the extension)
All available via Google Fonts / github; OFL licensing is settled knowledge [unverified only in the sense of not re-fetched]:

| Font | Axes | Personality |
|---|---|---|
| **Fraunces** | wght, opsz, SOFT, WONK | Expressive display serif; opsz+WONK give enormous art-direction range from one file |
| **Newsreader** | wght, opsz, ital | Editorial text serif, beautiful at small opsz |
| **Source Serif 4** | wght, opsz | Workhorse serif |
| **Instrument Serif** | (static, single weight) | Fashionable display serif — use sparingly |
| **Inter / InterVariable** | wght, opsz (v4) | Neutral UI sans |
| **Space Grotesk** | wght | Techy/retro-futurist sans |
| **IBM Plex Sans/Serif/Mono** | wght (variable versions) | Systematic, engineered voice |
| Also worth having: **Literata** (long-form serif), **Bricolage Grotesque** (wght, opsz, WDTH — loud display sans), **JetBrains Mono / Commit Mono** (code/data) | | |

- Strategy: ship ~6–8 curated variable families in the extension (~40–90 KB WOFF2 each, subset them); the art-direction pass *chooses and tunes* (weight/opsz/width axes + palette) rather than fetching arbitrary fonts. Remote font fetching from Google Fonts at runtime is possible (remote data, not code) but adds latency and a tracking concern — prefer bundling.
- **Fluid type scales:** pure CSS — `clamp()` + `cqi`/container queries; generate the scale (minor third → perfect fourth etc.) in the visual-language pass. Zero dependencies.
- **Details that read as craft:** `font-variant-numeric: oldstyle-nums/tabular-nums`, `font-feature-settings` (ligatures, small caps via `font-variant-caps`), `hanging-punctuation` (Safari), `text-wrap: balance/pretty` [verified], `initial-letter` for drop caps (Safari/Chromium) [unverified support detail], `::first-line`, `hyphens: auto`.
- **Text animation:** see §1 — SplitText (free) or `Intl.Segmenter` + WAAPI.

## 12. Genuinely new / strange / worth knowing (2025–2026)

- **CSS scroll-driven animations went cross-browser** (Firefox 156, Safari 26) — the single most consequential fact for us: scrollytelling no longer requires a JS library. **[verified]**
- **WebGPU became baseline** (Jan 2026) + **Three.js TSL** — procedural shader visuals with one codebase across WGSL/GLSL. **[verified]**
- **ECharts 6** matrix coordinate system + design-token theming — signals the charting world moving toward themeable-by-token, which matches our visual-language pass. **[verified]**
- **CSS carousels** (`::scroll-marker`, `::scroll-button()`), **anchor positioning**, `@scope`, typed `attr()`, `if()` — Interop 2026 targets; progressively enhance. **[verified at headline level]**
- **`Intl.Segmenter`** everywhere — robust text splitting without a library. [unverified]
- **Defuddle** (2025, by Obsidian's developer) — modern Readability alternative; see RESEARCH.md §Content extraction. **[verified]**
- **OpenFreeMap** — keyless, unlimited, free vector tile hosting; removed the last excuse for API-key map plumbing. **[verified]**
- **Speculation/possibility to watch:** `moveBefore()` DOM state-preserving reparenting (Chromium) for reorganizing the page without losing iframe/video state [unverified]; WebGPU compute for particle systems at 10⁶ scale.

---

## Recommended tiers (bundle strategy)

1. **Tier 0 — always shipped (≈0 KB JS):** CSS scroll-driven animations, WAAPI, View Transitions, anchor positioning, fluid type, variable fonts, SVG filters/clip-path, CSS 3D transforms.
2. **Tier 1 — small always-available utilities (≈20–40 KB total):** d3-scale/array/shape/interpolate, Motion mini `animate`, own primitives (draw-on SVG, particles, image treatments, scale-ladder).
3. **Tier 2 — per-need lazy chunks:** GSAP+ScrollTrigger+SplitText (choreography-heavy concepts), d3-geo+TopoJSON (geography), d3-force/hierarchy (relationships), Observable Plot (quantities), d3-sankey (flows).
4. **Tier 3 — heavy, rare, explicit opt-in by art direction:** Three.js (WebGPU/WebGL), MapLibre+OpenFreeMap, ECharts, deck.gl.
