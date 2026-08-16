# Apollo 11 — Four Art-Direction Concepts

Source: `benchmarks/apollo-11/content-model.json` (39 sections, ~11,700 words of body prose, 34 images, 40-row infobox, 5 tables, 8 verbatim quote blocks).

Before the concepts, three observations about *this* article that any honest design has to answer to:

1. **The source article is wrong about simultaneity.** Wikipedia serializes three concurrent threads. "Columbia in lunar orbit" (§22) is placed *after* "Lunar ascent" (§21), but describes events happening *during* §20. Collins' 48-minute radio blackouts, the surface EVA, and Luna 15's crash "two hours before Apollo 11's launch [from the Moon]" are all interleaved in reality and flattened in the text. This is a genuine information-design defect, not a stylistic one.
2. **The article is unusually timestamped.** Prose and infobox together give ~20 events resolved to the second (13:32:00, 17:44:00, 20:17:40, 02:39:33, 02:56:15, 05:11:13, 17:54:00, 21:35:00, 16:50:35). Very few Wikipedia articles support a real clock. This one does.
3. **The article contains a second, quieter article.** Abernathy at the gates, Gil Scott-Heron's "Whitey on the Moon", Norbert Wiener's "moondoggle", the Gallup turn to 59% favoring cuts by 1973, Soviet information suppression, and the erased original slow-scan tapes. Standard Apollo design language has no register for any of it.

Each concept below is organized around a different **axis**: time, choice, matter, audience.

---

## Concept A — **Three Bodies**

### Organizing idea
The mission is rendered as a three-stave score on a single shared clock — Houston, *Eagle*, *Columbia* — where vertical position *is* Universal Time, so that separation, silence, and simultaneity become visible facts rather than paragraphs you have to reassemble in your head.

### Why this information demands this form
This is the concept with the strongest claim, because it repairs a defect in the source rather than decorating around it.

- The article gives us a mission that is literally a three-body problem: three men, three vehicles, and, from 17:44:00 on July 20, three physically separated locations with different information.
- Collins' story only works against a clock. "In the 48 minutes of each orbit when he was out of radio contact with the Earth while *Columbia* passed round the far side of the Moon" (§22) is a *rhythm* — 30 orbits, a repeating gap. In prose it is a sentence. On a stave it is a dashed line that goes dark 30 times.
- The 1202/1201 alarms (§18) are a Houston-lane event that resolves an *Eagle*-lane crisis: Garman → Bales → CAPCOM → crew. The chain of custody of that decision is the whole point, and it crosses lanes.
- The landing (§19) is a descending ladder of real numbers — 6,000 ft, 250 ft, 107 ft, 100 ft with 90 seconds of propellant, contact light, 216 lb usable fuel remaining — that reads as a countdown *within* a countdown.
- Luna 15 (§21) crashed at 15:50 UTC, roughly two hours before *Eagle* lifted off at 17:54:00. That fact is only meaningful as an adjacency. It deserves a fourth, uninvited lane.
- The infobox is not a sidebar here — it is a second data source that co-signs the prose clock (docking 16:56:03, orbital insertion 17:21:50, orbital departure 04:55:42, landing 16:50:35).

### Structure

The page has an **on-clock** middle and **off-clock** ends. That asymmetry is the pacing.

| Movement | Clock | Sections mapped | Treatment |
|---|---|---|---|
| 0. Before the clock | — | `Background`, `Prime/Backup/Support crew`, `Capsule communicators`, `Flight directors`, `Other key personnel`, `Insignia`, `Call signs`, `Mementos`, `Site selection`, `First-step decision` | Single column, quiet, typographic. The Kennedy quotes (§1) run full-bleed. Ends with the five flight-director team colors being *assigned* — this is where the palette is established, and it comes from the source. |
| 1. T-minus | 04:00 → 13:32:00 | `Pre-launch` | One lane. Tight, procedural, near-monospace. |
| 2. Ascent and transit | 13:32:00 → 17:21:50 (Jul 19) | `Launch and flight to lunar orbit` | One lane, but the clock's scale visibly *stretches* — three days compressed into a short scroll. |
| 3. **The split** | 17:44:00 (Jul 20) | `Lunar descent` | The single lane divides into two. This is the page's hinge and should be its most composed moment. |
| 4. Descent and landing | 17:44:00 → 20:17:40 | `Lunar descent`, `Landing` | Two lanes plus Houston. Altitude and propellant run as a marginal gauge, not a chart. |
| 5. **Surface** | 23:43 → 05:11:13 | `Lunar surface operations`, and `Columbia in lunar orbit` **interleaved at its true times** | Three lanes. Collins' lane goes dark on schedule. Densest passage on the page. |
| 6. Ascent and rejoin | 15:50 → 21:35:00 (Jul 21) | `Lunar ascent` | Luna 15's crash appears as an uninvited fourth lane at 15:50, then ends. Lanes converge at 21:35:00. |
| 7. Home | 04:55:42 (Jul 22) → 17:53 (Jul 24) | `Return`, `Splashdown and quarantine` | Collapses back to one lane; the clock's scale stretches again for the coast home, then compresses hard for the 7 minutes between drogue deploy (16:44) and splashdown (16:50:35). |
| 8. After the clock | — | `Celebrations`, `World tour`, `Cultural significance`, `Legacy` and all children, `Films and documentaries`, `Multimedia` | The staves dissolve. Deliberately un-clocked: 21 days of quarantine, a 38-day tour, 50 years. Set as continuous prose with the dissent material (§28) given its own weight. |

**Emphasis:** §17–24 (the mission, ~5,600 words) gets the full apparatus. **Compressed:** `Celebrations`, `World tour`, `Legacy` subsections — present in full text, but in a flat, quiet register. **Secondary access:** `Films and documentaries` and `Multimedia` lists as an end-matter index; `Other key personnel` and `Flight directors` tables reachable from any lane header.

### Visual language

- **Type.** IBM Plex Mono for all time values and lane labels (tabular figures are non-negotiable — a clock that jitters is a broken clock); IBM Plex Sans Condensed for lane headers and marginalia; IBM Plex Serif for body prose so that narrative and instrumentation are typographically *different species*. All OFL, all self-hostable.
- **Palette.** Taken directly from the `Flight directors` table, which names five real team colors: **Green** (Charlesworth — launch and EVA), **Gold** (Griffin), **White** (Kranz — lunar landing), **Black** (Lunney — lunar ascent), **Maroon** (Windler — planning). Lane and shift accents are these, on a ground of 1969 flight-plan paper: bone `#EDE8DE`, process black, and a single alert red reserved *exclusively* for the 1202 alarm, the 90-second propellant call, and the Luna 15 lane. Nothing else is red, ever.
- **Imagery — load-bearing, by filename:**
  - `10-Apollo_11_CSM_photographed_from_Lunar_Module (AS11-37-5445)` and `11-Apollo_11_Lunar_Module_Eagle_in_landing_configuration...` — these are a *pair*: each craft photographed by the other, at the moment of separation. Placed facing each other across the split in Movement 3, they carry the entire concept in one composition.
  - `12-Apollo_11_Landing_Site_&_West_Crater.png` — the only image that explains why Armstrong took semi-automatic control.
  - `19-Earth,_Moon_and_Lunar_Module (AS11-44-6643)` — the rejoin.
  - `17-Aldrin_Looks_Back_at_Tranquility_Base` for the EVA lane; `20-Splashdown_3` for Movement 7.
  - Photographs are inset *into* their lane at their timestamp, at lane width — never full-bleed during the on-clock movements. Full-bleed is reserved for Movements 0 and 8, so that the clocked middle feels instrumented and the ends feel human.
- **Motion grammar.** One rule: **the only thing that moves is time.** Nothing fades in, nothing rises, nothing parallaxes. Content is simply above or below the playhead. Two exceptions, both semantic: (1) a lane going dark on loss of signal — a hairline replacing a solid rule, no transition, because signal loss is instantaneous; (2) the propellant gauge, which only decreases. Loading states share the same grammar: unloaded blocks are ruled empty slots at their correct clock position, so the score is complete before the content is.

### Interaction model
Scroll is the clock and nothing else — no scroll-jacking, no snap. A pinned header shows the current UTC value and mission-elapsed time, updating from scroll position. Clicking a lane block expands the full source paragraph in place (collapsed state shows the first sentence). A "solo" control dims two lanes to read one thread continuously — this is how the reader recovers the linear article on demand. A minimap on the right edge shows the whole 8-day span with the current viewport marked, so the enormous scale distortions between movements stay honest.

### Latency story
Best-in-class. The score's geometry — lanes, rules, tick marks, every timestamp — derives entirely from the infobox and a small event table, so **the complete structural skeleton is inline SVG/CSS and paints in the first frame with zero network work.** The reader sees the shape of the mission before a single word arrives. Prose then streams lane by lane into pre-sized slots (no reflow). Images are last and are only six; each slot reserves its aspect ratio and holds a dominant-color plate. Fonts: inline a subsetted Plex Mono (digits, colon, uppercase) for first paint; lazy-load the serif.

### Honest weaknesses
- **Timeline adjacency.** The rubric explicitly penalizes "every subject gets a timeline." At thumbnail scale this could be mistaken for one. The defense has to be structural, not decorative: a timeline is a decorated rail with events hung off it; this is a *multi-track score with variable time scale and meaningful silence*. If the built version has a visible vertical rail with dots on it, the concept has failed and should be scrapped.
- **Mobile.** Three lanes at 390px is the real risk. Fallback: lanes become a single column with a persistent left gutter showing which body you are with, and the "solo" control gets promoted to the default interaction. This is a genuine degradation, not a graceful one.
- **Lane density is uneven.** Collins' lane is sparse — §22 is 369 words against §20's 1,298. Design must treat that emptiness as the subject (it is literally the story of solitude) rather than trying to fill it.
- Movements 0 and 8 hold roughly 5,000 words with none of the apparatus. If they are not independently well-composed, half the article is a dumping ground.

---

## Concept B — **The Narrowing**

### Organizing idea
Apollo 11 presented not as a sequence of events but as a sequence of *eliminations* — seven or eight moments where a field of live options was cut down to one — with the reader operating the constraints and watching possibilities go out.

### Why this information demands this form
The article is startlingly rich in decision content, most of which is invisible in the popular telling, and one section is already a machine-readable filter specification.

- **`Site selection`** contains a literal enumerated list of **seven criteria** and **five candidate sites** (1 and 2 in Mare Tranquillitatis, 3 in Sinus Medii, 4 and 5 in Oceanus Procellarum). Criteria include "the Sun would be between 7 and 20 degrees behind the LM" and "a general slope of less than two degrees" — and the Sun-angle constraint alone "limit[ed] the launch date to one day per month." That is a constraint-satisfaction problem sitting in a bulleted list, waiting to be made operable.
- **`Background`** contains the architecture decision: lunar orbit rendezvous chosen over direct ascent and Earth orbit rendezvous — a three-way choice that determined the entire vehicle stack.
- **`First-step decision`** is 383 words of pure contested decision-making with *four competing explanations* in the source (hatch geometry; Armstrong was a civilian; commander's prerogative; and Kraft's 2001 revelation of a meeting held specifically to ensure it would not be Aldrin). An article that gives four rival accounts of one decision is asking for a form that can hold four rival accounts.
- **`Insignia`** is a rejected-and-revised design: the eagle's talons were "too warlike," so the olive branch moved to the talons. **`Call signs`** is the same: *Snowcone* and *Haystack* rejected as too flippant after Apollo 10's *Charlie Brown* and *Snoopy*.
- **`Splashdown and quarantine`** contains a magnificent buried decision: Captain Hank Brandli reading classified spy-satellite imagery, recognizing a storm front, and a chain of officers moving the recovery area 215 nautical miles, "each man risking his career."
- **`Landing`** is decision-making under a shrinking budget: Armstrong serially rejects a boulder field, then a crater, with propellant as the resource being spent on deliberation.

### Structure

Eight decisions, each a self-contained scene with the same internal grammar (options → constraints → survivor → consequence), which gives the page coherence without a metronome, because the *media* of each scene differs completely.

| Scene | Decision | Sections mapped |
|---|---|---|
| I | How do you get there at all? | `Background` (LOR vs. direct ascent vs. EOR), `__lead__` |
| II | Where do you land? | `Site selection` — the interactive centerpiece |
| III | Who goes? | `Prime crew`, `Backup crew`, `Support crew`, `Capsule communicators`, `Flight directors`, `Other key personnel` |
| IV | Who steps out first? | `First-step decision` — four rival explanations shown as four unresolved branches |
| V | What do you call it, and what does it look like? | `Insignia`, `Call signs`, `Mementos` |
| VI | Continue or abort? | `Lunar descent` (1202/1201), with Hamilton's quote as the verdict |
| VII | Where exactly do you put it down? | `Landing` — propellant as budget |
| VIII | Where do you come down? | `Splashdown and quarantine` (the storm) |
| Coda | Decisions that could not be unmade | `Cultural significance`, `Legacy`, `Spacecraft`, `Moon rocks`, `Anniversary events`, `40th`, `50th` |

**Emphasis:** `Site selection`, `First-step decision`, `Lunar descent`, `Landing`. **Compressed:** `Launch and flight to lunar orbit`, `Lunar surface operations`, `Lunar ascent`, `Columbia in lunar orbit`, `Celebrations`, `World tour` — these become the *consequence* panel of the decision that preceded them, full text present but subordinated. **Secondary:** all lists and tables reachable from their scene.

This is the concept with the most aggressive compression of the mission narrative, and that is the honest trade: it buys an argument about how the mission was actually made.

### Visual language
- **Type.** Archivo (variable, OFL) for everything structural — it has the tabular figures and the width axis to move between a 14px criterion label and a scene number without changing family. Archivo Narrow for constraint labels. IBM Plex Mono for numeric readouts only. No serif anywhere: this is a document register, not a narrative one.
- **Palette.** NASA technical-report offset printing, not blueprint (blueprint is the cliché). Warm paper `#F4F1EA`, process black, one spot ink — the **red-orange of a rejected stamp** — used only for eliminations. A second neutral, graphite, for surviving-but-inactive options. Three inks total, which is what a 1969 contractor report could actually afford.
- **Imagery.** Deliberately image-light; this concept's medium is line drawing.
  - `07-Lunar_site_selection_globe.jpg` — load-bearing for Scene II. **Note: this asset is not yet downloaded to `assets/`; only `500px` exists in the model.** Resolution may be inadequate at scale.
  - `12-Apollo_11_Landing_Site_&_West_Crater.png` — Scene VII, essential.
  - `01-Apollo_11_insignia.png` — Scene V, must be shown at large scale so the talons/olive-branch detail reads.
  - `03-John_F._Kennedy_speaks_at_Rice_University.jpg` — Scene I only.
  - Everything else is inline SVG line art in one weight.
- **Motion grammar.** Motion means **elimination**. Rejected options are struck through and drop out of the layout with their space collapsing — never fade, because fading implies uncertainty and these were decisions. Surviving options translate to fill the vacated space. The only other motion is the propellant gauge in Scene VII, which only decreases. Reduced-motion mode shows terminal states with strike-through intact, losing nothing.

### Interaction model
Scroll advances between scenes; *within* a scene the reader operates a control. Scene II is the anchor: seven criteria as toggles, five candidate sites live, and as each real criterion is applied sites extinguish — ending with Site 2 and the note that Apollo 10's LM flew within 15 km of it and reported it acceptable. Scene IV presents the four rival explanations as four cards that *stay* unresolved — the reader cannot pick a winner, because the source does not. Scene VII runs the altitude/propellant ladder on scroll.

**Truth discipline:** every constraint toggle carries its verbatim source text; no site is eliminated by an invented rule. The article does not give per-site numeric values for slope or Sun angle, so the interactive must present elimination as *narration of the documented outcome*, not as a computed simulation. Any inferred connective tissue is set in the graphite neutral and labelled.

### Latency story
Good. All eight scenes are line art and type; the whole page can render structurally with no images. Scene II's interactive is inline SVG and pure JS with a payload measured in kilobytes. The four images stream in with reserved boxes. Risk: the interactives are JS-dependent, so a no-JS or slow-JS state must show all terminal states statically — build it terminal-state-first and layer interaction on top.

### Honest weaknesses
- **Quiz-feel.** The single largest risk. If Scene II reads as a puzzle the reader is being asked to solve, the concept collapses into edutainment. The controls must feel like *reading an argument* — closer to a legal exhibit than a game.
- **Scope.** Eight bespoke interactives is by far the heaviest build here. Realistically only Scenes II, VII, and one other can be fully realized; the rest must degrade to composed static scenes. Plan for three, not eight.
- **Compresses the emotional center.** The moonwalk itself becomes a consequence panel. Defensible, but a reader who came for the landing may feel the page is withholding.
- Scene I's LOR/direct-ascent/EOR comparison requires diagramming three trajectory architectures the article describes only in words. High fabrication risk — the diagrams must stay schematic and topological, never pseudo-accurate.

---

## Concept C — **Manifest**

### Organizing idea
The mission told entirely through the objects it carried, left, lost, and scattered — a catalog organized not by *when* but by *where each thing is right now*, from the Sea of Tranquility to the Atlantic seabed to an unknown heliocentric orbit.

### Why this information demands this form
The article's object-provenance density is genuinely unusual, and it is buried in prose where it cannot be seen as a set.

- **Carried up:** five 0.5-lb personal preference kits; a piece of wood from the **left propeller** and fabric from the wing of the **1903 Wright Flyer**; a diamond-studded astronaut pin that the widows of the Apollo 1 crew gave to Slayton; flags of the United States and American Samoa.
- **Left behind:** the plaque; an Apollo 1 mission patch for Chaffee, Grissom and White; memorial medals for **Vladimir Komarov and Yuri Gagarin**; a gold replica of an olive branch; a silicon disk carrying goodwill messages from **73 countries**; two PLSS backpacks; lunar overshoes; an empty Hasselblad; a flag planted 25 feet from the LM that the ascent engine knocked over, witnessed by Aldrin.
- **Improvised:** the **nonconductive tip of a Duro felt-tip pen** that armed the ascent engine after Aldrin broke the circuit breaker.
- **Dispersed:** *Columbia* toured 49 state capitals, then Houston, St. Louis, Pittsburgh, Seattle and Cincinnati; 250 acrylic buttons, each holding four rice-sized grains of lunar soil weighing about 50 mg, given to 135 nations and all 50 states; 21.55 kg of samples stored under nitrogen at JSC and White Sands, ~500 prepared and shipped to investigators annually; the quarantine trailer at Udvar-Hazy.
- **Lost, found, uncertain:** the Hasselblad "thought to be lost"; the 16 mm Data Acquisition Camera found in a white cloth bag in Armstrong's closet after his death and reported by his widow in 2015; F-1 engines located on the Atlantic seabed by sonar in 2012, with a serial number found under the rust in 2013; the *Eagle* descent stage still on the Moon and photographed by LRO in 2009; the ascent stage untracked, with a 2021 Monte Carlo study predicting it "would never impact the lunar surface"; the S-IVB in solar orbit near Earth's.
- Three new minerals — **armalcolite** (Armstrong/Aldrin/Collins), tranquillityite, pyroxferroite — objects that did not exist as named things before the mission.

Chronology is the *wrong* index for this material. Location-in-the-present is the right one, and it produces a genuinely strange and true statement: the debris of one week in 1969 is currently distributed across the Moon, the Atlantic Ocean, a heliocentric orbit, 135 nations, and possibly a lunar orbit nobody can find.

### Structure

Not a scroll narrative — a **catalog with a spatial index**. Primary organization is six present-tense locations; chronology is a secondary axis available on every object.

| Case | Present location | Objects drawn from |
|---|---|---|
| 1 | **Still on the Moon** | `Lunar ascent`, `Lunar surface operations`, `Spacecraft`, `Experiment results` — plaque, patch, medals, olive branch, silicon disk, PLSS, flag, descent stage, retroreflector (still operational as of 2025) |
| 2 | **Returned** | `Spacecraft`, `Splashdown and quarantine`, `Moonwalk camera`, `Lunar Module Eagle memorabilia` — *Columbia*, suits, quarantine trailer, flotation collar, the 16 mm DAC |
| 3 | **Given away** | `Moon rocks`, `Celebrations`, `World tour`, `Mementos` — 250 sample displays, two flags to Congress, the American Samoa flag, Robbins medallions |
| 4 | **Under study** | `Moon rocks`, `Lunar surface operations` — samples under nitrogen, basalt and breccia, the three new minerals |
| 5 | **Recovered from the sea** | `Spacecraft` — F-1 engines, injector plates, the serial number under the rust |
| 6 | **Unlocated** | `Spacecraft`, `Moonwalk camera` — the *Eagle* ascent stage, the S-IVB, the Hasselblad; and the original slow-scan tapes from `Lunar surface operations`, "likely destroyed during routine magnetic tape re-use" |

Each object opens to a **provenance strip**: `made / chosen → what it did → where it is now → source §`. The "what it did" link is the article's narrative, so the entire mission chronology remains reachable object-first. An explicit **chronological view** toggle re-sorts the whole catalog by time, restoring the article's own order in one action — this is the truth-preservation guarantee.

**Emphasis:** `Mementos`, `Insignia`, `Spacecraft`, `Moon rocks`, `Lunar Module Eagle memorabilia`, `Moonwalk camera`. **Compressed:** `Background`, `Personnel`, `Celebrations`, `Cultural significance` — present, but as context panels rather than destinations. **Secondary:** the flight narrative, reachable per object.

### Visual language
- **Type.** Source Serif 4 (OFL) for object descriptions and provenance — a text face with enough texture to sit next to photographed metal. Public Sans (OFL, US federal design system — an apt institutional register) for catalog numbers, labels, and location headers, in small sizes with wide tracking.
- **Palette.** Museum vitrine, not space. A deep neutral ground — warm charcoal `#1C1A17`, not black, because black flattens photographed objects — with bone type, and a single brass/oxidized-gold accent for catalog numbers taken from the Robbins medallion and the gold olive branch. Object photographs are the only saturated things on the page.
- **Imagery — the most image-dependent concept, and this is its problem:**
  - `05-NASM-NASM2013-02663.jpg` — the Smithsonian's very-high-resolution 2007 capture of the command module cockpit from above. This is the single best asset in the entire set and it is *deep-zoomable*. It should be the opening object and the page's showpiece.
  - `06-Apollo_11_Flown_Silver_Robbins_Medallion`, `27-Apollo_11_Kommandomodul_"Columbia"`, `28-ArmstrongSuit`, `29/30-F-1_Injector_Plate_(Front/Rear)`, `31-430-L1-S1_640` (Wright Flyer fabric and wood at the Wright Brothers National Memorial), `32-Apollo_11_Command_Module_in_Hangar`, `22-Apollo_11_Mobile_Quarantine_Facility`, `16-Apollo_11_plaque_closeup_on_Moon`, `15-Buzz_Aldrin's_bootprint` (whose caption correctly identifies it as *part of an experiment to test the properties of the lunar regolith* — not a monument).
  - **Objects with no photograph — the silicon disk, the felt-tip pen, the PPKs, the olive branch replica, the cosmonaut medals — are rendered as measured line drawings, in a visibly different register, explicitly labelled as depictions and not photographs.** The absence becomes the concept's most distinctive visual device and its clearest truth-preservation mechanism.
- **Motion grammar.** Motion means **handling**. Objects lift and scale as if picked up — translation and scale only, no rotation, no fade, with slow easing that implies mass. Provenance strips extend as measured lines, the way a museum label rule is drawn. Nothing floats.

### Interaction model
Browsing and pivoting rather than reading forward. Location filter across the top; a scale slider that sizes every object to its *true relative physical size* (a 50 mg grain of soil against a 5-short-ton command module) — a single control that produces a genuine shock and is entirely fact-derived. Deep zoom on the cockpit image. Chronological toggle as the escape hatch to the article's own order.

### Latency story
**The weakest of the four, and the honest reason to be cautious.** The concept is photograph-dependent by definition and the strongest images are the largest. Mitigations: (1) open on the *drawn* objects, which are inline SVG and render instantly, so the first seconds are the concept's most distinctive material rather than a grid of skeletons; (2) every plinth reserves its aspect ratio with a dominant-color plate; (3) the cockpit deep-zoom loads a small base tile first. Additional practical blocker: **most of this concept's load-bearing images are not yet in `assets/`** — indices 06, 22, 27, 28, 29, 30, 31 and 32 are all missing locally.

### Honest weaknesses
- **Card-grid collapse.** The rubric penalizes "uniform border-radius cards for every section." A catalog is one bad decision away from being exactly that. Survival depends on radical scale variation — the cockpit at full bleed, the 50 mg grain at 12 px — and on no object ever sitting in a rounded rectangle.
- **Chronology becomes hard.** A reader who wants to know what happened, in order, has to press a button. That is a real cost, mitigated but not erased by the toggle.
- **Reverence risk.** Museum framing can slide into solemnity and lose the mission's contingency — the broken circuit breaker, the tripping-hazard TV cable, the flag that fell over. The catalog copy must keep the article's own dryness.
- Highest asset-acquisition cost of the four.

---

## Concept D — **Received**

### Organizing idea
Turn the camera around: follow the *signal* rather than the crew — from a slow-scan camera on a ladder, through Honeysuckle Creek and Parkes, to 600 million people, to the ones outside the gates who were not celebrating, to the fifty-year decay of attention that followed.

### Why this information demands this form
There is a documented, quantified, and morally ambivalent reception story in this article that conventional Apollo design has no vocabulary for.

- **The transmission chain is absurd and specific.** Apollo 11 used slow-scan TV incompatible with broadcast standards, so it was displayed on a special monitor and *a conventional TV camera filmed that monitor* — "a broadcast of a broadcast, significantly reducing the quality of the picture." Received at Goldstone, better at Honeysuckle Creek near Canberra, then switched to Parkes. And the punchline: "recordings of the original slow scan source transmission from the lunar surface were likely destroyed during routine magnetic tape re-use at NASA." The best image humanity ever transmitted was degraded on purpose and then taped over.
- **The audience is counted.** 600 million viewers; "twenty percent of the world's population"; 33 countries; 25 million in the US; ~1 million spectators on the highways and beaches; 3,500 media from 56 countries; six million along the New York and Chicago parade routes; between 400,000 and 500,000 in Belgrade; 22 countries in 38 days.
- **The dissent is in the source, in primary voices.** Ralph Abernathy leading protesters outside KSC the day before launch — and Paine hosting them as spectators, and Abernathy praying for the astronauts. Gil Scott-Heron's "Whitey on the Moon," quoted verbatim. Wiener's "moondoggle." "If they can send a man to the Moon, why can't they...?"
- **The decay is measured.** Only once in the late 1960s did Gallup show a majority favoring doing *more* in space; by 1973, 59% favored cutting. Weinberger's warning that cuts "might send a signal that our best years are behind us." Soviet citizens split between indifference and anger, under limited information release.
- **The re-transmissions.** 2009: NASA streamed the original mission audio in real time, 40 years to the minute. 2019: the Saturn V projected on the Washington Monument, the last show delayed slightly so Armstrong's first step would land *exactly 50 years to the second*. Both are literal attempts to re-receive the signal.

### Structure

Five movements, following the signal outward and then watching it attenuate.

| Movement | Content | Sections mapped |
|---|---|---|
| I. **The chain** | Slow-scan → monitor → camera → Goldstone → Honeysuckle Creek → Parkes → 33 countries. The literal signal path, and the fact that the original was erased. | `Lunar surface operations` (transmission paragraphs), `Moonwalk camera` |
| II. **Six hundred million** | The scale field. One-fifth of everyone alive. Anchored by the girl holding *The Washington Post*. | `__lead__`, `Launch and flight to lunar orbit`, `Cultural significance` |
| III. **The ground** | Crowds as geography: the Cape, Broadway renamed "Apollo Way," Chicago, the 22-country tour, Belgrade's half-million, Buckingham Palace, the Berlin Wall, Kinshasa. | `Celebrations`, `World tour` |
| IV. **Not everyone** | Abernathy at the gates; Scott-Heron in full; "moondoggle"; the Soviet public; the Gallup turn. Given a full movement, not a paragraph. | `Cultural significance`, `Background` (Wiener) |
| V. **Half-life** | Attention collapses; follow-on missions lose the nation; budget pressure; and then the deliberate re-transmissions of 2009 and 2019. | `Cultural significance`, `Anniversary events`, `40th anniversary`, `50th anniversary`, `Legacy` |
| Spine | The mission itself, compressed to a legible vertical spine running the full page — every section present, set small and dense, so the events being received are always adjacent to their reception. | All of `Mission`, `Preparations`, `Personnel`, `Background` |

**Emphasis:** `Cultural significance`, `Celebrations`, `World tour`, `40th`/`50th anniversary`, and the transmission paragraphs of `Lunar surface operations`. **Compressed:** the flight narrative into the spine — full text, small setting. **Secondary:** `Films and documentaries` and `Multimedia` become the natural end-matter here, since they are literally a list of re-receptions.

### Visual language
- **Type.** Libre Franklin (OFL) — the Franklin Gothic lineage is the actual typographic voice of 1969 American newspapers — for headlines and numbers, used at genuinely large sizes. Petrona (OFL) for body text, a serif with enough irregularity to read as printed rather than rendered. Numbers set as display type: "600,000,000" as a headline, not a stat card.
- **Palette.** Newsprint, not space. Aged paper `#E8E4DA`, dense ink black, and the specific muddy grey of a 1969 halftone. One accent: **a broadcast-monitor amber** for signal-path elements only. Movement IV switches register entirely — flat, cold, near-white, no texture, no halftone — because the dissent material must not be aestheticized alongside the celebration.
- **Imagery — load-bearing:**
  - `26-Land_on_the_Moon_7_21_1969-repair.jpg` — a girl holding *The Washington Post*: "'The Eagle Has Landed' – Two Men Walk on the Moon." This is the thesis image. Everything else is support.
  - `23-Apollo_11_ticker_tape_parade_1.jpg` and `24-New_York_City_Welcomes_the_Apollo_11_Astronauts` — Movement III, crowds as texture.
  - `33-Apollo_11_projected_on_the_washington_monument.jpg` — Movement V, the closing image: the rocket returning as light on a monument. **Not currently in `assets/`.**
  - `25-Apollo_terrazzo.jpg` — the Hollywood Walk of Fame terrazzo, a small sharp note about what commemoration turns into.
  - `14-Buzz_salutes_the_U.S._Flag.jpg` — used once, in Movement I, deliberately shown at slow-scan fidelity before being shown clean.
  - Treatment: images in Movements I–III carry a real halftone/scanline degradation that *decreases* as the signal path resolves — a CSS/SVG filter, not a Photoshop mood. Movement IV images, if any, are shown clean and undegraded.
- **Motion grammar.** Motion means **propagation and attenuation**. Things travel outward from a point and lose fidelity as they go. In Movement V, elements do not animate in — they animate *out*, losing contrast on scroll, which is the movement's argument made physical. **Movement IV has no motion at all.** Its stillness against a page that has been moving is the loudest thing on the page.

### Interaction model
Scroll drives the signal path in Movement I — the reader watches the picture degrade through each real relay, with each stage labelled from the source. Movement II is a scale field the reader scrolls *through* rather than reads. Movement III is an inline-SVG world map of the 22 tour cities, clickable to the source detail. Movement V ends with a control that plays the 2019 timing conceit: the article's fact that the final show was delayed so the first step landed 50 years to the second is the closing beat, stated, not simulated.

### Latency story
Excellent — nearly as good as Concept A. The opening is a number and a diagram: both are type and inline SVG, and paint in the first frame. The halftone degradation is a CSS filter chain, costing nothing. The world map is inline SVG. Only three images are truly load-bearing and one of them (`26-Land_on_the_Moon`) is already local. The spine is text and streams first.

### Honest weaknesses
- **Moralizing.** Movement IV is the concept's reason to exist and its biggest hazard. If the design editorializes beyond what the source says, it fails the truth test in the opposite direction from fabrication. It must quote and count, and nothing else.
- **Under-serving the awe.** A reader arriving for the Moon landing gets the landing in a compressed spine. If the spine is not genuinely excellent typography, the page reads as a piece *about* Apollo 11 rather than an experience *of* it.
- **Halftone as costume.** Newsprint texture is a well-worn move. It only earns its place because the article documents an actual degradation chain; if the treatment is applied uniformly rather than as a decreasing function along the signal path, it becomes a filter and should be cut.
- The scattered numbers are of uneven provenance in the source ("at least 600 million," "an estimated one million," "between 400,000 and 500,000"). The design must preserve those hedges at display size, which is typographically awkward and must not be silently rounded away.

---

## Comparison

All axes scored so that **higher is better**. "Cliché resistance" is cliché risk inverted; "Implementation safety" is implementation risk inverted.

| | A — Three Bodies | B — The Narrowing | C — Manifest | D — Received |
|---|:---:|:---:|:---:|:---:|
| **Information-design fit** | **5** | 4 | 4 | 4 |
| **Surprise** | 4 | 4 | **5** | **5** |
| **Cliché resistance** (inverted) | 4 | 4 | 3 | 4 |
| **Implementation safety** (inverted) | **4** | 2 | 3 | 3 |
| **Latency fit** | **5** | 4 | 2 | **5** |
| **Total** | **22** | 18 | 17 | 21 |

**Notes on the scoring.** A loses a point on surprise because a three-lane score, however well argued, is a recognizable species of thing; it loses a point on cliché resistance because of proximity to the timeline it must not become. B is scored down hard on implementation because eight bespoke interactives is not a realistic single-page scope and the concept's argument weakens as they degrade. C has the highest surprise of any concept here — a catalog indexed by present location is the idea most likely to produce "I would never have thought to present it that way" — but pays for it in latency (photograph-dependent, and most of its assets are not yet downloaded) and in cliché exposure (the card grid). D nearly ties A, on a different profile: more surprising, slightly less well-fitted to where the article's mass actually sits.

**On genericness**, which the rubric treats as near-blocking: A requires a subject with concurrent, timestamped, physically separated actors — very few subjects qualify, so it cannot be templated. C requires a subject whose objects dispersed — also rare. D requires a documented, counted, contested reception — rare. B is the most portable of the four, and therefore the most at risk of becoming the pipeline's default template. That is a point against B beyond its build cost.

### Recommendation: **Concept A — Three Bodies**, with a specific graft.

**Reasoning.**

1. **It repairs the source rather than restyling it.** This is the mission document's central non-negotiable — "understand the information and choose presentation forms that fit it." Every concept here is a reasonable interpretation; only A can point at a specific thing the Wikipedia article gets *structurally wrong* (serializing §22 after §21 when they are concurrent) and fix it. That is the most defensible possible answer to "would another form communicate substantially better?"

2. **Its emphasis matches the article's own center of mass.** §17–24 are ~5,600 words — roughly half the body. A gives them the full apparatus and compresses nothing that the article treats as primary. C and D both invert the article's emphasis, which is a legitimate design decision but a harder one to defend if the result is judged as less understandable than the source.

3. **Latency and build risk are both best-in-class.** The entire structural skeleton derives from the infobox and a ~20-row event table, so the magical first second — the shape of an eight-day mission appearing instantly — costs zero network. Six load-bearing images, all already downloaded. This matters disproportionately for an extension whose core loop is "press one button, seconds later it is an experience."

4. **Its palette is derived from source data, not from mood.** Green / Gold / White / Black / Maroon are the actual flight-director team colors in the article's own table. That is the difference between art direction and decoration, and it is the kind of detail that reads as individually art-directed rather than template-generated.

**The graft.** A's declared weakness is that Movements 0 and 8 carry ~5,000 words with none of the apparatus. Fix it by borrowing exactly one idea from C, and no more: **when the clock stops, the score does not simply end — it disperses.** Movement 8 becomes a short, composed provenance passage in which the objects the page has been tracking scatter to their present locations (descent stage still on the Moon, ascent stage in an orbit nobody can find, *Columbia* through 49 state capitals, F-1 engines on the Atlantic seabed, the tapes taped over). The clock's structural logic — position means something — carries over, with *place* replacing *time*. And place D's dissent material where it belongs in that structure: as a deliberate off-clock interruption, still and undecorated, in Movement 8.

**Do not merge further.** Grafting B's interactives onto A would produce exactly the "sophisticated system, mediocre page" failure the mission document warns about. If the brief later prioritizes surprise over fidelity, build **C — Manifest** as a standalone, and budget for the eight missing image assets first.
