# Editorial Doctrine v0.1 — Omission, Subordination, and the Information Narrative

Companion to `DESIGN_PRINCIPLES.md`. Where that document governs **form**, this one governs
**what is allowed to exist**. It exists because rubric #16 (Information narrative & omission)
and #17 (Boldness) are currently the two dimensions our builds fail most quietly: a page can
score well on typography, motion and colour while still being an annotated copy of a Wikipedia
article. Restraint in *pixels* is not restraint in *content*, and we have been achieving only
the first.

Rules are numbered `E1`–`E14` so critiques can cite them. `MUST` = blocking. `SHOULD` = needs a
stated reason.

---

## 0. The evidence base

Measurements taken for this document (2026-08-16, Chromium 1440×900, `tools/measure-surface.mjs`,
`tools/shoot-refs3.mjs`; captures in `screenshots/references3/`):

| Page | Height | Surface words | Words / viewport | Words hidden by default |
|---|---:|---:|---:|---:|
| apple.com/macbook-pro | 42,149 px (46.8 vp) | 8,639 | **184** | 54.0% |
| pudding.cool/2018/08/pockets | 10,950 px (12.2 vp) | 2,490 | **205** | 25.0% |
| **en.wikipedia.org/wiki/Apollo_11** | 41,091 px (45.7 vp) | 25,424 | **557** | 8.4% |
| **our `experiences/apollo-11`** | 45,879 px (51.0 vp) | 12,899 | **253** | 23.9% (4,050 w) |

And the number that motivated this document:

> The Apollo 11 source article contains **13,633 words** of body prose and quotation
> (`benchmarks/apollo-11/content-model.json`, 39 sections).
> Our retelling's **surface carries 12,899 words — 94.6% of it.**
> We did not choose what matters. We re-typeset everything and called the restraint "design."

Non-web doctrine drawn on below: the V&A's *Gallery Text at the V&A: A Ten Point Guide*
(Lucy Trench, 2011) — the single best short document on this problem in any field;
Beverly Serrell's *Exhibit Labels: An Interpretive Approach*; Tufte's data-ink principles;
Poynter/WSJ on the nut graf; Steve Audette (PBS *Frontline*) on documentary cutting;
Tony Zhou & Taylor Ramos' *Postmortem: Every Frame a Painting*; The Pudding's
*Continue, Pivot, or Put it Down*; Nielsen on progressive disclosure; and — pointedly —
Wikipedia's own `MOS:INFOBOXPURPOSE`. Full links in §5.

---

## 1. (a) The omission doctrine

### E1 — MUST: one thesis, in Serrell's form, before anything is designed.

An experience carries exactly one **thesis**: *a complete, active sentence naming a subject,
an action, and a consequence, in 25 words or fewer.* This is Serrell's "Big Idea," and the
grammar is the test — a phrase with no verb is a topic, not a thesis, and topics cannot
adjudicate cuts.

Two corroborating practices. Audette keeps a literal plumb line in the edit suite as "a visual
metaphor of the straight line of the narrative," and cuts by a single rule: *"If the scene
you're considering cutting does not change the straight line of our protagonist, then it can be
cut."* Zhou and Ramos wrote each essay's premise on flashcards, arranged them on a table, and
tested combinations "until finding the strongest throughline" — then Zhou memorised the whole
argument in order, unaided. Their summary of what has to survive under any styling: *"you gotta
have steel in the walls."*

**Falsification test:** if no informed reader could disagree with your thesis, you have written
a category, not a claim. "Apollo 11 was the first crewed Moon landing" is a definition.
"No one saw Apollo 11 whole" is a thesis.

### E2 — MUST: the surface budget is fixed in numbers before a word is placed.

Declare, in the experience metadata, *before* composition:
total surface words; words per viewport; total viewports; number of plates; number of labels;
number of surface photographs. Then write to fit.

The V&A is unambiguous that the constraint is what produces quality, not what limits it:
*"If you write over-length, the text simply won't fit and will have to be cut at proof stage… These
word limits don't restrict the amount of information that most visitors absorb. Instead, they
increase it. In a gallery or exhibition, less really is more."*

Calibration from the measurements above: **150–250 words per 900px viewport, hard ceiling 300.**
Apple runs 184; The Pudding 205. Wikipedia's 557 is the artifact we are replacing — if our
words-per-viewport is within 2× of the source article's, we have restyled it, not retold it.

### E3 — MUST: the surface may carry no more than 35% of the source's body prose.

This is the rule our Apollo build breaks worst (94.6%). The ratio has an external anchor: a full
V&A gallery of ~50 objects carries roughly 3,600 words of gallery text (one 150-word intro,
five 130–150-word section panels, fifty 50–60-word object labels) against a catalogue essay an
order of magnitude longer. The gallery is not an abridgement of the catalogue; it is a different
instrument with a different job.

The corollary is uncomfortable and load-bearing: **a retelling that is longer than the thing it
retells is not a retelling.** Our narration counts against the budget — it is not free.

### E4 — MUST: adopt a declared text hierarchy with per-unit word counts, and enforce it at layout.

Adapted from the V&A's hierarchy (A intro 130–150; B section panel 130–150; C theme panel
100–130; D sub-theme 70–80; E standard object label 50–60; F group label 70–80):

| Unit | Budget | Job |
|---|---|---|
| Opening statement | 130–180 w | The thesis, argued once. Not a summary of the article. |
| Movement/section intro | 100–150 w | The *message* of the movement (see E6), not its contents. |
| Block lede | 50–60 w | One claim, tied to one moment or object. |
| Caption | 25–40 w | A fact the image cannot carry (E8). |
| Micro-label | ≤ 4 words | Only where the design cannot show it (E5). |
| Provenance token | ≤ 12 characters | One per block, one register quieter than everything. |

The V&A's other hard-won detail, worth stealing verbatim: *"where possible the first sentence
should be under 16 words."*

### E5 — MUST: a label must contain information the design cannot show. Otherwise delete it.

This is Tufte's *erase redundant data-ink* applied to type. It is also why direct labelling beats
legends: a legend forces the eye to "bounce between the data points and the legend," paying an
eye-movement cost to recover a mapping the design could have stated in place.

The pathology is measurable. In `experiences/apollo-11/index.html`, of the 40 block labels that
sit directly above their own first sentence, **22 (55%) consist entirely of words already present
in that sentence**: `CONTACT` over *"A light informed Aldrin that at least one of the 67-inch
probes had touched…"*; `THE FLAG` over *"The astronauts planted the Lunar Flag Assembly…"*;
`RENDEZVOUS` over *"Eagle rendezvoused with Columbia at 21:24 UTC…"*. Each costs a line, a
register, and a beat of the reader's attention to deliver zero information.

**Named pathologies** (a critic may cite these by name):

| Name | Pattern | Fix |
|---|---|---|
| **The tautological label** | `TIMELINE` over a timeline; `CONTACT` over a sentence about contact | Delete. The design or the first clause already said it. |
| **The category header** | A header naming a bucket (`Personnel`, `Legacy`, `Preparations`) | Make a claim instead (E6) |
| **The describing caption** | Caption restates what is visible in the photograph | Add the fact the picture cannot carry (E8) |
| **The parallel apparatus column** | Every block carries a metadata token at label weight | One per block, one register quieter (E10) |
| **The legend box** | A key the reader must memorise before reading | Teach the encoding at first use (§6.2) |
| **The empty instrument** | Apparatus persisting where it has nothing to measure (a clock reading `——:——:——` after the clock stops) | Suppress the instrument, not just its value |
| **The double signature** | Label + source token + section name for one block | Choose one |

**When a label earns its place** — exactly four cases:
1. It carries an **encoding the design cannot express** (a unit, a scale, a datum: `T+13.2 s`).
2. It states the **claim** the block makes, and the block's prose does not (E6).
3. It marks a **register change** the reader must trust (generated vs. source — §7.1).
4. It is the **only handle** for navigation or search of a subordinated region.

### E6 — MUST: headers make claims; they do not name categories.

The V&A's panel-writing system is Topic → Theme → **Message**, where the message is phrased
*"When people have read this they will know…"*. Their worked example: topic *The camera*;
theme *its appearance, role, significance, expense*; message **"The camera was the most important
room in the house."** The panel is written to deliver the message. The header should carry it.

Wikipedia section titles are topics by construction (`Background`, `Legacy`, `Preparations`,
`Personnel`). **Reusing a Wikipedia section title as a heading in our output is a defect**, not a
neutral inheritance: it imports the coverage structure we were hired to replace.

### E7 — MUST: one idea per screen. A screen carrying two ideas carries neither.

Measured on apple.com/macbook-pro (`screenshots/references3/apple-*`): 46.8 viewports carrying
8,639 surface words, composed as one artifact plus one bolded claim plus one supporting clause
per plate. The bolded lead-in doing the header's job *inside* the sentence — "Liquid Glass.
Clearly inspired." — is the mechanism that lets the page ship no section headers at all.

### E8 — MUST: a caption adds; it does not describe.

Ogilvy's Audience Research Institute measurement — *twice as many people read the captions under
photographs as read the body copy* — makes the caption the most-read text on any page carrying
images. Spending the most-read slot on description is the single most wasteful move available.

Live failure, `screenshots/apollo-final/desktop-s11-y44083.png`: a full-bleed photograph of a girl
holding *The Washington Post*, headline plainly legible at 1440px, captioned
*"A girl holding The Washington Post: "'The Eagle Has Landed' – Two Men Walk on the Moon"."*
The caption transcribes what the reader can already read. This also violates the existing §3.9.

### E9 — SHOULD: apparatus is always at least one register quieter than the content it serves,
and never louder than the thing it points at.

Corollary to §2.6. A monospace micro-label register is *cheap*, which is precisely the danger:
it makes apparatus feel free. It is not free — it costs a line, a beat, and a decision.

### E10 — MUST: provenance is a layer, not a decoration.

§7.2 requires traceability visible without hover. It does not require a parallel column. The
Apollo build ships **83 provenance chips** (`p39`, `p40`, `p41 · p42`, `infobox`) at label weight
— roughly 200 tokens whose semantic content, for a reading pass, is *a paragraph ID the reader
cannot use*. Satisfy §7.2 with **one affordance per block**, quiet, plus a complete
source-to-block concordance in end matter.

### E11 — MUST: subordination means *hidden by default and reachable and searchable*.
Two levels maximum.

Nielsen: *"designs that go beyond 2 disclosure levels typically have low usability because users
often get lost when moving between the levels."* And the control must be *"labelled in a way that
sets clear expectations for what users will find."*

The mechanism matters more than the intent. `display:none` removes content from find-in-page and
converts subordination into deletion — CRITIQUE-B correctly scored this as "a comprehension cliff,
not a progressive-disclosure win." The Apollo build's current `hidden="until-found"` (4,050 words,
36 blocks) is the correct pattern and should be the house standard: browser-revealable, Ctrl+F
reachable, one level deep.

### E12 — MUST: uncertainty is content, not apparatus.

The V&A's fifth point is *Admit uncertainty*: *"There is no harm in showing the boundaries of our
knowledge. To do so dissolves the barrier between the 'expert' and the public."* Their rewrite
turns a hedge into a sentence — "Its history is a puzzle, but it may have been a gift…" — at full
label weight. This restates §7.3 with an editorial teeth: a hedge demoted into a smaller, greyer
register reads as a disclaimer and gets skipped. Hedges stay in the running voice at running size.

Applies to *our own* inference too. The Apollo build's inline `Derived: the article gives "48
minutes of each orbit"…` notes are correct in substance and wrong in placement — they are
methodology, and methodology is the subordinated layer's job.

### E13 — MUST: nothing is deleted; everything not brought forward gets a pointer.

The truth requirement (mission non-negotiable; rubric #16) is satisfied by **reachability, never
by surface parity**. Every source section is in exactly one of four states — surface, subordinated,
pointer-only, or *promoted into another section's argument* — and the mapping ships in the
experience metadata so a critic can audit it.

Wikipedia argues our side here. `MOS:INFOBOXPURPOSE`: *"The purpose of an infobox is to summarize,
but not supplant, the key facts that appear in an article… **The less information that an infobox
contains, the more effectively it serves its purpose.**"* The Apollo article ships a 41-row infobox
in flat rank order — the encyclopedia's own guideline, unenforced. And `WP:Disinfoboxes` names the
failure mode exactly: *"A box aggressively attracts the marginally literate eye with apparent
promises to contain a reductive summary of information; not all information can be so neatly
contained."* **Surface parity is the disease we were built to treat. Do not reproduce it in a nicer
typeface.**

### E14 — MUST: the content removal test, run before ship.

§5.6 applies the removal test to motion. Extend it to content: **delete the three surface elements
you are proudest of.** Re-read. If comprehension of the *thesis* is unchanged, they were decoration
and stay deleted. Then run the inverse — take the three heaviest surface sections and ask The
Pudding's question from *Continue, Pivot, or Put it Down*: *"Would someone else be interested in
hearing you talk about what you found?"* If the honest answer is "it's here because it was in the
article," it belongs in the subordinated or pointer layer.

Audette's blunt version of the same instinct, on behalf of the reader:
*"The mind cannot absorb what the butt cannot endure."*

---

## 2. (b) The Information Narrative method

Runs at the **art-direction stage**, after the Content Model exists and before any visual decision.
Output is an `information-narrative` block in the experience metadata that a critic can check.

### Step 1 — Mass table

Compute words per section from the Content Model and sort descending. This tells you where the
*article's* editorial priority sits. You are not obliged to agree with it, but you must know what
you are disagreeing with, and record the disagreement.

Apollo 11, top of the table: `Lunar surface operations` 1,566 · `Splashdown and quarantine` 1,247 ·
`Background` 1,143 · `Landing` 788 · `Lunar ascent` 763 · `Cultural significance` 652 ·
`Spacecraft` 587. Tail: 12 sections under 100 words, four with zero prose (pure containers).

### Step 2 — Thesis

Write it in Serrell's form (E1). Then run the falsification test and the **coverage test**: read
the mass table and ask which of the top sections the thesis *cannot* justify. Those are the
sections you will fight about; decide now, not at layout.

### Step 3 — Four-layer allocation

Score every section on two axes and place it on the grid.

- **Advancement** (0–3): how directly does this section carry the thesis?
- **Irreducibility** (0–3): does it lose its meaning when compressed? (A narrative moment scores
  high; a list of 22 tour cities scores 0 — it *is* a lookup table and compresses to an index line
  without loss.)

| | Irreducible | Compressible |
|---|---|---|
| **Advances thesis** | **Surface**, at length | **Surface**, compressed to a claim + one datum |
| **Off thesis** | **Subordinated** (searchable, one level) | **Pointer-only** (end-matter index line + source link) |

Two guardrails: the surface must obey E2/E3's budgets *after* allocation — if it does not, the
thesis is too broad, and the fix is a sharper thesis, not smaller type. And any section scoring
Advancement 3 that you nonetheless cannot fit is a signal your thesis has two arguments in it.

### Step 4 — Write the budget, then write to it

The metadata block:

```
thesis            one sentence, ≤25 words, subject + verb + consequence
surface_words     ≤ 0.35 × source body words
words_per_vp      150–250
viewports         surface_words ÷ words_per_vp
labels_max        ≈ 1 per 250 surface words
plates            ≥ 2 density inversions of ≥20:1 (§4.1)
provenance        1 affordance per block, quiet register
subordinated      hidden="until-found", one level, searchable
pointer_index     every remaining section, one line + source link
```

### Step 5 — Audit

Run the label audit (§3) and E14. Record the surface/subordinated/pointer mapping for every
source section so a critic can find a fact and check we did not lose it.

---

### Worked example — Apollo 11

**Thesis.** *No one saw Apollo 11 whole: crew, control room and watching world each held a
different, partial picture of the same eight days.* (23 words. Subject: Apollo 11. Action: held
partial pictures. Consequence: no one saw it whole.)

This is deliberately one notch wider than the shipped Concept A ("three bodies, one clock"), and
the widening is the editorial decision. Under the narrow thesis, four things currently on the
surface fail the advancement test — the dissent coda, the world tour, the memorabilia dispersal,
the films list. Under this thesis, **the dissent coda and the transmission chain become load-bearing
evidence** (the watching world's picture was a broadcast of a broadcast, degraded on purpose and
then taped over; the people at the gates held a different picture again), and the tour, memorabilia
and films become clean cuts. One thesis change resolves four arguments. That is what a thesis is for.

**Budget.** 13,633 source words → surface ceiling **4,800 w**; at 200 w/vp → **24 viewports**
(currently 51); labels **≤ 20** (currently 83); surface photographs **≤ 8**; legend boxes **0**.

**Allocation.**

| Layer | Sections | ≈ words | Share |
|---|---|---:|---:|
| **Surface** | rewritten lead (150) · `Background` compressed to the LOR decision + Luna 15's motive (250) · `Pre-launch` (150) · `Launch and flight` (250) · `Lunar descent` (450) · `Landing` (700) · `Lunar surface operations` incl. the whole transmission chain (800) · `Columbia in lunar orbit` in full — it is short and it is the proof (369) · `Lunar ascent` incl. Luna 15 adjacency (400) · `Return` (120) · `Splashdown` — the storm decision only (300) · `First-step decision` — four rival accounts, unresolved (200) · `Cultural significance` — reception and dissent (500) | **4,639** | 34% |
| **Subordinated** (`hidden="until-found"`, searchable, one level) | all six `Personnel` sections + their tables · `Site selection` · `Insignia` · `Call signs` · `Mementos` · the remainder of `Lunar surface operations`, `Splashdown`, `Background`, `Landing` · `Spacecraft` · `Moon rocks` · `Experiment results` · `Moonwalk camera` · `Eagle memorabilia` · the 41-row infobox as one retrievable table · **all of our own derivation notes** | ≈ 7,600 | 56% |
| **Pointer-only** (end-matter index, one line + `§` link each) | `Celebrations` · `World tour` · `Legacy` · `Anniversary events` · `40th` · `50th` · `Films and documentaries` · `Multimedia` | ≈ 1,400 | 10% |

**What I would cut from the surface that the current build keeps.**

1. **63 of the 83 block micro-labels.** 22 are provably tautological (E5). For the rest, the
   timestamp already identifies the block — position on the clock *is* the label, which was the
   concept's own claim. Keep labels only where they carry a datum or a claim the prose does not.
2. **All 83 provenance chips as a parallel column** → one quiet affordance per block plus a full
   concordance in end matter (E10).
3. **24 of the 25 repeated lane headers.** `HOUSTON / Mission Control Center` and
   `APOLLO 11 / Columbia + Eagle, docked` restate what lane position and colour already encode
   (§6.1). Keep the header at the split, and thereafter only where a lane's *occupancy changes* —
   which makes the header informative rather than decorative.
4. **The legend block** (`Timestamped · Sequence only · Loss of signal · Console · Red`). This is a
   legend box in a system whose §6.2 bans legend boxes and whose §8 lists them as a cliché. Teach
   each encoding at first use.
5. **The second clock.** The sticky header runs UTC *and* MET. One clock. And when the clock stops,
   suppress the instrument rather than showing `UTC —— ——:——:——` (the empty-instrument pathology).
6. **Two of the five metadata lines in each movement head.** `04 / THE SPLIT / 20 Jul 1969 /
   12:52:00 → 17:44:00 UTC / 04 h 52 m` — the date is implied by the range and the duration is
   derivable; both are already in the minimap.
7. **The inline `Derived:` methodology notes** → subordinated layer with a single marker (E12).
8. **The *Washington Post* caption** → replaced by the one fact the photograph cannot carry: its
   date (E8, §3.9).
9. **~5,000 words in Movements 0 and 8.** `Background`'s Sputnik/Mercury/Gemini history,
   `Personnel`, `Celebrations`, `World tour`, and the entire `Legacy` subtree currently sit on the
   surface in full at reading weight. Under the allocation above they are subordinated or
   pointer-only. This single cut is ~40% of the required reduction and it removes the two passages
   the build's own CONCEPTS.md flagged as "a dumping ground."
10. **The four zero-prose container sections** (`Personnel`, `Preparations`, `Films and
    documentaries`, `Multimedia`) as headings. They are Wikipedia's scaffolding, not content (E6).

**What I would *not* cut, against the instinct to trim evenly:** `Columbia in lunar orbit` (369 w)
stays whole and Collins' lane keeps its emptiness. It is the shortest mission section in the article
and the most direct proof of the thesis. Even cutting is not proportional cutting.

---

## 3. (c) Label audit — checklist for critics

Run over a rendered page. Report as `n passed / n total` plus every failure with its coordinates.
Any single MUST failure is blocking.

**Automated (cheap, run first)**

1. **Tautology test** *(MUST)* — for every label adjacent to prose, strip stopwords; if every
   remaining word appears in the block's first sentence, the label fails. Threshold: **0 failures**.
   (Our Apollo build: 22/40 = 55% fail.) Script pattern: the containment check in this document's
   §0 measurements.
2. **Label density** *(SHOULD)* — labels ≤ 1 per 250 surface words.
3. **Surface density** *(MUST)* — words per 900px viewport within 150–300 (E2).
4. **Surface ratio** *(MUST)* — surface words ≤ 35% of source body words (E3).
5. **Searchability** *(MUST)* — no subordinated prose behind `display:none`; Ctrl+F must reach 100%
   of retained text (E11).
6. **Disclosure depth** *(MUST)* — no content more than 2 levels from the surface.
7. **Duplicate-token scan** *(SHOULD)* — count repeated identical labels/headers; each repetition
   beyond the first must mark a state change.

**Human (per label, in reading order)**

8. **The removal test** — cover the label. Is anything now unknown? If no → delete.
9. **The four-gate test** — does it carry (a) an encoding the design cannot show, (b) the block's
   claim, (c) a register change the reader must trust, or (d) the only navigational handle? If none
   of the four → delete (E5).
10. **Claim not category** — does the header assert something an informed reader could dispute, or
    does it name a bucket? Wikipedia section titles reused verbatim are automatic failures (E6).
11. **Caption gate** — does the caption state a fact absent from the image? Describing what is
    visible → rewrite or delete (E8).
12. **Register gate** — is the label quieter than the content it serves? Is apparatus visually
    distinguishable from source fact (§7.1)? (E9)
13. **Provenance gate** — one affordance per block, not a column; visible without hover; a complete
    concordance exists in end matter (E10, §7.2).
14. **Empty-instrument scan** — scroll the whole page: does any apparatus persist where it has
    nothing to measure?
15. **Legend scan** — zero legend boxes. Every encoding taught at first use (§6.2).
16. **Hedge placement** — is every uncertainty in the running voice at running size, not demoted to
    a grey micro-note? (E12)
17. **Pointer completeness** — is every source section in exactly one of {surface, subordinated,
    pointer, promoted}, and does the metadata say which? (E13)
18. **Thesis trace** — for each surface screen, name the sentence of the thesis it advances. A screen
    that cannot be traced is subordinated or cut (E1, E14).

---

## 4. (d) Proposed amendments to `DESIGN_PRINCIPLES.md`

Not applied — proposed. Section numbers assume insertion into the existing v0.1 structure.

**§0 — add a third failure direction to "The stance"**

> A third failure sits between the two: **the faithful copy in good clothes.** A page that reproduces
> the source's every section at the source's own relative weight has made no editorial argument, and
> a design that makes no editorial argument is decoration however restrained its typography. The test
> that catches it: *state this page's thesis in one sentence; then find a screen that does not advance
> it.* If most screens do not, this is an annotated copy. (See `EDITORIAL.md` E1, E3.)

**§1.4 MUST — declare the thesis with the structure.**

> Alongside the informational-structure classification (§1.1), record a **thesis**: a complete active
> sentence with a subject, an action and a consequence, in ≤25 words. Section order follows the
> structure; section *inclusion* follows the thesis. [EDITORIAL E1]

**§1.5 MUST — declare a four-layer allocation for every source section.**

> Every section of the Content Model is assigned to exactly one of: surface, subordinated,
> pointer-only, or promoted-into-another-section. The mapping ships in the experience metadata.
> Truth preservation is satisfied by reachability, never by surface parity. [EDITORIAL E13]

**§2.11 MUST — a label must contain information the design cannot show.**

> A label earns its place only by carrying (a) an encoding the design cannot express, (b) the block's
> claim where the prose does not state it, (c) a register change the reader must trust, or (d) the
> only navigational handle to a subordinated region. A label whose content words all appear in the
> adjacent first sentence is a blocking defect. The §2.6 micro-label register is cheap to set and is
> therefore the most over-used device in our system. [EDITORIAL E5, E9]

**§2.12 MUST — headings make claims, not categories.**

> A heading asserts something an informed reader could dispute. Reusing a source article's section
> title verbatim (`Background`, `Legacy`, `Personnel`) is a defect: it imports the coverage structure
> the experience exists to replace. [EDITORIAL E6]

**§3.10 MUST — a caption adds a fact the image cannot carry.**

> Extends §3.9. Where an object carries its own label, add no caption; where a caption is warranted,
> it must state something absent from the image. Captions are read roughly twice as often as body
> copy (Ogilvy), which makes a describing caption the most expensive redundancy on the page.
> [EDITORIAL E8]

**§4.11 MUST — declare a surface budget before composition.**

> Fix, in metadata, before layout: surface words (≤35% of source body prose), words per 900px
> viewport (150–250, ceiling 300), viewport count, plate count, label ceiling, surface-photograph
> count. Write to fit; cut at proof. Measured references: apple.com 184 w/vp, Pudding 205 w/vp,
> Wikipedia 557 w/vp. [EDITORIAL E2, E3, E4]

**§4.12 MUST — one idea per screen.**

> A screen carries one claim and one piece of evidence. A screen carrying two ideas carries neither.
> [EDITORIAL E7]

**§7.5 MUST — subordinated content stays searchable, one level deep.**

> Hidden-by-default content uses `hidden="until-found"`, `<details>`, or an equivalent that
> find-in-page can reach and the browser can reveal. `display:none` converts subordination into
> deletion and fails the truth requirement. Maximum two disclosure levels; the control must predict
> what is behind it. [EDITORIAL E11]

**§7.6 MUST — provenance is one affordance per block, plus a concordance.**

> §7.2's "visible without hover" is satisfied by a single quiet affordance per block and a complete
> source-to-block concordance in end matter — never by a parallel column of source tokens at label
> weight. [EDITORIAL E10]

**§8 — four rows for the anti-cliché table**

| Banned | Why | Instead |
|---|---|---|
| A label that repeats the adjacent first sentence | Zero information at the cost of a line, a register and a beat | Delete, or carry a datum (§2.11) |
| Section headings copied from the source article | Imports the coverage structure we exist to replace | Headings that make claims (§2.12) |
| Every block carrying a source token at label weight | Apparatus at surface parity with content | One affordance + end-matter concordance (§7.6) |
| Apparatus persisting with nothing to measure | An instrument reading `——:——:——` is noise pretending to be rigour | Suppress the instrument, not just its value (§2.11) |

**§9 — three additions to the pre-ship self-check**

> 11. **Thesis trace.** State the thesis in one sentence. Walk every surface screen and name the part
>     of the thesis it advances. Screens that cannot be traced are subordinated or cut. (§1.4)
> 12. **Surface audit.** Measure words-per-viewport and surface-words ÷ source-body-words. Outside
>     150–300 and ≤0.35 respectively is blocking. Run the label audit in `EDITORIAL.md` §3. (§4.11)
> 13. **Content removal test.** Delete the three surface elements you are proudest of and re-read.
>     If thesis comprehension is unchanged, they stay deleted. (Extends the §5.6 motion removal test
>     to content.) [EDITORIAL E14]

---

## 5. Sources

- [Gallery Text at the V&A: A Ten Point Guide (Lucy Trench, 2011)](http://media.vam.ac.uk/media/documents/gallery_text_writing_guide_updated.pdf) — text hierarchy and word counts, "less really is more", Topic/Theme/Message, Admit uncertainty, Orwell's six rules
- [Beverly Serrell, *Exhibit Labels: An Interpretive Approach*](https://archive.org/details/exhibitlabelsint0000serr) — the Big Idea as subject + action + consequence in ≤25 words; visitors skip most elements and spend under 20 minutes
- [Smithsonian Guide to Interpretive Writing for Exhibitions](https://exhibits.si.edu/wp-content/uploads/2021/09/SI-Guide-to-Interpretive-Writing-for-Exhibitions.pdf) and [Smithsonian Guidelines for Accessible Exhibition Design](https://www.sifacilities.si.edu/sites/default/files/Files/Accessibility/accessible-exhibition-design1.pdf) — label maxima 50–100 words, ~55 characters per line
- [Tufte's data-ink principles](https://infovis-wiki.net/wiki/Data-Ink_Ratio) — show the data; maximise data-ink; erase non-data ink; erase redundant data-ink; revise and edit
- [Poynter, *The Nut Graf, Part I*](https://www.poynter.org/archive/2003/the-nut-graf-part-i/) — Ken Wells: "a paragraph that says what this whole story is about and why you should read it"; Blundell: the theme statement is "the single most important bit of writing I do"
- [Steve Audette (PBS *Frontline*) on documentary editing](https://jonnyelwyn.co.uk/film-and-video-editing/editing-documentary-interview-with-editor-steve-audette/) — the plumb line; "if the scene does not change the straight line of our protagonist, it can be cut"
- [Tony Zhou & Taylor Ramos, *Postmortem: Every Frame a Painting*](https://medium.com/@tonyszhou/postmortem-1b338537fabc) — flashcard throughline method; "you gotta have steel in the walls"
- [The Pudding, *Continue, Pivot, or Put it Down*](https://pudding.cool/process/pivot-continue-down/) — the eight-question kill criteria
- [Storybench, *How The Pudding structures stories as visual essays*](https://www.storybench.org/pudding-structures-stories-visual-essays/) — named story shapes; 7,000 bands narrowed to 11
- [Nielsen Norman Group, *Progressive Disclosure*](https://www.nngroup.com/articles/progressive-disclosure/) — the primary/secondary split; two-level limit; control labelling
- [Wikipedia MOS:INFOBOXPURPOSE](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Infoboxes) — "the less information that an infobox contains, the more effectively it serves its purpose"
- [Wikipedia:Disinfoboxes](https://en.wikipedia.org/wiki/Wikipedia:Disinfoboxes) — infoboxes as "competitive counter-articles, stripped of nuance"
- [David Ogilvy on captions](https://copyengineer.com/post_captions/) — twice as many people read captions as read body copy
- Screenshots: `screenshots/references3/` (apple.com/macbook-pro ×6, pudding.cool/pockets ×5,
  en.wikipedia.org/wiki/Apollo_11 ×4). Measurement harness: `tools/measure-surface.mjs`,
  `tools/shoot-refs3.mjs`.
