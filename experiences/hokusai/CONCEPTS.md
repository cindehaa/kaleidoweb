# Hokusai — Four Art-Direction Concepts

Source: `benchmarks/hokusai/content-model.json` (12 sections, ~2,760 words of body prose, 26 images, 4-row infobox, 0 tables, 1 block quote), `benchmarks/hokusai/semantic.json` (31 chronology entries, 29 works, 8 documented art-names, 5 verbatim quotes, 14 quantities), `benchmarks/hokusai/media-list.json` (true pixel dimensions per file).

This is the second benchmark subject. The first (Apollo 11) produced **Three Bodies** — a three-stave score on a shared UTC clock. The core claim under test here is that a different subject produces a *structurally* different experience, not a recoloured one. Every concept below is checked against that at the end, and one of them fails the check unless a specific structural condition is enforced.

---

## Four observations about *this* article that any honest design has to answer to

**1. The images are not illustrations. They are the subject.**
26 images; 22 of them are works by Hokusai; 2 are portraits of him (one by his own disciple, `Portrait_of_Katsushika_Hokusai_by_disciple_Keisai_Eisen.png`); 1 is a contemporary print *of him working* (`Hokusai_Daruma_1817.jpg`); 1 is a Debussy score cover. Seventeen of the works sit in a `Selected works` section (`section_id: 4`) that contains **zero words of prose** — just a gallery and a 17-item caption list. Wikipedia's own layout admits it does not know what to do with them. This is the `Collection of artifacts / imagery` row of DESIGN_PRINCIPLES §1, unambiguously.

The file dimensions prove there are real *format families* in that gallery, not a homogeneous grid:

| aspect | count | files |
|---|---|---|
| 1.36–1.52 (landscape sheet) | 11 | `Great_Wave_off_Kanagawa2`, `Fine_Wind,_Clear_Morning`, `tempesta_sotto_la_vetta`, `Kajikazawa_in_Kai_province`, `Tenman_Bridge_at_Settsu_Province`, `Hokusai_1760-1849_Ocean_waves`, `The_Big_wave_from_100_views`, `Egrets_from_Quick_Lessons`, `The_Dream_of_the_Fisherman's_Wife`, `Enjoying_the_Evening_Cool…Ryôgoku_Bridge`, `Hokusai,_Tiger_in_the_Snow` (1.29) |
| 0.67–0.78 (upright sheet) | 6 | `Pilgrims_at_Kirifuri_Waterfall`, `Cuckoo_and_Azaleas`, `The_Lantern_Ghost,_Iwa`, `Veld_in_de_Owari_provincie`, `Hokusai_Daruma_1817`, `Keisai_Eisen` portrait |
| 0.85–0.88 (square-ish, surimono) | 2 | `Hokusai-shikishiban-still-life`, `Courtesan_asleep` |
| 1.00 (square panel) | 2 | `Hokusai_Dragon` (Obuse float, 1844), `Femenine_wave` (Obuse, 1845) |
| 0.27–0.39 (extreme vertical) | 2 | `Carp_leaping_up_a_cascade`, `Hokusai-fuji-koryuu` (Dragon of Smoke) |
| 0.48 (extreme vertical portrait) | 1 | `Hokusai_as_an_old_man` (4200×8717) |

Format is a real, file-verifiable axis. Nothing has to be invented to use it.

**2. The subject supplies his own evaluation axis, and it indicts his most famous work.**
The colophon quote (`sections[3].quotes[0]`) is not a nice line about ageing. It is an **ordinal scale with age as the independent variable**, stated by the artist:

> age 6 — "a passion for copying the form of things" · age 50 — "published many drawings" · **by 70 — "there is nothing worth taking into account"** · 73 — "partly understood the structure of animals, birds, insects and fishes" · 86 — "progress further" · 90 — "further penetrate their secret meaning" · 100 — "perhaps truly have reached the level of the marvellous and divine" · 110 — "each dot, each line will possess a life of its own"

He died at 88 (`quantities`: "88"; infobox `Died: 10 May 1849 (aged 88)`). Three of his eight milestones are past the end of his life. And `The Great Wave off Kanagawa` is dated in the article's own caption as **c. 1829–1832**, against a birth of c. 31 October 1760 — which places it at roughly **ages 68 to 72**, straddling the line below which he said nothing he made was worth taking into account. The most reproduced image in the world sits inside its author's own dismissal.

Then, at 88, he revises *downward*: "If only Heaven will give me just another ten years … Just another five more years, then I could become a real painter" (p22). The self-assessment curve has a documented final data point that is below its own forecast.

**3. He treated identity as versioning, and the article says so explicitly.**
p4: *"Hokusai was known by at least thirty names during his lifetime… His name changes are so frequent, and so often related to changes in his artistic production and style, that they are used for breaking his life up into periods."* The article states its own best periodization — and then ignores it, filing everything under `Early life / Middle period / Later life`. `semantic.json` documents 8 of the 30+, each with a meaning:

Tokitarō (birth) → Shunrō (1779, *given by his master*) → Tawaraya Sōri (school affiliation) → Hokusai Tomisa (1798, independence — and he **passed the previous name to a pupil**, so a name is transferable property) → Katsushika Hokusai (1800: birth district + "north studio" for the North Star, a Nichiren Buddhist deity) → Taito (1811, the manuals) → Iitsu (1820, national fame) → Gakyō Rōjin Manji (1834, "The Old Man Mad About Art").

Eight documented, 30+ claimed. The registry is *knowably incomplete*, which is a design asset, not a problem.

**4. There are five waves in this article and only one of them is famous.**
`Great_Wave_off_Kanagawa2.jpg` (Thirty-six Views, c.1829–32) · `Hokusai_1760-1849_Ocean_waves.jpg` (captioned "Chōshi in Shimosha, from *Oceans of Wisdom*") · `The_Big_wave_from_100_views_of_the_Fuji,_2nd_volume.jpg` · `Femenine_wave.jpg` (Obuse, 1845) — plus the **Masculine Wave**, named in p21 with no image. The figure/ground problem the brief names is not rhetorical; the raw material for solving it is sitting in `images[]`.

### Two things I checked and could not confirm — do not use them

- **"93 changes of residence."** Famous Hokusai fact. **It is not in this article.** `grep` over `source.html`, `semantic.json` and `content-model.json` returns nothing for "residence" or "93". Any concept that uses it fabricates.
- **"Prussian blue."** The pigment is historically load-bearing for Hokusai, but **the article never names it.** Sampling a blue out of `Great_Wave_off_Kanagawa2.jpg` for the page ground is legitimate under §6.5 (ground derived from the artifact). *Stating* that it is Prussian blue, or narrating an import-pigment story, is a truth failure. Every concept below uses the sampled blue and none of them names it.
- **One source-internal discrepancy worth surfacing rather than silently fixing:** the gallery item whose file is `Katsushika_Hokusai_(1760-1849),_Veld_in_de_Owari_provincie_(1829-33).jpg` is captioned by Wikipedia as *"Amida Falls, from A Tour of Japanese Waterfalls"* — the filename says a field in Owari Province, the caption says a waterfall. Verified in `source.html`. Concept C makes this visible; the others must at minimum not paper over it.

### Structure classification (§1.1)

Dominant: **Collection of artifacts / imagery.** Secondary: **a single object of overwhelming importance** (The Great Wave), which the design's job is to *demote*, not to feature. Chronology is present and, under §1.2, is refused as an organizing form by all four concepts. Concepts A and B each additionally lean on a structure the §1 table does not yet have a row for; B proposes one.

Each concept is organized around a different axis: **his own judgement** (A), **his names** (B), **the objects** (C), **the process that made them** (D).

---

# Concept A — **Nothing Before Seventy**

### Organizing idea
Hokusai left an explicit numeric scale grading his own life's work by age; the page draws that scale as the graph's y-axis, plots his actual surviving works against it, and lets the reader discover that the most famous image in the world falls inside the years its author dismissed as worthless.

### Why this article demands this form

This is the concept with the strongest claim, because the organizing structure is **supplied by the subject in the first person** and the article never uses it.

- The colophon (`sections[3].quotes[0]`, reproduced in `semantic.quotes[1]`) is a **function**: eight (age, attainment) pairs. It is the only place in the article where anything is graded, ranked, or measured against anything else. It is data wearing prose.
- The reveal is arithmetic, not opinion. Birth c. 31 Oct 1760 (`infobox`, p3). `Great_Wave_off_Kanagawa2.jpg` caption: c. 1829–1832. Therefore ages ≈68–72. The colophon: *"of all I drew by my seventieth year there is nothing worth taking into account."* The design does not argue this — it plots two sourced numbers and gets out of the way.
- The article gives ~16 datable works, enough for a real distribution: kabuki prints 1779 (18) · `Fireworks…Ryōgoku Bridge` c.1788–89 (27–29) · *Famous Sights of the Eastern Capital* / *Eight Views of Edo* 1800 (39) · Daruma at the Edo festival 1804 (43) · *Quick Lessons in Simplified Drawing* 1812 (51) · *Hokusai Manga* v1 and *Kinoe no Komatsu* 1814 (53) · Great Daruma 5 Oct 1817 (56) · *Thirty-six Views* c.1829–32 (68–72) · *A True Mirror of Chinese and Japanese Poetry* c.1833–34 (72–74) · *One Hundred Views of Mount Fuji* 1834 (73) · *One Hundred Poems Explained by a Nurse* c.1835–36 (74–76) · studio fire 1839 (78) · daily lion paintings c.1842–43 (81–83) · Obuse float dragon 1844 (83) · `Femenine_wave` 1845 (84) · `Hokusai-fuji-koryuu` + `Hokusai,_Tiger_in_the_Snow` 1849 (88).
- The three unreached milestones (90, 100, 110) are the largest fact in the article that has no representation in prose. On an axis they become an enormous, quantified, empty region. **You cannot draw that in a paragraph.**
- The deathbed quote is a data point in the same series: at 88 he places himself *below* where the colophon at 73 predicted he would be. Two self-assessments, fifteen years apart, disagreeing. That contradiction is the emotional payload and it is entirely sourced.
- Uncertainty is inherited from the first sentence of the biography: p3 says *"Hokusai's date of birth is unclear"* and the infobox says *"supposedly."* So **the x-axis itself has error bars**, and the design states that inside the graph rather than in a footnote (§7.3).

### Structure

Density curve shape (§1.3): **a filled climb with an unreachable tail** — sparse, sparse, single object, very dense, near-empty, medium, dense. Two ≥20:1 inversions are structural, not decorative (movement 3 → 4, and 0 → 1).

| Movement | Sections mapped | Treatment |
|---|---|---|
| 0. **The verdict** | `Later life` (colophon) | His sentence alone, at display scale. "nothing worth taking into account" is the largest type on the page and it is a quotation, not a headline. §2.10 — the title *is* the claim the page will disprove. |
| 1. **The scale** | `Later life` | The graph is drawn empty: eight horizontal registers whose labels are his own eight phrases, the age axis beneath. No works yet. The reader spends ten seconds looking at a chart made entirely of one man's sentence. |
| 2. **The commitment** | — | One work is placed on screen, unlabelled: `Great_Wave_off_Kanagawa2.jpg`. The reader is asked to drag it onto the scale — *where did he think this ranked?* — and then it snaps to its true position: a **bar** spanning ages 68–72, crossing his 70 line. Prediction-then-reveal, §1 row "Data narrative with a surprise" [C1]. Skippable. |
| 3. **The population** | `Early life`, `Middle period`, `Later life`, `Selected works` | All 16 datable works land. Each is a small sheet at its true file aspect ratio. The 10 works the article does not date go to a ruled margin headed `UNDATED IN THIS ARTICLE — 10`. Densest screen on the page. |
| 4. **The tail** | `Later life` | The axis extends past 88 to 110. Three milestones, no data. The single emptiest screen in the experience, and the only one where nothing can be clicked. The deathbed quote sits at 88, plotted *below* the forecast line. |
| 5. **After the axis** | `Influence on art and culture` | The axis is relabelled in years *after his death* and six sourced events are placed on it: Bracquemond finds a sketchbook c.1856 (+7) · Rousseau Service at the Universal Exposition 1867 (+18) · Debussy's *La Mer* 1905 (+56, with `Debussy_-_La_Mer…jpg` as the evidence) · Britannica/Richard Lane 1985 (+136) · Tokyo National Museum 2005 (+156) · British Museum 2017 (+168). Degas's quote closes it. The eclipse is shown to happen entirely outside the range in which he could comment. |
| 6. **The reading room** | all sections, full text | Argument-width prose, every named work anchored back into the plot; `General and cited references` and the four `Further reading` lists as end matter. §4.9 escape hatch. |

**Emphasis:** the colophon and the plot. **Compressed:** the Japonisme narrative (623 words) → six ticks plus the full prose in movement 6. **Nothing dropped:** all 33 paragraphs, all 26 images, all reference lists reachable from movement 6 with in-plot anchors.

### Visual language

- **Type — two families, Split A (§2.1).** **Newsreader** (OFL, variable, self-hostable) for everything narrated — his words, the prose. **Space Mono** (OFL) for the entire instrumentation layer: ages, year ranges, the "±" markers, the `UNDATED — 10` header, source paragraph IDs. Deliberately *not* IBM Plex, which is Three Bodies' voice; sharing it would be a system tell. Scale 13 → 15 → 19 → 32 → 58 → 116 (uneven, §2.5); display:body = 116/19 ≈ 6.1× (§2.2); 116px at line-height 0.94 / tracking −0.075em (§2.3, §2.4).
- **Palette — two speakers, two colours, taught in the headline (§6.2).** Ground: bone `#EFE7D6`, sampled from the paper of `Hokusai-shikishiban-still-life.jpg` and `Egrets_from_Quick_Lessons…` — the page is the colour of the sheets on it (§6.5). Ink: `#1B1815`. **Blue `#20406B`, sampled from `Great_Wave_off_Kanagawa2.jpg`, is Hokusai's own voice and nothing else** — the colophon, his eight registers, his line at 70, the deathbed point. **Vermilion `#B23A22`, sampled from the Fuji in `Fine_Wind,_Clear_Morning`, is posterity's voice and nothing else** — movement 5 only. The reader learns both encodings from the first screen, because the colophon is set in blue and the word "posterity" never appears on it. Three grounds total (bone, ink for movement 4's tail, and nothing else) — §6.3 satisfied.
- **Imagery.** Works appear on the plot as sheets at their true file aspect ratio, ~40px tall, no frames, no shadows, no radius (§3.1). Clicked, a work opens at ≥55% of the viewport over a dimmed plot, **with its paper tone, foxing and trimmed edges left alone** — no white-balance correction, no auto-contrast (§6.6). `Hokusai_as_an_old_man.jpg` (4200×8717, the tallest file in the set) is the only image in movement 4, set at the truncation, at 88, full-height in the empty tail: the portrait is a vertical measure of the years he did not get.
- **Motion grammar — two motions, both nameable.** (1) *Landing*: works arrive on the plot staggered by age, 300ms each, 40ms apart — **sequence**. (2) *Extension*: the axis grows from 88 to 110, 900ms, once — **scale**. That is all. The drag in movement 2 is direct manipulation at 1:1 with no easing, because the reader's hand is not an animation. Global pause control, bottom-left, present on every screen (§5.2).

### Interaction model
Drag-to-place, once, skippable ("skip the guess" beside it, §4.9). Click any sheet to inspect. Click any of his eight registers to filter the plot to works made during that band — his taxonomy becomes the filter UI. A persistent toggle, `SHOW DATE RANGES`, converts every point to its true bar (c.1829–1832 is four years wide, not a dot); leaving it off is *less* honest and the label says so. Every sheet and every register carries a visible `p14`-style source anchor — no hover-only provenance (§7.2).

### Latency story
Best in this set. The entire graph — eight registers, their eight labels, the age axis, the tick marks, the empty tail to 110 — is **derived from one quotation and paints as inline SVG plus text in the first frame with zero network requests.** The reader is looking at a complete, meaningful composition before any image exists. Works then stream in as correctly-proportioned dominant-colour rectangles at their true plot positions (no reflow, no layout shift), and upgrade to decoded thumbnails as they arrive. Movement 0 needs one subsetted woff2 (Newsreader, ~28KB) and nothing else.

### Honest weaknesses
- **~16 datable works out of a stated 30,000 is a 0.05% sample.** The page must say that in the running voice or the plot implies a completeness it does not have.
- **Age on a horizontal axis can read as a timeline at thumbnail scale — the project's most-banned form.** The defence has to be structural: this is a two-axis plot whose y-axis is a quotation. If a build ships with a decorative y-axis, or with events strung along a rail, the concept has failed and should be scrapped rather than patched.
- The year→age arithmetic is *mine*, not the article's. It must live in the generated-explanation register (§7.1) and show its working, or it is an unlabelled inference presented as source fact.
- The prediction beat assumes the reader recognises The Great Wave. Most will; those who do not get a flatter opening. The reveal must land regardless of whether they guessed.
- Movement 6 is 2,760 words with none of the apparatus. If it is not independently well-composed, the whole back half is a dumping ground.

---

# Concept B — **Thirty Names**

### Organizing idea
The page has no sections — it has **releases**. Hokusai is presented as a versioned identity with a public changelog, and choosing a name re-renders the entire experience as that version of him: the masthead renames itself, the palette re-tunes to that period's works, and the prose and the works both narrow to what was made under that signature.

### Why this article demands this form

Because the article explicitly tells us this is the right periodization and then declines to use it.

- p4, verbatim: *"His name changes are so frequent, and so often related to changes in his artistic production and style, that they are used for breaking his life up into periods."* Wikipedia states the correct structure in a sentence and files everything under three vague headings instead. This concept **repairs a defect in the source** rather than decorating around it — the same class of move that justified Three Bodies, applied to a completely different kind of defect.
- All eight documented names carry a *meaning*, not just a date (`semantic.names`), and the meanings are of four different kinds: given by someone else (Shunrō, dubbed by his master); institutional (Tawaraya Sōri); theological/geographical (Katsushika Hokusai — birth district + "north studio," the North Star, a deity of his Nichiren Buddhism); and self-descriptive (Gakyō Rōjin Manji, "The Old Man Mad About Art"). A name change means something different every time.
- **A name is transferable property.** p9: in 1798 he *"passed his name on to a pupil"* and took a new one to become independent. That single clause dismantles the idea that these are nicknames. It is a licence transfer.
- The registry is knowably incomplete: **8 documented, "at least thirty" claimed** (p4, `quantities` "30+"). Twenty-two blank slots are a *sourced* fact and the design shows them as blanks. No other concept can render an absence this precisely.
- Only two names appear in the source in Japanese: 葛飾 北斎 (p0) and 画狂老人卍 (p17). The asymmetry — six romaji, two with kanji — is itself information about what the encyclopaedia knows, and the design shows it rather than normalising it.
- The closing fact writes itself: **this article is titled "Hokusai."** One fragment of one of thirty names, chosen by an encyclopaedia, is now the only one anybody uses.

### Structure

Not movements — **entries**. A permanent left register of 30 slots (8 named, 22 ruled and empty) and a right field that is the current entry's whole world. Density alternation is engineered per entry, not per scroll position: the Iitsu entry holds nine works; the Tawaraya Sōri entry holds one line of prose and no image at all, and that emptiness is the point.

| Entry | Slot | Section source | Works shown | Accent |
|---|---|---|---|---|
| 0. **Tokitarō** | 1 | `Early life` p3 | none — *he did not choose this one either* | none; ink only |
| 1. **Shunrō** (1779) | 2 | `Early life` p5–p8 | `Courtesan_asleep`, `Enjoying_the_Evening_Cool…Ryôgoku_Bridge` | night indigo, sampled from the Ryōgoku sky |
| 2. **Tawaraya Sōri** | 3 | `Middle period` p9 | none in this article | pale ground only — a deliberately near-empty screen |
| 3. **Hokusai Tomisa** (1798) | 4 | `Middle period` p9 | none in this article | as above; the two empty entries sit adjacent on purpose |
| 4. **Katsushika Hokusai** (1800) | 5 | `Middle period` p10–p13 | `Hokusai_Daruma_1817`, `Hokusai-MangaBathingPeople` | ochre, sampled from `Hokusai_Daruma_1817` |
| 5. **Taito** (1811) | 6 | `Middle period` p14–p15 | `Hokusai-MangaBathingPeople`, `Egrets_from_Quick_Lessons`, `The_Dream_of_the_Fisherman's_Wife` | ink-wash grey |
| 6. **Iitsu** (1820) | 7 | `Middle period` p16, `Selected works` | `Great_Wave_off_Kanagawa2`, `Fine_Wind,_Clear_Morning`, `tempesta_sotto_la_vetta`, `Kajikazawa_in_Kai_province`, `Tenman_Bridge…`, `Pilgrims_at_Kirifuri_Waterfall`, `Veld_in_de_Owari_provincie`, `Hokusai_1760-1849_Ocean_waves`, `Cuckoo_and_Azaleas` | **blue `#20406B`**, sampled from the Wave |
| 7. **Gakyō Rōjin Manji** (1834) | 8 | `Later life` p17–p22 | `The_Big_wave_from_100_views`, `Carp_leaping_up_a_cascade`, `The_Lantern_Ghost,_Iwa`, `Hokusai_Dragon`, `Femenine_wave`, `Hokusai-fuji-koryuu`, `Hokusai,_Tiger_in_the_Snow`, both portraits | vermilion + ink |
| 8. **"Hokusai"** — posthumous | — | `Influence on art and culture` | `Debussy_-_La_Mer…` | vermilion |

**Emphasis:** the name meanings and the two transfers (received from Shunshō in 1779; given away to a pupil in 1798). **Compressed:** the Japonisme material becomes entry 8 — the name the world kept. **Reachable:** a `HOLD ALL` state sets all eight entries simultaneously for comparison; every entry links to its source paragraphs; the reference lists live under the register.

Opening plate: **Tokitarō**, alone, with the fact that it was his father's choice and that his father never made him an heir (p3). Closing plate: all eight names set at once, the 22 blanks counted, and one line — *this encyclopaedia calls him by half of the fifth one.*

### Visual language

- **Type — two families, Split A.** **Shippori Mincho** (OFL, Latin + full kanji coverage) for the names and all narration; **Zen Kaku Gothic New** (OFL, also Japanese-capable) for the register apparatus — slot numbers, dates, `8 OF 30+ DOCUMENTED`, source anchors. Two families, both self-hostable, and both able to set 葛飾 北斎 and 画狂老人卍 without a third font — which is exactly why they were chosen. Note: **no monospace anywhere**, which is a second deliberate divergence from Three Bodies' register.
- **Palette — one accent at a time, and it changes when he changes his name.** Three large-area grounds total (§6.3): bone `#EFE9DC`, sumi `#17161A`, and one 4% ink wash. Everything else is the current entry's single accent, sampled from that entry's own works. This is §6.4 in its purest available form — one motif (the field behind the name), reparameterised eight times — and §6.1 inverted into something the subject earns: the colour *is* the version number.
- **Imagery.** Only the works the article dates to the current entry, at full sheet scale, ungridded, ranged along a single baseline. Entries 2 and 3 show nothing, because the article has nothing. Empty is data.
- **Motion grammar — one signature motion.** Name changes **morph** rather than cut (§5.4): the outgoing glyphs cross-fade to the incoming ones on the same baseline at the same size, 300ms — *the same man, relabelled*. The accent colour transitions over 700ms, deliberately slower than the label, because the world changes more slowly than the name does. Works do not animate; they are replaced. Nothing else on the page moves at any time.

### Interaction model
The register is present and operable from the first frame — there is no guided path to escape from, because roaming *is* the path (§4.9 satisfied by construction). Click a slot; ←/→ steps entries; `HOLD ALL` for comparison. Clicking a blank slot returns the honest answer: *not documented in this article*, with the p4 anchor. Each entry's prose is the article's own paragraphs, with a source-return link in a third link colour (§6.8).

### Latency story
Excellent, and structurally so: the register is 30 rules and 8 strings. **First paint shows the whole thesis — "8 of 30+" — before a single image or even the display font arrives.** Entry 0 has no image by definition, so the opening screen is complete at first paint. Font risk is real and manageable: subset Shippori Mincho to the exact nine kanji used (葛飾北斎画狂老人卍) plus Latin, inline as woff2 (~40KB); the sans loads after.

### Honest weaknesses
- **It promises thirty and delivers eight.** If the 22 blanks are not genuinely well-designed, the page reads as a broken database rather than as documented incompleteness.
- Two of the eight entries (Tawaraya Sōri, Hokusai Tomisa) have one sentence and no image between them. A quarter of the registry is thin, and adjacent thin entries risk reading as a loading failure rather than a fact.
- Selection-driven pages have **no intrinsic pacing.** Density alternation (§4.1) has to be authored into the entry set — it will not emerge from the interaction. Get this wrong and it is a tab bar with a serif.
- The masthead-rename must feel ceremonious. If it reads as a filter chip updating a heading, the entire organizing idea evaporates and the page becomes a competent CMS.
- Works get assigned to name-periods partly by inference where the article gives only a decade. Every such assignment must be marked as inferred (§7.1), and there are enough of them to be visually noisy.

---

# Concept C — **The Table**

*(the works-as-primary-objects concept)*

### Organizing idea
One continuous horizontal surface, the height of a sheet, holding every work in the article at its true proportion — navigated by sliding, because these are sheets and sheets are handled sideways — ordered not by date but by **what he was looking at**, so that the reader watches the subject matter of an entire art form widen in front of them, which is the actual claim of the article's first paragraph and is buried there in a subordinate clause.

### Why this article demands this form

- §1's `Collection of artifacts / imagery` row prescribes exactly this: *artifact at full scale with texture and damage intact; page ground sampled from the artifact; navigation axis matched to how the object is handled (horizontal for sheets); no caption where the object already carries its label.* Twenty-two works, a caption-free 17-item gallery, and a section (`section_id: 4`) with zero prose — the source is asking for it.
- **The ordering axis is sourced, not invented.** p0: he was *"instrumental in developing ukiyo-e from a style of portraiture largely focused on courtesans and actors into a much broader style of art that focused on landscapes, plants, and animals."* p8 repeats it: *"his work became focused on landscapes and images of the daily life of Japanese people… This change of subject was a breakthrough in ukiyo-e and in Hokusai's career."* The article names the before-set and the after-set. Ordering the table by subject matter makes the thesis *visible as a shape* instead of a sentence.
- **The four-waves adjacency.** Placing `Great_Wave_off_Kanagawa2`, `Hokusai_1760-1849_Ocean_waves`, `The_Big_wave_from_100_views_of_the_Fuji`, and `Femenine_wave` side by side — with the Masculine Wave present as a named absence (p21, no image) — solves the figure/ground problem by *doing nothing but putting them next to each other*. This is the concept's one moment of pure restraint, and restraint is doing all the work.
- **Format families are file-verifiable** (see the aspect table at the top). The two Obuse panels are exactly square; `Carp_leaping_up_a_cascade` is 0.35; the landscape sheets cluster at ~1.47. A table that respects true proportion is materially truthful in a way a uniform grid is not, and it costs nothing.
- The two Darumas are the scale problem in the article's own numbers: 200 m² in Edo, 1804 (p11, made with *"a broom and buckets full of ink"*), and 18 × 10.8 metres in Nagoya, 5 Oct 1817 (p15). `Hokusai_Daruma_1817.jpg` is a **contemporary print of him making it, with the crowd in it** — a real document that supplies the human scale key. These two objects cannot go on the table; they break it. That break is the experience's one environmental inversion.

### Structure

Density curve: **a steady widening** (§1.3) — the table literally gets more crowded as the subject matter broadens, then empties into the coda.

| Band | Sections mapped | Contents |
|---|---|---|
| **0. Approach** | `__lead__` | The table is already there, at rest, one sheet visible: `Courtesan_asleep`. Two lines of prose. No hero. |
| **1. Courtesans and actors** | `Early life` p5–p6 | `Courtesan_asleep`, `Enjoying_the_Evening_Cool…Ryôgoku_Bridge`. The narrow starting set — visibly narrow, two sheets on a wide surface. |
| **2. The break** | `Early life` p7–p8 | The expulsion by Shunkō and his own line about it: *"What really motivated the development of my artistic style was the embarrassment I suffered at Shunkō's hands."* The table's only near-empty stretch. |
| **3. People, ordinary** | `Middle period` p14 | `Hokusai-MangaBathingPeople`, `Egrets_from_Quick_Lessons` — the *Manga* and the manuals: thousands of drawings of ordinary things. |
| **4. Landscape** | `Middle period` p16, `Selected works` | `tempesta_sotto_la_vetta`, `Fine_Wind,_Clear_Morning`, `Kajikazawa_in_Kai_province`, `Tenman_Bridge…`, `Pilgrims_at_Kirifuri_Waterfall`, `Veld_in_de_Owari_provincie` |
| **5. Water** — *the four waves* | `Selected works`, `Later life` p21 | `Great_Wave_off_Kanagawa2`, `Hokusai_1760-1849_Ocean_waves`, `The_Big_wave_from_100_views`, `Femenine_wave`, `Carp_leaping_up_a_cascade`; plus a ruled empty slot: `MASCULINE WAVE — NAMED IN THE ARTICLE, NOT SHOWN` |
| **6. Plants and animals** | `Selected works` | `Cuckoo_and_Azaleas`, `Hokusai,_Tiger_in_the_Snow`, `Hokusai_Dragon`, `Hokusai-fuji-koryuu` |
| **7. The rest of the world** | `Middle period` p12, `Selected works` | `The_Dream_of_the_Fisherman's_Wife`, `The_Lantern_Ghost,_Iwa`, `Hokusai-shikishiban-still-life` — erotica, ghosts, still life. Marked as *editorial grouping*, not the article's (§7.1). |
| **8. Off the table** | `Middle period` p11, p15 | The inversion. Ground goes dark; the two Darumas are described at their stated sizes against the crowd in `Hokusai_Daruma_1817.jpg`. Nothing to slide. The only vertical moment in the experience. |
| **9. It leaves** | `Influence on art and culture` | The table resumes, but the last object on it is not his: `Debussy_-_La_Mer…jpg` — the Wave reproduced by someone else, on someone else's product, in 1905. The coda is a change of ownership, not a summary (§4.6). |
| **10. Under the table** | all sections | The full article prose as a low expandable band, always present at the surface's lower edge; reference lists at the far right end. |

**Emphasis:** the works, at scale, always ≥60% of the viewport (§1 `single object` row). **Compressed:** biography prose into the low band. **Nothing lost:** every paragraph is under the sheet it belongs to.

### Visual language

- **Type — two families, Split B (§2.1).** **Instrument Serif** (OFL) for display only — band names, the six or seven words that ever appear at large size. **Inter** (OFL) for everything else, including the micro-label register at 10px uppercase, +0.09em tracking (§2.6), carrying dates, series names, file names, and the `SIZE NOT STATED IN SOURCE` marker. One display face, one working face.
- **Palette — three grounds, one inversion.** Bone `#E8E0CE` sampled from `Hokusai-shikishiban-still-life.jpg`'s paper (§6.5) — the table is paper-coloured, so the sheets do not look like mistakes on it. Ink `#191713`. And **one dark plate `#0E1116`** used exactly twice: for the Daruma inversion (band 8) and for the full-screen inspection mode. §4.4 — one total environmental inversion, deployed for the one thing in the article that does not fit on a table. Blue `#20406B` (sampled from the Wave) appears in band 5 only, and only on the four waves' labels — the colour is a claim about which objects are the same kind of thing.
- **Imagery — the entire design.** Sheets at true file aspect, edge to edge, **no frames, no radius, no shadow, no crop** (§3.1, §3.8). Paper tone, foxing, uneven trims and the Google Art Project scan artefacts are all left in (§6.6). At full inspection scale, captions disappear entirely — the print carries its own signature and series cartouche (§3.9). The one place text is *added* to an object: the `Veld_in_de_Owari_provincie` / *"Amida Falls"* discrepancy is printed under that sheet in the micro-register, both strings, with the note that the source disagrees with itself.
- **Motion grammar — sliding is not animation.** Horizontal position is 1:1 direct manipulation with **no easing and no inertia**: sheets move exactly as far as the hand moves, because paper does not ease. Zoom-to-inspect is 350ms (*transformation*). The dark inversion is 900ms (*absorb this*). Three motions, all nameable. Nothing fades up, ever.

### Interaction model
Drag / wheel / ←→ / trackpad-horizontal all move the table; a persistent thin position rule at the bottom shows where in the 26 you are and lets you jump. Click any sheet to inspect at full bleed; click again or Esc to return. The prose band expands upward from the bottom edge without moving the sheets. Band names are a jump menu, so the reader can go straight to *Water* — free roaming is available in the first frame.

### Latency story
Strong. The table's first paint is **26 correctly-proportioned rectangles filled with each file's dominant colour**, laid out at final positions. That composition already reads as a print table before a single image decodes — the aspect ratios come from `media-list.json`/`content-model` and cost nothing. Images then decode strictly in view order, left to right; off-screen sheets stay as colour plates indefinitely. The first screen requires exactly one decoded image. Local assets are already 70–700KB each, so responsive `srcset` off the existing 500/960/1280px variants is mandatory, not optional.

### Honest weaknesses
- **26 images is a small collection for a collection-first design.** The table has to be short and dense, or the sheets have to be large enough that 26 fills real distance. There is no third option, and getting it wrong makes the page feel like a slideshow.
- **Horizontal navigation is genuinely hostile** on desktops with vertical-only scroll habits, and the affordance has to be loud enough to teach without being a tutorial.
- The subject-matter bands are **partly my editorial inference.** Only the courtesans/actors → landscapes/plants/animals shift is sourced (p0, p8). "Water," "ghosts," and "the rest of the world" are mine and must be marked as generated groupings, which puts a disclaimer register on roughly half the table.
- At 390px, one sheet fills the screen and the four-waves adjacency — the concept's best moment — dies. It needs a bespoke 2×2 layout at that breakpoint, which is a real exception, not a graceful degradation.
- Lowest surprise of the four. A horizontal artifact surface is the *correct* answer for this information type, and correct answers are less startling than invented ones. It wins on fit and loses on "I'd never have thought of that."

---

# Concept D — **Impression**

### Organizing idea
Follow one sheet through the system that made it — drawing, block, another man's knife, colour, edition, shop, fire, Paris, a dinner plate, a score cover, a vitrine — because the article's least-known and most specifically sourced material is about **whose hands were on these objects**, and because the only reason any of it survives is that it was never unique.

### Why this article demands this form

This is the concept built on the content nobody notices, and the content is stronger than it looks.

- **p13 is a documented authorship dispute at the scale of a nose.** Hokusai wrote to his publisher that the blockcutter **Egawa Tomekichi** *"had strayed from Hokusai's style in the cutting of certain heads,"* and wrote directly to **Sugita Kinsuke** that he disliked the Utagawa-school manner in which Kinsuke *"had cut the figure's eyes and noses,"* enclosing drawn examples of both styles. Two named craftsmen, in this article, absent from every popular account of Hokusai. A whole movement exists here.
- **p19 states the destructive mechanic outright.** The *Great Picture Book of Everything* survives *"since the book was never made, so the drawings never destroyed as typically happened in the woodblock making process."* The process consumes the original. That is the concept's thesis, sourced in one clause.
- **p30 states the colour mechanic and the market.** *"Store Selling Picture Books and Ukiyo-e … shows how these prints were sold at local shops, and ordinary people could buy ukiyo-e. Unusually in this image, Hokusai used a hand-colored approach instead of using several separated woodblocks."*
- **p5 closes the loop:** at 14, before he ever entered a painter's studio, *"he worked as an apprentice to a woodcarver."* He was on the cutting side first.
- **p21 and p15 supply the proof.** In 1839 a fire destroyed his studio and much of his work — the originals burn. The 18 × 10.8 m Great Daruma was destroyed in 1945, but *"Hokusai's promotional handbills from that time survived and are preserved at the Nagoya City Museum."* **The throwaway printed advert outlived the monument.** Two independent instances of the same thesis, both in the source.
- The whole `Influence on art and culture` section (623 words, the second-longest) is *the same process continuing after his death*: Bracquemond finds a sketchbook **at his printer's workshop** c.1856 → images are copied onto the Rousseau Service dinnerware → shown at the 1867 Universal Exposition → reissued in several editions → Debussy *"specifically requested that it be used on the cover of the published score, which was widely distributed."* Reprinting, all the way down. It is not an appendix here; it is stations 8 and 9.
- §1's first row (`Causal mechanism`) prescribes exactly this treatment: **section order = the causal chain itself**, one column, diagrams at prose width, each entity a permanent colour, every animation pausable, representation stripping down as abstraction rises.

### Structure

Density curve: **converging** — wide, discursive stations at the start; each station tighter than the last; then one inversion and a release. Nine stations, discretely stepped.

| Station | Sections mapped | Content |
|---|---|---|
| 1. **The drawing** | p19, p14 | What survives is what was never printed: the *Great Picture Book of Everything*. `Hokusai-MangaBathingPeople` |
| 2. **The block** | p5, p14 | Apprenticed to a woodcarver at 14. `Egrets_from_Quick_Lessons_in_Simplified_Drawing` — a manual is instructions for someone else's hand |
| 3. **The other hands** | p13 | Egawa Tomekichi and Sugita Kinsuke, named. The disputed detail — eyes and noses — set inline at x-height inside the sentence that names it (§3.7). The station that dismantles the solitary-genius reading |
| 4. **The colours** | p30, p16 | Hand-colouring vs separated blocks. The sampled blue enters here **as a colour, never as a pigment claim** |
| 5. **The edition** | p2, p14, p16 | 30,000 works; *Manga* 12 volumes by 1820 plus 3 posthumous; ten extra prints added to *Thirty-six Views* because it sold. `SIZE OF EDITION — NOT STATED IN THIS ARTICLE` |
| 6. **The shop** | p30 | Ordinary people could buy them. Fifty pupils (p10); the manuals were *"a convenient way to make money"* (p14) |
| 7. **The fire** | p21, p15 | **The inversion.** Dark plate. 1839: studio and much of his work destroyed. 1945: the Great Daruma destroyed; the handbills survive. Nothing else on the screen |
| 8. **The diaspora** | `Influence on art and culture` p23–p27 | c.1856 Bracquemond at Delâtre's workshop → Rousseau Service → 1867 Exposition → 1905 `Debussy_-_La_Mer…jpg` → the collector list (Degas, Gauguin, Klimt, Marc, Macke, Manet, van Gogh) → Degas's quote → 2005 Tokyo National Museum, 2017 British Museum |
| 9. **The vitrine** | p27, coda | The same sheet, one last time, at the scale of an exhibition label. A change of scale, not a summary (§4.6) |

Biography material is distributed into the stations as dated marginal notes; the full article text is one panel away at every station (§4.9).

### Visual language

- **Type — two families, Split C (author/system, §2.1).** **Fraunces** (OFL, variable, with real optical-size and `wonk` axes) for narration and display; **JetBrains Mono** (OFL) for the system voice — station numbers, dates, `NOT STATED IN THIS ARTICLE` markers, source anchors. Again deliberately not IBM Plex.
- **Palette — the keyblock logic.** Two grounds: bone `#EDE6D6` and, at station 7 only, `#0C0C0D`. One permanent entity colour per actor, assigned once and never reassigned (§6.1): **Hokusai = sumi `#1B1815`**; **the blockcutters = the sampled blue `#20406B`** (they are the only other named makers in the article, and giving them a colour of their own is the argument); **the market/afterlife = vermilion `#B23A22`**. Every diagram is drawn in flat, hard-edged shapes with no gradients — the visual language of a cut block (§6.7, one drawing register).
- **The motif (§6.4).** A corner **registration mark** — the alignment cross a printer uses to make successive impressions land on each other. It appears once per station, reparameterised: at station 1 it is absent, at 3 it is misaligned, at 4 it multiplies, at 7 it is burnt away, at 9 it is behind glass. It means alignment across copies, and it is the one motif nobody would derive from any other subject.
- **Motion grammar — one signature motion: registration.** Elements arrive offset by a few pixels and **snap into alignment**, 150ms (*transformation*, and literally what the process does). Used once per station, never twice. One accumulating diagram repeated with additions (§4.5): the same sheet re-shown at each station with one more hand on it. Global pause, bottom-left, on every station (§5.2).
- **Truth guard:** no simulated colour separation. Channel-splitting a JPEG to fake "the blocks" would be invented imagery presented as process evidence (§7.4). The colour argument is made with flat drawn shapes labelled as a diagram, not with a fake decomposition of a real print.

### Interaction model
Explicit stepping — `NEXT` / `BACK` plus keyboard, with scroll-bound motion *inside* a station only. Deliberately not a continuous scroll, because the process has discrete stages and continuous scroll would imply it does not. A station index is always visible and jumpable. At station 5, a slider showing the same file repeated *n* times — honest, because it is literally the same file, and multiplicity is the point.

### Latency story
Very strong. Stations are text plus CSS shapes; the registration marks are pure CSS. **Station 1 is complete at first paint with no images.** Only 6 of the 26 images are used and they load per station. The whole experience is under 400KB of image weight.

### Honest weaknesses
- **The source material is thin.** Four paragraphs (p5, p13, p19, p30) carry the entire concept. Everything a reader would want next — how a block is actually cut, what a baren is, edition sizes, who the publisher was — is outside the article, and importing it is forbidden. The page must stay narrower than the reader's curiosity, and that is uncomfortable.
- **Risk of becoming a general ukiyo-e explainer that is not about Hokusai.** If stations 2 and 4 drift into how woodblock printing works in the abstract, the concept has lost its subject.
- It **demotes the works to evidence** for a process argument — a strange choice when the works are this good and this well-supplied. Rubric #1 could reasonably score this down: another form (C) communicates the dominant information type better.
- Nine stations is a lot of apparatus for a 2,760-word article. Four of the nine are one paragraph each.
- Stepped navigation removes the reader's ability to skim, which is a legibility regression against the Wikipedia page unless the full-text panel is genuinely good.

---

# Comparison matrix

Scored 1–5, **higher is better on every row** — including the two risk rows, which are inverted so that 5 = low risk.

| | A · Nothing Before Seventy | B · Thirty Names | C · The Table | D · Impression |
|---|---|---|---|---|
| **Information-design fit** | 5 — the axis is the subject's own | 4 — right periodization, thin in two entries | 5 — the §1 artifacts row, exactly | 3 — correct form for the *least* dominant structure in the article |
| **Surprise** | 5 — the Wave lands inside his own dismissal | 5 — a biography as a version registry | 3 — correct, therefore less startling | 4 — the handbills outliving the monument |
| **Cliché risk (inverted)** | 4 — age-axis flirts with the banned timeline | 5 — nothing resembles this | 3 — "horizontal image gallery" is a known move | 5 — a process pipeline for an artist is unusual |
| **Implementation risk (inverted)** | 3 — drag-predict, date arithmetic, responsive plot | 4 — mostly typography and state; kanji subsetting | 4 — one hard interaction, one hard breakpoint | 3 — nine stations, custom diagrams, most authoring |
| **Latency fit** | 5 — whole graph from one quotation, zero requests | 5 — "8 of 30+" before any asset | 4 — 26 colour plates at true aspect | 5 — station 1 needs no image |
| **Total** | **22** | **23** | **19** | **20** |

A caveat on the totals: B edges A on points largely because it takes fewer risks. A's ceiling is higher and its floor is lower.

---

# "Could any of these be mistaken for Three Bodies' system?"

**Yes — Concept A, and only Concept A.** It is a real risk, not a theoretical one.

Three Bodies is: a numeric axis derived from the source; events plotted on it; scroll bound to the axis; multiple parallel lanes; silence and simultaneity as the payload; IBM Plex; tabular figures. Concept A shares the first two of those. Left unconstrained it would drift into the third, and then a critic comparing the two experiences side by side would correctly say *this system plots things on a line derived from the article* — which is exactly the generic-system verdict this benchmark exists to avoid.

**The fix, stated as three binding constraints on Concept A:**

1. **The plot is a fixed plate, not a scroll rail.** The entire graph fits one viewport and never advances with scroll. Scroll moves between movements; it never moves the axis. Three Bodies' core verb is *scroll = time*. Concept A's core verb is *drag = judgement*, and the axis does not move at all.
2. **The y-axis must be a quotation.** Three Bodies has a single axis (time) with lanes hung off it. Concept A must be genuinely two-dimensional, with the vertical dimension carrying Hokusai's own eight-level attainment scale in his own words. If a build ships where the y-axis is decorative — where works are strung along a horizontal rail with vertical position meaning nothing — it has collapsed into Three Bodies with a Japanese palette and must be scrapped, not patched.
3. **One series, no lanes, no clock, no elapsed-time readout.** The posterity material (movement 5) is a *sequel* on a relabelled axis, shown after the first axis ends — never a second parallel lane running alongside the first. The moment two tracks coexist vertically, the concept is Three Bodies.

Two smaller, cross-cutting divergences that apply to all four concepts and are worth enforcing as a matter of system hygiene:

- **No IBM Plex anywhere.** Three Bodies uses Plex Mono / Sans Condensed / Serif. Type is the fastest way two experiences read as one system. A uses Newsreader + Space Mono; B uses Shippori Mincho + Zen Kaku Gothic New; C uses Instrument Serif + Inter; D uses Fraunces + JetBrains Mono.
- **No monospace as the default apparatus register in B.** Three Bodies established mono-as-instrumentation. B drops mono entirely and uses a Japanese-capable sans instead — a deliberate, visible refusal of the house style.

**B, C and D carry essentially no risk.** B has no temporal axis at all and re-renders on selection. C's primary axis is horizontal, its primary verb is zoom, and its ordering is a subject-matter taxonomy rather than a sequence. D shares "one continuous spine" with Three Bodies in the loosest sense, and is separated by two structural facts: its spine is *material state*, not elapsed time, and it is discretely stepped rather than continuously clocked. D must carry **no timestamps in its apparatus register at any point** — dates appear only in the marginal biography notes, never as a running readout.

---

# Recommendation

**Build Concept A — *Nothing Before Seventy* — under the three binding constraints above. Hold Concept B as the fallback.**

Why A:

1. **The organizing idea is supplied by the subject, in the first person, and the article does not use it.** That is the strongest possible answer to "why this form for this subject," and it is the same class of justification that carried Three Bodies (a form that repairs a defect in the source), arrived at from a completely different direction. The colophon is sitting in `sections[3].quotes[0]` as an eight-point ordinal scale that Wikipedia renders as a nice inspirational block quote.
2. **It puts the works at the centre anyway.** The point set *is* the collection — 16 sheets at true aspect, openable at ≥55% viewport with their paper intact. It satisfies the artifacts row of §1 while organizing on an axis no artifact-collection page would ever use.
3. **It solves the Great Wave eclipse by measurement rather than by rhetoric.** The Wave is not demoted by being made small; it is demoted by being plotted at ages 68–72 against its author's own statement that nothing before 70 counted. That is a fact, not a gesture, and it is the single strongest "I would never have thought to present it that way" moment available in this article.
4. **Best latency story in the set**, and structurally so: the complete graph derives from one quotation and paints in the first frame with zero network work. The mission's "magical in the first seconds" requirement is met by the concept, not by an optimisation pass.
5. **It fails loudly.** If the constraints are violated the result is visibly a timeline and gets scrapped. For a benchmark whose purpose is to test whether the system can avoid its own house style, a concept with an unambiguous failure condition is more useful than a safe one.

**One legitimate borrowing from B, which is not a hybrid:** A's age axis should carry the **eight name changes as tick marks along its upper rule** — Shunrō at 18, Hokusai Tomisa at 37, Katsushika Hokusai at 39, Taito at 51, Iitsu at 59, Gakyō Rōjin Manji at 73 — because p4 states that the names *are* how his life is divided. A is not adopting B's architecture; it is adopting the source's own periodization for its axis labels, which is what §1.1 asks of any concept.

**Fallback trigger for B:** if a first build shows the datable-works distribution is too sparse to carry movement 3 — if 16 points across 70 years reads as noise rather than as a distribution — the plot cannot be rescued by design, and *Thirty Names* should be built instead. B is the concept least like anything else this system has produced, needs no arithmetic, and its thinnest material (the two empty entries) is a smaller problem than A's thinnest material (the whole x-axis).

**Do not build C or D first.** C is the correct answer and would score well and surprise nobody; it is the right thing to fall back to if both A and B fail on craft grounds. D is the most interesting essay and the weakest fit — it is a genuinely good piece about the wrong dominant structure, and it is better held as a *movement inside* another concept (station 3, the blockcutters, would strengthen any of the other three) than shipped as a whole experience.

---

## Appendix — proposed addition to DESIGN_PRINCIPLES §1

Concept B does not fit any existing row of the information-type table. Proposing one, since TASTE_RUBRIC states the rubric is itself under test:

| Informational structure | Signals in the source | Form to reach for | Form to refuse | Evidence |
|---|---|---|---|---|
| **Versioned identity** — one entity that renames, reissues, or re-founds itself | many names/editions/eras for the same subject; the source says the versions "are used for breaking his life into periods"; a documented count larger than the documented list | A registry with a slot per version, including the undocumented ones as visible blanks; selecting a version re-renders the whole page — masthead, palette, content set. The *count of what is missing* is primary information | A chronology of the changes; a tabbed interface where only the panel content swaps | Hokusai `p4`, `semantic.names` (8 documented of "at least thirty") |
