# Kaleidoweb Design Principles v0.2

v0.2 integrates the anti-signature amendments (see ANTI_SIGNATURE.md); rules flagged there as signature-encoding are amended accordingly.

Opinionated, actionable rules for the agent that art-directs an experience. Every rule is grounded in something observed in `INSPIRATION.md`; citations in `[brackets]` point at the entry.

Rules are numbered so critiques can cite them. `MUST` = violating it is a blocking failure. `SHOULD` = violating it needs a stated reason. `CONDITIONAL` = permitted only when its stated condition is met; otherwise it is a blocking failure.

---

## 0. The stance

**The subject decides the form. The form is then executed with fewer elements than feel comfortable.**

Two failure directions bracket everything below. On one side, a template with the subject poured into it — this fails Genericness. On the other, invention for its own sake — this fails Legibility. The test that separates them: *could this composition serve a different subject unchanged?* If yes, it was decoration. If it would break, it was design.

The strongest single piece of external validation for this stance is The Pudding's own doctrine: story shape is derived from the shape of the data, and they name specific shapes — V (converge then diverge), inverted-V (local → national → local) — chosen per story [C2].

**0.1 The swap test.** Replace the subject with an unrelated one and re-render with the same layout. If it still works, the composition was decoration, not design.

**0.2 The derivation test.** For each of ground, display face, body face, accent colour, rule weight, grid, and reading axis, name the artifact the value came from and where it was measured. A value you can only justify ("it felt right for the subject", "paper suits it") is a default. A value you can cite ("sampled from `assets/05-great-wave.jpg` at the sheet margin, x=40 y=1180") is a derivation. The swap test catches a layout that fits any subject; the derivation test catches a *palette and typography* that fit any subject, which is the failure the swap test misses.

---

## 1. How information type should determine form

Before any visual decision, classify the subject's **dominant informational structure**. Most Wikipedia articles have one dominant and one secondary. Design for the dominant; let the secondary appear as a single contrasting movement.

| Informational structure | Signals in the source | Form to reach for | Form to refuse | Evidence |
|---|---|---|---|---|
| **Causal mechanism** — parts that act on each other in a chain | "works by", exploded diagrams, part names, energy/force/signal flow | Section order = the causal chain itself (Power → Gears → Escapement…). One column; diagram at prose width; each entity gets a permanent colour; every animation pausable; representation strips down as abstraction rises | A timeline. A parts *list*. Full-bleed hero diagram | [B1] |
| **Chronology** — events ordered in time, causally thin | dates dominate, "history of", succession lists | Radical compression at the index level (date + two words per entry); density deferred into the entry. Motion = advance/rewind only | A vertical dotted-line timeline with alternating left/right cards. This is the project's single most-banned cliché | [E2], rubric blacklist |
| **Chronology with a spatial spine** — a journey, expedition, battle, migration | a route, a place-per-date | Geography carries the sequence; scroll-bound camera along the actual route so the reader sets the pace; slow for establishing space, quick for incidents | Auto-playing flythrough the reader can't control | [E1] |
| **Distribution / many comparable records** | tables of counts, rankings, "list of X by Y", census-like data | Give each record a body in an inhabited space; give the reader a position in it; offer "skip the tour, let me roam" from the first screen | A bar chart of the top 10 with the other 4,000 discarded | [F1] |
| **Data narrative with a surprise** | a counter-intuitive statistic, a strong skew | Prediction-then-reveal: ask the reader to commit before showing the distribution. Encode the schema in the title with colour, then never re-explain it | Big-number stat tiles | [C1] |
| **Collection of artifacts / imagery** — paintings, manuscripts, specimens, artefacts | many images that *are* the subject rather than illustrating it | Artifact at full scale with its texture and damage intact; page ground sampled from the artifact; navigation axis matched to how the object is handled (horizontal for sheets, rotational for vessels); no caption where the object already carries its label | A masonry image grid with uniform radii and hover-zoom | [D1], [D2] |
| **Taxonomy / hierarchy** — a classification tree | "types of", nested categories, ranks | Nesting expressed by *scale and indentation of type*, not by nested boxes; one register per level | Nested cards; org-chart boxes-and-lines | [A1] (hierarchy by scale alone), [H1] |
| **A single object of overwhelming importance** — one building, one instrument, one organism | the article is dominated by one entity | Give the artifact ≥50% of the viewport and demote all prose to caption scale | Equal-weight text/image split | [A2] |
| **Large catalogue of unrelated small facts** — the hardest case | many short independent items, no through-line | 3-column hairline-ruled micro-text plates alternating with near-empty full-bleed plates carrying one word; group into ~8–10 named categories | 150 cards | [A1] |
| **Contested / uncertain knowledge** | "disputed", competing estimates, ranges | Show the disagreement as the graphic; state the limits of the evidence inside the narration, in the same voice as the claim | Presenting one estimate as settled | [B2] |

**1.1 MUST** — classify the structure *before* choosing any visual treatment, and record the classification in the generated experience's metadata so critique can check whether the form followed it.

**1.2 MUST** — if the chosen structure is "chronology", the burden of proof is inverted: justify in writing why a timeline is the *best* form for this subject before emitting one. Most subjects that look chronological are actually causal or geographic.

**1.3 SHOULD** — pick a *shape* for the density curve as well as the sections: converging, diverging, V, inverted-V, or a steady widening. The Pudding derives this from the data [C2]; so should we.

**1.4 MUST — inventory the material record before any visual decision.** Name a specific artifact class (a document, an instrument, a substrate) and answer the nine-slot schema in `ANTI_SIGNATURE.md` §(b) from evidence. Record it in the experience's metadata as `material_record`. No colour, face, rule weight or grid may be chosen before this exists.

---

## 2. Typography system

The measured Shopify Editions system [A1] is the calibration target; Ciechanowski [B1] is the calibration target for reading-heavy sections.

**2.1 MUST — two families, maximum.** Editions ships exactly two (National 2 + Shopify Inter). Ciechanowski ships exactly two (Inter + IBM Plex Sans). A third family is a failure, not an option. The two families should be assigned by *job*, and the assignment is a design decision worth making per subject:
- **Split A (narration/instrumentation):** serif for everything narrated, sans for all data furniture — axis labels, legends, units, counts. Voice is encoded in the typeface: humans speak serif, instruments speak sans [C1].
- **Split B (display/reading):** one face for display *and* micro-labels, another for the mid-band of reading sizes [A1].
- **Split C (author/system):** serif or humanist for authored prose, monospace for machine voice — instructions, controls, source attributions, "generated" markers [D1].

**2.2 MUST — display-to-body ratio ≥ 6×.** Editions is 8.6× (120px vs 14px). A page whose largest type is 2–3× its body type reads as a document, not an experience.

**2.3 MUST — line-height is a function of size.** Measured:

| size | line-height | source |
|---|---|---|
| ≥ 64px | **0.92–0.96** | Editions 120px→0.96, 64px→0.96, 40px→0.92 |
| 24–48px | 1.05–1.15 | Editions 24px→1.10 |
| 16–20px | 1.5–1.6 | Editions 14px→1.50; Ciechanowski 19.2px→1.60 |
| displayed math/formulae | 1.8, at **1.15–1.2× body size** | Ciechanowski 22.72px/1.8 on a 19.2px body |

Display type at line-height 1.4 is the most reliable tell of an untuned page.

**2.4 MUST — tracking is a function of size**, tightening as size grows:

| size | tracking | source |
|---|---|---|
| 120px | −0.08em | Editions [measured] |
| 64px | −0.04em | Editions [measured] |
| 24–40px | −0.03em | Editions [measured] |
| ≤ 16px body | 0 (normal) | Editions, Ciechanowski |
| ≤ 11px uppercase micro-labels | **+0.06 to +0.12em** | By-Kin monospace labels, Pudding axis labels |

**2.5 SHOULD — uneven scale steps.** Small ratios at the bottom (1.1–1.2×), large leaps at the top (1.6–1.9×). Editions: 14 → 16 → 24 → 40 → 64 → 120. A uniform modular scale (every step 1.25×) produces the metronome pacing the rubric penalises.

**2.6 SHOULD — a monospace micro-label register at ~10px, uppercase, letterspaced**, carrying *all* metadata: dates, counts, section numbers, units, source attributions, "generated explanation" markers. It does a section header's job at a third of the size and reads as apparatus rather than content [H1]. This is also the cheapest mechanism for the truth-preservation requirement — provenance lives in a visually distinct register.

**2.7 SHOULD — the heading may be lower-contrast than the body.** Ciechanowski's H1 is `#535353` against `#444` body text: the title is *quieter* than the prose [B1]. Where the reader will spend real time reading, give the running text the strongest contrast and let size alone carry hierarchy.

**2.8 MUST — body text ≥ 18px** for any section intended to be read continuously (Ciechanowski 19.2px; Pudding and Stripe Press are larger still, ~22–26px serif). 16px body is a product-UI default, not a reading default.

**2.9 MUST — two measures, and width signals mode.** Define exactly two content widths and use them consistently: an **argument width** (~560–700px) and an **evidence width** (~1100px–full bleed). The reader should be able to tell from width alone whether they are reading a claim or inspecting evidence [B2], [C1]. Do not invent a third.

**2.10 SHOULD — let the title perform the subject.** Editions typesets "Everywhere" everywhere in the frame [A1]; Pudding's headline is itself a simile with its variable slots colour-coded [C1]. Ask of every subject: *if this were a verb, what would the type do?* A title that merely states the subject in large type is a missed opportunity, not a neutral choice.

---

## 3. Composition

**3.1 MUST — no border-radius on content regions.** Editions [measured] applies radius only to controls (pill buttons, 4px/8px chips); every content region is radius 0, borderless, shadowless, on one of three background colours. This single rule eliminates the "shadcn card collection" failure mode more effectively than any other.

**3.2 MUST — separate with hairlines and space, not containers.** 150 discrete items on Editions are separated by 1px rules and whitespace alone [A1]. Reach for a container only when the content genuinely nests.

**3.3 SHOULD — anchor to corners; leave the optical centre empty.** By-Kin loads all four corners and voids the middle [H1]. This is the fastest structural escape from the centred-hero layout. Centring is permitted for exactly one persistent element (a position indicator) and for a deliberate ceremonial moment, not as a default.

**3.4 SHOULD — left-align display type at a real margin, with the baseline low in the plate.** Editions section words sit at x≈118px with the baseline ~⅔ down [A1]; Linear's hero is flush-left at x=80 [A2]. Vertically centred display type reads as a slide deck.

**3.5 SHOULD — asymmetric two-item rows** to fill width without centring or inventing filler: descriptive text left, a single link or datum right, sharing one baseline [A2].

**3.6 MUST — explanatory diagrams sit at prose width, inline in the reading column.** The single most counter-intuitive finding in this research: Ciechanowski's interactive 3D mechanisms are the same width as his paragraphs [B1]. A diagram promoted to full-bleed becomes a spectacle and stops being an argument. Full-bleed is reserved for *plates* (§4.3), not for explanations.

**3.7 SHOULD — inline micro-evidence at x-height.** Set tiny thumbnails inside running sentences at the word that names them [B2]. For Wikipedia's dense entity linking this is far better than a figure below.

**3.8 SHOULD — stage artifacts in an environment, not in a frame.** Editions floats product screenshots inside the atmospheric image plate [A1]. A drop-shadowed card around an artifact flattens both the artifact and the space.

**3.9 SHOULD — when an object carries its own label, add no caption.** Stripe Press shows book spines with no titles or descriptions because the spine already says it [D2].

---

## 4. Pacing

**4.1 MUST — density must alternate, and the ratio must be extreme.** Editions alternates plates of ~15 dense items per screen against plates carrying a single 120px word — a ~100:1 swing in glyph count between adjacent screens [A1]. Target at least two ≥20:1 density inversions per experience. Uniform section padding producing an even rhythm is a rubric failure.

**4.2 SHOULD — the density curve should have a named shape** (§1.3), and the shape should be legible in a zoomed-out screenshot of the whole page.

**4.3 Plate vs. column.** Define two structural units and alternate them:
- **Column** — argument width, high density, hairline separation, no full-bleed. Where information actually transfers.
- **Plate** — full-bleed, near-empty, one word or one artifact, a distinct chromatic world. Where the reader breathes and the section changes.

**4.4 SHOULD — allow exactly one total environmental inversion.** Stripe Press flips from a near-black object space to a white reading room [D2]. One such inversion is a structural beat; three is chaos.

**4.5 SHOULD — repeat a diagram with accumulation.** Show a mechanism isolated, then re-show the *same* diagram embedded in the larger assembly [B1]. Recurrence with added context beats a new visualisation each time.

**4.6 SHOULD — end with a change of scale, not a summary.** Mechanical Watch's final section ("The Size of It All") rescales the whole subject to human size [B1]. A zoom-out coda outperforms a conclusion paragraph.

**4.7 SHOULD — state the time cost up front** in the micro-label register ("~6 min", or Nicky Case's "playing time: 30 min" [G1]). A duration contract measurably changes whether the reader commits.

**4.8 SHOULD — choose the entry verb deliberately.** "Play" produces a different reader than "Read" or "Explore" or "Begin" [G1]. It costs one word and sets posture before any content loads.

**4.9 MUST — offer an escape from the guided path.** Happy Map puts "Skip story" directly under "Start" [F1]. Guided narrative and free exploration must coexist; a linear-only experience is a worse reference tool than the Wikipedia page it replaced, which fails the Legibility criterion.

**4.10 MUST (latency) — the first paint is a composition, not a spinner.** Open with the model or motif already running behind the title [G1], and stream expensive sections in behind it. The mission's "magical in the first seconds" requirement is a pacing rule, not an infrastructure rule.

---

## 5. Motion grammar

Motion means something or it is deleted. The clearest external statement of this is the Snow Fall team's [E1].

**5.1 MUST — duration is chosen by narrative function.** From the Snow Fall makers: the airbag animation was made deliberately *quick* so it would not draw disproportionate attention; the Cascades flyover deliberately *slow* so the reader could absorb the landscape; the mountain path *scroll-synchronised* so the reader controlled the pace [E1]. Codify:

| duration | meaning | use for |
|---|---|---|
| 120–200ms | "acknowledged" | control state, hover, selection |
| 250–400ms | "this became that" | transformation, morph between representations, reveal |
| 600–1200ms | "absorb this" | establishing a space, a scale change, an environmental inversion |
| scroll-bound | "you set the pace" | anything the reader must be able to re-read: routes, sequences, processes |
| continuous | "this is alive / this is where you are" | a running model, a position indicator — and *nothing else* |

**5.2 MUST — every animated element has a pause affordance in a consistent position.** Ciechanowski gives every diagram an identical pause button at the bottom-left of its canvas, plus a global pause [B1]. Motion must never be something that happens *to* the reader.

**5.3 MUST — motion carries one of: causality, sequence, scale, focus, or transformation.** If a motion carries none of these, delete it. Scroll-triggered fade-up applied uniformly to every element carries none of them and is explicitly blacklisted by the rubric.

**5.4 SHOULD — transitions morph rather than cut when the two states are the same entity.** Ciechanowski's toothed gears become bare pitch circles in place — same position, same colours, less detail [B1]. The morph is the argument: *this is the same thing, seen more abstractly*.

**5.5 SHOULD — reserve continuous motion for the position indicator.** Editions' floating pill is the only always-animating element, and it animates *through the letters* of the section name during transitions [A1]. Everything else is at rest until acted on.

**5.6 MUST — the removal test.** Snow Fall's team: the test for every asset was whether it *added value*, not whether it existed, and the loudest transitions were deliberately toned down to prevent reader fatigue [E1]. Before shipping, remove the three most impressive motions and check whether comprehension dropped. Reinstate only the ones that did.

**5.7 SHOULD NOT — scroll-driven camera along a spline through a 3D scene.** 82% of Q1-2026 Awwwards winners use it [H2]. It is now the single most generic move available and should be penalised under the Genericness criterion, not reached for.

---

## 6. Colour & material

**6.1 MUST — colour is a variable name.** Assign each entity/role a colour once, teach it at first use, and never reassign it. Ciechanowski's yellow is the input gear for an entire article [B1]; Pudding's teal and purple are *ground* and *vehicle* for an entire essay [C1].

**6.2 MUST — teach the legend inside the headline, not in a legend box.** Pudding's title *is* the schema, with the two variable slots colour-coded and underlined [C1]. By the first chart the reader already knows the encoding and was never shown a key.

**6.3 MUST — no more than three large-area background colours** across the whole experience. Editions [measured]: `#090909`, white, and a 4% white overlay. Everything else is imagery.

**6.4 SHOULD — one generative motif, reparameterised per section.** Editions reuses a single particle-dissolved photograph, recoloured into a different chromatic world per section [A1]. This is how coherence and variety coexist. Generating a *different* treatment per section produces incoherence; generating the *same* treatment per section produces monotony. Parameterise.

**6.5 SHOULD — derive the page ground from the artifact** when the subject is material: Pudding's menu piece sets the page to the paper's cream [D1]. A white page under a cream artifact makes the artifact look like a mistake.

**6.6 SHOULD — preserve the artifact's damage and texture.** Foxing, stains, folds, uneven edges [D1]. Cleaning up an artifact destroys the evidence that it is one — a truth-preservation issue as much as an aesthetic one.

**6.7 SHOULD — one drawing register, consistently applied, buys coherence for free.** Nicky Case draws the title, the buttons, the agents and the network edges in one hand [G1]; Pudding uses one illustrator's line throughout [C1]. Mixing photography, 3D render, flat icon and line illustration in one experience is the most common coherence failure.

**6.8 SHOULD — semantic link colours.** Different colour for "this link changes the state of this page" vs "this link takes you away". Ciechanowski uses amber for the former, blue for the latter [B1]. For Kaleidoweb this extends naturally: a third treatment for "this returns you to the source Wikipedia text", satisfying the traceability requirement.

---

## 7. Truth and provenance in visual form

Derived from the mission's non-negotiables, given form by observed patterns.

**7.1 MUST — generated explanation is typographically distinguishable from source fact.** Use the monospace micro-label register (§2.6) or a distinct type register for anything the pipeline wrote rather than read.

**7.2 MUST — every non-trivial claim is traceable to source text**, and the affordance for that is visible without hover (hover-only provenance fails on touch).

**7.3 SHOULD — state the limits of the evidence in the same voice as the claim.** Distill narrates its own uncertainty inline rather than in a footnote [B2]. This is a design pattern, not just an editorial one: uncertainty set in a smaller, quieter, *separate* register reads as a disclaimer; uncertainty set in the running voice reads as honesty.

**7.4 MUST — no invented imagery presented as evidence.** Generative motifs (§6.4) must be abstract or clearly non-representational, or they become fabricated evidence. Editions' particle-dissolve is safe precisely because nobody could mistake it for documentation.

---

## 8. Anti-cliché rules

Each entry: the cliché, why it fails, and what to do instead.

| Banned | Why | Instead |
|---|---|---|
| hero → cards → big number → timeline → quote → cards → conclusion | The template is visible through any content; fails Genericness by construction | Derive section order from the subject's structure (§1) |
| Uniform-radius cards for every section | Editions carries 150 items with zero cards [A1] | Hairline rules + whitespace (§3.2) |
| Vertical alternating-side timeline | Applied to subjects that are causal or spatial, not temporal | Causal chain (§1) or spatial spine; if genuinely chronological, compress hard (§1.2, [E2]) |
| Purple/indigo gradient headers, glassmorphism, floating blobs | Decoration uncorrelated with content; the ultimate "swap the text" layout | Three flat grounds max (§6.3) + one derived motif (§6.4) |
| Everything centred | Produces the slide-deck read | Corner anchoring with an empty centre (§3.3); left-aligned display (§3.4) |
| Identical section padding throughout | Metronome pacing; no rhythm | Extreme density alternation (§4.1) |
| Scroll-triggered fade-up on every element | Motion carrying no meaning; also delays reading | Motion only for causality/sequence/scale/focus/transformation (§5.3) |
| Big-number stat tiles | Strips the distribution the number came from | Prediction-then-reveal against the full distribution (§1, [C1]) |
| Emoji as icons | Register collision; renders inconsistently | Monospace micro-labels (§2.6) or nothing |
| Gratuitous dark mode with neon accents | Contrast without hierarchy | Dark is allowed as a *plate* environment (§4.3); accents must be semantic (§6.1) |
| Scroll-driven camera along a 3D spline | 82% of 2026 award winners [H2] — now maximally generic | Scroll-bound motion tied to an actual route or process (§5.1) |
| Full-page hero image with overlay text | Already collapsed to <12% of award winners [H2] | Type that performs the subject (§2.10) |
| Video background | <8% of winners, down from >40% [H2] | Static plate, or a live model (§4.10) |
| A legend box | The reader must hold a mapping in memory | Teach the encoding in the headline (§6.2) |
| Full-bleed explanatory diagram | Becomes a spectacle, stops being an argument | Diagram at prose width, inline (§3.6) |
| Three or more typefaces | No page in this library uses more than two | Two families by job (§2.1) |

---

## 9. Pre-ship self-check

Run before any experience is considered done. Any `MUST` failure blocks.

1. **Swap test.** Replace the subject with an unrelated one and re-render with the same layout. If it still works, the design is generic — score 1 on Genericness and start over. (§0)
2. **Structure declaration.** Is the informational structure classified and recorded, and does the section order follow from it? (§1.1)
3. **Density curve.** Zoom the full page to fit. Is there a visible, named shape? At least two ≥20:1 density inversions? (§4.1, §4.2)
4. **Container audit.** Count content regions with a border-radius, border, or shadow. Target zero. (§3.1)
5. **Type audit.** ≤2 families? Display:body ≥6×? Line-height and tracking match the size tables? Exactly two content widths? (§2)
6. **Motion audit.** For each motion, name which of {causality, sequence, scale, focus, transformation} it carries. Unnameable → delete. Every animation pausable? (§5.2, §5.3)
7. **Removal test.** Delete the three most impressive motions. Did comprehension drop? Reinstate only those that did. (§5.6)
8. **Colour audit.** ≤3 large-area grounds? Every colour-coded entity assigned once and never reassigned? Legend taught in the headline? (§6.1–6.3)
9. **Escape hatch.** Can the reader skip the guided path and roam? Can they get back to the source text without hovering? (§4.9, §7.2)
10. **Legibility regression.** Side by side with the original Wikipedia page: is any fact now *harder* to find? If yes, that is a blocking failure regardless of beauty. (Rubric #10)
