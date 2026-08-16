# Failures & Lessons

Honest record of what didn't work. Every substantial experiment leaves the system smarter.

- **(2026-08-16) Wikimedia rate limiting.** Anonymous REST calls get 429'd aggressively. Lesson: always send a descriptive User-Agent with contact info; space requests; retry with backoff. Encoded into fetch tooling.
- **(2026-08-16) Playwright route interception breaks chrome-extension:// loads.** Intercepting `**/*` and continuing extension URLs still crashed the extension iframe. Lesson: scope route filters to `https?://` only.
- **(2026-08-16) Isolated-world flags are invisible to page evaluate.** Content-script state (`window.__x`) can't be asserted from `page.evaluate`; assert on DOM instead.
- **(2026-08-16) Synthetic `chrome.action.onClicked.dispatch` does not grant activeTab.** Tests need explicit `host_permissions`; real clicks don't.
