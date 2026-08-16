# Kaleidoweb

**One button turns an ordinary information-dense webpage into an individually art-directed, immersive, interactive experience.**

Wikipedia is the canonical test case. The system separates *understanding* (a typed Content Model extracted from the page) from *art direction* (a subject-specific Experience Spec chosen by a high-intelligence pass) from *rendering* (progressive, streaming takeover of the page). Truth preservation and taste are hard requirements: nothing fabricated, everything traceable, and every rendered result is visually inspected and scored against a rubric before it counts.

## Current progress

**First proof-of-ceiling experience is live in the extension.** Click the button on the Apollo 11 Wikipedia article and it becomes **Three Bodies** — the mission as a three-stave score on one shared UTC clock (Houston / *Eagle* / *Columbia*), where scroll is time, simultaneity becomes visible (the source serializes events that were concurrent), Collins' thirty far-side radio blackouts render as hatched silence, and red belongs exclusively to the 1202 alarms, the propellant calls, and Luna 15. The build survived a two-critic panel (rubric audit + cold-reader audit) and a 14-item fix round: every fact traceable to a paragraph anchor, all prose find-in-page reachable via `hidden="until-found"`, dispersal graphics redrawn so no connector asserts a custody the prose doesn't state. Zero console errors; automated smoke test green (button → takeover → Escape → restore).

**Second benchmark building now: Hokusai → "Nothing Before Seventy."** His own colophon — grading his life's work by age — becomes the graph's y-axis; the reader drags The Great Wave to guess where he ranked it, and it snaps inside the years he dismissed as worthless; the axis extends, empty, to the age 110 he never reached. Different fonts, palette sampled from the prints, structurally unrecognizable from Apollo — the anti-genericness thesis under test.

**Taste is now a system, not a vibe.** A quantitative principles doc (measured from Shopify Editions, Ciechanowski, the Pudding); a 17-dimension rubric including three user-directed additions: *system-signature detection* (output must not "look like Claude" — cream grounds, serif+mono restraint as default), *design-choice intentionality* (every material choice needs stated provenance in the subject's world), and *omission as design* (surface carries only what earns its place; boldness required). Research agents are currently characterizing the LLM design signature and editorial cutting doctrine; semantic extraction is done or running for Fourier transform and Silk Road.

Infrastructure: 7 benchmarks snapshotted into typed Content Models with source-attributed semantic layers; Playwright taste-loop harness; instant typographic first-stage in the MV3 extension (~100 ms); all findings accumulate in `docs/` (FAILURES.md logs every lesson).

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
