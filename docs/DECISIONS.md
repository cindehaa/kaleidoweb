# Decisions Log

- **D001 (2026-08-16)** Project name: **Kaleidoweb**. Repo layout: `extension/`, `pipeline/`, `benchmarks/`, `experiences/`, `tools/`, `docs/`, `screenshots/`.
- **D002 (2026-08-16)** Prove the ceiling before the factory: hand-build (agent-build) benchmark experiences as static artifacts first; automate only after quality is demonstrated on ≥2 structurally different subjects. (Per mission: avoid premature platform building.)
- **D003 (2026-08-16)** First vertical slice subject: **Apollo 11** (chronology + engineering + public-domain imagery + real transcript quotes).
- **D004 (2026-08-16)** Dev-time model strategy: this harness's own agents play the pipeline roles (Opus = art direction/implementation/critique; Haiku = extraction/mechanical). Runtime extension will accept a user API key (Anthropic/OpenRouter); no key ships with the extension.
- **D005 (2026-08-16)** Rendering isolation: Shadow DOM container over the original page (original DOM preserved for instant restore) rather than destructive replacement.
- **D006 (2026-08-16)** Visual evaluation harness: Playwright + pre-installed Chromium; screenshots at 1440×900 and 390×844; scroll-through capture; critic agents score via TASTE_RUBRIC.
