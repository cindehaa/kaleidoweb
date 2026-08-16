# Kaleidoweb

**One button turns an ordinary information-dense webpage into an individually art-directed, immersive, interactive experience.**

Wikipedia is the canonical test case. The system separates *understanding* (a typed Content Model extracted from the page) from *art direction* (a subject-specific Experience Spec chosen by a high-intelligence pass) from *rendering* (progressive, streaming takeover of the page). Truth preservation and taste are hard requirements: nothing fabricated, everything traceable, and every rendered result is visually inspected and scored against a rubric before it counts.

## Current progress

**Phase: first vertical slice (Apollo 11).** Infrastructure is standing: all seven benchmark articles are snapshotted and extracted into typed Content Models; a semantic pass produced 202 fully source-attributed Apollo facts (chronology with exact UTC times, quotes, quantities); a Playwright harness renders any experience and captures scroll-through screenshots for the taste loop; and the MV3 extension works end-to-end (button → instant typographic takeover of the live article in ~100 ms → Escape restores the original), verified by an automated smoke test in headless Chromium.

Art direction for Apollo 11 produced four structurally different concepts (documented in `experiences/apollo-11/CONCEPTS.md`). Selected: **Three Bodies** — the mission as a three-stave score on one shared UTC clock (Houston / *Eagle* / *Columbia*), where scroll is time, simultaneity becomes visible (the source article serializes events that were concurrent), and Collins' thirty far-side radio blackouts render as a lane going dark. Palette comes from the flight-director team colors in the article's own table; red is reserved exclusively for the 1202 alarms, the propellant calls, and Luna 15. The build is in progress under a mandatory render-inspect-critique loop.

Tech research findings that shaped the architecture: GSAP is now fully free; CSS scroll-driven animations are cross-browser; MV3 forbids remote code (so experiences interpret a declarative Experience Spec rather than eval'ing generated code); Anthropic's API permits direct browser calls with a user-supplied key.

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
