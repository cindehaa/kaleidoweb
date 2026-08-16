# Inspiration Library

Studied live, August 2026. Every entry below was either rendered in Chromium at 1440×900 and looked at, or (where noted) blocked and studied through primary making-of documentation instead. Screenshots live in `screenshots/references/`.

Measurements marked **[measured]** were pulled out of the live DOM via `getComputedStyle`, not estimated from pixels.

**How to use this file:** each entry ends with *Transferable to Kaleidoweb* — concrete, implementable moves. Do not copy any of these visual identities. The point is the reasoning that produced them.

---

## A. Product launch / large catalogue of discrete items

The hardest information-design problem in this category: 150 unrelated small facts that must not read as 150 cards.

### A1. Shopify Editions — Spring '26 "Everywhere"
- **URL:** https://www.shopify.com/editions/spring2026 (index: https://www.shopify.com/editions)
- **Screenshots:** `shopify-editions-s26-01-hero-type-enacts-concept.png`, `-02-density-flip-list-to-plate.png`, `-03-artifact-staged-in-atmosphere.png`, `-04-section-plate-left-aligned.png`
- **What it is:** A ~39,000px single-page microsite announcing 150+ product updates across 10 categories (Agentic, Sidekick, Online, Retail, Marketing, Operations, Shop app, Payments, Finance, Developer).

**What's exceptional**

1. **The type enacts the concept.** The edition is called "Everywhere." The hero sets the word "Everywhere" once upright and centre, then again rotated/mirrored at the left and right edges — the word is literally everywhere in the frame. The theme is not stated and then illustrated; the typesetting *is* the argument. This is the single most transferable idea on the page.
2. **No cards. Anywhere.** 150 items are presented as a 3-column grid of `underlined link heading + one grey sentence`, separated by 1px hairline rules. There is no container, no border, no shadow, no radius on any content region. **[measured]** only three large-area background colours exist on the whole page: `rgb(9,9,9)`, `rgb(255,255,255)`, and a 4%-white overlay. Border-radius appears only on *controls* (pill buttons, 4px/8px chips) — never on content.
3. **Violent density alternation as the pacing engine.** The page metronome is: near-black plate of dense 3-column micro-text (very high information density, ~15 items per screen) → immediately a full-bleed saturated image plate carrying one word at 120px and nothing else (density ≈ 1 word per screen). The ratio between adjacent screens is roughly 100:1 in glyph count. That contrast, not animation, is what makes the scroll feel composed.
4. **One generative motif, parameterised per section.** The same particle-dissolved photograph (trees, blossom, sky) is reused for every section plate, recoloured into a different chromatic world each time — spring purple/pink for the hero, blue/gold for "Online", green/aurora for "Operations". Coherence and variety come from *one system re-parameterised*, not from ten different treatments.
5. **Section titles are left-aligned and low, not centred.** "Finance", "Online" sit at x≈118px with the baseline about ⅔ down the plate. Nothing is centred except the persistent nav pill.
6. **Artifacts are staged in the atmosphere, not framed in a card.** Product UI screenshots float inside the atmospheric image plate with a soft shadow. The image is the environment; the artifact is the subject. A card would have flattened both.
7. **A persistent floating pill at bottom-centre reports which section you are in**, and its label *animates through the letters* while you scroll between sections (caught mid-transition reading "rations" between "Operations"). Wayfinding is the only thing allowed to animate continuously.

**Measured typography [measured]**

| role | family | size | line-height | tracking |
|---|---|---|---|---|
| section display (H2) | National 2 | 120px | 115.2px (0.96) | −9.6px (−0.08em) |
| feature headline (H3) | National 2 | 64px | 61.4px (0.96) | −2.56px (−0.04em) |
| statement | Shopify Inter | 40px | 36.8px (0.92) | −1.2px (−0.03em) |
| lede | Shopify Inter | 24px | 26.4px (1.10) | −0.72px (−0.03em) |
| nav / link | Shopify Inter | 16px | 17.6px (1.10) | −0.48px (−0.03em) |
| body / caption | National 2 | 14px | 21px (1.50) | normal |

Two families only. Display **and** micro-text share one face (National 2); the middle band is the other (Shopify Inter). Display:body ratio = **8.6×**. Scale steps are deliberately uneven: 14 → 16 (1.14×) → 24 (1.5×) → 40 (1.67×) → 64 (1.6×) → 120 (1.88×) — small increments at the bottom where legibility differences matter, huge leaps at the top where drama matters.

**Transferable to Kaleidoweb**
- Derive one generative visual motif from the subject, then recolour/reparameterise it per section rather than inventing a new treatment per section.
- Make the density ratio between adjacent screens explicit and extreme (target ≥20:1 in glyph count at least twice per experience).
- Ban border-radius on content regions; reserve it for interactive controls. This alone kills the "shadcn card collection" failure mode.
- Let the title typography *perform* the subject's central property. Ask: "if this subject were a verb, what would the type do?"
- Persistent contextual position indicator; it is the only always-on motion.

### A2. Linear
- **URL:** https://linear.app/
- **Screenshot:** `linear-01-product-as-primary-evidence.png`
- **What's exceptional:** The hero headline ("The product development system for teams and agents") is flush-left at the page margin (x=80px), ~72px, leading ≈1.05, on pure black. Below it, an *asymmetric single row*: descriptive subhead at 16px grey on the left, a right-aligned "New — Coding Sessions →" link on the right. One row, two unrelated jobs, full width, no centring, no filler. Then the product screenshot occupies roughly 60% of the viewport height. The words are the caption; the evidence is the hero.
- **Transferable:** when there is a single artifact that *is* the subject, give it the majority of the pixels and demote the prose to caption scale. Use asymmetric two-item rows to fill width without centring or inventing filler.

---

## B. Mechanism / how-something-works

### B1. Bartosz Ciechanowski — Gears (and Mechanical Watch)
- **URLs:** https://ciechanow.ski/gears/ , https://ciechanow.ski/mechanical-watch/ , index https://ciechanow.ski/archives/
- **Screenshots:** `ciechanowski-gears-01-diagram-as-paragraph.png`, `ciechanowski-gears-02-abstraction-strip-down.png`
- **What it is:** The reference standard for explaining physical mechanisms. ~33,000px of prose interleaved with dozens of live, draggable, pausable diagrams.

**What's exceptional**

1. **The diagram is a paragraph.** Text, equations and interactive canvases all share exactly one column width (~700px). No diagram is full-bleed, no diagram is in a sidebar, no diagram is in a card. The reader's eye never has to re-acquire a new measure. This is the opposite of the "hero graphic" instinct and it is why the piece reads as a continuous argument.
2. **The visualisation loses fidelity as the concept becomes more abstract.** When discussing meshing, the gears have teeth. When the discussion moves to pitch radius and torque ratio, the teeth vanish and the same two gears become two bare outlined circles — same position, same colours, less detail. The diagram shows *only the abstraction currently under discussion* and morphs between representations. Detail is removed to make a point, not added to impress.
3. **Colour is a variable name.** Yellow is the driver/input throughout the entire article; green is the driven/output. Because the mapping never changes, the reader can read a new diagram before reading its caption.
4. **A motion contract.** Every animated diagram carries an identical pause button at the same position (bottom-left of its canvas), plus a global pause link in the prose. The reader can always stop time. Motion is never something that happens *to* the reader.
5. **Prose explicitly cross-references the diagram** — "controlled by the slider in the simulation above", "In the simulation below you can witness…". The two media are one argument, not parallel tracks.
6. **The heading is quieter than the body.** **[measured]** H1 "Gears" is `rgb(83,83,83)`; body text is `rgb(68,68,68)` — the title is *lower contrast* than the prose. Hierarchy is achieved with size alone, and the running text is given the strongest contrast because it is what you actually spend time in.
7. **Mathematics is set larger than prose.** **[measured]** body 19.2px/1.6; displayed equations 22.72px/1.8 (1.18× body). Formulas get room to breathe rather than being shrunk into a footnote.
8. **Structure follows the causal chain of the object.** Mechanical Watch's sections are Power → Gears → Escapement → Balance → Mainplate → Click → Motion Works → Date → Keyless Works → Automatic Winding → The Size of It All. That is the energy path through the watch, not a generic outline. The last section before the outro rescales everything to human size — a deliberate zoom-out coda.
9. Diagrams recur **with progressive complexity**: a mechanism is shown isolated, then re-shown embedded in the larger assembly. Repetition with accumulation.

**Measured typography [measured]:** IBM Plex Sans body 19.2px / 30.72px (1.60) / normal tracking / `#444`. Inter for headings, 38.4px/600. Two families, one for reading, one for labelling. Link colours are semantic: blue `rgb(1,129,235)` for navigation, amber `rgb(202,152,57)` for links that *change the page state* (e.g. "globally pause").

**Transferable to Kaleidoweb**
- For any mechanism subject, the section order must be the causal/energy chain of the mechanism itself.
- Keep diagram and prose at the same measure. Resist full-bleed for explanatory diagrams.
- Assign each entity a colour once and never reassign it for the whole experience.
- Every animated element gets a pause affordance in a consistent position.
- Represent the abstraction under discussion and *nothing else*; morph between representations as the argument moves.
- Give a different link colour to "this link changes the page" vs "this link takes you away".

### B2. Distill — Curve Detectors
- **URL:** https://distill.pub/2020/circuits/curve-detectors/
- **Screenshot:** `distill-curves-01-figure-breakout-inline-evidence.png`
- **What's exceptional:**
  - **Two measures, one grid.** Prose is a ~700px column starting at x≈368. Figures break out to ~1100px, bounded above and below by hairline rules with a small grey caption *inside* the figure zone. The reader always knows whether they are in "argument" or "evidence" mode because the width tells them.
  - **Inline micro-evidence at x-height.** Tiny image thumbnails are set *inside running sentences* next to the neuron IDs they refer to. The evidence appears at the exact word that names it, so the reader never loses their place. This is a much better default than "figure below".
  - The prose is self-critical in the open ("It's not clear that probability density is really the right way to think about…"), which is a *truth-preservation* pattern: showing the limits of the evidence inside the narration.
- **Transferable:** define exactly two content widths — argument width and evidence width — and let width alone signal mode. Inline miniature evidence at x-height for entity references (perfect for Wikipedia's dense entity links).

---

## C. Data narrative

### C1. The Pudding — "Comparisons as Predictable as the Sunrise" (similes)
- **URL:** https://pudding.cool/2026/05/similes/
- **Screenshots:** `pudding-similes-01-title-teaches-the-schema.png`, `pudding-similes-02-wide-chart-narrow-prose.png`
- **What's exceptional:**
  1. **The headline teaches the data schema.** The title is itself a simile — "Comparisons as **Predictable** as **the Sunrise**" — with the two variable slots set in teal and purple, underlined. Those two colours are then the encoding for *ground* (adjective) and *vehicle* (noun) for the rest of the piece. By the time you meet the first chart you already know the legend, and you were never shown a legend.
  2. **Section headings are the schema with blanks.** "As __ as a **Cat**" — the heading is a form to be filled, so every section is visibly an instance of the same structure.
  3. **Prose measure ~560px; chart axis runs the full 1440px.** Charts and prose deliberately do not share a width. The wide axis functions as a horizon line the narrow prose hangs beneath.
  4. **Serif for prose, sans for data furniture.** Axis labels are small uppercase letterspaced sans ("PREDICTABILITY SCORE / SIMPSON'S DIVERSITY INDEX"); everything narrated is serif. Voice is encoded in the typeface: humans speak serif, instruments speak sans.
  5. **Hand-drawn line illustration bleeding outside the measure.** The cat and the open book sit *outside* the text column and bleed off the frame, so they decorate without interrupting a single line of reading.
  6. **Asks the reader to commit before revealing.** "My mouth has gone as dry as ___" with an input, before showing what the corpus actually says. Prediction-then-reveal converts a statistic into a personal result.
- **Transferable:** encode the subject's schema in the title using colour, then never re-explain it. Make the reader guess before the reveal wherever a distribution is surprising. Prose and evidence get different measures. Serif=narration / sans=instrumentation is a cheap, legible voice split.

### C2. The Pudding's own structural doctrine
- **URL:** https://www.storybench.org/pudding-structures-stories-visual-essays/
- Co-founder Russell Goldenberg: story shape is derived from **the shape of the data**. "Making It Big" is V-shaped — 7,000 dots, narrowing to 11 bands at the point of the V, then expanding again. The microbrew piece is an inverted-V — local → national → state-level. They explicitly reject a fixed narrative template.
- Ilia Blinderman: "data has to really speak and be able to provide a conclusion."
- **Transferable:** this is the closest thing in the industry to Kaleidoweb's core thesis, stated by practitioners. The generation pipeline should first compute a *shape* for the subject (converging, diverging, cyclical, branching, layered, sequential) and let that shape decide section count and density curve — not the other way around.

---

## D. Artifact / imagery / archive

### D1. The Pudding — Restaurant menu archive
- **URLs:** https://pudding.cool/2026/06/menu-collection/ , https://pudding.cool/2026/06/menu-story/
- **Screenshot:** `pudding-menus-01-artifact-as-interface-horizontal.png`
- **What's exceptional:**
  1. **The navigation axis changes to match the artifact.** Menus are read as sheets, so the piece is navigated **horizontally** ("swipe right to continue -->", plus keyboard arrows) rather than vertically scrolled. The gesture matches the object.
  2. **Artifacts are shown at full physical scale with their damage intact** — foxing, stains, folds, the paper's actual cream. They are not cropped into thumbnails or normalised into a grid. Scans are fanned and overlapped like a physical pile, at slight rotations.
  3. **The page ground is taken from the artifact** (paper cream), so the artifact is not floating on an alien white.
  4. **Two voices, two typefaces:** the editorial question is serif on a tinted card ("What do America's earliest restaurant menus teach us about America?"); the machine instruction is monospace ("swipe right to continue"). System voice and author voice are typographically separated.
- **Transferable:** for Wikipedia subjects whose core is a collection of images/artifacts (paintings, manuscripts, specimens, coins, posters), change the navigation axis, keep the artifact's texture and imperfection, derive the page ground from the artifact, and separate system-voice from author-voice by typeface.

### D2. Stripe Press
- **URL:** https://press.stripe.com/
- **Screenshot:** `stripe-press-01-artifact-is-the-navigation.png`
- **What's exceptional:** The landing view is a stack of 3D book spines seen from slightly above, floating in near-black, with *no headings, no descriptions, no cards*. The spine already carries author and title — so no chrome is added. The left rail is a scrollbar drawn as a miniature of the stack: the wayfinding is a scale model of the content's physical structure. Only one other affordance exists on screen: a "?" at bottom-left. Then, further down, the environment inverts completely to white with a serif essay at ~26px on a ~735px measure. The register change from "object gallery" to "reading room" is total.
- **Transferable:** when an object already carries its own label, do not add a caption. Build the progress indicator as a *miniature of the actual content structure* rather than a generic bar. Allow one total environmental inversion per experience (dark object space → light reading space) as a structural beat.

---

## E. Chronology

### E1. NYT — "Snow Fall: The Avalanche at Tunnel Creek" (2012) and its lineage
- **URL:** https://www.nytimes.com/projects/2012/snow-fall/ — **BLOCKED.** nytimes.com returns 403 to headless Chromium and refuses WebFetch. Studied instead via the team's own making-of: https://source.opennews.org/articles/how-we-made-snow-fall/
- **What the makers said (primary source, quoted):**
  - Steve Duenes: the goal was "a single story out of all the assets, including the text" — "a different kind of reading". Not text with media bolted on.
  - Graham Roberts on visuals that must interrupt reading: make them "feel like a natural continuation", chosen colours and "fluid movements" so readers "feel that they were reading into the graphic, and not see it as a distraction."
  - **Animation duration is chosen by narrative function, not by taste.** The airbag animation was made deliberately *quick* so it would not attract disproportionate attention; the Cascades flyover was made deliberately *slow* so the reader could absorb the geography; the mountain-path animation is scroll-synchronised so the reader controls the pace.
  - Catherine Spangler: "editing, editing, editing" — the test for every asset was whether it *added value*, not whether it existed.
  - Andrew Kueneman: the "more flashy, loud, or visually spectacular" transitions were deliberately toned down or removed to prevent reader fatigue.
- **Transferable:** this is the best available articulation of *motion duration as a semantic choice*. Codify it: fast = "note this and move on"; slow = "absorb this space"; scroll-bound = "you set the pace". And the removal test — an asset must add value, not merely exist — maps directly onto Kaleidoweb's restraint criterion.

### E2. Shopify Editions index
- **URL:** https://www.shopify.com/editions
- A chronology of nine editions (Spring '26 *Everywhere*, Winter '26 *Renaissance*, Summer '25 *Horizons*, Winter '25 *Boring*, Summer '24 *Unified*, Winter '24 *Foundations*, Summer '23 *Imagine My Business*, Winter '23 *Built to Last*, Summer '22 *Connect to Consumer*), each reduced to `season + year + one codename`. A timeline where each entry is **two words**, because the detail lives one click away.
- **Transferable:** a chronology's index should be radically compressed — a date and a name — with density deferred to the entry. Timelines fail when they try to carry the content.

---

## F. Geography

### F1. The Pudding — Happy Map
- **URL:** https://pudding.cool/2026/02/happy-map/
- **Screenshot:** `pudding-happymap-01-data-as-inhabited-terrain.png`
- **What's exceptional:** An abstract emotional-data space is rendered as a **low-poly illustrated terrain** — coastline, hills, dotted trails, water — populated by individually drawn human figures, one per respondent. The reader is given a body in the space (a distinct figure, centre frame). The only chrome is "Start ⏎" and, crucially, "**Skip story**" — an explicit escape hatch from the guided narrative into free exploration.
- **Transferable:** for distributional data with many individual records, an inhabited landscape reads better than a scatterplot because it gives each record a *character* and the reader a *position*. And always offer "skip the tour, let me roam" — the guided path and the free-explore mode should coexist rather than compete.

---

## G. Explorable / simulation

### G1. Nicky Case — The Evolution of Trust
- **URL:** https://ncase.me/trust/
- **Screenshot:** `ncase-trust-01-play-not-read.png`
- **What's exceptional:**
  1. **The button says PLAY, not READ or START.** The verb sets the reader's posture before any content loads. An explorable that says "read" gets read; one that says "play" gets played with.
  2. **"playing time: 30 min" is stated up front**, in tiny grey type under the title. A duration contract. The reader knows what they are committing to.
  3. **A single hand-drawn register for absolutely everything** — the title, the buttons, the agents, the network edges. Because the drawing hand is consistent, an unfamiliar diagram is immediately legible as "part of this world". Coherence achieved through medium, not through a colour palette.
  4. The title screen is a live instance of the model itself (the agent network, faded) rather than an illustration of it.
- **Transferable:** open with the model already running, faded, behind the title. State the time cost. Choose the entry verb deliberately — it is the cheapest way to set the reader's posture. One drawing register applied consistently buys coherence for free.

---

## H. Composition / editorial restraint

### H1. By-Kin
- **URL:** https://by-kin.com/ (Awwwards SOTD + Developer Award, FWA, CSSDA Web of the Day)
- **Screenshot:** `bykin-01-empty-center-corner-anchored.png`
- **What's exceptional:** The viewport is *mostly empty*, and the emptiness is in the **centre**. A huge orange wordmark bleeds off the top-left corner; nav sits top-right; the statement text and thumbnail index cluster in the bottom-left; an illustration sits bottom-right. Four corners loaded, middle void. Two type registers only: a ~28px humanist statement voice, and a ~9–10px monospace uppercase metadata voice ("FEATURED WORKS", "LAYOUT", "2025", "01/02/03"). Featured-work thumbnails are deliberately tiny (~60×50px) and numbered — the index refuses to be a card grid.
- **Transferable:** anchor composition to corners and leave the optical centre empty; this is the fastest structural escape from centred-hero layouts. Adopt a monospace micro-label register for all metadata (dates, counts, source attributions, section numbers) at ~10px — it does a section header's job at a third of the size and reads as apparatus rather than content.

### H2. Awwwards 2026 field data (anti-cliché evidence)
- **Sources:** https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/ , https://www.hontran.dev/blog/best-award-winning-websites-2026
- Of 47 Q1-2026 Site of the Day winners: 29 Three.js, 8 custom WebGL, 4 Babylon.js, **6 shipped with no WebGL at all — and those were the editorial/typographic pieces that scored on content.**
- Adoption among winners: camera-spline animation 82%, custom GLSL 78%, physics-based interaction 71%, spatial audio 54%.
- **Dying:** video backgrounds now <8% of winners (was >40% in 2022); full-page hero image with overlay text now <12%.
- **Read this as a warning, not a target.** "Scroll advances a camera along a spline through a 3D scene" is now the single most common award-site pattern in existence. For Kaleidoweb it is therefore a *generic* solution, and per the taste rubric's Genericness criterion it should be penalised, not reached for. The 6 non-WebGL winners are the more useful cohort.

---

## Blocked / not captured
- **nytimes.com** — 403 to headless Chromium and unavailable to WebFetch (2 attempts). Studied via the OpenNews making-of instead; noted in E1.
- **artsandculture.google.com** experiment deep-links 404 without a session; not pursued further.
