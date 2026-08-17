/* ══════════════════════════════════════════════════════════════════
   CHASSIS · generic scene kinds.

   Every kind the interpreter knows how to draw WITHOUT a kit. An
   unknown kind degrades to `column` by table (EXPERIENCE_SPEC (f)),
   which is why a truncated or hostile spec still reads.
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = root.KW, U = KW.util, el = U.el;

  const KINDS = ['overture', 'plate', 'column', 'plot', 'plot-state', 'score', 'station',
    'gallery', 'table', 'map', 'coda', 'reading-room'];

  function Scenes(ctx) {
    const P = KW.Prose;

    function envHost(scene) {
      const d = el('div', 'kw-env');
      d.setAttribute('aria-hidden', 'true');
      d.dataset.scene = scene.id;
      return d;
    }

    /* ── overture · full-bleed, near-empty, ceremonial ──────────────
       The largest type on the page is a quotation, not a headline
       (§2.10). The census and the entry line are chassis, not spec. */
    function overture(scene, n) {
      n.className = 'kw-scene kw-overture';
      n.innerHTML = '';
      n.appendChild(envHost(scene));

      if (scene.aside) n.appendChild(aside(scene.aside));

      const top = el('div', 'kw-o-top');
      top.appendChild(el('span', 'kw-cat', KW.Stage.census(ctx)));
      const right = el('span', 'kw-cat');
      const mins = (ctx.meta && ctx.meta.entry && ctx.meta.entry.minutes) || null;
      const esc = ctx.sequence.escapeTarget();
      right.innerHTML = (mins ? '~' + mins + ' min &nbsp;·&nbsp; ' : '') +
        (esc ? '<a class="kw-st" href="#kw-' + esc + '">skip to the article</a>' : '');
      top.appendChild(right);
      n.appendChild(top);

      const body = el('div', 'kw-o-body');
      if (scene.note) {
        const src = (scene.refs || []).filter((r) => /^p\d+$/.test(r))[0];
        const a = el('p', 'kw-attrib kw-cat');
        a.innerHTML = P.inline(scene.note) + (src ? ' · ' + src : '');
        body.appendChild(a);
      }
      if (scene.pre) body.appendChild(el('p', 'kw-o-pre', scene.pre));
      const h = el('h1', 'kw-o-big');
      h.innerHTML = P.inline(scene.claim);
      body.appendChild(h);
      if (scene.lede) { const g = el('p', 'kw-o-gloss'); g.innerHTML = P.inline(scene.lede); body.appendChild(g); }
      n.appendChild(body);

      const foot = el('div', 'kw-o-foot');
      foot.appendChild(el('span', 'kw-cat', scene.foot || ''));
      n.appendChild(foot);
    }

    /* the signature column: his names down the right edge of the sheet,
       right to left, with the seal beneath the last of them. */
    function aside(a) {
      const res = ctx.refs.resolve(a.items);
      const node = el('aside', 'kw-aside');
      node.dataset.kind = a.kind || 'list';
      if (a.label) node.setAttribute('aria-label', a.label);
      if (!res) { node.dataset.kind = 'list'; return node; }
      res.items.forEach((it, i) => {
        const d = el('div', 'kw-sn');
        if (it.kanji) { const k = el('span', 'kw-ja', it.kanji); k.lang = 'ja'; d.appendChild(k); d.append(' '); }
        d.append(document.createTextNode(it.name || it.title || ''));
        if (it.at) d.appendChild(el('span', 'kw-yr', it.at));
        if (/katsushika hokusai/i.test(it.name || '') || (res.items.length > 4 && i === 4)) d.classList.add('kw-now');
        node.appendChild(d);
      });
      if (a.tail) {
        const t = el('div', 'kw-sn kw-unknown');
        t.append(document.createTextNode(a.tail));
        if (a.ref) t.appendChild(el('span', 'kw-yr', a.ref));
        node.appendChild(t);
      }
      const sb = el('div', 'kw-sealbox');
      sb.innerHTML = '<span class="kw-seal kw-big" aria-hidden="true"></span>';
      node.appendChild(sb);
      return node;
    }

    /* ── column · argument width, prose + folds. The fallback kind. ── */
    function column(scene, n) {
      n.className = 'kw-scene kw-column';
      n.innerHTML = '';
      const head = el('div', 'kw-mv');
      head.innerHTML = '<b>' + idxOf(scene.id) + '</b>';
      head.appendChild(el('span', 'kw-cat', scene.name || ''));
      n.appendChild(head);
      if (scene.claim) n.appendChild(P.claim(scene.claim));
      if (scene.lede) n.appendChild(P.lede(scene.lede));
      if (scene.note) n.appendChild(P.note(scene.note));

      const res = scene.items ? ctx.refs.resolve(scene.items) : (scene.refs ? ctx.refs.resolve(scene.refs) : null);
      if (res && res.kind === 'paragraph') {
        const wrap = el('div', 'kw-body');
        P.paragraphs(res.items, wrap);
        n.appendChild(wrap);
      } else if (res) {
        const ul = el('ul', 'kw-items');
        res.items.forEach((it) => {
          const li = el('li');
          li.appendChild(el('span', 'kw-it-t', it.title || it.name || it.label || it.text || ''));
          if (it.date || it.t) li.appendChild(el('span', 'kw-cat', it.date || it.t));
          ul.appendChild(li);
        });
        n.appendChild(ul);
      }
      if (scene.folds) folds(scene, n);
    }

    /* ── plate · full-bleed, near-empty, ceremonial ── */
    function plateScene(scene, n) {
      n.className = 'kw-scene kw-plate-scene';
      n.innerHTML = '';
      n.appendChild(envHost(scene));
      const b = el('div', 'kw-plate-body');
      if (scene.claim) b.appendChild(P.claim(scene.claim, 'h2'));
      if (scene.lede) b.appendChild(P.lede(scene.lede));
      if (scene.note) b.appendChild(P.note(scene.note));
      n.appendChild(b);
    }

    /* ── gallery · items at true proportion ── */
    function gallery(scene, n) {
      n.className = 'kw-scene kw-gallery';
      n.innerHTML = '';
      if (scene.claim) n.appendChild(P.claim(scene.claim));
      const res = ctx.refs.resolve(scene.items || scene.refs);
      const g = el('div', 'kw-grid');
      if (res) res.items.forEach((it) => { if (it.image) g.appendChild(ctx.evidence.plate(it.image, { h: 150 })); });
      n.appendChild(g);
    }

    function folds(scene, n) {
      const groups = KW.derive.foldGroups(scene.folds, ctx.refs);
      groups.forEach((f) => {
        n.appendChild(P.fold(f.label + (f.range ? ' · ' + f.range : ''), (body) => {
          if (f.kind === 'paragraph') P.paragraphs(f.items, body);
          else f.items.forEach((it) => body.appendChild(el('p', 'kw-p', it.title || it.text || '')));
        }));
      });
    }

    function idxOf(id) {
      const i = ctx.sequence.state.list.findIndex((s) => s.id === id);
      return i < 0 ? '—' : String(i).padStart(2, '0');
    }

    return {
      KINDS,
      normalise(kind) { return KINDS.indexOf(kind) > -1 ? kind : 'column'; },
      render(scene, n) {
        switch (scene.kind) {
          case 'overture': return overture(scene, n);
          case 'plate': return plateScene(scene, n);
          case 'gallery': return gallery(scene, n);
          default: return column(scene, n);
        }
      },
      overture, column, gallery, folds, aside, envHost, idxOf,
    };
  }
  KW.Scenes = Scenes;
})(window);
