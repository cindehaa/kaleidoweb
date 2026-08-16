/* ══════════════════════════════════════════════════════════════════
   Nothing Before Seventy — Hokusai
   Sources: benchmarks/hokusai/{semantic,content-model}.json only.
   x = his age.  y = the register of his own eight-level scale that his
   age at the time falls into.  The wash left of seventy is his verdict.
   ══════════════════════════════════════════════════════════════════ */
(() => {
'use strict';

const BIRTH = 1760; // c. 31 October 1760 — "supposedly" (infobox), "unclear" (p3)

/* ---- his scale, verbatim, in the order he says it (colophon, 1834) ---- */
const REGS = [
  {age:6,   text:'I had a passion for copying the form of things'},
  {age:50,  text:'I have published many drawings'},
  {age:70,  text:'of all I drew by my seventieth year there is nothing worth taking into account', verdict:true},
  {age:73,  text:'I partly understood the structure of animals, birds, insects and fishes, and the life of grasses and plants'},
  {age:86,  text:'I shall progress further'},
  {age:90,  text:'I shall even further penetrate their secret meaning'},
  {age:100, text:'I shall perhaps truly have reached the level of the marvellous and divine'},
  {age:110, text:'each dot, each line will possess a life of its own'}
];
const regOf = a => { let r = 0; for (let i=0;i<REGS.length;i++) if (a >= REGS[i].age) r = i; return r; };

/* ---- works this article dates. Ages are derived; the working is shown. ---- */
// lo/hi = age range implied by the stated year(s) against a birth of c.1760.
// A single stated year y gives ages y-1761 .. y-1760 (his birthday falls 31 Oct).
const yr = (a,b) => [a-1761, (b||a)-1760];
const W = (o) => o;
const WORKS = [
  W({id:'w-kabuki', t:'Kabuki actor prints', sub:'his first published prints, under the name Shunrō',
     date:'1779', ages:yr(1779), src:'p6'}),
  W({id:'w-fireworks', t:'Fireworks in the Cool of Evening at Ryogoku Bridge in Edo', sub:'print',
     date:'c. 1788–89', ages:yr(1788,1789), src:'p6 · caption', img:'02-ryogoku-fireworks.jpg', iw:1280, ih:872}),
  W({id:'w-famous-sights', t:'Famous Sights of the Eastern Capital', sub:'collection of landscapes',
     date:'1800', ages:yr(1800), src:'p10'}),
  W({id:'w-eight-views', t:'Eight Views of Edo', sub:'collection of landscapes',
     date:'1800', ages:yr(1800), src:'p10'}),
  W({id:'w-daruma-edo', t:'Daruma portrait at the Edo festival', sub:'said to be 200 square metres, painted with a broom and buckets full of ink',
     date:'1804', ages:yr(1804), src:'p11'}),
  W({id:'w-chinsetsu', t:'Chinsetsu Yumiharizuki', sub:'Strange Tales of the Crescent Moon, with the novelist Takizawa Bakin',
     date:'1807–1811', ages:yr(1807,1811), src:'p12'}),
  W({id:'w-quick-lessons', t:'Quick Lessons in Simplified Drawing', sub:'the first of the art manuals — “a convenient way to make money and attract more students”',
     date:'1812', ages:yr(1812), src:'p14', img:'12-egrets-quick-lessons.jpg', iw:960, ih:675,
     imgnote:'The gallery shows Egrets from this manual and gives it no date; the date is the article’s date for the manual itself.'}),
  W({id:'w-manga1', t:'Hokusai Manga, volume one', sub:'“random drawings” — an immediate success; twelve volumes by 1820, three more posthumously',
     date:'1814', ages:yr(1814), src:'p14', img:'03-manga-bathers.jpg', iw:500, ih:309}),
  W({id:'w-kinoe', t:'The Dream of the Fisherman’s Wife', sub:'from Kinoe no Komatsu, a three-volume book of shunga',
     date:'1814', ages:yr(1814), src:'p12 · gallery', img:'10-fishermans-wife.jpg', iw:960, ih:675}),
  W({id:'w-daruma-nagoya', t:'The Great Daruma', sub:'18 × 10.8 metres, in ink on paper, outside the Hongan-ji Nagoya Betsuin. Destroyed in 1945; the handbills survive.',
     date:'5 October 1817', ages:[56,56], exact:true, src:'p15', img:'04-great-daruma-1817.jpg', iw:500, ih:642,
     imgnote:'The image is a contemporary print of Hokusai painting it, not the painting.'}),
  W({id:'w-great-wave', t:'The Great Wave off Kanagawa', sub:'the first print in Thirty-six Views of Mount Fuji',
     date:'c. 1829–1832', ages:yr(1829,1832), src:'caption', img:'05-great-wave.jpg', iw:1280, ih:876}),
  W({id:'w-fine-wind', t:'Fine Wind, Clear Morning', sub:'or Red Fuji, from Thirty-six Views of Mount Fuji',
     date:'c. 1829–1832', ages:yr(1829,1832), src:'caption', img:'06-fine-wind-clear-morning.jpg', iw:1280, ih:864, derived:true,
     imgnote:'The article gives this print no date of its own. It is placed on the date the article gives its series.'}),
  W({id:'w-thunderstorm', t:'Thunderstorm Beneath the Summit', sub:'from Thirty-six Views of Mount Fuji',
     date:'c. 1829–1832', ages:yr(1829,1832), src:'gallery', img:'08-thunderstorm-beneath-summit.jpg', iw:960, ih:649, derived:true,
     imgnote:'The gallery gives this print no date. It is placed on the date the article gives its series.'}),
  W({id:'w-kajikazawa', t:'Kajikazawa in Kai Province', sub:'from Thirty-six Views of Mount Fuji',
     date:'c. 1829–1832', ages:yr(1829,1832), src:'gallery', img:'16-kajikazawa.jpg', iw:960, ih:631, derived:true,
     imgnote:'The gallery gives this print no date. It is placed on the date the article gives its series.'}),
  W({id:'w-true-mirror', t:'A True Mirror of Chinese and Japanese Poetry', sub:'in extra-long vertical formats, like Chinese hand scrolls. Ten designs survive.',
     date:'c. 1833–1834', ages:yr(1833,1834), src:'p19'}),
  W({id:'w-100-views', t:'One Hundred Views of Mount Fuji', sub:'“the masterpiece among his landscape picture books”. Its colophon is the sentence this page is built on.',
     date:'1834', ages:yr(1834), src:'p17', img:'19-big-wave-100-views.jpg', iw:960, ih:706,
     imgnote:'The gallery shows “The Big Wave” from this book.'}),
  W({id:'w-cuckoo', t:'Cuckoo and Azaleas', sub:'from the Small Flower series',
     date:'1834', ages:yr(1834), src:'gallery', img:'11-cuckoo-azaleas.jpg', iw:500, ih:676}),
  W({id:'w-100-poems', t:'One Hundred Poems Explained by a Nurse', sub:'his final print series — never published in full, perhaps because of his publishers’ hardships',
     date:'c. 1835–1836', ages:yr(1835,1836), src:'p20'}),
  W({id:'w-lions', t:'The daily lions', sub:'Chinese lions (shishi) painted every morning in ink on paper as “daily exorcisms”, a talisman against misfortune',
     date:'1842–1843', ages:yr(1842,1843), src:'p21'}),
  W({id:'w-obuse-dragon', t:'Dragon on the Higashimachi Festival Float', sub:'Obuse',
     date:'1844', ages:yr(1844), src:'gallery', img:'21-obuse-dragon.jpg', iw:960, ih:960}),
  W({id:'w-feminine-wave', t:'Feminine Wave', sub:'painted while living in Obuse',
     date:'1845', ages:yr(1845), src:'p21 · gallery', img:'22-feminine-wave.jpg', iw:960, ih:955}),
  W({id:'w-dragon-smoke', t:'The Dragon of Smoke Escaping from Mount Fuji', sub:'painting',
     date:'1849', ages:[88,88], exact:true, src:'p21 · gallery', img:'23-dragon-of-smoke.png', iw:250, ih:645,
     imgnote:'Painted in early 1849; he died on 10 May 1849, aged 88.'}),
  W({id:'w-tiger', t:'Tiger in the Snow', sub:'hanging scroll, ink and colour on silk',
     date:'1849', ages:[88,88], exact:true, src:'p21 · gallery', img:'24-tiger-in-the-snow.jpg', iw:960, ih:746,
     imgnote:'Painted in early 1849; he died on 10 May 1849, aged 88.'})
];

/* ---- works and images the article does not date ---- */
const UNDATED = [
  {id:'u-courtesan', t:'Courtesan Asleep', sub:'a bijin-ga surimono print', why:'dated only “c. late 18th to early 19th century” — too wide to place on an age',
   src:'caption', img:'01-courtesan-asleep.jpg', iw:1280, ih:1454},
  {id:'u-kirifuri', t:'Kirifuri waterfall at Kurokami Mountain in Shimotsuke', sub:'from A Tour of Japanese Waterfalls', why:'no date given in the gallery',
   src:'gallery', img:'09-kirifuri-waterfall.jpg', iw:500, ih:737},
  {id:'u-carp', t:'Carp Leaping up a Cascade', sub:'', why:'no date given in the gallery',
   src:'gallery', img:'13-carp-cascade.jpg', iw:250, ih:707},
  {id:'u-oiwa', t:'The Ghost of Oiwa', sub:'from One Hundred Ghost Stories', why:'no date given in the gallery',
   src:'gallery', img:'14-lantern-ghost-oiwa.jpg', iw:500, ih:691},
  {id:'u-stilllife', t:'Still Life', sub:'surimono print', why:'no date given in the gallery',
   src:'gallery', img:'15-still-life.jpg', iw:715, ih:843},
  {id:'u-tenman', t:'Tenma Bridge in Setsu Province', sub:'from Rare Views of Famous Japanese Bridges', why:'no date given in the gallery',
   src:'gallery', img:'17-tenman-bridge.jpg', iw:960, ih:653},
  {id:'u-choshi', t:'Chōshi in Shimosha', sub:'from Oceans of Wisdom', why:'no date given in the gallery',
   src:'gallery', img:'18-choshi-oceans-of-wisdom.jpg', iw:960, ih:677},
  {id:'u-amida', t:'Amida Falls', sub:'from A Tour of Japanese Waterfalls', why:'no date given in the gallery — and the source disagrees with itself: the caption says a waterfall, the file it points at is named “Veld in de Owari provincie”, a field in Owari Province',
   src:'gallery', img:'20-amida-falls.jpg', iw:500, ih:731},
  {id:'u-masculine', t:'Masculine Wave', sub:'made at Obuse', why:'named beside the Feminine Wave, but given no date and no image',
   src:'p21'},
  {id:'u-store', t:'Store Selling Picture Books and Ukiyo-e', sub:'hand-coloured rather than printed from separated blocks', why:'no date and no image in this article',
   src:'p30'}
];

/* ---- the name changes the article dates (p4: the names ARE the periodisation) ---- */
const NAMES = [
  {n:'Shunrō', a:18.5, y:'1779', src:'p6'},
  {n:'Hokusai Tomisa', a:37.5, y:'1798', src:'p9'},
  {n:'Katsushika Hokusai', a:39.5, y:'1800', src:'p10'},
  {n:'Taito', a:51, y:'1811', src:'p14'},
  {n:'Iitsu', a:59.5, y:'1820', src:'p16'},
  {n:'Gakyō Rōjin Manji', a:73.5, y:'1834', src:'p17'}
];

/* ---- posterity: six events the article dates, on a relabelled axis ---- */
const POST = [
  {d:7,   y:'c. 1856', t:'Félix Bracquemond first comes across a copy of a Hokusai sketchbook at the workshop of his printer, in Paris.', src:'p23'},
  {d:18,  y:'1867', t:'The Rousseau Service, designed from that sketchbook, is exhibited at the Universal Exposition in Paris. It is reissued in several editions.', src:'p24'},
  {d:56,  y:'1905', t:'Debussy’s La Mer debuts. He keeps an impression of The Great Wave in his living room and asks for it on the cover of the published score.', src:'p26', img:'25-debussy-la-mer.jpg', iw:500, ih:655},
  {d:136, y:'1985', t:'Richard Lane, in the Encyclopædia Britannica: he has “impressed Western artists, critics and art lovers alike, more, possibly, than any other single Asian artist”.', src:'p29'},
  {d:156, y:'2005', t:'The Tokyo National Museum’s Hokusai exhibition draws the largest number of visitors of any exhibit there that year.', src:'p27'},
  {d:168, y:'2017', t:'The British Museum holds the first exhibition of his later-year artworks, The Great Wave among them.', src:'p27'}
];

const ALL = {};
WORKS.forEach(w => ALL[w.id] = w);
UNDATED.forEach(w => ALL[w.id] = w);

/* ══════════════════════════ dom ══════════════════════════ */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

const plate = $('#plate'), chart = $('#chart'), regsEl = $('#regs'), layer = $('#layer'),
      axisEl = $('#axis'), namesEl = $('#names'), washEl = $('#wash'), sevEl = $('#seventy'),
      sevLab = $('#seventy-lab'), marginEl = $('#margin'), guessEl = $('#guess'),
      deathEl = $('#death'), portraitEl = $('#portrait'), vcount = $('#verdict-count');

let state = 1, revealed = false, guessAge = null, showRanges = false, filterReg = null;
let geom = null;

/* ══════════════════════ build static furniture ══════════════════════ */
const regNodes = REGS.map((r, i) => {
  const d = el('div', 'reg' + (r.verdict ? ' verdict' : ''));
  d.dataset.reg = i;
  const age = el('div', 'rage', String(r.age));
  const lab = el('div', 'rlab', r.text);
  const rule = el('div', 'rule');
  const hit = el('button', 'rhit');
  hit.type = 'button';
  hit.setAttribute('aria-label', 'Show only works made at ' + (r.verdict ? 'seventy to seventy-two' : 'age ' + r.age + ' or later, within this register'));
  hit.addEventListener('click', () => setFilter(filterReg === i ? null : i));
  d.append(age, lab, rule, hit);
  regsEl.appendChild(d);
  return d;
});

const sheetNodes = {};
WORKS.forEach(w => {
  const b = el('button', 'sheet enter' + (w.img ? '' : ' noimg') + (w.derived ? ' derived' : ''));
  b.type = 'button'; b.dataset.id = w.id;
  b.setAttribute('aria-label', w.t + ', ' + w.date);
  if (w.img) {
    const fill = el('div', 'plate-fill'); fill.style.background = '#cfc6b3';
    const im = new Image(); im.src = 'assets/' + w.img; im.alt = w.t; im.decoding = 'async'; im.loading = 'lazy';
    im.addEventListener('load', () => fill.remove());
    b.append(fill, im);
  } else {
    b.appendChild(el('div', 'slash'));
  }
  const anch = el('span', 'anch', w.src.split(' · ')[0]);
  b.appendChild(anch);
  b.addEventListener('click', () => openInspector(w));
  layer.appendChild(b);
  sheetNodes[w.id] = b;

  const bar = el('div', 'bar');
  bar.append(el('i', 'l'), el('i', 'r'), el('div', 'step'));
  bar.dataset.for = w.id;
  layer.appendChild(bar);
  sheetNodes[w.id + '::bar'] = bar;
});

/* undated margin */
{
  marginEl.appendChild(el('h3', null, 'Undated in this article — 10'));
  const ul = el('ul');
  UNDATED.forEach(u => {
    const li = el('li');
    const b = el('button'); b.type = 'button';
    if (u.img) {
      const th = el('span', 'mth');
      const h = 26, w = Math.round(h * u.iw / u.ih);
      th.style.width = w + 'px'; th.style.height = h + 'px';
      const im = new Image(); im.src = 'assets/' + u.img; im.alt = ''; im.loading = 'lazy';
      th.appendChild(im); b.appendChild(th);
    } else {
      const th = el('span', 'mth'); th.style.cssText = 'width:15px;height:26px;border:1px solid var(--hair);background:none';
      b.appendChild(th);
    }
    const t = el('span', 'mt', u.t);
    b.appendChild(t);
    b.addEventListener('click', () => openInspector(u));
    li.appendChild(b);
    ul.appendChild(li);
  });
  marginEl.appendChild(ul);
}

/* ══════════════════════ geometry ══════════════════════ */
function maxAge() { return state >= 4 ? 114 : 92; }
function padL() { return window.innerWidth < 820 ? 30 : 44; }
function padR() { return (state === 3 && window.innerWidth >= 560) ? (window.innerWidth < 820 ? 128 : 208) : 26; }

function layout() {
  const cw = chart.clientWidth, ch = chart.clientHeight;
  if (!cw || !ch) return;
  const pL = padL(), pR = padR();
  chart.style.setProperty('--padL', pL + 'px');
  const plotW = Math.max(120, cw - pL - pR);
  const A2X = a => pL + (a / maxAge()) * plotW;

  const dense = state >= 3 && state <= 3;
  const labelBand = window.innerWidth < 820 ? 17 : 21;
  const pad = 5;

  // pack works into rows per register
  const rows = REGS.map(() => []);
  const placed = [];
  let sheetH = window.innerWidth < 820 ? 15 : 25;

  function pack(h) {
    rows.forEach(r => r.length = 0);
    placed.length = 0;
    const list = WORKS.slice().sort((a, b) => mid(a) - mid(b));
    for (const w of list) {
      const ri = regOf(showRanges ? w.ages[1] : mid(w));
      const wpx = w.img ? Math.max(7, Math.round(h * w.iw / w.ih)) : 15;
      let cx = A2X(showRanges ? (w.ages[0] + w.ages[1]) / 2 : mid(w));
      let x0 = cx - wpx / 2, x1 = cx + wpx / 2 + 30; // 30 = anchor label
      if (x0 < pL - 8) { x0 = pL - 8; x1 = x0 + wpx + 30; }
      if (x1 > pL + plotW + 22) { x1 = pL + plotW + 22; x0 = x1 - wpx - 30; }
      const R = rows[ri];
      let r = 0;
      for (; r < R.length; r++) if (!R[r].some(s => !(x1 <= s.x0 - 3 || x0 >= s.x1 + 3))) break;
      if (r === R.length) R.push([]);
      const rec = {w, ri, r, x0, x1, wpx, h};
      R[r].push(rec); placed.push(rec);
    }
    return rows.reduce((s, r) => s + Math.max(1, r.length), 0);
  }

  let totalRows = pack(sheetH);
  // fit: shrink sheets until the ladder fits the chart
  const fixed = REGS.length * (labelBand + pad) + (REGS.length - 1) * 4;
  let guard = 0;
  while (fixed + totalRows * (sheetH + 6) > ch && sheetH > 10 && guard++ < 30) {
    sheetH -= 1; totalRows = pack(sheetH);
  }
  // if there is slack, grow
  guard = 0;
  while (fixed + totalRows * (sheetH + 7) < ch - 8 && sheetH < 46 && guard++ < 40) {
    const next = sheetH + 1, t2 = pack(next);
    if (fixed + t2 * (next + 6) > ch) { pack(sheetH); break; }
    sheetH = next; totalRows = t2;
  }

  const pitch = sheetH + 6;
  // register heights
  const hs = REGS.map((r, i) => {
    const n = state === 1 || state >= 4 ? 1 : Math.max(1, rows[i].length);
    return labelBand + n * pitch + pad;
  });
  let sum = hs.reduce((a, b) => a + b, 0) + (REGS.length - 1) * 4;
  const slack = ch - sum;
  if (slack > 0) { const each = slack / REGS.length; for (let i = 0; i < hs.length; i++) hs[i] += each; }
  else if (slack < 0) { const k = ch / sum; for (let i = 0; i < hs.length; i++) hs[i] *= k; }

  // tops, from the bottom up (register 0 at the bottom)
  const tops = [];
  let y = ch;
  for (let i = 0; i < REGS.length; i++) { y -= hs[i]; tops[i] = y; y -= 4; }

  geom = {pL, pR, plotW, A2X, tops, hs, labelBand, pitch, sheetH, ch, cw, rows};

  regNodes.forEach((d, i) => { d.style.top = tops[i] + 'px'; d.style.height = hs[i] + 'px'; });

  // sheets
  placed.forEach(rec => {
    const {w, ri, r, x0, wpx} = rec;
    const n = sheetNodes[w.id];
    const top = tops[ri] + labelBand + r * pitch;
    n.style.left = x0 + 'px';
    n.style.top = top + 'px';
    n.style.width = wpx + 'px';
    n.style.height = sheetH + 'px';

    // range bar
    const bar = sheetNodes[w.id + '::bar'];
    const lo = w.ages[0], hi = w.ages[1];
    if (showRanges && !w.exact && hi > lo) {
      const rlo = regOf(lo), rhi = regOf(hi);
      const bx0 = A2X(lo), bx1 = A2X(hi);
      const yhi = tops[rhi] + labelBand + r * pitch + sheetH + 5;
      const ylo = tops[rlo] + labelBand + Math.min(r, Math.max(0, rows[rlo].length - 1)) * pitch + sheetH + 5;
      bar.style.left = bx0 + 'px';
      bar.style.width = Math.max(2, bx1 - bx0) + 'px';
      bar.style.top = Math.min(ylo, yhi) + 'px';
      bar.style.height = Math.abs(ylo - yhi) + 'px';
      bar.style.borderTopWidth = '0px';
      // draw as two segments joined by a vertical step, using borders
      bar.innerHTML = '';
      const seg1 = el('div'); const cross = A2X(REGS[Math.max(rlo + 1, rhi)] ? REGS[Math.max(rlo + 1, rhi)].age : hi);
      const wSeg = Math.max(1, Math.min(bx1, cross) - bx0);
      seg1.style.cssText = `position:absolute;left:0;top:${ylo - Math.min(ylo,yhi)}px;width:${wSeg}px;height:1.5px;background:currentColor;opacity:.9`;
      seg1.style.color = 'var(--blue)';
      bar.appendChild(seg1);
      if (rhi > rlo) {
        const step = el('div');
        step.style.cssText = `position:absolute;left:${wSeg}px;top:${Math.min(0, yhi-ylo)}px;width:1.5px;height:${Math.abs(ylo-yhi)}px;background:var(--blue);opacity:.9`;
        const seg2 = el('div');
        seg2.style.cssText = `position:absolute;left:${wSeg}px;top:${yhi - Math.min(ylo,yhi)}px;width:${Math.max(1, bx1-bx0-wSeg)}px;height:1.5px;background:var(--blue);opacity:.9`;
        bar.append(step, seg2);
      }
      const cl = el('i', 'l'), cr = el('i', 'r');
      cl.style.cssText = `position:absolute;left:0;top:${ylo - Math.min(ylo,yhi) - 4}px;width:1.5px;height:9px;background:var(--blue)`;
      cr.style.cssText = `position:absolute;left:${bx1-bx0-1.5}px;top:${yhi - Math.min(ylo,yhi) - 4}px;width:1.5px;height:9px;background:var(--blue)`;
      bar.append(cl, cr);
      bar.style.opacity = (state >= 3 && !(filterReg != null && regOf(mid(w)) !== filterReg)) ? '1' : '0';
    } else {
      bar.style.opacity = '0';
    }
  });

  // verdict wash + line at seventy
  const x70 = A2X(70);
  washEl.style.left = '0px';
  washEl.style.width = x70 + 'px';
  sevEl.style.left = x70 + 'px';
  sevLab.style.left = x70 + 'px';
  sevLab.style.top = '-2px';

  buildAxis(A2X, plotW, pL);
  buildNames(A2X);
  layoutTail(A2X, tops, hs, ch);
  positionCount(x70, ch);
}

const mid = w => (w.ages[0] + w.ages[1]) / 2;

function buildAxis(A2X, plotW, pL) {
  axisEl.innerHTML = '';
  axisEl.appendChild(el('div', 'arule'));
  const ticks = state >= 4 ? [0,10,20,30,40,50,60,70,80,88,90,100,110] : [0,10,20,30,40,50,60,70,80,88];
  ticks.forEach(t => {
    const d = el('div', 'atick' + (t === 70 || t === 88 ? ' big' : ''));
    d.style.left = A2X(t) + 'px';
    d.append(el('i'), el('span', null, String(t)));
    axisEl.appendChild(d);
  });
  const l = el('div', 'axl mono lc', 'His age. His date of birth is unclear (p3); the infobox says “supposedly” 31 October 1760. Every age here inherits that doubt.');
  l.style.maxWidth = Math.max(240, A2X(46) - 6) + 'px';
  l.style.lineHeight = '1.4';
  axisEl.appendChild(l);
  const r = el('div', 'axr mono', state >= 4
    ? 'He died at 88. The axis runs on to 110 because he did.'
    : 'Vertical — his scale. Horizontal — his age.');
  axisEl.appendChild(r);
}

function buildNames(A2X) {
  namesEl.innerHTML = '';
  NAMES.forEach(n => {
    const d = el('div', 'ntick');
    d.style.left = A2X(n.a) + 'px';
    d.append(el('i'), el('span', null, n.n));
    namesEl.appendChild(d);
  });
}

/* ══════════════════════ the tail (movement 4) ══════════════════════ */
function layoutTail(A2X, tops, hs, ch) {
  // deathbed point at 88, below his forecast
  const r4 = 4; // "I shall progress further" — where the colophon put age 86–89
  const yForecast = tops[r4] + hs[r4] / 2;
  const x88 = A2X(88);
  deathEl.innerHTML = '';
  const dot = el('div', 'dot'); dot.style.left = x88 + 'px'; dot.style.top = (tops[0] + hs[0] / 2) + 'px';
  const dline = el('div', 'dline');
  dline.style.cssText = `position:absolute;left:${x88}px;top:${yForecast}px;height:${(tops[0]+hs[0]/2) - yForecast}px`;
  const fdot = el('div');
  fdot.style.cssText = `position:absolute;left:${x88 - 4}px;top:${yForecast - 4}px;width:8px;height:8px;border:1.5px solid var(--blue-lit);border-radius:50%`;
  const q = el('div', 'dq');
  q.innerHTML = '“If only Heaven will give me just another ten years&nbsp;… Just another five more years, then I could become a real painter”' +
    '<span class="dsrc mono">On his deathbed, 1849 · p22 · at 88 he is asking for what the colophon said he would already have at 86</span>';
  const qw = window.innerWidth < 820 ? 250 : 400;
  q.style.left = Math.max(6, Math.min(x88 + 16, geom ? geom.cw - qw - 6 : x88 + 16)) + 'px';
  q.style.top = (tops[0] + hs[0] / 2 + 14) + 'px';
  const fl = el('div', 'mono');
  fl.style.cssText = `position:absolute;left:${x88 + 14}px;top:${yForecast - 9}px;color:var(--mute-ink)`;
  fl.textContent = 'his forecast for 86';
  deathEl.append(dline, fdot, fl, dot, q);

  // the portrait, at the truncation
  const availW = geom ? geom.cw - x88 - 30 : 200;
  const ph = Math.min(ch * 0.86, (availW * 0.55) * (2657 / 1280));
  const pw = ph * 1280 / 2657;
  portraitEl.style.left = (x88 - pw - 26) + 'px';
  portraitEl.style.top = (ch - ph) + 'px';
  portraitEl.style.width = pw + 'px';
  portraitEl.style.height = ph + 'px';
}

function positionCount(x70, ch) {
  if (!vcount) return;
  const w = window.innerWidth < 820 ? 200 : 400;
  vcount.style.width = w + 'px';
  vcount.style.left = Math.max(6, x70 - w - 18) + 'px';
  vcount.style.top = '2px';
}

/* ══════════════════════ movement states ══════════════════════ */
const MV = [
  null,
  {n:'01', t:'The scale'},
  {n:'02', t:'The commitment'},
  {n:'03', t:'The population'},
  {n:'04', t:'The tail'}
];

function setState(s, opts) {
  s = Math.max(1, Math.min(4, s));
  if (s === state && !(opts && opts.force)) return;
  const prev = state;
  state = s;
  $('#mv-no').textContent = MV[s].n;
  $('#mv-name').textContent = MV[s].t;
  plate.dataset.ground = s === 4 ? 'ink' : 'bone';
  document.body.classList.toggle('ink-chrome', s === 4);
  $$('#idx button').forEach(b => b.setAttribute('aria-current', String(b.dataset.go === 'm' + s)));

  namesEl.style.opacity = s >= 3 ? '1' : '0';
  marginEl.classList.toggle('on', s === 3);
  guessEl.classList.toggle('on', s === 2);
  guessEl.style.opacity = s === 2 ? '1' : '0';
  guessEl.style.pointerEvents = s === 2 ? 'auto' : 'none';
  $('#guess-mark').style.opacity = (s === 2 && guessAge != null) ? '1' : '0';
  washEl.style.opacity = s >= 2 ? '1' : '0';
  sevEl.style.opacity = s >= 2 ? '1' : '0';
  sevLab.style.opacity = s >= 2 ? '1' : '0';
  vcount.style.opacity = s === 3 ? '1' : '0';
  deathEl.style.opacity = s === 4 ? '1' : '0';
  portraitEl.style.opacity = s === 4 ? '1' : '0';
  $('#foot-caveat').style.opacity = s >= 3 ? '1' : '0';
  $('#foot-derv').style.opacity = s >= 2 ? '1' : '0';
  $('#ranges-tgl').style.visibility = s >= 2 ? 'visible' : 'hidden';

  // sheets
  if (s === 1) {
    WORKS.forEach(w => { const n = sheetNodes[w.id]; n.classList.add('enter'); n.classList.remove('ghost', 'dim'); });
  } else if (s === 2) {
    WORKS.forEach(w => { const n = sheetNodes[w.id]; if (w.id !== 'w-great-wave' || !revealed) n.classList.add('enter'); n.classList.remove('ghost'); });
    if (revealed) { sheetNodes['w-great-wave'].classList.remove('enter'); }
  } else if (s === 3) {
    revealed = true;
    land(prev !== 3);
  } else if (s === 4) {
    WORKS.forEach(w => { const n = sheetNodes[w.id]; n.classList.remove('enter', 'dim'); n.classList.add('ghost'); });
    setFilter(null, true);
  }
  layout();
}

let landTimer = [];
function land(stagger) {
  landTimer.forEach(clearTimeout); landTimer = [];
  const noMotion = document.body.classList.contains('nomotion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const list = WORKS.slice().sort((a, b) => mid(a) - mid(b));
  list.forEach((w, i) => {
    const n = sheetNodes[w.id];
    n.classList.remove('ghost');
    if (!stagger || noMotion) { n.classList.remove('enter'); return; }
    landTimer.push(setTimeout(() => n.classList.remove('enter'), 40 * i));
  });
}

function setFilter(i, silent) {
  filterReg = i;
  regNodes.forEach((d, k) => d.classList.toggle('filt-off', i != null && k !== i));
  WORKS.forEach(w => {
    const on = i == null || regOf(showRanges ? w.ages[1] : mid(w)) === i;
    sheetNodes[w.id].classList.toggle('dim', !on);
    const bar = sheetNodes[w.id + '::bar'];
    if (bar && showRanges) bar.style.opacity = (on && state >= 3) ? '1' : '0';
  });
  const n = i == null ? WORKS.length : WORKS.filter(w => regOf(showRanges ? w.ages[1] : mid(w)) === i).length;
  $('#filt').textContent = i == null ? '' : n + ' of ' + WORKS.length + ' — “' + REGS[i].text.slice(0, 42) + '…” · clear';
  $('#filt').hidden = i == null;
}
$('#filt').addEventListener('click', () => setFilter(null));

/* ══════════════════════ the prediction beat ══════════════════════ */
const drag = $('#dragsheet');
function placeDragHome() {
  if (!geom) return;
  const h = Math.min(120, geom.ch * 0.20);
  const w = h * 1280 / 876;
  drag.style.width = w + 'px'; drag.style.height = h + 'px';
  if (drag.dataset.moved !== '1') {
    drag.style.left = (geom.pL + 4) + 'px';
    drag.style.top = (geom.ch - h - 6) + 'px';
  }
  const ask = $('#guess-ask');
  ask.style.left = (geom.pL + w + 30) + 'px';
  ask.style.top = Math.max(8, geom.ch - h - 6) + 'px';
}

let dragging = false, dx = 0, dy = 0;
drag.addEventListener('pointerdown', e => {
  if (revealed) return;
  dragging = true; drag.setPointerCapture(e.pointerId);
  const r = drag.getBoundingClientRect(), c = chart.getBoundingClientRect();
  dx = e.clientX - r.left; dy = e.clientY - r.top;
  drag.style.transition = 'none';
  e.preventDefault();
});
drag.addEventListener('pointermove', e => {
  if (!dragging) return;
  const c = chart.getBoundingClientRect();
  drag.dataset.moved = '1';
  drag.style.left = (e.clientX - c.left - dx) + 'px';
  drag.style.top = (e.clientY - c.top - dy) + 'px';
});
drag.addEventListener('pointerup', e => {
  if (!dragging) return;
  dragging = false;
  const c = chart.getBoundingClientRect();
  const cx = e.clientX - c.left;
  commitGuess(cx);
});
drag.addEventListener('keydown', e => {
  if (revealed) return;
  const step = e.shiftKey ? 40 : 12;
  const cur = parseFloat(drag.style.left) || 0;
  if (e.key === 'ArrowRight') { drag.dataset.moved = '1'; drag.style.left = (cur + step) + 'px'; e.preventDefault(); }
  else if (e.key === 'ArrowLeft') { drag.dataset.moved = '1'; drag.style.left = Math.max(0, cur - step) + 'px'; e.preventDefault(); }
  else if (e.key === 'Enter' || e.key === ' ') {
    const w = parseFloat(drag.style.width) || 0;
    commitGuess(cur + w / 2); e.preventDefault();
  }
});

function commitGuess(cx) {
  if (!geom || revealed) return;
  const a = Math.round(Math.max(0, Math.min(maxAge(), (cx - geom.pL) / geom.plotW * maxAge())));
  guessAge = a;
  reveal();
}

function reveal() {
  revealed = true;
  drag.style.transition = 'left 350ms cubic-bezier(.4,0,.2,1), top 350ms cubic-bezier(.4,0,.2,1), width 350ms, height 350ms, opacity 250ms';
  const target = sheetNodes['w-great-wave'];
  showRanges = true; syncRangesTgl();
  layout();
  const r = target.getBoundingClientRect(), c = chart.getBoundingClientRect();
  drag.style.left = (r.left - c.left) + 'px';
  drag.style.top = (r.top - c.top) + 'px';
  drag.style.width = r.width + 'px';
  drag.style.height = r.height + 'px';
  target.classList.remove('enter');
  setTimeout(() => { drag.style.opacity = '0'; }, 340);

  const gm = $('#guess-mark');
  if (guessAge != null && geom) {
    gm.innerHTML = '';
    const l = el('div', 'gl'); l.style.left = geom.A2X(guessAge) + 'px';
    const t = el('div', 'gt', 'your guess — age ' + guessAge);
    t.style.left = (geom.A2X(guessAge) + 6) + 'px'; t.style.top = '2px';
    gm.append(l, t);
    gm.style.opacity = '1';
  }
  const ask = $('#guess-ask');
  const inside = guessAge != null && guessAge < 70;
  ask.innerHTML = '<h2>c. 1829–1832. He was between sixty-eight and seventy-two.</h2>' +
    '<p>The bar crosses the line at seventy. The most reproduced image in the world was made inside the years its author wrote off.' +
    (guessAge != null ? (inside
      ? ' You put it at age ' + guessAge + ' — also inside them.'
      : ' You put it at age ' + guessAge + '; his own answer is lower.') : '') + '</p>' +
    '<p class="mono lc">Derived: c. 1829–1832 (caption) − born c. 1760 (infobox, p3) ⇒ ages ≈ 68–72. ' +
    'Date ranges are now switched on, so every work shows its true span.</p>';
}
$('#skip-guess').addEventListener('click', () => { guessAge = null; reveal(); });

/* ══════════════════════ ranges toggle ══════════════════════ */
function syncRangesTgl() {
  const t = $('#ranges-tgl');
  t.setAttribute('aria-pressed', String(showRanges));
  t.textContent = showRanges ? 'Date ranges — on' : 'Date ranges — off (less honest)';
}
$('#ranges-tgl').addEventListener('click', () => { showRanges = !showRanges; syncRangesTgl(); layout(); setFilter(filterReg); });
syncRangesTgl();

/* ══════════════════════ inspector ══════════════════════ */
const insp = $('#insp');
let lastFocus = null;
function openInspector(w) {
  lastFocus = document.activeElement;
  const fig = $('#insp-fig'), meta = $('#insp-meta');
  fig.innerHTML = ''; meta.innerHTML = '';
  if (w.img) {
    const im = new Image(); im.src = 'assets/' + w.img; im.alt = w.t;
    fig.appendChild(im);
  } else {
    const d = el('div');
    d.style.cssText = 'width:min(46vw,420px);height:52vh;border:1px solid #4A443A;display:flex;align-items:center;justify-content:center;color:#B7AF9E';
    d.appendChild(el('span', 'mono', 'No image of this work in the article'));
    fig.appendChild(d);
  }
  meta.appendChild(el('h3', null, w.t));
  if (w.sub) meta.appendChild(el('p', null, w.sub));
  const dl = el('dl');
  const row = (k, v) => { dl.appendChild(el('dt', null, k)); dl.appendChild(el('dd', null, v)); };
  if (w.ages) {
    row('Date, as this article states it', w.date);
    row('His age', w.exact ? String(w.ages[0]) : w.ages[0] + ' to ' + w.ages[1]);
    row('Derived', (w.exact
      ? w.date + ' − born c. 31 Oct 1760 ⇒ age ' + w.ages[0]
      : w.date + ' − born c. 1760 ⇒ ages ≈ ' + w.ages[0] + '–' + w.ages[1]));
    const ri = regOf(mid(w));
    row('Falls in his register', '“' + REGS[ri].text + '”');
    if (w.ages[1] < 70) row('His verdict on it', '“nothing worth taking into account”');
    else if (w.ages[0] < 70) row('His verdict on it', 'the range straddles seventy — part of it falls inside “nothing worth taking into account”');
  } else {
    row('Date', 'None given');
    row('Why it is in the margin', w.why);
  }
  if (w.imgnote) row('Note', w.imgnote);
  row('Source', w.src + ' — Hokusai, English Wikipedia');
  meta.appendChild(dl);
  const back = el('a', 'src'); back.href = '#m6'; back.textContent = 'read the passage →';
  back.addEventListener('click', closeInspector);
  meta.appendChild(back);
  insp.classList.add('on');
  $('#insp-close').focus();
}
function closeInspector() { insp.classList.remove('on'); if (lastFocus) lastFocus.focus(); }
$('#insp-close').addEventListener('click', closeInspector);
$('#insp .scrim').addEventListener('click', closeInspector);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && insp.classList.contains('on')) closeInspector(); });

/* reading-room → plot */
document.addEventListener('click', e => {
  const a = e.target.closest('a.toplot');
  if (!a) return;
  e.preventDefault();
  const w = ALL[a.dataset.work];
  if (w) openInspector(w);
});

/* ══════════════════════ scroll → state ══════════════════════ */
const graph = $('#graph');
let raf = 0;
function onScroll() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const r = graph.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    if (span <= 0) return;
    const p = Math.max(0, Math.min(1, -r.top / span));
    let s = 1;
    if (p > 0.185) s = 2;
    if (p > 0.45) s = 3;
    if (p > 0.775) s = 4;
    setState(s);
  });
}
window.addEventListener('scroll', onScroll, {passive:true});

let rz = 0;
window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { layout(); placeDragHome(); }, 120); });

/* ══════════════════════ chrome ══════════════════════ */
$$('#idx button').forEach(b => b.addEventListener('click', () => {
  const go = b.dataset.go;
  if (go === 'm0') window.scrollTo({top:0, behavior:'smooth'});
  else if (go === 'm5' || go === 'm6') $('#' + go).scrollIntoView({behavior:'smooth'});
  else {
    const n = +go.slice(1);
    const frac = [0, 0.02, 0.30, 0.60, 0.88][n];
    const r = graph.getBoundingClientRect(), top = window.scrollY + r.top;
    window.scrollTo({top: top + (r.height - window.innerHeight) * frac, behavior:'smooth'});
  }
}));
$('#pause').addEventListener('click', function () {
  const on = document.body.classList.toggle('nomotion');
  this.setAttribute('aria-pressed', String(on));
  this.textContent = on ? 'Motion — paused' : 'Motion — running';
});

/* keyboard: ← → step movements */
document.addEventListener('keydown', e => {
  if (insp.classList.contains('on')) return;
  if (e.target.closest('input,textarea')) return;
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  if (document.activeElement === drag) return;
  const r = graph.getBoundingClientRect();
  if (r.top > 0 || r.bottom < window.innerHeight) return;
  e.preventDefault();
  const n = Math.max(1, Math.min(4, state + (e.key === 'ArrowRight' ? 1 : -1)));
  const frac = [0, 0.02, 0.30, 0.60, 0.88][n];
  window.scrollTo({top: window.scrollY + r.top * -1 + (r.height - window.innerHeight) * frac - (window.scrollY + r.top - window.scrollY), behavior:'smooth'});
  const top = window.scrollY + r.top;
  window.scrollTo({top: top + (r.height - window.innerHeight) * frac, behavior:'smooth'});
});

/* ══════════════════════ movement 5 ══════════════════════ */
function buildPost() {
  const host = $('#post');
  if (!host) return;
  host.innerHTML = '';
  const W0 = host.clientWidth, H0 = host.clientHeight;
  const pL = window.innerWidth < 820 ? 30 : 44;
  host.style.setProperty('--padL5', pL + 'px');
  const isNarrow = window.innerWidth < 820;
  const rowsTop = isNarrow ? 150 : 190;               // posterity band
  const ladderTop = rowsTop + (isNarrow ? 24 : 40);
  const ladderH = Math.max(90, H0 - ladderTop - 4);
  const rh = ladderH / REGS.length;
  for (let i = REGS.length - 1; i >= 0; i--) {
    const d = el('div', 'ghostreg');
    d.style.top = (ladderTop + (REGS.length - 1 - i) * rh) + 'px';
    d.style.height = rh + 'px';
    const s = el('span', null, REGS[i].text);
    const e2 = el('em', null, String(REGS[i].age));
    d.append(e2, s);
    host.appendChild(d);
  }
  const pW = W0 - pL - (isNarrow ? 8 : 26);
  const X = d => pL + (d / 178) * pW;
  const rule = el('div', 'prule'); rule.style.top = rowsTop + 'px';
  host.appendChild(rule);
  const lab = el('div', 'plabel', 'Years after his death');
  lab.style.top = (rowsTop - 20) + 'px'; lab.style.left = pL + 'px';
  host.appendChild(lab);

  POST.forEach((p, i) => {
    const d = el('div', 'pev');
    const w = isNarrow ? 120 : 174;
    let x = X(p.d);
    if (x + w > W0) x = W0 - w;
    d.style.left = x + 'px';
    d.style.top = rowsTop + 'px';
    d.appendChild(el('i'));
    d.appendChild(el('span', 'py', p.y + '  +' + p.d));
    d.appendChild(el('span', 'pt', p.t));
    const s = el('span', 'ps mono', p.src);
    d.appendChild(s);
    host.appendChild(d);
    if (p.img && !isNarrow) {
      const f = el('div', 'pimg');
      const iw = 108;
      f.style.left = x + 'px';
      f.style.top = (rowsTop - 20 - iw * p.ih / p.iw) + 'px';
      f.style.width = iw + 'px';
      const im = new Image(); im.src = 'assets/' + p.img; im.alt = 'Cover of Debussy’s La Mer, 1905'; im.loading = 'lazy';
      f.appendChild(im);
      host.appendChild(f);
    }
  });
}

/* ══════════════════════ boot ══════════════════════ */
function boot() {
  layout(); placeDragHome();
  setState(1, {force:true});
  buildPost();
  onScroll();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
window.addEventListener('load', () => { layout(); placeDragHome(); buildPost(); });
let rz2 = 0;
window.addEventListener('resize', () => { clearTimeout(rz2); rz2 = setTimeout(buildPost, 140); });

/* counts, computed not asserted */
(() => {
  const inside = WORKS.filter(w => w.ages[1] < 70).length;
  const straddle = WORKS.filter(w => w.ages[0] < 70 && w.ages[1] >= 70).length;
  const after = WORKS.length - inside - straddle;
  const n = document.getElementById('verdict-count');
  if (n) n.innerHTML = '<p><b>' + inside + '</b> of the <b>' + WORKS.length +
    '</b> works this article dates fall entirely inside his verdict. <b>' + straddle +
    '</b> straddle the line. Among those four is the most reproduced image in the world. ' +
    '<b>' + after + '</b> come after it.</p>';
  const c = document.getElementById('nworks'); if (c) c.textContent = String(WORKS.length);
  const c2 = document.getElementById('nworks2'); if (c2) c2.textContent = String(WORKS.length);
})();

})();
