# Anti-Signature — how to stop looking like a model made it

Companion to `DESIGN_PRINCIPLES.md`. That document says *how to design well*. This one says *how to avoid designing well in the one particular way a language model designs well*, which is a different and harder problem.

The provoking evidence is internal. Apollo 11 (`experiences/apollo-11/score.css`) and Hokusai (`experiences/hokusai/scale.css`) were art-directed independently, from different subjects, with different structural concepts — and converged:

| decision | Apollo 11 | Hokusai | Δ |
|---|---|---|---|
| page ground | `#EDE8DE` | `#EFE7D6` | 3 / 5 / 8 per channel |
| body ink | `#1A1712` | `#1B1815` | ~identical |
| hairline | `rgba(26,23,18,.18)` ≈ `#D5D0C6` | `#B9AE99` | same role, same weight |
| narration | IBM Plex Serif 17px / 1.62 | Newsreader 19px / 1.6 | same register |
| apparatus | Plex Mono 10.5–11px, UC, `+.04–.06em` | Space Mono 10.5px, UC, `+.09em` | the same class, renamed |
| measures | 640 / 1100 | 660 / 1240 | ±3% / ±12% |
| one reserved alert red | `#BE2A17` | `#B23A22` | 12 / 16 / 11 |
| one dark-plate inversion | yes | `#16130F`, movement 4 | same beat |
| easing | `cubic-bezier(.4,0,.2,1)` | `cubic-bezier(.4,0,.2,1)` | identical (this is Material Design's standard curve) |

Two subjects 160 years and 380,000 km apart produced the same stylesheet. Each decision has a defence. The set has none.

The external confirmation is worse. Anthropic's own published frontend-design guidance names three generic clusters that models fall into "regardless of subject":

1. *"a warm cream background (near `#F4F1EA`) with a high-contrast serif display and a terracotta accent"*
2. *"a near-black background with a single bright acid-green or vermilion accent"*
3. *"a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns"*

Hokusai is cluster 1. Apollo is cluster 3 with cluster 1's ground. Hokusai's movement-4 ink plate is cluster 2. We did not escape the signature; we produced a compendium of it. Reference: [Anthropic frontend-design skill](https://mcpservers.org/agent-skills/anthropic/frontend-design), [Claude Cookbook: prompting for frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics).

A note on the mechanism, because it changes what the fix has to be. The first-generation tell (purple gradients, Inter, four rounded cards) is what a model produces when it is not trying. **The second-generation tell — bone paper, serif + mono, hairlines, muted restraint — is what a model produces when it *is* trying.** It is the model's model of taste. That is why it survives instructions like "make it tasteful", "make it editorial", "don't make it look AI-generated", and why it survived our entire principles document. Nothing in `DESIGN_PRINCIPLES.md` catches it; several rules in it *prescribe* it (§(e) below).

---

## (a) Detection checklist

25 checkable tells. Each has a **default** reading (the model reaching for itself) and an **earned** reading (the same move, but the subject demanded it). The discipline is not to avoid the left column — some of these are genuinely the right answer sometimes — but to be able to state the right-column justification *with a citation to the subject's material record* before shipping.

The tells are individually weak and jointly decisive. Any one means nothing. Six from different groups means the model designed it.

### Group A — colour and material

| # | Tell | Default when… | Earned when… |
|---|---|---|---|
| **A1** | **Warm bone / cream ground** in the `#E8E2D6`–`#F6F2EA` band | It's "paper" in the abstract; it was picked because white felt harsh and cream felt considered; the hex was typed, not sampled | The hex is **sampled from a named artifact** in `assets/`, with the file and coordinate recorded — and the sample actually landed there. *Most real paper is not this colour.* 1969 NASA bond is near-white `#F7F6F3`; kōzo washi is a greyer buff with visible fibre; newsprint is `#E8E4DA` but with a cyan cast; vellum is yellower and blotchy |
| **A2** | **Terracotta / clay / rust accent** in the `#C2603C`–`#D9805C` band | It is "the warm accent". This is Anthropic's own brand accent (`#d97757`) and the single most-cited AI tell in 2026 designer discourse | The subject's world contains that exact pigment as a *material* — red lead, cinnabar, seal vermilion, Mars red, safety-red — and it is used at that material's real saturation and in that material's real role (a stamp, a warning, a rubric), not as a tint of text |
| **A3** | **Nothing above ~40% saturation anywhere on the page** | "Muted", "restrained", "sophisticated" were the operative words. Restraint applied uniformly is not restraint, it is a beige monoculture | The artifact class is genuinely low-chroma (silver gelatin, graphite, microfilm) — and even then, one element breaks it, because real low-chroma worlds contain exactly one saturated thing (the red china-marker, the safety placard, the seal) |
| **A4** | **Indigo / violet gradient**, on white or on dark | Tailwind's `indigo-500` leaking through the training set. First-generation tell; still the fastest disqualifier | Effectively never for our subjects. If the subject is literally about violet (a spectroscopy article, an aniline-dye article) then it is a *flat measured wavelength colour*, not a gradient |
| **A5** | **Near-black ground + one acid accent** (`#0A0A0A` + lime / cyan / vermilion) | "Technical", "cinematic", "premium". Cluster 2 | The subject's own viewing condition is dark — deep sea, night sky, a darkroom, a CRT, an X-ray light box — and the accent is the actual emission colour of the actual instrument (P1 phosphor green `#33FF33`, not "acid green") |
| **A6** | **Colours named for moods** in the token layer: `--sage`, `--dusty-rose`, `--warm-sand`, `--bone` | The palette was chosen and then rationalised | Colours named for **things**: `--white-team`, `--seal-vermilion`, `--phosphor`, `--kentō-registration-black`. A palette you can only name by mood is a palette you did not derive |
| **A7** | **A neutral ramp doing all the hierarchy work** (5–8 opacities of one ink) | Contrast is being manufactured from a single hue because no second hue was ever committed to | The subject is genuinely monochrome-with-tonal-range — an aizuri-e print, a mezzotint, a fax. Note this *is* legitimate more often than A1–A5; the failure is doing it *and* A1 *and* A3 |

### Group B — typography

| # | Tell | Default when… | Earned when… |
|---|---|---|---|
| **B1** | **The shortlist faces**: Inter, Roboto (gen 1); Space Grotesk, Fraunces, Playfair, Newsreader, Crimson Pro, Satoshi, Cabinet Grotesk, Bricolage Grotesque, IBM Plex, JetBrains Mono, Space Mono (gen 2) | The face is on a published "distinctive fonts" list. **Both our experiences fail this outright** — Newsreader, Space Mono and IBM Plex are all named on the shortlist in Anthropic's own cookbook. Being told a font is "distinctive" is exactly what makes it not | The face **was in the subject's world**, or is the closest available revival of a face that was: Futura/Spartan for Apollo hardware, a typewriter face for Apollo paperwork, Helvetica for post-1975 NASA identity, a Didone for a 19th-c. broadsheet, DIN for German engineering, a Song/Ming face for a Chinese subject |
| **B2** | **Serif narration + monospace micro-label** | This is *the* second-generation pairing — literally §2.1 Split C of our own principles. Paul Bakaus lists "monospace for hacker vibe" among the not-so-obvious AI tells | The subject's record contains monospaced or machine-set text: teleprinter tape, line-printer output, punched cards, telex, a mainframe listing, subtitles, a ledger. If your subject is a woodblock printer, nothing in his world was ever monospaced |
| **B3** | **Uppercase letterspaced eyebrow above every heading** (10–11px, `+.06–.15em`) | The "eyebrow-label plague": every section announced by a kicker. Nothing is allowed to just exist. Our Apollo page does this on effectively every block (`THE CONSOLE`, `TWO MEN MOVE ACROSS`, `THE RHYTHM BEGINS`) | The label carries **information the heading does not** — a timestamp, a source id, a state — and it appears on *some* blocks, not all. Test: delete every eyebrow. If nothing is lost, they were decoration |
| **B4** | **Giant ghosted section numerals** (`01`, `02`, `04` at 100px+, low opacity) | Numbering used indiscriminately. Apollo's `04 THE SPLIT` | The content actually *is* an ordered sequence where the reader needs the ordinal — and then the numeral should be at the weight the subject's own documents number things (a flight plan numbers pages `1-9`, not `01`) |
| **B5** | **Every number set in monospace with `tabular-nums`** | Numbers-as-aesthetic. Mono makes any digit look like data | The digits are **compared vertically** (a column, a timeline, a ledger). A date in running prose is prose |
| **B6** | **Display tracking at −0.06 to −0.09em** | A learned reflex applied to any large type on any face. It flatters grotesks and destroys transitionals | Measured against the actual face at the actual size, and different for the two families |
| **B7** | **Italic serif for the editorial aside** | The "authored voice" costume. Both our pages do it | The subject's documents distinguish a voice typographically in that way — an editor's note, a gloss, a translator's interpolation |
| **B8** | **Exactly two families, one serif one mono, presented as restraint** | The restraint is real; the *pair* is the default. Two families is a good rule that has one overwhelmingly likely solution | The two families are a **specific historical pair** the subject implies (Univers + typewriter; Helvetica + Courier; Times + Franklin; a Ming face + a Latin gothic), and swapping either breaks the reference |
| **B9** | **Body 17–19px, leading 1.60, measure 640–680px** | Every one of these is the median of the "good typography" distribution. Ours: 17/1.62/640 and 19/1.6/660 | The measure follows the source format: an ōban sheet is 25×38cm at a fixed ratio; a flight plan page is US Letter with a defined text block; a broadsheet column is 11 picas |

### Group C — structure and composition

| # | Tell | Default when… | Earned when… |
|---|---|---|---|
| **C1** | **Hairline rules + whitespace as the *only* separation strategy** | "Quiet luxury". Cluster 3. Our §3.2 mandates it. It is the single most reliable second-generation tell because it reads as rigour | The subject's documents separate with hairlines. **They usually don't.** Flight plans, ledgers, timetables, census forms, catalogue raisonnés, TV listings and newspapers separate with *boxes and heavy rules*, at 1.5–3px, often with filled header cells |
| **C2** | **Zero border-radius everywhere, announced as discipline** | It is a reaction against a previous default, which makes it the current default | The subject's world has square corners (metal panels, letterpress furniture, punch cards). If the subject's world is rounded — a CRT bezel, a Bakelite dial, a manga panel, a seal — round it |
| **C3** | **One long vertical scroll spine with a sticky micro-header readout** | The one layout a model can hold in its head. Both our pages | The subject genuinely has one continuous axis (a mission clock, a river, a lifetime) and the readout is *the subject's own instrument*, not a UI convention |
| **C4** | **Metadata rail in the right or left margin, in mono, at 10px** | Apparatus-as-decoration | The document class has margins that carried real marginalia — revision letters, censor seals, folio numbers, a librarian's stamp |
| **C5** | **Uniform section padding / even vertical rhythm** | Metronome pacing. Already banned by §4.1, and correctly | — |
| **C6** | **3- or 4-card grid with uniform radius** | Gen-1 slop. We don't do this | — |
| **C7** | **Everything reading left-to-right, top-to-bottom, on a Latin baseline grid** | The default that is invisible *because* it is the substrate. Our Hokusai page is Latin-horizontal throughout for a subject whose every text object read right-to-left in vertical columns | The subject's own reading axis was adopted, or its refusal is stated |
| **C8** | **Generous margins with an empty optical centre** | §3.3 was an escape from the centred hero. Applied twice it is now our signature, not our escape | — |

### Group D — motion, effect, language

| # | Tell | Default when… | Earned when… |
|---|---|---|---|
| **D1** | **`cubic-bezier(.4,0,.2,1)` at 300–900ms** | Material Design's standard curve. Both our pages, identical. An easing curve is a physical claim and this one claims "a well-damped UI panel" | The curve models the subject's physics — a clock escapement is a hard stop; a brush stroke decelerates; a spacecraft burn is linear-in, hard-out; a woodblock press is instantaneous |
| **D2** | **Scroll-triggered fade-up on everything** | Banned already (§5.3) | — |
| **D3** | **Scroll-bound camera along a 3D spline** | Banned already (§5.7) | — |
| **D4** | **Exactly one dark-plate environmental inversion** | §4.4 says "exactly one", so every experience has exactly one, in the same place, doing the same job | The inversion *is* an event in the subject — the far side of the Moon, nightfall, a power cut, the darkroom |
| **D5** | **Copy in the em-dash appositive rhythm** — "not X, but Y"; "This isn't a T, it's a U"; the triple-clause build | The prose has the same fingerprint as the layout. A page can be typographically escaped and still read as generated | The cadence belongs to the subject's own documents or is plainly the writer's |
| **D6** | **Copy that announces its own restraint** ("Read here as a score", "silence is drawn") | The design explaining itself is the design not doing its job | The line is doing navigational work the visual cannot |

### How to run it

Score each of the 25 as default / earned / n-a. **≥6 "default" across ≥3 groups is a blocking Genericness failure.** Then run the sibling diff (§(d), proposed §9.11), which is the only check that catches convergence *across* experiences rather than within one.

---

## (b) Deriving from the subject

**The method in one sentence: go to the physical record the subject actually left — the documents, instruments, substrates and surfaces through which it existed — measure that record's graphic properties, and let the measurements set the ground, the type, the rules, the grid and the motion, so that every value on the page has a citation instead of a justification.**

The inversion this forces: you do not choose a palette and defend it. You *find* a palette and are stuck with it. If the derived palette makes you uncomfortable — if it is too white, too saturated, too crowded, too ugly — that is the strongest available evidence that you derived rather than defaulted. Comfort is the smell of the prior.

### The protocol

**1. Name the artifact class.** Not "space exploration" — *"the Apollo 11 Flight Plan, Final, 1 July 1969, Flight Planning Branch, MSC Houston"*. Not "Japanese art" — *"an ōban nishiki-e sheet, c. 1831, published by Nishimuraya Yohachi"*. If you cannot name a specific object, you have no derivation, and every subsequent decision is taste.

**2. Inventory it against a fixed schema.** Every row must be answered from evidence — a scan, a photograph, a spec, a colour measurement — not from imagination:

| slot | question |
|---|---|
| substrate | what was it *on*? what colour is that material actually, measured? what texture, what damage? |
| marking | how was the mark made? ink, toner, phosphor, pigment, graphite, embroidery? opaque or transparent? |
| letterforms | what typeface, lettering or script was literally used? by whom, in what year, at what size? |
| boundary | how are regions separated — rules, boxes, gutters, folds, frames, seals, nothing? at what weight? |
| reading axis | which way does it read? in how many columns? is the axis of navigation the same as the axis of reading? |
| numerals | what did the numbers look like, and were they for comparing or for stating? |
| the one colour | what single colour carried meaning, and what did it mean? |
| the format | what are its real proportions, and does the proportion mean anything? |
| the mistakes | what irregularity is intrinsic — mis-registration, handwritten corrections, foxing, over-inking? |

**3. Convert each slot to exactly one web decision** and record the provenance next to it. One slot, one decision. If a slot produces no decision, say so.

**4. Falsify.** For each decision ask: *would this be wrong for a different subject?* Warm cream is not wrong for anything, which is why it is worthless. A green-bar fanfold grid is wrong for Hokusai, which is why it is worth something for Fortran.

### Worked examples

**1. Apollo 11 → the flight plan and the mission rules → white bond, ruled boxes, Futura and a typewriter.**
The material record: US-Letter bond, near-white, offset/mimeo; body content is **all-caps monospaced typewriter set inside ruled table cells** (see the Mission Rules and Flight Plan scans — `screenshots/references2/` and `archive.org/details/apollo-11-flight-plan`); page numbers as `1-9`; hand-written corrections expected and instructed; headings in a geometric sans. Hardware: Futura/Spartan on the plaque, the food labels, the cabin placards, the switch panels ([Fonts In Use, Apollo 11](https://fontsinuse.com/uses/56966/nasa-apollo-11-mission)). Mission Control: the plotboards, the eyebrow lights, the DSKY's green numeric readout, the five flight-director team colours. NASA identity is Helvetica + `#FC3D21` red — but from **1975**, six years late, and using it for a 1969 subject is an anachronism worth either refusing or making explicit ([NASA Graphics Standards Manual](https://standardsmanual.com/products/nasa-graphics-standards-manual)).
→ Ground: near-white bond, not cream. Separation: **ruled cells with filled header rows**, 1.5px, because that is how the document actually organises time. Display: geometric sans (Futura/Spartan lineage), not a humanist serif. Apparatus: a real typewriter face, all-caps, because the source is literally typewritten — this is the case where B2's monospace is *earned*, and it should be the whole body, not a 10px label register. Narration: the one register the source doesn't have, so it must be *visibly imported* and marked as ours. Colour: the five team colours (which we already derived correctly) plus one saturated warning red for the 1201/1202 alarms. Motion: the clock advances linearly and nothing else moves.

**2. Hokusai → an ōban nishiki-e sheet → key-block black, flat opaque colour, washi, a vertical signature column, and one seal-red.**
The material record: kōzo washi, handmade, fibrous, a greyish buff that varies across the sheet; **an `omohan` key block prints the black outline first**, and every colour is a separate block of flat, opaque, unmodulated ink; `bokashi` is the only gradient, hand-wiped, banded, and always stopping hard at the block edge; `kentō` registration marks and their occasional mis-registration; Prussian blue arriving in the 1820s and enabling `aizuri-e`; a red publisher's seal at lower left and a censor's seal upper right; the artist's signature and art-name in a **vertical right-to-left column inside the image field**; ōban ≈ 25×38 cm ([Asian Art Museum: the ukiyo-e process](https://education.asianart.org/resources/the-ukiyo-e-woodblock-printing-process/), [Aizuri-e](https://en.wikipedia.org/wiki/Aizuri-e), [Bokashi](https://en.wikipedia.org/wiki/Bokashi_(printing))).
→ Ground: **sampled from the actual washi margin of an actual asset file**, with fibre and unevenness preserved (§6.6 already requires this and we ignored it). Boundary: a **black key line**, not a grey hairline — every region on the page outlined the way every region on a print is outlined. Colour: flat and opaque; no `rgba()` tints of the ink for hierarchy, because a print has no opacity; gradients only as hard-stopped bokashi bands. Type: the apparatus register is a **seal and a catalogue entry**, not a terminal — red stamped marks for provenance, dense accession-style Latin for the museum voice. Reading axis: the narrative column can be vertical right-to-left at least once, because that is where the signature lives and the reader should have to meet it. The one colour: seal vermilion at full saturation, used *only* as a stamp. Blue is Hokusai's, correctly, but it should be the sampled print blue laid down flat, not a `--blue` used for text tint.
Note the trap: our vermilion `#B23A22` is simultaneously **correct** (seal red) and **the default** (terracotta accent). The resolution is not to abandon it but to commit past the default's comfort zone — a real seal is `#D8332B`-ish, opaque, stamped, slightly off-register, not a 15%-tinted text colour.

**3. A cholera / epidemiology article → MMWR and the 1854 Broad Street map → white, Helvetica caps, ruled tables, black tally-bars on a lithographed street plan.**
Material record: CDC's *MMWR* is white, two-column, Helvetica/Times, epi-week tables with heavy header rules and a single spot colour; John Snow's map is a black-line lithograph with black bar-stacks at each address.
→ Grid is the **epi-week column**, not a scroll. Ground white. The map is a line lithograph, not a tile layer. Cream would be a costume borrowed from a different century.

**4. A punk / zine subculture article → a photocopied A4 zine → toner grey, ransom-note collage, staples, mis-registration.**
Material record: 2nd-generation photocopy on 80gsm, toner speckle and drop-out, Letraset, typewriter, torn edges, screenprint or risograph in two hard spot colours off-register.
→ Ground: photocopy white with speckle. Type: whatever was at hand, degraded. Separation: torn edges, staples, tape. **Keep the mis-registration** — this is the clearest case of *awkwardness preserved on purpose*, which is precisely the quality no model volunteers.

**5. A programming language (ALGOL 60 / Fortran) → the punched card and the line printer → 80 columns and green-bar fanfold.**
Material record: an 80-column card; a 132-column line printer on 14⅞″ fanfold with alternating pale-green bands; the ALGOL report's italic metavariables against upright terminals.
→ **The grid literally is 80 columns.** Ground is green-bar. Monospace is not a register here, it is the substrate; the *serif* becomes the marked, imported voice. This is the subject where our default stylesheet would accidentally be right — which is the point: it is right for one subject in fifty.

**6. A deep-sea organism → the ROV frame and the Challenger plates → black water, a hard spotlight cone, and 1880s lithographic plates.**
Material record: ROV video at 4,000 m is near-black with a hard-edged white cone and colour reproduction that collapses to blue-green; the *Challenger* Report plates are hand-coloured lithographs on white with engraved captions.
→ Cluster 2's dark ground is **earned**, and the accent is the instrument's colour temperature, not "acid green". Two worlds, therefore two grounds and the inversion between them is a real event (surface / depth), satisfying §4.4 for a reason rather than by rule.

**7. A cathedral → the mason's mark, the rubricated manuscript, the 1:100 plan.**
Material record: black textura with **red rubrics and initials**; the measured plan drawn as a bay grid with dimension lines; leading and glass; stone in one measured local colour.
→ Layout is the **bay grid of the plan**, repeating with variation. Red appears only where a rubric would. Two columns with hanging initials. Nothing about this is cream, minimal or muted.

### The traditions, as calibration

Not to copy — to recalibrate what "committed" feels like, because the model's internal sense of "committed" is set at about a third of a real designer's.

- **Swiss / International.** Commitment = one saturated colour at full strength across a huge area, one tightly-set grotesk, a grid with visible modules, and no warmth. See `screenshots/references2/lars-muller-publishers-swiss.png`: fluorescent yellow at display size over a photograph, and a violet cookie banner that would fail every "restraint" heuristic we have. *Apollo in this spirit:* NASA red at full `#FC3D21` on white, Futura/Univers, everything on a hard 12-column module with the time axis as a visible ruled grid. No cream, no hairline, no serif.
- **The Standards Manual house style** (`screenshots/references2/nasa-graphics-standards-manual-reissue.png`). White, not cream. Rules at 2–3px, not hairlines. One red. Monospace used for specifications *because the publisher's subject is specifications*. This is the same three ingredients as our Apollo page, tuned to commitment instead of comfort — and it looks nothing like ours.
- **Brutalist web** (`screenshots/references2/brutalist-websites-index.png`, [brutalist-web.design](https://brutalist-web.design/)). Commitment = honesty of materials: default link blue, system faces, 1–2px black borders, no shadows, no radius, and *no atmosphere*. Its lesson for us is not the look but the ethic — every visual element is load-bearing or absent. *Hokusai in this spirit:* the prints at full size on a plain ground, with the accession data as unstyled text, and nothing between the reader and the sheet.
- **Japanese editorial and institutional web** (`asahi-shimbun-jp.png`, `tokyo-national-museum-jp.png`). Commitment = **density as respect for the reader**, mixed script textures doing the work Latin uses italic for, colour and rules for emphasis rather than weight, tategaki reserved as a heritage signal. Real Japanese pages are crowded, boxed, and use saturated red freely — the opposite of the "Japanese = minimal, muted, empty" cliché that our Hokusai palette is unconsciously reproducing. *Hokusai in this spirit:* a dense right-to-left index of all 30+ names and all 26 works, small type, boxed, red-marked, that a Western eye reads as "too much" and a reader finds faster than our scroll.
- **Risograph / print revival** (`hato-press-riso.png`). Commitment = two spot inks, deliberately out of register, with paper showing through the overprint. Colour comes from *ink limits*, not a palette tool. The mis-registration is the signature and cleaning it up destroys it.
- **Terminal / BBS.** Commitment = a real phosphor colour, a real character cell, a fixed 80×24 frame, and content that is genuinely fixed-width. The 2026 "Technical Mono" revival is listed as a *counter-movement* by trend writers and as a *tell* by working designers — both are right. **A tradition becomes a tell the moment it is adopted without its constraint.** Monospace without a character grid is costume.
- **Bloomberg Businessweek under Richard Turley.** Commitment = "noble failure" — pressing an idea until 40–50% of attempts fail and shipping the rest anyway. Neue Haas Grotesk at absurd sizes, colour that clashes on purpose, infographics that break their own conventions. The transferable move is *tolerating awkwardness*, which is the precise quality a model optimises away.
- **David Rudnick-era graphic discourse** (`david-rudnick-portfolio.png`). Commitment = the typeface *is* the argument; custom letterforms built for one project; the reference system is specific and non-obvious. The lesson: a face chosen from a list is a face that carries no argument.

---

## (c) Our two designs, audited

Sources: `screenshots/apollo-final/desktop-s00-y0.png`, `desktop-s04-y16030.png`; `experiences/apollo-11/score.css`; `experiences/hokusai/scale.css` and `CONCEPTS.md`. Hokusai has no rendered screenshots yet — this audit is from its stylesheet and concept document, which already fix the signature before a pixel is drawn.

### Apollo 11 — *Three Bodies*

**Earned, and genuinely strong.** The structural concept is the best thing either experience has done and is not available to any other subject: three staves on one shared clock, derived from a fact the article buries in a subordinate clause (48 minutes of radio silence per orbit, thirty times). Silence drawn as absence of mark. The five flight-director team colours taken from the article's own table — that is a real derivation, correctly executed, and it is exactly the method §(b) describes. Reserving `--alert` for the 1201/1202 alarms and Luna 15 and nothing else. Tabular numerals on timestamps that are read as a column. The `MET` / `UTC` dual readout, which is the mission's own instrument. The `p77 · infobox` provenance marks. The refusal to autoplay.

**Default, wearing a derivation's clothes.**
- `--paper:#EDE8DE /* 1969 flight-plan paper */` — the comment asserts a provenance the artifact does not support. The flight plan is near-white bond with black rules and *boxed* cells. This is the cleanest case in the repo of the default reaching for itself and then labelling itself as research. **A1.**
- IBM Plex Serif as the narrative voice. Plex is IBM's 2017 corporate typeface, sits on the published "distinctive fonts" shortlist, and has no relation to 1969 NASA documents. IBM's actual 1969 presence at Houston was the System/360 and its line-printer output — which argues for a printer face, not a humanist serif. **B1, B2.**
- Three Plex family members (Serif, Sans Condensed, Mono). Defensible as a superfamily, but it is §2.1's two-family rule being satisfied on a technicality, and the *reason* it feels safe is that Plex is designed to be tasteful in any combination. **B8.**
- Hairlines and whitespace with zero boxes, on a subject whose entire documentary world is boxes. §3.2 overrode the artifact. **C1.**
- Uppercase letterspaced eyebrows above nearly every block. **B3.**
- The ghosted `04` at ~100px. Flight plans number pages `1-9`. **B4.**
- Italic serif asides; `cubic-bezier(.4,0,.2,1)`; one dark inversion; one hue for the whole page. **B7, D1, D4, A3.**

Verdict: **the structure is designed, the surface is defaulted.** The page would survive having its entire visual layer replaced by a derived one, and would be much better for it. Concretely: white ground, ruled cells with filled headers, Futura/Spartan display, a typewriter face for the source register with the serif reserved and marked as *our* voice, NASA red at full saturation for alarms only.

### Hokusai — *Nothing Before Seventy*

**Earned, and conceptually the more ambitious of the two.** The colophon-as-y-axis is subject-supplied in the first person and the article never uses it — this is the best structural derivation the project has produced. Format families read off real pixel dimensions. Names-as-versioning with a knowably incomplete registry. Blue = Hokusai / vermilion = posterity as a two-speaker code. The refusal to *name* Prussian blue while sampling the blue is exactly the right truth call.

**Default.**
- `--bone:#EFE7D6`. Three to eight per channel from Apollo's ground, for a completely different material. Washi is greyer, more variable, and fibrous; §6.5 says derive the ground from the artifact and §6.6 says preserve its texture — we did neither, and instead landed on the documented AI cream band. **A1.**
- Newsreader and Space Mono. Both on the published shortlist. Space Mono is the worse offence: **nothing in Hokusai's world was ever monospaced.** The instrumentation register was not derived, it was inherited from Apollo. **B1, B2.**
- `.mono{font-size:10.5px;letter-spacing:.09em;text-transform:uppercase}` is structurally the same declaration as Apollo's `.micro`. Two subjects, one apparatus register. **B3.**
- `--verm:#B23A22` — right role, default value. Commit harder (see §(b) worked example 2). **A2.**
- Hierarchy built from `rgba()` tints of ink (`--mute`, `--hair`) — a print has no opacity. Every colour in a nishiki-e is flat and full. **A7.**
- `#16130F` ink plate for movement 4 because §4.4 permits exactly one inversion. Is the inversion an event in Hokusai's life, or a beat the rulebook allocates? **D4.**
- Latin, horizontal, left-aligned, throughout. **C7.**
- Same easing curve, same two measures, same `100svh` sticky plate. **D1, C3.**

Verdict: **the concept is unrepeatable and the skin is interchangeable.** The Hokusai stylesheet could be applied to Apollo, and Apollo's to Hokusai, with a hue swap. That is the definition of the failure the mission is trying to avoid — and it happened while every individual rule in `DESIGN_PRINCIPLES.md` was being obeyed.

---

## (d) Proposed amendments to `DESIGN_PRINCIPLES.md`

Not applied — proposed. Section numbers refer to the current v0.1.

**§0 — add a second test beside the swap test.**
> **0.2 The derivation test.** For each of ground, display face, body face, accent colour, rule weight, grid, and reading axis, name the artifact the value came from and where it was measured. A value you can only justify ("it felt right for the subject", "paper suits it") is a default. A value you can cite ("sampled from `assets/05-great-wave.jpg` at the sheet margin, x=40 y=1180") is a derivation. The swap test catches a layout that fits any subject; the derivation test catches a *palette and typography* that fit any subject, which is the failure the swap test misses.

**§1 — new 1.4.**
> **1.4 MUST — inventory the material record before any visual decision.** Name a specific artifact class (a document, an instrument, a substrate) and answer the nine-slot schema in `ANTI_SIGNATURE.md` §(b) from evidence. Record it in the experience's metadata as `material_record`. No colour, face, rule weight or grid may be chosen before this exists.

**§2.1 — amend.**
> Add: **at least one of the two families MUST be traceable to the subject's material record** — the face actually used, its documented revival, or the face of the subject's period and discipline. A family chosen because it is a good typeface is a failure. Faces named on published "distinctive font" lists (Inter, Roboto, Space Grotesk, Fraunces, Playfair, Newsreader, Crimson Pro, Satoshi, Cabinet Grotesk, Bricolage Grotesque, IBM Plex, JetBrains Mono, Space Mono) are **presumed default** and require an explicit material citation to use.
> Add: Split C (serif author / monospace machine) is **retired as a default option** — see §2.6.

**§2.6 — downgrade from SHOULD to CONDITIONAL. This is the single most signature-encoding rule in the document.**
> **2.6 CONDITIONAL — a monospace micro-label register is permitted only when the subject's material record contains monospaced or machine-set text** (teleprinter, line printer, punched card, telex, ledger, subtitle, terminal). Otherwise the apparatus register MUST be derived from how the subject's own world marked apparatus: a stamped seal, a rubric, an accession number, a marginal annotation, a stencil, a caption in the catalogue's own face. Monospace without a character grid is costume.
> Add: **no more than one apparatus marker per block.** A section may not be introduced by an eyebrow label *and* a numeral *and* a rule. Delete every eyebrow label; reinstate only those whose deletion lost information.

**§2.4 — amend the tracking table.**
> Add: the `≤11px uppercase +.06–.12em` row describes the eyebrow-label tell and must not be read as licence to apply it everywhere. Display tracking must be measured against the chosen face at the chosen size, not taken from the table.

**§3.1 / §3.2 — amend both.**
> **3.1** Add: zero radius is required only where the subject's world has square corners. Where the subject's objects are round (a bezel, a dial, a seal, a lens, a manga panel), reproduce the radius the object has, at the object's proportion — not 4px/8px.
> **3.2** Amend to: separate the way the subject's own documents separate. **If the material record is boxed, ruled or gridded — tables, forms, ledgers, timetables, catalogues, print sheets with a key-block outline — reproduce that boundary language at its real weight**, including filled header cells and 1.5–3px rules. Hairlines-and-whitespace is the *fallback* for subjects with no documented boundary language, not the house style. As written, §3.2 is cluster 3 of the AI signature stated as a rule.

**§4.4 — amend.**
> Add: the inversion MUST correspond to an event in the subject. "Exactly one inversion" is a ceiling, not a quota; an experience with no such event has no inversion.

**§5.1 — add a row and a rule.**
> Add: **the easing curve is a physical claim and must be derived.** `cubic-bezier(.4,0,.2,1)` (Material Design's standard curve) is banned as a default; state what the chosen curve models — an escapement's hard stop, a brush's deceleration, a burn's linear ramp, a press's instant.

**§6.3 — amend.**
> Add: **at least one large-area colour MUST be at ≥50% saturation, or every ground MUST be sampled from a named artifact with a recorded provenance.** A page whose every colour sits below 40% saturation fails Genericness regardless of how well the greys are tuned. Muted-throughout is not restraint; it is the absence of a decision.

**§6 — new 6.9 and 6.10.**
> **6.9 MUST — the default palette bands are prohibited without provenance.** Grounds in `#E8E2D6`–`#F6F2EA` (warm bone/cream) and accents in `#C2603C`–`#D9805C` (terracotta/clay) are the documented model-default cluster and may be used only when sampled from a named artifact file with a recorded coordinate. Likewise `#0A0A0A` + a single acid accent, and any violet/indigo gradient.
> **6.10 MUST — the ground is sampled, not chosen.** Record `ground_provenance: {file, coordinate | citation}` in the experience metadata. If the subject has no material ground, use white and say so.

**§8 — add to the banned table.**

| Banned | Why | Instead |
|---|---|---|
| Warm bone ground + serif narration + monospace micro-labels | The documented second-generation AI signature; both shipped experiences converged on it independently | Derive ground (§6.10) and apparatus register (§2.6) from the material record |
| Uppercase letterspaced eyebrow above every heading | Nothing is allowed to simply exist; the most-cited 2026 tell | One apparatus marker per block, carrying information the heading lacks (§2.6) |
| Giant ghosted section numerals (`01`, `04`) | Sequence asserted where sequence isn't read | Number the way the subject's documents number (§2.6) |
| Every colour below 40% saturation | Averaging presented as taste | ≥50% somewhere, or full provenance (§6.3) |
| A single terracotta/clay accent | Anthropic's own brand accent; the most recognisable single value in AI output | A pigment the subject's world actually contains, at its real saturation (§6.9) |
| `cubic-bezier(.4,0,.2,1)` | Material Design's default curve, shipped in both experiences | A curve that models the subject's physics (§5.1) |
| Latin-horizontal reading axis for a non-Latin subject, unremarked | The invisible default | Adopt the subject's axis at least once, or state the refusal (§(a) C7) |

**§9 — new pre-ship checks 11–13.**
> **11. Sibling diff (machine check).** Diff this experience's CSS custom properties against every previously shipped experience. If ground, ink, hairline, body size, body leading, apparatus-label construction and both measures all fall within 5% of a prior experience, **that is a blocking failure** regardless of how well each value is individually justified. This is the only check that catches convergence across experiences; nothing in v0.1 does.
> **12. Derivation citation audit.** Ground, display face, body face, accent, rule weight, grid, reading axis — seven provenance lines, each naming an artifact. Any missing line is a default.
> **13. Anti-signature score.** Run `ANTI_SIGNATURE.md` §(a). ≥6 "default" tells across ≥3 groups blocks.

---

## (e) Which current principles encode the signature

Named honestly, worst first. These are not bad rules; they are rules derived from six sites (Shopify Editions, Ciechanowski, The Pudding, Stripe Press, Linear, By-Kin) that share one taste, one decade and one anglophone tech-editorial milieu. `DESIGN_PRINCIPLES.md` §0 says "the subject decides the form", and then §§2–6 hand the form over in advance.

1. **§2.6 — the monospace micro-label register. The most guilty rule in the document.** It is stated as a universal ("carrying *all* metadata") and it is exactly Bakaus's "monospace for hacker vibe" plus the eyebrow-label plague, fused into one mandate. It produced identical apparatus registers in two unrelated experiences. It also does real work — it is our cheapest provenance mechanism (§7.1) — which is why it survived. Fix: keep the *function* (a distinct provenance register), derive the *form* per subject.
2. **§2.1 Splits A and C — serif narration + sans/mono instrumentation.** This is verbatim the second-generation AI pairing. Presented as three options, but A and C are the same idea and B is rarely chosen; the rule has one likely solution.
3. **§3.1 + §3.2 — zero radius, hairlines and whitespace, no containers.** Together these *are* cluster 3 of the documented AI signature ("hairline rules, zero border-radius, dense newspaper-like columns"), written as MUSTs. §3.2 actively overrode the Apollo artifact, which is boxed and ruled.
4. **§6.3 + §6.5, read together.** §6.5 (derive the ground from the artifact) is the best rule in the document and points straight at the right method. But paired with §6.3's three-flat-grounds ceiling and the general restraint posture, both experiences read it as "the ground is a warm paper" — which is a *prior about what artifacts look like*, not a measurement. §6.3 also has no saturation floor, so "≤3 grounds" reliably becomes "≤3 beiges".
5. **§2.7 — the heading may be quieter than the body.** Quiet-luxury restraint as a rule. Fine as a Ciechanowski-specific finding for long-form reading; corrosive as a general posture, because it teaches that lower contrast is more considered.
6. **§3.3 — corner-anchored, empty optical centre.** Written as an escape from the centred hero. Applied twice, it has become our own centred hero: a signature, not an escape.
7. **§4.4 — exactly one environmental inversion.** A quota, so every experience gets one, in roughly the same place, doing the same job. Ceiling, not quota.
8. **§2.3 / §2.4 / §2.8 / §2.9 — the measured tables.** Individually correct and worth keeping; collectively they converge every page onto 17–19px / 1.6 / 640–680px / ~1100px, which is where our two pages landed within 3%. The numbers are the median of good typography, and the median of good typography is a fingerprint. They need a per-subject override clause tied to the source format.
9. **§8's ban list is aimed at the wrong generation.** It bans purple gradients, glassmorphism, uniform cards, emoji icons, neon dark mode — the 2023 signature, which our pipeline would never produce. It contains **nothing** that would have caught either of our actual designs. That is the central gap this document exists to close.
10. **The evidence base itself.** Six references, all 2019–2026, all Anglo-American, all in the "considered editorial tech" register, none from outside a Latin script, none dense, none saturated, none awkward. `INSPIRATION.md` needs entries that would *break* the current rules: a Japanese newspaper, a Swiss poster at full chroma, a risograph zine, a government form, a 19th-century catalogue raisonné, Bloomberg Businessweek. Until the reference set is diverse, the rules derived from it will keep producing one page.

---

### Sources

[Anthropic frontend-design skill](https://mcpservers.org/agent-skills/anthropic/frontend-design) · [Claude Cookbook: prompting for frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics) · [Paul Bakaus, AI slop design tells](https://www.linkedin.com/posts/paulbakaus_ai-slop-design-tells-design-anti-patterns-activity-7416272383017164800-10DR) · [Why every AI-built website looks the same (Tailwind indigo-500)](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p) · [AI Slop Web Design guide](https://www.925studios.co/blog/ai-slop-web-design-guide) · [The telltale signs of AI web design](https://inspirestudio.app/blog/the-telltale-signs-of-ai-web-design) · [How to spot AI-generated design](https://uxplanet.org/how-to-spot-ai-generated-design-697aaabe76c8) · [Aesthetics in the AI era: 2026 trends](https://medium.com/design-bootcamp/aesthetics-in-the-ai-era-visual-web-design-trends-for-2026-5a0f75a10e98) · [NASA Graphics Standards Manual](https://standardsmanual.com/products/nasa-graphics-standards-manual) · [Apollo 11 Flight Plan (Internet Archive)](https://archive.org/details/apollo-11-flight-plan) · [Fonts In Use: NASA Apollo 11 mission](https://fontsinuse.com/uses/56966/nasa-apollo-11-mission) · [Asian Art Museum: the ukiyo-e printing process](https://education.asianart.org/resources/the-ukiyo-e-woodblock-printing-process/) · [Aizuri-e](https://en.wikipedia.org/wiki/Aizuri-e) · [Bokashi (printing)](https://en.wikipedia.org/wiki/Bokashi_(printing)) · [Brutalist Web Design](https://brutalist-web.design/) · [brutalistwebsites.com](https://brutalistwebsites.com/) · [Japanese web design style guide](https://www.utsubo.com/blog/japanese-web-design-style-guide) · [Eye Magazine on Bloomberg Businessweek](https://eyemagazine.com/feature/article/taking-care-of-business) · [Richard Turley interview](https://www.designboom.com/design/richard-turley-bloomberg-businessweek-interview/)

Reference screenshots captured for this research: `screenshots/references2/` (18 sites — NASA Standards Manual, Apollo flight-plan reissue, brutalistwebsites, Letterform Archive, Tokyo National Museum, teamLab, Asahi Shimbun, MIT Tech Review, Lars Müller, Hato Press, Neocities, textfiles.com, ukiyo-e.org, Bloomberg Businessweek, David Rudnick, Are.na, Pentagram).
