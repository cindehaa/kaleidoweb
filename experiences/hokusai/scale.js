/* ══════════════════════════════════════════════════════════════════
   Nothing Before Seventy — Hokusai
   Sources: benchmarks/hokusai/{semantic,content-model}.json only.

   x = his age.  y = the register of his own eight-level scale that the
   age falls into.  The wash left of seventy is his own verdict on
   everything under it.  The plate never scrolls; scroll changes state.
   ══════════════════════════════════════════════════════════════════ */
(() => {
'use strict';

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
const yr = (a,b) => [a-1761, (b||a)-1760];
const WORKS = [
  {id:'w-kabuki', t:'Kabuki actor prints', sub:'his first published prints, under the name Shunrō',
   date:'1779', ages:yr(1779), src:'p6'},
  {id:'w-fireworks', t:'Fireworks in the Cool of Evening at Ryogoku Bridge in Edo', sub:'print',
   date:'c. 1788–89', ages:yr(1788,1789), src:'p6', img:'02-ryogoku-fireworks.jpg', iw:1280, ih:872},
  {id:'w-famous-sights', t:'Famous Sights of the Eastern Capital', sub:'a collection of landscapes',
   date:'1800', ages:yr(1800), src:'p10'},
  {id:'w-eight-views', t:'Eight Views of Edo', sub:'a collection of landscapes',
   date:'1800', ages:yr(1800), src:'p10'},
  {id:'w-daruma-edo', t:'Daruma portrait at the Edo festival',
   sub:'said to be 200 square metres, painted with a broom and buckets full of ink',
   date:'1804', ages:yr(1804), src:'p11'},
  {id:'w-chinsetsu', t:'Chinsetsu Yumiharizuki',
   sub:'Strange Tales of the Crescent Moon, illustrated for the novelist Takizawa Bakin',
   date:'1807–1811', ages:yr(1807,1811), src:'p12'},
  {id:'w-quick-lessons', t:'Quick Lessons in Simplified Drawing',
   sub:'the first of the art manuals — “a convenient way to make money and attract more students”',
   date:'1812', ages:yr(1812), src:'p14', img:'12-egrets-quick-lessons.jpg', iw:960, ih:675,
   imgnote:'The gallery shows Egrets from this manual and gives it no date of its own; the date is the article’s date for the manual.'},
  {id:'w-manga1', t:'Hokusai Manga, volume one',
   sub:'“random drawings” — an immediate success. Twelve volumes by 1820, three more posthumously.',
   date:'1814', ages:yr(1814), src:'p14', img:'03-manga-bathers.jpg', iw:500, ih:309},
  {id:'w-kinoe', t:'The Dream of the Fisherman’s Wife',
   sub:'from Kinoe no Komatsu, a three-volume book of shunga',
   date:'1814', ages:yr(1814), src:'p12', img:'10-fishermans-wife.jpg', iw:960, ih:675},
  {id:'w-daruma-nagoya', t:'The Great Daruma',
   sub:'18 × 10.8 metres, in ink on paper, outside the Hongan-ji Nagoya Betsuin. Destroyed in 1945; the handbills survive.',
   date:'5 October 1817', ages:[56,56], exact:true, src:'p15', img:'04-great-daruma-1817.jpg', iw:500, ih:642,
   imgnote:'The image is a contemporary print of Hokusai painting it, not the painting itself.'},
  {id:'w-great-wave', t:'The Great Wave off Kanagawa',
   sub:'the first print in Thirty-six Views of Mount Fuji',
   date:'c. 1829–1832', ages:yr(1829,1832), src:'cap', img:'05-great-wave.jpg', iw:1280, ih:876},
  {id:'w-fine-wind', t:'Fine Wind, Clear Morning',
   sub:'or Red Fuji, from Thirty-six Views of Mount Fuji',
   date:'c. 1829–1832', ages:yr(1829,1832), src:'cap', img:'06-fine-wind-clear-morning.jpg', iw:1280, ih:864, derived:true,
   imgnote:'The article gives this print no date of its own. It is placed on the date the article gives its series.'},
  {id:'w-thunderstorm', t:'Thunderstorm Beneath the Summit', sub:'from Thirty-six Views of Mount Fuji',
   date:'c. 1829–1832', ages:yr(1829,1832), src:'gal', img:'08-thunderstorm-beneath-summit.jpg', iw:960, ih:649, derived:true,
   imgnote:'The gallery gives this print no date. It is placed on the date the article gives its series.'},
  {id:'w-kajikazawa', t:'Kajikazawa in Kai Province', sub:'from Thirty-six Views of Mount Fuji',
   date:'c. 1829–1832', ages:yr(1829,1832), src:'gal', img:'16-kajikazawa.jpg', iw:960, ih:631, derived:true,
   imgnote:'The gallery gives this print no date. It is placed on the date the article gives its series.'},
  {id:'w-true-mirror', t:'A True Mirror of Chinese and Japanese Poetry',
   sub:'in extra-long vertical formats, like Chinese hand scrolls. Ten designs survive.',
   date:'c. 1833–1834', ages:yr(1833,1834), src:'p19'},
  {id:'w-100-views', t:'One Hundred Views of Mount Fuji',
   sub:'“the masterpiece among his landscape picture books”. Its colophon is the sentence this page is built on.',
   date:'1834', ages:yr(1834), src:'p17', img:'19-big-wave-100-views.jpg', iw:960, ih:706,
   imgnote:'The gallery shows “The Big Wave” from this book.'},
  {id:'w-cuckoo', t:'Cuckoo and Azaleas', sub:'from the Small Flower series',
   date:'1834', ages:yr(1834), src:'gal', img:'11-cuckoo-azaleas.jpg', iw:500, ih:676},
  {id:'w-100-poems', t:'One Hundred Poems Explained by a Nurse',
   sub:'his final print series — never published in full, perhaps because of his publishers’ hardships',
   date:'c. 1835–1836', ages:yr(1835,1836), src:'p20'},
  {id:'w-lions', t:'The daily lions',
   sub:'Chinese lions (shishi) painted every morning in ink on paper as “daily exorcisms”, a talisman against misfortune',
   date:'1842–1843', ages:yr(1842,1843), src:'p21'},
  {id:'w-obuse-dragon', t:'Dragon on the Higashimachi Festival Float', sub:'Obuse',
   date:'1844', ages:yr(1844), src:'gal', img:'21-obuse-dragon.jpg', iw:960, ih:960},
  {id:'w-feminine-wave', t:'Feminine Wave', sub:'painted while living in Obuse',
   date:'1845', ages:yr(1845), src:'p21', img:'22-feminine-wave.jpg', iw:960, ih:955},
  {id:'w-dragon-smoke', t:'The Dragon of Smoke Escaping from Mount Fuji', sub:'painting',
   date:'1849', ages:[88,88], exact:true, src:'p21', img:'23-dragon-of-smoke.png', iw:250, ih:645,
   imgnote:'Painted in early 1849. He died on 10 May 1849, aged 88.'},
  {id:'w-tiger', t:'Tiger in the Snow', sub:'hanging scroll, ink and colour on silk',
   date:'1849', ages:[88,88], exact:true, src:'p21', img:'24-tiger-in-the-snow.jpg', iw:960, ih:746,
   imgnote:'Painted in early 1849. He died on 10 May 1849, aged 88.'}
];

/* ---- works and images the article does not date ---- */
const UNDATED = [
  {id:'u-courtesan', t:'Courtesan Asleep', sub:'a bijin-ga surimono print',
   why:'dated only “c. late 18th to early 19th century” — far too wide to place against an age',
   src:'caption', img:'01-courtesan-asleep.jpg', iw:1280, ih:1454},
  {id:'u-kirifuri', t:'Kirifuri waterfall at Kurokami Mountain in Shimotsuke', sub:'from A Tour of Japanese Waterfalls',
   why:'no date given in the gallery', src:'gallery', img:'09-kirifuri-waterfall.jpg', iw:500, ih:737},
  {id:'u-carp', t:'Carp Leaping up a Cascade', sub:'',
   why:'no date given in the gallery', src:'gallery', img:'13-carp-cascade.jpg', iw:250, ih:707},
  {id:'u-oiwa', t:'The Ghost of Oiwa', sub:'from One Hundred Ghost Stories',
   why:'no date given in the gallery', src:'gallery', img:'14-lantern-ghost-oiwa.jpg', iw:500, ih:691},
  {id:'u-stilllife', t:'Still Life', sub:'surimono print',
   why:'no date given in the gallery', src:'gallery', img:'15-still-life.jpg', iw:715, ih:843},
  {id:'u-tenman', t:'Tenma Bridge in Setsu Province', sub:'from Rare Views of Famous Japanese Bridges',
   why:'no date given in the gallery', src:'gallery', img:'17-tenman-bridge.jpg', iw:960, ih:653},
  {id:'u-choshi', t:'Chōshi in Shimosha', sub:'from Oceans of Wisdom',
   why:'no date given in the gallery', src:'gallery', img:'18-choshi-oceans-of-wisdom.jpg', iw:960, ih:677},
  {id:'u-amida', t:'Amida Falls', sub:'from A Tour of Japanese Waterfalls',
   why:'no date given in the gallery — and here the source disagrees with itself: the caption says a waterfall, the file it points at is named “Veld in de Owari provincie”, a field in Owari Province',
   src:'gallery', img:'20-amida-falls.jpg', iw:500, ih:731},
  {id:'u-masculine', t:'Masculine Wave', sub:'made at Obuse',
   why:'named beside the Feminine Wave, but given no date and no image', src:'p21'},
  {id:'u-store', t:'Store Selling Picture Books and Ukiyo-e', sub:'hand-coloured rather than printed from separated blocks',
   why:'no date and no image in this article', src:'p30'}
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
  {d:18,  y:'1867', t:'The Rousseau Service, designed from that sketchbook, is exhibited at the Universal Exposition in Paris, and reissued in several editions.', src:'p24'},
  {d:56,  y:'1905', t:'Debussy’s La Mer debuts. He keeps an impression of The Great Wave in his living room and asks for it on the cover of the published score.', src:'p26', img:'25-debussy-la-mer.jpg', iw:500, ih:655},
  {d:136, y:'1985', t:'Richard Lane, in the Encyclopædia Britannica: he has “impressed Western artists, critics and art lovers alike, more, possibly, than any other single Asian artist”.', src:'p29'},
  {d:156, y:'2005', t:'The Tokyo National Museum’s Hokusai exhibition draws the largest number of visitors of any exhibit there that year.', src:'p27'},
  {d:168, y:'2017', t:'The British Museum holds the first exhibition of his later-year artworks, The Great Wave among them.', src:'p27'}
];

const ALL = {};
WORKS.concat(UNDATED).forEach(w => ALL[w.id] = w);

const N_INSIDE   = WORKS.filter(w => w.ages[1] < 70).length;
const N_STRADDLE = WORKS.filter(w => w.ages[0] < 70 && w.ages[1] >= 70).length;
const N_AFTER    = WORKS.length - N_INSIDE - N_STRADDLE;

/* ══════════════════════════ dom ══════════════════════════ */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };

const plate = $('#plate'), chart = $('#chart'), regsEl = $('#regs'), layer = $('#layer'),
      axisEl = $('#axis'), namesEl = $('#names'), washEl = $('#wash'), sevEl = $('#seventy'),
      sevLab = $('#seventy-lab'), marginEl = $('#margin'), guessEl = $('#guess'),
      deathEl = $('#death'), portraitEl = $('#portrait'), narrEl = $('#narr'), dervEl = $('#foot-derv');

let state = 1, revealed = false, guessAge = null, showRanges = false, filterReg = null;
let geom = null;

/* ══════════════════════ static furniture ══════════════════════ */
const regNodes = REGS.map((r, i) => {
  const d = el('div', 'reg' + (r.verdict ? ' verdict' : ''));
  d.dataset.reg = i;
  d.append(el('div', 'rage', String(r.age)), el('div', 'rlab', r.text), el('div', 'rule'));
  const hit = el('button', 'rhit'); hit.type = 'button';
  hit.setAttribute('aria-label', 'Show only the works that fall in this register of his scale');
  hit.addEventListener('click', () => setFilter(filterReg === i ? null : i));
  d.appendChild(hit);
  regsEl.appendChild(d);
  return d;
});

const SH = {}, BAR = {};
WORKS.forEach(w => {
  const b = el('button', 'sheet enter' + (w.img ? '' : ' noimg') + (w.derived ? ' derived' : ''));
  b.type = 'button'; b.dataset.id = w.id;
  b.setAttribute('aria-label', w.t + ', ' + w.date);
  if (w.img) {
    const fill = el('div', 'plate-fill'); fill.style.background = '#cfc6b3';
    const im = new Image(); im.src = 'assets/' + w.img; im.alt = w.t; im.decoding = 'async'; im.loading = 'lazy';
    im.addEventListener('load', () => fill.remove());
    b.append(fill, im);
  } else b.appendChild(el('div', 'slash'));
  b.appendChild(el('span', 'anch', w.src));
  b.addEventListener('click', () => openInspector(w));
  layer.appendChild(b);
  SH[w.id] = b;
  const bar = el('div', 'bar');
  layer.appendChild(bar);
  BAR[w.id] = bar;
});

marginEl.appendChild(el('h3', null, 'Undated in this article — 10'));
{
  const ul = el('ul');
  UNDATED.forEach(u => {
    const li = el('li'), b = el('button'); b.type = 'button';
    const th = el('span', 'mth');
    if (u.img) {
      const h = 24, w = Math.round(h * u.iw / u.ih);
      th.style.width = w + 'px'; th.style.height = h + 'px';
      const im = new Image(); im.src = 'assets/' + u.img; im.alt = ''; im.loading = 'lazy';
      th.appendChild(im);
    } else th.style.cssText = 'width:14px;height:24px;border:1px solid var(--hair);background:none';
    b.append(th, el('span', 'mt', u.t));
    b.addEventListener('click', () => openInspector(u));
    li.appendChild(b); ul.appendChild(li);
  });
  marginEl.appendChild(ul);
}

/* ══════════════════════ geometry ══════════════════════ */
const narrow = () => window.innerWidth < 820;
const maxAge = () => state >= 4 ? 116 : 94;
const padL = () => narrow() ? 28 : 44;
const padR = () => (state === 3 && !narrow()) ? 212 : (narrow() ? 14 : 30);
const mid = w => (w.ages[0] + w.ages[1]) / 2;
const anchW = w => narrow() ? 2 : ((w.src.length + (w.derived ? 2 : 0)) * 6.3 + 7);

function layout() {
  const cw = chart.clientWidth;
  const marginStrip = (narrow() && state === 3) ? 54 : 0;
  const ch = chart.clientHeight - marginStrip;
  if (!cw || ch <= 40) return;
  const pL = padL(), pR = padR();
  chart.style.setProperty('--padL', pL + 'px');
  const plotW = Math.max(120, cw - pL - pR);
  const A2X = a => pL + (a / maxAge()) * plotW;
  const labelBand = narrow() ? 30 : 21;
  const pad = 4, gap = 4;
  const single = (state === 1 || state === 2 || state >= 4);

  const rows = REGS.map(() => []);
  let placed = [];

  function pack(h) {
    rows.forEach(r => r.length = 0);
    placed = [];
    const list = WORKS.slice().sort((a, b) => mid(a) - mid(b));
    for (const w of list) {
      const ri = regOf(showRanges ? w.ages[1] : mid(w));
      const wpx = w.img ? Math.max(6, Math.round(h * w.iw / w.ih)) : Math.round(h * 0.62);
      const cx = A2X(mid(w));
      let x0 = cx - wpx / 2, x1 = cx + wpx / 2 + anchW(w);
      if (x0 < pL - 10) { x0 = pL - 10; x1 = x0 + wpx + anchW(w); }
      if (x1 > pL + plotW + 26) { x1 = pL + plotW + 26; x0 = x1 - wpx - anchW(w); }
      const R = rows[ri];
      let r = 0;
      for (; r < R.length; r++) if (!R[r].some(s => !(x1 <= s.x0 - 3 || x0 >= s.x1 + 3))) break;
      if (r === R.length) R.push([]);
      const rec = {w, ri, r, x0, x1, wpx};
      R[r].push(rec); placed.push(rec);
    }
    return rows.reduce((s, r) => s + Math.max(1, r.length), 0);
  }

  const fixed = REGS.length * (labelBand + pad) + (REGS.length - 1) * gap;
  let sheetH, totalRows;
  if (single) { sheetH = 0; pack(20); totalRows = REGS.length; }
  else {
    sheetH = 8; totalRows = pack(sheetH);
    for (let h = 9; h <= 52; h++) {
      const t = pack(h);
      if (fixed + t * (h + 6) > ch) { pack(sheetH); break; }
      sheetH = h; totalRows = t;
    }
  }
  const pitch = sheetH + 6;

  const hs = REGS.map((r, i) => single
    ? labelBand + pad + (state === 2 && i === 2 ? 120 : pitch)
    : labelBand + pad + rows[i].length * pitch + (rows[i].length ? 0 : 3));
  let sum = hs.reduce((a, b) => a + b, 0) + (REGS.length - 1) * gap;
  const slack = ch - sum;
  if (slack > 0) { const each = slack / REGS.length; for (let i = 0; i < hs.length; i++) hs[i] += each; }
  else if (slack < 0) { const k = (ch - (REGS.length - 1) * gap) / (sum - (REGS.length - 1) * gap); for (let i = 0; i < hs.length; i++) hs[i] *= k; }

  const tops = [];
  let y = ch;
  for (let i = 0; i < REGS.length; i++) { y -= hs[i]; tops[i] = y; y -= gap; }

  geom = {pL, pR, plotW, A2X, tops, hs, labelBand, pitch, sheetH, ch, cw, rows};

  regNodes.forEach((d, i) => {
    d.style.top = tops[i] + 'px'; d.style.height = hs[i] + 'px';
    d.dataset.empty = (!single && rows[i].length === 0) ? '1' : '0';
  });

  const cellTop = (ri, r) => tops[ri] + hs[ri] - pad - (rows[ri].length - r) * pitch + 3;

  placed.forEach(rec => {
    const {w, ri, r, x0, wpx} = rec;
    const n = SH[w.id];
    const top = single ? tops[ri] + labelBand + 2 : cellTop(ri, r);
    n.style.left = x0 + 'px';
    n.style.top = top + 'px';
    n.style.width = wpx + 'px';
    n.style.height = sheetH + 'px';

    const bar = BAR[w.id];
    if (!single && showRanges && !w.exact && w.ages[1] > w.ages[0]) {
      const rlo = regOf(w.ages[0]), rhi = ri;
      const bx0 = A2X(w.ages[0]), bx1 = A2X(w.ages[1]);
      const yHi = top + sheetH + 3;
      const yLo = rlo === rhi ? yHi : tops[rlo] + hs[rlo] * 0.66;
      const cross = rlo === rhi ? bx1 : A2X(REGS[rhi].age);
      const top0 = Math.min(yLo, yHi);
      bar.style.left = bx0 + 'px';
      bar.style.top = top0 + 'px';
      bar.style.width = Math.max(2, bx1 - bx0) + 'px';
      bar.style.height = Math.max(2, Math.abs(yLo - yHi) + 2) + 'px';
      bar.innerHTML = '';
      const seg = (x, wd, yy) => { const d = el('div', 'seg'); d.style.cssText = `left:${x}px;top:${yy - top0}px;width:${Math.max(1, wd)}px`; return d; };
      const cap = (x, yy) => { const d = el('div', 'cap'); d.style.cssText = `left:${x}px;top:${yy - top0 - 4}px`; return d; };
      const wLo = Math.max(1, Math.min(bx1, cross) - bx0);
      bar.appendChild(seg(0, wLo, yLo));
      bar.appendChild(cap(0, yLo));
      if (rlo !== rhi) {
        const st = el('div', 'step');
        st.style.cssText = `left:${wLo}px;top:${Math.min(yLo, yHi) - top0}px;height:${Math.abs(yLo - yHi)}px`;
        bar.append(st, seg(wLo, bx1 - bx0 - wLo, yHi));
      }
      bar.appendChild(cap(bx1 - bx0 - 1.5, yHi));
      bar.dataset.on = '1';
    } else bar.dataset.on = '0';
  });

  if (state === 2) {
    const w = WORKS.find(x => x.id === 'w-great-wave');
    const ri = regOf(showRanges ? w.ages[1] : mid(w));
    const n = SH[w.id], bar = BAR[w.id];
    const h2 = Math.max(30, Math.min(150, hs[ri] - labelBand - 14));
    const w2 = h2 * w.iw / w.ih;
    const cx = A2X(mid(w));
    const top = tops[ri] + labelBand + 6;
    n.style.left = (cx - w2 / 2) + 'px';
    n.style.top = top + 'px';
    n.style.width = w2 + 'px';
    n.style.height = h2 + 'px';
    if (showRanges) {
      const rlo = regOf(w.ages[0]);
      const bx0 = A2X(w.ages[0]), bx1 = A2X(w.ages[1]);
      const yHi = top + h2 + 5;
      const yLo = tops[rlo] + hs[rlo] * 0.66;
      const cross = A2X(REGS[ri].age);
      const t0 = Math.min(yLo, yHi);
      bar.style.left = bx0 + 'px'; bar.style.top = t0 + 'px';
      bar.style.width = Math.max(2, bx1 - bx0) + 'px';
      bar.style.height = Math.max(2, Math.abs(yLo - yHi) + 2) + 'px';
      bar.innerHTML = '';
      const seg = (x, wd, yy) => { const d = el('div', 'seg'); d.style.cssText = `left:${x}px;top:${yy - t0}px;width:${Math.max(1, wd)}px`; return d; };
      const cap = (x, yy) => { const d = el('div', 'cap'); d.style.cssText = `left:${x}px;top:${yy - t0 - 4}px`; return d; };
      const wLo = Math.max(1, cross - bx0);
      bar.append(seg(0, wLo, yLo), cap(0, yLo));
      const st = el('div', 'step');
      st.style.cssText = `left:${wLo}px;top:${Math.min(yLo, yHi) - t0}px;height:${Math.abs(yLo - yHi)}px`;
      bar.append(st, seg(wLo, bx1 - bx0 - wLo, yHi), cap(bx1 - bx0 - 1.5, yHi));
      bar.dataset.on = '1';
      bar.style.opacity = '1';
    }
  }

  // the verdict region: left of seventy, across the three registers that can hold it
  const x70 = A2X(70);
  const topOfVerdict = tops[2];
  washEl.style.left = '0px';
  washEl.style.width = x70 + 'px';
  washEl.style.top = topOfVerdict + 'px';
  washEl.style.height = (ch - topOfVerdict) + 'px';
  sevEl.style.left = x70 + 'px';
  sevLab.style.left = (x70 + 6) + 'px';
  sevLab.style.top = (topOfVerdict - 15) + 'px';

  buildAxis(A2X);
  buildNames(A2X);
  layoutTail(A2X, tops, hs, ch);
  applyFilter();
}

function buildAxis(A2X) {
  axisEl.innerHTML = '';
  axisEl.appendChild(el('div', 'arule'));
  const ticks = state >= 4
    ? (narrow() ? [0,20,40,60,70,88,100,110] : [0,10,20,30,40,50,60,70,80,88,90,100,110])
    : (narrow() ? [0,20,40,60,70,88] : [0,10,20,30,40,50,60,70,80,88]);
  ticks.forEach(t => {
    const d = el('div', 'atick' + (t === 70 || t === 88 ? ' big' : ''));
    d.style.left = A2X(t) + 'px';
    d.append(el('i'), el('span', null, String(t)));
    axisEl.appendChild(d);
  });
  const note = el('p', 'axnote');
  note.innerHTML = state >= 4
    ? 'He died at eighty-eight. The axis runs on to a hundred and ten because <i>he</i> did.'
    : 'His age — but his date of birth is unclear (p3) and the infobox says “supposedly” 31 October 1760, so every age on this plate carries that doubt with it.';
  axisEl.appendChild(note);
  const r = el('p', 'axr mono', 'Vertical — his scale. Horizontal — his age.');
  axisEl.appendChild(r);
}

function buildNames(A2X) {
  namesEl.innerHTML = '';
  const ends = [-999, -999];
  NAMES.forEach(n => {
    const x = A2X(n.a);
    const w = n.n.length * 6.3 + 16;
    let row = 0;
    if (x < ends[0]) row = 1;
    if (row === 1 && x < ends[1]) row = 0;
    ends[row] = x + w;
    const d = el('div', 'ntick');
    d.style.left = x + 'px';
    d.style.top = (row ? 15 : 0) + 'px';
    d.append(el('span', null, n.n));
    namesEl.appendChild(d);
  });
}

/* ══════════════════════ the tail (movement 4) ══════════════════════ */
function layoutTail(A2X, tops, hs, ch) {
  const x88 = A2X(88);
  const yForecast = tops[4] + hs[4] * 0.55;
  const yDeath = tops[0] + hs[0] * 0.44;
  deathEl.innerHTML = '';
  const line = el('div', 'dline');
  line.style.cssText = `left:${x88}px;top:${yForecast}px;height:${yDeath - yForecast}px`;
  const fdot = el('div', 'fdot');
  fdot.style.cssText = `left:${x88 - 5}px;top:${yForecast - 5}px`;
  const flab = el('div', 'flab mono');
  flab.style.cssText = `left:${x88 - 12}px;top:${yForecast - 7}px;transform:translateX(-100%)`;
  flab.textContent = narrow() ? 'his forecast for 86' : 'what he forecast for eighty-six';
  const dot = el('div', 'dot');
  dot.style.cssText = `left:${x88 - 5}px;top:${yDeath - 5}px`;
  deathEl.append(line, fdot, flab, dot);
  if (!narrow()) {
    const q = el('div', 'dq');
    q.innerHTML = '“If only Heaven will give me just another ten years&nbsp;… Just another five more years, ' +
      'then I could become a real painter”' +
      '<span class="dsrc mono lc">On his deathbed, 1849 · p22. At eighty-eight he is asking for what the ' +
      'colophon promised him at eighty-six. Placing him below his own forecast is this page’s reading of ' +
      'the two quotations, not something he drew.</span>';
    const qw = 330;
    q.style.width = qw + 'px';
    q.style.left = Math.max(padL(), x88 - qw - 22) + 'px';
    q.style.bottom = (ch - yDeath + 12) + 'px';
    deathEl.appendChild(q);
  }

  // the portrait stands in the years he did not get
  const right = A2X(116);
  const availW = Math.max(60, right - x88 - 30);
  let ph = Math.min(ch * 0.54, availW * 2657 / 1280);
  let pw = ph * 1280 / 2657;
  portraitEl.style.left = (right - pw - 2) + 'px';
  portraitEl.style.top = (ch - ph - 54) + 'px';
  portraitEl.style.width = pw + 'px';
  portraitEl.style.height = ph + 'px';
  portraitEl.style.setProperty('--capw', Math.max(narrow() ? 110 : 150, availW) + 'px');
  portraitEl.querySelector('figcaption').textContent = narrow()
    ? 'The article’s lead image. Uncaptioned.'
    : 'Hokusai as an old man — the article’s lead image. It carries no caption at all.';
}

/* ══════════════════════ movement states ══════════════════════ */
const MV = [
  null,
  {n:'01', t:'The scale', h:'His scale, drawn. Nothing on it yet.'},
  {n:'02', t:'The commitment', h:'Where does this one go?'},
  {n:'03', t:'The population', h:N_INSIDE + ' of the ' + WORKS.length + ' works this article dates fall inside his verdict. ' + N_STRADDLE + ' straddle it.'},
  {n:'04', t:'The tail', h:'Three of his eight milestones have no data.'}
];

const NARR = {
  1: ['The graph is his sentence and nothing else — eight attainments, eight ages. Three of the eight fall after the end of his life.',
      'Derived, not stated: every age here is a year in this article minus a birth of c.&nbsp;1760.'],
  2: ['One print, no label. It is resting where nothing can be plotted — above every register, past the end of his life. Drag it along the age axis to the year you think he made it, then let go; arrow keys and Enter work too. <button type="button" class="skip" id="skip-guess">Skip the guess, show me</button>',
      'Turning date ranges on replaces every dot with the span the article actually gives — a dot is less honest than a bar.'],
  3: ['This article dates ' + WORKS.length + ' works. He is said to have made about thirty thousand (p2), so this plot is less than a tenth of one per cent of him — and every gap in it is the encyclopaedia’s, not his. Tap one of his eight registers to keep only the works that fall in it.',
      'Derived, not stated: a year <i>y</i> gives ages <i>y</i>−1761 to <i>y</i>−1760. ⊘ marks a print the article dates only through its series. Anchors: <i>p14</i> a paragraph · <i>cap</i> an image caption · <i>gal</i> the Selected works gallery.'],
  4: ['Nothing on this screen can be clicked, because there is nothing on it. He forecast three more attainments — at ninety, at a hundred, at a hundred and ten — and the article records no work in any of them.',
      'Derived, not stated: 1849 − 1760 = 88. The last three registers are empty because the evidence is.']
};

function setState(s, force) {
  s = Math.max(1, Math.min(4, s));
  if (s === state && !force) return;
  const prev = state;
  state = s;
  $('#mv-no').textContent = MV[s].n;
  $('#mv-name').textContent = MV[s].t;
  $('#mv-head').textContent = MV[s].h;
  plate.dataset.ground = s === 4 ? 'ink' : 'bone';
  $$('#idx button').forEach(b => b.setAttribute('aria-current', String(b.dataset.go === 'm' + s)));

  if (!(s === 2 && revealed)) setNarr(s);

  plate.dataset.state = s;
  namesEl.style.opacity = s >= 3 ? '1' : '0';
  marginEl.classList.toggle('on', s === 3);
  guessEl.classList.toggle('on', s === 2 && !revealed);
  $('#guess-mark').style.opacity = (guessAge == null || s < 2 || s >= 4) ? '0' : (s === 2 ? '1' : '.45');
  washEl.style.opacity = (s >= 2 && s < 4) ? '1' : '0';
  sevEl.style.opacity = s < 2 ? '0' : (s === 4 ? '.45' : '1');
  sevLab.style.opacity = s >= 2 ? '1' : '0';
  deathEl.style.opacity = s === 4 ? '1' : '0';
  portraitEl.style.opacity = s === 4 ? '1' : '0';
  $('#ranges-tgl').style.visibility = s >= 2 && s < 4 ? 'visible' : 'hidden';
  $('#filt').hidden = !(s === 3 && filterReg != null);
  drag.style.display = (s === 2 && !revealed) ? 'block' : 'none';

  if (s === 1) {
    WORKS.forEach(w => { SH[w.id].classList.add('enter'); SH[w.id].classList.remove('gone', 'dim'); });
  } else if (s === 2) {
    WORKS.forEach(w => {
      const n = SH[w.id]; n.classList.remove('gone', 'dim');
      n.classList.toggle('enter', !(w.id === 'w-great-wave' && revealed));
    });
  } else if (s === 3) {
    revealed = true;
    WORKS.forEach(w => SH[w.id].classList.remove('gone'));
    if (prev !== 3) {
      layer.classList.add('noslide');
      setTimeout(() => layer.classList.remove('noslide'), 60);
    }
    land(prev !== 3);
  } else if (s === 4) {
    setFilter(null, true);
    WORKS.forEach(w => { SH[w.id].classList.remove('enter', 'dim'); SH[w.id].classList.add('gone'); });
  }
  layout();
  if (s === 2 && !revealed) placeDragHome();
}

function setNarr(s, override) {
  let c = override || NARR[s];
  if (narrow() && !override && s === 4)
    c = ['On his deathbed, 1849: “If only Heaven will give me just another ten years … Just another five more years, then I could become a real painter” (p22). At eighty-eight he is asking for what the colophon promised him at eighty-six — which is why the blue point sits below the ring. ' + c[0], c[1]];
  if (narrow() && !override && s === 1)
    c = [c[0] + ' His date of birth is unclear (p3) and the infobox says “supposedly” 31 October 1760, so every age here carries that doubt.', c[1]];
  narrEl.innerHTML = c[0];
  dervEl.innerHTML = c[1];
  const sk = $('#skip-guess');
  if (sk) sk.addEventListener('click', () => { guessAge = null; reveal(); });
}

let landTimer = [];
function land(stagger) {
  landTimer.forEach(clearTimeout); landTimer = [];
  const noMotion = document.body.classList.contains('nomotion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  WORKS.slice().sort((a, b) => mid(a) - mid(b)).forEach((w, i) => {
    const n = SH[w.id];
    if (!stagger || noMotion) { n.classList.remove('enter'); return; }
    landTimer.push(setTimeout(() => n.classList.remove('enter'), 40 * i));
  });
}

function applyFilter() {
  WORKS.forEach(w => {
    const on = filterReg == null || regOf(showRanges ? w.ages[1] : mid(w)) === filterReg;
    SH[w.id].classList.toggle('dim', !on);
    BAR[w.id].style.opacity = (BAR[w.id].dataset.on === '1' && on && (state === 3 || (state === 2 && w.id === 'w-great-wave'))) ? '1' : '0';
  });
}
function setFilter(i, silent) {
  filterReg = i;
  regNodes.forEach((d, k) => d.classList.toggle('filt-off', i != null && k !== i));
  applyFilter();
  const f = $('#filt');
  if (i == null) {
    f.hidden = true;
    if (state === 3) $('#mv-head').textContent = MV[3].h;
  } else {
    const n = WORKS.filter(w => regOf(showRanges ? w.ages[1] : mid(w)) === i).length;
    f.textContent = 'clear the filter';
    f.hidden = state !== 3;
    if (state === 3) $('#mv-head').textContent =
      n + ' of the ' + WORKS.length + ' fall in “' + REGS[i].text + '”';
  }
}
$('#filt').addEventListener('click', () => setFilter(null));

/* ══════════════════════ the prediction beat ══════════════════════ */
const drag = $('#dragsheet');
function placeDragHome() {
  if (!geom) return;
  // it rests in the one quadrant of the plate nothing can occupy:
  // above every register that holds data, past the end of his life.
  const h = Math.min(narrow() ? 78 : 132, geom.ch * 0.24);
  const w = h * 1280 / 876;
  drag.style.width = w + 'px'; drag.style.height = h + 'px';
  if (drag.dataset.moved !== '1') {
    drag.style.left = Math.max(geom.pL, geom.pL + geom.plotW - w - 4) + 'px';
    drag.style.top = (geom.tops ? geom.tops[narrow() ? 7 : 6] + 6 : 8) + 'px';
  }
}

let dragging = false, dx = 0, dy = 0;
drag.addEventListener('pointerdown', e => {
  if (revealed) return;
  dragging = true; drag.setPointerCapture(e.pointerId);
  const r = drag.getBoundingClientRect();
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
  commitGuess(e.clientX - c.left);
});
drag.addEventListener('keydown', e => {
  if (revealed) return;
  const step = e.shiftKey ? 48 : 14;
  const cur = parseFloat(drag.style.left) || 0;
  if (e.key === 'ArrowRight') { drag.dataset.moved = '1'; drag.style.left = (cur + step) + 'px'; e.preventDefault(); e.stopPropagation(); }
  else if (e.key === 'ArrowLeft') { drag.dataset.moved = '1'; drag.style.left = Math.max(0, cur - step) + 'px'; e.preventDefault(); e.stopPropagation(); }
  else if (e.key === 'Enter' || e.key === ' ') { commitGuess(cur + (parseFloat(drag.style.width) || 0) / 2); e.preventDefault(); }
});

function commitGuess(cx) {
  if (!geom || revealed) return;
  // a print that was never moved is not a guess
  guessAge = drag.dataset.moved === '1'
    ? Math.round(Math.max(0, Math.min(maxAge(), (cx - geom.pL) / geom.plotW * maxAge())))
    : null;
  reveal();
}

function reveal() {
  if (revealed) return;
  revealed = true;
  showRanges = true; syncRangesTgl();
  layout();
  const target = SH['w-great-wave'];
  target.classList.remove('enter');
  const r = target.getBoundingClientRect(), c = chart.getBoundingClientRect();
  drag.style.transition = 'left 350ms cubic-bezier(.4,0,.2,1), top 350ms cubic-bezier(.4,0,.2,1), width 350ms cubic-bezier(.4,0,.2,1), height 350ms cubic-bezier(.4,0,.2,1), opacity 200ms 260ms';
  requestAnimationFrame(() => {
    drag.style.left = (r.left - c.left) + 'px';
    drag.style.top = (r.top - c.top) + 'px';
    drag.style.width = r.width + 'px';
    drag.style.height = r.height + 'px';
    drag.style.opacity = '0';
  });
  setTimeout(() => { drag.style.display = 'none'; }, 620);

  const gm = $('#guess-mark');
  if (guessAge != null && geom) {
    gm.innerHTML = '';
    const l = el('div', 'gl'); l.style.left = geom.A2X(guessAge) + 'px';
    const t = el('div', 'gt', 'your guess — age ' + guessAge);
    const gx = geom.A2X(guessAge);
    if (gx > geom.pL + geom.plotW * 0.66) {
      t.style.left = (gx - 6) + 'px'; t.style.transform = 'translateX(-100%)';
    } else t.style.left = (gx + 6) + 'px';
    gm.append(l, t);
    gm.style.opacity = '1';
  }
  $('#mv-head').textContent = 'He was between sixty-eight and seventy-two.';
  setNarr(2, [
    'c.&nbsp;1829–1832 — the bar crosses his line at seventy. The most reproduced image in the world was made inside the years its author wrote off.' +
    (guessAge != null ? (guessAge < 70
      ? ' You put it at age ' + guessAge + ', which is inside them too.'
      : ' You put it at age ' + guessAge + '; his own answer is lower than that.') : ''),
    'Derived: c.&nbsp;1829–1832 (caption) − born c.&nbsp;1760 (infobox, p3) ⇒ ages ≈ 68–72. Date ranges are now on, so every work shows its true span.'
  ]);
}

/* ══════════════════════ ranges toggle ══════════════════════ */
function syncRangesTgl() {
  const t = $('#ranges-tgl');
  t.setAttribute('aria-pressed', String(showRanges));
  t.textContent = showRanges ? 'Date ranges — on' : 'Date ranges — off';
}
$('#ranges-tgl').addEventListener('click', () => { showRanges = !showRanges; syncRangesTgl(); layout(); });
syncRangesTgl();

/* ══════════════════════ inspector ══════════════════════ */
const insp = $('#insp');
let lastFocus = null;
function openInspector(w) {
  if (state === 4) return;
  lastFocus = document.activeElement;
  const fig = $('#insp-fig'), meta = $('#insp-meta');
  fig.innerHTML = ''; meta.innerHTML = '';
  if (w.img) { const im = new Image(); im.src = 'assets/' + w.img; im.alt = w.t; fig.appendChild(im); }
  else {
    const d = el('div', 'noimgbox');
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
    row('Derived, not stated', w.exact
      ? w.date + ' − born c. 31 Oct 1760 ⇒ age ' + w.ages[0]
      : w.date + ' − born c. 1760 ⇒ ages ≈ ' + w.ages[0] + '–' + w.ages[1]);
    row('Its register on his scale', '“' + REGS[regOf(mid(w))].text + '”');
    if (w.ages[1] < 70) row('His verdict on it', '“nothing worth taking into account”');
    else if (w.ages[0] < 70) row('His verdict on it', 'the range straddles seventy, so part of it falls inside “nothing worth taking into account”');
  } else {
    row('Date', 'None given in this article');
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
document.addEventListener('click', e => {
  const a = e.target.closest('a.toplot');
  if (!a) return;
  e.preventDefault();
  const w = ALL[a.dataset.work];
  if (w) openInspector(w);
});

/* ══════════════════════ scroll → state ══════════════════════ */
const graph = $('#graph');
const FRAC = [0, 0.03, 0.30, 0.60, 0.90];
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
    trackSection();
  });
}
window.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('scroll', () => { if (!raf) trackSection(); }, {passive:true});
function gotoState(n) {
  const r = graph.getBoundingClientRect();
  const top = window.scrollY + r.top;
  window.scrollTo({top: top + (r.height - window.innerHeight) * FRAC[n], behavior:'smooth'});
}

let rz = 0;
window.addEventListener('resize', () => {
  clearTimeout(rz);
  rz = setTimeout(() => { layout(); placeDragHome(); buildPost(); }, 130);
});

/* ══════════════════════ chrome ══════════════════════ */
$$('#idx button').forEach(b => b.addEventListener('click', () => {
  const go = b.dataset.go;
  if (go === 'm0') window.scrollTo({top:0, behavior:'smooth'});
  else if (go === 'm5' || go === 'm6') $('#' + go).scrollIntoView({behavior:'smooth'});
  else gotoState(+go.slice(1));
}));
$('#pause').addEventListener('click', function () {
  const on = document.body.classList.toggle('nomotion');
  this.setAttribute('aria-pressed', String(on));
  this.textContent = on ? 'Motion — paused' : 'Motion — running';
});
document.addEventListener('keydown', e => {
  if (insp.classList.contains('on')) return;
  if (document.activeElement === drag) return;
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const r = graph.getBoundingClientRect();
  if (r.top > 4 || r.bottom < window.innerHeight) return;
  e.preventDefault();
  gotoState(Math.max(1, Math.min(4, state + (e.key === 'ArrowRight' ? 1 : -1))));
});

/* ══════════════════════ movement 5 ══════════════════════ */
function buildPost() {
  const host = $('#post');
  if (!host) return;
  host.innerHTML = '';
  host.classList.remove('narrow');
  const W0 = host.clientWidth, H0 = host.clientHeight;
  if (!W0 || !H0) return;
  const nar = narrow();
  const pL = nar ? 26 : 44;
  host.style.setProperty('--padL5', pL + 'px');

  if (nar) { buildPostNarrow(host, pL); return; }

  /* his ladder, above and finished */
  const rh = nar ? 15 : 18;
  const ladderH = rh * REGS.length;
  for (let i = REGS.length - 1; i >= 0; i--) {
    const d = el('div', 'ghostreg');
    d.style.top = ((REGS.length - 1 - i) * rh) + 'px';
    d.style.height = rh + 'px';
    d.append(el('em', null, String(REGS[i].age)), el('span', null, REGS[i].text));
    host.appendChild(d);
  }
  const dead = el('div', 'deadrule'); dead.style.top = ladderH + 'px';
  const deadLab = el('div', 'deadlab', 'His scale ends here — 10 May 1849');
  deadLab.style.top = (ladderH + 6) + 'px';
  host.append(dead, deadLab);

  /* posterity, below, on a relabelled axis */
  const ruleTop = ladderH + (nar ? 42 : 48);
  const pW = W0 - pL - (nar ? 8 : 24);
  const X = d => pL + (d / 178) * pW;
  const rule = el('div', 'prule'); rule.style.top = ruleTop + 'px';
  const lab = el('div', 'plabel', 'Years after his death');
  lab.style.top = (ruleTop - 16) + 'px'; lab.style.left = pL + 'px';
  host.append(rule, lab);

  const w = nar ? 150 : 218;
  const rowH = nar ? 104 : 126;
  const ends = [];
  POST.forEach(p => {
    let x = X(p.d);
    if (x + w > W0) x = W0 - w;
    let row = 0;
    while (ends[row] != null && x < ends[row]) row++;
    ends[row] = x + w + 14;
    const d = el('div', 'pev');
    d.style.left = x + 'px';
    d.style.top = (ruleTop + 1 + row * rowH) + 'px';
    d.style.width = w + 'px';
    d.appendChild(el('i'));
    d.appendChild(el('span', 'py', p.y + ' · +' + p.d));
    d.appendChild(el('span', 'pt', p.t));
    d.appendChild(el('span', 'ps mono', p.src));
    if (p.img) {
      const im = new Image(); im.src = 'assets/' + p.img;
      im.alt = 'Cover of Debussy\u2019s La Mer, 1905'; im.loading = 'lazy';
      d.appendChild(im);
    }
    host.appendChild(d);
    if (row > 0) {
      const drop = el('div', 'pdrop');
      drop.style.cssText = `left:${x}px;top:${ruleTop}px;height:${row * rowH}px`;
      host.appendChild(drop);
    }
  });
}

function buildPostNarrow(host, pL) {
  host.classList.add('narrow');
  const lad = el('div', 'ladder');
  for (let i = REGS.length - 1; i >= 0; i--) {
    const d = el('div', 'ghostrow');
    d.append(el('em', null, String(REGS[i].age)), el('span', null, REGS[i].text));
    lad.appendChild(d);
  }
  const dead = el('p', 'deadlab2 mono', 'His scale ends here — 10 May 1849');
  const lab = el('p', 'plabel2 mono', 'Years after his death');
  host.append(lad, dead, lab);
  const ul = el('ul', 'plist');
  POST.forEach(p => {
    const li = el('li');
    const bar = el('div', 'pbar');
    bar.style.width = (p.d / 178 * 100) + '%';
    const head = el('div', 'phead');
    head.append(el('b', null, p.y), el('span', null, '+' + p.d));
    const t = el('p', 'pt2', p.t);
    const sc = el('span', 'mono', p.src);
    li.append(bar, head, t, sc);
    if (p.img) {
      const im = new Image(); im.src = 'assets/' + p.img;
      im.alt = 'Cover of Debussy\u2019s La Mer, 1905'; im.loading = 'lazy';
      li.appendChild(im);
    }
    ul.appendChild(li);
  });
  host.appendChild(ul);
}

/* the movement index tracks whichever section owns the middle of the viewport */
function trackSection() {
  const mid = window.innerHeight / 2;
  const owns = n => { const r = n.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; };
  const m0 = $('#m0'), m5 = $('#m5'), m6 = $('#m6');
  let id = null;
  if (m6 && owns(m6)) id = 'm6';
  else if (m5 && owns(m5)) id = 'm5';
  else if (graph && owns(graph)) id = 'm' + state;
  else if (m0 && owns(m0)) id = 'm0';
  if (!id) return;
  const inPlate = id === 'm1' || id === 'm2' || id === 'm3' || id === 'm4';
  document.body.classList.toggle('ink-chrome', inPlate && state === 4);
  $$('#idx button').forEach(b => b.setAttribute('aria-current', String(b.dataset.go === id)));
}

/* ══════════════════════ boot ══════════════════════ */
function boot() {
  layout();
  setState(1, true);
  buildPost();
  onScroll();
  trackSection();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
window.addEventListener('load', () => { layout(); placeDragHome(); buildPost(); });

})();
