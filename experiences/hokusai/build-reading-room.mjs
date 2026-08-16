/* Generates movement 6 (the reading room) from the benchmark content model,
   and splices it into index.html at the <!--READING_ROOM--> marker.
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
    // don't link inside an existing tag
    if (/<[^>]*$/.test(html.slice(0, i))) continue;
    used.add(id);
    html = html.slice(0, i) +
      `<a class="st toplot" href="#graph" data-work="${id}">${phrase}</a>` +
      html.slice(i + phrase.length);
  }
  return html;
}

const para = (p) => `<p id="${p.id}">${linkWorks(esc(p.text))}</p>`;

const IMG = {};
cm.images.forEach((im, i) => { IMG[i] = im; });
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

function figure(i, extra) {
  const im = cm.images[i];
  const cap = im.caption ? esc(im.caption) : 'The article gives this image no caption.';
  return `<figure><img src="assets/${FILE[i]}" alt="${esc(im.caption || im.file.replace('File:', '').replace(/_/g, ' '))}" loading="lazy">
<figcaption class="mono lc">${cap}${extra ? ' — ' + extra : ''}</figcaption></figure>`;
}

const S = i => cm.sections[i];
const paras = i => S(i).paragraphs.map(para).join('\n');
// interleave figures so the evidence column stays populated down the page
const parasWith = (i, figs) => S(i).paragraphs.map((p, k) =>
  (figs[k] != null ? figure(figs[k]) + '\n' : '') + para(p)).join('\n');

/* ── selected works gallery list, anchored back into the plot ── */
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
  <span class="ag mono">${age} · ${esc(n.src)}</span></li>`;
}).join('\n');

const colophon = sem.quotes[1].text;

const html = `<section id="m6" aria-label="The reading room">
  <div class="rr-top">
    <div class="mv-id"><b>06</b><span class="mono">The reading room</span></div>
    <span class="mono">Every word of the article, at reading width. Nothing here is collapsed away from find-in-page.</span>
  </div>

  <div class="rr-head">
    <h2>Hokusai</h2>
    <p>${esc(cm.description)} · The whole of the English Wikipedia article as it stood at revision ${cm.revision},
    in its own order. Names of works link back to their position on the plot. Everything above this line was an
    argument built out of two of these paragraphs; everything below is the article itself.</p>
  </div>

  <div class="rr">

    ${paras(0)}

    <h3>Early life</h3>
    ${parasWith(1, {2: 1, 3: 2})}

    <h3>Middle period</h3>
    ${parasWith(2, {0: 3, 2: 4, 4: 5, 6: 6})}

    <h3>Later life</h3>
    ${S(3).paragraphs.slice(0, 2).map(para).join('\n')}

    <blockquote class="colo">${esc(colophon)}
      <cite class="mono lc">The colophon to One Hundred Views of Mount Fuji, quoted in the article’s Later life section.
      This is the whole of the scale the plot above is drawn from — eight attainments, eight ages, three of them
      past the end of his life.</cite></blockquote>

    ${figure(7)}
    ${S(3).paragraphs.slice(2).map(para).join('\n')}

    <h3>Selected works</h3>
    <p class="mono lc" style="max-width:660px">The article’s own gallery: seventeen works and not one word of prose
    around them. Eight of the seventeen carry no date, which is why the plot above has a margin.</p>
    <ol class="sel">${selList}</ol>

    <h3>Influence on art and culture</h3>
    ${parasWith(5, {3: 25})}

    <h3>The eight names this article documents</h3>
    <p class="mono lc" style="max-width:660px">p4: “Hokusai was known by at least thirty names during his lifetime…
    His name changes are so frequent, and so often related to changes in his artistic production and style, that they
    are used for breaking his life up into periods.” The article states the right periodisation and then files
    everything under three headings instead. Six of these eight are dated, and those six are the ticks along the top
    of the plot.</p>
    <ul class="names-tbl">
      ${names}
      <li><span class="nm blank">and at least twenty-two more</span><span class="mn blank">not documented in this
      article</span><span class="ag mono">p4</span></li>
    </ul>

    <h3>End matter</h3>
    ${refBlock('General and cited references', S(6).lists[0])}
    ${refBlock('Further reading — general biography', S(7).lists[0])}
    ${refBlock('Further reading — specific works of art', S(8).lists[0])}
    ${refBlock('Further reading — art monographs', S(9).lists[0])}
    ${refBlock('External links — prints', S(10).lists[0])}
    ${refBlock('External links — biographies', S(11).lists[0])}

    <p class="backtoplot mono lc" style="margin-top:34px">Source: <a class="ext" href="${cm.sourceUrl}">${cm.sourceUrl}</a>
    — revision ${cm.revision}. Every fact on this page comes from that article and nothing else. The ages,
    the counts and the arithmetic that produced them are this page’s, and are marked wherever they appear.</p>

  </div>
</section>`;

const idxPath = ROOT + 'experiences/hokusai/index.html';
let idx = readFileSync(idxPath, 'utf8');
idx = idx.replace(/<!--READING_ROOM-->[\s\S]*?(?=\n<!-- persistent chrome)/, '<!--READING_ROOM-->\n' + html + '\n');
writeFileSync(idxPath, idx);
console.log('reading room: ' + html.length + ' bytes spliced');
