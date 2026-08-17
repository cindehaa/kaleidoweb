/* ══════════════════════════════════════════════════════════════════
   CHASSIS · evidence
     C5  provenance anchors + ONE inspector (never a column of tokens)
     C12 deterministic first paint: every figure is reserved at its true
         aspect and filled with its own dominant colour until the file
         decodes, so nothing shifts (§4.10)
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = root.KW, U = KW.util, el = U.el;

  function Evidence(ctx) {
    const census = () => (ctx.derived.census && ctx.derived.census.perImage) || {};

    /** aspect(image) -> w/h, from the census, then the source's own
        data-file dimensions, then a neutral sheet ratio. */
    function aspect(im) {
      const c = census()[im.idx];
      if (c && c.ratio) return c.ratio;
      if (im.w && im.h) return im.w / im.h;
      return 1.4;
    }
    function dominant(im) {
      const c = census()[im.idx];
      return (c && c.dominant) || ctx.derived.plateFill || 'var(--ground-2)';
    }

    /** plate(image, {w|h}) -> element that occupies its true box now and
        drops the fill on load. Zero layout shift, no spinner. */
    function plate(im, box, cls) {
      const r = aspect(im);
      const w = box.w != null ? box.w : box.h * r;
      const h = box.h != null ? box.h : box.w / r;
      const n = el('span', 'kw-plate' + (cls ? ' ' + cls : ''));
      n.style.width = w + 'px';
      n.style.height = h + 'px';
      const fill = el('span', 'kw-plate-fill');
      fill.style.background = dominant(im);
      const img = new Image();
      img.src = ctx.assetBase + im.local;
      img.alt = im.alt || im.caption || '';
      img.decoding = 'async';
      img.loading = 'lazy';
      img.addEventListener('load', () => fill.remove());
      n.append(fill, img);
      return n;
    }

    /** figure(image, caption) — §3.10 refuses a caption that only describes */
    function figure(im, caption) {
      const f = el('figure', 'kw-figure');
      const img = new Image();
      img.src = ctx.assetBase + im.local;
      img.alt = im.alt || caption || '';
      img.loading = 'lazy';
      img.style.aspectRatio = String(aspect(im));
      f.appendChild(img);
      const cap = caption || im.caption || im.alt;
      if (cap) { const c = el('figcaption', 'kw-cat', cap); f.appendChild(c); }
      return f;
    }

    /* ─────────────────── the one inspector (C5) ───────────────────
       Every derived number prints its working here, not on the plot:
       chips on the surface out-shouted the works themselves. */
    let lastFocus = null;
    const box = ctx.inspector;
    const figHost = box.querySelector('.kw-fig');
    const metaHost = box.querySelector('.kw-meta');

    function open(item, fields) {
      if (ctx.root.dataset.inspectorOff === '1') return;
      lastFocus = document.activeElement;
      figHost.innerHTML = ''; metaHost.innerHTML = '';
      if (item.image) {
        const img = new Image();
        img.src = ctx.assetBase + item.image.local;
        img.alt = item.title || '';
        figHost.appendChild(img);
      } else {
        const d = el('div', 'kw-noimg');
        d.appendChild(el('span', 'kw-cat', 'No image of this work in the article'));
        figHost.appendChild(d);
      }
      metaHost.appendChild(el('h3', null, item.title || ''));
      if (item.note) metaHost.appendChild(el('p', null, item.note));
      const dl = el('dl');
      (fields || []).forEach(([k, v]) => {
        if (v == null || v === '') return;
        dl.appendChild(el('dt', null, k));
        dl.appendChild(el('dd', null, v));
      });
      metaHost.appendChild(dl);
      const back = el('a', 'kw-src');
      const rr = ctx.sequence && ctx.sequence.escapeTarget();
      back.href = rr ? '#kw-' + rr : '#';
      back.textContent = 'read the passage →';
      back.addEventListener('click', close);
      metaHost.appendChild(back);
      box.classList.add('on');
      box.querySelector('.kw-close').focus();
    }
    function close() { box.classList.remove('on'); if (lastFocus) lastFocus.focus(); }

    box.querySelector('.kw-close').addEventListener('click', close);
    box.querySelector('.kw-scrim').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && box.classList.contains('on')) close(); });

    return { plate, figure, aspect, dominant, open, close, isOpen: () => box.classList.contains('on') };
  }
  KW.Evidence = Evidence;
})(window);
