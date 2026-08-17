/* ══════════════════════════════════════════════════════════════════
   runtime/interpreter.js

   Consumes an Experience Spec (NDJSON, one record per line, in render
   order) and renders it into a root element. Implements the phase
   order and the failure-fallback table of EXPERIENCE_SPEC (f).

   Nothing is buffered waiting for a closing brace: each record is
   rendered on arrival, and a truncated stream is a shorter experience,
   never a broken one.

     KW.Source.fromStream(response)  — the real path (fetch, http)
     KW.Source.fromText(str, {perFrame}) — file:// and the streaming test
     KW.Interpreter.run({root, data, source, assetBase, fontBase})

   Phases
     0 stage        ≤100 ms   built    full-viewport typographic takeover
     1 derivation   ≤500 ms   client   ground, census, true-aspect plates
     2 head         0.8–1.5 s model    meta + materials
     3 scene list   +0.2 s    model    index real, scroll space reserved
     4 scene bodies 1.5–4 s   model    each scene hydrates in place
     5 beat + env   last      model
     6 end matter   after end client   reading room, rationale, footer
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = root.KW;

  /* ═══════════════════════ record sources ═══════════════════════ */
  const Source = {
    /** fromStream(Response) — the extension's path: a token stream cut
        into lines, each yielded the moment its newline lands. */
    fromStream(res) {
      return async function* () {
        const rd = res.body.getReader();
        const dec = new TextDecoder();
        let buf = '';
        for (;;) {
          const { value, done } = await rd.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let i;
          while ((i = buf.indexOf('\n')) > -1) { const line = buf.slice(0, i); buf = buf.slice(i + 1); if (line.trim()) yield line; }
        }
        /* a partial final line is a truncated record: drop it (f) */
        if (buf.trim()) { if (isWholeJSON(buf)) yield buf; else Source.truncated = true; }
      };
    },
    /** fromText(str, {perFrame}) — same generator contract; perFrame
        feeds one record per animation frame so the progressive render
        can be watched and measured. */
    fromText(text, opts) {
      const lines = String(text).split('\n').filter((l) => l.trim());
      const perFrame = opts && opts.perFrame;
      return async function* () {
        for (const line of lines) {
          if (perFrame) await new Promise((r) => requestAnimationFrame(r));
          yield line;
        }
      };
    },
  };
  function isWholeJSON(s) { try { JSON.parse(s); return true; } catch (e) { return false; } }
  KW.Source = Source;

  /* ═══════════════════════ schema guards ═══════════════════════ */
  const S = {
    meta: (r) => typeof r.title === 'string' && r.title.length > 0,
    materials: (r) => Array.isArray(r.ground) && r.ground.length > 0 && !!r.ink && !!r.type,
    scenes: (r) => Array.isArray(r.list) && r.list.length > 0 && r.list.every((x) => Array.isArray(x) && x.length >= 3),
    scene: (r) => typeof r.id === 'string' && typeof r.kind === 'string' && typeof r.claim === 'string',
    beat: (r) => typeof r.id === 'string' && typeof r.type === 'string' && typeof r.scene === 'string',
    env: (r) => typeof r.id === 'string' && typeof r.scene === 'string' && typeof r.treatment === 'string',
    end: (r) => !!r.endmatter,
  };

  /* ═══════════════════════ the interpreter ═══════════════════════ */
  async function run(opts) {
    const t0 = performance.now();
    const mark = {};
    const ctx = {
      root: opts.root,
      data: opts.data,
      assetBase: opts.assetBase || '',
      fontBase: opts.fontBase || '',
      facesLoaded: {},
      notes: [],
      scenes: {},
      derived: {},
      meta: null,
      stats: { records: 0, bytes: 0, scenes: 0, beats: 0, envs: 0, dropped: 0 },
      timing: mark,
    };
    ctx.refs = KW.Refs(ctx.data);
    KW.derive.digest = opts.digest || null;

    /* ── phase 0 · stage ─────────────────────────────────────────── */
    KW.Stage.build(ctx);
    ctx.sequence = KW.Sequence(ctx);
    ctx.sequence.wirePause();
    ctx.scenesApi = KW.Scenes(ctx);
    ctx.evidence = KW.Evidence(ctx);
    ctx.env = KW.Env(ctx);
    ctx.endmatter = KW.Endmatter(ctx);
    mark.stage = performance.now() - t0;

    /* ── phase 1 · client derivation (no model call) ──────────────
       The page is already defensible here: a sampled ground, a real
       composition, every figure reserved at its true aspect. */
    await derive(ctx, opts);
    mark.derive = performance.now() - t0;

    /* ── phases 2–5 · consume the stream ─────────────────────────── */
    const pending = { beat: null, env: [], end: null };
    let sawBeat = false;

    for await (const line of opts.source()) {
      ctx.stats.records++;
      ctx.stats.bytes += line.length;
      let rec;
      try { rec = JSON.parse(line); } catch (e) { ctx.stats.dropped++; ctx.notes.push('record ' + ctx.stats.records + ' was not valid JSON and was dropped'); continue; }
      if (!rec || typeof rec.r !== 'string') { ctx.stats.dropped++; continue; }

      try {
        switch (rec.r) {
          case 'meta':
            if (!S.meta(rec)) { ctx.notes.push('meta malformed — discarded, client-derived materials stand'); break; }
            ctx.meta = rec;
            document.title = rec.title + (ctx.data.contentModel.title ? ' — ' + ctx.data.contentModel.title : '');
            ctx.root.dataset.kit = rec.kit || '';
            break;

          case 'materials':
            if (!S.materials(rec)) { ctx.notes.push('materials malformed — discarded, client-derived materials stand'); break; }
            KW.Materials.apply(ctx, rec);
            mark.materials = performance.now() - t0;
            break;

          case 'scenes': {
            if (!S.scenes(rec)) { ctx.notes.push('scene list malformed — the reading room carries everything instead'); break; }
            ctx.sequence.reserve(rec.list);
            rec.list.forEach(([id, kind]) => (ctx.scenes[id] = { id, kind: ctx.scenesApi.normalise(kind) }));
            /* the kit gets the whole list so it can reserve one surface
               for a run of states (a sticky plate is not five scenes). */
            mountKit(ctx, rec.list);
            mark.scenes = performance.now() - t0;
            break;
          }

          case 'scene': {
            if (!S.scene(rec)) { ctx.notes.push('scene ' + (rec.id || '?') + ' withheld — failed schema'); break; }
            const node = ctx.sequence.node(rec.id);
            if (!node) { ctx.notes.push('scene ' + rec.id + ' withheld — it is not in the scene list'); break; }
            const score = ctx.refs.score(rec.refs);
            if (score <= 0.5) {
              ctx.notes.push('scene ' + rec.id + ' withheld — ' + Math.round((1 - score) * 100) + '% of its refs do not resolve');
              node.style.minHeight = '0'; node.innerHTML = ''; node.classList.add('kw-collapsed');
              break;
            }
            const kind = ctx.scenesApi.normalise(rec.kind);
            if (kind !== rec.kind) ctx.notes.push('scene ' + rec.id + ': unknown kind "' + rec.kind + '" → column');
            const scene = { ...rec, kind };
            ctx.scenes[rec.id] = scene;
            node.classList.remove('kw-reserved');
            let handled = false;
            if (ctx.kit && ctx.kit.claims[kind] && ctx.kit.scene) handled = ctx.kit.scene(scene, node);
            if (!handled && kind === 'reading-room') { ctx.endmatter.build(scene, node, pending.end); ctx.readingRoom = { scene, node }; handled = true; }
            if (!handled) ctx.scenesApi.render(scene, node);
            ctx.stats.scenes++;
            if (!mark.firstScene) mark.firstScene = performance.now() - t0;
            mark.lastScene = performance.now() - t0;
            ctx.sequence.poke();
            break;
          }

          case 'beat':
            if (!S.beat(rec)) break;
            if (sawBeat) { ctx.notes.push('a second beat (' + rec.id + ') was dropped — one beat per experience (§5.6)'); break; }
            sawBeat = true;
            pending.beat = rec;
            break;

          case 'env':
            if (!S.env(rec)) break;
            pending.env.push(rec);
            break;

          case 'end':
            if (!S.end(rec)) break;
            pending.end = rec;
            break;

          default:
            ctx.notes.push('unknown record kind "' + rec.r + '" ignored');
        }
      } catch (e) {
        ctx.stats.dropped++;
        ctx.notes.push('record ' + ctx.stats.records + ' (' + rec.r + ') threw: ' + e.message);
      }
    }
    if (Source.truncated) ctx.notes.push('the stream was truncated mid-record; end matter was rendered implicitly');

    /* ── phase 5 · beat + env ────────────────────────────────────── */
    if (pending.beat) {
      let ok = false;
      if (ctx.kit && ctx.kit.beat) ok = ctx.kit.beat(pending.beat);
      if (!ok) ctx.notes.push('beat "' + pending.beat.type + '" dropped — no kit handles it; its scene shows its resolved state');
      else ctx.stats.beats = 1;
    }
    pending.env.forEach((e) => { if (ctx.env.register(e)) ctx.stats.envs++; });
    ctx.env.start();
    mark.beatEnv = performance.now() - t0;

    /* ── phase 6 · end matter (client, zero model tokens) ────────── */
    if (ctx.readingRoom) ctx.endmatter.build(ctx.readingRoom.scene, ctx.readingRoom.node, pending.end);
    else {
      /* the floor: no model, no key, or a call that failed. The reading
         room is built from the Content Model alone and is a real page. */
      const id = ctx.sequence.escapeTarget();
      let node = id && ctx.sequence.node(id);
      if (!node) {
        node = document.createElement('section');
        node.dataset.id = 'rr';
        ctx.sceneHost.appendChild(node);
        ctx.notes.push('no scene list arrived — the reading room carries the whole article');
      }
      ctx.endmatter.build({ id: id || 'rr', kind: 'reading-room', name: 'The reading room', claim: ctx.data.contentModel.title },
        node, pending.end);
    }

    /* budget breach folds, never deletes (§7.5) */
    const budget = KW.derive.surfaceBudget(ctx.data.contentModel, (ctx.meta && ctx.meta.budget && ctx.meta.budget.surface) || 0.4);
    /* the reading room is not surface — it IS the source, folded (§7.5) */
    let surfaced = 0;
    ctx.root.querySelectorAll('.kw-scene').forEach((n) => {
      if (n.classList.contains('kw-reading-room')) return;
      surfaced += KW.util.words(n.textContent).length;
    });
    ctx.stats.surfaceWords = surfaced;
    if (surfaced > budget.surfaceCeiling) ctx.notes.push('surface breach: ' + surfaced + ' words against a ceiling of ' + budget.surfaceCeiling + ' — the overflow is folded, not deleted');

    ctx.sequence.poke();
    mark.total = performance.now() - t0;
    root.__kw = ctx;
    return ctx;
  }

  function mountKit(ctx, list) {
    const id = ctx.meta && ctx.meta.kit;
    const make = id && KW.kits && KW.kits[id];
    if (!make) { if (id) ctx.notes.push('unknown kit "' + id + '" — every scene falls back to a chassis kind'); return; }
    const kit = make(ctx);
    ctx.kit = kit;
    if (kit.group) kit.group(list.map(([sid, kind, name, vh]) => ({ id: sid, kind, name, vh })));
  }

  /* ═══════════════ phase 1 · client derivation ═══════════════ */
  async function derive(ctx, opts) {
    const D = KW.derive;
    const cm = ctx.data.contentModel;

    /* imageCensus: file-verifiable, and it is what makes every figure
       reserve its true box before it decodes (C12). */
    const tc = performance.now();
    try {
      ctx.derived.census = await D.imageCensus(cm.images || [], ctx.assetBase);
    } catch (e) { ctx.notes.push('image census failed: ' + e.message); }
    ctx.timing.census = performance.now() - tc;   /* = image decode, reported separately */

    /* the ground is the substrate, not the picture (§6.5): a margin-band
       pass over one sheet, with its provenance string kept (§6.10). */
    const wanted = opts.sampleFrom;
    if (wanted) {
      const im = ctx.refs.resolve(wanted.ref);
      if (im) {
        try {
          const img = await loadImage(ctx.assetBase + im.items[0].local);
          const p = D.samplePalette(img, { ...wanted, file: im.items[0].local });
          ctx.derived.ground = p.hex;
          ctx.derived.provenance = p.provenance;
          D.cache['sample:' + wanted.args] = p.hex;
          D.cache['fibre:' + wanted.args] = D.fibreTile(img, wanted);
          ctx.derived.tile = D.cache['fibre:' + wanted.args];
        } catch (e) {
          /* a file:// origin taints the canvas, so the live sample is
             refused; the cached derivation digest stands in. */
          if (ctx.digestApplied !== true && KW.derive.digest) {
            const dg = KW.derive.digest;
            ctx.derived.ground = dg.ground;
            ctx.derived.provenance = dg.provenance + ' (cached digest — a file:// origin taints the canvas, so the live sample was refused)';
            ctx.derived.tile = dg.tile;
            D.cache['fibre:' + wanted.args] = dg.tile;
            D.cache['sample:' + wanted.args] = dg.ground;
            ctx.notes.push('palette and fibre read from the cached derivation digest: ' + e.name);
          } else ctx.notes.push('palette derivation unavailable: ' + e.message);
        }
      }
    }
    /* the dominant-colour plate every figure paints before it decodes */
    const c = ctx.derived.census;
    if (c && c.perImage) {
      const hexes = Object.values(c.perImage).map((x) => x.dominant).filter(Boolean);
      if (hexes.length) ctx.derived.plateFill = hexes[0];
    }
    if (!ctx.derived.plateFill) ctx.derived.plateFill = (KW.derive.digest && KW.derive.digest.plateFill) || '#CFC6B3';
    D.quoteRank((ctx.data.semantic || {}).quotes);
    KW.Materials.applyDerived(ctx, ctx.derived);
  }

  function loadImage(src) {
    return new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error('image did not load: ' + src));
      i.src = src;
    });
  }

  KW.Interpreter = { run, Source };
})(window);
