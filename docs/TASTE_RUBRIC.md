# Taste Rubric v0.1

Score each dimension 1–5. Anything ≤ 3 on Information-design fit, Hierarchy, Legibility, or Genericness is a blocking failure. The rubric itself is under test: periodically check whether it predicts which designs are actually better, and evolve it.

1. **Information-design fit** — Does the form correspond to the information? Would another form communicate substantially better?
2. **Hierarchy** — Does the eye immediately know where to go? Primary/secondary distinguishable without effort?
3. **Composition** — Intentionally composed, or populated with components?
4. **Typography** — Does type participate in storytelling and hierarchy, or merely display strings?
5. **Motion** — Does motion communicate relationships/progression/causality/scale/focus, or is it decoration?
6. **Pacing** — Does scrolling reveal information at an intentional rhythm? Dense and sparse moments balanced?
7. **Coherence** — Recognizable visual language without becoming repetitive?
8. **Surprise** — Moments that feel specifically invented for this subject?
9. **Restraint** — Has unnecessary visual noise been removed?
10. **Legibility** — Still excellent at communicating the information?
11. **Craft** — Spacing, alignment, animation timing, responsive behavior, loading states, clipping, layering, microinteractions.
12. **Genericness (inverted)** — Could this exact design serve 100 unrelated topics with swapped text/images? If yes → score 1.
13. **Truth** — Faithful to source; generated material distinguishable; nothing fabricated.
14. **System signature (inverted)** — Does this look like it came from the same hand as our other experiences — or from an LLM's default taste? Tells include: warm cream/bone "paper" grounds by default, serif-display + monospace-metadata pairing by default, muted dusty low-saturation palettes, terracotta/rust accents, uppercase letterspaced micro-labels, "quiet restraint" applied identically to every subject. Any of these may be USED — but only when the subject positively demands it, and never all together as the comfortable default. Score 1 if a stranger could sort our experiences into "same studio" by material palette alone. (See docs/ANTI_SIGNATURE.md.)
15. **Design-choice intentionality** — Every major choice (ground colour, both type families, accent colours, motion grammar, layout system) must have a stated provenance in the subject itself — its era, its material culture, its graphic history, its physics — not in "good taste". The build must ship a DESIGN_RATIONALE block naming each choice's source. "Tasteful but sourceless" scores 2 at best. The strongest test: would a domain expert (a NASA archivist, an ukiyo-e curator) recognize the design language as native to the subject?

## Evaluation protocol

1. Render in a real browser at 1440×900 and 390×844.
2. Scroll through the full experience; capture representative states (top, each major section, interactions mid-state).
3. Independent critic agents score without seeing each other's assessments.
4. Compare against reference work (Shopify Editions, Pudding pieces, NYT interactives).
5. Identify the 2 weakest moments; generate competing improvements; implement the strongest; re-inspect.

## Cliché blacklist (auto-penalize)

- hero → cards → big number → timeline → quote → cards → conclusion
- Purple/indigo gradient headers; glassmorphism panels; floating blobs
- Uniform border-radius cards for every section
- Center-aligned everything; identical section paddings creating metronome pacing
- Scroll-triggered fade-up on every element
- Emoji as icons; gratuitous dark mode with neon accents
- Every subject gets a timeline regardless of fit
