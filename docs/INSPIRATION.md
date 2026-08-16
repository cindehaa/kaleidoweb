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

---

## Counter-canon (v0.2): references that break our rules

`ANTI_SIGNATURE.md` §(e).10 named the evidence base itself as the deepest signature-encoding problem: *"Six references, all 2019–2026, all Anglo-American, all in the 'considered editorial tech' register, none from outside a Latin script, none dense, none saturated, none awkward. Until the reference set is diverse, the rules derived from it will keep producing one page."*

This section is the correction. Every entry below is **excellent** and **contradicts at least one rule in `DESIGN_PRINCIPLES.md` v0.2**. They are not counter-examples of bad design; they are counter-examples of *our* taste. Each carries a required extra field — **Which of our rules this breaks, and what the exception teaches** — written for the art-direction agent, so that when a subject's material record points away from the house style, there is a citable precedent for going there.

Studied live, August 2026, Chromium 1440×900 unless noted. Screenshots in `screenshots/references4/`. Measurements marked **[measured]** were pulled from the live DOM via `getComputedStyle`; everything else is read off the capture or cited to a source.

**The one-line thesis of this section:** sections A–H taught us that *restraint reads as consideration*. The twelve entries below are the evidence that **density, saturation, boundary and awkwardness are also consideration** — and that our defaults quietly convert every subject into a quiet, warm, hairline-ruled, whitespace-paced editorial page regardless of what the subject actually is.

---

### CC1. Yomiuri Shimbun front page (with Asahi Shimbun and Nikkei)

- **URLs:** https://www.yomiuri.co.jp/ · https://www.asahi.com/ · https://www.nikkei.com/
- **Screenshots:** `01-yomiuri-shimbun-front.png`, `01b-asahi-shimbun-front.png`, `01c-nikkei-front.png`
- **What it is:** The front page of Japan's largest-circulation daily (読売新聞, ~6M copies), plus its two closest peers. The single densest respectable news layout in continuous production.

**What's exceptional**

1. **Density is the courtesy, not the cost.** **[measured]** Yomiuri's front page carries **1,213 `<a>` elements** and 9,351 characters of visible text in a 9,967px page. Asahi: 817 links, 12,508 characters. Nikkei: 801 links, 7,183 characters. Nothing is behind a "see more". The page's implicit argument is *you are an adult, here is everything, you will find what you want* — the opposite of the curated-scroll posture our library was built from.
2. **There is effectively no display type.** **[measured]** The largest text on Yomiuri's front page is **20px/28px** — the lead headline. Body runs 13px (629 elements), 12px (298), 16px (232). **Display:body ratio ≈ 1.5×.** Our §2.2 demands ≥6×. Hierarchy is instead carried by *position, boxing, colour and rule weight* — the lead story is identified by a 4px purple bar to the left of its kicker and by sitting at top-left of the grid, not by being large.
3. **Boxed modules with filled headers, at real weight.** **[measured]** 260 borders at `1px rgb(75,0,130)` (indigo), 221 at `#e5e5e5`, 110 at `#ddd`, **40 at `2px rgb(30,36,40)`**. The masthead nav is a solid indigo band with white knockout type. Boxes are the primary structural device, not a fallback.
4. **Mixed-script texture does the work of typographic contrast.** A single headline runs kanji (dense, dark, square), hiragana (light, cursive, round), katakana (angular, foreign-marking), Latin (`NEW`), and full-width Arabic numerals (１０人). The line has four visual textures in it *before any type styling is applied*. Japanese layout does not need a second family because the writing system already contains several.
5. **Hashtag chips as an apparatus register.** `#千葉大雨` `#戦後81年` `#熊本地震` sit above the fold as outlined pills — metadata rendered as a *distinct shape class*, not a distinct typeface. Register split by geometry, not by font.
6. **Uniform density throughout.** There is no plate, no breath, no full-bleed pause anywhere in ~10,000px. Rhythm comes from *module size variation* inside a constant grid.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §2.2** (display:body ≥6×), **§2.8** (body ≥18px), **§4.1** (extreme density alternation), **§3.2**'s implicit preference for hairlines-and-whitespace, **§3.3** (empty optical centre), **§6.3** (three grounds).
- **Teaches:** *display:body ratio is a genre convention, not a quality metric.* A 6× ratio is how a Western editorial **feature** signals importance; a newspaper front page signals importance by *placement in a stable grid*, which is a stronger signal because it is repeatable daily and the reader has learned it. When a Kaleidoweb subject is a **reference surface** the reader will return to (a taxonomy, a roster, a station list, a discography), the Yomiuri model outperforms ours: build a stable grid, box the modules, keep type small, and let position carry rank. Also: for any CJK subject, **do not reach for a second typeface** — the script mixture already provides the contrast that §2.1's two-family rule exists to buy.

---

### CC2. Weltformat Poster Festival (Lucerne)

- **URL:** https://weltformat-festival.ch/
- **Screenshot:** `02-weltformat-poster-festival.png`
- **What it is:** The site of Switzerland's principal poster festival — the living institution of the Swiss/International poster tradition, run out of Lucerne.

**What's exceptional**

1. **The ground is `rgb(0, 255, 21)` — #00FF15.** **[measured]** on the `<html>` element. That is **HSL 125°, 100% saturation, 50% lightness**: not "a green", but *the* green, at the maximum a screen can emit, edge to edge, with nothing on top of it but black. There is no gradient, no tint, no overlay, no "atmospheric" softening. It is a poster ink at full strength, transposed to RGB.
2. **Chroma is the commitment; everything else is withheld.** **[measured]** the entire page holds **10 links** and 302 characters. One colour at 100%, one ink (black), one grotesk (Suisse Intl, 36px nav / 15px body / 10px micro), one hand-drawn word. The saturation is affordable precisely because nothing else is spending.
3. **The display word is *drawn*, not set.** "NEW FORMATS" is a marker-drawn scrawl rotated across the lower two-thirds, while the navigation above it is machine-precise Suisse Intl. Swiss discipline and a human hand in the same frame, with no attempt to reconcile them.
4. **Corner-marked, not corner-composed.** Four tiny black `?` glyphs sit in the four corners as a frame — apparatus reduced to a punctuation mark.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §6.3** (at most three large-area grounds and its implicit muting — here one ground occupies ~100% of the page at 100% saturation), **§8**'s "every colour below 40% saturation" ban read *in reverse* (we banned the floor but never authorised the ceiling), **§6.5** (derive the ground from the artifact — here there is no artifact; the ground *is* the artifact), **§2.10** (title performs the subject — the title performs *nothing*; the colour does).
- **Teaches:** our saturation rule is written as a **floor** ("≥50% somewhere") and floors get met minimally — one accent swatch at 52% in a sea of beige technically passes §6.3 and is exactly the failure the rule was written to stop. Weltformat teaches the **ceiling case**: a 100%-saturation ground for the *whole page* is a legitimate, disciplined choice, and it costs nothing in legibility because black-on-#00FF15 has ~15:1 contrast. Add to the rule set: *if a subject's material record contains a printing ink, a signal colour, a livery, a flag, or a warning standard, sample it and use it at its documented strength on a large area — do not tint it to make it "tasteful".* Muting a specified colour is falsifying a measurement (§0.2).

---

### CC3. RISOTTO Studio (Glasgow), with Hato Press (London)

- **URLs:** https://www.risottostudio.com/ · https://risottostudio.com/collections/ink-swatches · https://www.hatopress.net/
- **Screenshots:** `03-risotto-studio-riso.png`, `03b-risotto-ink-swatches.png`, `03c-hato-press.png`
- **What it is:** Two risograph studios. The riso is a stencil duplicator: each colour is a separate physical drum of soy ink, laid down in a separate pass, on uncoated paper, at ~600dpi, with mechanical registration tolerance of roughly a millimetre.

**What's exceptional**

1. **The palette is a parts catalogue, not a colour picker.** The ink library is presented as ~18 named, coded, photographed discs: **Fluro Pink 806U, Warm Red U, Black U, Med Blue 286U, Yellow U, Sunflower 116U, Green 354U, Aqua Blue 312U, Burgundy 235U, Teal 321U, Orange 021U, Fluro Orange 805U, Metallic Gold 872U, Fed Blue 294U, Violet 265U, Purple 2685U, Fluro Green 802U, Hunter Green 342U.** Each has a Pantone-family part number. You cannot invent a colour; you can only *select* one and then decide how many you can afford.
2. **Every swatch is photographed on paper, so the fibre shows.** They are not flat hex fills — you can see the tooth of the stock through the ink. Colour is presented as *a material sitting on another material*, which is what it is.
3. **The constraint generates the aesthetic.** Two inks + overprint gives you three colours plus paper. Hato's featured spread is a single pink ink over white with the mid-tones held entirely by halftone dot — no second colour anywhere. Mis-registration and dot texture are not tolerated; they are the evidence that a physical machine made this.
4. **Site chrome runs at the ink's strength.** RISOTTO's own pages ground themselves in a saturated hot pink plate and a full-width saturated yellow footer. The studio does not present its work on neutral grey. Hato sets everything in Basel Grotesk with a 1px black rule box around the entire header — furniture, not atmosphere.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §6.3** (≤3 large-area grounds — RISOTTO runs pink, yellow, cream and black plates in the first two screens), **§6.6** read narrowly (we say preserve the artifact's *damage*; riso teaches preserving the artifact's *process error* — misregistration is not damage, it is signature), **§6.9** (the accent-band prohibition — riso's Fluro Pink 806U and Fluro Orange 805U sit near bands we treat as suspect, and are here fully cited).
- **Teaches:** the strongest possible answer to §6.10's "the ground is sampled, not chosen" — **sample from a named, numbered, physically-existing ink, and then obey its limit count.** Concretely, for any subject with a print/reproduction history (a poster, a zine, a comic, a banknote, a map, a stamp, a woodblock), the correct palette move is: *identify the number of passes the real process allowed, name each ink with its actual designation, build the entire page from exactly those inks plus the substrate, and let overprint generate every remaining value.* This gives a palette that is provably non-default, provably ≥50% saturated, provably ≤4 colours, and provably derived — satisfying §6.3, §6.9 and §6.10 simultaneously, which no beige has ever done. And where the process had a registration tolerance, **reproduce the offset**: a 1–2px chromatic misalignment on a heading is more honest provenance than a caption saying "risograph-inspired".

---

### CC4. FAA VFR Sectional chart (via SkyVector), with the AirNav airport record

- **URLs:** https://skyvector.com/ (World VFR layer, San Francisco Bay) · https://www.airnav.com/airport/KSFO
- **Screenshots:** `04-faa-vfr-sectional-skyvector.png`, `04b-airnav-ksfo-airport-record.png`
- **What it is:** The chart a pilot navigates by under visual flight rules, and the corresponding textual airport record. Both are legal documents with an effective date; both are read under time pressure by someone who cannot afford to misread them.

**What's exceptional**

1. **Boundary language *is* the information.** A magenta dashed line is Class E starting at the surface. A blue solid line is Class B. A magenta segmented ring is Class D. A blue vignetted band is the outer edge of controlled airspace. **The stroke style, colour and weight are the semantic payload** — there is no legend on the working surface and no label saying "Class D". Line style carries what a label would cost in space.
2. **Boxes are the type system.** Every airport is a boxed record: identifier, field elevation, longest runway in hundreds of feet, lighting availability, CTAF/UNICOM frequency — five facts in a fixed order in a ruled rectangle, so a pilot's eye lands on "the third line" and reads runway length without reading the other four. Navaids are boxed differently (a bordered frequency box with a Morse ident). **The box shape encodes the record type.**
3. **Fractions as compressed 2-D data.** `100/30` inside a blue ring means "Class B from 3,000 to 10,000 feet MSL". A vertical extent expressed in six characters, repeated dozens of times across the sheet.
4. **Zero atmosphere, total chroma discipline.** Hypsometric terrain tints (buff → tan → brown by elevation), blue water, yellow urban footprints, magenta and blue for the two airspace families, black for obstacles and terrain figures. Every colour is a variable name in the §6.1 sense — and the sheet still holds together because the assignment never varies across 90 sectional charts covering a continent.
5. **The apparatus is a date, and it is the most important thing on the page.** AirNav's record opens with `FAA INFORMATION EFFECTIVE 06 AUGUST 2026` set larger and bolder than the data it introduces, because a chart out of currency is worse than no chart. **[measured]** the rest of the record is default `Times New Roman` at 16px with 17,162 characters of dot-leader tables and 155 links — no typographic design whatsoever, and it is one of the most used aviation resources in the world.
6. **Maximum data density with zero decoration.** There is not one mark on the sectional that is not read by someone.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §3.1/§3.2** (boxes everywhere, at 1–2px, with filled and knocked-out headers), **§3.6** (the diagram *is* the page — full-bleed, no prose column at all), **§4.1** (no density alternation; density is uniformly maximal), **§6.3** (far more than three large-area colours), **§2.1** (one family for everything, chosen for legibility not for voice), **§6.2** (there *is* a legend — a separate 20-page chart-user's-guide — and it works, because the encoding is a standard the reader has already learned).
- **Teaches:** **§3.2's whitespace fallback is usually cowardice.** We wrote "hairlines-and-whitespace is the fallback for subjects with no documented boundary language" — but almost every subject worth building has one, and the agent reaches for whitespace because whitespace is safe, not because the subject is boundary-less. The sectional shows the ceiling: when information must be *found* rather than *read*, the boundary carries the meaning and the whitespace carries nothing. Two concrete rules to derive from this: (a) **before choosing whitespace separation, name the subject's document class and check whether that class boxes**; a form, a table, a timetable, a chart, a spec, a score, a ledger, a card catalogue and a manifest all box, and copying that is derivation, not brutalism; (b) **a stroke style can replace a label** — dashed/solid/segmented/vignetted is four categories at zero space cost, and is a far better answer than four coloured pill badges. Finally: the effective-date stamp is the model for §7.1's generated-content marker — put the currency of the information *above* the information, at a size that says it matters.

---

### CC5. Ernst Haeckel, *Kunstformen der Natur* (Leipzig/Vienna, 1899–1904)

- **URL:** https://archive.org/details/kunstformenderna00haec (plates via the Internet Archive page-image server)
- **Screenshots:** `05-haeckel-plate-05-calcispongiae.png` (Tafel 5, *Ascandra*), `05b-haeckel-plate-08-discomedusae.png` (Tafel 8, *Desmonema*), `05c-haeckel-plate-02-thalamophora.png` (Tafel 2, *Globigerina*)
- **What it is:** 100 lithographic plates of natural forms, the canonical 19th-century scientific plate volume — apparatus register fully formed, forty years before modernism.

**What's exceptional**

1. **The running head is the entire navigation system, and it is set in italic at the sheet edge.** Left: *Haeckel, Kunstformen der Natur.* Right: *Tafel 5 — Ascandra.* Centre-bottom: **Calcispongiae. — Kalkschwämme.** (roman + Fraktur). That is publication, plate number, genus, taxon and vernacular name — five metadata fields — carried by **one typeface at one size in two styles, with no rules, no boxes, no uppercase, no letterspacing, and no colour.** Style contrast alone (italic = apparatus, roman = subject, Fraktur = vernacular German) does the whole job that our §2.6 monospace register does, at a fraction of the visual cost.
2. **The plate ground is chosen per plate, and it is not the paper.** Tafel 5 sits on a deep olive-grey field so that white calcareous sponges read as light forms; Tafel 8's medusae sit on plain cream so orange tentacles read as dark forms. **The ground is a function of the specimen's value, decided plate by plate.** The paper cream around the plate is a third, different colour. Three grounds *on one sheet*.
3. **Figures are numbered, not captioned.** Small numerals (1, 4a, 18a, 7²) sit next to each organism; the identification lives in a separate *Tafel-Erklärung* text signature. The image is kept clean and the reader is trusted to hold a number.
4. **Composition is a packed field, not a grid.** Twenty forms of wildly different scale and silhouette are nested to fill the rectangle with roughly even optical density, with no alignment and no gutters — the specimens interlock. There is no "column".
5. **The specimens are drawn at *different* magnifications on one plate** without saying so on the plate. Scale is subordinated to morphology; the plate is an argument about form, not a measurement.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §2.6** (an apparatus register that is neither monospace nor derived-from-machine-set-text, but simply *italic of the body face*), **§3.9** (the object does *not* carry its own label and yet gets no caption), **§6.3** (three grounds on a single sheet, twelve across the volume), **§3.3** (the composition is a full, packed field with the densest mass dead centre), **§2.9** (there is one measure, and it is the plate).
- **Teaches:** **the cheapest apparatus register is a style, not a family.** Before spending a typeface on metadata, try *italic of the reading face at the same size, placed at the trim edge*. Haeckel's running head proves it works and it is 200 years older than the eyebrow label. Second lesson, and the more important one: **the ground is decided per plate as a function of the specimen's tonality, not once for the experience.** Our §6.5/§6.10 read as "sample one ground from the artifact" and both shipped experiences duly sampled one beige. The correct move for an artifact-collection subject is *n* grounds for *n* artifacts, each chosen so the artifact reads correctly — a white specimen wants a dark field, a dark specimen wants a light one. This directly contradicts §6.3's three-ground ceiling, and Haeckel is the licence to break it.

---

### CC6. Bloomberg Businessweek, the Richard Turley era (2010–2014)

- **URLs:** covers documented at https://birdinflight.com/en/plitka/the-best-covers-in-40-years-who-made-bloomberg-businessweek-magazine-look-interesting.html · interview https://www.designboom.com/design/richard-turley-bloomberg-businessweek-interview/ · https://eyemagazine.com/feature/article/taking-care-of-business
- **Screenshots:** `06-businessweek-turley-covers.png` (XXX, June 25 – July 1 2012), `06b-businessweek-turley-covers-2.png` ("Selling Obama", April 4–10 2011, plus the Turley contents bar). **Partially unverified:** businessweek.com returns 403 to headless Chromium and the Wayback Machine 403s through this environment's proxy; covers and interior furniture are captured from a secondary archive, and interior spreads are described from the cited primary interviews rather than from a live capture.
- **What it is:** A business weekly redesigned into the most argued-about magazine in the world. George Lois called Turley's run the best selection of magazine covers in 40 years.

**What's exceptional**

1. **The house typeface was chosen to be boring on purpose.** Turley: *"I decided to use helvetica during my first phone call with bloomberg about the magazine"* and *"if there was any sense of risk with the design it was that helvetica is such an overused, tedious typeface."* He also described wanting *"something that didn't surprise anyone and was just a typeface, rather than a branding exercise."* The identity is not in the face. It is in what is done to the face each week.
2. **The grid exists in order to be violated, and the violation is named.** Turley: the grid is *"the bricks and mortar from which we build the walls of the magazine"* — and *"on top of that, we spray graffiti"*, with charts, illustration and display type sitting *"completely free of the grid."* Two systems on one page, deliberately unreconciled.
3. **Inconsistency is a stated goal.** Turley: *"I want people to fuck that up and to impose their own identity on the pages… a lot of competing personalities which is something to be celebrated."* This is the exact opposite of the coherence doctrine our §6.7 encodes.
4. **The cover impersonates a different document class every week.** The April 2011 "Selling Obama" cover is a fake retail circular: price bursts at 90pt, product cut-outs, hairline rules between merchandise cells, red 6pt "Made in the USA" micro-type, a UPC barcode used as a compositional element, and a right-hand blue column of tiny head-shots with yellow captions. It looks *cheap on purpose*, and the joke is the argument.
5. **Ideas are cheap and fast or they are dead.** Turley: *"If it doesn't come quickly, almost instantly actually, then I lose interest. The more I force an idea, the less convinced I am about it."*
6. **The contents page is a boxed ledger.** Four columns, each capped by a thick black rule, a red or black section kicker, a two-to-three-line headline in Helvetica Bold set tight, and a right-aligned page number — plus a fifth "Plus" column that is nothing but a 5-row dot-less table. The furniture is austere so the features can be feral.
7. **It was allowed to be ugly, and the ugliness aged well.** Not every issue landed. The failures were *interesting* failures, and the magazine's reputation is built on the aggregate risk rather than on any one perfect issue.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §6.7** (one drawing register, consistently applied — Turley's explicit aim is *competing* registers), **§0**'s "executed with fewer elements than feel comfortable", **§2.1**'s material-traceability requirement (Helvetica was chosen precisely *because* it is generic), **§8**'s three-typefaces ban in spirit (the covers routinely run four or five voices), **§5.6**'s removal test (removing the loudest element usually removed the issue's whole idea).
- **Teaches:** our entire rule set optimises for *no bad pages*, which reliably produces *no memorable pages* — the median of good typography is a fingerprint (§(e).8), and taste-averaging is how you get it. Turley is the licence for a **budgeted risk**: designate one movement per experience where coherence is deliberately broken — a different register, a borrowed document class, a graphic that fights the grid — and judge it on whether it is *interesting*, not on whether it is safe. Concretely: (a) **impersonating a document class the subject actually touched** (a circular, a ballot, a receipt, a betting slip, a ration book, a Wanted poster) is a stronger and more honest formal move than inventing a "considered" treatment, because the class carries real associations the reader already holds; (b) **the house face may be deliberately generic if, and only if, everything done to it is specific** — this is the one legitimate escape hatch from §2.1's traceability requirement, and it must be declared; (c) add a rubric line for **tolerated awkwardness**: a page on which nothing could possibly be called ugly has probably not risked anything.

---

### CC7. Vertical Japanese and right-to-left Arabic reading on the web

- **URLs:** https://aozora.binb.jp/reader/main.html?cid=456 (青空 in Browsers — Voyager's BinB reader; Miyazawa Kenji, *銀河鉄道の夜*) · https://www.aljazeera.net/ (الجزيرة نت)
- **Screenshots:** `07-aozora-binb-vertical-reader.png`, `07b-aljazeera-arabic-rtl.png`
- **What it is:** The two major non-Latin reading axes, each done properly at scale — a vertical `tategaki` book reader, and the leading Arabic-language news site.

**What's exceptional (Aozora / vertical)**

1. **It is a two-page spread, not a scroll.** The viewport is a codex opening: two pages side by side, gutter down the centre, text running **top-to-bottom then right-to-left**, so the reading eye starts top-right and finishes bottom-left. **Page turn advances leftward** — pressing the left arrow moves forward. The gesture, the axis and the object all agree.
2. **Roughly 30 columns per spread at a constant column measure**, with the measure set by *character count* rather than by pixels — the Japanese unit of measure is the em-square, so a "measure" is literally "how many glyphs tall".
3. **Ruby (furigana) rides inline at half size beside the parent glyphs** — 一目散 carries いちもくさん in the adjacent lane — without disturbing the column rhythm at all. This is inline micro-annotation solved a thousand years before §3.7 asked for it.
4. **Punctuation, brackets and dashes all rotate.** 「」 open downward. The dash 「──」 runs vertically. Nothing is left in its horizontal orientation "because it's a symbol".
5. **Chapter headings are just larger glyphs in the same column flow** (三、家) — no rule, no space break, no eyebrow, no numeral treatment.

**What's exceptional (Al Jazeera / RTL)**

6. **[measured]** `dir="rtl"` on the document root; the entire grid mirrors — logo top-right, nav flowing right-to-left, article text right-aligned, image-left/text-right pairs, and the "latest" rail with its timeline dots and rules on the **right** edge of the column.
7. **[measured] Display type is set at 32px with a 48px line-height — leading of 1.50 at display size.** Our §2.3 table demands 0.92–1.15 in that range. Arabic needs it: the script has deep descenders (ج ح خ ع), high ascenders (ل ك ا), and diacritical dots above and below that collide catastrophically at Latin display leading.
8. **[measured] Display:body ratio is 32/16 = 2×**, far below our §2.2 floor, and the page reads with clear hierarchy anyway because Arabic's contrast between a bold and a regular weight of the same face is far more visually distinct than Latin's.
9. **A custom institutional Arabic face (`Al-Jazeera`) does everything**, with the Latin fallback stack only for stray Latin. One family, five weights, both scripts.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §2.3** (line-height as a function of size — the table is Latin-specific and actively wrong for Arabic), **§2.2** (display:body ≥6×), **§2.9** (two measures — the vertical reader has one, defined in characters not pixels), **§3.4** (left-aligned display at a real margin — meaningless in RTL and in tategaki), **§4.1**'s scroll-based density alternation (a paginated codex has no scroll at all).
- **Teaches:** **the measured typography tables in §2.3, §2.4 and §2.8 are measurements of Latin type and must be labelled as such.** They were derived from six Anglo-American sites and then written as universal MUSTs; applied to Arabic they produce collisions, applied to CJK they produce the wrong unit entirely. Amend §2 with an explicit clause: *when the subject's script is non-Latin, the leading, tracking and measure tables are void and must be re-derived from a reference publication in that script.* Second lesson, for §8's "Latin-horizontal reading axis for a non-Latin subject, unremarked": the ban is right but toothless because it doesn't say what to do instead. Aozora says what to do — **adopt the axis for the whole reading surface, not as a decorative moment**: rotate the punctuation, put the annotation in the adjacent lane, reverse the pagination direction, and reverse the meaning of the arrow keys. A vertical pull-quote inside a horizontally-scrolled page is costume; a vertical *reading experience* is the subject's own form.

---

### CC8. Experimental Jetset — Online Archive

- **URL:** http://www.experimentaljetset.nl/ (https fails with `ERR_CONNECTION_RESET`; the site is served over plain HTTP, which is itself in character)
- **Screenshot:** `08-experimental-jetset-archive.png`
- **What it is:** The complete archive of the Amsterdam design studio behind the Whitney identity and *Statement and Counter-Statement* — arguably the most influential typographic practice of the last 25 years — presented as a bare directory listing.

**What's exceptional**

1. **[measured] The entire page is set at one size: 13.2496px, on 1,104 text-bearing elements.** There is no second size anywhere. **Display:body ratio = 1.00×.** The studio's own name at top-left is the same size as the smallest date in the table.
2. **The archive is a six-column alphabetical/chronological directory of ~264 entries**, each `project name` + `Mon YYYY`, ruled by nothing, in Helvetica, on white. Toggle links `alphabetical` / `chronological` sit at the two ends of a header row and are the only interaction.
3. **Strikethrough carries state.** Projects no longer viewable are struck through in place — the record is kept and its unavailability is shown, rather than the row being removed. Truth preservation as a typographic mark.
4. **[measured] Total page height 1,971px** for a career of ~264 projects. The entire studio fits in two screens.
5. **The studio famously restricts itself to black, white, red and blue.** Here it uses none of them: black on white, plus the browser's default link blue and visited purple, unstyled.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §2.2** (≥6× display:body — this is 1.0×), **§2.5** (uneven scale steps — there are no steps), **§2.10** (let the title perform the subject — there is no title), **§4.1** (density alternation — none), **§3.3** (corner anchoring, empty centre — the centre is the densest part), **§4.10** (first paint is a composition — the first paint is a table of contents).
- **Teaches:** **an index is allowed to be an index.** Our §1 table has no row for "the subject is a *list of things the reader came to look up*", and in its absence the agent art-directs the index, which is precisely the wrong instinct — the reader who wants project #178 is served by 264 scannable rows on two screens and betrayed by a paced, plated, hero-led catalogue. Add a rule: *when the primary user task is retrieval rather than comprehension, optimise for glyphs-per-screen and stable sort order, and spend the design budget on the destination instead.* The corollary for Kaleidoweb is direct: the **navigation/contents surface** of a generated experience should look far more like this than like §4.3's plate — one size, one column set, no imagery, everything visible at once, sortable — and the plates should begin only once the reader has chosen. Also note §7.2's provenance requirement gets a free, elegant answer here: **strike out what is gone rather than deleting it.**

---

### CC9. Warp Records — Discography

- **URL:** https://warp.net/releases
- **Screenshot:** `09-warp-discography-ledger.png`
- **What it is:** The complete catalogue of one of the most design-conscious record labels in existence — 862 releases, 1989 to 2026 — presented as a working ledger.

**What's exceptional**

1. **The header states the extent of the collection before anything else.** `ALL RELEASES (862)` at 40px, left; `1989–2026` at 40px, right; both with a triangular disclosure marker. **The reader knows the size and the span of the archive in the first line.** No hero, no featured release, no editorial framing.
2. **[measured] Body is 14px across 1,110 elements; the largest type is 40px. Display:body = 2.9×.** Our §2.2 floor is 6×. The page is unambiguously hierarchical anyway, because the 40px line appears exactly twice.
3. **[measured] Four grounds: `rgb(0,0,0)`, `rgb(55,54,65)`, `rgb(255,255,255)`, and `rgb(110,50,225)`** — a violet at high saturation, used as the masthead field and as the per-release state dot. Our §6.9 explicitly flags violet as a default-cluster hazard; here it is the label's identity colour and carries a functional job (selected state).
4. **The track table is the primary content and it is a table.** `# / TRACK / ARTIST / TIME`, ruled between every row, durations given to the second (`00:02:23`), track numbers zero-padded (`01`). Catalogue number (`WARPCDD92`) and release date sit in the left rail beside the sleeve at a fixed 14px. **The furniture of a discography is reproduced exactly.**
5. **The sleeve is the only image and it is small.** A ~340px square in a left rail, subordinate to the data. For a label whose sleeve art is legendary, this is a real decision: on the *discography* page, the catalogue is the subject.
6. **[measured] The page is 14,013px of unbroken table.** No plate, no pause, no editorial interruption in 862 records.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §2.2**, **§2.8** (14px body), **§4.1** (no density alternation across 14,000px), **§6.9** (a saturated violet as a primary ground), **§3.8** (the artifact is framed in a rail, not staged in an environment), **§4.3** (no plates at all).
- **Teaches:** **when the subject is a catalogue, reproduce the catalogue's furniture rather than narrating it.** Our §1 row for "large catalogue of unrelated small facts" prescribes hairline-ruled micro-text plates alternating with near-empty full-bleed plates — which is right for 150 *unrelated* items but wrong for 862 *comparable* ones, because comparability demands a shared row structure and an unbroken column of the same field. Add the distinction to §1: *unrelated items → plates; comparable records → a ledger, uninterrupted, sorted, with the count stated at the top.* Second lesson: **state the extent of the collection in the first line** (`(862)`, `1989–2026`). This is the cheapest trust-building move available and neither §4.7's duration contract nor §7.2's traceability rule currently asks for it. Third: §6.9's ban on violet is a ban on *unprovenanced* violet; Warp's violet is the label's, and the fix is a citation, not a substitution.

---

### CC10. Het Nieuwe Instituut (Rotterdam)

- **URL:** https://nieuweinstituut.nl/en
- **Screenshots:** `10-het-nieuwe-instituut.png`, `10b-het-nieuwe-instituut-alt-ground.png`
- **What it is:** The Netherlands' national museum for architecture, design and digital culture. Dutch cultural-institution graphic design at full conviction.

**What's exceptional**

1. **The masthead ground changes between page loads.** Captured chartreuse-yellow on one load and `rgb(204,244,252)` pale blue on the next; **[measured]** the fixed header sits on `rgb(140,255,180)` mint. The institution's identity is a *rotating* full-saturation field rather than a fixed brand colour. Nothing about the page is less coherent for it.
2. **[measured] Two typefaces inside a single word.** The wordmark reads "Nieuwe Ins**tituut**": "Nieuwe Ins" is set in `Cerial` at **189.01px** (a dot-contour stencil face where each letter is drawn as a chain of ellipses) and "tituut" continues in `Impact` at **162px**, solid and condensed. Not two words, not two lines — **the face changes mid-word**, at a different optical size, and the baseline still holds.
3. **The strapline is set in a fat condensed grotesk at ~72px running the full 1,440px width**, so the masthead block is roughly 300px of nothing but type at maximum weight, edge to edge. No image. No hero photograph. No overlay.
4. **[measured] Five large-area colours** on the first screen: black, white, mint `#8CFFB4`, pale blue `#CCF4FC`, and a hot pink accent `rgb(255,17,83)` — the pink at ~100% saturation.
5. **[measured] Boundary language is explicit: 44 borders at `1px #000` and 16 at `2px #000`.** "Currently on display" is underscored by a **~6px solid black rule** the width of the words. Exhibition dates sit *above* their titles as plain 16px text, not as eyebrow labels.
6. **The dot-contour display face is doing the same job as the institution's subject** — architecture drawn as construction rather than as mass.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §6.3** (five large-area grounds, and a ground that isn't even stable between loads), **§8**'s three-typefaces ban (Cerial + Impact + Social + a grotesk, four faces on the first screen), **§2.1** (two families maximum — broken *within a single word*), **§2.7** (the heading quieter than the body — here it is 189px and the body is 12–16px), **§6.9** (an unmuted `#FF1153`).
- **Teaches:** **coherence does not require a fixed palette; it requires a fixed *system*.** Our §6.4 already says "one generative motif, reparameterised per section" — HNI is the proof that the parameter can be the *ground colour itself*, re-rolled per visit, and the identity survives because the type, the rule weights and the layout are invariant. That is a much stronger and less fingerprint-prone reading of §6.4 than "recolour the same particle photograph". Concretely for Kaleidoweb: **let the section grounds vary widely in hue at constant saturation and constant structure**, rather than holding one ground and varying the accent — the latter is exactly how both shipped experiences ended up beige. Second lesson: **face-mixing within a single word is legitimate when the two faces name two things.** Where a subject has a genuine internal seam (a building's old wing and new wing, an artist's two periods, a standard before and after revision), setting the seam *inside the wordmark* is the §2.10 "title performs the subject" move executed at full strength — and it needs §2.1 to be relaxed from "two families maximum" to "two families per *voice*, and a deliberate collision is a voice."

---

### CC11. Yahoo! JAPAN, with FinViz

- **URLs:** https://www.yahoo.co.jp/ · https://finviz.com/
- **Screenshots:** `11-yahoo-japan-portal.png`, `11b-finviz-terminal-density.png`
- **What it is:** Japan's most-visited website — a portal that has resisted twenty years of Western minimalism — and the stock screener that most active retail traders actually keep open, both descendants of the Bloomberg Terminal's information posture.

**What's exceptional**

1. **[measured] Yahoo! JAPAN's body font-size is 14px and its largest type is 20px.** 300 links and 6,496 characters in a 6,822px page, in a rigid three-column frame: a boxed link rail left, a tabbed news module centre, and a stacked utility column right (login, weather with two-day forecast and a heat-stroke index, local information, transit status).
2. **Every module is a box with a filled or ruled header**, and the boxes are the same width down the column so the eye can move vertically without re-acquiring a measure. This is Yomiuri's grid applied to a service directory.
3. **It has not been redesigned into a search box.** Google's homepage is one input; Yahoo! JAPAN's is a *dashboard*, and it retains its market because the Japanese user's expectation is that a portal shows you the state of the world, not a door to it.
4. **FinViz puts four index charts, four market-breadth meters, two 20-row movers tables and a full S&P treemap into a single 900px viewport** — roughly 500 discrete data points above the fold — and it is legible, because colour is a **scalar** (green/red at graded intensity = magnitude of move) rather than a category, and because every number is right-aligned in a fixed column.
5. **[measured] FinViz sets body at 16px on a near-black `#12121a`-family ground with `IBM Plex Sans`**, and the treemap tiles are labelled at 6–9px — below any legibility guideline — which is correct, because the tile *size* is the datum and the label is a lookup for the tile you already picked out.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §4.1** (density must alternate — these alternate never), **§2.2**, **§2.8**, **§3.3** (the optical centre is the busiest region on both pages), **§8**'s "big-number stat tiles" ban (FinViz's breadth meters are literally stat tiles, and they work because each one shows both sides of the distribution it summarises), **§6.3**.
- **Teaches:** two things. First, **§4.1's density alternation is a rule for narrated experiences and must be scoped as such.** A dashboard, a portal, a screener or a reference surface is *entered repeatedly with a specific question*, and a reader who arrives 40 times a week is punished, not rewarded, by a full-bleed breathing plate between them and the answer. Add the condition to §4.1: *density alternation applies where the reader is being taken through an argument once; it does not apply where the reader is returning to look something up.* Second, **the banned "big-number stat tile" is only banned because it strips the distribution** — FinViz's tiles pass because each one renders the split (`Advancing 49.7% (2799) | Declining (2526) 44.9%` with a proportional two-colour bar). Rewrite the §8 ban as: *a summary number must be accompanied by the shape it was computed from, in the same tile* — which is a constructive rule the agent can satisfy, rather than a prohibition it routes around.

---

### CC12. *Vincent van Gogh — The Letters* (Van Gogh Museum / Huygens ING)

- **URL:** https://vangoghletters.org/vg/letters/let155/letter.html
- **Screenshot:** `12-vangogh-letters-scholarly-apparatus.png`
- **What it is:** The complete critical edition of Van Gogh's 903 letters — a 15-year scholarly project, published free on the web, with facsimile, diplomatic transcription, translation, and full annotation for every letter.

**What's exceptional**

1. **Four or more parallel texts of the same object, selectable, and viewable two at a time.** Each of the two panes carries the same tab strip: `original text · + line endings · facsimile · translation · notes · artworks`. The reader chooses *which two representations to see side by side* — facsimile against translation, or original against notes. **The interface's primary control is "which two truths do you want to compare".**
2. **[measured] Body text is 12.8px Georgia**, on a page carrying 34,962 characters and 404 links, at a 1,920px layout width. That is roughly a third smaller than our §2.8 floor, chosen so that three columns of scholarly text can be compared without scrolling either out of view.
3. **[measured] Three simultaneous measures on one screen** — a ~380px translation column, a ~200px metadata column (`Br. 1990: 154 | CL: 133`, from, to, date, `more...`), and a ~360px notes column — plus the facsimile pane. Our §2.9 permits exactly two and forbids a third.
4. **Superscript note markers are boxed numerals set inline in the running translation** (`so long, |1| and that for many a reason`), and the corresponding note in the right pane opens with the same numeral as a link. Bidirectional, visible-without-hover annotation — §7.2 satisfied by a convention four centuries old.
5. **The chrome is unapologetically 2009 and unapologetically coloured** — ochre, olive, steel-blue and sand tab blocks with white knockout labels, a tan letter-number bar, `« 154 | 156 »` sequential navigation top-right. It looks like a database, because it is one, and nobody has been tempted to "refresh" it into a white page with a serif.
6. **Editorial uncertainty is in the running voice, in the notes, at full length** — "One gathers from remarks made by Vincent later on…", "Hulsker links this remark to the next sentence" — not compressed into a tooltip.

**Which of our rules this breaks, and what the exception teaches**

- **Breaks §2.8** (12.8px body), **§2.9** (three-plus measures, and width does *not* signal mode — the panes are interchangeable), **§3.1/§3.2** (boxed, tabbed, bordered throughout), **§2.1** (Georgia does everything; no second family), **§4.4** (no environmental inversion, no plates, no pacing of any kind), **§3.3**.
- **Teaches:** the single most transferable structure in this whole section for Kaleidoweb's actual job. Our §7.2 requires that every claim be traceable to source text and that the affordance be visible without hover; the Van Gogh Letters shows what that looks like when taken seriously — **the source and the derived text are not linked, they are placed side by side, and the reader controls which pair.** For a generated experience over a Wikipedia article, the parallel is exact: `source paragraph · generated narration · citation apparatus · the artifact itself`, four representations of one fact, with the reader choosing any two. That is a far stronger truth-preservation design than a footnote marker, and it *requires* breaking §2.9's two-measure rule, because comparison needs simultaneity and simultaneity costs width. Amend §2.9: *two measures where the reader is being led through an argument; as many measures as there are parallel representations where the reader is being invited to check one against another.* Second lesson: **small type is a legitimate purchase when what it buys is simultaneity.** 12.8px is not a failure of care here; it is the price of getting four scholarly views onto one screen, and the editors clearly decided the comparison mattered more than the comfort. Ask of every §2.8 violation: *what did the small type buy?* If the answer is "more content", it is a failure. If the answer is "the reader can see two things at once that must be compared", it is a design.

---

### What this section should change in `DESIGN_PRINCIPLES.md`

Summarised for the next revision, worst-offending rules first:

| Rule | Problem the counter-canon exposes | Suggested amendment |
|---|---|---|
| **§2.3, §2.4, §2.8** | The tables are measurements of Latin type presented as universal | Label them "Latin-script defaults"; void them for non-Latin subjects and require re-derivation from a reference publication in that script [CC7] |
| **§2.2** (display:body ≥6×) | A Western feature-editorial convention. Yomiuri 1.5×, Warp 2.9×, Al Jazeera 2×, Experimental Jetset 1.0× — all excellent | Scope to narrated experiences; for reference surfaces, replace with "rank is carried by stable position in a grid" [CC1, CC8, CC9] |
| **§3.2** (hairlines-and-whitespace as fallback) | The fallback is the default, and the default is cowardice | Require naming the subject's document class and checking whether it boxes, *before* whitespace may be chosen [CC4] |
| **§4.1** (extreme density alternation) | Assumes the reader arrives once, to be led | Add the condition: does not apply to surfaces the reader returns to with a question [CC1, CC9, CC11] |
| **§6.3** (≤3 large-area grounds, ≥50% sat *somewhere*) | A floor gets met minimally; the ceiling was never authorised; per-artifact grounds are forbidden | Authorise a 100%-saturation full-page ground with provenance [CC2]; authorise *n* grounds for *n* artifacts chosen by specimen tonality [CC5]; authorise a ground that varies per load at constant structure [CC10] |
| **§2.9** (exactly two measures) | Forbids simultaneous comparison, which is what truth-preservation actually needs | As many measures as there are parallel representations, when the reader is checking one against another [CC12] |
| **§2.6** (apparatus register) | Assumes the register must be a *family* | Try italic-of-the-body-face at the trim edge first; also permit register-by-geometry (outlined chips) and register-by-stroke-style [CC5, CC1, CC4] |
| **§6.7** (one drawing register) + **§0** (fewer elements than comfortable) | Optimises for no bad pages, therefore no memorable ones | Budget one deliberate incoherence per experience; add a rubric line for tolerated awkwardness [CC6] |
| **§8** (big-number stat tiles banned) | Prohibition without a constructive alternative | Rewrite as: a summary number must carry the shape it was computed from, in the same tile [CC11] |
| **§1** (structure table) | No row for "index / retrieval surface"; conflates unrelated items with comparable records | Add *retrieval surface* → one size, one sort, everything visible, no plates [CC8]; split *unrelated items* (plates) from *comparable records* (uninterrupted ledger, count stated at top) [CC9] |
| **§6.10** (ground sampled, not chosen) | Correct, but under-specified — "sampled" becomes "beige" | Where the subject has a reproduction process, sample a **named, numbered ink** and obey the process's pass limit and registration tolerance [CC3] |

### Blocked / unverified in this round

- **bloomberg.com/businessweek** — 403 to headless Chromium ("Are you a robot?"); **web.archive.org** returns 403 through this environment's proxy for all Businessweek snapshots. CC6's covers and contents furniture are captured from a secondary archive (Bird In Flight) and its design claims are sourced to the Eye and Designboom interviews, quoted verbatim. Interior spreads are **not** verified from a live capture.
- **boomkat.com**, **colorama.de**, **biodiversitylibrary.org** — Cloudflare 403 to headless Chromium. Substituted with Warp (CC9), RISOTTO/Hato (CC3) and the Internet Archive's Haeckel scans (CC5) respectively.
- **experimentaljetset.nl over HTTPS** — `ERR_CONNECTION_RESET`; captured over plain HTTP.
- **p-a-n.org** — `ERR_CONNECTION_RESET`.
- **shonenjumpplus.com** — reachable, but the right-to-left manga viewer sits behind a consent modal and a per-title route; not captured. The RTL page-progression axis is covered by CC7's vertical reader instead.
