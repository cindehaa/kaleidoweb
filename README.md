# Kaleidoweb

**One button turns an ordinary information-dense webpage into an individually art-directed, immersive, interactive experience.**

Wikipedia is the canonical test case. The system separates *understanding* (a typed Content Model extracted from the page) from *art direction* (a subject-specific Experience Spec chosen by a high-intelligence pass) from *rendering* (progressive, streaming takeover of the page). Truth preservation and taste are hard requirements: nothing fabricated, everything traceable, and every rendered result is visually inspected and scored against a rubric before it counts.

## Current progress

**Phase: bootstrap.** Repo, mission docs, benchmark suite, initial architecture hypothesis, and taste rubric are in place. Next: design-reference research, the Playwright visual-evaluation harness, and the first vertical slice — transforming the Apollo 11 Wikipedia article into a proof-of-ceiling experience.

## Layout

- `docs/` — living internal artifacts (MISSION, ARCHITECTURE, TASTE_RUBRIC, BENCHMARKS, DECISIONS, NEXT, research outputs)
- `extension/` — MV3 browser extension (button → takeover → restore)
- `pipeline/` — extraction → Content Model → art direction → Experience Spec
- `benchmarks/` — snapshotted source articles for the permanent evaluation suite
- `experiences/` — generated experiences for the benchmarks
- `tools/` — Playwright render/screenshot/critique harness
- `screenshots/` — visual progress record

## Benchmarks

Apollo 11 · Photosynthesis · Ada Lovelace · Fourier transform · Silk Road · Hokusai · Golden Gate Bridge — seven deliberately different informational structures. Success means each produces a structurally different experience whose form is obviously motivated by its content.
