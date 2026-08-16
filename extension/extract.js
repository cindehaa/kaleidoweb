// Kaleidoweb in-page extractor: live Wikipedia DOM -> Content Model.
// Mirror of pipeline/extract-wikipedia.mjs but for the rendered article DOM
// (.mw-parser-output), since the live page differs from Parsoid HTML.
// Runs in the isolated world; result is handed to the experience via storage.
(() => {
  const clean = (t) => (t || '').replace(/\[(?:\d+|note \d+|[a-z])\]/gi, '').replace(/\s+/g, ' ').trim();

  function extract() {
    const root = document.querySelector('.mw-parser-output');
    const title =
      document.querySelector('.mw-page-title-main')?.textContent ||
      document.getElementById('firstHeading')?.textContent ||
      document.title;
    if (!root) return null;

    // Infobox
    const infobox = [];
    const box = root.querySelector('table.infobox');
    if (box) {
      for (const tr of box.querySelectorAll('tr')) {
        const th = tr.querySelector('th');
        const td = tr.querySelector('td');
        if (th && td) {
          const label = clean(th.textContent);
          const value = clean(td.textContent);
          if (label && value) infobox.push({ label, value });
        }
      }
    }

    // Images: figures with captions; build large thumb URLs
    const images = [];
    for (const fig of root.querySelectorAll('figure')) {
      const img = fig.querySelector('img');
      if (!img || (img.width && img.width < 80)) continue;
      let src = img.currentSrc || img.src;
      src = src.replace(/\/(\d+)px-/, '/1280px-');
      images.push({ src, caption: clean(fig.querySelector('figcaption')?.textContent) || null });
    }
    const leadImg = box?.querySelector('img');
    if (leadImg && !images.some((i) => i.src.includes(leadImg.src.split('/').pop()))) {
      images.unshift({ src: (leadImg.currentSrc || leadImg.src).replace(/\/(\d+)px-/, '/1280px-'), caption: null, lead: true });
    }

    // Sections: walk children; headings delimit sections
    const sections = [];
    let current = { title: '__lead__', level: 1, paragraphs: [], quotes: [], lists: [] };
    let pCounter = 0;
    const push = () => {
      if (current.paragraphs.length || current.quotes.length || current.lists.length) sections.push(current);
    };
    const SKIP = /^(References|Notes|External links|Bibliography|Further reading|See also|Sources|Citations)$/i;
    let skipping = false;
    const walk = (el) => {
      for (const node of el.children) {
        const tag = node.tagName;
        if (tag === 'H2' || tag === 'H3' || tag === 'H4') {
          push();
          const t = clean(node.textContent);
          skipping = SKIP.test(t);
          current = { title: t, level: Number(tag[1]), paragraphs: [], quotes: [], lists: [] };
        } else if (skipping) {
          continue;
        } else if (tag === 'P') {
          const text = clean(node.textContent);
          if (text.length > 40) current.paragraphs.push({ id: 'p' + pCounter++, text });
        } else if (tag === 'BLOCKQUOTE') {
          const text = clean(node.textContent);
          if (text) current.quotes.push(text);
        } else if (tag === 'UL' || tag === 'OL') {
          const items = [...node.children].map((li) => clean(li.textContent)).filter(Boolean);
          if (items.length && items.length < 60) current.lists.push(items);
        } else if (tag === 'DIV' || tag === 'SECTION') {
          walk(node); // Wikipedia wraps headings/content in divs/sections
        }
      }
    };
    walk(root);
    push();

    return {
      schema: 'kaleidoweb/content-model@0',
      title: clean(title),
      sourceUrl: location.href,
      extractedAt: Date.now(),
      infobox,
      images: images.slice(0, 60),
      sections,
    };
  }

  window.__kaleidoweb_extract = extract;
})();
