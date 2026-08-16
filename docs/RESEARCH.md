# Extension Architecture & Data-Source Research

Researched 2026-08. **[verified]** = confirmed against live docs/endpoints in Aug 2026; **[unverified]** = training knowledge or partially confirmed — re-verify at implementation time.

---

## 1. Manifest V3 architecture facts

### 1.1 Content script + Shadow DOM takeover (our rendering surface)

- Content scripts run in an **isolated world**: they see the page DOM but have their own JS realm. Page scripts can't touch our objects; we can't call page JS directly. [settled knowledge]
- **Takeover pattern:** content script appends a host element to `document.documentElement`, attaches `shadowRoot = host.attachShadow({mode: 'closed'})`, renders the experience inside, and sets the host to `position: fixed; inset: 0; z-index: 2147483647`. The original page stays untouched underneath → instant restore = remove host. Freeze background scroll with `document.documentElement.style.overflow = 'hidden'` (store/restore prior value).
- **Style isolation:** Shadow DOM gives full CSS isolation both ways. Page CSP does **not** apply to styles we create from the isolated world via CSSOM (`new CSSStyleSheet()` + `shadowRoot.adoptedStyleSheets`) — prefer constructable stylesheets over `<style>` text for robustness. [unverified nuance: inline `<style>` inside shadow roots injected by content scripts is also generally allowed; verify on a strict-CSP page]
- **Scrolling inside the takeover:** make the shadow container its own scroll context (`overflow-y: auto; height: 100dvh`). CSS scroll-driven animations work against any scroll container via `scroll-timeline`/`view-timeline`, not just the root — so our scroll grammar works inside the shadow root. [settled knowledge; verify `timeline-scope` behavior across shadow boundaries]
- **Fonts caveat:** `@font-face` does **not** work when declared only inside a shadow root in some browsers — declare `@font-face` in a document-level stylesheet (injected via `document.adoptedStyleSheets` or a `<link>` to a `web_accessible_resources` CSS file) and *use* the family inside the shadow. [known Chromium quirk — verify current status]

### 1.2 CSP and code injection — the critical constraints

- **Extension CSP (MV3):** `script-src 'self'` is forced for extension contexts; **no `unsafe-eval`, no remote script URLs**. You cannot relax it for extension pages. Sandboxed extension pages (`"sandbox"` manifest key) may use `eval`. [settled knowledge]
- **Remote code is banned** in MV3 (Chrome Web Store policy + platform): all JS must ship in the package. CDN `<script>` tags are not an option in the shipped extension (they are fine in our dev-time `experiences/` artifacts).
- **Can a content script inject `<script>` into the page?** Yes mechanically, but the injected script executes in the **page's main world and is subject to the page's CSP**. Wikipedia currently serves no enforced `script-src` that would block it [unverified — spot-check `content-security-policy` headers on en.wikipedia.org; they have run report-only CSPs]. Cleaner: `chrome.scripting.executeScript({world: 'MAIN'})` injects into the main world **bypassing page CSP** (it's extension-vouched code, but must be a packaged file/function, not an arbitrary string).
- **Into Shadow DOM:** attaching a `<script>` inside a shadow root is not a CSP boundary — scripts execute in whichever world created them; shadow DOM isolates styles/DOM, **not** CSP or JS realms. No escape hatch there.
- **Executing LLM-generated code at runtime** (the hard question for the "bespoke code" part of the Experience Spec):
  1. **Interpret, don't execute (recommended):** the Experience Spec is declarative — composition of pre-bundled primitives with parameters (keyframes, scales, SVG path data, palettes, copy). SVG markup, CSS, WAAPI keyframes, and d3 configs are *data*, not code; `setHTMLUnsafe`/DOMPurify-sanitized SVG + generated CSS gets us surprisingly far with zero policy risk.
  2. **Sandboxed iframe:** a packaged sandbox page (manifest `"sandbox"`) may `eval`; embed as iframe in the shadow root, postMessage the generated JS in, let it render to its own document or send draw commands back. CSP-legal, but Chrome Web Store's remote-code policy is still a gray zone for LLM-generated logic — see Open Questions.
  3. **`chrome.userScripts` API:** designed for user-provided code (Chrome 120+; requires the user to enable developer mode or the per-extension "Allow user scripts" toggle in Chrome 138+ [unverified exact version]); executes arbitrary strings in isolated/main world. Awkward UX but the *sanctioned* arbitrary-code path.
  4. **Main-world `<script>` injection with a string** works on pages whose CSP allows it (Wikipedia today) — fragile, page-dependent; treat as last resort.
- `web_accessible_resources` (MV3 form: list of `{resources, matches}`): required for any packaged file the *page* context loads by URL (fonts, images, iframes, main-world scripts). Isolated-world content scripts can `fetch(chrome.runtime.getURL(...))` without it for many resource types, but declaring is the safe rule. [settled knowledge]

### 1.3 Service worker lifetime

- **[verified]** Base idle timeout **30 s**; any dispatched event or extension-API call resets it. Since Chrome 110, the worker stays alive while events are pending; Chrome 116+ keeps it alive during active WebSocket traffic; `chrome.alarms` minimum period 30 s (Chrome 120+).
- Practical rules for us:
  - No global state in the SW — persist to `chrome.storage.session`/`local`; assume the SW dies between pipeline stages.
  - Long LLM calls: a **streaming fetch with active reads plus an open `chrome.runtime` Port relaying chunks** keeps activity flowing (each port message resets the timer). Belt-and-braces: a 20 s `chrome.alarms`-free keepalive by calling a trivial API (e.g. `chrome.runtime.getPlatformInfo`) on an interval while a job is in flight. [pattern widely used; exact guarantees unverified]
  - Or avoid the problem: do the LLM fetch **from the content script** (possible — see 1.5).

### 1.4 Cross-origin fetching

- **[verified]** Content scripts are subject to the **page's** origin/CORS — they fetch as if they were the page. The standard MV3 pattern: content script → `chrome.runtime.sendMessage` → **service worker fetches** (SW has extension-origin powers and, with `host_permissions` for the target, can make cross-origin requests without CORS preflight constraints) → relay the response back.
- For Kaleidoweb, from a Wikipedia tab:
  - Wikipedia/Wikidata/Commons APIs all send `Access-Control-Allow-Origin: *` [settled Wikimedia policy; the REST endpoints fetched above are public], so the **content script can fetch them directly** — same-origin for en.wikipedia.org anyway, CORS-open for wikidata.org/commons. No SW round-trip needed for data.
  - Host permissions we'll want anyway (for arbitrary-page generalization + api.anthropic.com): `https://*.wikipedia.org/*`, `https://*.wikimedia.org/*`, `https://www.wikidata.org/*`, `https://api.anthropic.com/*`, `https://openrouter.ai/*`.

### 1.5 Calling LLM APIs from an extension

- **Anthropic CORS support — [verified]:** setting request header **`anthropic-dangerous-direct-browser-access: true`** enables CORS on the Anthropic API, allowing direct browser/extension JS calls (announced Aug 2024, by design for bring-your-own-key apps — exactly our model; user-supplied key in extension storage). The TS SDK exposes this as `new Anthropic({ dangerouslyAllowBrowser: true })` [unverified exact option name — check SDK].
- Three viable call sites:
  1. **Service worker fetch** (host permission → no CORS at all): most robust; must manage SW lifetime during long streams (1.3).
  2. **Content-script direct fetch with the CORS header:** works because Anthropic answers CORS; simplest streaming story (no relay), but the API key travels through a context sharing a process with the page — key stays in extension storage and only transits memory; acceptable for BYOK, worth noting in a security review.
  3. Extension page (options/panel) fetch — fine, but not our UX.
- **Streaming:** the Messages API streams SSE; in extensions consume via `fetch` + `ReadableStream` (`response.body.getReader()` + `TextDecoderStream`), parsing `event:`/`data:` lines — `EventSource` can't POST. Works in both SW and content script. Stream partial Experience Spec → progressive rendering is exactly the latency strategy MISSION.md demands.
- **Current API surface** (from the claude-api skill, 2026): default strong model `claude-opus-5` (adaptive thinking on by default), cheap model `claude-haiku-4-5` for extraction passes; `output_config: {format: {type: "json_schema", ...}}` structured outputs for the Content Model / Experience Spec; prompt caching (min cacheable prefix 512 tokens on Opus 5) for the static art-direction system prompt; streaming required for long outputs. OpenRouter (BYOK alternative) is CORS-open by default [unverified].

### 1.6 Storage

- `chrome.storage.local`: ~10 MB default (`unlimitedStorage` permission removes the cap) — cache generated Experience Specs keyed by URL + content hash. [settled]
- `chrome.storage.session`: in-memory, survives SW restarts within a browser session — pipeline intermediate state.
- `chrome.storage.sync` ~100 KB total: user prefs + (optionally) API key — but keys in `sync` replicate to all their devices; prefer `local` for the key.
- IndexedDB available in SW and content scripts for larger blobs (font subsets, cached images as blobs) [settled].

---

## 2. Wikipedia / Wikidata / Commons APIs

### 2.1 Wikipedia REST v1 (`https://en.wikipedia.org/api/rest_v1/`)

- **`/page/summary/{title}` — [verified live]:** returns `title`, `description` ("First crewed Moon landing (1969)"), `extract` (plain-text lead), `thumbnail` + `originalimage` (with dimensions), `coordinates` (when present), `lang`/`dir`, `pageid`, and **`wikibase_item`** (e.g. `Q43653`) — the join key into Wikidata. Perfect first-fetch: hero image + one-liner within milliseconds of the button press.
- **`/page/media-list/{title}` — [verified live]:** every media item on the page with `title` (File:…), `type` (image/video/audio), `section_id` (which section it illustrates — lets us bind imagery to content sections), `showInGallery`, `caption.text` (+ HTML), and **`srcset` with ready-made `upload.wikimedia.org/.../thumb/...` URLs at 1x/2x** — we never need to construct thumb URLs ourselves for page imagery. Videos include `sources[]` in multiple formats.
- **`mobile-sections` is deprecated/unmaintained — [verified]** (Wikimedia says do not use; PCS endpoints being wound down toward Parsoid HTML). Use instead:
  - **`/page/html/{title}`** — full Parsoid HTML with stable `data-mw` semantics; sections are `<section data-mw-section-id>`, infoboxes are ordinary tables with `infobox` class. Our deterministic extractor should parse this (or simply the live DOM we're already standing in — we are a content script on the rendered page; the DOM *is* available without any fetch).
  - MediaWiki **Action API** (`/w/api.php`) with `action=parse`/`action=query` + `prop=extracts|pageimages|coordinates|categories` for targeted structured pulls; and the newer core REST `/w/rest.php/v1/page/{title}` for raw wikitext. [settled]
- CORS: all Wikimedia APIs allow anonymous CORS (`origin=*` param for action API; REST sends ACAO `*`). Etiquette: send a descriptive `Api-User-Agent` header, keep concurrency low. [settled Wikimedia policy]

### 2.2 Wikidata (structured facts)

- **`https://www.wikidata.org/wiki/Special:EntityData/{QID}.json` — [verified live]:** public, unauthenticated; returns `labels`/`descriptions`/`aliases` (100+ languages), `claims` keyed by property (e.g. Apollo 11: `P31` instance-of, `P619` launch date, `P620` landing date, `P1029` crew, `P793` significant events), each with `mainsnak.datavalue`, `qualifiers`, `rank`, `references`, plus `sitelinks`.
- This is the highest-precision source of **dates, quantities, coordinates, and relationships** — exactly the typed facts the Content Model wants, with provenance. Route: REST summary → `wikibase_item` → EntityData JSON.
- Also available: `wbgetentities` (batch, `props=claims|labels`), SPARQL at `query.wikidata.org` (CORS-open, powerful for "all X of Y" but latency-risky — use sparingly) [settled].
- Practical note: claims reference other entities by QID — resolving labels needs a second batched `wbgetentities` call (`props=labels`, up to 50 IDs).

### 2.3 Wikimedia Commons — imagery reuse

- **Hotlinking policy — [verified]:** hotlinking from `upload.wikimedia.org` **is allowed** ("not generally recommended" only because files can be renamed/deleted); license conditions (attribution) still apply. There's no API key, no quota published; be a polite client (the media-list srcset URLs are exactly the thumbs Wikipedia itself serves, so they're cache-hot).
- **Thumb URLs:** canonical form `https://upload.wikimedia.org/wikipedia/commons/thumb/{a}/{ab}/{File_Name}.jpg/{W}px-{File_Name}.jpg` where `a`/`ab` are the first hex chars of the **MD5 of the underscored filename** [verified that MD5-based paths are the scheme; construct-by-hand is fiddly]. **Avoid constructing them:** (1) media-list `srcset` gives them to you; (2) Action API `prop=imageinfo&iiurlwidth=1200` returns `thumburl` for any width; (3) `Special:FilePath/{File}?width=1200` redirects to the right thumb. Only certain widths are pre-rendered/cacheable — stick to common sizes (320/640/800/1024/1280/2048).
- **Licensing metadata:** `action=query&prop=imageinfo&iiprop=extmetadata|url|size&titles=File:...` returns `extmetadata` fields: `LicenseShortName`, `License`, `Artist` (HTML), `Credit`, `Attribution`, `UsageTerms`, `DateTimeOriginal`. Required for the truth-preservation/attribution UI (credits panel per experience). [settled; verify field coverage on video files]
- Structured Data on Commons (SDC) exposes per-file Wikidata-style statements (`M`-ids) for depicted subjects — nice-to-have for "what is inherently visual" ranking. [unverified]

### 2.4 Arbitrary pages (beyond Wikipedia)

- **Readability.js** (`@mozilla/readability`, Apache-2.0, ~30 KB): the battle-tested extractor Firefox Reader Mode uses; conservative — can drop useful content; output is cleaned DOM.
- **Defuddle — [verified]:** released 2025 by the Obsidian developer; MIT; multi-pass detection (recovers when a pass finds nothing), **standardizes output** (footnotes, code blocks, math/KaTeX preserved), site-specific extractor registry + heuristics fallback, HTML-to-Markdown oriented. Community-regarded as the modern Readability replacement; both still fail on some messy news sites.
- **Verdict:** Wikipedia path = deterministic DOM/Parsoid parsing (no extractor library). Generalization path = Defuddle first, Readability fallback. Both run fine in a content script (they operate on the live DOM).

---

## 3. Putting it together — pipeline call sites

```
action click
  → content script (already on page):
      instant typographic takeover from live DOM (0 network)
      fetch rest_v1 summary (hero, wikibase_item)          [direct, CORS-open]
      fetch rest_v1 media-list (imagery + captions + srcset)[direct]
      fetch Wikidata EntityData (typed facts)               [direct]
  → LLM passes (SW fetch or direct w/ anthropic-dangerous-direct-browser-access):
      cheap-model extraction passes  (haiku-4-5, structured outputs)
      art direction pass             (opus-5, streaming, prompt-cached system)
  → renderer interprets streamed Experience Spec inside Shadow DOM
      Tier-2/3 library chunks lazy-imported from the bundle as the spec requires
```

---

## 4. Open questions

1. **LLM-generated bespoke code vs. Chrome Web Store remote-code policy.** Interpreted declarative specs are clearly fine; `eval`ing generated JS in a sandboxed page is CSP-legal but policy-gray ("logic defined by remote data"). Options ranked: declarative spec → sandbox iframe → `chrome.userScripts` (explicit user opt-in) → main-world injection. Need a decision + possibly a CWS policy read before building the "bespoke code" tier of the Experience Spec. Dev-time artifacts have no such constraint — prove the ceiling first, decide the runtime encoding later.
2. **Wikipedia's live CSP** — confirm en.wikipedia.org still enforces no `script-src`/`style-src` that would affect main-world injection or shadow-root styling (was report-only historically).
3. **`@font-face` inside Shadow DOM** — confirm current Chromium/Firefox/Safari behavior; plan is document-level `@font-face` + shadow-internal usage.
4. **Scroll-driven animations & `timeline-scope` across the shadow boundary** — verify named timelines resolve as expected inside our scroll container.
5. **SW keep-alive during a 60–120 s streaming Opus call** — validate the port-message + trivial-API-ping pattern, or decide to standardize on content-script-direct Anthropic calls (CORS header verified working).
6. **Safari/Firefox extension ports** — MV3 support exists in both, but `chrome.userScripts`, offscreen documents, and SW lifetimes differ; Chrome-first, revisit later.
7. **Commons politeness limits** — no published hard quota for `upload.wikimedia.org`; if we ever prefetch many images per experience, add concurrency caps + `srcset` sizes only.
8. **OpenFreeMap reliability** for a shipped product (donation-funded, no SLA) — fine for dev; for the extension consider bundling Protomaps PMTiles extracts for map-centric experiences or graceful degradation to d3-geo.
9. **Key storage UX** — `chrome.storage.local` vs. asking per-session; and whether to support OpenRouter as the default BYOK path (single key, many models; CORS behavior to verify).
