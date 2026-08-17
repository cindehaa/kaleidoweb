/* ══════════════════════════════════════════════════════════════════════
   DIVIDE BY EIGHT — the mechanism, executed.
   ----------------------------------------------------------------------
   Everything numeric on this page is computed here, at read time, by the
   arithmetic §3.2.1 of the paper specifies: a real matrix product, a real
   division by sqrt(d_k), a real softmax, a real weighted sum. Nothing is
   drawn to look plausible (§7.4).

   WHAT IS THE PAPER'S AND WHAT IS OURS
   The paper's:  d_k = 64. The divisor sqrt(d_k) = 8. h = 8 heads.
                 The composition Q K^T / sqrt(d_k) -> softmax -> V.
                 The mask, set to -inf before the softmax.
                 PE(pos,2i) = sin(pos/10000^(2i/d_model)).
   Ours:         the sentence, the embeddings, and the projection matrices.
                 They are not trained. They are drawn from the distribution
                 the paper's own footnote 1 assumes when it explains the
                 divisor: "assume the components of q and k are independent
                 random variables with mean 0 and variance 1" (p16). So the
                 toy on this page is the footnote's own model, executed —
                 which is why its dot products come out with a standard
                 deviation of about 8, and why dividing by 8 does what the
                 paper says it does.
   ══════════════════════════════════════════════════════════════════════ */
'use strict';

/* ── deterministic noise. Same page, same numbers, every load. ─────── */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function gaussian(rnd) {                       // Box-Muller, mean 0 variance 1
  let u = 0, v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function vec(seed, d, scale) {
  const r = mulberry32(seed), a = new Float64Array(d);
  for (let i = 0; i < d; i++) a[i] = gaussian(r) * (scale || 1);
  return a;
}
function matmulVec(x, W, d) {                  // x (d) times W (d x d)
  const o = new Float64Array(d);
  for (let c = 0; c < d; c++) { let s = 0; for (let r = 0; r < d; r++) s += x[r] * W[r * d + c]; o[c] = s; }
  return o;
}
function dot(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }

/* ── the model ─────────────────────────────────────────────────────── */
const TOK = ['the', 'cat', 'the', 'dog', 'chased', 'ran', 'into', 'the', 'garden'];
const N = TOK.length;
const DK = 64;                                  // p20: d_k = d_v = d_model/h = 512/8 = 64
const H = 8;                                    // p20: h = 8 parallel attention heads
const HEAD_HEX = ['#1F77B4', '#FF7E0E', '#2C9F2C', '#D52728', '#9367BC', '#8B554A', '#E277C2', '#7E7E7E'];
const HEAD_RGB = HEAD_HEX.map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)));

/* eq19 / eq20, at the width of one head. The paper writes them at
   d_model; we evaluate them at 64 because that is the width of the
   vectors on this page, and the formula does not change. */
function PE(pos, d) {
  const p = new Float64Array(d);
  for (let i = 0; i < d; i += 2) {
    const w = Math.pow(10000, i / d);
    p[i] = Math.sin(pos / w);
    if (i + 1 < d) p[i + 1] = Math.cos(pos / w);
  }
  return p;
}

const EMB = TOK.map((t) => vec(hash('emb|' + t), DK));   // same string -> same vector
const PEV = TOK.map((_, i) => PE(i, DK));
const PROJ = [];                                          // per head: W_Q, W_K, W_V
for (let h = 0; h < H; h++) {
  const s = 1 / Math.sqrt(DK);
  PROJ.push({
    q: vec(hash('WQ|' + h), DK * DK, s),
    k: vec(hash('WK|' + h), DK * DK, s),
    v: vec(hash('WV|' + h), DK * DK, s),
  });
}

const cache = new Map();
function head(h, pe) {
  const key = h + '|' + (pe ? 1 : 0);
  if (cache.has(key)) return cache.get(key);
  const x = EMB.map((e, i) => {
    if (!pe) return e;
    const o = new Float64Array(DK);
    for (let c = 0; c < DK; c++) o[c] = e[c] + PEV[i][c];
    return o;
  });
  const P = PROJ[h];
  const q = x.map((v) => matmulVec(v, P.q, DK));
  const k = x.map((v) => matmulVec(v, P.k, DK));
  const v = x.map((vv) => matmulVec(vv, P.v, DK));
  const logits = [];
  for (let i = 0; i < N; i++) { const row = new Float64Array(N); for (let j = 0; j < N; j++) row[j] = dot(q[i], k[j]); logits.push(row); }
  const o = { x, q, k, v, logits };
  cache.set(key, o);
  return o;
}
function softmaxRow(row, div, masked, i) {
  const s = new Float64Array(N); let mx = -Infinity;
  for (let j = 0; j < N; j++) { s[j] = (masked && j > i) ? -Infinity : row[j] / div; if (s[j] > mx) mx = s[j]; }
  let sum = 0; const w = new Float64Array(N);
  for (let j = 0; j < N; j++) { w[j] = s[j] === -Infinity ? 0 : Math.exp(s[j] - mx); sum += w[j]; }
  for (let j = 0; j < N; j++) w[j] /= sum;
  return { scaled: s, w };
}
function weights(h, div, masked, pe) {
  const H0 = head(h, pe), W = [];
  for (let i = 0; i < N; i++) W.push(softmaxRow(H0.logits[i], div, masked, i).w);
  return W;
}
function stdevOfLogits(h) {
  const L = head(h, false).logits; let n = 0, s = 0, s2 = 0;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { s += L[i][j]; s2 += L[i][j] * L[i][j]; n++; }
  return Math.sqrt(s2 / n - (s / n) * (s / n));
}

/* ── shared state ──────────────────────────────────────────────────── */
const S = {
  qi: 4,            // the query token (index 4 = "chased")
  kj: 1,            // the key being spelled out in full
  h: 0,             // which head
  div: 8,           // the divisor. The paper's is sqrt(d_k) = 8.
  masked: false,
  lines: false,     // numeric matrix <-> the rotated bipartite view
  pe: false,
  paused: false,
};
const listeners = [];
function onchange(fn) { listeners.push(fn); fn(); }
function change(patch) { Object.assign(S, patch); listeners.forEach((f) => f()); }

const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
/* Neither Latin Modern's cut nor the STIX subset carries U+2212, and a
   hyphen is not a minus. So the minus is drawn, at the weight of the
   face it sits in, the way the radical and the infinity are drawn. */
const MINUS = '<span class="mn"></span>';
const INF = '<svg class="inf" viewBox="0 0 48 24" aria-label="infinity"><path d="M24,12 C20,3 6,3 6,12 C6,21 20,21 24,12 C28,3 42,3 42,12 C42,21 28,21 24,12 Z"/></svg>';
const f2 = (x) => (x < 0 ? MINUS : '') + Math.abs(x).toFixed(2);
const f3 = (x) => (x < 0 ? MINUS : '') + Math.abs(x).toFixed(3);
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══ token rows ═══════════════════════════════════════════════════════ */
function tokenRow(el, role) {
  el.innerHTML = '';
  TOK.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'tok' + (TOK.filter((x) => x === t).length > 1 ? ' dup' : '');
    b.innerHTML = t + '<span class="ix">' + i + '</span>';
    b.addEventListener('click', () => change(role === 'k' ? { kj: i } : { qi: i }));
    el.appendChild(b);
  });
  listeners.push(() => {
    $$('.tok', el).forEach((b, i) => b.setAttribute('aria-pressed', String(i === (role === 'k' ? S.kj : S.qi))));
  });
}

/* ══ MOVEMENT 1 — the tokens, and their three vectors ════════════════ */
function station1() {
  tokenRow($('#tok1'), 'q');
  const box = $('#vecs');
  listeners.push(() => {
    const h = head(S.h, S.pe);
    const rows = [['q', h.q[S.qi]], ['k', h.k[S.qi]], ['v', h.v[S.qi]]];
    box.innerHTML = rows.map(([lb, v]) =>
      '<div class="vec"><span class="lb">' + lb + '<sub>' + S.qi + '</sub></span> &nbsp;' +
      Array.from(v.slice(0, 4)).map(f2).join('&nbsp; ') +
      ' <span class="lb">… 64 components</span></div>').join('');
  });
  // the three identical tokens, checked rather than asserted
  const h0 = head(0, false);
  let worst = 0;
  for (const [a, b] of [[0, 2], [0, 7], [2, 7]]) for (let c = 0; c < DK; c++) worst = Math.max(worst, Math.abs(h0.k[a][c] - h0.k[b][c]));
  $('#dupdiff').textContent = worst.toFixed(1);
}

/* ══ MOVEMENT 2 — one dot product, spelled out ═══════════════════════ */
function station2() {
  tokenRow($('#tok2'), 'k');
  const ar = $('#arith'), strip = $('#logitstrip');
  listeners.push(() => {
    const h = head(S.h, S.pe);
    const q = h.q[S.qi], k = h.k[S.kj];
    const terms = [];
    for (let c = 0; c < 4; c++) terms.push(f2(q[c]) + '×' + f2(k[c]));
    const tot = h.logits[S.qi][S.kj];
    ar.innerHTML =
      '<div class="ln">q<sub>' + S.qi + '</sub> · k<sub>' + S.kj + '</sub> &nbsp;=&nbsp; ' +
      terms.join(' &nbsp;+&nbsp; ') + ' &nbsp;+&nbsp; <span class="pale">… 60 more</span></div>' +
      '<div class="ln"><span class="tot">= ' + f2(tot) + '</span></div>';
    let out = '<table class="mat"><tbody><tr>';
    for (let j = 0; j < N; j++) out += '<th>' + TOK[j] + '</th>';
    out += '</tr><tr>';
    for (let j = 0; j < N; j++) out += '<td' + (j === S.kj ? ' class="on"' : '') + ' style="' + (j === S.kj ? 'box-shadow:inset 0 0 0 3px #000' : '') + '">' + f2(h.logits[S.qi][j]) + '</td>';
    out += '</tr></tbody></table>';
    strip.innerHTML = out;
    $$('#m2 .qname').forEach((e) => { e.textContent = TOK[S.qi]; });
  });
  const sds = []; for (let h = 0; h < H; h++) sds.push(stdevOfLogits(h));
  $('#sdlo').textContent = Math.min.apply(null, sds).toFixed(1);
  $('#sdhi').textContent = Math.max.apply(null, sds).toFixed(1);
}

/* ══ MOVEMENT 3 — the divisor ════════════════════════════════════════ */
function station3() {
  const sl = $('#divsl'), field = $('#field'), val = $('#divval');
  // nine rows of nine bars, at a fixed scale: the full 78px is a weight
  // of 1, so the rows are comparable to each other and across divisors.
  const FH = matchMedia('(max-width:900px)').matches ? 52 : 62;
  field.innerHTML =
    '<div class="fhead"><span class="fl"></span><span class="fbars">' +
    TOK.map((t) => '<span class="fk">' + t + '</span>').join('') + '</span></div>' +
    TOK.map((t, i) =>
      '<div class="frow" data-i="' + i + '"><span class="fl">' + t + '</span><span class="fbars">' +
      Array.from({ length: N }).map(() => '<span class="fbar"></span>').join('') + '</span></div>').join('') +
    '<div class="funif"><span class="fl"></span><span class="fu app">' +
    'the dashed line is 1/9 — the weight every token would carry if the row were flat</span></div>';
  const bars = $$('.frow', field).map((r) => $$('.fbar', r));
  sl.addEventListener('input', () => change({ div: +sl.value }));
  listeners.push(() => {
    const W = weights(S.h, S.div, false, S.pe);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) bars[i][j].style.height = Math.max(1, FH * W[i][j]) + 'px';
    $$('.frow', field).forEach((r, i) => r.classList.toggle('self', i === S.qi));
    if (+sl.value !== S.div) sl.value = S.div;
    val.textContent = S.div;
    // how much of one row's mass sits on its single largest token
    const row = Array.from(W[S.qi]).sort((a, b) => b - a);
    let n = 0, m = 0; while (m < 0.9 && n < N) { m += row[n]; n++; }
    $('#topmass').textContent = (100 * row[0]).toFixed(0);
    $('#ninety').textContent = n;
    $('#divnote').textContent = S.div === 8 ? 'the paper’s divisor' : (S.div === 1 ? 'no scaling at all' : 'ours, not the paper’s');
  });
}

/* ══ MOVEMENT 4 — the mask ═══════════════════════════════════════════ */
function station4() {
  const t = $('#masktog');
  t.addEventListener('click', () => change({ masked: !S.masked }));
  const wrap = $('#maskmat');
  listeners.push(() => {
    t.setAttribute('aria-pressed', String(S.masked));
    t.querySelector('.lbl').textContent = S.masked ? 'masking on' : 'masking off';
    const h = head(S.h, S.pe);
    let out = '<table class="mat"><tbody><tr><th class="rowh"></th>';
    for (let j = 0; j < N; j++) out += '<th>' + TOK[j] + '</th>';
    out += '</tr>';
    for (let i = 0; i < N; i++) {
      out += '<tr><th class="rowh">' + TOK[i] + '</th>';
      for (let j = 0; j < N; j++) {
        const m = S.masked && j > i;
        out += '<td class="' + (m ? 'masked' : '') + '">' + (m ? MINUS + INF : f2(h.logits[i][j] / S.div)) + '</td>';
      }
      out += '</tr>';
    }
    wrap.innerHTML = out + '</tbody></table>';
    const W = weights(S.h, S.div, S.masked, S.pe);
    $('#firstrow').textContent = W[0].map((x) => x.toFixed(2)).join('  ');
  });
}

/* ══ MOVEMENT 5 — the distribution, and the paper's own picture ══════ */
function station5() {
  const tog = $('#viewtog'), wrap = $('#weightview');
  tog.addEventListener('click', () => change({ lines: !S.lines }));
  listeners.push(() => {
    tog.setAttribute('aria-pressed', String(S.lines));
    tog.querySelector('.lbl').textContent = S.lines ? 'as lines' : 'as numbers';
    const W = weights(S.h, S.div, S.masked, S.pe);
    if (!S.lines) {
      let out = '<table class="mat heat"><tbody><tr><th class="rowh"></th>';
      for (let j = 0; j < N; j++) out += '<th>' + TOK[j] + '</th>';
      out += '</tr>';
      for (let i = 0; i < N; i++) {
        out += '<tr' + (i === S.qi ? ' class="on"' : '') + '><th class="rowh">' + TOK[i] + '</th>';
        // The cell carries the colour of the head that produced it, faded
        // toward the page by its own weight — which is how the authors'
        // own Figures 3-5 draw a head's weights (§0.3: the non-subject
        // heads survive in those PDFs as alpha-faded tints of the same
        // eight values). Grey here would make the numeric view and the
        // line view two different pictures of one row.
        const hc = HEAD_RGB[S.h];
        for (let j = 0; j < N; j++) {
          const w = W[i][j], t = Math.min(1, w * 2.2);
          const r = Math.round(255 + (hc[0] - 255) * t), g2 = Math.round(255 + (hc[1] - 255) * t), b2 = Math.round(255 + (hc[2] - 255) * t);
          const lum = 0.299 * r + 0.587 * g2 + 0.114 * b2;
          out += '<td style="background:rgb(' + r + ',' + g2 + ',' + b2 + ')"><span style="color:' + (lum < 132 ? '#fff' : '#000') + '">' + w.toFixed(2) + '</span></td>';
        }
        out += '</tr>';
      }
      wrap.innerHTML = out + '</tbody></table>';
    } else {
      wrap.innerHTML = bipartite(W, S.h, S.qi);
    }
    $('#sumcheck').textContent = Array.from(W[S.qi]).reduce((a, b) => a + b, 0).toFixed(6);
  });
}

/* the authors set their attention pictures rotated 90 degrees: two
   columns of tokens read bottom-to-top, with lines between them and
   the weight carried by opacity in the head's own colour. Ours is the
   same construction over our own numbers. */
function bipartite(W, h, qi) {
  const rowH = 34, pad = 26, w = 560, hgt = N * rowH + pad * 2;
  const col = HEAD_HEX[h];
  let s = '<svg viewBox="0 0 ' + w + ' ' + hgt + '" width="100%" style="max-width:' + w + 'px" role="img" aria-label="Attention weights of the selected query, drawn as lines">';
  for (let i = 0; i < N; i++) {
    const y = pad + (N - 1 - i) * rowH + rowH / 2;
    s += '<text x="150" y="' + (y + 5) + '" text-anchor="end" font-family="LM,serif" font-size="17" fill="#202020">' + TOK[i] + '</text>';
    s += '<text x="410" y="' + (y + 5) + '" font-family="LM,serif" font-size="17" fill="#202020">' + TOK[i] + '</text>';
  }
  for (let j = 0; j < N; j++) {
    const y1 = pad + (N - 1 - qi) * rowH + rowH / 2, y2 = pad + (N - 1 - j) * rowH + rowH / 2;
    const a = W[qi][j];
    if (a < 0.004) continue;
    s += '<line x1="162" y1="' + y1 + '" x2="398" y2="' + y2 + '" stroke="' + col + '" stroke-width="' + (1 + 7 * a).toFixed(2) + '" opacity="' + Math.min(1, .12 + a * 2.4).toFixed(3) + '"/>';
  }
  s += '</svg>';
  return s;
}

/* ══ MOVEMENT 6 — the weighted sum ═══════════════════════════════════ */
function station6() {
  const out = $('#blend');
  listeners.push(() => {
    const hh = head(S.h, S.pe), W = weights(S.h, S.div, S.masked, S.pe)[S.qi];
    let o = 0; for (let j = 0; j < N; j++) o += W[j] * hh.v[j][0];
    let s = '<div class="ln">out<sub>' + S.qi + '</sub>[0] &nbsp;=&nbsp; ';
    s += Array.from({ length: 3 }).map((_, j) => W[j].toFixed(2) + '×' + f2(hh.v[j][0])).join(' &nbsp;+&nbsp; ');
    s += ' &nbsp;+&nbsp; <span class="pale">… 6 more</span></div>';
    s += '<div class="ln"><span class="tot">= ' + f2(o) + '</span></div>';
    out.innerHTML = s;
    const mx = Math.max.apply(null, Array.from(W));
    $$('.bigtok').forEach((e) => { e.textContent = TOK[Array.from(W).indexOf(mx)]; });
    $$('.qname3').forEach((e) => { e.textContent = TOK[S.qi]; });
    $('#biggestw').textContent = (100 * mx).toFixed(0);
  });
}

/* ══ MOVEMENT 7 — eight of these at once ═════════════════════════════ */
function station7() {
  const sel = $('#headsel'), grid = $('#eight');
  HEAD_HEX.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'hd'; b.style.background = c;
    b.innerHTML = String(i + 1); b.title = 'head ' + (i + 1) + ' · ' + c;
    b.addEventListener('click', () => change({ h: i }));
    sel.appendChild(b);
  });
  grid.innerHTML = HEAD_HEX.map((c, h) =>
    '<figure class="mini" data-h="' + h + '"><svg viewBox="0 0 ' + (N * 12) + ' ' + (N * 12) + '" width="108" height="108" role="img" aria-label="head ' + (h + 1) + '"></svg>' +
    '<figcaption class="app" style="margin-top:5px">head ' + (h + 1) + ' · <span class="agree"></span></figcaption></figure>').join('');
  listeners.push(() => {
    $$('.hd', sel).forEach((b, i) => b.setAttribute('aria-pressed', String(i === S.h)));
    const tops = [];
    $$('.mini', grid).forEach((fg) => {
      const h = +fg.dataset.h, W = weights(h, S.div, S.masked, S.pe);
      let s = '';
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
        const a = Math.min(1, W[i][j] * 2.6);
        s += '<rect x="' + j * 12 + '" y="' + i * 12 + '" width="12" height="12" fill="' + HEAD_HEX[h] + '" opacity="' + a.toFixed(3) + '"/>';
      }
      $('svg', fg).innerHTML = s;
      const row = Array.from(W[S.qi]); const t = row.indexOf(Math.max.apply(null, row));
      tops.push(t);
      $('.agree', fg).textContent = TOK[t];
      $('svg', fg).style.outline = h === S.h ? '3px solid #000' : '1px solid #000';
    });
    $('#nagree').textContent = new Set(tops).size;
    $$('.qname2').forEach((e) => { e.textContent = TOK[S.qi]; });
  });
}

/* ══ MOVEMENT 8 — where the block sits in Figure 1 ═══════════════════ */
function station8() {
  const box = $('#fig1box');
  $$('#m8 .litbtn').forEach((b) => {
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') === 'true';
      $$('#m8 .litbtn').forEach((o) => o.setAttribute('aria-pressed', 'false'));
      $$('.lit', box).forEach((l) => l.classList.remove('on'));
      if (!on) { b.setAttribute('aria-pressed', 'true'); $('#lit-' + b.dataset.lit, box).classList.add('on'); }
    });
  });
}

/* ══ MOVEMENT 9 — place it, then look ════════════════════════════════ */
// Table 2, EN-DE column, as printed. `sd` is the label's side and `dy`
// its offset: six records on one plane, placed by hand, because two of
// the ensembles are 0.06 BLEU apart and no automatic rule reads better.
const T2 = [
  { m: 'GNMT + RL [38]', b: 24.6, c: 2.3e19, sd: 1, dy: 5 },
  { m: 'ConvS2S [9]', b: 25.16, c: 9.6e18, sd: 1, dy: 5 },
  { m: 'MoE [32]', b: 26.03, c: 2.0e19, sd: 1, dy: 19 },
  { m: 'GNMT + RL Ensemble [38]', b: 26.30, c: 1.8e20, sd: 1, dy: 5 },
  { m: 'ConvS2S Ensemble [9]', b: 26.36, c: 7.7e19, sd: -1, dy: -13 },
  { m: 'Transformer (big)', b: 28.4, c: 2.3e19, ours: true, sd: 1, dy: 5 },
];
const BASE = { m: 'Transformer (base model)', b: 27.3, c: 3.3e18, ours: true };

function station9() {
  const svg = $('#plane'); if (!svg) return;
  const W = 1000, HGT = 470, L = 92, R = 40, T = 26, B = 66;
  const x = (c) => L + (Math.log10(c) - 18) / 3 * (W - L - R);
  const y = (b) => T + (29 - b) / (29 - 23) * (HGT - T - B);
  let g = '';
  for (let d = 18; d <= 21; d++) {
    g += '<line class="grid" x1="' + x(Math.pow(10, d)) + '" y1="' + T + '" x2="' + x(Math.pow(10, d)) + '" y2="' + (HGT - B) + '"/>';
    g += '<text x="' + x(Math.pow(10, d)) + '" y="' + (HGT - B + 24) + '" text-anchor="middle">10<tspan baseline-shift="super" font-size="10">' + d + '</tspan></text>';
  }
  for (let b = 23; b <= 29; b++) {
    g += '<line class="grid" x1="' + L + '" y1="' + y(b) + '" x2="' + (W - R) + '" y2="' + y(b) + '"/>';
    g += '<text x="' + (L - 12) + '" y="' + (y(b) + 5) + '" text-anchor="end">' + b + '</text>';
  }
  g += '<text x="' + L + '" y="' + (HGT - 14) + '">training cost, floating-point operations —→</text>';
  g += '<text x="' + (L - 12) + '" y="' + (T - 8) + '" text-anchor="end">BLEU</text>';
  let recs = '';
  T2.forEach((r) => {
    recs += '<g class="rev' + (r.ours ? ' hid ours-g' : '') + '"><circle class="' + (r.ours ? 'ours' : 'rec') + '" cx="' + x(r.c) + '" cy="' + y(r.b) + '" r="5"/>' +
      '<text class="' + (r.ours ? 'big' : '') + '" text-anchor="' + (r.sd < 0 ? 'end' : 'start') + '" x="' +
      (x(r.c) + r.sd * 10) + '" y="' + (y(r.b) + r.dy) + '">' + r.m + '</text></g>';
  });
  recs += '<g class="rev hid ours-g"><circle class="ours" cx="' + x(BASE.c) + '" cy="' + y(BASE.b) + '" r="6"/>' +
    '<text class="big" x="' + (x(BASE.c) + 12) + '" y="' + (y(BASE.b) + 5) + '">Transformer (base) · 27.3 BLEU · 3.3·10<tspan baseline-shift="super" font-size="10">18</tspan></text></g>';
  const gx = x(6e19), gy = y(28.2);
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + HGT);
  svg.innerHTML = g + recs +
    '<line class="ax" x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (HGT - B) + '"/>' +
    '<line class="ax" x1="' + L + '" y1="' + (HGT - B) + '" x2="' + (W - R) + '" y2="' + (HGT - B) + '"/>' +
    '<g id="marker" transform="translate(' + gx + ',' + gy + ')" tabindex="0" role="slider" aria-label="your placement of the Transformer base model" style="cursor:grab">' +
    '<circle class="guess" r="11"/><text class="big" x="18" y="5">Transformer (base)</text></g>';

  const marker = $('#marker', svg);
  let px = gx, py = gy, revealed = false;
  const setPos = (cx, cy) => {
    px = Math.max(L, Math.min(W - R, cx)); py = Math.max(T, Math.min(HGT - B, cy));
    marker.setAttribute('transform', 'translate(' + px + ',' + py + ')');
    const cost = Math.pow(10, 18 + (px - L) / (W - L - R) * 3);
    const bleu = 29 - (py - T) / (HGT - T - B) * (29 - 23);
    const ex = Math.floor(Math.log10(cost)), mant = (cost / Math.pow(10, ex)).toFixed(1);
    $('#guessread').innerHTML = 'your placement: <span class="n">' + bleu.toFixed(1) +
      '</span> BLEU at <span class="n">' + mant + '</span>·10<sup>' + ex + '</sup> operations';
    return { cost, bleu };
  };
  let cur = setPos(gx, gy);
  const toSvg = (ev) => {
    const r = svg.getBoundingClientRect();
    return [(ev.clientX - r.left) / r.width * W, (ev.clientY - r.top) / r.height * HGT];
  };
  let dragging = false;
  const down = (e) => { if (revealed) return; dragging = true; marker.style.cursor = 'grabbing'; e.preventDefault(); };
  svg.addEventListener('pointerdown', (e) => { if (revealed) return; dragging = true; const [a, b] = toSvg(e); cur = setPos(a, b); svg.setPointerCapture(e.pointerId); });
  svg.addEventListener('pointermove', (e) => { if (!dragging || revealed) return; const [a, b] = toSvg(e); cur = setPos(a, b); });
  svg.addEventListener('pointerup', () => { dragging = false; });
  marker.addEventListener('pointerdown', down);
  marker.addEventListener('keydown', (e) => {
    if (revealed) return;
    const d = e.shiftKey ? 20 : 6;
    if (e.key === 'ArrowLeft') cur = setPos(px - d, py); else if (e.key === 'ArrowRight') cur = setPos(px + d, py);
    else if (e.key === 'ArrowUp') cur = setPos(px, py - d); else if (e.key === 'ArrowDown') cur = setPos(px, py + d);
    else return;
    e.preventDefault();
  });

  const reveal = () => {
    if (revealed) return; revealed = true;
    $$('.ours-g', svg).forEach((e) => e.classList.remove('hid'));
    marker.querySelector('.guess').setAttribute('stroke-dasharray', '4 4');
    marker.style.cursor = 'default';
    const ratio = cur.cost / BASE.c;
    $('#verdict').hidden = false;
    $('#revealbtn').hidden = true;
    $('#guessrow').hidden = true;
    $('#ratio').textContent = ratio >= 1 ? (ratio >= 10 ? Math.round(ratio) + '×' : ratio.toFixed(1) + '×') : (1 / ratio).toFixed(1) + '×';
    $('#ratioword').textContent = ratio >= 1 ? 'more expensive than' : 'cheaper than';
  };
  $('#revealbtn').addEventListener('click', reveal);
  $('#skipguess').addEventListener('click', reveal);
}

/* ══ ENVIRONMENT 1 — the opening. 81 dot products, then divided. ═════
   A canvas, 2D, no WebGL: this is the title's claim executed once and
   then left standing. The raw bars stay as an outline, so the final
   still carries the whole argument (§5.8 reduced-motion). */
function envOpening() {
  const cv = $('#envmat'); if (!cv) return;
  const ctx = cv.getContext('2d');
  const L = head(0, false).logits;
  const flat = []; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) flat.push(L[i][j]);
  const max = Math.max.apply(null, flat.map(Math.abs));
  let t0 = null, phase = 0, prog = 0, done = false;
  function draw(shown, shrink) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = cv.clientWidth, h = cv.clientHeight;
    if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const mid = h * 0.52, bw = (w - 2) / flat.length, amp = (h * 0.44) / max;
    ctx.strokeStyle = '#B9B9BB'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, mid + .5); ctx.lineTo(w, mid + .5); ctx.stroke();
    for (let i = 0; i < flat.length; i++) {
      if (i > shown) break;
      const x = 1 + i * bw, raw = flat[i] * amp;
      ctx.fillStyle = '#000';
      if (shrink > 0) {
        ctx.strokeStyle = '#C9C9CB'; ctx.lineWidth = 1;
        ctx.strokeRect(x + .5, mid - Math.max(raw, 0) + .5, Math.max(1, bw - 2), Math.abs(raw));
      }
      const v = raw / (1 + 7 * shrink);
      ctx.fillRect(x, mid - Math.max(v, 0), Math.max(1, bw - 2), Math.abs(v));
    }
  }
  if (REDUCED) { draw(flat.length, 1); return; }
  function frame(ts) {
    if (S.paused) { requestAnimationFrame(frame); return; }
    if (t0 === null) t0 = ts;
    const el = ts - t0;
    if (phase === 0) {
      prog = Math.min(1, el / 1500);
      draw(Math.floor(prog * flat.length), 0);
      if (prog >= 1) { phase = 1; t0 = ts; }
    } else if (phase === 1) {
      const p = Math.min(1, (ts - t0 - 350) / 900);
      const e = p <= 0 ? 0 : (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      draw(flat.length, e);
      if (p >= 1) { done = true; }
    }
    if (!done) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.addEventListener('resize', () => { if (done) draw(flat.length, 1); });
}

/* ══ ENVIRONMENT 2 — the coda. eq19/eq20, evaluated. ═════════════════
   The claim in the prose is "wavelengths in geometric progression from
   2*pi to 10000*2*pi", so the axes are chosen to make a progression
   visible: POSITION across, DIMENSION down, one row per sine dimension.
   The top row has a period of 2*pi positions and the bottom row has a
   period of 10000*2*pi, and between them the wave visibly lengthens.
   (Dimension against position, which is the usual plot, puts sin beside
   cos at every wavelength and returns a moire.)
   Colour: +1 is #1F77B4, -1 is #D52728, 0 is the page — cycle indices 0
   and 3 of the eight head colours measured out of the figure PDFs.
   It drifts one position per second; pausing it loses nothing. */
function envPositional() {
  const cv = $('#pefield'); if (!cv) return;
  const POS = [0x1F, 0x77, 0xB4], NEG = [0xD5, 0x27, 0x28];
  const D = 512;            // d_model, p28
  const ROWS = D / 2;       // the 256 sine dimensions; the cosines are the
  const P = 420;            // same wavelengths a quarter-cycle over
  const ctx = cv.getContext('2d');
  cv.width = P; cv.height = ROWS;
  const img = ctx.createImageData(P, ROWS);
  let off = 0, raf = 0, visible = false;
  function paint() {
    for (let r = 0; r < ROWS; r++) {
      const w = Math.pow(10000, (2 * r) / D);      // eq19: 10000^(2i/d_model)
      for (let p = 0; p < P; p++) {
        const val = Math.sin((p + off) / w);
        const k = (r * P + p) * 4, t = Math.abs(val);
        const c1 = val >= 0 ? POS : NEG;
        img.data[k] = Math.round(255 + (c1[0] - 255) * t);
        img.data[k + 1] = Math.round(255 + (c1[1] - 255) * t);
        img.data[k + 2] = Math.round(255 + (c1[2] - 255) * t);
        img.data[k + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }
  paint();
  let last = 0;
  function tick(ts) {
    raf = 0;
    if (!visible || S.paused || REDUCED) return;
    if (ts - last > 1000) { off += 1; paint(); last = ts; }
    raf = requestAnimationFrame(tick);
  }
  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible && !raf && !REDUCED) raf = requestAnimationFrame(tick);
  }, { threshold: 0.05 });
  io.observe(cv);
  listeners.push(() => { if (S.paused && raf) { cancelAnimationFrame(raf); raf = 0; } else if (visible && !raf && !REDUCED) raf = requestAnimationFrame(tick); });
}

/* ══ the coda's own arithmetic: what position buys ════════════════════ */
function coda() {
  const btn = $('#petog'); if (!btn) return;
  btn.addEventListener('click', () => change({ pe: !S.pe }));
  listeners.push(() => {
    btn.setAttribute('aria-pressed', String(S.pe));
    btn.querySelector('.lbl').textContent = S.pe ? 'positions added' : 'no positions';
    const W = weights(S.h, S.div, false, S.pe);
    let worst = 0;
    for (let j = 0; j < N; j++) worst = Math.max(worst, Math.abs(W[0][j] - W[2][j]), Math.abs(W[0][j] - W[7][j]));
    $('#pediff').textContent = worst.toFixed(3);
    const rows = [0, 2, 7];
    $('#perows').innerHTML = '<table class="mat"><tbody>' + rows.map((i) =>
      '<tr><th class="rowh">row ' + i + '</th>' + Array.from(W[i]).map((w) => '<td>' + w.toFixed(3) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
  });
}

/* ══ folds, chrome, pause ════════════════════════════════════════════ */
function folds() {
  $$('.fold').forEach((f) => {
    const b = $('button', f), body = $('.foldb', f);
    if (!b || !body) return;
    const id = body.id || ('fold-' + Math.random().toString(36).slice(2, 8));
    body.id = id; b.setAttribute('aria-controls', id); b.setAttribute('aria-expanded', 'false');
    const set = (open) => {
      if (open) body.removeAttribute('hidden'); else body.setAttribute('hidden', 'until-found');
      b.setAttribute('aria-expanded', String(open));
      $('.pm', b).textContent = open ? '−' : '+';
    };
    set(false);
    b.addEventListener('click', () => set(b.getAttribute('aria-expanded') !== 'true'));
    body.addEventListener('beforematch', () => set(true));
  });
}

/* §5.2 — one pause control per animated canvas, identical construction,
   docked bottom-left of the canvas. Both drive the same state, so
   pausing either pauses both and the two labels stay in agreement. */
function chrome() {
  const btns = $$('[data-pause]');
  btns.forEach((b) => b.addEventListener('click', () => change({ paused: !S.paused })));
  listeners.push(() => {
    btns.forEach((b) => {
      b.setAttribute('aria-pressed', String(S.paused));
      b.textContent = S.paused ? 'paused' : 'pause';
    });
  });
}

/* ── boot ─────────────────────────────────────────────────────────── */
function boot() {
  station1(); station2(); station3(); station4(); station5();
  station6(); station7(); station8(); station9(); coda();
  folds(); chrome();
  envOpening(); envPositional();
  listeners.forEach((f) => f());
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
