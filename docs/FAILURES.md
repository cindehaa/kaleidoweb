# Failures & Lessons

Honest record of what didn't work. Every substantial experiment leaves the system smarter.

- **(2026-08-16) Wikimedia rate limiting.** Anonymous REST calls get 429'd aggressively. Lesson: always send a descriptive User-Agent with contact info; space requests; retry with backoff. Encoded into fetch tooling.
- **(2026-08-16) Playwright route interception breaks chrome-extension:// loads.** Intercepting `**/*` and continuing extension URLs still crashed the extension iframe. Lesson: scope route filters to `https?://` only.
- **(2026-08-16) Isolated-world flags are invisible to page evaluate.** Content-script state (`window.__x`) can't be asserted from `page.evaluate`; assert on DOM instead.
- **(2026-08-16) Synthetic `chrome.action.onClicked.dispatch` does not grant activeTab.** Tests need explicit `host_permissions`; real clicks don't.
- **(2026-08-16) Headless Chromium through the agent proxy needs `--ssl-version-max=tls1.2`.** The post-quantum ClientHello gets connection-reset by the proxy; cap TLS at 1.2 for any live-web browsing from Playwright. (Local-file rendering unaffected.)
- **(2026-08-16) nytimes.com blocks headless browsers and WebFetch; Google Arts & Culture deep-links 404 without a session.** Study such work via making-of write-ups (OpenNews) instead.

## Taste-loop lessons from Three Bodies v1 (first critique panel)

- **Collapsed content must stay find-in-page reachable.** `display:none` expandables hid 25% of prose from Ctrl+F and broke the reference-tool contract. Use `hidden="until-found"` or `<details>`. Candidate principles amendment (§7.2-adjacent).
- **Builder agents under-size the reading register as density rises.** The on-clock prose shrank to 14.5–15.5px while off-clock prose was 24px — hierarchy inverted exactly where the reader commits. The §2.8 body-size MUST needs to be enforced *per register*, not per page.
- **"Quiet" provenance drifts into invisible provenance.** 9.5px at 1.42:1 contrast fails the honesty requirement it exists to serve. Quietness budget: ≥10.5px, ≥3:1.
- **A page's thesis needs a visibility check of its own.** The LOS blackouts — the concept's entire argument — shipped at 5% ink and got overprinted. Critics catch this; self-review didn't. Rubric candidate: "Is the organizing idea legible at reading distance in a random on-thesis screenshot?"
- **Positional graphics can lie.** The dispersal fan connected objects to lanes by layout convenience, drawing custody relationships the prose contradicts (§7.4 violation). Any line that *connects* two things asserts a relationship; audit connectors as claims.
- **Two independent critics converged on the same top defects from different lenses** (rubric audit vs. cold reading) — evidence the panel design works; keep both lenses per future benchmark.
