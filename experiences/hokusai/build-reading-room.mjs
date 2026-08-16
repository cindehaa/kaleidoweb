/* Generates movement 6 (the reading room) from the benchmark content model,
   and splices it into index.html at the <!--READING_ROOM--> marker.

   v2: the room is a SPINE, not a reproduction. Every paragraph the article
   has is still here and still findable, but the long stretches are folded
   into `hidden="until-found"` blocks (script applies the attribute), so
   the browser's own find-in-page reaches every word and opens the block
   that holds it. Surface parity is not how truth is preserved;
   reachability is. (DESIGN_PRINCIPLES §1.6, §4.11, EDITORIAL E13)

   Run: node experiences/hokusai/build-reading-room.mjs   */
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = new URL('../../', import.meta.url).pathname;
const cm = JSON.parse(readFileSync(ROOT + 'benchmarks/hokusai/content-model.json', 'utf8'));
const sem = JSON.parse(readFileSync(ROOT + 'benchmarks/hokusai/semantic.json', 'utf8'));

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* works named in the prose that have a place on the plot or in the margin */
const LINKS = [
  ['The Great Wave off Kanagawa', 'w-great-wave'],
  ['Thirty-Six Views of Mount Fuji', 'w-great-wave'],
  ['Thirty-six Views of Mount Fuji', 'w-great-wave'],
  ['Fine Wind, Clear Morning', 'w-fine-wind'],
  ['Fireworks in the Cool of Evening at Ryogoku Bridge in Edo', 'w-fireworks'],
  ['Famous Sights of the Eastern Capital', 'w-famous-sights'],
  ['Eight Views of Edo', 'w-eight-views'],
  ['Chinsetsu Yumiharizuki', 'w-chinsetsu'],
  ['The Dream of the Fisherman’s Wife', 'w-kinoe'],
  ["The Dream of the Fisherman's Wife", 'w-kinoe'],
  ['Quick Lessons in Simplified Drawing', 'w-quick-lessons'],
  ['Hokusai Manga', 'w-manga1'],
  ['Great Daruma', 'w-daruma-nagoya'],
  ['A True Mirror of Chinese and Japanese Poetry', 'w-true-mirror'],
  ['One Hundred Views of Mount Fuji', 'w-100-views'],
  ['One Hundred Poems Explained by a Nurse', 'w-100-poems'],
  ['Masculine Wave', 'u-masculine'],
  ['Feminine Wave', 'w-feminine-wave'],
  ['The Dragon of Smoke Escaping from Mt Fuji', 'w-dragon-smoke'],
  ['Tiger in the Snow', 'w-tiger'],
  ['A Tour of the Waterfalls of the Provinces', 'u-kirifuri'],
  ['Oceans of Wisdom', 'u-choshi'],
  ['Unusual Views of Celebrated Bridges in the Provinces', 'u-tenman'],
  ['Store Selling Picture Books and Ukiyo-e', 'u-store']
];

function linkWorks(html) {
  const used = new Set();
  for (const [phrase, id] of LINKS) {
    if (used.has(id)) continue;
    const i = html.indexOf(phrase);
    if (i < 0) continue;
    if (/<[^>]*$/.test(html.slice(0, i))) continue;   // don't link inside a tag
    used.add(id);
    html = html.slice(0, i) +
      `<a class="st toplot" href="#graph" data-work="${id}">${phrase}</a>` +
      html.slice(i + phrase.length);
  }
  return html;
}

const para = (p) => `<p id="${p.id}">${linkWorks(esc(p.text))}</p>`;

const FILE = [
  '00-hokusai-as-an-old-man.jpg', '01-courtesan-asleep.jpg', '02-ryogoku-fireworks.jpg',
  '03-manga-bathers.jpg', '04-great-daruma-1817.jpg', '05-great-wave.jpg',
  '06-fine-wind-clear-morning.jpg', '07-portrait-eisen.png', '08-thunderstorm-beneath-summit.jpg',
  '09-kirifuri-waterfall.jpg', '10-fishermans-wife.jpg', '11-cuckoo-azaleas.jpg',
  '12-egrets-quick-lessons.jpg', '13-carp-cascade.jpg', '14-lantern-ghost-oiwa.jpg',
  '15-still-life.jpg', '16-kajikazawa.jpg', '17-tenman-bridge.jpg',
  '18-choshi-oceans-of-wisdom.jpg', '19-big-wave-100-views.jpg', '20-amida-falls.jpg',
  '21-obuse-dragon.jpg', '22-feminine-wave.jpg', '23-dragon-of-smoke.png',
  '24-tiger-in-the-snow.jpg', '25-debussy-la-mer.jpg'
];

function figure(i) {
  const im = cm.images[i];
  const cap = im.caption ? esc(im.caption) : 'Uncaptioned in the article.';
  return `<figure><img src="assets/${FILE[i]}" alt="${esc(im.caption || im.file.replace('File:', '').replace(/_/g, ' '))}" loading="lazy">
<figcaption class="cat">${cap}</figcaption></figure>`;
}

const S = i => cm.sections[i];
const P = (si, k) => para(S(si).paragraphs[k]);

/* ── the fold: subordinated prose, findable, browser-revealable ──
   The label carries what is inside and where it is in the source, so
   deleting it would lose the only handle on that region (§2.11). */
let foldSeq = 0;
function fold(label, inner) {
  const id = 'fold-' + (++foldSeq);
  return `<div class="fold">
  <button type="button" class="fold-tg" aria-expanded="false" aria-controls="${id}"><span class="ex">+</span><span>${label}</span></button>
  <div class="fold-body" id="${id}">${inner}</div>
</div>`;
}

/* ── selected works, anchored back into the plot ── */
const SEL_IDS = ['w-thunderstorm','u-kirifuri','w-kinoe','w-cuckoo','w-quick-lessons','u-carp','u-oiwa',
  'u-stilllife','w-kajikazawa','u-tenman','u-choshi','w-100-views','u-amida','w-obuse-dragon',
  'w-feminine-wave','w-dragon-smoke','w-tiger'];
const selList = S(4).lists[0].map((t, i) =>
  `<li><span class="num">${String(i + 1).padStart(2, '0')}</span><a class="st toplot" href="#graph" data-work="${SEL_IDS[i]}">${esc(t)}</a></li>`).join('\n');

/* ── reference lists as end matter ── */
const refBlock = (title, items) =>
  `<details><summary>${esc(title)} — ${items.length}</summary><ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></details>`;

const names = sem.names.map(n => {
  const yr = (n['period/meaning'].match(/\b(17|18)\d\d\b/) || [])[0];
  const age = yr ? `age ${+yr - 1761}–${+yr - 1760}` : '—';
  return `<li><span class="nm">${esc(n.name)}</span><span class="mn">${esc(n['period/meaning'])}</span>
  <span class="ag cat">${age} · ${esc(n.src)}</span></li>`;
}).join('\n');

const colophon = sem.quotes[1].text;

const html = `<section id="m6" aria-label="The reading room">
  <div class="rr-top">
    <div class="mv-id"><b>06</b><span class="cat">The reading room</span></div>
    <span class="cat">Folded passages open on find-in-page.</span>
  </div>

  <div class="rr-head">
    <h2>Hokusai</h2>
    <p class="cat">${esc(cm.description)} · English Wikipedia, revision ${cm.revision}. Titles link
    back to the plot.</p>
  </div>

  <div class="rr">

    ${P(0, 0)}
    ${fold('Thirty-six Views, and thirty thousand things · p1, p2', P(0, 1) + '\n' + P(0, 2))}

    <h3>Early life</h3>
    ${fold('Birth, thirty names, the bookshop, Shunshō’s studio, and the expulsion he called inspirational · p3–p8',
      P(1, 0) + '\n' + P(1, 1) + '\n' + figure(1) + '\n' + P(1, 2) + '\n' + figure(2) + '\n' + P(1, 3) + '\n' + P(1, 4) + '\n' + P(1, 5))}

    <h3>Middle period</h3>
    ${figure(5)}
    ${fold('The Tawaraya years, the Daruma, Bakin, the Manga, and the Fuji series · p9–p16',
      P(2, 0) + '\n' + figure(3) + '\n' + P(2, 1) + '\n' + P(2, 2) + '\n' + figure(4) + '\n' + P(2, 3) + '\n' + P(2, 4) + '\n' + P(2, 5) + '\n' + figure(6) + '\n' + P(2, 6) + '\n' + P(2, 7))}

    <h3>Later life</h3>
    ${P(3, 0)}
    ${P(3, 1)}

    <blockquote class="colo">${esc(colophon)}
      <cite class="cat">Colophon to One Hundred Views of Mount Fuji, 1834 · p18.</cite></blockquote>

    ${figure(7)}
    ${fold('The hand scrolls, the studio fire, Obuse, the morning lions, and his deathbed · p19–p22',
      P(3, 2) + '\n' + P(3, 3) + '\n' + P(3, 4) + '\n' + P(3, 5))}

    <h3>Selected works</h3>
    ${fold('The article’s gallery — seventeen works, eight of them undated',
      `<ol class="sel">${selList}</ol>`)}

    <h3>Influence on art and culture</h3>
    ${fold('Bracquemond, the Rousseau Service, Debussy, Britannica, the exhibitions, Zelazny, and his daughter Ei · p23–p32',
      P(5, 0) + '\n' + P(5, 1) + '\n' + P(5, 2) + '\n' + figure(25) + '\n' + P(5, 3) + '\n' + P(5, 4) + '\n' + P(5, 5) + '\n' +
      P(5, 6) + '\n' + P(5, 7) + '\n' + P(5, 8) + '\n' + P(5, 9))}

    <h3>The eight names this article documents</h3>
    <p class="cat">p4: “His name changes are so frequent, and so often related to changes in his artistic
    production and style, that they are used for breaking his life up into periods.”</p>
    ${fold('The eight, with what each one marked',
      `<ul class="names-tbl">
      ${names}
      <li><span class="nm blank">and at least twenty-two more</span><span class="mn blank">not documented in this
      article</span><span class="ag cat">p4</span></li>
    </ul>`)}

    <h3>End matter</h3>
    ${refBlock('General and cited references', S(6).lists[0])}
    ${refBlock('Further reading — general biography', S(7).lists[0])}
    ${refBlock('Further reading — specific works of art', S(8).lists[0])}
    ${refBlock('Further reading — art monographs', S(9).lists[0])}
    ${refBlock('External links — prints', S(10).lists[0])}
    ${refBlock('External links — biographies', S(11).lists[0])}

    <div id="endmatter">
      <h3>The page’s own hand</h3>
      ${fold('Where the colours, the faces and the arithmetic came from', `<dl>
        <dt>Indigo</dt>
        <dd>His voice, and nothing else. Sampled from the deep blue field of <i>Fine Wind, Clear Morning</i>
        (<b>#0C3254</b>). Every register label on the plot is his own wording.</dd>
        <dt>Vermilion, stamped</dt>
        <dd>Posterity, and the arithmetic this page did that the article did not. Sampled from the vermilion
        ground of the <i>Dragon on the Higashimachi Festival Float</i>, Obuse, 1844 (<b>#CE3F3A</b>).
        It is a seal, never a tint of text.</dd>
        <dt>The sheet</dt>
        <dd>The ground is the paper margin of the surimono <i>Still Life</i>, measured at x0–96 y288–384
        (<b>#DDD4C5</b>), with its fibre kept rather than cleaned off. The rules are key-block lines at
        1.75px, because a print outlines every region before it colours one.</dd>
        <dt>Faces</dt>
        <dd>Newsreader for narration — an imported voice, and marked as ours. A Japanese gothic
        (Zen Kaku Gothic New) for dates, sources and measurements: the register the museums that hold him
        set their labels in.</dd>
        <dt>What is derived</dt>
        <dd>Every age on the plot. The article gives years; the ages are years less a birth of c.&nbsp;1760,
        which the infobox itself calls supposed. Wherever a number was calculated rather than read, the seal
        is stamped beside it.</dd>
        <dt>Source</dt>
        <dd><a class="ext" href="${cm.sourceUrl}">${cm.sourceUrl}</a> — revision ${cm.revision}. Every fact
        here comes from that article and nothing else.</dd>
      </dl>`)}
    </div>

  </div>
</section>`;

const idxPath = ROOT + 'experiences/hokusai/index.html';
let idx = readFileSync(idxPath, 'utf8');
idx = idx.replace(/<!--READING_ROOM-->[\s\S]*?(?=\n<!-- persistent chrome)/, '<!--READING_ROOM-->\n' + html + '\n');
writeFileSync(idxPath, idx);
console.log('reading room: ' + html.length + ' bytes spliced, ' + foldSeq + ' folds');
