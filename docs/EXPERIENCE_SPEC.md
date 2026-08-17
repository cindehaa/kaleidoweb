# Experience Spec — the distillation (draft v0)

**Status:** design document for D013's runtime. Written after three experiences shipped
(`experiences/apollo-11`, `experiences/hokusai`, `experiences/attention-paper`), which is the
precondition D002 set for abstracting anything. No code here; this document decides *what the
interpreter is allowed to be told* and *what it already knows*.

**The split this document exists to make:**

> Everything the three builds do **the same way** becomes the **runtime chassis** — written once,
> in the extension, never emitted by a model.
> Everything they do **differently** becomes the **Experience Spec** — a small JSON stream a fast
> model emits in 0.5–4 s, joined against the Content Model by id.

The test for which side a thing falls on is not "is it hard" but "does it change per subject."
`hidden="until-found"` folds are hard *and* identical in all three builds: chassis. A vermilion seal
stamped off-register beside derived arithmetic is trivial *and* unique to one subject: spec.

Reading order for context: `docs/DECISIONS.md` D013 + D002, `docs/ARCHITECTURE.md`,
`docs/DESIGN_PRINCIPLES.md` v0.3. Rule citations below are to that file (`§4.13`, `§7.5`, …).

---

## (a) What the three builds share — THE RUNTIME CHASSIS

Extracted from the code, not from intent. Each row is a mechanic that appears in ≥2 builds with the
same contract and different parameters. The right-hand column is the principle it encodes, which is
why it belongs in the chassis: **the chassis is how the rules are enforced structurally rather than
by asking a model to remember them.**

| # | Mechanic | Apollo 11 | Hokusai | Attention | Encodes |
|---|---|---|---|---|---|
| C1 | **Persistent chrome with a position instrument** | `index.html:18–35` header: UTC readout + altitude readout + movement name; `score.js:989–1010` `setWhere`/`setOff`/`setTime` | `index.html:341–352` `#chrome`: movement index 00–06 + global pause; `scale.js:909–923` `trackSection` | *absent by design* — no persistent chrome; pause docks per-canvas (`divide.js:630–641`) | §5.5 (continuous motion reserved for the position indicator), §2.11 + §8 ("apparatus persisting with nothing to measure" — Apollo *suppresses* the readout off-clock rather than printing `——:——`). Chassis must therefore support `instrument: none` as a first-class value. |
| C2 | **Movement / scene sequencing with declared identity** | `data-mv`/`data-no`/`data-name`/`data-clock` on every `<section>` (`index.html:59,344,417,…`); index dialog built from them (`score.js:1089–1128`) | `MV[]` table + `setState()` (`scale.js:472–542`); scroll fractions `FRAC` (`scale.js:752`) | `<section class="station" data-st data-fill data-name>` (`index.html:67,102,144,…`); `boot()` calls `station1()…coda()` | §1.1 (structure recorded in metadata), §4.12 (one idea per screen) |
| C3 | **Claim-headings, not category headings** | `.mvhead .ttl` = "T-minus", "The split", "Sixty-nine minutes" | `MV[3].h` = "13 of the 23 dated works fall inside the years he wrote off" | `h2.claim` = "Dividing by eight is the difference between attending and choosing" | §2.12 (headings assert something disputable); §8 (source section titles banned) |
| C4 | **`hidden="until-found"` subordination, one level** | `wireToggles` + `wireFolds` (`score.js:104–166`), `beforematch` re-opens | `wireFolds` (`scale.js:925–945`), identical contract | `folds()` (`divide.js:612–628`), identical contract | §7.5 (subordination ≠ deletion), §1.6 (four-layer allocation), E11 |
| C5 | **Provenance anchors + one inspector** | `.blk-src` `p39`/`p40`, `.prov` inside the opened body; concordance in footer | `openInspector()` (`scale.js:698–748`): work → date-as-stated, derived age, register, verdict, source anchor, "read the passage →" | `.app.ours` marks every computed number; `<figcaption>` carries the reproduction licence | §7.2, §7.6 (one affordance per block + end-matter concordance, never a column of tokens) |
| C6 | **Two-register type system, both traceable** | Courier Prime (typewriter record) + Jost (Futura/Spartan placard); `score.css:1–56` | Newsreader (narration) + Zen Kaku Gothic New (museum label register); `scale.css:15–31,68–71` | STIX Two (Times, `nips_2017.sty:38`) + Latin Modern (CM math); `divide.css:56–58` | §2.1 (two families max, ≥1 traceable to the material record), §2.6 (apparatus register derived, monospace conditional) |
| C7 | **Two measures only, both read off the source format** | `--w-arg:624px` (6.5in) / `--w-ev:1056px` (11in) | `--argument:709px` / `--evidence:1077px` (ōban 25×38cm @72dpi) | `--arg:668px` / `--plate:1160px` | §2.9 (width signals mode; never invent a third) |
| C8 | **Environment moments: IO-mounted, one live at a time, three fallbacks** | `wireEnv()` (`score.js:320–361`): `IntersectionObserver`, `envLive` singleton, `tryMount` swallows no-WebGL and removes the orphan canvas (`:202–212`), `STILL` from `prefers-reduced-motion` (`:178`), speed 0 = one frame then rAF stops | `environment.src.mjs:113–164`: `mount/unmount`, `decide()` picks by visibility + plate state, `supported=false` on WebGL error → flat printed ground stands | `envPositional()` (`divide.js:554–594`): IO gates the rAF; `REDUCED` never starts it; 2D canvas, no WebGL at all | §5.8 (2–4 moments, ceremonial placement, never blocks reading, collapses to a still frame, degrades without WebGL) |
| C9 | **Pause affordance in a consistent position** | global, in header; every animated element obeys | `#pause` bottom-left of `#chrome`, forwards to `__hokusaiEnv.setPaused` | `[data-pause]` docked bottom-left of each canvas, shared state so both agree | §5.2 (motion never happens *to* the reader) |
| C10 | **End matter: reading key + DESIGN_RATIONALE + full text + concordance** | `#rationale` (`index.html:1733+`): "How to read the score" SVG key, nine-slot material-record table, then a footer listing the six kinds of connective material | `#endmatter` "The page's own hand" (`index.html:306–335`) + full article in `#m6` with folds + reference `<details>` | `#end`: three unpublished-manuscript arguments, the errata list, the derivation `<dl>`, then every unattached section as folds | §5.9/D011 (self-description demoted to end matter), §7.1, §7.6 |
| C11 | **Source-link footer with revision + census** | `en.wikipedia.org/wiki/Apollo_11 · Revision 1369197321 · 39 sections · 34 images · 40-row infobox` | `revision 1367785328 · 26 images`, "Every fact here comes from that article and nothing else" | `arXiv:1706.03762v7 · 23 sections, 63 paragraphs, 23 equations` + the paper's own reproduction licence | mission non-negotiable (traceability), §7.4 |
| C12 | **Deterministic first paint, then upgrade** | staves are DOM + CSS; images are `loading="lazy"` under reserved boxes | sheets paint as `plate-fill` dominant-colour rectangles at true aspect, removed on image `load` (`scale.js:181–190`) | everything is computed in-page from a seeded PRNG (`divide.js:26–52`) — zero network dependence for the argument | §4.10 (first paint is a composition, not a spinner) |
| C13 | **Scroll → state, never scroll → camera** | `onScroll` maps scroll to UTC/altitude readout (`score.js:1015–1088`) | `onScroll` maps scroll fraction to plate state 1–4; the plate is `position:sticky` and never moves (`scale.js:750–776`, `scale.css:203`) | plain document scroll; stations are static, controls are direct | §5.7 (spline-camera scroll banned), §5.1 (scroll-bound = "you set the pace") |
| C14 | **Escape from the guided path** | `Solo` filter + movement index dialog + "skip" affordances (`score.js:1141–1177`) | "skip to the article" in the first screen; movement index; register filter (`scale.js:576–591`) | "skip to the results" / "the paper in full" in the meta line; `skip the guess` | §4.9 (guided and free must coexist) |
| C15 | **Reduced-motion + no-WebGL are two separate paths** | `STILL` disables drift and env; `noGL` disables mounts and cleans up | `speedFor()` returns 0 under either; `supported=false` unmounts everything | `REDUCED` prevents the rAF from ever starting; the still frame already carries the argument | §5.8 |

**Chassis modules that fall out of this.** These are written once, in TypeScript, in the extension,
and are the *only* things allowed to touch the DOM:

- `stage` — instant typographic takeover, Shadow-DOM/iframe host, restore (already exists:
  `extension/takeover.js`, `extension/experience/boot.js`).
- `materials` — applies the spec's tokens as CSS custom properties + `@font-face` from a vendored
  face table; enforces contrast floors, the ≥6× display:body ratio (§2.2), the line-height and
  tracking tables (§2.3/§2.4), the two-measure rule (§2.9).
- `sequence` — scene registry, movement index, position instrument, scroll→state, `trackSection`.
- `prose` — argument-width blocks, claim-headings, ledes, `until-found` folds, `beforematch`.
- `evidence` — figures at true aspect with dominant-colour placeholders, inspector dialog,
  provenance anchors, captions (§3.10 refuses a caption that only describes).
- `plot` — axis, registers/lanes, packing at true aspect, ticks, filters, range bars. (Hokusai's
  `layout()` and Apollo's `layout()` are the same algorithm with different anchors.)
- `beats` — the parameterised interaction library (see (b)).
- `env` — the IO-gated, one-live-at-a-time environment mounter with the three fallbacks, wrapping
  the vendored `@paper-design/shaders` + a 2D canvas path.
- `endmatter` — reading key, rationale table, full-text reading room, concordance, source footer.
  **Built entirely from the Content Model with zero spec tokens** (see (f), phase 5).

---

## (b) What varies — and therefore must live in the Spec

Five axes. Anything not on this list is chassis and the model may not speak about it.

### b1. Genre + scene graph
The three builds are not three layouts, they are three *genres*:
a multi-lane time-score; a two-axis plot whose y-axis is a quotation; a chain of operable stations.
The spec picks a genre kit and then names the scenes: id, kind, name, claim, surface width, density
class, ground. Apollo has 12 movements over 10 staves; Hokusai has 7 movements over one sticky
plate; Attention has 11 stations plus a coda. The *count and shape* of that graph is the single
biggest structural variable.

### b2. Material tokens, with provenance attached
Grounds, inks, accents (each with the file+coordinate it was sampled from), type roles and the
reason each face is traceable, rule weights and their boundary language, the two measures and what
they were read off, the easing curve and the physical claim it makes. Compare
`score.css:1–56` (bond/ribbon/team colours/1.75px rules) against `scale.css:36–80`
(washi/sumi/indigo/seal, 1.75px key-block line, `--baren`) against `divide.css:1–70`
(white/#000/tab10 heads/4px title rule, `--softmax`). Nothing is shared but the *slots*.

### b3. Content mapping
Which Content-Model items reach which scene, at which emphasis tier, under which surface budget.
Apollo maps 39 sections into 12 movements with an explicit four-layer allocation; Hokusai maps 23
dated works onto 8 registers and 10 undated ones into a margin; Attention's
`kaleidoweb:allocation` meta (`index.html:30`) names surface / subordinated / pointer-only /
promoted per section. This is §1.6 and it is per-subject by definition.

### b4. The bespoke beat — exactly one per build
Each build has one signature interaction and the rest is reading. Enumerated as **beat types**:

| Beat type | Where it shipped | Parameters | v0 kit-able? |
|---|---|---|---|
| `predict-place` | Hokusai m2 (drag the Wave onto the age axis, `scale.js:594–687`); Attention m9 (drag the marker onto the cost/BLEU plane, `divide.js:410–489`) | axes + ranges, the item (image ref or label), the truth value/interval, the reveal claim, the two narration branches (guess low / guess high), the skip label | **Yes — first.** Two of three builds already share it with different geometry. |
| `isolate-subset` | Apollo `Solo` (lanes → one body, `score.js:1155–1177`); Hokusai register filter (`scale.js:576–591`) | the facet field, the option labels, the "clear" affordance, what the heading says while filtered | **Yes — second.** Same operation, different handle. |
| `scrub-state` | Hokusai plate states 1–4 driven by scroll (`scale.js:750–776`); Apollo's clock/altitude readout | state list, scroll fractions, per-state narration pair `[surface voice, apparatus annotation]`, which elements enter/leave | **Yes — third.** Cheap and structural. |
| `inspect-artifact` | Hokusai inspector; Apollo `.blk` expansion; Attention token selection | item set, the field list to print, the "read the passage" return target | **Yes** — already near-chassis (C5). |
| `operate-model` | Attention: divisor slider, mask toggle, head selector, all recomputing real numbers (`divide.js:54–125, 215–395`) | a **computation kernel id** + control definitions + bound readouts | **No, not in v0.** Needs a kernel library; see (g). |
| `compare-adjacent` | not yet built (Hokusai concept C's four-waves adjacency) | the item set, the ordering claim, the named absence | Proposed; cheap. |

The rule the beat table enforces: **one beat per experience** (§5.6's removal test applied ahead of
time). A spec emitting two beats is invalid and the interpreter keeps the first.

### b5. Environment moments
Treatment, palette (drawn from the material tokens, never fresh colour), placement (which scene,
which state), speed, and the still-frame it collapses to. Apollo spends 4 (god-rays dawn, regolith
grain, a hand-painted 2D star field, one scroll-coupled photograph drift); Hokusai spends 2
(dithering wave in two inks; grain-gradient sumi at the tail); Attention spends 2, both 2D canvases
made of *the subject's own arithmetic* (81 dot products; the positional field). The variable is not
"which shader is prettiest" — it is **what matter this subject is made of**, which is §5.8's
derivation clause.

---

## (c) The Experience Spec — schema draft v0

### Design constraints
1. **≤3–4k streaming tokens.** Compact keys, no prose the chassis can write itself, no inlined
   source text — content is referenced into the Content Model by id and the interpreter joins.
2. **Streamable and partially valid.** Emitted as **NDJSON records**, one per line, in render order.
   A truncated stream is a shorter experience, never a broken one.
3. **Ordered by what unblocks paint**: meta → materials → scene list → scenes in reading order →
   beat → environment → end.

### Reference grammar (how the spec points at content)
| Form | Means |
|---|---|
| `p18` | Content Model paragraph id |
| `p9-p16` | inclusive paragraph run |
| `§4` | `sections[section_id=4]` |
| `q:1` | `semantic.quotes[1]` |
| `w:*`, `w:3` | `semantic.works[…]`, `*` = all |
| `c:0-30` | `semantic.chronology` slice |
| `img:05` | image by asset index (client derivation assigns stable indices) |
| `ib:Born` | infobox row by label |
| `qty:2` | `semantic.quantities[2]` |
| `derive:fibre(img:15@x0-96,y288-384)` | a client-side derivation call (see (e)) |

Any ref that does not resolve invalidates **that record only**.

### Records

```jsonc
// 1 — meta (~120 tok)
{"r":"meta","v":0,"title":str,"thesis":str<=25w,
 "structure":enum,"secondary":enum|null,"curve":enum,
 "entry":{"verb":str,"minutes":int},
 "budget":{"surface":float<=0.4,"wpv":int,"plates":int,"labels":int}}

// 2 — materials (~380 tok)
{"r":"materials","record":str,                       // the material record, one line
 "ground":[{"t":id,"hex":hex,"from":ref}],           // 1-3, §6.3
 "ink":{"body":hex,"quiet":hex,"on_dark":hex?},
 "accent":[{"role":str,"hex":hex,"from":ref,"use":"text"|"stamp"|"fill"}],
 "type":{"narration":{"family":str,"why":str},
         "apparatus":{"family":str,"why":str,"case":"sentence"|"caps"},
         "scale":[num,…],"body":num,"lead":num},
 "rule":{"major":num,"minor":num,"lang":str},
 "measure":{"argument":int,"evidence":int,"why":str},
 "motion":{"easing":bezier,"models":str,"dur":{"ack":ms,"morph":ms,"absorb":ms}},
 "texture":{"tile":ref|null,"blend":str}?}

// 3 — scene list (~90 tok) — paints the index and reserves scroll space
{"r":"scenes","list":[[id,kind,name,vh],…]}

// 4..n — scene bodies, in reading order (~150-320 tok each)
{"r":"scene","id":id,"kind":kind,"name":str,
 "claim":str,                                        // §2.12, the heading
 "lede":str?,                                        // <=45 words, surface voice
 "note":str?,                                        // apparatus register: what was derived
 "refs":[ref],                                       // what this scene is about
 "items":ref|[ref],                                  // the set it renders, if any
 "surface":"argument"|"evidence"|"full",
 "density":"empty"|"sparse"|"dense",
 "ground":id,                                        // key into materials.ground
 "beat":id?,
 "folds":[{"label":str,"refs":[ref]}]?}

// beat (~120 tok) — at most one per spec
{"r":"beat","id":id,"type":enum,"scene":id, …type-specific…}

// env (~70 tok each, 2-4 of them)
{"r":"env","id":id,"scene":id,"state":int?,"treatment":enum,
 "palette":[hex],"speed":float,"params":{…},"why":str,"still":enum}

// end (~40 tok)
{"r":"end","endmatter":{"key":bool,"rationale":[[term,str],…],"concordance":true}}
```

**Scene kinds (v0):** `overture` · `plate` (full-bleed, near-empty, ceremonial) · `column`
(argument width, prose + folds) · `plot` · `plot-state` (a scrub state of a sticky plot) ·
`score` (lanes on a shared axis) · `station` (an operable/annotated step) · `gallery` ·
`table` · `map` · `coda` · `reading-room`.

**Environment treatments (v0):** `dither` · `grain-gradient` · `god-rays` · `stars` ·
`still-image` · `data-field` (a 2D canvas fed by a derivation, the Attention pattern) · `none`.
`still` ∈ `flat-ground` | `last-frame` | `image`.

---

### A complete worked spec — Hokusai, "Nothing Before Seventy"

This is what the fast model would emit for `en.wikipedia.org/wiki/Hokusai`. Every string is the
model's; every fact is a ref. (Compare against `experiences/hokusai/index.html` +
`scale.js:13–140` for what it is trying to reproduce.)

```jsonl
{"r":"meta","v":0,"title":"Nothing Before Seventy","thesis":"Hokusai graded his own life's work by age, and the most reproduced print in the world falls inside the years he wrote off.","structure":"collection-of-artifacts","secondary":"single-object","curve":"filled-climb-with-unreachable-tail","entry":{"verb":"Scroll","minutes":9},"budget":{"surface":0.4,"wpv":190,"plates":2,"labels":10}}
{"r":"materials","record":"An oban nishiki-e sheet, Edo c.1800-1849: washi substrate, key block plus flat opaque colour blocks, kento registration, publisher and censor seals, a vertical signature column inside the image field.","ground":[{"t":"sheet","hex":"#DDD4C5","from":"derive:sample(img:15@x0-96,y288-384)"},{"t":"ink","hex":"#0D0B06","from":"derive:sample(img:08@x576-640,y416-480)"}],"ink":{"body":"#0D0B06","quiet":"#625B45","on_dark":"#DDD4C5"},"accent":[{"role":"his own voice","hex":"#0C3254","from":"derive:sample(img:06 deep-blue band)","use":"text"},{"role":"this page's arithmetic","hex":"#CE3F3A","from":"derive:sample(img:21 vermilion ground)","use":"stamp"}],"type":{"narration":{"family":"Newsreader","why":"an imported voice, marked as ours rather than passed off as his"},"apparatus":{"family":"Zen Kaku Gothic New","why":"a Japanese gothic: the label register the museums that hold him set dates and accession lines in","case":"sentence"},"scale":[11.5,13,15.5,20,34,62,124],"body":20,"lead":1.55},"rule":{"major":1.75,"minor":1,"lang":"key-block line, never a hairline: a print outlines every region before it colours one"},"measure":{"argument":709,"evidence":1077,"why":"the oban sheet, 25x38cm at 72dpi"},"motion":{"easing":"cubic-bezier(.12,.72,.2,1)","models":"the baren's stroke: it bites at once, rubs out along the block, stops","dur":{"ack":160,"morph":320,"absorb":900}},"texture":{"tile":"derive:fibre(img:15@x0-96,y288-384)","blend":"soft-light"}}
{"r":"scenes","list":[["m0","overture","The verdict",100],["m1","plot-state","The scale",100],["m2","plot-state","The commitment",100],["m3","plot-state","The population",100],["m4","plot-state","The tail",100],["m5","coda","After the axis",140],["m6","reading-room","The article",0]]}
{"r":"scene","id":"m0","kind":"overture","name":"The verdict","claim":"there is nothing worth taking into account","lede":"He was seventy-three when he wrote that, and he had fifteen years left. The sentence keeps counting: eighty-six, ninety, a hundred, a hundred and ten. Three of the eight ages fall after the end of his life.","note":"Colophon to One Hundred Views of Mount Fuji, 1834 - p18","refs":["q:1","p18"],"surface":"full","density":"sparse","ground":"sheet","aside":{"kind":"signature-column","items":"names:*","tail":"twenty-two more the article never names","ref":"p4"}}
{"r":"scene","id":"m1","kind":"plot-state","name":"The scale","claim":"His scale, drawn. Nothing on it yet.","lede":"The graph is his sentence and nothing else - eight attainments, eight ages. Three of them fall after the end of his life.","note":"Ages derived here, not stated there: a year in the article, less a birth of c. 1760.","refs":["q:1","p3"],"surface":"full","density":"sparse","ground":"sheet","plot":{"y":{"from":"q:1","kind":"ordinal-quotation","levels":[[6,"I had a passion for copying the form of things"],[50,"I have published many drawings"],[70,"of all I drew by my seventieth year there is nothing worth taking into account"],[73,"I partly understood the structure of animals, birds, insects and fishes"],[86,"I shall progress further"],[90,"I shall even further penetrate their secret meaning"],[100,"I shall perhaps truly have reached the level of the marvellous and divine"],[110,"each dot, each line will possess a life of its own"]],"verdict":70,"reached":88},"x":{"field":"age","from":0,"to":94,"label":"His age","note":"His birth is only supposed - 31 October 1760, p3 - so every age here carries that doubt.","derive":"year - 1760"},"ticks":[0,10,20,30,40,50,60,70,80,88]}}
{"r":"scene","id":"m2","kind":"plot-state","name":"The commitment","claim":"Where does this one go?","lede":"One print, no label, resting where nothing can be plotted: above every register, past the end of his life.","note":"A dot is less honest than a bar; turning ranges on gives every work the span the article actually states.","refs":["p16"],"surface":"full","density":"sparse","ground":"sheet","beat":"b1","toggle":{"id":"ranges","on":"Date ranges - on","off":"Date ranges - off","means":"show each work's stated span instead of its midpoint"}}
{"r":"scene","id":"m3","kind":"plot-state","name":"The population","claim":"Thirteen of the twenty-three dated works fall inside the years he wrote off.","lede":"He is said to have made thirty thousand works. Twenty-three of them carry a date, and all twenty-three are here. Ten more are named without one; they wait in the margin.","note":"A year y gives ages y-1761 to y-1760. Tap a register to keep only its works; tap a sheet for its working.","refs":["w:*","qty:5"],"items":"w:*","surface":"full","density":"dense","ground":"sheet","beat":null,"margin":{"title":"Named without a date","items":"w:undated","why-field":"note"},"overlay":{"kind":"name-ticks","items":"names:dated","means":"p4 - the names are how his life is divided"}}
{"r":"scene","id":"m4","kind":"plot-state","name":"The tail","claim":"He forecast three more attainments and reached none of them.","lede":"At ninety, at a hundred, at a hundred and ten. He died at eighty-eight, and no work stands in any of them.","note":"1849 - 1760 = 88. The last three registers are empty because the evidence is.","refs":["q:4","p22"],"surface":"full","density":"empty","ground":"ink","extend":{"x_to":116,"ticks":[0,20,40,60,70,88,100,110],"dur":900},"figure":{"ref":"img:00","place":"past-88","caption":"Hokusai as an old man - the article's lead image. It carries no caption at all."},"mark":{"kind":"forecast-vs-actual","at":88,"forecast":"q:1@86","actual":"q:4","label":"what he forecast for eighty-six"}}
{"r":"scene","id":"m5","kind":"coda","name":"After the axis","claim":"His scale ran out at a hundred and ten. The eclipse happens entirely outside the years he left himself room to comment on.","refs":["p23-p29"],"items":"c:posthumous","surface":"evidence","density":"sparse","ground":"sheet","axis":{"relabel":"Years after his death","zero":1849,"to":178},"accent":"this page's arithmetic","close":{"quote":"q:3","note":"Edgar Degas, who collected his woodcuts - p25."}}
{"r":"scene","id":"m6","kind":"reading-room","name":"The article","claim":"Hokusai","refs":["§0-§11"],"surface":"argument","density":"dense","ground":"sheet","folds":[{"label":"Thirty-six Views, and thirty thousand things","refs":["p1-p2"]},{"label":"Birth, thirty names, the bookshop, and the expulsion he called inspirational","refs":["p3-p8"]},{"label":"The Tawaraya years, the Daruma, Bakin, the Manga, and the Fuji series","refs":["p9-p16"]},{"label":"The hand scrolls, the studio fire, Obuse, and his deathbed","refs":["p19-p22"]},{"label":"The article's gallery - seventeen works, eight of them undated","refs":["§4"]},{"label":"Bracquemond, the Rousseau Service, Debussy, and the exhibitions","refs":["p23-p32"]}],"link-back":{"field":"works","to":"m3","means":"every named work opens its point on the plot"}}
{"r":"beat","id":"b1","type":"predict-place","scene":"m2","axis":"x","item":{"ref":"img:05","label":null,"alt":"An unlabelled print"},"ask":"Drag it to the age you think he made it.","truth":{"lo":68,"hi":72,"stated":"c. 1829-1832","from":"caption of img:05"},"reveal":{"claim":"He was between sixty-eight and seventy-two.","narr":"The bar crosses his line at seventy. The most reproduced image in the world was made inside the years its author wrote off.","low":"You put it at age {g}, which is inside them too.","high":"You put it at age {g}; his own answer is lower than that.","note":"c.1829-1832 (caption), less a birth of c.1760 (p3), gives ages 68-72."},"skip":"Skip the guess","after":{"set":{"ranges":true}}}
{"r":"env","id":"e0","scene":"m0","treatment":"dither","palette":["#DDD4C5","#9FB1C1"],"speed":0.055,"params":{"shape":"wave","type":"4x4","px":4.4,"scale":1.15},"why":"A woodblock has no continuous tone: at every point the ink is either laid or it is not. That is a dither, moving at the speed of a swell.","still":"last-frame"}
{"r":"env","id":"e1","scene":"m4","treatment":"grain-gradient","palette":["#0D0B06","#1C2739","#0A1017"],"speed":0.035,"params":{"shape":"wave","softness":0.8,"noise":0.55,"scale":1.1},"why":"The plate turns to sumi at eighty-eight; the grain drifts slowly enough to read as night rather than as an empty div.","still":"flat-ground"}
{"r":"end","endmatter":{"key":true,"rationale":[["Indigo","His voice, and nothing else. Sampled from the deep blue field of Fine Wind, Clear Morning."],["Vermilion, stamped","Posterity, and the arithmetic this page did that the article did not. A seal, never a tint of text."],["The sheet","The paper margin of the surimono Still Life, with its fibre kept rather than cleaned off. The rules are key-block lines, because a print outlines every region before it colours one."],["What is derived","Every age on the plot. The article gives years; the ages are years less a birth of c.1760, which the infobox itself calls supposed."]],"concordance":true}}
```

**Measured size of this spec: 14 records, 9,299 characters ≈ 2.6k tokens** (JSON runs ~3.5
chars/token; all 14 lines parse). Apollo's equivalent — 12 movements, 10 staves, 5 team colours, 4
environment moments — prices at roughly **3.6k**; Attention's at roughly **2.8k**, plus whatever an
`operate-model` beat eventually costs. All three sit inside D013's 0.5–4 s single-call budget at
streaming rates of ~80–150 tok/s, and the reader is reading scene 1 long before the last record
lands.

What the spec **does not** contain, and does not need to: any source prose (23 works × 60 words of
`sub` text, all 33 paragraphs, all 10 undated notes — the interpreter joins those from
`semantic.works` and `content-model.sections`), any font files, any hex it did not derive, the fold
apparatus, the inspector field list, the movement index, or the source footer.

---

## (d) Genre kits v0

A kit is: a scene-kind vocabulary, a layout engine, a default beat, material-derivation hooks, and
**a kill criterion** — the condition under which the kit must refuse itself and hand back to the
classifier, because a kit applied to a subject that does not have its structure is exactly the
"template with the subject poured into it" failure of §0.

### 1. `time-score` — proven (Apollo 11)
- **Provides:** one shared numeric axis (usually UTC) running down the page; 1–4 named lanes hung
  off it; blocks placed by true timestamp with collision-tied stacking; measured-silence marks that
  print their own duration; loss-of-signal / gap rendering; a true-time-vs-page-space minimap; a
  position readout that suppresses itself when there is nothing to measure; per-lane solo.
- **Parameters:** `lanes[]` (name, sub, colour role), `staves[]` (t0, t1, height, grid interval, or
  an alternate scale with anchors), block placement (`t` exact | `p` sequence-only), off-clock
  movements, the alert colour's reserved referents.
- **Material hooks:** ground and rule weight from the subject's own document class (a flight plan, a
  log, a score, a timetable); the apparatus register must be the register the *record* was set in;
  lane colours must come from a named table in the source, never invented.
- **Kill criterion:** fewer than ~12 events carrying a real timestamp, **or** only one actor. One
  lane on a time axis is a vertical timeline — the project's most-banned form (§1.2, §8). Fall back
  to `data-narrative` or to compressed chronology (date + two words per entry).

### 2. `quotation-axis-plot` — proven (Hokusai)
- **Provides:** a fixed, non-scrolling plate; a y-axis whose registers are verbatim source text; an
  x-axis of a derived quantity with its uncertainty stated inside the plot; items packed at true
  file aspect ratio into register rows; a verdict wash; a range/point toggle; register-as-filter;
  a margin for items the source names but does not quantify; an extension of the axis past the data;
  an inspector printing the derivation for each item.
- **Parameters:** the quotation and its `(level, text)` pairs, the x field and its derivation
  formula, tick sets per state, the margin's inclusion rule, the extension target.
- **Material hooks:** ground sampled from the artifacts being plotted (§6.5); one accent = the
  subject's own voice, one = the page's arithmetic; the item's paper/foxing left uncorrected (§6.6).
- **Kill criterion:** the y-axis is not supplied by the source as an ordinal scale. A y-axis the
  page invented is decoration, and the build collapses into a horizontal timeline — Hokusai's own
  CONCEPTS.md names this as the scrap-don't-patch condition. Also kill if <8 items can be placed.

### 3. `operable-mechanism` — proven (Attention)
- **Provides:** a chain of stations in causal order, one operation per station, each with a claim
  heading, a permanent colour taken from the source's own figures, an inline control at prose width
  (§3.6), a live readout, and the published section folded beneath it; a repeated diagram that
  accumulates (§4.5); a coda that changes scale.
- **Parameters:** the operation chain (name, fill, claim), the control set per station, the readout
  bindings, the computation kernel id, the figure crops and their overlay boxes.
- **Material hooks:** operation colours measured off the source's own figure files; the mathematics
  face from what the document actually compiled with; the one saturated colour reserved for what the
  source reserved it for.
- **Kill criterion:** the mechanism cannot be computed client-side from stated parameters in under
  ~5 ms per frame, **or** the source states outcomes but not the rule producing them. Simulating an
  unstated rule is fabricated evidence (§7.4). Fall back to `process-flow`.

### 4. `geographic-journey` — needed for Silk Road
- **Provides:** a route as the spine, drawn from `semantic.routes[].path` and `places[]`; scroll-bound
  advance along the *real* route with the reader setting the pace; establishing-slow vs incident-quick
  pacing; a per-segment claim; goods/ideas rendered as directional flows over the same geometry
  (`silk-road/semantic.json` has 10 routes, 48 places, 39 goods with `direction`, 11 ideas with
  `spread`); a "roam" mode from the first screen.
- **Parameters:** projection + bounds, route ordering, segment→section mapping, flow overlays
  (field, direction, weight), place labels present/absent, the coordinate-confidence marker.
- **Material hooks:** ground from a map or manuscript in the article's own image set; the line
  language (a caravan track is not a subway line); no basemap tiles — the geometry is drawn, so no
  external tile provider can inject imagery the source does not support.
- **Kill criterion:** fewer than ~6 resolvable places **or** no ordered path between them. Silk Road
  has `coordinates: null` at article level, so the kit must resolve places from `semantic.places`
  and refuse if <60% resolve. **Also killed by §5.7** if it ever becomes a camera flying a spline.
  Fall back to `data-narrative` (goods as a flow matrix) or `artifact-catalogue`.

### 5. `artifact-catalogue` — needed for image-dominant subjects
- **Provides:** a continuous surface of objects at true proportion, navigated on the axis the object
  is handled on (horizontal for sheets, vertical for scrolls, rotational for vessels); format
  families derived from real pixel dimensions; a position rule; full-bleed inspection with texture
  and damage intact and no caption where the object labels itself (§3.9); named absences rendered as
  ruled empty slots.
- **Parameters:** ordering axis (subject-matter groups, format, provenance — **each marked as
  editorial if not sourced**), band names, inspection scale, the absence list.
- **Material hooks:** ground sampled from the artifact's own substrate; the boundary language of the
  institution that holds them (an accession label, a mount, a vitrine card).
- **Kill criterion:** fewer than ~14 usable images, or images that *illustrate* rather than *are*
  the subject (a portrait of a person beside a chart is not a catalogue). Fall back to `column`
  prose with inline micro-evidence (§3.7).

### 6. `process-flow` — needed for Photosynthesis
- **Provides:** a cycle or chain where the *state of matter* is the spine, not time; conserved
  quantities tracked across stages (in / out / lost); one diagram re-shown with accumulation; a
  step-scoped scroll; per-stage claim + the source section folded beneath.
- **Parameters:** stage list with inputs/outputs, the conserved quantities and their units, the
  loop-closure point, which stages are contested.
- **Material hooks:** entity colours assigned once and never reassigned (§6.1) — for a biochemical
  subject these should come from the article's own diagrams; the drawing register must be single
  (§6.7): all flat-drawn or all photographic, never mixed.
- **Kill criterion:** the source gives stage *names* but not what passes between them. A flow diagram
  whose arrows carry nothing the source states is decoration. Photosynthesis passes (Z scheme, water
  photolysis, Calvin cycle all state their exchanges); a "history of X" article does not. Fall back
  to `process-flow`→`column` with a single accumulating diagram.

### 7. `data-narrative` — the surprise-first kit
- **Provides:** prediction before reveal against the *full* distribution (never a stat tile); the
  encoding taught in the headline (§6.2); a reproduced source table set in the source's own rule
  language; the estimate's own uncertainty narrated in the running voice (§7.3).
- **Parameters:** the two axes and their scales (log where the data is log), the record set, the
  hidden record(s), the reveal claims, the caveat quote.
- **Material hooks:** the table's rule weights from the source's own typesetting; the "ours vs
  theirs" mark applied to every computed value.
- **Kill criterion:** no counter-intuitive value — if the reveal is what a reader would have guessed,
  the beat is theatre. Requires ≥5 comparable records with ≥1 outlier of ≥3× on one axis.

**Candidate 8, held back:** `versioned-identity` (proposed in `hokusai/CONCEPTS.md` appendix — a
registry with a slot per version including undocumented blanks, where selection re-renders the whole
page). Not built, so not a v0 kit; it is the strongest candidate for kit #8 because two benchmark
subjects (Hokusai, Ada Lovelace) have the signal.

**Kit selection is a client-side score, not a model call** — see (e). The model's job is to *reject*
the top candidate if it knows better, and it says so in one field (`meta.structure`).

---

## (e) Client-side derivation — everything computable with NO model call

All of these run in the extension in the deterministic <500 ms window (D013 stage 2), before the
model call returns, and their outputs are (i) applied directly to the instant stage and (ii) fed to
the model as a compact digest so it never spends tokens re-deriving what a canvas can measure.

| Function | Input | Output | Notes |
|---|---|---|---|
| `samplePalette(img, opts)` | decoded image, `{gridN, marginBand, k}` | `{dominant:[{hex,share}], margin:{hex,sigma}, coord:{x,y,w,h}, provenance:"file@x..y.."}` | k-means or median-cut over a downscaled canvas + a separate **margin band** pass, because §6.5's ground is the *substrate*, not the picture: Hokusai's `#DDD4C5` came from `x0-96 y288-384` of a print, not from its dominant colour. Returns the provenance string the spec is required to carry (§6.10). |
| `groundCandidates(images)` | all lead+gallery images | ranked `[{hex, from, sigma, contrastWith:[inks]}]` | Rejects any hex inside the banned bands of §6.9 unless the sample coordinate is real; flags "no material ground → use white and say so." |
| `fibreTile(img, coord)` | image + coordinate | a seamless high-passed tile (data URL) | The `derive:fibre(...)` ref. Preserves §6.6's evidence-of-substrate without shipping an asset. |
| `imageCensus(contentModel, mediaList)` | both files | `{n, lead, byAspect:{[bucket]:[idx]}, families:[{ratio,count}], perImage:[{idx,w,h,ratio,dominant,section_id,caption}]}` | Aspect families are file-verifiable and cost nothing — the fact that Hokusai's gallery contains 11 landscape sheets, 6 upright, 2 square panels and 2 extreme verticals is a *design input*, and it is arithmetic. Also yields the dominant-colour plate for C12's zero-layout-shift first paint. |
| `infoboxToTable(infobox)` | `content-model.infobox` | `{rows:[{label, value, type: date|quantity|place|person|link|text, parsed}], sceneCandidate:bool}` | Types by regex + unit table. An infobox with ≥6 typed rows is a `table` scene the model never has to describe. |
| `structureSignals(cm, semantic)` | Content Model + semantic layer | `{words, sections, prosePerSection, dateDensity, timestampCount, coordCount, placeCount, routeCount, equationCount, tableCount, worksCount, quoteCount, quantityCount, imageRatio, imageIsSubject, listRatio, contestedMarkers}` | Pure counting. `dateDensity` = dated items ÷ 1000 words; `imageIsSubject` = share of images whose caption names the subject as author/maker rather than as depiction. |
| `classifyGenre(signals)` | above | `[{kit, score, killed:bool, reason}]` ranked | Each kit's kill criterion from (d) expressed as a predicate over `signals`. Output goes into the prompt as ~40 tokens; the model may override with a stated reason. |
| `surfaceBudget(cm)` | Content Model | `{sourceBodyWords, surfaceCeiling: 0.35*words, wpvTarget:[150,300], viewportEstimate}` | §4.11 becomes a computed constraint the interpreter can *enforce* at render time (truncate to fold, never to nothing). |
| `typeScale(body, steps, ratioProfile)` | body size + count | `[sizes]` with per-size `{lineHeight, tracking}` | Implements the §2.3/§2.4 tables and §2.5's uneven stepping so the model emits 7 numbers and the chassis fixes the rest. Also validates display:body ≥6×. |
| `contrastFloor(ink, ground, size)` | two hexes | `{ratio, pass, nearestPassing}` | Never lets a sampled palette ship an unreadable pairing; the *sample* is kept and darkened one step, exactly as `scale.css:47` records for `--sumi-thin`. |
| `foldGroups(sections)` | sections | `[{label:"p9–p16", refs, paragraphs, words}]` | Mechanical fold *ranges*. The model supplies only the human label; if it does not, the chassis prints the range. |
| `quoteRank(semantic.quotes)` | quotes | ranked by `{isFirstPerson, hasNumbers, isOrdinalSeries, length}` | Detects the Hokusai case — a quotation that is secretly a scale — which is what makes kit #2 selectable at all. |
| `numberSpine(semantic)` | chronology + quantities | `{field, min, max, unit, coverage}` per candidate axis | Proposes the x-axis and its derivation (`year − birth`), so the model confirms rather than invents. |
| `absenceSet(semantic, images)` | works/places vs images | `[{name, ref, why:"named, no image"|"named, no date"}]` | The "ruled empty slot" both Hokusai and the artifact kit depend on. Absence is sourced data and it is free. |

**Digest sent to the model:** roughly 250–400 tokens — signals, ranked kits, 3 ground candidates
with provenance, the image census summary, the top 5 ranked quotes, the number-spine candidates,
and the surface budget. That is what makes a 2–3k-token spec sufficient.

---

## (f) The streaming protocol

Records are emitted in the order below and the interpreter renders each on arrival. Nothing is
buffered waiting for a closing brace.

| Phase | t (target) | Source | What renders |
|---|---|---|---|
| 0 · **stage** | ≤100 ms | none (built) | Full-viewport takeover; title, lede, and section skeleton typeset from the DOM; original page preserved. Already shipped (`extension/takeover.js`). |
| 1 · **derivation** | ≤500 ms | client (e) | Ground, ink and the fibre tile applied; images reserved at true aspect with dominant-colour plates; infobox table built; movement index stubbed from section titles. **The page is already defensible here** — it has a sampled ground and a real composition. |
| 2 · **head** (`meta` + `materials`) | 0.8–1.5 s | model | Faces swap in (subset woff2 from the vendored table), the two measures set, the type scale and easing applied, entry line ("~9 min · skip to the article") printed. One reflow, budgeted, before any scene body exists. |
| 3 · **scene list** | +~0.2 s | model | Movement index becomes real; scroll space is reserved per `vh` so nothing below jumps as bodies arrive; the position instrument starts reporting. |
| 4 · **scene bodies, in reading order** | 1.5–4 s | model | Each scene hydrates in place: claim, lede, items joined from the Content Model, folds wired. **Reading can begin at scene 1 while scene 5 is still streaming.** |
| 5 · **beat + env** | last | model | The beat mounts (until it does, its scene shows its *resolved* state — see fallbacks); environment moments register with the IntersectionObserver and mount only when their scene is on screen. |
| 6 · **end matter** | after `end`, or on idle | client | Reading room, folds, reference lists, concordance, rationale table, source footer — all built from the Content Model, costing zero model tokens. |
| 7 · **async enhancement + cache** | 7 s+ | model/client | Optional second pass (a bespoke beat upgrade, better fold labels, a re-derived palette from a larger image). Spec + derivation digest cached by URL + content hash; repeat visit is phase 0→6 with no model call, <1 s. |

**Why this order.** Materials before scenes because a face swap after five scenes have rendered is a
visible re-typeset; the scene *list* before scene *bodies* because reserved scroll space is what
makes streaming feel like loading rather than jumping; the beat last because it is the only record
whose absence is invisible (a `predict-place` beat that never arrives leaves a chart that is simply
already correct).

### Failure fallbacks

| Failure | Behaviour |
|---|---|
| No model, no key, call fails | Phases 0+1+6 only. Sampled ground, true-aspect evidence, infobox table, full reading room with folds. This is the floor and it is a real page. |
| `meta` or `materials` malformed | Discard both, keep client-derived materials, continue reading subsequent records. The experience loses its art direction, not its structure. |
| Unknown `kind` / `treatment` / `beat.type` | Degrade by table: unknown scene kind → `column`; unknown treatment → `none`; unknown beat → drop. Never guess. |
| Unresolvable `ref` | Invalidate **that record only**; if a scene loses >50% of its refs, skip the scene. Reading flow is preserved because the scene list already reserved its space — the reserve collapses with an animation-free height change. |
| Scene fails schema | Skip; log to the rationale block as `scene {id} withheld`. The reader is told, in end matter, not on the surface (§5.9). |
| Stream truncated mid-record | Drop the partial line; render `end` implicitly; every remaining listed scene collapses into the reading room, which contains all of the content anyway. |
| Two beats emitted | Keep the first, drop the rest (§5.6). |
| >4 env records, or an env on a `column` scene | Keep the first 4, and only on `plate`/`overture`/`coda`/`plot-state` scenes (§5.8's ceremonial-placement clause). |
| No WebGL / `prefers-reduced-motion` / user pause | The three separate paths of C8/C15: flat ground, still frame, stopped rAF. Independent, never conflated. |
| Budget breach (surface words > ceiling) | The chassis folds the overflow into `until-found` blocks rather than deleting it (§7.5), and records the breach in end matter. |

---

## (g) Honest gap analysis

### How much of each build could a v0 interpreter reproduce?

Measured as *structure* (scenes, mechanics, reading experience) and separately as *surface craft*
(the details a critic scores under rubric #14/#15).

| Build | Structure | Craft | What a v0 interpreter gets | What it cannot |
|---|---|---|---|---|
| **Hokusai** | **~80%** | ~65% | The whole plate: eight registers from the quotation, the verdict wash, the age axis with its uncertainty note, 23 works packed at true aspect, the undated margin, register-as-filter, the ranges toggle, the axis extension to 110, the inspector with derived-age working, both env moments, the reading room, the endmatter rationale. | The **row-packing algorithm at true aspect with per-register overflow** (`scale.js:227–333`) is chassis-able but is genuinely ~150 lines of geometry; the **range bar that steps between registers when a span crosses a level** (`:308–332`); the portrait placed *in the years he did not get* at the truncation; the seal glyph stamped off-register (`scale.css:120–140`); the vertical signature column with kanji. Roughly: the plot engine is kit work, the *four bespoke ornaments* are not. |
| **Apollo 11** | **~55%** | ~45% | Lanes on a shared axis, blocks placed by timestamp, tied collision stacking, the movement index, the suppressing readout, solo, until-found bodies, the minimap's two rails, the shift bands, four env moments, the reading key and nine-slot table. | The **piecewise-log altitude scale** (`score.js:37–72`) and the whole `alt` stave mode; **loss-of-signal hatching** derived from "48 minutes of each orbit" (`:549–642`); the **measured-silence marks that print their own duration** (`:462–505`); the **propellant gauge that only decreases**; the **fork** and the **dispersal diagram** (`:675–780`); the thesis SVG. Five bespoke instruments, each a real argument. Apollo is the *most* bespoke of the three and its number is the honest ceiling for a v0 kit on a complex subject. |
| **Attention** | **~45%** | ~40% | The station chain with per-operation fills, claim headings, folds carrying every published section, the figure overlays, the reproduced Table 2 in the paper's rule language, the `predict-place` beat on the cost plane (already a kit beat), the coda's claim structure, the end matter. | **The entire computational core** — a seeded 9-token model, QKV projections, real dot products, live softmax under a divisor slider, the mask, eight heads, the positional formula evaluated at 64 dimensions (`divide.js:26–125, 215–395`). Both environment moments are *pictures of that computation*, so they go too. Without a kernel, the stations become annotated figures: correct, much less alive. |

**Weighted honest answer: a v0 interpreter reproduces about 60% of the structure and 50% of the
craft of these three builds** — which is the right target, because the offline Opus factory is what
closes the remaining gap, permanently, by turning each bespoke thing into a kit parameter.

### What is genuinely unspecifiable

1. **Custom computation** (Attention's model; Apollo's orbital blackout pattern). A spec can name a
   kernel; it cannot invent one at 100 tok/s, and a model *writing* the kernel at runtime violates
   D013's "compose, don't write."
2. **Bespoke geometry that carries an argument** (the range bar stepping across registers; the
   dispersal fan; the fork). These are drawings whose shape *is* a claim.
3. **The one ornament per experience that nobody would derive twice** (the registration mark, the
   stamped seal, the reversed-out filled header cell). Reproducible as a parameter *only after*
   someone builds it once.

### Mitigation paths, in order of leverage

- **Kit-ification over time.** Every offline Opus build ends by asking: which of this build's
  bespoke parts is a *parameter* of an existing kit? Hokusai's register filter was Apollo's solo
  with a different handle; nobody noticed until this document. The factory's real output is kits.
- **A kernel library, not kernel generation.** ~10 pure functions covering the recurring shapes:
  softmax/normalise, matrix product, weighted mean, exponential/log growth, sinusoid bank, orbital
  period, piecewise-log scale, interval overlap, great-circle path, mass balance. `operate-model`
  then becomes specifiable (`"kernel":"softmax-row"`), and the kill criterion is "no kernel matches."
- **Async enhancement (D013 phase 7).** The runtime ships the kit version at 7 s; a second,
  slower call may upgrade exactly one beat afterwards. The reader never waits for it.
- **Precomputation into the Content Model.** Anything derivable client-side (e) should be, and
  anything derivable *offline per benchmark* should be cached — the benchmark suite is the corpus
  the factory tunes against, so its digests can be prebuilt and diffed.
- **Refuse loudly.** Every kill criterion in (d) is a mitigation: a kit that refuses itself produces
  a plainer, correct page. A kit that does not refuse produces the template failure §0 exists to
  prevent, and that is the more expensive outcome.

### Build plan — interpreter milestones, ordered by leverage

| M | Milestone | Why here | Done when |
|---|---|---|---|
| **M0** | **Chassis extraction + the re-derivation test.** Pull C1–C15 out of the three builds into one module set. Hand-write three specs (Hokusai's is in (c)) and render them through the interpreter. | Nothing else can be trusted until the chassis provably regenerates what already shipped. It also *measures* the (g) percentages instead of estimating them. | Screenshot diff vs `screenshots/` at 1440×900 and 390×844; the reproduction % is a number, not a guess. |
| **M1** | **Client derivation + instant-stage upgrade** ((e), phases 0–1). | Runs with **no model at all**, improves every future run, and sets the failure floor. Highest leverage per line of code. | The extension produces a sampled-ground, true-aspect, folded reading page for all 7 benchmarks offline. |
| **M2** | **NDJSON validator + streaming renderer**, with `column`/`plate`/`reading-room` only. | Makes the whole protocol testable before any kit exists; the fallback table in (f) is exercised first, not last. | Truncated, malformed and hostile specs all produce a readable page; no uncaught exceptions. |
| **M3** | **Kit: `quotation-axis-plot`.** | The plot engine (axis + registers + true-aspect packing + filter) is shared by kits 1, 2, 4 and 7 — building it here pays for four kits. | Hokusai renders from spec at ≥75% structural fidelity. |
| **M4** | **Beat: `predict-place`, then `isolate-subset`, `scrub-state`, `inspect-artifact`.** | `predict-place` alone covers a signature moment in 2 of 3 shipped builds. | Hokusai m2 and Attention m9 both run from `{"r":"beat"}` records. |
| **M5** | **Env module + palette derivation end-to-end.** | The atmosphere program (D012) is what separates this from a document, and C8 is already identical in all three builds. | 2–4 moments per experience, one live context, all three fallbacks verified with WebGL disabled. |
| **M6** | **Kit: `time-score`.** | The hardest proven kit; deferred until the chassis and plot engine are solid. | Apollo renders from spec at ≥50%, with its five bespoke instruments explicitly listed as gaps. |
| **M7** | **Kernel library + `operate-model`.** | Unlocks the third proven genre and the interactive-math benchmark (Fourier). | Attention's divisor slider runs from a spec record. |
| **M8** | **New kits against the benchmark suite:** `geographic-journey` (Silk Road), `process-flow` (Photosynthesis), `artifact-catalogue`, `data-narrative`. | The suite exists to prove structural difference; four new kits is what makes 7/7 subjects produce 7 different pages. | Sibling diff (§9.11) passes across all 7. |
| **M9** | **Cache + async enhancement + regenerate affordance.** | Repeat-visit <1 s and the "reinterpret" button are product surface, not proof surface. | D013's full latency ladder measured end-to-end. |

---

## Open questions for v1

1. Should `materials` be *two* records (grounds/inks first, so the ground can paint at 0.8 s, then
   type/motion) — probably yes, and it costs nothing.
2. Does the model ever need to emit CSS-shaped values, or should every visual value be a token key
   the chassis resolves? Current answer: hexes and numbers yes, selectors never.
3. Where does the **thesis trace** (§9.14) run — as a client-side check over scene claims, or as a
   second model call? Cheapest defensible answer: client-side, flagging scenes whose claim shares no
   content word with the thesis, reported in end matter.
4. `versioned-identity` as kit #8, and whether Ada Lovelace triggers it.
5. Whether the surface-budget breach should truncate or fold. Currently folds — deletion is the one
   thing §7.5 forbids.
