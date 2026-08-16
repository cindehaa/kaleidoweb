# Architecture (initial hypothesis — expect revision)

## Principle

Separate **understanding** from **art direction** from **rendering**. Never generate a page directly from raw text.

```
page DOM
  │  (1) extraction — cheap, deterministic + small-model assist
  ▼
Content Model (intermediate representation)
  │  (2) art direction — high-intelligence, subject-specific
  ▼
Experience Spec (composition of primitives + bespoke code)
  │  (3) rendering — streaming, progressive
  ▼
immersive experience (replaces page, original preserved)
```

## 1. Extraction → Content Model

Deterministic DOM parsing plus cheap-model passes for: entities, chronology, geography, quantities, causal claims, processes, comparisons, quotations, uncertainty, "what is inherently visual", emphasis ranking. Output: a typed JSON Content Model. Every claim keeps a source pointer (section/paragraph) for traceability.

**Source adapters (validated 2026-08-16):** the Content Model is source-agnostic; only the first parsing step is per-source. Two adapters exist: `extract-wikipedia.mjs` (Parsoid HTML: sections/infobox/images/coords) and `extract-arxiv.mjs` (LaTeXML HTML: sections incl. sub/subsub/paragraph-blocks, equations with LaTeX preserved, figures, tables, authors, abstract). The downstream stages — semantic pass (schema adapted per subject type, same sourcing discipline), concept generation, build, critique — ran unchanged on both source types. The semantic schema varies by subject's dominant structure (chronology/quotes for events, works/names for artists, mechanism/whys for papers) but the "every item carries src" contract is invariant.

## 2. Art direction

A high-intelligence pass reads the Content Model and produces an **Experience Spec**:
- a *concept* (the organizing idea — e.g. "mission clock as spine")
- a *visual language* (type system, palette, motion grammar — chosen for the subject)
- a *structure* (sequence of scenes/movements, each mapping content → presentation primitive or bespoke code)
- generate ≥3 structurally different concepts cheaply, critique, pick before expensive work.

## 3. Rendering

- Runtime: vanilla TS + Web Animations / CSS scroll-driven where possible; libraries loaded per-need (see CAPABILITY_CATALOG).
- Renders into the page via a full-viewport container with Shadow DOM isolation; original page preserved underneath for instant restore.
- Progressive: instant typographic takeover (< 200 ms, deterministic) → structure + first scenes stream in → expensive bespoke visuals hydrate asynchronously.

## Extension (MV3)

- `action` button → content script → orchestrates pipeline via background service worker.
- Model access: user-supplied API key (Anthropic or OpenRouter) stored in extension storage; cheap models for extraction passes, strong model for art direction; caching keyed by URL + content hash.
- Escape hatch UI: restore original / regenerate / view sources.

## Development strategy (prove the ceiling first)

Dev-time pipeline runs as Node scripts; model calls are performed by dev-time agents (Opus for art direction/implementation, cheap models for extraction). Benchmark experiences are built as static artifacts in `experiences/`, evaluated with the Playwright harness in `tools/`. Only after 2–3 benchmark subjects reach quality do we automate the factory into the extension runtime.
