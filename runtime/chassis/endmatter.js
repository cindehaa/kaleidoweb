/* ══════════════════════════════════════════════════════════════════
   CHASSIS · endmatter (phase 6)
     C10 reading key + DESIGN_RATIONALE + full text + concordance
     C11 source-link footer with revision + census
     C4  every subordinated passage stays find-in-page reachable

   Built ENTIRELY from the Content Model. The spec contributes exactly
   two things: the fold labels and the rationale rows. Everything else
   — the paragraphs, the section order, the figures, the names table,
   the withheld-scene log, the source line — costs zero model tokens.
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = root.KW, U = KW.util, el = U.el;

  function Endmatter(ctx) {
    const P = KW.Prose;

    function build(scene, n, endRec) {
      const cm = ctx.data.contentModel;
      n.className = 'kw-scene kw-reading-room';
      n.innerHTML = '';

      const top = el('div', 'kw-rr-top');
      const mv = el('div', 'kw-mv');
      mv.innerHTML = '<b>' + ctx.scenesApi.idxOf(scene.id) + '</b>';
      mv.appendChild(el('span', 'kw-cat', scene.name || 'The reading room'));
      top.appendChild(mv);
      top.appendChild(el('span', 'kw-cat', scene.note || 'Folded passages open on find-in-page.'));
      n.appendChild(top);

      const head = el('div', 'kw-rr-head');
      head.appendChild(el('h2', null, scene.claim || cm.title));
      head.appendChild(el('p', 'kw-cat', [cm.description, 'English Wikipedia, revision ' + cm.revision,
        'Titles link back to the plot.'].filter(Boolean).join(' · ')));
      n.appendChild(head);

      const rr = el('div', 'kw-rr');
      n.appendChild(rr);

      /* which paragraph runs the spec subordinates, and where each fold
         is allowed to appear (at the position of its first paragraph) */
      /* (e) foldGroups: the model supplies only the human label. If no
         fold record arrived at all — no model, or a truncated stream —
         the chassis folds each section's run and prints its range, so
         the failure floor is still a read page and not a wall. */
      const declared = scene.folds && scene.folds.length ? scene.folds : mechanicalFolds(cm);
      const groups = KW.derive.foldGroups(declared, ctx.refs);
      const folded = {};
      const anchor = {};
      groups.forEach((g, gi) => {
        if (g.kind !== 'paragraph') return;
        g.items.forEach((p, i) => { folded[p.id] = gi; if (i === 0) anchor[p.id] = gi; });
      });
      const sectionFolds = {};
      groups.forEach((g, gi) => { if (g.kind === 'section') g.items.forEach((s) => (sectionFolds[s.section_id] = gi)); });

      const imgsBySection = {};
      (cm.images || []).forEach((im) => {
        if (im.gallery || !im.local || im.lead) return;
        (imgsBySection[im.section_id] = imgsBySection[im.section_id] || []).push(im);
      });

      (cm.sections || []).forEach((sec) => {
        if (sec.title && sec.title !== '__lead__') {
          rr.appendChild(el('h3', null, sec.title));
        }
        if (sectionFolds[sec.section_id] != null) {
          const g = groups[sectionFolds[sec.section_id]];
          rr.appendChild(P.fold(g.label + ' — ' + galleryCount(), (body) => body.appendChild(galleryList())));
          return;
        }
        const imgs = (imgsBySection[sec.section_id] || []).slice();
        /* the first figure of a section stands OUTSIDE the fold: the
           evidence is not what was subordinated, the prose is (§7.5). */
        if (imgs.length && (sec.paragraphs || []).length) rr.appendChild(ctx.evidence.figure(imgs.shift()));
        (sec.paragraphs || []).forEach((p) => {
          if (anchor[p.id] != null) {
            const g = groups[anchor[p.id]];
            rr.appendChild(P.fold(g.label + (g.range ? ' · ' + g.range : ''), (body) => {
              g.items.forEach((q) => {
                body.appendChild(para(q));
                if (imgs.length) body.appendChild(ctx.evidence.figure(imgs.shift()));
              });
            }));
            return;
          }
          if (folded[p.id] != null) return;
          rr.appendChild(para(p));
          if (/colophon to this work/i.test(p.text)) rr.appendChild(colophon());
          if (imgs.length) rr.appendChild(ctx.evidence.figure(imgs.shift()));
        });
        if ((sec.paragraphs || []).length === 0 && sec.title !== '__lead__' && sectionFolds[sec.section_id] == null) {
          const d = el('p', 'kw-cat kw-absent');
          d.textContent = 'This section carries no prose in the Content Model — ' +
            (/reference|reading|link|biograph|monograph|print/i.test(sec.title) ? 'its list was not extracted.' : 'nothing to show.');
          rr.appendChild(d);
        }
      });

      /* the concordance the plot needs: the name spine, with what each marked */
      rr.appendChild(el('h3', null, 'The eight names this article documents'));
      const p4 = ctx.refs.resolve('p4');
      if (p4) rr.appendChild(el('p', 'kw-cat', 'p4: “' + p4.items[0].text.split('. ').slice(-1)[0] + '”'));
      rr.appendChild(P.fold('The eight, with what each one marked', (body) => body.appendChild(namesTable())));

      /* DESIGN_RATIONALE — self-description demoted to end matter (D011/§5.9) */
      rr.appendChild(rationale(endRec));
      linkBack(rr, scene);
      return n;
    }

    function mechanicalFolds(cm) {
      const out = [];
      (cm.sections || []).forEach((sec) => {
        const ps = sec.paragraphs || [];
        if (ps.length < 2) return;
        out.push({ label: null, refs: [ps[0].id + '-' + ps[ps.length - 1].id] });
      });
      return out;
    }

    function para(p) {
      const n = el('p', 'kw-p');
      n.id = 'kw-' + p.id;
      n.dataset.pid = p.id;
      n.textContent = p.text;
      return n;
    }

    function colophon() {
      const q = ctx.refs.resolve('q:1');
      const b = el('blockquote', 'kw-colo');
      if (!q) return b;
      b.textContent = q.items[0].text;
      b.appendChild(el('cite', 'kw-cat', (q.items[0].context || '') + ' · p18.'));
      return b;
    }

    function galleryImages() { return (ctx.data.contentModel.images || []).filter((i) => i.gallery && i.local); }
    function galleryCount() {
      /* "undated" means the derivation could not place it — not merely
         that its own label carries no year (a series date can fix it). */
      const g = galleryImages();
      const un = new Set(KW.derive.plotItems(ctx.refs).undated.map((u) => u.image && u.image.idx));
      const n = g.filter((im) => un.has(im.idx)).length;
      return g.length + ' works, ' + n + ' of them still undated';
    }
    function galleryList() {
      const ol = el('ol', 'kw-sel');
      galleryImages().forEach((im, i) => {
        const li = el('li');
        li.appendChild(el('span', 'kw-num', String(i + 1).padStart(2, '0')));
        const a = el('a', 'kw-st kw-toplot', im.alt || im.local);
        a.href = '#';
        a.dataset.img = String(im.idx);
        li.appendChild(a);
        ol.appendChild(li);
      });
      return ol;
    }

    function namesTable() {
      const ns = KW.derive.namesWithYears(ctx.refs);
      const ul = el('ul', 'kw-names-tbl');
      ns.forEach((n) => {
        const li = el('li');
        li.appendChild(el('span', 'kw-nm', (n.kanji ? n.kanji + ' ' : '') + n.name));
        li.appendChild(el('span', 'kw-mn', n.meaning));
        li.appendChild(el('span', 'kw-ag kw-cat', (n.year ? 'age ' + n.age : '—') + ' · ' + n.src));
        ul.appendChild(li);
      });
      const q = (ctx.data.semantic.quantities || []).find((x) => /names|pseudonym/i.test(x.meaning));
      if (q) {
        const li = el('li');
        li.appendChild(el('span', 'kw-nm kw-blank', 'and at least ' + (parseInt(q.value, 10) - ns.length) + ' more'));
        li.appendChild(el('span', 'kw-mn kw-blank', 'not documented in this article'));
        li.appendChild(el('span', 'kw-ag kw-cat', q.src));
        ul.appendChild(li);
      }
      return ul;
    }

    function rationale(endRec) {
      const wrap = el('div', 'kw-endmatter');
      wrap.appendChild(el('h3', null, 'The page’s own hand'));
      wrap.appendChild(P.fold('Where the colours, the faces and the arithmetic came from', (body) => {
        const dl = el('dl');
        const row = (k, v, html) => {
          dl.appendChild(el('dt', null, k));
          const dd = el('dd');
          if (html) dd.innerHTML = v; else dd.textContent = v;
          dl.appendChild(dd);
        };
        ((endRec && endRec.endmatter && endRec.endmatter.rationale) || []).forEach(([k, v]) => row(k, v));

        /* the provenance the chassis measured itself, not the model */
        const d = ctx.derived;
        if (d.provenance) row('Ground, measured', d.provenance);
        if (d.census) {
          const fam = Object.entries(d.census.families).map(([k, v]) => v + ' ' + k).join(', ');
          row('Image census', d.census.n + ' files decoded at true aspect: ' + fam + '. Every figure reserves its own box before it loads.');
        }
        const b = KW.derive.surfaceBudget(ctx.data.contentModel, (ctx.meta && ctx.meta.budget && ctx.meta.budget.surface) || 0.4);
        row('Surface budget', 'Source body prose ' + b.sourceBodyWords + ' words; the ceiling for this page is ' +
          b.surfaceCeiling + '. Everything over it is folded, never deleted (§7.5).');
        if (ctx.notes.length) row('What the interpreter withheld or repaired', ctx.notes.join(' · '));
        const cm = ctx.data.contentModel;
        row('Source', '<a class="kw-ext" href="' + cm.sourceUrl + '">' + cm.sourceUrl + '</a> — revision ' +
          cm.revision + '. Every fact here comes from that article and nothing else.', true);
        row('Spec', ctx.stats.records + ' NDJSON records, ' + ctx.stats.bytes + ' characters ≈ ' +
          Math.round(ctx.stats.bytes / 3.5) + ' tokens. ' + ctx.stats.scenes + ' scenes, ' +
          ctx.stats.beats + ' beat, ' + ctx.stats.envs + ' environment moments.', false);
        body.appendChild(dl);
      }));
      return wrap;
    }

    /* C5 — every named work in the prose opens its point on the plot */
    function linkBack(rr, scene) {
      const lb = scene['link-back'];
      if (!lb) return;
      const items = KW.derive.plotItems(ctx.refs);
      const all = items.dated.concat(items.undated)
        .filter((w) => (w.title || '').length > 8)
        .sort((a, b) => b.title.length - a.title.length);
      const used = new Set();
      rr.querySelectorAll('p.kw-p').forEach((p) => {
        const text = p.textContent;
        const hits = [];
        all.forEach((w) => {
          if (used.has(w.title)) return;
          const i = text.indexOf(w.title);
          if (i < 0) return;
          const end = i + w.title.length;
          if (hits.some((h) => i < h.end && end > h.start)) return;
          hits.push({ start: i, end: end, w: w });
          used.add(w.title);
        });
        if (!hits.length) return;
        hits.sort((a, b) => a.start - b.start);
        const f = U.frag();
        let pos = 0;
        hits.forEach((h) => {
          if (h.start > pos) f.appendChild(document.createTextNode(text.slice(pos, h.start)));
          const a = el('a', 'kw-st kw-toplot', text.slice(h.start, h.end));
          a.href = '#';
          a.dataset.work = h.w.id || '';
          f.appendChild(a);
          pos = h.end;
        });
        if (pos < text.length) f.appendChild(document.createTextNode(text.slice(pos)));
        p.textContent = '';
        p.appendChild(f);
      });
      rr.addEventListener('click', (e) => {
        const a = e.target.closest && e.target.closest('a.kw-toplot');
        if (!a) return;
        e.preventDefault();
        const items2 = KW.derive.plotItems(ctx.refs);
        let w = items2.dated.concat(items2.undated).find((x) => x.id === a.dataset.work);
        if (!w && a.dataset.img) w = items2.dated.concat(items2.undated).find((x) => x.image && String(x.image.idx) === a.dataset.img);
        if (!w && a.dataset.img) {
          const im = ctx.refs.images[+a.dataset.img];
          if (im) w = { title: im.alt || im.local, image: im, why: 'in the article’s gallery' };
        }
        if (w && ctx.kit && ctx.kit.inspect) ctx.kit.inspect(w);
        else if (w) ctx.evidence.open(w, [['Source', (w.src || '') + ' — ' + ctx.data.contentModel.title]]);
      });
    }

    return { build };
  }
  KW.Endmatter = Endmatter;
})(window);
