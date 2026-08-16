# Mission

Build a browser extension that transforms an ordinary information-dense webpage into a beautiful, immersive, highly visual, interactive experience.

**Core loop:** I am reading a page → I press one button → within seconds, the information becomes an experience.

Wikipedia is the canonical test case; the architecture should eventually generalize to arbitrary information-heavy pages.

## Non-negotiables

- The transformation must **understand** the information and choose presentation forms that fit it — not merely restyle the page.
- Experiences must feel **individually art-directed**, not template-generated. Two different subjects should produce structurally different experiences.
- **Truth preservation**: never fabricate quotes, statistics, imagery-as-evidence, or facts. Distinguish source facts from generated explanation. Keep traceability to the source.
- **Latency is a design problem**: the first seconds must already feel magical; expensive work streams in progressively.
- **Taste is a system requirement**: rendered output must be inspected visually and critiqued against a rubric; "it compiles" is not "it's good."

## Quality reference

Shopify Editions (Spring 2026) is the quality bar for composition, pacing, typography, motion, and restraint. Extract principles, never copy identity.

## Failure modes to actively detect

- AI-generated landing page / prettier reader mode / shadcn card collections
- Fixed template with variable content; every subject gets a timeline
- Gradients + glassmorphism noise; decoration-motion
- Beautiful but less understandable than the source
- Minutes-long generation before anything interesting happens
- Sophisticated system, mediocre pages

## Definition of success

Click the extension on an arbitrary information page → immediate response → within seconds you are inside a coherent visual interpretation chosen *because it fits this subject* → you learn the material more intuitively than from the original → occasionally you think "I would never have thought to present it that way" → and on a different subject, the result is unpredictably, appropriately different.
