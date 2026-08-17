/* ══════════════════════════════════════════════════════════════════
   CHASSIS · core — util, colour, the ref grammar, materials, stage.

   Written once. Never emitted by a model. Everything here appears in
   ≥2 of the three shipped builds with the same contract and different
   parameters (EXPERIENCE_SPEC (a), C1–C15).

   Classic script, no modules: a file:// origin refuses ES imports.
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = (root.KW = root.KW || {});

  /* ─────────────────────────── util ─────────────────────────── */
  const el = (tag, cls, txt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  };
  const frag = () => document.createDocumentFragment();
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean);

  /* an ASCII-ish slug used for fuzzy joins between titles, alts and file names */
  const slug = (s) =>
    String(s || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  const STOP = new Set(('a an the of from and in on at by to for with his her its this that ' +
    'is was were are print painting series views view mount no vol volume book japanese hokusai ' +
    'katsushika google art project jpg png file image images ' +
    /* numeral words: "One Hundred Views" and "One Hundred Ghost Stories" share
       everything but the thing itself, and a title join that leans on them
       puts the wrong sheet on the plot. */
    'one two three four five six seven eight nine ten twelve thirty fifty hundred thousand ' +
    'first second third').split(' '));
  const tokens = (s) => slug(s).split(' ').filter((t) => t.length > 2 && !STOP.has(t));

  /* token overlap with prefix tolerance (fisherman/fishermans, bridge/bridges).
     Returns recall AND precision: recall alone lets a long caption swallow a
     short title, and one short shared word ("wave") is not evidence. */
  function overlapFull(a, b) {
    const A = tokens(a), B = new Set(tokens(b));
    let hit = 0, longest = 0;
    for (const t of A) {
      let m = null;
      if (B.has(t)) m = t;
      else for (const u of B) { if (u.length > 3 && (u.startsWith(t) || t.startsWith(u))) { m = u; break; } }
      if (m) { hit++; longest = Math.max(longest, Math.max(t.length, m.length)); }
    }
    const recall = A.length ? hit / A.length : 0;
    const precision = B.size ? hit / B.size : 0;
    const evidenced = hit >= 2 || (hit === 1 && longest >= 5);
    return { recall, precision, hit, evidenced, score: evidenced ? recall : 0 };
  }
  const overlap = (a, b) => overlapFull(a, b).score;

  /* ────────────────────────── colour ────────────────────────── */
  const hex2rgb = (h) => {
    const s = String(h).replace('#', '');
    const n = s.length === 3 ? s.split('').map((c) => c + c).join('') : s;
    return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
  };
  const rgb2hex = (r) => '#' + r.map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('').toUpperCase();
  const mix = (a, b, t) => {
    const A = hex2rgb(a), B = hex2rgb(b);
    return rgb2hex([0, 1, 2].map((i) => A[i] + (B[i] - A[i]) * t));
  };
  const lum = (h) => {
    const c = hex2rgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  /* (e) contrastFloor — never let a sampled palette ship an unreadable
     pairing; keep the sample and step it, exactly as scale.css:47 records. */
  function contrastFloor(ink, ground, min) {
    min = min || 4.5;
    const ratio = (a, b) => { const L = lum(a), M = lum(b); return (Math.max(L, M) + 0.05) / (Math.min(L, M) + 0.05); };
    let out = ink, r = ratio(ink, ground), steps = 0;
    const dark = lum(ground) > lum(ink);
    while (r < min && steps < 24) { out = mix(out, dark ? '#000000' : '#FFFFFF', 0.08); r = ratio(out, ground); steps++; }
    return { ratio: +ratio(ink, ground).toFixed(2), pass: ratio(ink, ground) >= min, nearestPassing: out, steps };
  }
  /* HSL, so a derived tint keeps the sample's HUE. Mixing a blue toward a
     warm paper in RGB greys it out; the print's pale indigo band is the
     same blue, lighter — that is what these two do. */
  function toHSL(hex) {
    const [r, g, b] = hex2rgb(hex).map((v) => v / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) {
      if (mx === r) h = ((g - b) / d) % 6;
      else if (mx === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60; if (h < 0) h += 360;
    }
    const l = (mx + mn) / 2;
    const sat = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
    return [h, sat, l];
  }
  function fromHSL(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x]; else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
    return rgb2hex([(r + m) * 255, (g + m) * 255, (b + m) * 255]);
  }
  /** tint(hex, toward, tl, ts) — move lightness toward another colour's,
      scale saturation, keep the hue. The bokashi band, one wipe at a time. */
  function tint(hex, toward, tl, ts) {
    const [h, s] = toHSL(hex), l = toHSL(hex)[2], lt = toHSL(toward)[2];
    return fromHSL(h, clamp(s * ts, 0, 1), clamp(l + (lt - l) * tl, 0, 1));
  }
  KW.color = { hex2rgb, rgb2hex, mix, lum, contrastFloor, toHSL, fromHSL, tint };
  KW.util = { el, frag, clamp, words, slug, tokens, overlap, overlapFull };

  /* ═══════════════════════ the ref grammar ═══════════════════════
     EXPERIENCE_SPEC (c). Any ref that does not resolve invalidates
     that record only — resolve() returns null and the caller counts. */
  function Refs(data) {
    const cm = data.contentModel, sem = data.semantic || {};
    const paras = {};
    (cm.sections || []).forEach((s) => (s.paragraphs || []).forEach((p) => (paras[p.id] = { ...p, section_id: s.section_id })));
    const order = Object.keys(paras).sort((a, b) => (+a.slice(1)) - (+b.slice(1)));

    function paraRange(a, b) {
      const lo = +a.slice(1), hi = +b.slice(1);
      return order.filter((id) => { const n = +id.slice(1); return n >= lo && n <= hi; }).map((id) => paras[id]);
    }

    const api = {
      data, paras, paraOrder: order,
      sections: cm.sections || [],
      images: cm.images || [],
      section: (id) => (cm.sections || []).find((s) => s.section_id === +id) || null,

      /* resolve → {kind, items:[]} | null */
      resolve(ref) {
        if (ref == null) return null;
        if (Array.isArray(ref)) {
          const out = [];
          const kinds = new Set();
          for (const r of ref) { const v = api.resolve(r); if (v) { out.push(...v.items); kinds.add(v.kind); } }
          if (!out.length) return null;
          return { kind: kinds.size === 1 ? [...kinds][0] : 'mixed', items: out };
        }
        const s = String(ref).trim();
        let m;
        if ((m = /^p(\d+)-p(\d+)$/.exec(s))) { const it = paraRange('p' + m[1], 'p' + m[2]); return it.length ? { kind: 'paragraph', items: it } : null; }
        if ((m = /^p(\d+)$/.exec(s))) return paras[s] ? { kind: 'paragraph', items: [paras[s]] } : null;
        if ((m = /^§(\d+)-§(\d+)$/.exec(s))) {
          const it = (cm.sections || []).filter((x) => x.section_id >= +m[1] && x.section_id <= +m[2]);
          return it.length ? { kind: 'section', items: it } : null;
        }
        if ((m = /^§(\d+)$/.exec(s))) { const x = api.section(m[1]); return x ? { kind: 'section', items: [x] } : null; }
        if ((m = /^q:(\d+)$/.exec(s))) { const x = (sem.quotes || [])[+m[1]]; return x ? { kind: 'quote', items: [x] } : null; }
        if ((m = /^qty:(\d+)$/.exec(s))) { const x = (sem.quantities || [])[+m[1]]; return x ? { kind: 'quantity', items: [x] } : null; }
        if ((m = /^w:(.+)$/.exec(s))) return api.works(m[1]);
        if ((m = /^names:(.+)$/.exec(s))) return api.names(m[1]);
        if ((m = /^c:(.+)$/.exec(s))) return api.chronology(m[1]);
        if ((m = /^img:(\d+)$/.exec(s))) { const x = api.images[+m[1]]; return x ? { kind: 'image', items: [x] } : null; }
        if ((m = /^ib:(.+)$/.exec(s))) {
          const x = (cm.infobox || []).find((r) => r.label.toLowerCase() === m[1].toLowerCase());
          return x ? { kind: 'infobox', items: [x] } : null;
        }
        if ((m = /^derive:([a-zA-Z]+)\((.*)\)$/.exec(s))) {
          const fn = KW.derive && KW.derive[m[1]];
          if (typeof fn !== 'function') return null;
          try { const out = fn.call(KW.derive, m[2], api); return out == null ? null : { kind: 'derived', fn: m[1], items: Array.isArray(out) ? out : [out] }; }
          catch (e) { return null; }
        }
        return null;
      },

      works(sel) {
        const all = KW.derive.plotItems(api);
        if (sel === '*') return all.dated.length ? { kind: 'work', items: all.dated } : null;
        if (sel === 'undated') return all.undated.length ? { kind: 'work', items: all.undated } : null;
        if (/^\d+$/.test(sel)) { const x = all.dated[+sel]; return x ? { kind: 'work', items: [x] } : null; }
        return null;
      },
      names(sel) {
        const ns = KW.derive.namesWithYears(api);
        if (sel === '*') return ns.length ? { kind: 'name', items: ns } : null;
        if (sel === 'dated') { const d = ns.filter((n) => n.year); return d.length ? { kind: 'name', items: d } : null; }
        return null;
      },
      chronology(sel) {
        const c = sem.chronology || [];
        let m;
        if (sel === '*') return c.length ? { kind: 'event', items: c } : null;
        if ((m = /^(\d+)-(\d+)$/.exec(sel))) { const it = c.slice(+m[1], +m[2]); return it.length ? { kind: 'event', items: it } : null; }
        if (sel === 'posthumous') { const it = c.filter((e) => (+String(e.t).slice(0, 4)) > 1849); return it.length ? { kind: 'event', items: it } : null; }
        return null;
      },

      /* how many of a scene's refs resolve — the fallback table needs the ratio */
      score(list) {
        if (!list || !list.length) return 1;
        let ok = 0;
        list.forEach((r) => { if (api.resolve(r)) ok++; });
        return ok / list.length;
      },
      text: (ref) => { const v = api.resolve(ref); return v && v.items[0] ? (v.items[0].text || v.items[0].title || '') : ''; },
    };
    return api;
  }
  KW.Refs = Refs;

  /* ═══════════════════ materials (spec → CSS vars) ═══════════════════
     EXPERIENCE_SPEC (b2). The spec supplies SLOTS; every shade between
     them is chassis arithmetic, so the model never emits a ramp. */
  const FACES = {
    'Newsreader': {
      stack: "'Iowan Old Style',Georgia,serif",
      files: [
        ['newsreader-latin-400-normal.woff2', 400, 'normal'],
        ['newsreader-latin-400-italic.woff2', 400, 'italic'],
        ['newsreader-latin-500-normal.woff2', 500, 'normal'],
        ['newsreader-latin-600-normal.woff2', 600, 'normal'],
      ],
    },
    'Zen Kaku Gothic New': {
      stack: "'Hiragino Sans','Noto Sans JP',system-ui,sans-serif",
      files: [
        ['zen-kaku-gothic-new-latin-400-normal.woff2', 400, 'normal'],
        ['zen-kaku-gothic-new-latin-500-normal.woff2', 500, 'normal'],
        ['zen-kaku-gothic-new-latin-700-normal.woff2', 700, 'normal'],
      ],
    },
  };

  const Materials = {
    FACES,
    /* client-derived floor: applied at phase 1, before the model answers */
    applyDerived(ctx, d) {
      const s = ctx.root.style;
      if (d.ground) s.setProperty('--ground', d.ground);
      if (d.ink) s.setProperty('--ink', d.ink);
      if (d.tile) s.setProperty('--texture', 'url(' + d.tile + ')');
      ctx.root.dataset.materials = 'derived';
    },

    apply(ctx, rec) {
      const s = ctx.root.style, notes = ctx.notes;
      const g = rec.ground || [];
      const g0 = (g[0] && g[0].hex) || ctx.derived.ground || '#EFEFEF';
      const g1 = (g[1] && g[1].hex) || '#111111';
      const ink = (rec.ink && rec.ink.body) || '#111111';
      const quiet0 = (rec.ink && rec.ink.quiet) || mix(ink, g0, 0.5);
      const onDark = (rec.ink && rec.ink.on_dark) || g0;

      /* §2 contrast floors — the sample is kept and stepped, never swapped */
      const qf = contrastFloor(quiet0, g0, 4.5);
      if (!qf.pass) notes.push('quiet ink ' + quiet0 + ' read ' + qf.ratio + ':1 on the ground; darkened ' + qf.steps + ' steps to ' + qf.nearestPassing);
      const quiet = qf.nearestPassing;

      const acc = {};
      (rec.accent || []).forEach((a) => { acc[a.use || 'text'] = a; });
      const aText = (acc.text && acc.text.hex) || ink;
      const aStamp = (acc.stamp && acc.stamp.hex) || aText;

      const set = (k, v) => s.setProperty(k, v);
      set('--ground', g0);
      set('--ground-2', mix(g0, ink, 0.055));          /* the same sheet, one impression deeper */
      set('--ground-dark', g1);
      set('--ink', ink);
      set('--ink-quiet', quiet);
      set('--ink-on-dark', onDark);
      set('--on-dark-quiet', mix(onDark, g1, 0.42));
      set('--on-dark-key', mix(onDark, g1, 0.78));     /* a key line seen against black: the uninked shoulder */
      /* derived in HSL so the accent stays the same INK, lighter — a
         bokashi wipe thins the pigment, it does not mix in the paper. */
      const T = KW.color.tint;
      set('--accent', aText);
      set('--accent-mid', T(aText, g0, 0.50, 0.30));
      set('--accent-pale', T(aText, g0, 0.86, 0.35));
      set('--accent-lit', T(aText, g0, 0.79, 0.64));
      set('--accent-wash', mix(aText, g1, 0.42));
      set('--bokashi-1', T(aText, g0, 0.93, 0.28));    /* the hand-wiped band, step 1 */
      set('--bokashi-2', T(aText, g0, 0.90, 0.30));    /* step 2 — banded, hard-stopped */
      set('--stamp', aStamp);

      const t = rec.type || {};
      const nf = (t.narration && t.narration.family) || 'Georgia';
      const af = (t.apparatus && t.apparatus.family) || 'system-ui';
      Materials.face(ctx, nf); Materials.face(ctx, af);
      set('--face-narration', "'" + nf + "'," + ((FACES[nf] && FACES[nf].stack) || 'serif'));
      set('--face-apparatus', "'" + af + "'," + ((FACES[af] && FACES[af].stack) || 'sans-serif'));

      /* §2.3/§2.5 — the model emits 7 numbers, the chassis fixes the rest */
      const sc = KW.derive.typeScale(t.scale, t.body || 20, t.lead || 1.5);
      sc.sizes.forEach((v, i) => set('--t' + i, v + 'px'));
      set('--t-body', (t.body || 20) + 'px');
      set('--lead', String(t.lead || 1.5));
      if (!sc.displayRatioOK) notes.push('display:body ratio ' + sc.displayRatio.toFixed(1) + 'x is under the 6x floor (§2.2)');

      const r = rec.rule || {};
      set('--rule-major', (r.major || 1.75) + 'px');
      set('--rule-minor', (r.minor || 1) + 'px');

      const me = rec.measure || {};
      set('--argument', (me.argument || 660) + 'px');
      set('--evidence', (me.evidence || 1040) + 'px');

      const mo = rec.motion || {};
      set('--ease', mo.easing || 'cubic-bezier(.2,.7,.2,1)');
      const du = mo.dur || {};
      set('--dur-ack', (du.ack || 160) + 'ms');
      set('--dur-morph', (du.morph || 320) + 'ms');
      set('--dur-absorb', (du.absorb || 900) + 'ms');

      const tex = rec.texture || {};
      const tile = tex.tile ? (ctx.refs.resolve(tex.tile) || {}).items : null;
      const url = (tile && tile[0]) || ctx.derived.tile;
      if (url) { set('--texture', 'url(' + url + ')'); set('--texture-blend', tex.blend || 'soft-light'); }
      else set('--texture-blend', 'normal');

      ctx.materials = rec;
      ctx.root.dataset.materials = 'spec';
    },

    face(ctx, family) {
      const f = FACES[family];
      if (!f || ctx.facesLoaded[family]) return;
      ctx.facesLoaded[family] = true;
      const css = f.files.map(([file, w, style]) =>
        `@font-face{font-family:'${family}';src:url(${ctx.fontBase + file}) format('woff2');` +
        `font-weight:${w};font-style:${style};font-display:swap}`).join('');
      const st = document.createElement('style');
      st.textContent = css;
      document.head.appendChild(st);
    },
  };
  KW.Materials = Materials;

  /* ═══════════════════════ phase 0 · the stage ═══════════════════════
     Instant typographic takeover. Nothing here waits on the model:
     it is the floor the fallback table falls back to. */
  const Stage = {
    build(ctx) {
      const root = ctx.root;
      root.classList.add('kw');
      root.innerHTML = '';
      const scenes = el('div', 'kw-scenes');
      root.appendChild(scenes);
      ctx.sceneHost = scenes;

      const chrome = el('div', 'kw-chrome');
      chrome.innerHTML =
        '<button type="button" class="kw-pause" aria-pressed="false">Motion<span class="kw-lbl"> — running</span></button>' +
        '<nav class="kw-index" aria-label="Movements"></nav>';
      root.appendChild(chrome);
      ctx.chrome = chrome;

      const insp = el('div', 'kw-insp');
      insp.setAttribute('role', 'dialog');
      insp.setAttribute('aria-modal', 'true');
      insp.innerHTML = '<div class="kw-scrim"></div><div class="kw-box">' +
        '<button type="button" class="kw-close">Close · esc</button>' +
        '<div class="kw-fig"></div><div class="kw-meta"></div></div>';
      root.appendChild(insp);
      ctx.inspector = insp;

      /* the skeleton: the source's own title and lede, typeset, before
         any record has landed (C12 — first paint is a composition). */
      const sk = el('section', 'kw-scene kw-skel');
      sk.dataset.kind = 'overture';
      const cm = ctx.data.contentModel;
      sk.innerHTML =
        '<div class="kw-o-top"><span class="kw-cat kw-census"></span></div>' +
        '<div class="kw-o-body"><h1 class="kw-o-big"></h1><p class="kw-o-gloss"></p></div>';
      sk.querySelector('.kw-o-big').textContent = cm.title || document.title;
      sk.querySelector('.kw-o-gloss').textContent = (cm.description || cm.extract || '').slice(0, 400);
      sk.querySelector('.kw-census').textContent = Stage.census(ctx);
      scenes.appendChild(sk);
      ctx.skeleton = sk;
    },

    /* C11 — source-link footer with revision + census, from the Content Model */
    census(ctx) {
      const cm = ctx.data.contentModel;
      const host = (cm.sourceUrl || '').replace(/^https?:\/\//, '').split('/')[0];
      const n = (cm.sections || []).length;
      return [cm.title, host ? host.replace('en.wikipedia.org', 'English Wikipedia') : null,
        cm.revision ? 'revision ' + cm.revision : null,
        (cm.images || []).length + ' images'].filter(Boolean).join(' · ');
    },

    drop(ctx) { if (ctx.skeleton && ctx.skeleton.parentNode) { ctx.skeleton.remove(); ctx.skeleton = null; } },
  };
  KW.Stage = Stage;
})(window);
