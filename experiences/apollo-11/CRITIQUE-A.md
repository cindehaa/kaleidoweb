# Critique A — Apollo 11, "Three Bodies"

Independent review against `docs/TASTE_RUBRIC.md` and `docs/DESIGN_PRINCIPLES.md`.
Critic A. No other critic's output consulted.

**Total: 48 / 65.** Two rubric dimensions score ≤ 3 in the categories the rubric marks
blocking (Hierarchy 3, Legibility 2).

---

## 0. Method

Fresh renders, this session:

```
node tools/shoot.mjs experiences/apollo-11/index.html screenshots/critic-a --states 14 --mobile
```

Desktop page height **44,983 px (50.0 viewports)**; mobile **64,822 px (76.8 viewports)**.
**Zero `pageerror`, zero console errors** on both viewports and on every subsequent
interaction run. That is worth saying plainly: this thing is not buggy. Everything below is
a design finding, not a crash.

Plus a Playwright probe (`--no-sandbox`, chromium-1194) that opened three `+ …` blocks,
cycled ALL / HOUSTON / EAGLE / COLUMBIA, captured a zoomed-out full-page pass at
`deviceScaleFactor 0.25`, element-shot all five `figure.bleed-fig`, the `#legend` grid, the
`.silence` band, the `#disperse` coda, and read computed styles. All artefacts in
`screenshots/critic-a/` prefixed `zz-`.

Measured facts used throughout (computed, not eyeballed):

| | value |
|---|---|
| font families in use | `PlexSerif`, `PlexCond`, `PlexMono` — **three** |
| `#plate h1` | 222 px / line-height 186.48 px (**0.84**) / tracking −7.77 px (**−0.035em**) |
| `body` | 17 px |
| `.blk-lede` (the score's reading text) | **15.5 px** |
| `.blk-more p` (expanded full paragraphs) | **14.5 px** |
| `.ex` (the expand affordance) | 9.5 px, `rgba(26,23,18,.30)` → **1.89:1** on `#EDE8DE` |
| `.blk-src` (provenance) | 9.5 px, `rgba(26,23,18,.18)` → **1.42:1** |
| content regions with border-radius > 0 and width > 120 px | **0** |
| distinct `max-width` values ≥ 200 px in the DOM | **20+** (408 → 864 px) |
| straight `"` vs curly `“ ”` in body text | **76 vs 62** |
| `.loslab` elements in the whole document | **4** |
| blocks / expanders / images | 84 / 36 / 19 |

---

## 1. Rubric scores

### 1. Information-design fit — **4**
The form is derived, not applied: the article's dominant structure is *simultaneity with
gaps*, and a shared-clock three-stave score is the only form that shows both. Nothing else
would communicate substantially better — `desktop-s05-y16955.png` (the 17:44:00 fork) makes
an argument a timeline structurally cannot. Docked for two things: the one phenomenon the
form exists to render — the 48-minute blackout — is drawn at `rgba(26,23,18,.05)` in a 30 px
strip (`score.css:299`) and is effectively invisible (`zz-los-s6.png`); and the whole
apparatus is `display:none`'d on mobile (`score.css:510–511`), where the page becomes exactly
the "one line, one thing after another" its own first sentence condemns (`mobile-s05-y24607.png`).

### 2. Hierarchy — **3**  *(blocking per rubric)*
The top of the ladder is excellent — live UTC/MET readout, movement head, lane head, block
head, timestamp. The bottom is inverted. In `zz-ex3-after.png` the expanded paragraph (14.5 px)
is the *smallest* serif on the page and sits directly under a 19 px quote: the deeper the
reader goes, the harder the type gets. The page's only interaction affordance is 9.5 px at
1.89:1 (`zz-ex3-before.png`, "+ what happened in the next three seconds"), and the provenance
tag — the page's stated core commitment — is 9.5 px at **1.42:1** (`desktop-s07`, the `p58`
labels). Meanwhile the single most famous event in the source, the first step
(`desktop-s07-y23737.png`, 02:56:15), is typeset identically to a tracking-station footnote
while a structural undocking gets 75 px display numerals.

### 3. Composition — **4**
Genuinely composed: hairlines and space instead of containers (§3.2 ✓), corners loaded and
optical centre voided (§3.3 ✓), display type flush-left at a real margin (§3.4 ✓), zero
radius/border/shadow on any content region (§3.1 ✓, measured). Docked for: the three-lane
staves leave a 610 px dead column on a majority of wide screens with no compositional
compensation (`desktop-s07`, `desktop-s08`, `zz-src-wrap.png` — Columbia empty across three
consecutive full viewports); the ink plates are not actually full-bleed, leaving a 92 px cream
stripe down the right where the minimap lives (`zz-jfk-crop.png`); and `score.css:186` applies
one global `object-position:center 28%` cover-crop to five differently-composed photographs,
which decapitates Kennedy (§ below).

### 4. Typography — **3**
Real strengths: 222 px / 17 px = **13.06×** display-to-body on desktop (§2.2 easily met),
a clean three-job assignment (serif = narration, condensed = structure, mono = instrument —
a Split A/C hybrid), tabular numerals throughout, and a true minus sign in "T−3:20". Against
it: three families where the rule allows two (§2.1); the reading register at 15.5/14.5 px
where the rule floors at 18 px (§2.8); **20+ distinct measures** where the rule allows exactly
two (§2.9); `h1` leading 0.84 and tracking −0.035em, both outside the §2.3/§2.4 tables — at
222 px the tables want roughly 0.92–0.96 and tighter than −0.08em, and the loose tracking is
visible in `desktop-s00-y0.png` as air between A-P-O-L-L-O; mobile display-to-body collapses
to **≈3.9×** (`score.css:480`, `clamp(52px,17vw,96px)` → ~66 px against a 17 px body). Plus 76
straight quotes fighting 62 curly ones (`desktop-s12`, `"Apollo effect"` / `"Giant Leap"` beside
the score's `“Contact light!”`), and `text-transform:uppercase` mangling the SI unit in
"T+13.2 **S**" (`desktop-s04-y13564.png`).

### 5. Motion — **5**
The most disciplined dimension in the piece and the clearest evidence of a real position.
Nothing autoplays. The only continuous element is the header readout, which is the position
indicator — precisely §5.5. Solo dimming is instantaneous and the CSS says why
(`score.css:93`, "instantaneous, no transition (state change, not motion)"). Block expansion
is instantaneous. The propellant gauge is scroll-bound, monotonic and non-refilling
(`zz-ex3-before.png`, red rail at x≈93) — that carries scale and irreversibility, which is a
nameable motion function. There is no scroll-triggered fade-up anywhere on 45,000 px. §5.7
(3D spline camera) not even approached. Removal test passes trivially: there is nothing
decorative to remove.

### 6. Pacing — **3**
The zoomed-out pass (`zz-density-0…3.png`) shows an honest curve — dense prose, ink plates,
score, EVA peak, dispersal, dense prose — but no *named* shape is declared anywhere (§1.3,
§4.2), and I cannot find **two adjacent ≥20:1 density inversions** (§4.1 MUST); the largest
adjacent swing I measure is ~8:1 (the `.silence` band against the end of the EVA stave). The
structural problem is front-loading: `zz-density-0.png` shows the first **25%** of the page is
conventional two-column article prose before the invention starts at "01 T−MINUS" — the thesis
is stated on screen one and then withheld for thirteen viewports. `CONCEPTS.md:277` names this
weakness ("Movements 0 and 8 carry ~5,000 words with none of the apparatus") and it is still
here. Inside the score, all eleven movement heads are structurally identical (ghost numeral +
title + right-aligned range + italic note) — a metronome across 25,000 px. No time-cost
contract (§4.7) and no entry verb (§4.8). Credit where due: the two `.silence` bands, the
17:44:00 caesura and the dispersal coda are genuine rhythm, and §4.6 (end with a change of
scale, not a summary) is met exactly.

### 7. Coherence — **4**
One drawing register — hairline, tick, hollow node dot — applied to the thesis diagram, every
stave, the fork and the coda, so the dispersal *rhymes* with the split (§4.5 ✓). The palette
is not invented: it is the article's own flight-director table (`desktop-s02-y6782.png`),
which is the strongest single decision on the page. Docked because the page states its own
colour contract and then breaks it: "a sixth ink — red — appears three times only" yet red also
carries the header `ALT` readout (`desktop-s06-y20346.png`) and the minimap crosshair; and
`score.css:525` reassigns `--team-maroon` — taught as Milton Windler's flight-director team —
to mean *Columbia* on mobile. §6.1 is explicit: assign once, never reassign.

### 8. Surprise — **5**
Repeatedly and specifically invented for this subject. The axis that stops being time and
becomes altitude because the source stops giving times at 6,000 ft. A propellant gauge that
only decreases. Two bands of drawn-but-undrawn time. Blocks whose content is the *absence* of
content ("This emptiness is the source's, not the design's"). A minimap whose declared job is
to admit that the page's own scale is dishonest. And `zz-solo-col-eva.png` is the best single
frame in the piece: solo Columbia over the EVA and six hundred million people's worth of
moonwalk fades to ghost, leaving one sentence about a man nobody wrote down.

### 9. Restraint — **4**
Very little to remove. No gradients, no cards, no icons, no emoji, no hero overlay. Docked for
two accumulations: the ghosted movement numerals (07, 09, 11 …) are decoration repeated eleven
times, and the page ships **two** full explanatory apparatuses before any of the notation is
used — the "Five colours, assigned" table and the `#legend` "How to read the score" grid
(`zz-legendbox.png`), five bordered cells with dividers. That is a legend box, which §6.2 and
the anti-cliché table both ban.

### 10. Legibility — **2**  *(blocking per rubric)*
The page is frequently harder to read than the Wikipedia article it replaces:
- Reading text at 15.5 px, expanded reading text at 14.5 px, provenance at 1.42:1.
- The LOS label is overprinted by body prose (`zz-los-s6.png`: "LOS · 48:00 · 3× dark here"
  at x≈1370 y≈490, struck through by "known such solitude", Collins felt very…").
- The `.silence` band's staff rules run continuously *through* its own explanatory paragraph
  (`zz-silence-el.png`) — both occurrences.
- Text is sliced mid-glyph under the sticky lane heads at every stave and every scroll
  position (`zz-ex3-before.png` "Contact light!"; `desktop-s09-y30519.png` "the crew was
  awakened by"; `mobile-s05-y24607.png`).
- The `.cols2` two-column prose spans 2+ viewports per column, so the reader must scroll down
  two screens and then back **up** two screens to start column 2 — `desktop-s12-y40692.png`
  column 1 ends "…featured the astronauts" and column 2 opens mid-sentence `"Apollo effect",
  influencing…`. Same in `desktop-s13`. Wikipedia's single column does not do this.
- On mobile the axis, gridlines, tie lines, console bands, LOS bands, gauge **and** the minimap
  are all removed, so 76.8 viewports have no scale, no simultaneity and no navigation.

### 11. Craft — **3**
Clean where it counts: no errors, sticky behaviour correct, minimap click-to-jump works
(probe: scrollY 0 → 24,526), expansion relayouts the stave without breaking time positions,
`prefers-reduced-motion` query present, tabular numerals, real minus sign. Defects:
- **Kennedy is decapitated** (`zz-fig-0.png`) — the figure captioned "President John F. Kennedy
  speaking at Rice University" shows him from the mouth down. Cause: `score.css:186`.
- `.blk-src` wraps to a second line when the label is long, breaking the header baseline in an
  otherwise rigid grid (`zz-src-wrap.png`, `p59` under "A BROADCAST OF A BROADCAST"; compare
  the inline `p58` two blocks up).
- The LOS band renders as an orphaned 58 px grey rectangle with no label at several scroll
  positions, indistinguishable from a broken-image placeholder (`desktop-s05-y16955.png` at
  x≈992 y≈345; `desktop-s08-y27128.png` at x≈1305 y≈137).
- Mobile header truncates the movement name to "off the clock ·…" with a mid-string ellipsis.
- Mixed quote glyphs; "T+13.2 S".

### 12. Genericness (inverted) — **5**
The swap test annihilates it, which is the correct result. The lanes are named bodies; the
axis is UTC because the article gives UTC; the palette is this article's flight-director
table; the altitude stave exists only because this article stops timestamping at 6,000 ft; the
`.silence` bands exist only because this article skips ten hours. Substitute any other subject
and there is no page left. This is the strongest dimension.

### 13. Truth — **3**
The apparatus is genuinely best-in-class: `§ section · p-number` on every block, "≈" for
derived instants, "—" for sequence-only, a six-item colophon naming exactly what the pipeline
added and what it refused to add. Then three things undercut it:
- **The dispersal coda asserts five false lineages.** `score.js:447` hard-codes
  `var map = [0,0,1,1,2,2,2]` — a purely positional fan. The result (`zz-disperse.png`) draws
  HOUSTON → "STILL ON THE MOON" and → "IN AN ORBIT" (both are *Eagle*), EAGLE → "SOLAR ORBIT"
  and → "ATLANTIC SEABED" (both are the *Saturn V*), and COLUMBIA → "LOST" (the Hasselblad and
  the taped-over transmissions). Five of seven connections contradict the page's own prose
  three inches below the diagram. A line that connects two things is a claim.
- **Phantom altitudes.** The Columbia lane of the altitude stave carries auto-generated gap
  labels reading **"5,547 ft"** and **"453 ft"** (`zz-solo-col.png`, x≈1320 y≈585) — quantities
  the source never gives, on a lane whose own block text says "Collins has no altitude."
- Provenance at 1.42:1 satisfies §7.2 on paper and not in the eye.

---

## 2. DESIGN_PRINCIPLES §9 pre-ship self-check

| # | Item | Result |
|---|---|---|
| 1 | **Swap test** | **PASS, emphatically.** Nothing survives a subject swap. (§0) |
| 2 | **Structure declaration** | **FAIL (§1.1 MUST).** The classification is argued in `CONCEPTS.md` but is *not recorded in the emitted experience's metadata* — the HTML carries only `<meta name="description">`. §1.1 requires it be recorded so critique can check it. Section order does follow from the structure, so the substance is met and the record is not. §1.2 is satisfied by construction: this is not a timeline, and the page argues why. |
| 3 | **Density curve** | **PARTIAL / FAIL (§4.1 MUST).** A shape is visible zoomed out (`zz-density-0…3.png`) but it is not named anywhere, and I cannot find two adjacent ≥20:1 inversions; best measured is ~8:1. |
| 4 | **Container audit** | **PASS.** Measured: zero content regions with radius > 0 at width > 120 px. Zero shadows on content. Separation is hairline + space throughout. Exemplary. |
| 5 | **Type audit** | **FAIL.** 3 families (§2.1); display:body 13× desktop ✓ / **3.9× mobile** ✗ (§2.2); `h1` 0.84 leading and −0.035em tracking outside the §2.3/§2.4 tables; reading text 15.5/14.5 px (§2.8); **20+ measures** where two are allowed (§2.9). |
| 6 | **Motion audit** | **PASS.** Position readout = "this is where you are". Gauge = scale + irreversibility, scroll-bound. Solo = state change, declared non-motion. Expansion = instantaneous reveal. Nothing unnameable. Nothing autoplays, so §5.2's pause affordance is vacuously satisfied — though the `prefers-reduced-motion` block (`score.css:540`) is a no-op that only re-asserts the default. |
| 7 | **Removal test** | **PASS.** There are no "three most impressive motions" to delete. |
| 8 | **Colour audit** | **PARTIAL.** ≤3 large-area grounds ✓ (paper, ink plate). Legend taught in a headline ✗ — taught in **two** legend boxes (§6.2 MUST). Assigned-once-never-reassigned ✗ — `--team-maroon` is reassigned to Columbia on mobile (`score.css:525`), and the page's declared "red appears three times only" is exceeded by the header ALT readout and the minimap crosshair (§6.1 MUST). |
| 9 | **Escape hatch** | **PASS on desktop, FAIL on mobile (§4.9 MUST).** Desktop: the minimap is click-to-jump (verified) and SOLO gives a real roaming mode. Mobile: `#map{display:none}` (`score.css:458`) leaves 64,822 px with no jump, no index and no overview. Return-to-source without hover ✓ in principle (`.blk-src` is always rendered) but at 1.42:1 it is not perceivable (§7.2). |
| 10 | **Legibility regression** | **FAIL.** Several facts are harder to find than on the Wikipedia page: any fact inside a `.cols2` block (scroll-down-then-back-up), any provenance reference (1.42:1), the 48-minute blackout on mobile (deleted), and Kennedy's face (cropped off). |

---

## 3. The three weakest moments

### 1. The blackout — the thesis, drawn as a whisper and then overprinted
**Evidence:** `zz-los-s6.png`. The label "LOS · 48:00 · 3× dark here" sits at x≈1370, y≈490
and is run straight through by the Solitude block's serif — "known such solitude", Collins felt
very / much a part of the mission." Two text layers on the same pixels. Also
`desktop-s08-y27128.png` (x≈1305, y≈137: an orphaned 58 px grey rectangle that reads as a
broken-image placeholder) and `desktop-s09-y30519.png` (band label colliding with the adjacent
lane's "1 h 8 min").

**Why it is the worst:** the opening sentence promises "one of them spent forty-eight minutes
of every orbit out of radio contact" and "silence is drawn." The legend promises "the lane's
rule drops to a hairline." What ships is a 30 px strip at `rgba(26,23,18,.05)` — a 5% tint
against a 0% ground — carrying **four labels in the entire 45,000 px document**
(measured), three of them illegible. A reader can traverse the whole piece and never see the
thing it was built to show.

**Minimal fix** (three declarations + one line of JS, no restructuring):
- `score.css:299` — widen `.losbg` to the lane's full text column and raise the tint from
  `.05` to `--paper-dim` proper, so it reads as a *field* the lane passes through, not a chip
  beside it.
- `score.css:303` — give `.loslab` `background:var(--paper); padding:0 5px;` and move it to
  `left:1px` (inside the band, above the lane rule) so block prose can never sit on it.
- `score.js:365` — drop the `firstLab === null` guard so every dark run ≥ 24 px is labelled,
  not just the first per lane.

### 2. The reading register is the smallest type on the page
**Evidence:** computed `.blk-lede` 15.5 px, `.blk-more p` 14.5 px, `.ex` 9.5 px at 1.89:1,
`.blk-src` 9.5 px at 1.42:1. `zz-ex3-after.png` shows the consequence directly: the expanded
"how close it actually was" paragraph is set *smaller* than the lede above it, which is set
smaller than the quote above that. `zz-ex3-before.png` shows the affordance that opens it —
the page's only interaction — as a grey ghost at the bottom of the block.

**Why:** §2.8 is a MUST and this is a reading-heavy page; more importantly the hierarchy is
inverted, so the page punishes exactly the reader who commits to it. Thirty-six expanders are
hidden behind an affordance most readers will not see.

**Minimal fix** (`score.css:319–331`, four values, nothing else moves — the staves re-layout
themselves on `relayout`):
- `.blk-lede` → `18px / 1.55`
- `.blk-more p` → `17px / 1.62`
- `.ex` → `11px`, colour `var(--ink-62)`
- `.blk-src` → `var(--ink-45)` (≈ 3.6:1, still quiet apparatus, now actually traceable)

### 3. The dispersal coda draws five false lineages
**Evidence:** `zz-disperse.png` — HOUSTON fans to "STILL ON THE MOON" and "IN AN ORBIT";
EAGLE fans to "SOLAR ORBIT" and "ATLANTIC SEABED"; COLUMBIA fans to "LOST". The page's own
rows immediately below say the descent and ascent stages are *Eagle*, the S-IVB and the F-1
engines are the *Saturn V*, and the lost Hasselblad was left on the Moon. Cause:
`score.js:447`, `var map = [0,0,1,1,2,2,2]` — the fan is positional, never semantic.

**Why:** this is the last image in the experience and it is the one place where the piece stops
quoting and starts asserting. On a project whose non-negotiable is traceability, a diagram that
mis-attributes five of seven objects is worse than no diagram. It also sits eight inches from a
colophon that says "Nothing else has been added."

**Minimal fix:** reorder `dests` so each source's destinations are contiguous —
`[SOLAR ORBIT, ATLANTIC SEABED | STILL ON THE MOON, IN AN ORBIT, LOST | SMITHSONIAN,
DISTRIBUTED]` with `map = [0,0,1,1,1,2,2]` — and rename source 0 from `HOUSTON` to `SATURN V`
(`score.js:459`). Reorder the four `.where .row`s to match. No new geometry.

**Runner-up, worth one line:** `zz-fig-0.png` — Kennedy's head is cropped off by the global
`object-position:center 28%` at `score.css:186`. Add `style="object-position:center 12%"` to
`assets/03-…Rice_University.jpg` (`index.html:114`), as the page already does for two other
figures.

---

## 4. Verdict

### Ship-blocking

1. **Legibility 2 / Hierarchy 3** — the rubric marks ≤3 in either as a blocking failure, and
   both trace to the same root: the reading and provenance registers are set below the floor
   (15.5 / 14.5 / 9.5 px at 1.89:1 and 1.42:1). Weakness #2 fixes both for four CSS values.
2. **§7.4 / Truth — the dispersal diagram's five false attributions** (`zz-disperse.png`). A
   truth failure on a truth-first project. Two-line fix; no reason to ship without it.
3. **§4.9 MUST — no escape hatch on mobile.** `#map{display:none}` on a 64,822 px page.
4. **§6.1 MUST — colour reassigned.** `--team-maroon` means Windler's team on desktop and
   *Columbia* on mobile (`score.css:525`); red exceeds its own declared three uses.
5. **§2.8 / §2.9 MUST** — reading text below 18 px; 20+ content widths where two are allowed.
6. **§2.2 MUST on mobile** — display-to-body ≈3.9×.
7. **Text sliced under the sticky lane heads** at every stave (`zz-ex3-before.png`,
   `desktop-s09`, `mobile-s05`). One `padding-block-end` / mask on `.lanehead`, or
   `scroll-margin-top` on `.blk`.
8. **The LOS band and label collision** (weakness #1) — blocking not as a rule violation but
   because the experience does not deliver its own thesis without it.

### Improvements (not blocking)

- Move the front 25% of prose behind the score, or interleave it, so the invention starts
  before viewport 13 (`zz-density-0.png`; `CONCEPTS.md:277` already flags this).
- Break `.cols2` into single-column or into column blocks no taller than one viewport
  (`desktop-s12`, `desktop-s13`).
- Fix Kennedy's crop (`score.css:186`).
- Fix `.blk-src` wrapping off the header baseline (`zz-src-wrap.png`).
- Normalise quotes (76 straight vs 62 curly) and stop `text-transform` mangling "T+13.2 s".
- Suppress altitude gap labels in a lane the page declares has no altitude ("5,547 ft",
  "453 ft" — `zz-solo-col.png`).
- Give SOLO the option to *collapse* rather than only dim, so soloing actually compresses the
  read; and give it a state for "this lane is empty here on purpose" (`zz-solo-col.png` is
  currently indistinguishable from a broken filter).
- Declare the density-curve shape and a reading-time contract (§1.3, §4.7); pick an entry verb
  (§4.8).
- Record the structure classification in the emitted HTML (§1.1).
- Consider dissolving the `#legend` grid into the first stave that uses each convention
  (§6.2), rather than front-loading five notations and five colours.

### What should not be touched

The motion grammar (5/5 — nothing autoplays, one continuous element, and it is the position
indicator). The container discipline (measured zero radii). The palette derived from the
article's own flight-director table. The 17:44:00 fork. The `.silence` bands as an idea. The
colophon. And solo-Columbia-over-the-EVA, which is the single best thing this design does.

This is a genuinely designed piece with an idea no template could produce — scoring 5 on
Surprise and 5 on Genericness in the same document is rare. It is currently let down by its
smallest type and its last diagram, and both are cheap to fix.
