/* ══════════════════════════════════════════════════════════════════
   KIT · quotation-axis-plot   (proven: experiences/hokusai)

   Provides — a fixed, non-scrolling plate; a y-axis whose registers are
   VERBATIM SOURCE TEXT; an x-axis of a derived quantity with its
   uncertainty stated inside the plot; items packed at true file aspect
   into register rows; a verdict wash; a range/point toggle;
   register-as-filter; a margin for items the source names but does not
   quantify; an extension of the axis past the data; an inspector
   printing the derivation for each item.

   Kill criterion — the y-axis is not supplied by the source as an
   ordinal scale, or fewer than 8 items can be placed. A y-axis the page
   invented is decoration and the build collapses into a horizontal
   timeline. refuse() is called by the interpreter before any DOM.
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = root.KW, U = KW.util, el = U.el;

  function Kit(ctx) {
    const K = {
      id: 'quotation-axis-plot',
      claims: { 'plot-state': 1, coda: 1 },
    };

    /* ─────────────── kill criterion (d) ─────────────── */
    K.refuse = function (specScenes) {
      const plot = specScenes.find((s) => s.plot);
      const levels = plot && plot.plot.y && plot.plot.y.levels;
      if (!levels || levels.length < 3) return 'the y-axis is not supplied by the source as an ordinal scale';
      if (plot.plot.y.kind !== 'ordinal-quotation') return 'y-axis kind is not a source quotation';
      const n = KW.derive.plotItems(ctx.refs).dated.length;
      if (n < 8) return 'only ' + n + ' items can be placed (<8)';
      return null;
    };

    /* ─────────────── state ─────────────── */
    let levels = [], verdictAge = null, reachedAge = null, xConf = null;
    let states = [];            // one per plot-state scene, in reading order
    let state = 1, showRanges = false, filterReg = null, revealed = false, guessAge = null;
    let geom = null, group = null, beat = null;
    const SH = {}, BAR = {};
    let items = [], regNodes = [], dom = {};

    const regOf = (a) => { let r = 0; for (let i = 0; i < levels.length; i++) if (a >= levels[i].age) r = i; return r; };
    const narrow = () => window.innerWidth < 820;
    const cfg = () => states[state - 1] || {};
    const maxAge = () => (cfg().extend && cfg().extend.x_to) || (xConf && xConf.to) || 94;

    /* ═════════════ phase 3: reserve the plate + its runway ═════════════ */
    K.group = function (list) {
      const plotStates = list.filter((s) => s.kind === 'plot-state');
      if (!plotStates.length) return null;
      const first = plotStates[0];
      const node = ctx.sequence.node(first.id);
      if (!node) return null;
      node.className = 'kw-scene kw-plotgroup';
      node.innerHTML = '';
      node.style.minHeight = '';
      const runway = plotStates.reduce((a, s) => a + (s.vh || 100), 0) + 60;

      const plate = el('div', 'kw-plate');
      plate.dataset.ground = 'sheet';
      plate.innerHTML =
        '<div class="kw-env" aria-hidden="true"></div>' +
        '<div class="kw-plate-top">' +
        '<div class="kw-mv"><b class="kw-no">01</b><span class="kw-cat kw-mvname"></span>' +
        '<h2 class="kw-claim kw-mvhead"></h2></div>' +
        '<div class="kw-tools"><button type="button" class="kw-tgl kw-filt" hidden></button>' +
        '<button type="button" class="kw-tgl kw-ranges" aria-pressed="false"></button></div></div>' +
        '<div class="kw-namesband"><div class="kw-names"></div></div>' +
        '<div class="kw-chart">' +
        '<div class="kw-wash"></div><div class="kw-regs"></div>' +
        '<div class="kw-vline"></div><div class="kw-vlab"></div>' +
        '<div class="kw-layer"></div><div class="kw-death"></div>' +
        '<figure class="kw-portrait"></figure><aside class="kw-margin"></aside>' +
        '<div class="kw-guess"><div class="kw-gmark"></div></div>' +
        '</div><div class="kw-axis"></div>' +
        '<div class="kw-plate-foot"><p class="kw-narr"></p></div>';
      node.appendChild(plate);
      plotStates.forEach(() => node.appendChild(el('div', 'kw-runway')));
      node.appendChild(el('div', 'kw-runway kw-runway-tail'));
      node.style.setProperty('--runway', runway + 'svh');

      /* the other plot-state scenes were reserved as siblings; the plate
         is one surface, so their boxes collapse and the group answers
         the position instrument for them (C13: scroll → state). */
      plotStates.slice(1).forEach((s) => {
        const n = ctx.sequence.node(s.id);
        if (n) { n.className = 'kw-scene kw-substate'; n.style.minHeight = '0'; n.innerHTML = ''; }
      });

      dom = {
        node, plate,
        chart: plate.querySelector('.kw-chart'),
        regs: plate.querySelector('.kw-regs'),
        layer: plate.querySelector('.kw-layer'),
        axis: plate.querySelector('.kw-axis'),
        names: plate.querySelector('.kw-names'),
        namesband: plate.querySelector('.kw-namesband'),
        wash: plate.querySelector('.kw-wash'),
        vline: plate.querySelector('.kw-vline'),
        vlab: plate.querySelector('.kw-vlab'),
        margin: plate.querySelector('.kw-margin'),
        guess: plate.querySelector('.kw-guess'),
        gmark: plate.querySelector('.kw-gmark'),
        death: plate.querySelector('.kw-death'),
        portrait: plate.querySelector('.kw-portrait'),
        narr: plate.querySelector('.kw-narr'),
        foot: plate.querySelector('.kw-plate-foot'),
        no: plate.querySelector('.kw-no'),
        mvname: plate.querySelector('.kw-mvname'),
        head: plate.querySelector('.kw-mvhead'),
        ranges: plate.querySelector('.kw-ranges'),
        filt: plate.querySelector('.kw-filt'),
      };
      dom.ranges.style.visibility = 'hidden';
      dom.ranges.addEventListener('click', () => { showRanges = !showRanges; syncRanges(); layout(); });
      dom.filt.addEventListener('click', () => setFilter(null));

      group = {
        ids: plotStates.map((s) => s.id),
        has: (id) => group.ids.indexOf(id) > -1,
        goTo(id) {
          const i = group.ids.indexOf(id);
          const r = node.getBoundingClientRect();
          const top = window.scrollY + r.top;
          const span = r.height - window.innerHeight;
          const frac = [0.03, 0.30, 0.60, 0.90];
          window.scrollTo({ top: top + span * (frac[i] != null ? frac[i] : i / group.ids.length), behavior: 'smooth' });
        },
        resolve(id) { return id === first.id ? group.ids[state - 1] : null; },
      };
      ctx.sequence.registerGroup(group);
      /* every plot-state's environment moment mounts in the plate, and is
         gated by the state the plate is in (C8: one live at a time). */
      ctx.envAlias = ctx.envAlias || {};
      group.ids.forEach((sid, i) => {
        ctx.envAlias[sid] = { node: plate, host: plate.querySelector('.kw-env'), owner: group.ids[0], state: i + 1 };
      });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', () => { clearTimeout(K._rz); K._rz = setTimeout(() => { layout(); homeDrag(); K.coda(); }, 130); });
      return group;
    };

    /* ═════════════ phase 4: each plot-state hydrates its own state ═════════════ */
    K.scene = function (scene, node) {
      if (scene.kind === 'coda') return K.codaScene(scene, node);
      if (scene.kind !== 'plot-state') return false;
      const i = group ? group.ids.indexOf(scene.id) : -1;
      if (i < 0) return false;
      states[i] = scene;

      if (scene.plot) {
        const y = scene.plot.y || {};
        levels = (y.levels || []).map(([age, text]) => ({ age, text, verdict: age === y.verdict }));
        verdictAge = y.verdict;
        reachedAge = y.reached;
        xConf = scene.plot.x || {};
        buildRegisters();
        buildItems();
        dom.vlab.textContent = numWord(verdictAge);
      }
      if (scene.beat) K.wantBeat = scene.beat;
      if (scene.toggle) { showRanges = false; syncRanges(); }
      if (scene.margin) buildMargin(scene.margin);
      if (scene.figure) buildPortrait(scene.figure);
      if (i === 0) setState(1, true);
      else if (state === i + 1) setState(i + 1, true);
      layout();
      return true;
    };

    function numWord(n) {
      const w = { 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety', 100: 'a hundred' };
      return w[n] || String(n);
    }

    /* ── registers: a printed field per level he lived to reach ──
       The last three carry no block, because there was never anything
       to print in them. */
    function buildRegisters() {
      dom.regs.innerHTML = '';
      regNodes = levels.map((r, i) => {
        const d = el('div', 'kw-reg' + (r.verdict ? ' kw-verdict' : ''));
        d.dataset.reg = String(i);
        d.dataset.reached = r.age <= reachedAge ? '1' : '0';
        d.append(el('div', 'kw-field'), el('div', 'kw-rage', String(r.age)),
          el('div', 'kw-rlab', r.text), el('div', 'kw-rrule'));
        const hit = el('button', 'kw-rhit');
        hit.type = 'button';
        hit.setAttribute('aria-label', 'Show only the works that fall in this register of his scale');
        hit.addEventListener('click', () => setFilter(filterReg === i ? null : i));
        d.appendChild(hit);
        dom.regs.appendChild(d);
        return d;
      });
    }

    /* ── the items: joined from the Content Model, packed at true aspect ── */
    function buildItems() {
      const all = KW.derive.plotItems(ctx.refs);
      items = all.dated;
      dom.layer.innerHTML = '';
      items.forEach((w) => {
        const b = el('button', 'kw-sheet kw-enter' + (w.image ? '' : ' kw-noimg') + (w.derivedDate ? ' kw-derived' : ''));
        b.type = 'button';
        b.dataset.id = w.id;
        b.setAttribute('aria-label', w.title + ', ' + w.date);
        if (w.image) {
          const fill = el('span', 'kw-plate-fill');
          fill.style.background = ctx.evidence.dominant(w.image);
          const im = new Image();
          im.src = ctx.assetBase + w.image.local;
          im.alt = w.title;
          im.decoding = 'async';
          im.loading = 'lazy';
          im.addEventListener('load', () => fill.remove());
          b.append(fill, im);
        } else b.appendChild(el('span', 'kw-slash'));
        b.addEventListener('click', () => K.inspect(w));
        dom.layer.appendChild(b);
        SH[w.id] = b;
        const bar = el('div', 'kw-bar');
        dom.layer.appendChild(bar);
        BAR[w.id] = bar;
      });
    }

    function buildMargin(m) {
      const res = ctx.refs.resolve(m.items);
      dom.margin.innerHTML = '';
      if (!res) return;
      const list = res.items;
      const shown = m.limit ? list.slice(0, m.limit) : list;
      dom.margin.appendChild(el('h3', null, m.title + ' — ' + list.length));
      const ul = el('ul');
      shown.forEach((u) => {
        const li = el('li'), b = el('button');
        b.type = 'button';
        const th = el('span', 'kw-mth');
        if (u.image) {
          const h = 24, w = Math.round(h * ctx.evidence.aspect(u.image));
          th.style.width = w + 'px'; th.style.height = h + 'px';
          const im = new Image();
          im.src = ctx.assetBase + u.image.local;
          im.alt = '';
          im.loading = 'lazy';
          th.appendChild(im);
        } else th.classList.add('kw-mth-empty');
        b.append(th, el('span', 'kw-mt', u.title));
        b.addEventListener('click', () => K.inspect(u));
        li.appendChild(b);
        ul.appendChild(li);
      });
      if (list.length > shown.length) {
        const li = el('li', 'kw-mtail');
        li.appendChild(el('span', 'kw-cat', 'and ' + (list.length - shown.length) + ' more the article names without a date'));
        ul.appendChild(li);
      }
      dom.margin.appendChild(ul);
    }

    function buildPortrait(fig) {
      const res = ctx.refs.resolve(fig.ref);
      dom.portrait.innerHTML = '';
      if (!res) return;
      const im = res.items[0];
      const img = new Image();
      img.src = ctx.assetBase + im.local;
      img.alt = im.alt || im.caption || '';
      dom.portrait.appendChild(img);
      dom.portrait.appendChild(el('figcaption', 'kw-pl kw-cat', fig.caption || ''));
      dom.portrait.dataset.ratio = String(ctx.evidence.aspect(im));
    }

    /* ═════════════ geometry — the packing engine ═════════════
       Shared by kits 1, 2, 4 and 7: register rows, collision packing at
       true file aspect, per-register overflow, range bars that step
       between registers when a span crosses a level. */
    const padL = () => (narrow() ? 28 : 44);
    const padR = () => (cfg().margin && !narrow() ? 212 : narrow() ? 14 : 30);
    const midOf = (w) => (w.ages.lo + w.ages.hi) / 2;

    function layout() {
      if (!dom.chart || !levels.length) return;
      const cw = dom.chart.clientWidth;
      const marginStrip = (narrow() && cfg().margin) ? 54 : 0;
      const ch = dom.chart.clientHeight - marginStrip;
      if (!cw || ch <= 40) return;
      const pL = padL(), pR = padR();
      dom.chart.style.setProperty('--padL', pL + 'px');
      const plotW = Math.max(120, cw - pL - pR);
      const A2X = (a) => pL + (a / maxAge()) * plotW;
      const labelBand = narrow() ? 30 : 21;
      const pad = 4, gap = 4;
      const single = !cfg().items;

      const rows = levels.map(() => []);
      let placed = [];

      function pack(h) {
        rows.forEach((r) => (r.length = 0));
        placed = [];
        for (const w of items) {
          const ri = regOf(showRanges ? w.ages.hi : midOf(w));
          const ar = w.image ? ctx.evidence.aspect(w.image) : 0.62;
          const wpx = Math.max(6, Math.round(h * ar));
          const cx = A2X(midOf(w));
          let x0 = cx - wpx / 2, x1 = cx + wpx / 2 + 2;
          if (x0 < pL - 10) { x0 = pL - 10; x1 = x0 + wpx + 2; }
          if (x1 > pL + plotW + 26) { x1 = pL + plotW + 26; x0 = x1 - wpx - 2; }
          const R = rows[ri];
          let r = 0;
          for (; r < R.length; r++) if (!R[r].some((s) => !(x1 <= s.x0 - 3 || x0 >= s.x1 + 3))) break;
          if (r === R.length) R.push([]);
          const rec = { w, ri, r, x0, x1, wpx };
          R[r].push(rec);
          placed.push(rec);
        }
        return rows.reduce((s, r) => s + Math.max(1, r.length), 0);
      }

      const fixed = levels.length * (labelBand + pad) + (levels.length - 1) * gap;
      let sheetH;
      if (single) { sheetH = 0; pack(20); }
      else {
        sheetH = 8; pack(sheetH);
        for (let h = 9; h <= 52; h++) {
          const t = pack(h);
          if (fixed + t * (h + 6) > ch) { pack(sheetH); break; }
          sheetH = h;
        }
      }
      const pitch = sheetH + 6;

      const hs = levels.map((r, i) => single
        ? labelBand + pad + (K.wantBeat && state === beatState() && i === regOf(beatTruthMid()) ? 120 : pitch)
        : labelBand + pad + rows[i].length * pitch + (rows[i].length ? 0 : 3));
      let sum = hs.reduce((a, b) => a + b, 0) + (levels.length - 1) * gap;
      const slack = ch - sum;
      if (slack > 0) { const each = slack / levels.length; for (let i = 0; i < hs.length; i++) hs[i] += each; }
      else if (slack < 0) {
        const k = (ch - (levels.length - 1) * gap) / (sum - (levels.length - 1) * gap);
        for (let i = 0; i < hs.length; i++) hs[i] *= k;
      }

      const tops = [];
      let y = ch;
      for (let i = 0; i < levels.length; i++) { y -= hs[i]; tops[i] = y; y -= gap; }
      geom = { pL, pR, plotW, A2X, tops, hs, labelBand, pitch, sheetH, ch, cw, rows };

      regNodes.forEach((d, i) => {
        d.style.top = tops[i] + 'px';
        d.style.height = hs[i] + 'px';
        d.dataset.empty = (!single && rows[i].length === 0) ? '1' : '0';
      });

      const cellTop = (ri, r) => tops[ri] + hs[ri] - pad - (rows[ri].length - r) * pitch + 3;

      placed.forEach((rec) => {
        const { w, ri, r, x0, wpx } = rec;
        const n = SH[w.id];
        if (!n) return;
        const top = single ? tops[ri] + labelBand + 2 : cellTop(ri, r);
        n.style.left = x0 + 'px';
        n.style.top = top + 'px';
        n.style.width = wpx + 'px';
        n.style.height = sheetH + 'px';
        drawBar(w, ri, top, sheetH, A2X, tops, hs, !single && showRanges);
      });

      if (K.wantBeat && state === beatState() && beat) beatLayout(A2X, tops, hs, labelBand);

      /* the verdict region: left of seventy, across every register that
         can hold it. A flat printed block, hard-edged. */
      const x70 = A2X(verdictAge);
      const topV = tops[regOf(verdictAge)];
      dom.wash.style.left = '0px';
      dom.wash.style.width = x70 + 'px';
      dom.wash.style.top = topV + 'px';
      dom.wash.style.height = (ch - topV) + 'px';
      dom.vline.style.left = x70 + 'px';
      dom.vlab.style.left = (x70 + 6) + 'px';
      dom.vlab.style.top = (topV - 15) + 'px';

      buildAxis(A2X);
      buildNames(A2X);
      layoutTail(A2X, tops, hs, ch);
      applyFilter();
    }

    /* a range bar steps between registers when a span crosses a level */
    function drawBar(w, ri, top, sheetH, A2X, tops, hs, on) {
      const bar = BAR[w.id];
      if (!bar) return;
      if (!on || w.ages.exact || w.ages.hi <= w.ages.lo) { bar.dataset.on = '0'; return; }
      const rlo = regOf(w.ages.lo), rhi = ri;
      const bx0 = A2X(w.ages.lo), bx1 = A2X(w.ages.hi);
      const yHi = top + sheetH + 3;
      const yLo = rlo === rhi ? yHi : tops[rlo] + hs[rlo] * 0.66;
      const cross = rlo === rhi ? bx1 : A2X(levels[rhi].age);
      const t0 = Math.min(yLo, yHi);
      bar.style.left = bx0 + 'px';
      bar.style.top = t0 + 'px';
      bar.style.width = Math.max(2, bx1 - bx0) + 'px';
      bar.style.height = Math.max(2, Math.abs(yLo - yHi) + 2) + 'px';
      bar.innerHTML = '';
      const seg = (x, wd, yy) => { const d = el('div', 'kw-seg'); d.style.cssText = 'left:' + x + 'px;top:' + (yy - t0) + 'px;width:' + Math.max(1, wd) + 'px'; return d; };
      const cap = (x, yy) => { const d = el('div', 'kw-cap'); d.style.cssText = 'left:' + x + 'px;top:' + (yy - t0 - 4) + 'px'; return d; };
      const wLo = Math.max(1, Math.min(bx1, cross) - bx0);
      bar.append(seg(0, wLo, yLo), cap(0, yLo));
      if (rlo !== rhi) {
        const st = el('div', 'kw-step');
        st.style.cssText = 'left:' + wLo + 'px;top:' + (Math.min(yLo, yHi) - t0) + 'px;height:' + Math.abs(yLo - yHi) + 'px';
        bar.append(st, seg(wLo, bx1 - bx0 - wLo, yHi));
      }
      bar.appendChild(cap(bx1 - bx0 - 1.5, yHi));
      bar.dataset.on = '1';
    }

    function buildAxis(A2X) {
      const c = cfg();
      const ticks = (c.extend && c.extend.ticks) || (states[0] && states[0].plot && states[0].plot.ticks) || [];
      const t = narrow() ? ticks.filter((v, i) => i % 2 === 0 || v === verdictAge || v === reachedAge) : ticks;
      dom.axis.innerHTML = '';
      dom.axis.appendChild(el('div', 'kw-arule'));
      t.forEach((v) => {
        const d = el('div', 'kw-atick' + (v === verdictAge || v === reachedAge ? ' kw-big' : ''));
        d.style.left = A2X(v) + 'px';
        d.append(el('i'), el('span', null, String(v)));
        dom.axis.appendChild(d);
      });
      const note = el('p', 'kw-axnote');
      const base = (xConf && xConf.label) ? xConf.label + '. ' : '';
      note.innerHTML = (c.extend && c.extend.note) || (base + ((xConf && xConf.note) || ''));
      dom.axis.appendChild(note);
      if (xConf && xConf.legend) dom.axis.appendChild(el('p', 'kw-axr kw-cat', xConf.legend));
    }

    /* the name ticks: p4 — the names ARE the periodisation */
    function buildNames(A2X) {
      const ov = cfg().overlay;
      dom.names.innerHTML = '';
      if (!ov) return;
      const res = ctx.refs.resolve(ov.items);
      if (!res) return;
      const ends = [-999, -999];
      res.items.forEach((n) => {
        if (n.a == null) return;
        const x = A2X(n.a);
        const w = (n.name || '').length * 6.3 + 16;
        let row = 0;
        if (x < ends[0]) row = 1;
        if (row === 1 && x < ends[1]) row = ends[0] <= ends[1] ? 0 : 1;
        ends[row] = Math.max(ends[row], x + w);
        const d = el('div', 'kw-ntick');
        d.style.left = x + 'px';
        d.style.top = (row ? 18 : 0) + 'px';
        d.append(el('span', null, n.name));
        dom.names.appendChild(d);
      });
    }

    /* ── the tail: forecast vs actual, and the portrait standing in the
         years he did not get ── */
    function layoutTail(A2X, tops, hs, ch) {
      const c = cfg();
      dom.death.innerHTML = '';
      if (!c.mark) return;
      const at = c.mark.at;
      const xA = A2X(at);
      const yF = tops[regOf(c.mark.forecast)] + hs[regOf(c.mark.forecast)] * 0.55;
      const yD = tops[0] + hs[0] * 0.44;
      const line = el('div', 'kw-dline');
      line.style.cssText = 'left:' + xA + 'px;top:' + yF + 'px;height:' + (yD - yF) + 'px';
      const fdot = el('div', 'kw-fdot');
      fdot.style.cssText = 'left:' + (xA - 5) + 'px;top:' + (yF - 5) + 'px';
      const flab = el('div', 'kw-flab kw-cat', c.mark.label || '');
      flab.style.cssText = 'left:' + (xA - 12) + 'px;top:' + (yF - 7) + 'px;transform:translateX(-100%)';
      const dot = el('div', 'kw-ddot');
      dot.style.cssText = 'left:' + (xA - 5) + 'px;top:' + (yD - 5) + 'px';
      dom.death.append(line, fdot, flab, dot);

      const q = ctx.refs.resolve(c.mark.actual);
      if (q && !narrow()) {
        const box = el('div', 'kw-dq');
        box.innerHTML = '“' + q.items[0].text + '”';
        box.appendChild(el('span', 'kw-dsrc kw-cat', c.mark.note || ''));
        const qw = 330;
        box.style.width = qw + 'px';
        box.style.left = Math.max(padL(), A2X(verdictAge) - qw - 24) + 'px';
        box.style.bottom = (ch - yD + 12) + 'px';
        dom.death.appendChild(box);
      }

      if (c.figure && dom.portrait.firstChild) {
        const right = A2X(maxAge());
        const availW = Math.max(60, right - xA - 30);
        const ratio = +dom.portrait.dataset.ratio || 0.48;
        let ph = Math.min(ch * 0.54, availW / ratio);
        const pw = ph * ratio;
        dom.portrait.style.left = (right - pw - 2) + 'px';
        dom.portrait.style.top = (ch - ph - 54) + 'px';
        dom.portrait.style.width = pw + 'px';
        dom.portrait.style.height = ph + 'px';
        dom.portrait.style.setProperty('--capw', Math.max(narrow() ? 110 : 150, availW) + 'px');
      }
    }

    /* ═════════════ states ═════════════ */
    function counts() {
      const total = items.length;
      const inside = items.filter((w) => w.ages.hi < verdictAge).length;
      const straddle = items.filter((w) => w.ages.lo < verdictAge && w.ages.hi >= verdictAge).length;
      const undated = KW.derive.plotItems(ctx.refs).undated.length;
      return { total, inside, straddle, undated, after: total - inside - straddle };
    }
    function fill(s) {
      const c = counts();
      return String(s == null ? '' : s)
        .replace(/\{total\}/g, c.total).replace(/\{inside\}/g, c.inside)
        .replace(/\{straddle\}/g, c.straddle).replace(/\{undated\}/g, c.undated)
        .replace(/\{after\}/g, c.after);
    }

    function setState(s, force) {
      s = U.clamp(s, 1, Math.max(1, states.filter(Boolean).length));
      if (s === state && !force) return;
      const prev = state;
      state = s;
      const c = cfg();
      if (!c.id) return;

      dom.no.textContent = ctx.scenesApi.idxOf(c.id);
      dom.mvname.textContent = c.name || '';
      dom.head.innerHTML = KW.Prose.inline(fill(c.claim));
      dom.plate.dataset.ground = c.ground === 'ink' ? 'ink' : 'sheet';
      dom.plate.dataset.state = String(s);
      ctx.sequence.markDark(c.ground === 'ink' ? group.ids[0] : null);
      if (ctx.env) ctx.env.setState(group.ids[0], s);

      if (!(K.wantBeat && s === beatState() && revealed)) setNarr(c);

      dom.names.style.opacity = c.overlay ? '1' : '0';
      dom.margin.classList.toggle('on', !!c.margin);
      dom.wash.style.opacity = c.wash ? '1' : '0';
      dom.vline.style.opacity = s < beatFirstWash() ? '0' : (c.ground === 'ink' ? '.45' : '1');
      dom.vlab.style.opacity = c.wash || c.ground === 'ink' ? '1' : '0';
      dom.death.style.opacity = c.mark ? '1' : '0';
      dom.portrait.style.opacity = c.figure ? '1' : '0';
      dom.ranges.style.visibility = rangesVisible(s) ? 'visible' : 'hidden';
      dom.filt.hidden = !(c.margin && filterReg != null);
      dom.chart.dataset.filterable = c.filter ? '1' : '0';
      dom.guess.classList.toggle('on', !!(K.wantBeat && s === beatState() && !revealed));
      dom.gmark.style.opacity = (guessAge == null || !c.wash) ? '0' : (s === beatState() ? '1' : '.45');
      if (beat && beat.drag) beat.drag.style.display = (K.wantBeat && s === beatState() && !revealed) ? 'block' : 'none';

      if (!c.items) {
        items.forEach((w) => { const n = SH[w.id]; if (!n) return; n.classList.remove('kw-gone', 'kw-dim'); n.classList.add('kw-enter'); });
        if (c.ground === 'ink' || c.density === 'empty') {
          setFilter(null, true);
          items.forEach((w) => { const n = SH[w.id]; if (!n) return; n.classList.remove('kw-enter', 'kw-dim'); n.classList.add('kw-gone'); });
        }
        if (K.wantBeat && s === beatState() && revealed) {
          const t = SH[beatTargetId()];
          if (t) t.classList.remove('kw-enter');
        }
      } else {
        revealed = true;
        items.forEach((w) => { const n = SH[w.id]; if (n) n.classList.remove('kw-gone'); });
        if (prev !== s) { dom.layer.classList.add('kw-noslide'); setTimeout(() => dom.layer.classList.remove('kw-noslide'), 60); }
        land(prev !== s);
      }
      layout();
      if (K.wantBeat && s === beatState() && !revealed) homeDrag();
    }

    function rangesVisible(s) {
      for (let i = s - 1; i < states.length; i++) if (states[i] && states[i].ground === 'ink') break;
      const c = states[s - 1];
      if (!c || c.ground === 'ink') return false;
      return states.slice(0, s).some((x) => x && x.toggle);
    }
    function beatFirstWash() {
      const i = states.findIndex((x) => x && x.wash);
      return i < 0 ? 99 : i + 1;
    }

    function setNarr(c, override) {
      const txt = override || [fill(c.lede), fill(c.note)];
      dom.narr.innerHTML = KW.Prose.inline(txt[0] || '');
      if (K.wantBeat && state === beatState() && !revealed && beat) {
        if (beat.rec.ask) dom.narr.append(' ' + beat.rec.ask);
        const sk = el('button', 'kw-skip');
        sk.type = 'button';
        sk.textContent = beat.rec.skip || 'Skip';
        sk.addEventListener('click', () => { guessAge = null; reveal(); });
        dom.narr.append(' ', sk);
      }
      let n = dom.foot.querySelector('.kw-note');
      if (!n) { n = KW.Prose.note(''); dom.foot.appendChild(n); }
      n.querySelector('.kw-dtx').innerHTML = KW.Prose.inline(txt[1] || '');
    }

    let landTimers = [];
    function land(stagger) {
      landTimers.forEach(clearTimeout);
      landTimers = [];
      const noMotion = ctx.root.classList.contains('kw-nomotion') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      items.forEach((w, i) => {
        const n = SH[w.id];
        if (!n) return;
        if (!stagger || noMotion) { n.classList.remove('kw-enter'); return; }
        landTimers.push(setTimeout(() => n.classList.remove('kw-enter'), 40 * i));
      });
    }

    /* ── register-as-filter (isolate-subset with a different handle) ── */
    function applyFilter() {
      items.forEach((w) => {
        const on = filterReg == null || regOf(showRanges ? w.ages.hi : midOf(w)) === filterReg;
        const n = SH[w.id];
        if (n) n.classList.toggle('kw-dim', !on);
        const b = BAR[w.id];
        if (b) b.style.opacity = (b.dataset.on === '1' && on && (cfg().items || (K.wantBeat && state === beatState() && w.id === beatTargetId()))) ? '1' : '0';
      });
    }
    function setFilter(i, silent) {
      filterReg = i;
      regNodes.forEach((d, k) => d.classList.toggle('kw-filt-off', i != null && k !== i));
      applyFilter();
      const c = cfg(), f = c.filter;
      if (i == null) {
        dom.filt.hidden = true;
        if (c.claim) dom.head.innerHTML = KW.Prose.inline(fill(c.claim));
      } else if (f) {
        const n = items.filter((w) => regOf(showRanges ? w.ages.hi : midOf(w)) === i).length;
        dom.filt.textContent = f.clear || 'clear the filter';
        dom.filt.hidden = !c.margin;
        dom.head.innerHTML = KW.Prose.inline(fill(f.while).replace('{n}', n).replace('{level}', levels[i].text));
      }
    }

    function syncRanges() {
      const t = states.find((x) => x && x.toggle);
      if (!t) return;
      dom.ranges.setAttribute('aria-pressed', String(showRanges));
      dom.ranges.textContent = showRanges ? t.toggle.on : t.toggle.off;
    }

    /* ═════════════ beat · predict-place ═════════════ */
    K.beat = function (rec) {
      if (rec.type !== 'predict-place') return false;
      const res = ctx.refs.resolve(rec.item.ref);
      if (!res) return false;
      const im = res.items[0];
      const drag = el('button', 'kw-drag');
      drag.type = 'button';
      drag.setAttribute('aria-label', (rec.item.alt || 'An item') + '. ' + rec.ask);
      const img = new Image();
      img.src = ctx.assetBase + im.local;
      img.alt = rec.item.alt || '';
      drag.appendChild(img);
      dom.guess.insertBefore(drag, dom.gmark);
      beat = { rec, drag, image: im, ratio: ctx.evidence.aspect(im) };
      wireDrag();
      if (state === beatState()) { setState(state, true); }
      return true;
    };
    function beatState() { const i = states.findIndex((s) => s && s.beat); return i + 1; }
    function beatTruthMid() { return beat ? (beat.rec.truth.lo + beat.rec.truth.hi) / 2 : 0; }
    function beatTargetId() {
      if (!beat) return null;
      const w = items.find((x) => x.image && x.image.idx === beat.image.idx);
      return w ? w.id : null;
    }

    function beatLayout(A2X, tops, hs, labelBand) {
      const id = beatTargetId();
      if (!id) return;
      const w = items.find((x) => x.id === id);
      const ri = regOf(showRanges ? w.ages.hi : midOf(w));
      const n = SH[id];
      const h2 = Math.max(30, Math.min(150, hs[ri] - labelBand - 14));
      const w2 = h2 * ctx.evidence.aspect(w.image);
      const cx = A2X(midOf(w));
      const top = tops[ri] + labelBand + 6;
      n.style.left = (cx - w2 / 2) + 'px';
      n.style.top = top + 'px';
      n.style.width = w2 + 'px';
      n.style.height = h2 + 'px';
      if (showRanges) drawBar(w, ri, top, h2, A2X, tops, hs, true);
    }

    function homeDrag() {
      if (!geom || !beat) return;
      const h = Math.min(narrow() ? 78 : 132, geom.ch * 0.24);
      const w = h * beat.ratio;
      beat.drag.style.width = w + 'px';
      beat.drag.style.height = h + 'px';
      if (beat.drag.dataset.moved !== '1') {
        beat.drag.style.left = Math.max(geom.pL, geom.pL + geom.plotW - w - 4) + 'px';
        beat.drag.style.top = (geom.tops[Math.min(geom.tops.length - 1, narrow() ? 7 : 6)] + 6) + 'px';
      }
    }

    function wireDrag() {
      const drag = beat.drag;
      let dragging = false, dx = 0, dy = 0;
      drag.addEventListener('pointerdown', (e) => {
        if (revealed) return;
        dragging = true;
        drag.setPointerCapture(e.pointerId);
        const r = drag.getBoundingClientRect();
        dx = e.clientX - r.left; dy = e.clientY - r.top;
        drag.style.transition = 'none';
        e.preventDefault();
      });
      drag.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const c = dom.chart.getBoundingClientRect();
        drag.dataset.moved = '1';
        drag.style.left = (e.clientX - c.left - dx) + 'px';
        drag.style.top = (e.clientY - c.top - dy) + 'px';
      });
      drag.addEventListener('pointerup', (e) => {
        if (!dragging) return;
        dragging = false;
        const c = dom.chart.getBoundingClientRect();
        commit(e.clientX - c.left);
      });
      drag.addEventListener('keydown', (e) => {
        if (revealed) return;
        const step = e.shiftKey ? 48 : 14;
        const cur = parseFloat(drag.style.left) || 0;
        if (e.key === 'ArrowRight') { drag.dataset.moved = '1'; drag.style.left = (cur + step) + 'px'; e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'ArrowLeft') { drag.dataset.moved = '1'; drag.style.left = Math.max(0, cur - step) + 'px'; e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'Enter' || e.key === ' ') { commit(cur + (parseFloat(drag.style.width) || 0) / 2); e.preventDefault(); }
      });
    }

    function commit(cx) {
      if (!geom || revealed) return;
      guessAge = beat.drag.dataset.moved === '1'
        ? Math.round(U.clamp((cx - geom.pL) / geom.plotW * maxAge(), 0, maxAge()))
        : null;
      reveal();
    }

    function reveal() {
      if (revealed || !beat) return;
      revealed = true;
      const r = beat.rec;
      if (r.after && r.after.set && r.after.set.ranges) { showRanges = true; syncRanges(); }
      layout();
      const target = SH[beatTargetId()];
      if (target) {
        target.classList.remove('kw-enter');
        const a = target.getBoundingClientRect(), c = dom.chart.getBoundingClientRect();
        beat.drag.style.transition = 'left 320ms var(--ease), top 320ms var(--ease), width 320ms var(--ease), height 320ms var(--ease), opacity 180ms 250ms';
        requestAnimationFrame(() => {
          beat.drag.style.left = (a.left - c.left) + 'px';
          beat.drag.style.top = (a.top - c.top) + 'px';
          beat.drag.style.width = a.width + 'px';
          beat.drag.style.height = a.height + 'px';
          beat.drag.style.opacity = '0';
        });
        setTimeout(() => { beat.drag.style.display = 'none'; }, 620);
      }
      if (guessAge != null && geom) {
        dom.gmark.innerHTML = '';
        const l = el('div', 'kw-gl');
        l.style.left = geom.A2X(guessAge) + 'px';
        const t = el('div', 'kw-gt', 'your guess — age ' + guessAge);
        const gx = geom.A2X(guessAge);
        if (gx > geom.pL + geom.plotW * 0.66) { t.style.left = (gx - 6) + 'px'; t.style.transform = 'translateX(-100%)'; }
        else t.style.left = (gx + 6) + 'px';
        dom.gmark.append(l, t);
        dom.gmark.style.opacity = '1';
      }
      dom.head.innerHTML = KW.Prose.inline(r.reveal.claim);
      const extra = guessAge == null ? '' :
        ' ' + (guessAge < r.truth.lo ? r.reveal.low : r.reveal.high).replace('{g}', guessAge);
      setNarr(null, [r.reveal.narr + extra, r.reveal.note]);
    }

    /* ═════════════ inspector fields (C5) ═════════════ */
    K.inspect = function (w) {
      if (cfg().ground === 'ink') return;
      const rows = [];
      if (w.ages) {
        rows.push(['Date, as this article states it', w.date]);
        rows.push(['His age', w.ages.exact ? String(w.ages.lo) : w.ages.lo + ' to ' + w.ages.hi]);
        rows.push(['Age derived here', w.ages.why]);
        rows.push(['Its register on his scale', '“' + levels[regOf(midOf(w))].text + '”']);
        if (w.ages.hi < verdictAge) rows.push(['His verdict on it', '“' + levels[regOf(verdictAge)].text + '”']);
        else if (w.ages.lo < verdictAge) rows.push(['His verdict on it', 'the range straddles ' + verdictAge + ', so part of it falls inside “' + levels[regOf(verdictAge)].text + '”']);
      } else {
        rows.push(['Date', 'None given in this article']);
        rows.push(['Why it is in the margin', w.why]);
      }
      if (w.imgnote) rows.push(['Note', w.imgnote]);
      rows.push(['Source', (w.src || '—') + ' — ' + ctx.data.contentModel.title + ', English Wikipedia']);
      ctx.evidence.open(w, rows);
    };

    /* ═════════════ C13 · scroll → state (never scroll → camera) ═════════════ */
    let raf = 0;
    function onScroll() {
      if (raf || !group) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = dom.node.getBoundingClientRect();
        const span = r.height - window.innerHeight;
        if (span <= 0) return;
        const p = U.clamp(-r.top / span, 0, 1);
        const n = group.ids.length;
        const bounds = [0.185, 0.45, 0.775];
        let s = 1;
        for (let i = 0; i < n - 1; i++) {
          const b = n === 4 ? bounds[i] : (i + 1) / n * 0.95;
          if (p > b) s = i + 2;
        }
        setState(s);
      });
    }

    /* ═════════════ coda · the axis, relabelled ═════════════ */
    let codaScene = null;
    K.codaScene = function (scene, node) {
      codaScene = { scene, node };
      node.className = 'kw-scene kw-coda';
      node.innerHTML = '';
      const top = el('div', 'kw-mv');
      top.innerHTML = '<b>' + ctx.scenesApi.idxOf(scene.id) + '</b>';
      top.appendChild(el('span', 'kw-cat', scene.name || ''));
      node.appendChild(top);
      node.appendChild(KW.Prose.claim(scene.claim));
      const host = el('div', 'kw-post');
      node.appendChild(host);
      const close = el('div', 'kw-close-block');
      const q = scene.close && ctx.refs.resolve(scene.close.quote);
      if (q) {
        const bq = el('blockquote', null, '“' + q.items[0].text + '”');
        close.appendChild(bq);
      }
      const att = KW.Prose.note('');
      close.appendChild(att);
      node.appendChild(close);
      codaScene.att = att;
      K.coda();
      return true;
    };

    K.coda = function () {
      if (!codaScene || !levels.length) return;
      const { scene, node } = codaScene;
      const host = node.querySelector('.kw-post');
      if (!host) return;
      host.innerHTML = '';
      host.classList.remove('kw-narrow');
      const W0 = host.clientWidth, H0 = host.clientHeight;
      if (!W0) return;
      const res = ctx.refs.resolve(scene.items);
      const evs = res ? res.items.slice(0, scene.limit || res.items.length) : [];
      const ax = scene.axis || {};
      const nar = narrow();
      const pL = nar ? 26 : 44;
      host.style.setProperty('--padL5', pL + 'px');

      /* his ladder, above and finished */
      const rh = nar ? 15 : 18;
      const ladderH = rh * levels.length;
      if (!nar) {
        for (let i = levels.length - 1; i >= 0; i--) {
          const d = el('div', 'kw-ghostreg');
          d.style.top = ((levels.length - 1 - i) * rh) + 'px';
          d.style.height = rh + 'px';
          d.append(el('em', null, String(levels[i].age)),
            el('span', null, i === levels.length - 1 ? levels[i].text : ''));
          host.appendChild(d);
        }
        const dead = el('div', 'kw-deadrule');
        dead.style.top = ladderH + 'px';
        const lab = el('div', 'kw-deadlab', ax.ladder || '');
        lab.style.top = (ladderH + 6) + 'px';
        host.append(dead, lab);
      } else {
        const lad = el('div', 'kw-ladder');
        for (let i = levels.length - 1; i >= 0; i--) {
          const d = el('div', 'kw-ghostrow');
          d.append(el('em', null, String(levels[i].age)),
            el('span', null, i === levels.length - 1 ? levels[i].text : ''));
          lad.appendChild(d);
        }
        host.append(lad, el('p', 'kw-deadlab2 kw-cat', ax.ladder || ''));
        host.classList.add('kw-narrow');
      }

      const span = ax.to || 180;
      if (!nar) {
        const ruleTop = ladderH + 48;
        const pW = W0 - pL - 24;
        const X = (d) => pL + (d / span) * pW;
        const rule = el('div', 'kw-prule');
        rule.style.top = ruleTop + 'px';
        const lab = el('div', 'kw-plabel', ax.relabel || '');
        lab.style.top = (ruleTop - 16) + 'px';
        lab.style.left = pL + 'px';
        host.append(rule, lab);
        const w = 218, rowH = 126, ends = [];
        let maxRow = 0;
        evs.forEach((p) => {
          let x = X(p.delta);
          if (x + w > W0) x = W0 - w;
          let row = 0;
          while (ends[row] != null && x < ends[row]) row++;
          ends[row] = x + w + 14;
          if (row > maxRow) maxRow = row;
          const d = el('div', 'kw-pev');
          d.style.left = x + 'px';
          d.style.top = (ruleTop + 1 + row * rowH) + 'px';
          d.style.width = w + 'px';
          d.appendChild(el('span', 'kw-stamp'));
          d.appendChild(el('span', 'kw-py', p.year + ' · +' + p.delta));
          d.appendChild(el('span', 'kw-pt', p.text));
          d.appendChild(el('span', 'kw-ps kw-cat', p.src));
          host.appendChild(d);
          if (row > 0) {
            const drop = el('div', 'kw-pdrop');
            drop.style.cssText = 'left:' + x + 'px;top:' + ruleTop + 'px;height:' + (row * rowH) + 'px';
            host.appendChild(drop);
          }
        });
        host.style.minHeight = (ruleTop + (maxRow + 1) * rowH + 12) + 'px';
      } else {
        host.append(el('p', 'kw-plabel2 kw-cat', ax.relabel || ''));
        const ul = el('ul', 'kw-plist');
        evs.forEach((p) => {
          const li = el('li');
          const bar = el('div', 'kw-pbar');
          bar.style.width = (p.delta / span * 100) + '%';
          const head = el('div', 'kw-phead');
          head.append(el('b', null, String(p.year)), el('span', null, '+' + p.delta));
          li.append(bar, head, el('p', 'kw-pt2', p.text), el('span', 'kw-cat', p.src));
          ul.appendChild(li);
        });
        host.appendChild(ul);
      }

      /* the arithmetic the article did not do, stamped */
      if (codaScene.att && evs.length) {
        const last = evs[evs.length - 1];
        const zero = ax.zero || 1849;
        const txt = (scene.close && scene.close.note ? scene.close.note + ' ' : '') +
          'The last mark on this axis, ' + last.year + ', falls at what would have been his ' +
          ord(last.year - KW.derive.birth.y) + ' year: ' + zero + ' + ' + last.delta +
          ' = ' + last.year + ', less a birth of c. ' + KW.derive.birth.y + '.';
        codaScene.att.querySelector('.kw-dtx').textContent = txt;
      }
    };

    function ord(n) {
      const t = n % 100, u = n % 10;
      return n + (t >= 11 && t <= 13 ? 'th' : u === 1 ? 'st' : u === 2 ? 'nd' : u === 3 ? 'rd' : 'th');
    }

    return K;
  }

  KW.kits = KW.kits || {};
  KW.kits['quotation-axis-plot'] = Kit;
})(window);
