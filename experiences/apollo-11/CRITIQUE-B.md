# CRITIQUE-B — The Cold Reader

Critic B. Lens: someone who knows almost nothing about Apollo 11 opens this page.
Method: rendered `experiences/apollo-11/index.html` at 1440×900 with contiguous
coverage (50 states, `screenshots/critic-b-full/`), read top to bottom, then
mobile (`screenshots/critic-b-mobile/`), then compared to
`benchmarks/apollo-11/content-model.json`. Design docs deliberately not read first.

Page is **47,004 px** tall on desktop (52 viewports), 64,822 px on mobile.

---

## 1. The summary a reader forms

After reading the whole page, this is what a cold reader would say:

1. Apollo 11 was the American spaceflight that first landed humans on the Moon, the
   fifth crewed Apollo mission, launched on a Saturn V from Kennedy on 16 July 1969
   with Neil Armstrong, Michael Collins and Buzz Aldrin.
2. It was the payoff of a Cold War Space Race that Kennedy had committed the country
   to in May 1961, after Sputnik and Gagarin put the Soviets ahead.
3. *Eagle* undocked from *Columbia* at 17:44:00 UTC on 20 July, and from that instant
   the mission was three separate places at once — Houston, the two men descending,
   and Collins alone, out of radio contact for 48 minutes of every two-hour orbit.
4. The descent nearly went wrong twice: the guidance computer threw 1201/1202 program
   alarms, which Jack Garman and Guidance Officer Steve Bales judged safe to fly
   through, and Armstrong took semi-automatic control to get past a boulder field
   beside West Crater, touching down at 20:17:40 UTC with very little propellant left.
5. Six and a half hours later, at 02:56:15 UTC on 21 July, Armstrong stepped off the
   pad and said "That's one small step for man, one giant leap for mankind", watched
   by at least 600 million people on a picture that had lost most of its quality on
   the way to the screen.
6. Aldrin followed nineteen minutes later; together they spent about two and a half
   hours outside — flag, a call from Nixon, experiments, 21.55 kg of rock — while
   Collins circled overhead and the source records nothing at all about what he did.
7. The Soviet uncrewed probe Luna 15 was in lunar orbit the entire time trying to get
   a sample home first, and crashed in Mare Crisium about two hours before *Eagle*
   lifted off.
8. *Eagle* re-docked at 21:35 on 21 July, *Columbia* splashed down 2,660 km east of
   Wake Island at 16:50:35 UTC on 24 July, the crew served 21 days of quarantine, and
   most of what the mission carried is still where it was left — *Eagle*'s descent
   stage on the Moon, the S-IVB in solar orbit, *Columbia* at the Smithsonian.

**That is a better summary than a cold reader retains from the Wikipedia article.**
The causal spine (why semi-automatic, who cleared the alarms, what Collins was doing
*at the same moment*) survives, which it does not in a sequential article.

### What is wrong or misleadingly emphasised

Nothing I could find is factually **wrong**. Four emphasis problems:

- **The surface stay does not add up on the page.** Section headers give
  `06 Surface 06 h 21 m 53 s` and `07 Extravehicular activity 02 h 31 m 40 s`, and
  then §08 starts nine hours later. A reader summing the chapter durations gets ~9 h,
  not 21½ h. The real figure appears only in the crew card in the first screenful
  (s00, "on the surface at Tranquility Base for 21½ hours") and buried in a block at
  66% depth. The page's single strongest structural claim — how long they were down
  there — is the one duration it never puts in a heading.
- **"The article records nothing" becomes a co-equal theme.** It is stated at least
  four times in transformer voice (s17 "THREE DAYS", s21 "NO ALTITUDE", s24
  "SOLITUDE", plus §05's note), each time occupying a full screen or more of blank
  page. A cold reader comes away with "Wikipedia is thin on the quiet parts" as a
  headline fact about *Apollo 11*. That is a fact about the source, not the mission.
- **§05 is titled "Powered descent, 6,000 ft → 0".** Powered descent began around
  50,000 ft. The italic note explains that the *source* stops giving times below
  6,000 ft, but the heading reads as the descent's extent. A cold reader can easily
  conclude the LM fell 6,000 feet.
- **The July 20 / July 21 collision is correct but unexplained.** Landing is 20 July,
  first step is 21 July (s27, attributed "02:56:15 UTC · 21 JULY 1969"). Both are
  right in UTC. A reader who "knows" it was July 20 will think the page has an error.
  One clause ("still the evening of 20 July in the United States") would close it.

---

## 2. Comprehension probes

| Probe | Found? | Where / how fast |
|---|---|---|
| First step: date + who | **Yes, twice** | Wikipedia lead at ~1,100 px (2%); the moment itself at 24,530 px (52%, s27) with full UTC + date attribution under the quote. Fast. |
| Why semi-automatic control | **Yes** | 19,286 px (41%, s21) — block titled "SEMI-AUTOMATIC CONTROL", reason stated in one sentence (boulders NE of West crater). Excellent, with an annotated LRO photo directly under it. |
| 1202 alarm: what it was | **No — hidden** | The *explanation* ("executive overflows", rendezvous-radar switch, Don Eyles) is inside a collapsed `.blk-more`, `display:none`, behind a 9.5 px toggle reading "+ what the alarms were, and Margaret Hamilton on them" (s21, top-left). Not reachable by Ctrl+F. A cold reader scrolling past learns only that alarms happened. |
| 1202: who resolved it | **Yes** | Visible at 18,886 px (40%): "Garman told Guidance Officer Steve Bales it was safe to continue the descent, and this was relayed to the crew." Good. |
| Collins during the EVA | **Yes, and better than the original** | 22,028 px (47%, s24): "SOLITUDE" block plus his own lane going physically dark on a 48-minute rhythm, plus the note at s21 "the article records nothing at all of what he did during these twelve minutes." This is the page's single best teaching move. |
| What Luna 15 was | **Partly — slow** | The word "uncrewed lunar probe" is in the lead (2%) and the sample-return motive is in Background (~10%). The dedicated red fourth lane at 30,873 px (66%, s33/s34) labels it only "USSR · uncrewed"; the *purpose* is behind a "+ full paragraph" toggle. A reader who skipped the prelude meets a red lane they cannot interpret. |
| How long the surface stay | **Yes but awkward** | 21½ h in the crew card at ~1,250 px, and again at 31,223 px (66%). Never in a section header (see above). |
| Where *Columbia* is today | **Yes, twice** | Lead at 1,657 px; the "At the Smithsonian" panel at ~41,000 px (s43) with the full custody history. |
| Sample mass returned | **Yes, fastest fact on the page** | 485 px — the metadata table on the opening screen (s00): `Sample returned  21.55 kg`. |

Score: **7 of 9 clean, 1 partial, 1 hidden.** The one genuinely hidden answer (what a
1202 alarm actually is) is arguably the most interesting technical fact in the article.

**25.3% of the article's prose (25,363 characters across 36 blocks) is behind
collapsed toggles that are `display:none`, so browser find-in-page cannot reach it.**
That is a comprehension cliff, not a progressive-disclosure win.

---

## 3. Navigation — verdict: **weakest dimension of the page**

- **No table of contents. No section list. No jump menu. No anchors offered.** Eleven
  numbered movements exist (01 T-minus … 11 After the clock) and there is no way to
  see that list without scrolling 47,000 px.
- **You do not always know where you are.** The sticky header shows the movement name
  *only when off the clock* (`score.js` L678: "off the clock · Before the clock",
  "· After the clock", "· Not everyone"). Inside the score — i.e. for ~80% of the
  page — it shows UTC + MET and nothing else (s17, s24, s36: `UTC 1969-07-18
  04:34:12   MET 001:15:02:12`). You always know *when* you are; you frequently do
  not know *what chapter* you are in. Adding the movement name to that readout is a
  one-line fix with a large payoff.
- **The minimap is navigable but undiscoverable.** `score.js` L651 attaches a click
  handler per stave that scrolls to it, and `.mm-hit{cursor:pointer}` is the only
  affordance. The rail carries no section labels — just hairlines and "TIME / PAGE /
  JUL" at 8 px. A cold reader will read it as decoration. It is a good instrument
  wearing no dial.
- **Re-finding one fact (sample mass):** the honest answer is *scroll to the very top*
  — the metadata table on the opening screen is the only reliable lookup surface on
  the page. Ctrl+F works for the 75% of text that is expanded, and fails silently for
  the rest. There is no index, no infobox to return to mid-page, no "21.55 kg" pinned
  anywhere in the score.
- **Skimming is actively prevented by design.** Roughly a third of the page's vertical
  extent is deliberate blank (s13 is a near-empty screen; s41 has two words on it).
  That is the thesis and it works emotionally, but it means the page has *no* fast
  mode. There is no "read this in 4 minutes" path.
- **Scroll instability.** The document grows from 44,983 px to 47,004 px during a full
  scroll-through (relayout on scroll/image load). Reading position drifts under the
  reader. It also means the shipped `tools/shoot.mjs` never captures the last ~2,000
  px — including the colophon.

---

## 4. Trust — verdict: **the best thing about this page, undermined by its type size**

- **You can tell whose voice is whose, mostly.** Article prose is set in serif at full
  black; transformer voice is italic serif at 62% alpha (`.note`) and reads clearly as
  editorial (s24: *"this is the passage the article gets structurally wrong…"*).
  Section-key labels are mono. The distinction is real and consistent.
- **Sources are visible per block.** 83 `blk-src` page markers (`p46`, `p59 · p105`)
  and 36 `.prov` lines (`§ Lunar descent · p47, p48`). Quotes are attributed with
  speaker, time and page (s27: `NEIL ARMSTRONG · 02:56:15 UTC · 21 JULY 1969`; s20:
  `NEIL ARMSTRONG · P45`). Image captions carry `§ Lunar descent · article caption`.
  This is more rigorous than the original article's inline footnote numbers.
- **The colophon is genuinely excellent** (`screenshots/critic-b-tail/end-0.png`): it
  names the source URL and revision, and enumerates *six* categories of derived
  material — EDT→UTC conversion, T+ offsets, intervals-to-instants marked `≈`, the
  blackout rhythm ("a rhythm, not a log"), console attributions, and sequence-only
  blocks marked "—". Then: "Nothing else has been added, and nothing has been removed."
  I checked and the claim holds: all 39 source sections are present.
- **The `≈` and `—` markers make sense** and are legended before the score begins
  (s12, "HOW TO READ THE SCORE": Timestamped / Sequence only / Loss of signal /
  Console / Red). Individual derived placements even restate their derivation inline
  ("Placed at first step + 7 min.", "Placed at splashdown + 10 min."). This is
  best-in-class provenance behaviour.
- **But the trust apparatus is the least legible text on the page.** Measured
  contrast against the `#EDE8DE` ground:

  | class | size | contrast | WCAG AA (4.5:1) |
  |---|---|---|---|
  | `.blk-src` (page numbers) | 9.5 px | **1.45:1** | fail by 3× |
  | `.prov`, `.ex` (provenance, toggles) | 9.5 px | **1.91:1** | fail |
  | `.micro` (the colophon, the key) | 10.5 px | **2.82:1** | fail |
  | `.note` (transformer voice) | 15 px | 4.67:1 | pass |

  The page's honesty is real and almost invisible. The colophon — the single most
  trust-relevant paragraph on the site — is 10.5 px mono at 2.82:1, at 99% scroll
  depth, below a films-and-documentaries list.

---

## 5. Reading ergonomics

**Blocking:**

- **33 gridlines are drawn over body text.** Measured programmatically across all
  staves; not a screenshot artifact. Worst cases:
  - s17 — "Between the docking and lunar orbit insertion the article records nothing…"
    has the *Jul 18* and *Jul 19* day rules struck clean through two lines of it; the
    Lunar Orbit Insertion paragraph below it is struck by *Jul 20*.
  - s39 — the *Jul 24* rule strikes through the Guam-bearing paragraph.
  - s18, s21, s27, s34 — same failure mode throughout.
  A `paint-order` / stacking fix (put `.gridline` behind `.blk`, or clip it at block
  bounds) removes the single most damaging legibility defect on the page.
- **Label-over-text collisions.** s24: the `LOS · 48:00 · 3× dark here` lane label
  overprints the sentence "known such solitude", and "+ what he reported feeling in
  the dark" overprints the dark bar. s36 is a three-way pile-up: the full-width
  `21:35:00 DOCKED · THREE MEN IN ONE VEHICLE AGAIN` rule strikes through "21:24 UTC
  on July 21."; the `infobox: Docking date · 1 h 55 m` caption is overprinted by both
  the Earthrise image and the trailing "31 s until the ascent stage is let go".

**Serious:**

- **The mission narrative is set smaller than the background material.** `.prose p`
  (the prelude and postlude — Background, Personnel, Celebrations, Legacy) is
  **24 px/34.8**. `.blk-lede` — every sentence of the actual mission, the reason the
  page exists — is **15.5 px/24** in a 489 px column. The score is 35% smaller than
  the material framing it. That is backwards for teaching, and it is why the score
  reads as caption-like annotation rather than as the main text.
- **Toggle labels are 9.5 px at 1.91:1.** These are the doors to a quarter of the
  article and they read as dust.
- Figure captions are 10.5 px mono at 2.82:1 across a 1,376 px measure (s45: the
  cockpit caption runs nearly the full window width at 10.5 px) — two ergonomic sins
  at once, too small *and* too long a line.

**Good:**

- Measure inside lanes (~52–56 characters) is right.
- Quote attribution is unambiguous everywhere I looked: speaker in caps mono under
  the quote, with page and often time (s20, s24, s27, s45).
- The serif at 24 px in the prose sections is genuinely comfortable.
- The `600,000,000` figure rendered as a display numeral (s27) is the right kind of
  emphasis — a quantity made legible as a fact, not decoration.

---

## 6. Three things the ORIGINAL article does better

1. **The infobox as a random-access panel.** Wikipedia's 40-row infobox sits pinned at
   the top right of a ~4,000 px page: launch mass, landing mass, COSPAR ID, periselene
   /aposelene altitude, inclination, orbital departure, callsigns, recovery ship — all
   in one glance, all reachable from anywhere by one Home keypress. This page keeps
   six rows (Source, Duration, Crew, Lunar orbits, Sample returned, Clock reads) and
   discards the other ~34 values entirely into prose or nothing. For "what was the
   landing mass?" or "what was the orbital inclination?", the original wins outright
   and this page cannot answer at all.
2. **Finding a specific fact.** The original is one Ctrl+F away from every word in it,
   with a sticky TOC listing 39 sections. Here, 25% of the prose is `display:none`,
   there is no TOC, and the page is 12× taller. Re-finding anything means scrolling.
3. **Reading the whole thing in a sitting.** The article is a 4,000 px scroll with a
   consistent 16 px body. This page is a 47,000 px scroll whose narrative core is
   15.5 px and about a third of whose height is intentional emptiness. The emptiness
   teaches something real about the mission's rhythm — but the original respects a
   reader who has fifteen minutes, and this does not.

*(Honourable mention: the original's section titles are plain nouns — "Lunar descent",
"Splashdown and quarantine" — that tell you what is inside. "Sixty-nine minutes" and
"The split" are better writing and worse signage.)*

---

## 7. Mobile — verdict: **good, not degraded**

`screenshots/critic-b-mobile/mobile-s*.png`, 390×844, 64,822 px.

The single-column fallback is **coherent and in several ways more readable than
desktop.** Blocks stack in time order with the lane identity kept as a coloured gutter
label (`APOLLO 11`, `HOUSTON`, `TRANQUILITY`, `EARTH`, `COLUMBIA` — mobile-s03, s04,
s05), timestamps and page-number provenance survive, body type is comfortably large,
and the "01 / The hatch opened the wrong way" four-account layout collapses into a
clean numbered list (mobile-s02). Quotes keep their attribution. The end matter renders
in full (mobile-s07).

Two mobile problems:

- **The header truncates the one wayfinding element it has**: "off the clock ·…"
  (mobile-s00, s02, s07). And in on-clock states it shows only `1969-07-20 14:41:37` —
  no MET, no section. Same "you know when, not where" problem as desktop, worse.
- **The minimap is gone**, so the page's only jump affordance does not exist on mobile.
  With no TOC either, mobile navigation is scroll-only across 65,000 px.

Notably, mobile *loses the collisions* — no gridline-over-text, because the lanes
collapse. The mobile view is the more trustworthy read of the same content.

---

## 8. Does it teach better than the original? — **Mixed, leaning yes**

For **understanding the mission**, yes, clearly. Simultaneity is the thing the article
cannot express and this page expresses it natively: Collins' 48-minute silences drawn
as literal darkness, Luna 15 arriving as an uninvited red lane, the "Columbia in lunar
orbit" section moved back to where it actually happened. The provenance discipline is
better than the source's. Four of my nine probes were answered *faster* than the
original would.

For **using the page** — looking something up, re-finding a fact, orienting yourself,
reading it in one sitting — it is worse than the article, and the gap is not small.

## Top 3 fixes for comprehension (ranked)

1. **Stop hiding a quarter of the article.** 36 `.blk-more` blocks are
   `display:none` — invisible to Ctrl+F and invisible to a scrolling reader. Ship them
   expanded by default with a global collapse control, or at minimum switch to
   `<details>` (findable in Chrome/Edge) and raise the toggle from 9.5 px @ 1.91:1 to
   ~12 px @ ≥4.5:1. The 1202-alarm explanation is currently unreachable, and it is one
   of the best passages in the source.
2. **Fix the 33 gridlines that strike through body text, and put the movement name in
   the sticky header.** Two independent bugs, both small, both high-yield: the first
   removes the page's worst legibility defect (s17, s24, s36, s39); the second means
   the reader always knows which chapter they are in, not just what time it is —
   `score.js` L685 already has the hook, it just blanks out when the clock runs.
3. **Raise the narrative to the size of its own importance, and give the reader a
   spine.** Lift `.blk-lede` from 15.5 px toward the 20–22 px range (it is currently
   35% smaller than the Background prose that frames it), lift `.prov`/`.blk-src`/
   `.micro` to ≥4.5:1 so the honesty is visible, and add an eleven-item movement index
   near the top with the total surface-stay figure (21½ h) stated once in a heading
   where it belongs. A page this tall needs a contents page; without one it can only
   be read, never consulted.
