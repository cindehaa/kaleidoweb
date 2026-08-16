/* ============================================================
   APOLLO 11 — THREE BODIES
   Score layout engine. The only thing that moves is time.
   ============================================================ */
(function () {
  'use strict';

  var LAUNCH = Date.UTC(1969, 6, 16, 13, 32, 0);
  var PAD_TOP = 66, PAD_BOT = 34, GAP = 22;
  var ORBIT = 7200000;      // infobox: Period 2 hours
  var DARK = 48 * 60000;    // p77: 48 minutes of each orbit
  var MOBILE = 900;

  function T(s) { return Date.parse(s); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function pad(n, w) { n = String(Math.floor(n)); while (n.length < (w || 2)) n = '0' + n; return n; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtUTC(ms) {
    var d = new Date(ms);
    return '1969-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + '  ' +
      pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
  }
  function fmtHM(ms) { var d = new Date(ms); return pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()); }
  function fmtDay(ms) { var d = new Date(ms); return MONTHS[d.getUTCMonth()] + ' ' + pad(d.getUTCDate()); }
  function fmtMET(ms) {
    var s = Math.round((ms - LAUNCH) / 1000), neg = s < 0; s = Math.abs(s);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600); s -= h * 3600;
    var m = Math.floor(s / 60); s -= m * 60;
    return (neg ? '−' : '') + pad(d, 3) + ':' + pad(h) + ':' + pad(m) + ':' + pad(s);
  }
  function commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  /* ---------- altitude scale ----------
     Piecewise in log(altitude), anchored so that each height the source
     actually names gets room proportional to the words spent on it.
     The axis prints the real numbers, so the distortion is visible. */
  var A_ANCH = [[6000, .08], [3000, .11], [1000, .18], [500, .28], [250, .42],
  [107, .52], [100, .62], [30, .72], [10, .80], [2, .88]];
  function altFrac(a) {
    a = Math.max(Math.min(a, 6000), 2);
    if (a >= 6000) return A_ANCH[0][1];
    for (var i = 0; i < A_ANCH.length - 1; i++) {
      var hi = A_ANCH[i], lo = A_ANCH[i + 1];
      if (a <= hi[0] && a >= lo[0]) {
        var r = (Math.log(hi[0]) - Math.log(a)) / (Math.log(hi[0]) - Math.log(lo[0]));
        return hi[1] + r * (lo[1] - hi[1]);
      }
    }
    return 1;
  }
  function fracAlt(f) {
    f = clamp(f, 0, 1);
    if (f <= A_ANCH[0][1]) return A_ANCH[0][0];
    for (var i = 0; i < A_ANCH.length - 1; i++) {
      var hi = A_ANCH[i], lo = A_ANCH[i + 1];
      if (f >= hi[1] && f <= lo[1]) {
        var r = (f - hi[1]) / (lo[1] - hi[1] || 1);
        return Math.exp(Math.log(hi[0]) - r * (Math.log(hi[0]) - Math.log(lo[0])));
      }
    }
    return 0;
  }

  var staves = [];

  /* ============================================================
     BUILD
     ============================================================ */
  function collect() {
    staves = $$('.stave').map(function (el) {
      var mode = el.dataset.mode || 'time';
      var st = {
        el: el, id: el.dataset.id, mode: mode,
        t0: mode === 'time' ? T(el.dataset.t0) : null,
        t1: mode === 'time' ? T(el.dataset.t1) : null,
        h: parseFloat(el.dataset.h) || 1000,
        H: parseFloat(el.dataset.h) || 1000,
        grid: parseFloat(el.dataset.grid) || 0,
        axis: $('.axis', el),
        lanes: $$('.lane', el),
        blocks: $$('.blk', el),
        join: $('.joinmark', el)
      };
      st.blocks.forEach(function (b) {
        if (b.dataset.p !== undefined) b._f = parseFloat(b.dataset.p);
        else if (b.dataset.a !== undefined) b._f = altFrac(parseFloat(b.dataset.a));
        else if (b.dataset.t) b._f = null; // resolved from time
        b._t = b.dataset.t ? T(b.dataset.t) : null;
      });
      return st;
    });
  }

  function frac(st, b) {
    if (b._f !== null && b._f !== undefined) return clamp(b._f, 0, 1);
    if (st.mode === 'time' && b._t !== null) return clamp((b._t - st.t0) / (st.t1 - st.t0), 0, 1);
    return 0;
  }

  /* ---------- toggles ----------
     Collapsed prose is hidden with `hidden="until-found"`, never display:none,
     so browser find-in-page still reaches it and reveals it (beforematch).
     A quarter of the article used to be invisible to Ctrl+F. */
  function wireToggles() {
    $$('.blk').forEach(function (b) {
      var more = $('.blk-more', b);
      var tg = $('.blk-toggle', b);
      if (!tg) return;
      if (!more) { b.dataset.open = '0'; return; }
      b.dataset.open = '0';
      more.setAttribute('hidden', 'until-found');
      if (!more.id) more.id = 'more-' + (++moreSeq);
      tg.setAttribute('role', 'button');
      tg.setAttribute('tabindex', '0');
      tg.setAttribute('aria-expanded', 'false');
      tg.setAttribute('aria-controls', more.id);
      var ex = $('.ex', tg);
      function paint(openNow) {
        b.dataset.open = openNow ? '1' : '0';
        tg.setAttribute('aria-expanded', openNow ? 'true' : 'false');
        if (openNow) more.removeAttribute('hidden');
        else more.setAttribute('hidden', 'until-found');
        if (ex) ex.textContent = (openNow ? '−' : '+') + ex.textContent.slice(1);
      }
      b._setOpen = paint;
      var toggle = function () { paint(b.dataset.open !== '1'); relayout(); };
      tg.addEventListener('click', toggle);
      tg.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
      // find-in-page landed inside the collapsed prose: adopt the open state
      more.addEventListener('beforematch', function () { paint(true); relayout(); });
    });
  }
  var moreSeq = 0;

  /* ============================================================
     LAYOUT — desktop
     ============================================================ */
  function layout() {
    if (window.innerWidth <= MOBILE) return layoutMobile();
    document.body.classList.remove('is-mobile');

    staves.forEach(function (st) {
      // restore lanes if returning from mobile
      var mcol = $('.mcol', st.el);
      if (mcol) {
        st.blocks.forEach(function (b) {
          var lane = st.lanes.filter(function (l) { return l.dataset.lane === b.dataset.lane; })[0];
          if (lane) lane.appendChild(b);
        });
        mcol.remove();
      }

      var H = st.h;
      var byLane = st.lanes.map(function (lane) {
        return { lane: lane, blocks: st.blocks.filter(function (b) { return b.parentNode === lane; }) };
      });
      byLane.forEach(function (g) {
        g.blocks.sort(function (a, b) { return frac(st, a) - frac(st, b); });
      });

      // clear ties before measuring
      $$('.tie', st.el).forEach(function (t) { t.remove(); });
      st.blocks.forEach(function (b) { b.classList.remove('tied'); b.style.top = '0px'; });

      // The time mapping uses `range`. Growth responds only to blocks being
      // *displaced* past the end of the range — never to the last block's own
      // height, which simply hangs below the final instant.
      var range = st.h - PAD_TOP - PAD_BOT, pass = 0, bottom = 0;
      while (pass < 8) {
        st.el.style.height = (PAD_TOP + range + PAD_BOT) + 'px';
        var over = 0; bottom = 0;
        byLane.forEach(function (g) {
          var prev = 0, lastTop = PAD_TOP;
          g.blocks.forEach(function (b) {
            var trueY = PAD_TOP + frac(st, b) * range;
            var y = Math.max(trueY, prev);
            b._trueY = trueY; b._y = y;
            prev = y + b.offsetHeight + GAP;
            lastTop = y;
            if (prev - GAP > bottom) bottom = prev - GAP;
          });
          var ov = lastTop - (PAD_TOP + range);
          if (ov > over) over = ov;
        });
        if (over <= 0.5) break;
        range += over + 4;
        pass++;
      }
      st.range = range;
      H = Math.max(PAD_TOP + range + PAD_BOT, bottom + PAD_BOT);
      st.H = H;
      st.el.style.height = H + 'px';

      // commit positions + ties
      st.blocks.forEach(function (b) {
        b._h = b.offsetHeight;
        b.style.top = b._y + 'px';
        if (b._y - b._trueY > 4) {
          b.classList.add('tied');
          var tie = document.createElement('i');
          tie.className = 'tie';
          tie.style.top = b._trueY + 'px';
          tie.style.height = (b._y - b._trueY) + 'px';
          b.parentNode.insertBefore(tie, b);
        }
      });

      drawGaps(st, byLane);
      drawAxis(st);
      drawLOS(st);
      drawShifts(st);
      if (st.join) {
        var f = clamp((T(st.join.dataset.t) - st.t0) / (st.t1 - st.t0), 0, 1);
        st.join.style.top = (PAD_TOP + f * st.range) + 'px';
      }
      if (st.mode === 'alt') drawGauge(st);
    });

    // cache document positions once every stave has its final height
    staves.forEach(function (st) {
      var r = st.el.getBoundingClientRect();
      st.top = r.top + window.scrollY;
      st.bot = st.top + st.H;
      st.mv = st.el.closest('.movement');
    });

    drawFork();
    drawDisperse();
    buildMap();
    onScroll();
  }

  /* ---------- measured silence: every long gap states its own duration ---------- */
  function fmtDur(ms) {
    var s2 = Math.round(ms / 1000);
    var d = Math.floor(s2 / 86400); s2 -= d * 86400;
    var h = Math.floor(s2 / 3600); s2 -= h * 3600;
    var m = Math.floor(s2 / 60);
    var out = [];
    if (d) out.push(d + ' d');
    if (h) out.push(h + ' h');
    if (m || (!d && !h)) out.push(m + ' min');
    return out.join(' ');
  }
  function drawGaps(st, byLane) {
    $$('.gapmark', st.el).forEach(function (e) { e.remove(); });
    var MINGAP = 300;
    byLane.forEach(function (g) {
      if (!g.blocks.length) return;
      // never print a fall in feet for a lane the source gives no altitude for
      if (st.mode === 'alt' && !g.blocks.some(function (b) { return b.dataset.a !== undefined; })) return;
      var endCap = Infinity;
      if (g.lane.dataset.ruleEnd && st.mode === 'time') {
        endCap = PAD_TOP + clamp((T(g.lane.dataset.ruleEnd) - st.t0) / (st.t1 - st.t0), 0, 1) * st.range;
      }
      var marks = [];
      var prevBot = PAD_TOP, prevF = 0;
      g.blocks.forEach(function (b) {
        if (b._y - prevBot > MINGAP) marks.push([prevBot, b._y, prevF, frac(st, b)]);
        prevBot = b._y + b.offsetHeight;
        prevF = frac(st, b);
      });
      var endY = PAD_TOP + st.range;
      if (endY - prevBot > MINGAP) marks.push([prevBot, endY, prevF, 1]);
      marks.forEach(function (m) {
        if (m[0] > endCap) return;
        var d = document.createElement('div');
        d.className = 'gapmark';
        d.style.top = ((m[0] + m[1]) / 2 - 7) + 'px';
        if (st.mode === 'time') d.textContent = fmtDur((m[3] - m[2]) * (st.t1 - st.t0));
        else d.textContent = commas(Math.round(fracAlt(m[2]) - fracAlt(m[3]))) + ' ft';
        g.lane.appendChild(d);
      });
    });
  }

  /* ---------- axis ticks + faint grid ---------- */
  function drawAxis(st) {
    var ax = st.axis; if (!ax) return;
    $$('.gt', ax).forEach(function (e) { e.remove(); });
    $$('.gridline', st.el).forEach(function (e) { e.remove(); });
    var range = st.range;
    var frag = document.createDocumentFragment();

    function tick(y, label, cls) {
      var d = document.createElement('div');
      d.className = 'gt' + (cls ? ' ' + cls : '');
      d.style.top = y + 'px';
      d.textContent = label;
      frag.appendChild(d);
      var g = document.createElement('div');
      g.className = 'gridline' + (cls === 'day' ? ' day' : '');
      g.style.top = y + 'px';
      st.el.appendChild(g);
    }

    if (st.mode === 'time' && st.grid) {
      var t = Math.ceil(st.t0 / st.grid) * st.grid;
      var big = st.grid >= 21600000;
      for (; t <= st.t1; t += st.grid) {
        var f = (t - st.t0) / (st.t1 - st.t0);
        var d = new Date(t);
        var isDay = d.getUTCHours() === 0 && d.getUTCMinutes() === 0;
        var label = isDay ? fmtDay(t) : (big ? fmtDay(t) + ' ' + fmtHM(t) : fmtHM(t));
        tick(PAD_TOP + f * range, label, isDay ? 'day' : '');
      }
    } else if (st.mode === 'alt') {
      (st.el.dataset.ticks || '').split(',').forEach(function (raw) {
        raw = raw.trim(); if (!raw) return;
        var doc = /\*$/.test(raw);
        var a = parseFloat(raw);
        tick(PAD_TOP + altFrac(a) * range, commas(a) + ' ft', doc ? 'day' : '');
      });
      tick(PAD_TOP + range, '0', 'day');
    }
    ax.appendChild(frag);
  }

  /* ---------- loss of signal ---------- */
  function drawLOS(st) {
    st.lanes.forEach(function (lane) {
      $$('.seg,.losbg,.loslab,.terminus', lane).forEach(function (e) { e.remove(); });
      lane.classList.remove('los-managed');

      if (lane.dataset.ruleEnd) {
        var fe = clamp((T(lane.dataset.ruleEnd) - st.t0) / (st.t1 - st.t0), 0, 1);
        var ye = PAD_TOP + fe * st.range;
        lane.style.setProperty('--rulebot', (st.H - ye) + 'px');
        var term = document.createElement('i');
        term.className = 'terminus'; term.style.top = ye + 'px';
        lane.appendChild(term);
      }

      if (!lane.dataset.los || st.mode !== 'time') return;
      lane.classList.add('los-managed');
      var from = T(lane.dataset.losFrom);
      var range = st.range;
      var k = Math.max(0, Math.floor((st.t0 - from) / ORBIT));
      var cursorY = PAD_TOP, count = 0, runs = [];
      var frag = document.createDocumentFragment();

      function seg(y0, y1, dark) {
        if (y1 <= y0 + 0.2) return;
        var s = document.createElement('i');
        s.className = 'seg' + (dark ? ' dark' : '');
        s.style.top = y0 + 'px'; s.style.height = (y1 - y0) + 'px';
        frag.appendChild(s);
        if (dark) {
          var bg = document.createElement('i');
          bg.className = 'losbg';
          bg.style.top = y0 + 'px'; bg.style.height = (y1 - y0) + 'px';
          frag.appendChild(bg);
        }
      }

      for (; k < 400; k++) {
        var d0 = from + k * ORBIT, d1 = d0 + DARK;
        if (d0 > st.t1) break;
        if (d1 < st.t0) continue;
        var a = clamp((Math.max(d0, st.t0) - st.t0) / (st.t1 - st.t0), 0, 1);
        var b = clamp((Math.min(d1, st.t1) - st.t0) / (st.t1 - st.t0), 0, 1);
        var y0 = PAD_TOP + a * range, y1 = PAD_TOP + b * range;
        seg(cursorY, y0, false);
        seg(y0, y1, true);
        cursorY = y1; count++;
        runs.push([y0, y1]);
      }
      seg(cursorY, PAD_TOP + range, false);
      lane.appendChild(frag);

      /* Label the silence where it can actually be read: inside a dark run
         that no block occupies. Text and label never share pixels. */
      if (!count) return;
      var occupied = st.blocks.filter(function (b) { return b.parentNode === lane; })
        .map(function (b) { return [b._y - 6, b._y + b.offsetHeight + 6]; });
      function clear(y0, y1) {
        for (var i = 0; i < occupied.length; i++) {
          if (y1 > occupied[i][0] && y0 < occupied[i][1]) return false;
        }
        return true;
      }
      function put(y, text) {
        var l = document.createElement('div');
        l.className = 'loslab';
        l.style.top = y + 'px';
        l.textContent = text;
        lane.appendChild(l);
      }
      var labelled = 0;
      runs.forEach(function (r) {
        if (r[1] - r[0] < 40) return;
        var y = null;
        if (clear(r[0] + 6, r[0] + 30)) y = r[0] + 6;              // top of the dark run
        else if (clear(r[1] - 30, r[1] - 6)) y = r[1] - 28;        // or its foot
        if (y === null) return;
        put(y, '≈ NO CONTACT · FAR SIDE · 48 MIN');
        labelled++;
      });
      // every run too short or too crowded: state the rhythm once, in the clear
      if (!labelled && runs.length) {
        var last = runs[runs.length - 1];
        if (clear(last[1] + 2, last[1] + 26)) {
          put(last[1] + 4, '≈ ' + count + '× NO CONTACT · 48 MIN EACH');
        }
      }
    });
  }

  /* ---------- flight-director shift bands ---------- */
  function drawShifts(st) {
    st.lanes.forEach(function (lane) {
      $$('.shift,.shiftlab', lane).forEach(function (e) { e.remove(); });
      if (!lane.dataset.shift) return;
      var s = document.createElement('i');
      s.className = 'shift ' + lane.dataset.shift;
      s.style.top = (PAD_TOP - 8) + 'px';
      s.style.height = (st.H - PAD_TOP + 2) + 'px';
      lane.appendChild(s);
    });
  }

  /* ---------- propellant gauge (only decreases) ---------- */
  var gaugeMax = 0;
  function drawGauge(st) {
    var g = $('.gauge', st.el), f = $('.gaugefill', st.el);
    if (!g) return;
    var top = PAD_TOP, h = st.range;
    g.style.top = top + 'px'; g.style.height = h + 'px';
    f.style.top = top + 'px';
    $$('.gaugelab', st.el).forEach(function (e) { e.remove(); });
    var gl = document.createElement('div');
    gl.className = 'gaugelab';
    gl.style.top = (top - 15) + 'px';
    gl.style.left = '0px';
    gl.textContent = 'PROPELLANT';
    st.axis.appendChild(gl);
    st._gauge = { top: top, h: h, el: f };
  }

  /* ---------- the fork ---------- */
  function drawFork() {
    var box = $('#forkbox'), a = $('#fork-a'), b = $('#fork-b');
    if (!box || !a) return;
    var eag = $('#sp-eag'), col = $('#sp-col');
    var s4 = $('.stave[data-id="s4"]');
    if (!eag || !col || !s4) return;
    var br = box.getBoundingClientRect();
    var er = eag.getBoundingClientRect(), cr = col.getBoundingClientRect();
    var src = $('.lane.ap11', s4);
    var sr = src ? src.getBoundingClientRect() : er;
    var x0 = sr.left - br.left;
    var xe = er.left - br.left, xc = cr.left - br.left;
    var H = br.height;
    var svg = $('svg', box);
    svg.setAttribute('viewBox', '0 0 ' + br.width + ' ' + H);
    a.setAttribute('vector-effect', 'non-scaling-stroke');
    b.setAttribute('vector-effect', 'non-scaling-stroke');
    var xm = (xe + cr.right - br.left) / 2 - (cr.width / 2); // midpoint between the two lane rules
    xm = (xe + xc) / 2;
    var yl = H * 0.30, yf = H * 0.50;
    // lead-in: the single rule steps across from where it was, then forks
    a.setAttribute('d', 'M' + x0 + ',0 L' + x0 + ',' + (yl - 22) +
      ' C' + x0 + ',' + (yl - 4) + ' ' + xm + ',' + (yl - 18) + ' ' + xm + ',' + yl +
      ' L' + xm + ',' + yf +
      ' C' + xm + ',' + (yf + 34) + ' ' + xe + ',' + (H - 38) + ' ' + xe + ',' + H);
    b.setAttribute('d', 'M' + xm + ',' + yf + ' C' + xm + ',' + (yf + 34) + ' ' + xc + ',' + (H - 38) + ' ' + xc + ',' + H);
  }

  /* ---------- the dispersal ----------
     Every line here is a custody claim, so every line has to be one the rows
     below actually make. The sources are the four things the article says
     carried the objects — not the three staves, which would put the descent
     stage in Houston's hands. Order left→right so nothing crosses. */
  var DISPERSE = [
    ['SATURN V', 'the launch vehicle', ['IN SOLAR\nORBIT', 'ON THE ATLANTIC\nSEABED']],
    ['EAGLE', 'the lunar module', ['STILL ON\nTHE MOON', 'IN AN ORBIT\nNOBODY CAN FIND', 'LOST']],
    ['COLUMBIA', 'the command module', ['AT THE\nSMITHSONIAN', 'DISTRIBUTED']],
    ['HOUSTON', 'the ground', ['TAPED OVER']]
  ];

  function drawDisperse() {
    var svg = $('#disperse'); if (!svg) return;
    var w = svg.clientWidth || svg.getBoundingClientRect().width;
    var mob = w < MOBILE;
    var h = mob ? 176 : 224;
    if (!w) return;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.style.height = h + 'px';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var NS = 'http://www.w3.org/2000/svg';

    var flat = [];
    DISPERSE.forEach(function (s, si) { s[2].forEach(function (d) { flat.push([d, si]); }); });
    var n = flat.length;
    var padX = 10, span = w - padX * 2;
    var yTop = 52, yBot = h - (mob ? 40 : 46);

    // one source rail per carrier, centred over the destinations it owns
    var srcX = DISPERSE.map(function (s, si) {
      var own = flat.map(function (f, i) { return f[1] === si ? i : -1; }).filter(function (i) { return i >= 0; });
      var sum = own.reduce(function (a, i) { return a + (padX + span * ((i + 0.5) / n)); }, 0);
      return sum / own.length;
    });

    flat.forEach(function (f, i) {
      var x1 = padX + span * ((i + 0.5) / n), x0 = srcX[f[1]];
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', 'M' + x0 + ',' + yTop + ' C' + x0 + ',' + (yTop + 46) + ' ' + x1 + ',' + (yBot - 46) + ' ' + x1 + ',' + yBot);
      p.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(p);
      var t = document.createElementNS(NS, 'text');
      t.setAttribute('x', x1); t.setAttribute('y', yBot + 15);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('class', 'dest');
      f[0].split('\n').forEach(function (line, li) {
        var ts = document.createElementNS(NS, 'tspan');
        ts.setAttribute('x', x1);
        if (li) ts.setAttribute('dy', '12');
        ts.textContent = line;
        t.appendChild(ts);
      });
      svg.appendChild(t);
    });

    DISPERSE.forEach(function (s, si) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('class', 'main');
      p.setAttribute('d', 'M' + srcX[si] + ',' + (mob ? 22 : 36) + ' L' + srcX[si] + ',' + yTop);
      p.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(p);
      var t = document.createElementNS(NS, 'text');
      t.setAttribute('x', srcX[si]); t.setAttribute('y', 15);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('class', 'srclab');
      t.textContent = s[0];
      svg.appendChild(t);
      if (!mob) {
        var t2 = document.createElementNS(NS, 'text');
        t2.setAttribute('x', srcX[si]); t2.setAttribute('y', 29);
        t2.setAttribute('text-anchor', 'middle');
        t2.textContent = s[1];
        svg.appendChild(t2);
      }
    });
  }

  /* ---------- the thesis diagram (movement 0) ---------- */
  function drawThesis() {
    var svg = $('#thesis-svg'); if (!svg) return;
    var w = Math.round(svg.getBoundingClientRect().width) || 1240;
    var mob = w < MOBILE;
    var h = mob ? 158 : 190;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    svg.style.height = h + 'px';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var NS = 'http://www.w3.org/2000/svg';
    var T0 = Date.UTC(1969, 6, 16, 8, 0, 0), T1 = Date.UTC(1969, 6, 24, 17, 53, 0);
    var L = mob ? 4 : 128, R = w - 2;
    function X(t) { return L + (t - T0) / (T1 - T0) * (R - L); }

    function line(x1, y1, x2, y2, stroke, sw, dash) {
      var e = document.createElementNS(NS, 'line');
      e.setAttribute('x1', x1); e.setAttribute('y1', y1); e.setAttribute('x2', x2); e.setAttribute('y2', y2);
      e.setAttribute('stroke', stroke); e.setAttribute('stroke-width', sw || 1);
      e.setAttribute('vector-effect', 'non-scaling-stroke');
      if (dash) e.setAttribute('stroke-dasharray', dash);
      svg.appendChild(e); return e;
    }
    function path(d, stroke, sw) {
      var e = document.createElementNS(NS, 'path');
      e.setAttribute('d', d); e.setAttribute('fill', 'none');
      e.setAttribute('stroke', stroke); e.setAttribute('stroke-width', sw || 1);
      e.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(e); return e;
    }
    function txt(x, y, s, anchor, size, fill) {
      var e = document.createElementNS(NS, 'text');
      e.setAttribute('x', x); e.setAttribute('y', y);
      e.setAttribute('font-size', size || 9);
      e.setAttribute('text-anchor', anchor || 'start');
      if (fill) e.setAttribute('fill', fill);
      e.setAttribute('letter-spacing', '.5');
      e.textContent = s; svg.appendChild(e); return e;
    }

    var INK = '#1A1712', DIM = 'rgba(26,23,18,.28)', RED = '#BE2A17';
    var yH = 30, yE = 74, yC = 112;
    var xSplit = X(Date.UTC(1969, 6, 20, 17, 44, 0));
    var xJoin = X(Date.UTC(1969, 6, 21, 21, 35, 0));
    var xLaunch = X(LAUNCH), xEnd = X(Date.UTC(1969, 6, 24, 17, 53, 0));
    var xLand = X(Date.UTC(1969, 6, 20, 20, 17, 40));
    var xStep = X(Date.UTC(1969, 6, 21, 2, 56, 15));
    var xLoi = X(Date.UTC(1969, 6, 19, 17, 21, 50));
    var xLuna = X(Date.UTC(1969, 6, 21, 15, 50, 0));
    var xSplash = X(Date.UTC(1969, 6, 24, 16, 50, 35));

    // markers first, so the rules sit on top
    var marks = mob
      ? [[xSplit, 'SPLIT', 'end', 0], [xJoin, 'REJOIN', 'start', 0]]
      : [[xLaunch, 'LAUNCH 13:32:00', 'start', 0], [xLoi, 'LUNAR ORBIT', 'start', 1],
      [xSplit, 'THE SPLIT · 17:44:00', 'end', 0], [xStep, 'FIRST STEP', 'start', 1],
      [xJoin, 'REJOIN 21:35:00', 'start', 0], [xSplash, 'SPLASHDOWN', 'end', 1]];
    marks.forEach(function (m) {
      line(m[0], 10, m[0], 156, 'rgba(26,23,18,.11)', 1);
      txt(m[0] + (m[2] === 'end' ? -5 : 5), 10 + m[3] * 11, m[1], m[2], 8, 'rgba(26,23,18,.42)');
    });

    // day ticks
    for (var day = 16; day <= 24; day += (mob ? 2 : 1)) {
      var x = X(Date.UTC(1969, 6, day, 0, 0, 0));
      if (x < L || x > R) continue;
      line(x, 156, x, 162, DIM, 1);
      txt(x + 4, 176, 'Jul ' + day, 'start', 8.5, 'rgba(26,23,18,.35)');
    }

    // Houston: continuous
    line(xLaunch, yH, xEnd, yH, INK, 1.25);
    txt(mob ? L : 0, mob ? yH - 6 : yH + 3, 'HOUSTON', 'start', 8.5, 'rgba(26,23,18,.55)');

    // spacecraft: one line, forking at the split, rejoining
    path('M' + xLaunch + ',' + yE + ' L' + xSplit + ',' + yE, INK, 1.25);
    path('M' + xSplit + ',' + yE + ' C' + (xSplit + 14) + ',' + yE + ' ' + (xSplit + 14) + ',' + yC + ' ' + (xSplit + 30) + ',' + yC + ' L' + xJoin + ',' + yC, INK, 1.25);
    path('M' + xSplit + ',' + yE + ' L' + xJoin + ',' + yE, INK, 1.25);
    path('M' + xJoin + ',' + yC + ' C' + (xJoin + 14) + ',' + yC + ' ' + (xJoin + 14) + ',' + yE + ' ' + (xJoin + 30) + ',' + yE, INK, 1.25);
    path('M' + xJoin + ',' + yE + ' L' + xEnd + ',' + yE, INK, 1.25);

    txt(mob ? L : 0, mob ? yE - 6 : yE + 3, 'EAGLE + COLUMBIA', 'start', 8.5, 'rgba(26,23,18,.55)');
    if (!mob) {
      txt(xSplit + 36, yE - 7, 'EAGLE — ON THE SURFACE 21½ h', 'start', 8, 'rgba(26,23,18,.42)');
      txt(xSplit + 36, yC + 15, 'COLUMBIA — ALONE 27 h 51 m', 'start', 8, 'rgba(26,23,18,.42)');
    }

    // Luna 15 — the uninvited lane, in orbit before them and gone before the ascent
    var xL13 = L;
    line(xL13, yC + 30, xLuna, yC + 30, RED, 1.25);
    line(xLuna, yC + 25, xLuna, yC + 35, RED, 1.25);
    txt(xLuna - 6, yC + 24, 'CRASHED 15:50:00', 'end', 8, RED);
    txt(mob ? L : 0, mob ? yC + 24 : yC + 33, 'LUNA 15', 'start', 8.5, RED);
  }

  /* ============================================================
     MOBILE
     ============================================================ */
  function layoutMobile() {
    document.body.classList.add('is-mobile');
    staves.forEach(function (st) {
      st.el.style.height = 'auto';
      var mcol = $('.mcol', st.el);
      if (!mcol) { mcol = document.createElement('div'); mcol.className = 'mcol'; st.el.appendChild(mcol); }
      var list = st.blocks.slice().sort(function (a, b) { return frac(st, a) - frac(st, b); });
      list.forEach(function (b) { b.style.top = ''; mcol.appendChild(b); });
      $$('.tie,.seg,.losbg,.loslab,.gt,.gridline,.gapmark', st.el).forEach(function (e) { e.remove(); });
    });
    staves.forEach(function (st) {
      var r = st.el.getBoundingClientRect();
      st.top = r.top + window.scrollY;
      st.H = r.height; st.range = r.height;
      st.bot = st.top + st.H;
      st.mv = st.el.closest('.movement');
    });
    drawThesis();
    drawDisperse();
    var map = $('#map'); if (map) map.innerHTML = '';
    onScroll();
  }

  /* ============================================================
     MINIMAP — true time against page space
     ============================================================ */
  var mapState = null;
  function buildMap() {
    var box = $('#map'); if (!box) return;
    if (window.innerWidth <= MOBILE) { box.innerHTML = ''; mapState = null; return; }
    var w = box.clientWidth, h = box.clientHeight;
    if (!w || !h) return;
    var NS = 'http://www.w3.org/2000/svg';
    box.innerHTML = '';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    box.appendChild(svg);

    var top = 34, bot = h - 26;
    var xT = 21, xP = w - 13;
    var docH = document.documentElement.scrollHeight;
    var tMin = Date.UTC(1969, 6, 16, 8, 0, 0), tMax = Date.UTC(1969, 6, 24, 17, 53, 0);
    function yT(t) { return top + (t - tMin) / (tMax - tMin) * (bot - top); }
    function yP(y) { return top + (y / docH) * (bot - top); }

    function el(n, at, cls) {
      var e = document.createElementNS(NS, n);
      for (var k in at) e.setAttribute(k, at[k]);
      if (cls) e.setAttribute('class', cls);
      svg.appendChild(e); return e;
    }

    // day ticks on the true-time rail
    for (var d16 = 16; d16 <= 24; d16++) {
      var yd = yT(Date.UTC(1969, 6, d16, 0, 0, 0));
      if (yd < top || yd > bot) continue;
      el('line', { x1: xT - 4, y1: yd, x2: xT, y2: yd }, 'mm-day');
      el('text', { x: xT - 6, y: yd + 2.4, 'text-anchor': 'end' }, 'mm-lab').textContent = d16;
    }

    el('line', { x1: xT, y1: top, x2: xT, y2: bot }, 'mm-rail');
    el('line', { x1: xP, y1: top, x2: xP, y2: bot }, 'mm-rail');

    // off-clock page regions
    $$('.movement[data-clock="off"]').forEach(function (m) {
      var r = m.getBoundingClientRect();
      var a = yP(r.top + window.scrollY), b = yP(r.bottom + window.scrollY);
      el('line', { x1: xP, y1: a, x2: xP, y2: b }, 'mm-offclock');
    });

    staves.forEach(function (st) {
      var a, b;
      if (st.mode === 'time') { a = yT(st.t0); b = yT(st.t1); }
      else { a = yT(Date.UTC(1969, 6, 20, 17, 44, 0)); b = yT(Date.UTC(1969, 6, 20, 20, 17, 40)); }
      var c = yP(st.top), dd = yP(st.bot);
      el('line', { x1: xT, y1: a, x2: xP, y2: c }, 'mm-tie');
      el('line', { x1: xT, y1: b, x2: xP, y2: dd }, 'mm-tie');
      el('line', { x1: xT, y1: a, x2: xT, y2: Math.max(b, a + 1) }, 'mm-seg');
      el('line', { x1: xP, y1: c, x2: xP, y2: dd }, 'mm-seg');
      var hit = el('rect', { x: 0, y: c, width: w, height: Math.max(3, dd - c) }, 'mm-hit');
      hit.addEventListener('click', function () { window.scrollTo({ top: st.top - 90, behavior: 'auto' }); });
    });

    // Luna 15 — the only red on the map
    var yl = yT(Date.UTC(1969, 6, 21, 15, 50, 0));
    el('line', { x1: xT - 4, y1: yl, x2: xT + 4, y2: yl }, 'mm-alert');

    el('text', { x: 2, y: 12 }, 'mm-key').textContent = 'TIME';
    el('text', { x: w - 24, y: 12 }, 'mm-key').textContent = 'PAGE';
    el('text', { x: 2, y: 22 }, 'mm-lab').textContent = 'JUL';

    // viewport: a translucent band across the whole rail with two edge ticks —
    // not a hollow stroked box, which reads as a missing glyph
    var view = el('rect', { x: 0, y: top, width: w, height: 10 }, 'mm-view');
    var e1 = el('line', { x1: 0, y1: top, x2: w, y2: top }, 'mm-edge');
    var e2 = el('line', { x1: 0, y1: top + 10, x2: w, y2: top + 10 }, 'mm-edge');
    mapState = { view: view, e1: e1, e2: e2, yP: yP, docH: docH, top: top, bot: bot };
  }

  /* ============================================================
     SCROLL — the clock
     ============================================================ */
  var roUTC = $('#ro-utc'), roMET = $('#ro-met'), roAlt = $('#ro-alt'), roAltV = $('#ro-altv'), roOff = $('#ro-off');
  var roMV = $('#ro-mv'), progEl = $('#prog'), progMV = $('#prog .pmv');
  var movements = [];
  function collectMovements() { movements = $$('.movement'); }

  /* The reader must always know WHERE, not only WHEN. */
  var lastMV = null;
  function setWhere(mv) {
    if (!mv || mv === lastMV) return;   // between movements: hold the last name
    lastMV = mv;
    var no = mv ? (mv.dataset.no || '') : '';
    var nm = mv ? (mv.dataset.name || '') : '';
    var html = no ? '<b>' + no + '</b>' + nm : nm;
    if (roMV) roMV.innerHTML = html;
    if (progMV) progMV.innerHTML = html;
  }

  function setOff() {
    roUTC.textContent = '—— —— ——   ——:——:——';
    roMET.textContent = '———:——:——:——';
    roUTC.classList.add('off'); roMET.classList.add('off');
    roAlt.hidden = true;
    roOff.textContent = 'off the clock';
  }
  function setTime(t, held) {
    roUTC.textContent = fmtUTC(t);
    roMET.textContent = fmtMET(t);
    roUTC.classList.toggle('off', !!held); roMET.classList.toggle('off', !!held);
    roAlt.hidden = true;
    roOff.textContent = held ? 'clock held' : '';
  }

  function onScroll() {
    var y = window.scrollY;
    var play = y + window.innerHeight * 0.38;

    // which movement
    var mv = null;
    for (var j = 0; j < movements.length; j++) {
      var mr = movements[j].getBoundingClientRect();
      if (mr.top + y <= play && mr.bottom + y >= play) mv = movements[j];
    }
    setWhere(mv);
    if (progEl) {
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      progEl.style.setProperty('--pct', (dh > 0 ? clamp(y / dh, 0, 1) * 100 : 0).toFixed(2) + '%');
    }

    // between two movements (a silence band, an ink plate): hold the last
    // reading rather than blanking — the reader has not left the score.
    if (mv && mv.dataset.clock === 'off') {
      setOff();
    } else if (mv) {
      // staves belonging to this movement
      var mine = staves.filter(function (s) { return s.mv === mv; });
      var inside = null, before = null, after = null;
      mine.forEach(function (s) {
        if (play >= s.top && play <= s.bot) inside = s;
        else if (play > s.bot) before = s;
        else if (!after) after = s;
      });
      var st = inside || before || after || mine[0];
      if (!st) setOff();
      else if (st.mode === 'alt') {
        if (inside) {
          var fa = clamp((play - st.top - PAD_TOP) / st.range, 0, 1);
          roUTC.textContent = 'measured in feet';
          roMET.textContent = fmtMET(Date.UTC(1969, 6, 20, 20, 17, 40));
          roUTC.classList.add('off'); roMET.classList.add('off');
          roAlt.hidden = false;
          roAltV.textContent = commas(Math.round(fracAlt(fa))) + ' ft';
          roOff.textContent = '';
        } else setTime(Date.UTC(1969, 6, 20, 20, 17, 40), true);
      } else {
        var f = inside ? clamp((play - st.top - PAD_TOP) / st.range, 0, 1) : (before === st ? 1 : 0);
        setTime(st.t0 + f * (st.t1 - st.t0), !inside);
      }
    }

    // propellant gauge — never refills
    staves.forEach(function (s) {
      if (s.mode !== 'alt' || !s._gauge) return;
      var fr = clamp((play - s.top - PAD_TOP) / s.range, 0, 1);
      if (fr > gaugeMax) gaugeMax = fr;
      s._gauge.el.style.height = (gaugeMax * s._gauge.h) + 'px';
    });

    // minimap viewport
    if (mapState) {
      var a = mapState.yP(y), b = mapState.yP(y + window.innerHeight);
      var hh = Math.max(3, b - a);
      mapState.view.setAttribute('y', a);
      mapState.view.setAttribute('height', hh);
      mapState.e1.setAttribute('y1', a); mapState.e1.setAttribute('y2', a);
      mapState.e2.setAttribute('y1', a + hh); mapState.e2.setAttribute('y2', a + hh);
    }
  }

  /* ============================================================
     MOVEMENT INDEX
     A page 50 viewports tall has to be consultable, not only readable.
     Built from the movement heads themselves, so it cannot drift.
     ============================================================ */
  var idxEl = null, idxRows = [];
  function buildIndex() {
    idxEl = $('#idx'); if (!idxEl) return;
    var body = $('#idx .idxbody'); if (!body) return;
    body.innerHTML = '';
    idxRows = [];

    var heads = [];
    var pre = $('#m0 .mv-rule');
    if (pre) heads.push({ target: $('#m0'), n: '00', t: 'Before the clock', r: 'no time base', d: '—' });
    $$('.mvhead').forEach(function (mh) {
      var rng = $('.rng', mh);
      var lines = rng ? rng.innerHTML.split(/<br\s*\/?>/i).map(function (x) {
        var tmp = document.createElement('div'); tmp.innerHTML = x; return tmp.textContent.trim();
      }) : [];
      heads.push({
        target: mh.closest('.movement'),
        n: ($('.num', mh) || {}).textContent || '',
        t: ($('.ttl', mh) || {}).textContent || '',
        r: lines.slice(0, 2).join(' · '),
        d: lines[2] || ''
      });
    });

    heads.forEach(function (hd) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'idxrow';
      b.innerHTML = '<span class="n"></span><span class="t"></span><span class="r"></span><span class="d"></span>';
      $('.n', b).textContent = hd.n;
      $('.t', b).textContent = hd.t;
      $('.r', b).textContent = hd.r;
      $('.d', b).textContent = hd.d;
      b.addEventListener('click', function () {
        closeIndex();
        if (hd.target) window.scrollTo({ top: hd.target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'auto' });
      });
      body.appendChild(b);
      idxRows.push({ el: b, target: hd.target });
    });
  }

  function openIndex() {
    if (!idxEl) return;
    idxRows.forEach(function (r) { r.el.classList.toggle('here', r.target === lastMV); });
    idxEl.hidden = false;
    var btn = $('#idxbtn'); if (btn) btn.setAttribute('aria-expanded', 'true');
    var close = $('#idx .idxclose'); if (close) close.focus();
  }
  function closeIndex() {
    if (!idxEl) return;
    idxEl.hidden = true;
    var btn = $('#idxbtn'); if (btn) btn.setAttribute('aria-expanded', 'false');
  }
  function wireIndex() {
    buildIndex();
    ['#idxbtn', '#prog .pix'].forEach(function (sel) {
      var b = $(sel); if (b) b.addEventListener('click', openIndex);
    });
    var c = $('#idx .idxclose'); if (c) c.addEventListener('click', closeIndex);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && idxEl && !idxEl.hidden) closeIndex();
    });
  }

  /* ============================================================
     SOLO
     ============================================================ */
  function wireSolo() {
    var btns = $$('#solo button');
    function apply(v) {
      document.body.dataset.solo = v;
      $$('.lane').forEach(function (l) {
        var bodies = (l.dataset.body || '').split(/\s+/);
        l.classList.toggle('solo-on', !v || bodies.indexOf(v) > -1);
      });
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String((b.dataset.solo || '') === v)); });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.solo || ''); });
    });
    apply('');
  }

  /* ============================================================
     BOOT
     ============================================================ */
  var rafId = null;
  function relayout() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function () { rafId = null; layout(); });
  }

  function init() {
    collect();
    collectMovements();
    wireToggles();
    wireSolo();
    wireIndex();
    drawThesis();
    layout();
    window.addEventListener('scroll', onScroll, { passive: true });
    var lastW = window.innerWidth;
    window.addEventListener('resize', function () {
      if (Math.abs(window.innerWidth - lastW) < 2) return;
      lastW = window.innerWidth;
      relayout();
    });
    /* The browser can reveal `hidden="until-found"` content on its own — the
       find bar fires beforematch, but window.find() and printing do not.
       Blocks are absolutely positioned at their instant, so any growth we did
       not initiate has to be re-laid-out or the score overlaps itself. */
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function (entries) {
        var dirty = false;
        entries.forEach(function (e) {
          var b = e.target;
          if (b._h === undefined) return;
          if (Math.abs(b.offsetHeight - b._h) > 1) dirty = true;
          var more = $('.blk-more', b);
          if (more && b.dataset.open !== '1' && more.offsetHeight > 2 && b._setOpen) {
            b._setOpen(true); dirty = true;
          }
        });
        if (dirty) relayout();
      });
      $$('.blk').forEach(function (b) { ro.observe(b); });
    }
    $$('img').forEach(function (im) {
      if (!im.complete) im.addEventListener('load', relayout, { once: true });
    });
    window.addEventListener('load', relayout);
    $$('details').forEach(function (d) { d.addEventListener('toggle', relayout); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
