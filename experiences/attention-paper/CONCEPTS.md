# Attention Is All You Need — Four Art-Direction Concepts

Source: `benchmarks/attention-paper/content-model.json` (23 sections, 63 body paragraphs ≈ **3,553 words**, 169-word abstract, 23 equation objects → 11 distinct equations, 3 figure images, 4 distinct tables), `benchmarks/attention-paper/semantic.json` (6 claims, 9 mechanism steps, 8 concepts, 30 quantities, 6 comparisons, 11 "whys", 8 people, 4 limits), `benchmarks/attention-paper/source.html` (**79 native `<math>` MathML elements**, each carrying an `application/x-tex` annotation).

Third benchmark subject, and the generalisation test: not an encyclopaedia article but a scientific preprint. Prior experiences: Apollo 11 → *Three Bodies* (three staves on one UTC clock; white-bond/typewriter world). Hokusai → *Nothing Before Seventy* (his colophon as a y-axis; woodblock world). The check at the end asks whether any concept here could be mistaken for either system.

---

## 0. The record, measured

### 0.1 The artifact class

Not "an AI paper". **arXiv:1706.03762v7 [cs.CL], 02 Aug 2023 — a LaTeX manuscript compiled with `nips_2017.sty` into a single-column US-Letter PDF, 8.5×11in, text block 5.5×9in.** I pulled the actual e-print tarball (`https://arxiv.org/e-print/1706.03762v7`, 1,150,988 bytes) and read it. It contains `ms.tex` + nine `\input` subfiles, `nips_2017.sty`, six figure PNGs (three more than the benchmark extracted), and **six vector PDFs in `vis/`** — the attention visualisations of Figures 3–5, which the arXiv HTML drops entirely (the benchmark has their captions and no images).

Every value below is measured from those files or from the benchmark JSON. Nothing here is "it felt right for a research paper".

### 0.2 Nine-slot inventory (`material_record`)

| slot | evidence | measurement |
|---|---|---|
| **substrate** | `nips_2017.sty` `\newgeometry{textheight=9in, textwidth=5.5in, top=1in}`; `letterpaper` | White, 8.5×11in. Text block 5.5×9in = **64.7% of page width**, 1.5in total side margin. **One measure for everything** — `figure*` in a single-column class is the same 5.5in as body text. Modal pixel of `figures/ModalNet-21.png` = `#FFFFFF`, 62.65% of the image. Not cream. Not bone. |
| **marking** | PDF content streams in `vis/*.pdf`; `figures/*.png` | Body ink pure black `#000000` (8.49% of Fig. 1). Figure text `#202020` (measured `rg` operator, `making_more_difficult5_new.pdf`). Flat opaque fills, no gradients anywhere in any figure. |
| **letterforms** | `nips_2017.sty:38` `\renewcommand{\rmdefault}{ptm}`; `ms.tex` loads `amsmath`/`amsfonts` and **no** math-font package; `\texttt` left at default | **The prose is Times (`ptm` = Adobe Times / URW Nimbus Roman). The mathematics is Computer Modern. The email addresses are Computer Modern Typewriter.** The most-pictured-in-Computer-Modern paper in the world is set in Times. |
| **boundary** | `nips_2017.sty:269,276` `\hrule height 4\p@` … `\hrule height 1\p@` (title box); `\footnoterule` `width 12pc`; `booktabs` `\toprule`/`\bottomrule` = 0.08em, `\midrule` = 0.05em; `results.tex` `\specialrule{1pt}` above the Transformer rows | Two registers, and they are **not** both hairlines: a **4pt rule** over the title block, a 1pt rule under it, a 1pt `\specialrule` isolating the paper's own results from the leaderboard, and 0.08/0.05em booktabs rules inside tables. No vertical rules in Tables 1–2; Table 3 uses `\|` verticals. |
| **reading axis** | single column, LTR; `vis/*.pdf` text extraction returns one character per line | Prose is LTR single-column. **The attention figures are rotated 90°**: two vertical columns of tokens set bottom-to-top with lines drawn between them. The paper's own picture of its own mechanism does not read left-to-right. |
| **numerals** | Tables 2–4 columns of BLEU / F1 / PPL; `\textbf{}` on the best cell per column | Lining Times figures, **compared vertically**, best-in-column bolded. Tabular numerals are earned here, not decorative. |
| **the one colour** | `ms.tex:41` `\newcommand\todo[1]{\textcolor{red}{[[#1]]}}`; `ms.tex` `\begin{center}\color{red}` before `\maketitle` | **Pure LaTeX `red` = `#FF0000`**, and it appears exactly twice in the document's life: the Google reproduction-permission banner printed above the title in v7, and the `\todo` macro used once (`results.tex:101`, inside commented-out text). Red = "not the paper's own settled voice". At full saturation. |
| **the format** | text block 5.5×9in; Fig. 1 is 1520×2239px (aspect 0.679) | The canonical architecture diagram is **portrait and taller than a screen** at prose width (700px wide → 1,030px tall). This is a real constraint every concept must answer, not a rendering detail. |
| **the mistakes** | see below | Preserve them. |

**The mistakes, itemised** (all verified, all in the published record):
- `results.tex` prose and `p47`: *"our big model achieves a BLEU score of 41.0"* — while the abstract and Table 2 both say **41.8**. The paper contradicts itself about its own headline number.
- Table 4 row: *"Vinyals & Kaiser **el al.** (2014)"* — twice.
- Conclusion, `p60`: *"Making generation less sequential is another research **goals** of ours."*
- `sqrt_d_trick.tex` heading: *"**Justfication** of the Scaling Factor"*.
- Author list carries `\hspace{1.7mm}` hand-kerning hacks around two footnote marks.

### 0.3 The palette, sampled

Every colour below was read out of a file, not chosen. Figure fills are modal-colour counts over the PNG; head colours are literal `rg` operators decompressed out of the PDF content streams.

**From `figures/ModalNet-21.png` (Figure 1, the architecture diagram) — the boxes' own fills:**

| value | share | what it fills (verified by y-band position) |
|---|---|---|
| `#FFFFFF` | 62.65% | ground |
| `#F3F3F4` | 14.57% | the `N×` stack backdrop (y 480–1612) |
| `#000000` | 8.49% | outlines, arrows, type |
| `#FFE2BB` | 4.22% | **Multi-Head Attention** (y 916–1048, 1280–1472) |
| `#C2E8F7` | 2.57% | **Feed Forward** (y 604–736, 972–1104) |
| `#FCE0E1` | 2.49% | **Input/Output Embedding** (y 1824–1956) |
| `#F2F4C1` | 2.45% | **Add & Norm** (y 512–564, 828–936, 1192–1304) |
| `#DBDFEF` | 0.54% | **Linear** (y 356–412) |
| `#CCE7CF` | 0.52% | **Softmax** (y 216–268) |

**From `figures/ModalNet-19.png` / `ModalNet-20.png` (Figure 2) — the five operations of the mechanism, top to bottom:**
`MatMul` `#C5BEDF` → `SoftMax` `#CCE7CF` → `Mask (opt.)` `#F9CBDF` → `Scale` `#FDF9C0` → `MatMul` `#C5BEDF`; `Linear` `#E8EEEB`; `Concat` `#FDF9C0`.

**From `vis/making_more_difficult5_new.pdf` — the eight attention heads:**
`#1F77B4` `#FF7E0E` `#2C9F2C` `#D52728` `#9367BC` `#8B554A` `#E277C2` `#7E7E7E`.

That is matplotlib 2.0's `tab10` cycle, displaced ≤1/255 per channel by an Adobe Illustrator CS6 round-trip (PDF `/Creator` = `Adobe Illustrator 16.0`, `/Producer` = `Adobe PDF library 10.01`). **The mapping is confirmed by the paper's own caption**: Figure 4 says "heads 5 and 6", and the only two saturated colours in `anaphora_resolution2_new.pdf` are `#9367BC` (cycle index 5) and `#8B554A` (index 6); every other head is present as an alpha-faded tint (`#ADC6D7`, `#F0CDAC`, `#B5CFB5`, `#DFB8B8`, `#ECCFE3`). **Head *i* has a knowable colour.** Take the measured PDF values, not the canonical `tab10` hexes — the artifact's values are the artifact's values.

Saturation floor (§6.3): `#D52728` is 82% saturated, `#1F77B4` 83%, `#FF7E0E` 95%, and `#FF0000` is 100%. This subject is not muted, and rendering it muted would be a lie about a document whose figures are printed in the loudest default palette of its decade.

### 0.4 Three findings from the e-print that change what is designable

**(a) Two whole appendices were written and switched off.** `ms.tex:413` `%\input{parameter_attention}` and `ms.tex:415` `%\input{sqrt_d_trick}`. The first is a complete section titled *"Two Feed-Forward Layers = Attention over Parameters"* with its own results table (AOP₁ 25.5 BLEU / AOP₂ **25.9** vs base 25.8, all at 65M params, 16 hours vs 12) arguing that the feed-forward sub-layer *is itself attention* — the strongest possible reading of the paper's own title, cut. The second is the derivation of why you divide by √d_k, which survives in the published paper only as footnote 1 inside `p16`.

**(b) A fourth desideratum was deleted.** `why_self_attention.tex` publishes "we consider three desiderata" and carries, commented out, a fourth: *"the unfiltered bottleneck argument"* — that in recurrent and convolutional layers the information from other positions is compressed to a `d`-dimensional vector **before** it can be filtered by the content at position *i*, whereas in self-attention aggregation happens after filtering. Also commented out of that file: a **receptive-field column** for Table 1 and three deleted rows, including `Position-wise Feed-Forward` with maximum path length **∞** and `Fully Connected` at `O(n²·d²)`.

**(c) The manuscript contains a conversation.** Nine `\marginpar{}` notes, addressed by handle: `%\marginpar{@all: there is work on analyzing what attention really does in seq2seq models, couldn't find it right away}` (`introduction.tex:7`), `\marginpar{@usz, could you think of an example of this ?}` (`model_architecture.tex:136`), `\marginpar{Don't know if it's the most natural question to ask given the previous statements}` (`background.tex:15`), `%llion@: FAIR's paper seems to concentrate solely on the convolutional aspect...` (`ms.tex:132`), `%TODO(noam): update results for new models.` (`ms.tex:130`), `\todo{Update results}` beside literal `$?$` placeholders (`results.tex:101`). `background.tex` is 35 comment lines out of 57; `why_self_attention.tex` is 42 out of 98.

And the footnote everyone scrolls past, in full (`ms.tex:84`): *"Equal contribution. **Listing order is random.** Jakob proposed replacing RNNs with self-attention and started the effort to evaluate this idea. Ashish, with Illia, designed and implemented the first Transformer models… Noam proposed scaled dot-product attention, multi-head attention and the parameter-free position representation… Niki designed, implemented, tuned and evaluated countless model variants… Llion also experimented with novel model variants, was responsible for our initial codebase, and efficient inference and visualizations. Lukasz and Aidan spent countless long days designing… tensor2tensor…"*

### 0.5 Truth constraints

- **We are explicitly licensed to reproduce the figures and tables.** The v7 banner, in red, above the title: *"Provided proper attribution is provided, Google hereby grants permission to reproduce the tables and figures in this paper solely for use in journalistic or scholarly works."* Use it; attribute.
- **Any attention weights we display must be computed, not drawn.** Running softmax over a toy example in JS is the paper's own mechanism executed — truthful. Hand-drawing a plausible-looking heatmap is fabricated evidence (§7.4). Every concept below computes.
- **Label the example sentence as ours.** Except where we use the paper's own two sentences, which we may quote because they are extractable from `vis/*.pdf`: *"It is in this spirit that a majority of American governments have passed new laws since 2009 making the registration or voting process more difficult."* (Figs. 3, 5 — layer 1 and layer 5) and *"The Law will never be perfect, but its application should be just — this is what we are missing, in my opinion."* (Figs. 4, 5). Both recovered verbatim from the figure PDFs' text layer. We may **not** claim head-by-head weights for those sentences: the numbers behind those pictures are not in the record. We can show the paper's picture, and we can show our own computation, and we must not blend them.
- **The commented-out material is source, not publication.** Anything from `ms.tex` and its subfiles must be visibly marked as *unpublished manuscript*, never as what the paper says.
- The e-print tarball is currently in scratch, not in the repo. Any concept that depends on it needs `benchmarks/attention-paper/eprint/` populated by a build step (URL above); Concept B cannot be built without it.

### 0.6 Structure, thesis, budget

**Informational structure (§1.1):** dominant = **causal mechanism** (a chain of operations acting on each other: embed → position → project → dot → scale → mask → softmax → weight → concat → project, with `semantic.mechanism` supplying 9 ordered steps and 11 equations). Secondary = **data comparison with a surprise** (Tables 1–3: the surprise is in the *cost* column, not the BLEU column). Nothing here is chronological; no concept below emits a timeline.

**Surface budget (§4.11), shared ceiling:** source body prose = 3,553 words. 35% = **1,243 surface words**, hard ceiling. 150–250 words per 900px viewport. Full text reachable via `hidden="until-found"` per section, one disclosure level, with a source-to-block concordance in end matter. Per-concept allocations are given below and all sit under the ceiling.

**Two measures (§2.9), shared:** the paper has exactly one measure (5.5in, everything). Our **argument width = 712px** (the paper's 5.5in text block at the paper's own 88-characters-per-line, relaxed to ~74 cpl at 19px so it is readable on a screen — the deviation is stated, not hidden). Our **evidence width is not a constant**: an n×n attention matrix is as wide as the sentence is long. The second measure is the *data's*, not the page's. That is a derived answer to a rule that assumes both widths are ours to choose.

**Type, shared across all four concepts (§2.1):** two families, both cited to `nips_2017.sty` and `ms.tex`.
1. **Times lineage** — the paper's actual `\rmdefault`. Preferred: **TeX Gyre Termes** (GUST FL; the modern URW Nimbus Roman No9 L, i.e. the exact face `ptm` resolves to) — CTAN OTF + `fonttools` woff2 conversion, **verify the conversion before committing**. Fallback: **`@fontsource/tinos`** (npm registry returns 200; OFL; metric-compatible with Times New Roman, Monotype lineage rather than URW — a near miss, and say so in the rationale).
2. **Latin Modern** — already vendored at `experiences/attention-paper/assets/fonts/`: `TypoPRO-LatinModernRoman-{Regular,Italic,Bold}`, `-RomanCaps-Regular`, `-Sans-{Regular,Bold}`, `-Mono-Regular` (7 × `.woff`, 21–30KB each; **convert to woff2, roughly halves them**). Latin Modern is the Computer Modern lineage, and in this document Computer Modern is the face of the *mathematics* and of `\texttt{}` (emails, the tensor2tensor URL, file paths).

**The rule that follows, and it is the whole typographic argument: prose is Times, mathematics is Computer Modern, and display type is set in the mathematics face — because the only things in this paper that deserve display size are its equations and its numbers.** Setting body prose in Latin Modern Roman is the LaTeX-nostalgia costume and is banned in all four concepts. This pair is a specific historical pair implied by the subject (§2.1/B8): swap either and the reference breaks.

**Type scale, derived** (`nips_2017.sty:116–137`, "font sizes with reduced leading"): 6 / 7 / 9 / 10 / 12 / 14 / 17 / 20 / 25pt. Unevenly stepped natively (§2.5). Body 10pt on 11pt leading = **1.10** — the compression a page limit imposes. We keep the ratios and the step pattern; we do not keep 1.10 leading for continuous reading (stated deviation, §2.3). Section headings are `\large\bf\raggedright` = 1.2× body: **the paper has almost no typographic hierarchy**, so any display size on our page is *our* voice and must read as imported.

---

# Concept A — **Divide by Eight**

> *The explorable one. The page is Figure 2, unrolled to the height of the document, executing.*

### 1. Organizing idea

Figure 2 is a vertical stack of five boxes: `MatMul`, `Scale`, `Mask (opt.)`, `SoftMax`, `MatMul`. The paper draws the mechanism as a column and then hides the column inside a 445×884px image. **The page becomes that column at full page height** — five stations down a single scroll, each keeping the exact fill colour Figure 2 gave it, each expanding when it reaches the reading line into the *real numbers* of one attention computation on one short sentence, computed live in JavaScript.

The title is the equation. `Attention(Q,K,V) = softmax(QKᵀ/√d_k)V` set at 96px in Latin Modern, with each operator tinted its Figure-2 fill: that teaches the entire colour legend inside the headline (§6.2) before a single word of prose, and no legend box ever appears.

The name comes from the station everyone skips. d_k = 64 (`semantic.quantities`), so `√d_k` = 8, so scaling by `1/√d_k` **is dividing by eight** — and the whole reason for it (`p16`, plus the cut appendix `sqrt_d_trick.tex`) is that without it the softmax saturates and the gradients vanish. A title that says "divide by eight" makes a claim a reader can dispute and then get disproved by scrubbing a slider (§2.12).

### 2. Why this paper demands this form

- §1's causal-mechanism row prescribes exactly this: section order = the causal chain, one column, diagram at prose width, permanent entity colours, every animation pausable. `semantic.mechanism` hands over 9 ordered steps; `eq13`, `eq14–17`, `eq18`, `eq19–20` hand over the algebra for each.
- **The attention matrix is an image the subject generates.** No other subject we have touched produces its own primary visualisation as a side effect of running. Fig. 3–5's captions (`visualizations.tex`) are the authors themselves saying the pictures are the interpretability argument, and `p37` says it in the body: *"self-attention could yield more interpretable models."*
- The five-colour vocabulary is not invented. It is measured out of `ModalNet-19.png` at named y-bands (§0.3). An entity-colour system with a file and a coordinate behind every value is the strongest §6.1 compliance available to any subject in this project.
- Figure 1's portrait aspect (1520×2239) makes it unplaceable at prose width. Unrolling the mechanism to page height converts that constraint into the layout.

### 3. Structure

Density shape: **steady widening then a hard collapse** — each station shows more numbers than the last, and the coda shows one.

| # | movement | form | words |
|---|---|---|---|
| 0 | The equation, at 96px, colour-coded, over a 4pt rule (the title-box rule, `nips_2017.sty:269`). Behind it, the 12×12 attention matrix of the example sentence computing itself once. | plate | 0 |
| 1 | **Tokens.** The example sentence, ours, labelled ours, tokenised. Each token gets a query, key and value vector at d_k = 4 (labelled: *a fourth-scale model of a 64-dimensional one*). | column | 120 |
| 2 | **MatMul** `#C5BEDF`. Pick a query token; watch it dot with all 12 keys. Real numbers, real arithmetic, one row at a time. | column + matrix | 150 |
| 3 | **Scale** `#FDF9C0`. The slider: √d_k from 1 to 64. At 1, the softmax collapses to one-hot; at 8, it spreads. This *is* `p16` and the cut `sqrt_d_trick.tex` appendix, operable. | plate (environment) | 90 |
| 4 | **Mask** `#F9CBDF`. Toggle causal masking; the upper triangle goes to −∞; the decoder can no longer see its future (`p11`, `p23`). | column | 110 |
| 5 | **SoftMax** `#CCE7CF`. The row of 12 numbers becomes a distribution summing to 1. Morph in place (§5.4) between the numeric row and the paper's own bipartite line picture — same position, same colours, less detail. | column + matrix | 130 |
| 6 | **MatMul again** `#C5BEDF`. Weighted sum of V. One output vector, visibly a blend. | column | 110 |
| 7 | **Eight of these at once** `#FFE2BB`. The same computation, run 8×, in the 8 measured head colours (§0.3), stacked and concatenated. Then Figure 2 right (`ModalNet-20.png`) reproduced at prose width — the diagram we have been inside for six screens, now shown whole (§4.5). | column | 120 |
| 8 | **Where it sits.** Figure 1 at prose width with the Multi-Head Attention boxes lit in `#FFE2BB` — the same block we just built, appearing three times in one diagram (encoder self, decoder masked self, encoder-decoder). `p21–p24`. | column | 100 |
| 9 | **The paper's own pictures.** Figs. 3–5 reproduced from `vis/*.pdf`, rotated exactly as the authors set them, with the two real sentences quoted and the captions verbatim. No claims about the weights. | plate | 60 |

**Surface: ~990 words / 3,553 = 27.9%.** 14 viewports, ~175 w/vp, 3 plates. Full prose of §3.2 and §3.2.1–3.2.3 reachable per station via `hidden="until-found"`.

### 4. Visual language

| slot | decision | provenance |
|---|---|---|
| ground | `#FFFFFF` | modal colour, `ModalNet-21.png` (62.65%) |
| second ground | `#F3F3F4` for the "inside a stack" band | the `N×` backdrop, `ModalNet-21.png` y 480–1612 |
| ink | `#000000` body, `#202020` inside figure regions | Fig. 1 outlines; `rg` operator in `making_more_difficult5_new.pdf` |
| display face | Latin Modern Roman + LM Math forms, 96px | math is CM in `ms.tex` (no math-font package loaded) |
| body face | Times lineage, 19px | `nips_2017.sty:38` `\rmdefault{ptm}` |
| accent | the five operation fills, permanently assigned; `#FF0000` reserved for the −∞ mask fill and nothing else | `ModalNet-19.png` y-bands; `ms.tex` `\color{red}` |
| rule weight | 4px over the title, 1px under it, 0.08em/0.05em inside matrices | `nips_2017.sty:269,276`; booktabs defaults |
| grid | one column at 712px; matrices break out to n×cell | 5.5in single measure; the data sets the second width |
| reading axis | LTR prose; **the bipartite plot is rotated 90°**, tokens bottom-to-top, exactly as in `vis/*.pdf` | the figure PDFs' text layer |

**Imagery.** All three real figure PNGs, used at prose width, at the moments they explain — `ModalNet-19` as the spine (movements 2–6), `ModalNet-20` at movement 7, `ModalNet-21` at movement 8. Plus the six `vis/*.pdf` figures at movement 9, converted to SVG. Nothing else. No icons, no illustration, no 3D.

**Motion grammar.** Easing = **softmax itself**: `p → exp(kp)/(exp(kp)+exp(k(1−p)))` at k≈6, approximated as `cubic-bezier(.62,0,.38,1)` — an S with symmetric shoulders, because that is the shape of the function this page is about. Not Material's curve.
- *transformation* — numeric row ⟷ bipartite lines, 300ms, morph in place.
- *causality* — a value flowing into a weighted sum, scroll-bound; the reader sets the pace.
- *focus* — selecting a query token dims the other 11 rows to 20%, 160ms.
- **Environment moments (3):** (i) opening — the 12×12 matrix computing itself behind the title, one pass, then still; (ii) the **Scale plate**, full-bleed, the same distribution re-normalised continuously as √d_k sweeps 1→64, which is an environment made of the subject's own arithmetic; (iii) the coda — the matrix drains to white and one output vector remains. Total added JS for all three: a 2D canvas and ~80 lines. No WebGL, no shader.

### 5. Interaction model

One persistent control strip in the same position at every station (Ciechanowski's rule): **pause · reset · step**. Global pause in the corner. The reader picks the query token (click a word), scrubs √d_k, toggles the mask, toggles matrix ⟷ lines, and can type their own sentence into the tokeniser (whitespace tokenisation, our simplification, labelled). Escape hatch from screen one: **"skip to the figures"** jumps to movement 9. Every station is deep-linkable. `prefers-reduced-motion` collapses every animation to its final frame; nothing is lost because the final frame is the number.

### 6. Latency

First paint = title equation + the 4pt rule + the matrix canvas already running: pure HTML/CSS + ~3KB of JS, no font blocking (`font-display: swap`, Times fallback is a system Times). Math is **native MathML lifted from `source.html`** — 79 elements already there, zero KaTeX, zero runtime math layout. The three PNGs downscale to ≤700px wide (~40KB each) and load lazily per station. The `vis` SVGs are movement 9 — below the fold, deferred. The attention computation is 12×12×4 floats: microseconds. **Nothing about this page is slow, and the expensive-looking part is the cheapest.**

### 7. Weaknesses and cliché risk

- **This is the saturated genre.** Every AI explainer ships: chat-bubble demos, rainbow arcs over a sentence, glowing neural nets, a "attention is like a spotlight" metaphor, purple gradients, a `d3` force graph. Our defences, specifically: (a) no metaphor — the page shows arithmetic, and the only pictures are the paper's own; (b) the arcs, when they appear, are the paper's own rotated bipartite plot in the paper's own eight measured colours, and they are always one keypress from the numeric matrix that generates them; (c) no glow, no gradient, no rounded card — flat opaque fills, because every fill in every figure in this paper is flat and opaque; (d) no chat, ever. This is a translation paper from 2017; there is no chat in it.
- **Risk of becoming a tutorial rather than a reading of *this* paper.** Mitigation: movements 3 and 9 are irreducibly this-paper — the √d_k plate is `p16`'s footnote made operable, and the figures are Google's, reproduced under the licence they printed.
- The d_k = 4 toy is a simplification and must be labelled at every station, not once.
- **Highest craft cost of the four.** Six interactive stations with shared state is the most engineering in this document.

---

# Concept B — **The Fourth Desideratum**

> *The non-obvious one. Built from the difference between the paper and the file it was compiled from.*

### 1. Organizing idea

The published paper says: *"Motivating our use of self-attention we consider **three** desiderata."* The manuscript it was compiled from contains a fourth, written out in full and commented out — the **unfiltered bottleneck argument**. It also contains two entire appendices switched off one line apart (`%\input{parameter_attention}`, `%\input{sqrt_d_trick}`), three deleted rows of Table 1 including one whose maximum path length is **∞**, a deleted receptive-field column, a `\todo{Update results}` sitting beside literal `$?$` placeholders, and nine margin notes in which the authors argue with each other by handle.

**The page is one document rendered twice and superimposed**: the paper as published, in Times, black, at 5.5in; and the paper as written, revealed in place. The reader operates exactly one control — a two-state switch labelled with the two things a LaTeX file can be: **`as submitted` / `as written`**. Nothing else on the page moves.

This is not gossip. Every suppressed passage is an *argument*: a fourth reason self-attention wins; a proof that the feed-forward layer is also attention; the derivation of the number 8. **The page teaches three things the published paper hides, and the hiding is the structure.**

### 2. Why this paper demands this form

- The paper's own thesis is about what you can *remove* — "dispensing with recurrence and convolutions entirely" (abstract), "the first sequence transduction model based entirely on attention" (`p58`). A design organised around what its authors removed from it is the same move applied one level up. No other subject in our benchmark set has a machine-readable record of its own deletions.
- `parameter_attention.tex` is the title claim taken to its limit: *"these networks too can be seen as a form of attention"* — the FFN as attention over trainable parameters, `h_p=8` heads, `n_p=1536` key-value pairs, results **AOP₂ 25.9 BLEU vs base 25.8** on identical parameter count. It was cut. Published §3.3 (`p25–p26`, `eq18`) gives the FFN two flat sentences.
- `sqrt_d_trick.tex` is the derivation of `1/√d_k`; the published paper compresses it to a footnote (`p16`).
- The deleted Table 1 rows (`why_self_attention.tex`, commented block) contain the sharpest fact in the comparison — a position-wise feed-forward layer has maximum path length **∞** — and it did not ship.
- The `\marginpar`s are the paper's own uncertainty in its own voice (§7.3): *"Don't know if it's the most natural question to ask given the previous statements"*.

### 3. Structure

Density shape: **inverted-V** — published text is sparse, the revealed layer is dense, the coda is empty.

| # | movement | form | words |
|---|---|---|---|
| 0 | A single `%` at 300px, black, flush left at the 1in margin, over nothing. Below it, at the paper's own heading size (12pt bold, ragged right), the title. The display element is one glyph. | plate | 8 |
| 1 | **Three desiderata**, published, verbatim (`p32–p34`), set exactly as the paper sets them. Then the switch. The fourth desideratum unfolds *in place* between paragraph three and Table 1 — where it sat in the file. | column | 260 |
| 2 | **Table 1, both versions.** Published: 4 rows, 3 columns. Written: 7 rows, 4 columns, with `Position-wise Feed-Forward … ∞` and the receptive-field column restored. Same table, same rules, more of it. | column | 90 |
| 3 | **The margin.** Nine `\marginpar` notes returned to the margin the macro puts them in — `@usz`, `@all`, `llion@`, `TODO(noam)` — each attached to the published sentence it annotates. This is the one place a metadata rail is earned: the document class has a `\marginpar` and this document used it. | column + rail | 180 |
| 4 | **`%\input{sqrt_d_trick}`.** The cut derivation, restored, with its typo. Two lines of algebra explaining the number in Concept A's title. | column | 110 |
| 5 | **`%\input{parameter_attention}`.** The cut appendix, restored: the two formulae side by side (`FFN(x,W₁,W₂) = ReLU(xW₁)W₂` / `A(q,K,V) = Softmax(qKᵀ)V`), the argument, and the AOP table with its 25.9 against the base's 25.8. | column | 240 |
| 6 | **What shipped.** The switch locks to `as submitted`; every revealed thing folds away in one motion; the page is the published paper again, and shorter than it was. One line: the conclusion's own grammatical slip, uncorrected. | plate | 20 |

**Surface: ~910 words / 3,553 = 25.6%** — and this is the tightest budget of the four, because roughly 600 of those words are *unpublished manuscript* that still counts against a ceiling computed from published prose. Published text on the surface is held to ~310 words; everything else is reachable. 12 viewports, ~150 w/vp.

### 4. Visual language

| slot | decision | provenance |
|---|---|---|
| ground | `#FFFFFF`, single | the page |
| ink | `#000000` published; **`#FF0000` for every suppressed passage's mark** — not the passage's text (which stays black and readable), but its `%` and its enclosing brace | `ms.tex:41` `\newcommand\todo[1]{\textcolor{red}{[[#1]]}}`; the v7 red permission banner |
| display face | Latin Modern Mono, one glyph, 300px | `%` is a LaTeX control character; `\ttdefault` in this document is Computer Modern Typewriter |
| body face | Times lineage, 19px | `\rmdefault{ptm}` |
| apparatus register | **the `%` character and the file/line reference** (`why_self_attention.tex:60`), in LM Mono at 13px — no uppercase, no letterspacing, no eyebrow | the source file's own addressing scheme |
| rule weight | 4px title rule; 1px under; 0.08em table rules | `nips_2017.sty:269,276`; booktabs |
| boundary | **the left margin rule at 1in**, and revealed passages sit *outside* it, in the margin the manuscript kept them in | `\newgeometry{top=1in}`, `\marginpar` |
| grid | 5.5in block + a real margin column; the margin is empty on published screens and full on revealed ones | the document class |
| reading axis | LTR, single column | the paper |

**Imagery.** Almost none, and that is the point: this concept's images are *the two tables*, the two formulae, and white space. Figure 1 appears once, small, in movement 5, to show where the FFN box sits.

**Motion grammar.** Easing = **`steps(1)`**. A LaTeX file either compiles or it does not; there is no ease-in on a compile. The switch is instantaneous; the only duration on the page is the 900ms *reflow* as restored text pushes published text down the column — which is the argument (this material would have made the paper longer, and the page limit is why it didn't).
- *transformation* — published → written, 0ms state change, 900ms reflow.
- *sequence* — none. Nothing else animates. This page is at rest.
- **Environment moments (2):** (i) the opening `%` alone on white, held; (ii) movement 6's fold, in which nine restored regions collapse simultaneously and the page visibly shortens — an environmental inversion that corresponds to a real event (submission), not to a rule that says have one.

### 5. Interaction model

One switch, persistent, top-right, `as submitted` / `as written`, keyboard `s`. That is the entire interface. Every revealed region is `hidden="until-found"` so find-in-page reaches the suppressed text even in `as submitted` state — which means the truth requirement is satisfied by the browser, not by our chrome. Every restored passage carries one affordance: its file and line. End matter carries the full concordance and the e-print URL.

### 6. Latency

The cheapest of the four by an order of magnitude. Two states of static HTML, ~6KB of CSS, ~40 lines of JS. No canvas, no images above the fold, no math rendering beyond the MathML already in `source.html`. First paint is a `%` — one glyph, in a 23KB font, or in the fallback monospace if it hasn't arrived. **Requires the e-print vendored into the repo** (build step; see §0.5); without it the concept does not exist.

### 7. Weaknesses and cliché risk

- **The strongest and the riskiest.** It may read as a meta-essay about LaTeX rather than an experience about attention. The defence is movement 5: if a reader leaves knowing that the feed-forward layer can be read as attention over parameters and that the authors tested it, they have learned something the published paper does not teach.
- **Cliché to avoid: the code editor.** Dark ground, syntax colouring, a blinking cursor, a "diff" gutter with green/red backgrounds. All banned here. The artifact is a *manuscript*, and it is white with black text and a red editorial mark. If it looks like VS Code we have costumed instead of derived.
- **Second cliché: "the secret history of the famous paper".** Avoided by never narrating the authors as characters. No prose about a room in Mountain View. The margin notes speak for themselves and we add nothing.
- Boldest single decision: a 300px `%` as the entire opening screen. A cautious designer talks themselves out of it in four seconds.
- Legibility risk: two superimposed states can confuse. Mitigation — the suppressed text is never *simultaneously* shown as if published; it is always outdented into the margin and always marked. Never a hover-reveal.
- Depends on an external tarball. Vendor it, checksum it, or drop the concept.

---

# Concept C — **Listing Order Is Random**

> *A set that refuses to become a sequence, until the paper's own sinusoids make it one.*

### 1. Organizing idea

Footnote 1: *"Equal contribution. **Listing order is random.**"* The author list is declared, in the paper's own voice, to be a **set** — order carries no information.

That is also the deepest property of the mechanism the paper proposes. Self-attention is permutation-equivariant: shuffle the tokens and the outputs shuffle with them, unchanged. Which is precisely why §3.5 exists — *"Since our model contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, we must inject some information about the relative or absolute position of the tokens"* (`p28`).

**The page opens with eight names in a genuinely random order — re-randomised on every load — and it will not settle.** Then it demonstrates that the model has the same condition, by computing it: shuffle the tokens of a sentence, run the attention, and watch the output permute but not change. Then it adds `eq19`/`eq20`, live, and order appears out of arithmetic. The footnote and §3.5 are the same problem, and the page is the proof.

### 2. Why this paper demands this form

- The organising fact is in the paper's own first person and no explainer uses it. `ms.tex:84`. The eight names, eight contributions, and the explicit claim that their sequence is meaningless.
- **The eights rhyme, verifiably:** h = **8** heads (`p20`), d_k = d_v = d_model/h = 512/8 = **64** = 8² (`p20`), √d_k = **8**, **8** NVIDIA P100 GPUs (`p40`), **8** authors, and Figure 3's eight head colours are the first eight of `tab10` (§0.3). This is a real numeric motif in the document, not a numerological stretch — the last of these is measured out of the artifact.
- The contribution footnote is a **bipartite map from people to parts of Figure 1**: Jakob → the idea of replacing RNNs with self-attention; Ashish + Illia → the first implementations; Noam → scaled dot-product attention, multi-head attention, *and* the parameter-free position representation (i.e. the sinusoids this page ends on); Niki → the model variants that became Table 3; Llion → codebase, efficient inference, **and the visualisations** (i.e. Figures 3–5 themselves); Lukasz + Aidan → tensor2tensor. Every claim sourced to one sentence; nothing weighted, nothing invented.
- Positional encoding is the only part of this paper that is a **closed-form image**: `PE(pos,2i) = sin(pos/10000^(2i/d_model))`. Computing and drawing it is not fabrication — it is evaluating a formula the paper gives.

### 3. Structure

Density shape: **V** — a full screen of eight names, a narrow middle, then the full-bleed positional field.

| # | movement | form | words |
|---|---|---|---|
| 0 | **Eight names**, Times bold at 40px in the paper's own author-block grid (four across, two down, as `\And` breaks them), under the 4pt title rule — re-ordered on every load, and re-ordering slowly, continuously, until the reader touches the page. The footnote sentence sits under them at 9pt. | plate | 30 |
| 1 | **What each did.** Seven clauses, verbatim, each anchored to the box of Figure 1 it built. Hovering or focusing a clause lights that box; clicking a box lists who. Nothing is weighted — presence only. | column + Fig. 1 | 200 |
| 2 | **The machine has the same problem.** Our example sentence, tokenised, in a row. A shuffle control. Attention computed live both times; the output vectors are shown to be the same multiset. The point lands as an equality of numbers, not as an assertion. | column + matrix | 190 |
| 3 | **10000^(2i/d_model)** — the plate. The positional encoding field computed live from `eq19`/`eq20`, full bleed: 512 columns of dimension × as many positions as fit, `#1F77B4` for +1, `#D52728` for −1, white at 0. Wavelengths in geometric progression from 2π to 10000·2π (`p30`). Labelled: *our rendering of the paper's formula*. | plate (environment) | 60 |
| 4 | **It buys nothing measurable.** Table 3 row (E): learned positional embeddings score PPL 4.92 / BLEU 25.7 against base 4.92 / 25.8. The paper's most beautiful device is a wash — and they kept it anyway, for extrapolation (`p31`). Stated in the running voice, as the paper states it. | column | 130 |
| 5 | **Order, restored.** The eight names stop moving and settle — into the order the paper printed. The footnote's first three words are set once more. | plate | 12 |

**Surface: ~620 words / 3,553 = 17.4%** — the lowest of the four; the page is carried by a field, a matrix and a table. 11 viewports, ~145 w/vp, 3 plates.

### 4. Visual language

| slot | decision | provenance |
|---|---|---|
| ground | `#FFFFFF` | the page |
| ink | `#000000`; author names `\bf` Times | `nips_2017.sty` title-box `\bf` author tabulars |
| display face | Times **bold**, 40px, for names — because names in this document are set bold, not large | `nips_2017.sty:294–302` |
| second display | Latin Modern math at 72px for `10000^(2i/d_model)` | math is CM |
| body face | Times lineage, 19px | `\rmdefault{ptm}` |
| apparatus register | **email handles**, in LM Mono at 13px: `avaswani` · `noam` · `nikip` · `usz` · `llion` · `aidan` · `lukaszkaiser` · `illia` | `ms.tex` `\texttt{...@google.com}` — the identifiers the authors use for each other in the margin notes |
| accent | the eight measured head colours, assigned to **heads only**, never to authors | `vis/making_more_difficult5_new.pdf` `rg` operators |
| positional field | `#1F77B4` / `#D52728` diverging through white | cycle indices 0 and 3 from the same file |
| rule weight | 4px title rule, 1px below — the actual title-box construction | `nips_2017.sty:269,276` |
| grid | the author block's `\And` grid (4 × 2) for movement 0, then 712px column | the title macro |

**Imagery.** Figure 1 (movement 1) at prose width. The computed PE field (movement 3). Nothing else — this concept has the smallest image payload and the largest single plate.

**Motion grammar.** Easing = **`sin`**: `progress → sin(πt/2)`, the paper's own positional function used as its own timing function. Every settle on this page decelerates like a quarter sine.
- *sequence* — the name shuffle: continuous, slow (one swap per 2.4s), the only always-moving element on the page (§5.5), and it stops the moment the reader interacts, permanently.
- *transformation* — a token row shuffling and its attention output shuffling with it, 400ms, scroll-bound on re-read.
- **Environment moments (3):** (i) the opening shuffle; (ii) the PE field, computed in a 2D canvas from the closed form, drifting one position per second so the geometric progression of wavelengths is visible as motion (this is the subject's matter rendered, not a gradient); (iii) the settle in movement 5, in which everything on the page stops at once.

### 5. Interaction model

Three affordances, all optional: **hover/focus a contribution clause** (lights a box in Figure 1), **click a box** (lists contributors), **shuffle the sentence** (re-runs attention). Pause control in the fixed corner position; `prefers-reduced-motion` starts the page settled, in the printed order, with the field still. The randomised name order is announced once in the footnote's own words and never explained by us (§5.9).

### 6. Latency

First paint is eight names and a 4pt rule — pure text, ~2KB. The shuffle is CSS `order` on a flex container plus a 1KB script; no layout thrash. Figure 1 lazy-loads at movement 1. The PE field is a `<canvas>` computing `sin`/`cos` over ~512×64 cells once (≈33k evaluations, <5ms) and thereafter translating a single `putImageData`. The attention demo is the same tiny JS as Concept A. No WebGL. No shader vendoring needed even though `vendor/` has one.

### 7. Weaknesses and cliché risk

- **It could drift into "meet the eight authors".** Guard: no photographs, no biographies, no career epilogues, no "one of them later founded…". The people exist on this page only as the seven clauses the footnote grants them.
- **Randomising the author order is a real editorial act on a real credit line.** It is licensed by the footnote's own sentence, and movement 5 ends on the printed order so the record is never left ambiguous. This must be got exactly right or it is a truth failure.
- **Cliché to avoid:** the "positional encoding rainbow heatmap" is itself a genre staple (every blog post has a viridis PE plot). Ours is two measured colours from the paper's own figure through white, at the paper's own geometric wavelength progression, and it is on screen for one plate, not as wallpaper.
- Teaches less mechanism than A. Movement 2 covers permutation-equivariance and nothing about the weighted sum.
- The eights motif is a hair from numerology. It survives only because the last of them (eight head colours) is a measurement.

---

# Concept D — **3.3 × 10¹⁸**

> *The number nobody quotes, as the title. A plane, not a column.*

### 1. Organizing idea

Everyone remembers 28.4 BLEU. Nobody remembers `3.3 · 10¹⁸`. Table 2 has **two** halves — BLEU and *Training Cost (FLOPs)* — and the paper's real claim lives in the right half: `results.tex` sets it apart with a 1pt `\specialrule` and bolds `\boldmath$3.3\cdot10^{18}$` for the base model. The base Transformer is **one to two orders of magnitude cheaper** than every row above it.

**The page is a plane.** Log-x training cost, linear-y BLEU, the ten rows of Table 2 plotted as real records. And it uses prediction-then-reveal (§1's data-narrative row): before the reveal, the reader is asked to place the Transformer on the plane by dragging a marker. Almost everyone puts it up and to the right. It is up and two decades to the **left**.

Then the page does the thing the leaderboard never does — it explains the position from Table 1 (`O(1)` sequential operations, `O(1)` path length), and it undermines its own axis with the paper's own footnote: the FLOPs column is **an estimate**, computed as training time × number of GPUs × an assumed sustained TFLOPS per card (`p49`, footnote 2: 2.8, 3.7, 6.0, 9.5 for K80, K40, M40, P100). The x-axis of the most-cited efficiency claim in machine learning is a back-of-envelope, and the paper says so.

### 2. Why this paper demands this form

- Table 2 is the only place in the record where two incommensurable quantities are placed side by side and the whole argument is their ratio. `p46`: *"Even our base model surpasses all previously published models and ensembles, at a fraction of the training cost of any of the competitive models."*
- The secondary structure classified in §0.6 is exactly this, and §1 says to let the secondary appear as **one contrasting movement** — so this concept is the deliberate inverse: it makes the secondary dominant and compresses the mechanism into one screen. That is what makes it structurally different from A rather than a subset of it.
- **The data contains a genuine surprise the prose hides.** Transformer (base) scores **38.1** on EN-FR — *worse than five of the eight baselines*. Only the big model wins that column. The leaderboard reading of this paper is wrong in a way that is visible the instant you plot it.
- **And a second one.** Table 3 row (E): learned positional embeddings, 25.7 BLEU, against the sinusoids' 25.8. Row (A): one head loses 0.9 BLEU, and 32 heads is *worse* than 16 (`p51`: *"quality also drops off with too many heads"*). Row (C): N=2 loses 2.1. Twenty-two ablation rows in `semantic` and the content model; almost nothing moves.
- The paper contradicts itself about 41.8 vs 41.0 (`p47` vs Table 2 vs abstract). A page organised around the numbers must show that, in the running voice (§7.3).

### 3. Structure

Density shape: **converging** — a wide plane, then a table, then a strip of 22 sparklines, then one number.

| # | movement | form | words |
|---|---|---|---|
| 0 | `3.3 × 10¹⁸` at 120px in Latin Modern math, flush left at the 1in margin, baseline low. Under it, at 10pt, its own caption fragment: *"at a fraction of the training cost"*. | plate | 12 |
| 1 | **Place it.** Empty plane, log-x from 10¹⁸ to 10²¹, y from 23 to 29 BLEU, nine baseline records already plotted in Times lining figures. A draggable marker labelled *Transformer (base)*. The reader commits. | plate + chart | 90 |
| 2 | **Reveal.** The marker snaps to `3.3 × 10¹⁸ / 27.3`. The distance between guess and truth is stated as a multiple, in the reader's own terms. | chart | 70 |
| 3 | **Why it is over there.** Table 1 at prose width, in booktabs rules, with the three commented-out rows from the manuscript restored below a 0.05em rule and marked as unpublished — including `Position-wise Feed-Forward … ∞`. `O(1)` sequential operations is the entire explanation. | column | 170 |
| 4 | **What it cost.** `p40` at full weight: 8 P100s, 0.4s/step, 100,000 steps, 12 hours; 1.0s/step, 300,000 steps, 3.5 days. Drawn as two bars in real proportion (12h : 84h), against the 8-card width. | column | 110 |
| 5 | **The other column.** EN-FR: base = 38.1, below ByteNet, GNMT, ConvS2S, MoE and every ensemble. Same plane, second series. The honest reading of Table 2. | chart | 120 |
| 6 | **Twenty-two variations.** Table 3 as a strip of small multiples, one per row, each a single deviation from base BLEU 25.8. The strip is nearly flat. Row (E) — sinusoids vs learned — is flat to 0.1. | column | 130 |
| 7 | **The axis is an estimate.** Footnote 2, verbatim, at body weight, not in small type. The x-axis redrawn with its assumption visible: FLOPs = hours × GPUs × assumed TFLOPS. And 41.8 vs 41.0, stated plainly. | column | 120 |
| 8 | One number, alone: `3.3 × 10¹⁸`, and under it, in the same size, `2.3 × 10¹⁹` — what the big model cost to beat it by 1.1 BLEU. | plate | 8 |

**Surface: ~830 words / 3,553 = 23.4%.** 13 viewports, ~160 w/vp, 3 plates.

### 4. Visual language

| slot | decision | provenance |
|---|---|---|
| ground | `#FFFFFF` | the page |
| ink | `#000000`; `#7E7E7E` (measured cycle index 8) for baselines | `vis/*.pdf` |
| display face | Latin Modern math, 120px — the title is a number and numbers are set in the math face | math is CM in `ms.tex` |
| body face | Times lineage, 19px; **all chart furniture also Times lining figures** | `\rmdefault{ptm}` — the paper's own numbers are Times, not a chart sans |
| accent | `#D52728` for the Transformer's two records and nothing else; `#FF0000` only on the "unpublished" marks in movement 3 | cycle index 3; `\textcolor{red}` |
| rule weight | booktabs 0.08em / 0.05em on tables; **1px `\specialrule`** isolating the Transformer rows, reproduced exactly where `results.tex` puts it | `results.tex:26` |
| grid | 712px argument column; the plane breaks to 1100px because a log decade needs the width | the data's measure |
| numerals | tabular lining, best-in-column bold | `\textbf{}` in `results.tex` |
| reading axis | LTR; the plane reads left = cheap | Table 2's column order |

**Imagery.** No figure PNGs at all except a thumbnail of Figure 1 in movement 3. This is the one concept carried entirely by tables and charts — which is honest, because Tables 1–3 are where its argument lives.

**Motion grammar.** Easing = **the learning-rate schedule**, `eq21`: linear ramp for the first `warmup_steps`, then decay proportional to `step⁻⁰·⁵`. A curve that is straight in and long out, taken from the paper's own optimiser. Used for every reveal on the page.
- *scale* — the plane's x-axis expanding by decades, 900ms, on reveal.
- *focus* — a baseline record dimming to 30% when a series is isolated.
- *causality* — the Table 1 row that explains a plotted position lights when its record is selected.
- **Environment moments (2):** (i) movement 1's empty plane with only its decade gridlines drawn, held, before anything is plotted — a ceremonial screen that is genuinely empty of apparatus (§4.13); (ii) movement 4's training bars advancing in real proportion (12h : 84h) across eight lanes, one per P100, at the paper's real step times — an environment made of a training run's own duration. Both are DOM and CSS. Neither needs canvas.

### 5. Interaction model

Prediction-then-reveal on entry, skippable in one click (§4.9: *"skip the guess"*). Then: hover/focus any record for its exact row; toggle EN-DE / EN-FR; isolate ensembles; sort the leaderboard by BLEU or by cost — the sort *is* the argument, and re-sorting by cost is the whole page in one gesture. Table 3's strip is filterable by which hyperparameter varies. All keyboard reachable. Every plotted point carries a visible (not hover-only) link to its Table 2 row.

### 6. Latency

The fastest first paint of the four: a 120px number and a caption fragment, ~1KB. The plane is inline SVG built from the content model's table rows at build time — no chart library, no runtime layout, no data fetch. Total JS under 4KB. The only image on the page is a 30KB thumbnail. This concept could ship in a single 40KB document.

### 7. Weaknesses and cliché risk

- **Cliché risk: the scatter plot.** A log-x efficiency chart is the single most common graphic in ML marketing, usually with a glowing dot labelled "ours". Defences: (a) prediction-first, so the reader owns the surprise rather than being sold it; (b) the chart is set in the paper's own Times lining figures with booktabs rules, not in a chart-library sans; (c) movements 5 and 7 use the same chart to *undermine* the claim, which no marketing chart ever does.
- **Cliché risk: big-number stat tiles** — explicitly banned by §8. Movements 0 and 8 are single numbers on empty screens, which is the banned move unless the distribution is present. It is: movement 0 is followed immediately by the plane on which that number is a position, and movement 8 shows it against its own successor. Watch this in review; it is the closest call in this document.
- **Teaches the least mechanism.** A reader could finish this page knowing the Transformer is cheap and not knowing what a query is. Movement 3 is the only mechanism screen. That is a deliberate, and possibly wrong, trade.
- **Possible collision with *Nothing Before Seventy*** — see the sibling check below. This is the one real risk of the four.

---

## Comparison matrix

Scores 1–5, house rubric. Cliché-risk is inverted (5 = least at risk).

| | A · Divide by Eight | B · The Fourth Desideratum | C · Listing Order Is Random | D · 3.3 × 10¹⁸ |
|---|---|---|---|---|
| Information-design fit (dominant structure) | **5** — is the §1 causal-mechanism prescription, executed | 3 — teaches three real arguments, but obliquely | 4 — proves one deep property, skips the rest | 3 — serves the *secondary* structure by design |
| Surprise / "never have thought of that" | 3 — the unrolled Figure 2 is fresh; the genre is not | **5** — the fourth desideratum is invisible to every reader of this paper | **5** — the footnote as the mechanism's own property | 4 — the prediction, and the EN-FR reversal |
| Cliché-risk **inverted** | 2 — the most saturated genre on the internet | **5** — nothing else looks like this | 4 — PE heatmaps are a genre staple, used once | 3 — the log-x "ours" chart is ML marketing's house graphic |
| Implementation risk **inverted** (5 = safest) | 2 — six stateful stations | 4 — trivial to build; **depends on vendoring the e-print** | 3 — canvas field + shuffle correctness | **5** — one static document |
| Latency fit | 4 — cheap, but image + canvas heavy | **5** — text only | 4 — one canvas | **5** — 40KB total |
| Boldness | 3 — bold execution of an expected form | **5** — a 300px `%`; a page built from deletions | 4 — randomising a real credit line | 4 — a title nobody can read aloud |
| Legibility floor | **5** | 3 — two superimposed states need care | 4 | **5** |
| Truth exposure | 3 — every computed number must be labelled ours | 4 — must never let manuscript read as publication | 3 — reordering a credit line is delicate | **5** — all of it is quotation |
| Anti-signature (defaults avoided) | 4 | **5** | 4 | 4 |

---

## Recommendation

**Build A — *Divide by Eight* — as the primary experience, and fold B's three restored arguments into it as its end matter.**

Reasoning:

1. §1.1 classifies this subject as a causal mechanism, and §1's table is unambiguous about what a causal mechanism requires. A is that requirement executed with a colour system measured out of the paper's own figure and a computation that is the paper's own arithmetic. It is the only concept that leaves a reader able to say what a query is.
2. A's weakness is the one thing the other three cannot fix: it is the saturated genre. But the genre is saturated with *metaphor* — spotlights, chat bubbles, glowing graphs — and A contains none. It contains numbers, five fills sampled from `ModalNet-19.png`, and the authors' own rotated bipartite plot. The escape from the cliché is not a different form; it is the refusal of metaphor inside the expected form.
3. B is the better *idea* and the weaker *experience*. Its three restored arguments (the fourth desideratum, `sqrt_d_trick`, `parameter_attention`) are the most valuable material in this entire record, and they attach naturally to A's movements 3, 6 and 7 — the √d_k derivation belongs behind A's Scale plate; "the feed-forward layer is also attention" belongs after A's multi-head movement; the deleted `∞` row belongs in whatever Table 1 treatment ships. Merging them gives A the surprise it lacks without diluting its mechanism.
4. **Keep B's opening as a real alternative if the brief later favours boldness over teaching.** A 300px `%` is the most committed single screen in this document, and B is by far the cheapest to build. If a second, contrasting experience on the same subject is ever wanted, B is it — and it will look nothing like A.
5. D should not be the whole page, but movements 1–2 (predict, then reveal) and 7 (the axis is an estimate) should be lifted into A as its penultimate movement — replacing a summary with a change of scale (§4.6). C's movement 3 (the PE field) is the best plate in the document and should be A's coda environment.

**Composite in one line:** A's five stations, with B's deletions restored behind them, D's prediction as the last movement, and C's positional field as the final plate. Surface stays under budget because each import is ≤120 words.

---

## Sibling check — could any of these be mistaken for *Three Bodies* or *Nothing Before Seventy*?

Run against `ANTI_SIGNATURE.md` §(a) and pre-ship check §9.11.

| axis | Three Bodies | Nothing Before Seventy | these four |
|---|---|---|---|
| ground | `#EDE8DE` | `#EFE7D6` | **`#FFFFFF`**, sampled as the modal pixel of a named file. Δ ≈ 18/22/34 per channel from both siblings. Zero cream in the palette. |
| body face | IBM Plex Serif 17px | Newsreader 19px | **Times/`ptm` lineage**, cited to `nips_2017.sty:38`. Neither Plex nor Newsreader nor any face on the "distinctive fonts" shortlist. |
| second family | Plex Mono micro-labels | Space Mono micro-labels | **Latin Modern**, in a role the document assigns it (mathematics, and `\texttt` addresses). **No uppercase letterspaced micro-label register exists in any of the four.** |
| apparatus register | `10.5px UC +.04em` | `10.5px UC +.09em` | A: none (the colour *is* the label). B: `%` plus `file:line`. C: bare email handles. D: the table cell itself. Four different answers, none of them the sibling declaration. |
| accent | `#BE2A17` alert red | `#B23A22` seal vermilion | **`#FF0000`**, pure, cited to `\textcolor{red}` — 100% saturation, well outside the terracotta band `#C2603C–#D9805C`, and reserved for *unshipped* material rather than for alarm. Plus eight measured `tab10` colours at 82–95% saturation, which neither sibling has anything like. |
| separation | hairlines only | hairlines only | **4px title rule**, 1px `\specialrule`, 0.08/0.05em booktabs — a heavy rule and a hairline rule doing different jobs, both cited. |
| measures | 640 / 1100 | 660 / 1240 | 712 / *variable* — the second measure is a function of sentence length, not a constant. |
| easing | `cubic-bezier(.4,0,.2,1)` | `cubic-bezier(.4,0,.2,1)` | four different derived curves: softmax (A), `steps(1)` (B), `sin(πt/2)` (C), warmup-then-`step⁻⁰·⁵` (D). None is Material's. |
| dark inversion | yes, movement 4 | yes, `#16130F` movement 4 | **none.** No concept has a dark plate, because nothing in a white preprint's world is dark and no event in this subject is an inversion. §4.4 is a ceiling, not a quota. |
| structure | three staves on one clock | a colophon as y-axis | a column of executing operations / a superimposed manuscript / a set refusing order / a cost plane. |

**The one live risk: D's cost plane vs. Hokusai's colophon axis.** Both are "records plotted against an axis". They separate on three counts — Hokusai's axis is a *biographical* scale supplied by the subject in prose and its motion is scroll-bound along that spine, whereas D's is a *measured* log axis from a published table with no scroll binding; Hokusai's plotted objects are images at real scale, D's are Times numerals; Hokusai's page ground is sampled from a print, D's is white with one 82%-saturated red. Still: if both A and D were ever built, D is the one to re-check against §9.11 with a real CSS diff. If the composite recommendation is followed, D contributes two movements and not a system, and the risk closes.

**Verdict: no. A stranger could not sort these into the same studio as the siblings by material palette alone.** White ground, Times prose, Computer Modern mathematics, pure red, and eight saturated `tab10` colours is a world neither sibling contains a single value from — and every one of those values was read out of a file, not chosen.

---

## Build notes (verify before committing)

1. **Vendor the e-print.** `https://arxiv.org/e-print/1706.03762v7` → `benchmarks/attention-paper/eprint/` (1,150,988 bytes; contains `ms.tex`, nine subfiles, `nips_2017.sty`, `Figures/`, `vis/`). **Concept B and several imports into A do not exist without it.** Record a checksum.
2. **Convert `vis/*.pdf` to SVG** (six files, vector, Illustrator-produced). These are Figures 3–5 and they are absent from the arXiv HTML the benchmark scraped.
3. **Fonts.** Latin Modern is already vendored at `experiences/attention-paper/assets/fonts/` as 7 `.woff` files — **convert to woff2** (≈50% saving). For the Times register, try TeX Gyre Termes (CTAN OTF → `fonttools ttLib.woff2`) first; `@fontsource/tinos` is the verified fallback (npm 200) and its lineage difference from `ptm` must be stated in the DESIGN_RATIONALE. `tex-gyre-termes` is **not** on npm (404).
4. **Math is native MathML** lifted from `source.html` (79 `<math>` elements with `application/x-tex` annotations). Do not add KaTeX; do not add MathJax.
5. **Downscale the figure PNGs** to ≤700px wide before shipping (`ModalNet-21.png` is 1520×2239 / 159KB).
6. **Attribution string is mandatory** on every reproduced figure and table, per the paper's own red banner.
7. **Verify before asserting:** the NIPS 2017 eight-page limit (a tempting fourth "eight" — not confirmed from any file in the record, so it is excluded from Concept C above).
