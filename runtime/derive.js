/* ══════════════════════════════════════════════════════════════════
   runtime/derive.js — client-side derivation (EXPERIENCE_SPEC (e)).

   Everything computable with NO model call. Runs in D013 stage 2, the
   deterministic <500 ms window, before the spec arrives; its outputs
   are applied to the instant stage AND joined by later records.

   Two classes of function here:
     · IMPLEMENTED — needed by the Hokusai spec, and by anything that
       plots dated artifacts: date parsing, the works/images join, the
       name spine, posthumous extraction, census, palette, fibre, type
       scale, fold groups, absence.
     · TYPED STUB — signature + contract only, so M1 has a target.

   Pixel reads: samplePalette/fibreTile need getImageData, which a
   file:// origin taints. They are written for the real path (extension
   / http) and fall back to the cached derivation digest, which
   runtime/tools/derive-digest.mjs produces BY RUNNING THIS FILE over
   http. Nothing here is a hand-copied constant.
   ══════════════════════════════════════════════════════════════════ */
(function (root) {
  'use strict';
  const KW = (root.KW = root.KW || {});
  const U = KW.util, C = KW.color;

  const D = {
    /* the digest the interpreter hands over when live sampling is refused */
    digest: null,
    cache: Object.create(null),
    notes: [],

    /* ───────────── dates → ages (the x-axis derivation) ─────────────
       The article gives years. Every age on the plot is derived: a year
       less a birth of c.1760, which the infobox itself calls supposed. */
    birth: { y: 1760, m: 10, d: 31 },

    /** parseDateToAges(String, {y,m,d}) -> {lo,hi,exact,stated,why}|null */
    parseDateToAges(stated, birth) {
      const b = birth || D.birth;
      const s = String(stated || '').replace(/[–—]/g, '-').replace(/\([^)]*\)/g, ' ').trim();
      if (!s || /unknown/i.test(s)) return null;
      if (/\b\d{4}s\b/.test(s)) return null;               // "1820s-1830s" — a decade is not a date
      if (/century/i.test(s)) return null;                 // "c. late 18th to early 19th century"
      if (/early\s+\d{4}s?\b/i.test(s) && !/\b\d{4}-\d/.test(s)) return null;

      const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
      if (iso) {
        const y = +iso[1], m = +iso[2], d = +iso[3];
        const before = m < b.m || (m === b.m && d < b.d);
        const age = y - b.y - (before ? 1 : 0);
        return { lo: age, hi: age, exact: true, stated, why: s + ' − born c. ' + b.d + ' Oct ' + b.y + ' ⇒ age ' + age };
      }
      const ys = s.match(/\b\d{4}\b/g) || [];
      if (!ys.length) return null;
      let y0 = +ys[0], y1 = +ys[ys.length - 1];
      const short = /\b(\d{4})\s*-\s*(\d{2})\b/.exec(s);   // "c. 1788-89"
      if (short) { y0 = +short[1]; y1 = +(String(short[1]).slice(0, 2) + short[2]); }
      if (y1 < y0) y1 = y0;
      if (y1 - y0 > 12) return null;                       // too wide to place against an age
      const lo = y0 - b.y - 1, hi = y1 - b.y;
      return {
        lo, hi, exact: false, stated,
        why: (y0 === y1 ? String(y0) : y0 + '-' + y1) + ' − born c. ' + b.y + ' ⇒ ages ≈ ' + lo + '–' + hi,
      };
    },

    /* ───────────── the works / images join ─────────────
       Which Content-Model items reach the plot (b3), computed rather
       than dictated: a work is plottable if its stated date narrows to
       an age span; an image is plottable if its own alt carries a year
       or names a series that a dated work already fixes. */
    plotItems(refs) {
      if (D.cache.plotItems) return D.cache.plotItems;
      const sem = refs.data.semantic || {};
      const works = (sem.works || []).map((w, i) => ({ ...w, id: 'w' + i, src: w.src }));
      const images = refs.images.filter((im) => im.local);
      const gallery = images.filter((im) => im.gallery);

      /* 1 — date every work we can */
      works.forEach((w) => { w.ages = D.parseDateToAges(w.date); });

      /* 2 — greedy global best match between titles and image alt/caption/file */
      const pairs = [];
      works.forEach((w) => images.forEach((im) => {
        const hay = [im.alt, im.caption, U.slug(im.local).replace(/^\d+\s*/, '')].filter(Boolean).join(' · ');
        const o = U.overlapFull(w.title, hay);
        if (o.score >= 0.5) pairs.push({ w, im, sc: o.score, pr: o.precision });
      }));
      /* ties on recall are broken by precision: the caption that is MOSTLY
         this title beats the caption that merely contains it. */
      pairs.sort((a, b) => (b.sc - a.sc) || (b.pr - a.pr));
      const claimedImg = new Set(), claimedWork = new Set();
      pairs.forEach((p) => {
        if (claimedImg.has(p.im.idx) || claimedWork.has(p.w.id)) return;
        claimedImg.add(p.im.idx); claimedWork.add(p.w.id);
        p.w.image = p.im;
      });

      /* 3 — gallery sheets no work claimed: date them from their own label */
      const extra = [];
      gallery.forEach((im) => {
        if (claimedImg.has(im.idx) || !im.alt) return;
        const title = im.alt.split(/,\s|\sfrom\s/)[0].trim();
        const yr = /(?<!\d)(1[6-8]\d\d)(?!\d)/.exec(im.alt);   // "…Azaleas, 1834from the…" has no word boundary
        if (yr) {
          extra.push({
            id: 'g' + im.idx, title, date: yr[1], note: im.alt, src: 'gallery',
            ages: D.parseDateToAges(yr[1]), image: im,
          });
          claimedImg.add(im.idx); return;
        }
        const series = /\bfrom\s+(.+)$/i.exec(im.alt);
        if (series) {
          /* a series name is quoted verbatim ("from Thirty-six Views of
             Mount Fuji"), so containment is the right test — the token
             join is only the fallback. */
          const sN = U.slug(series[1]);
          const parent = works.filter((w) => w.ages).map((w) => {
            const wN = U.slug(w.title);
            const contained = wN.length > 8 && (sN.indexOf(wN) > -1 || wN.indexOf(sN) > -1);
            return { w, sc: contained ? 1 : U.overlap(w.title, series[1]) };
          }).sort((a, b) => b.sc - a.sc)[0];
          if (parent && parent.sc >= 0.6) {
            extra.push({
              id: 'g' + im.idx, title, date: parent.w.date, note: im.alt, src: 'gallery',
              ages: parent.w.ages, image: im, derivedDate: true,
              imgnote: 'The gallery gives this print no date. It is placed on the date the article gives its series, ' + parent.w.title + '.',
            });
            claimedImg.add(im.idx); return;
          }
        }
      });

      /* 4 — the absence set: named, no usable date (§ the ruled empty slot) */
      const undated = [];
      works.forEach((w) => {
        if (w.ages) return;
        /* if the sheet in the margin is a gallery print, it is labelled by
           the print, not by the series the article filed it under */
        const title = w.image && w.image.alt ? w.image.alt.split(/,\s|\sfrom\s/)[0].trim() : w.title;
        undated.push({
          ...w, title, series: title === w.title ? null : w.title,
          why: w.date && !/unknown/i.test(w.date)
            ? 'dated only “' + w.date + '” — too wide to place against an age'
            : 'no date given in this article',
        });
      });
      gallery.forEach((im) => {
        if (claimedImg.has(im.idx)) return;
        undated.push({
          id: 'u' + im.idx, title: im.alt ? im.alt.split(/,\s|\sfrom\s/)[0]
            : U.slug(im.local.replace(/\.\w+$/, '')).replace(/^\d+\s*/, '').replace(/\b\w/g, (c) => c.toUpperCase()),
          note: im.alt || '', src: 'gallery', image: im, why: 'no date given in the gallery',
        });
      });
      undated.sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0));

      const dated = works.filter((w) => w.ages).concat(extra)
        .map((w) => ({ ...w, mid: (w.ages.lo + w.ages.hi) / 2 }))
        .sort((a, b) => a.mid - b.mid);

      return (D.cache.plotItems = { dated, undated, images });
    },

    /* ───────────── the name spine (p4: the names ARE the periodisation) ───────────── */
    namesWithYears(refs) {
      if (D.cache.names) return D.cache.names;
      const sem = refs.data.semantic || {};
      const corpus = refs.paraOrder.map((id) => refs.paras[id].text);
      const out = (sem.names || []).map((n) => {
        const meaning = n['period/meaning'] || n.meaning || '';
        const y = /\b(1[6-9]\d\d)\b/.exec(meaning);
        const stated = /\bat age (\d{1,3})\b/.exec(meaning);
        const year = y ? +y[1] : null;
        const age = stated ? +stated[1] : year ? year - (D.birth.y + 1) : null;
        return {
          name: n.name, src: n.src, meaning, year, age,
          at: year ? year + ' · ' + age : (/(birth)/i.test(meaning) ? 'at birth' : (/middle period/i.test(meaning) ? 'middle period' : '—')),
          kanji: D.kanjiFor(n.name, corpus),
          a: year ? year - (D.birth.y + 0.5) : null,
        };
      });
      return (D.cache.names = out);
    },

    /** kanjiFor(String, [String]) -> String|null — a CJK run standing beside the romanisation */
    kanjiFor(name, corpus) {
      for (const t of corpus) {
        let i = t.indexOf(name);
        while (i > -1) {
          const win = t.slice(Math.max(0, i - 8), i + name.length + 40);
          const m = /[぀-ヿ㐀-䶿一-鿿][぀-ヿ㐀-䶿一-鿿\s]{1,7}/.exec(win);
          if (m) return m[0].trim();
          i = t.indexOf(name, i + 1);
        }
      }
      return null;
    },

    /* ───────────── posthumous events: a coda's items, extracted ─────────────
       derive:posthumous(p23-p32) — every sentence in the range that
       carries a year after his death, with the year's distance from it. */
    posthumous(args, refs) {
      const key = 'post:' + args;
      if (D.cache[key]) return D.cache[key];
      const range = refs.resolve(String(args).trim());
      if (!range) return null;
      const died = D.deathYear(refs);
      const seen = new Set(), out = [];
      range.items.forEach((p) => {
        const text = p.text || '';
        text.split(/(?<=[.!?])\s+/).forEach((sent) => {
          const m = /\b(1[89]\d\d|20\d\d)\b/.exec(sent);
          if (!m) return;
          const y = +m[1];
          if (y <= died || seen.has(y)) return;
          seen.add(y);
          const w = sent.trim().split(/\s+/);
          out.push({
            year: y, delta: y - died, src: p.id,
            text: (w.length > 19 ? w.slice(0, 19).join(' ') + '…' : w.join(' ')).replace(/^\W+/, ''),
          });
        });
      });
      out.sort((a, b) => a.year - b.year);
      return (D.cache[key] = out);
    },

    deathYear(refs) {
      const ib = (refs.data.contentModel.infobox || []).find((r) => /died/i.test(r.label));
      const m = ib && /\b(1[6-9]\d\d)\b/.exec(ib.value);
      return m ? +m[1] : 1849;
    },

    /* ───────────── imageCensus — file-verifiable, costs nothing ─────────────
       Aspect families are a design input and they are arithmetic.
       Also yields the dominant-colour plate for C12's zero-shift paint. */
    imageCensus(images, base) {
      return Promise.all(images.map((im) => new Promise((done) => {
        if (!im.local) return done(null);
        const el = new Image();
        el.decoding = 'async';
        el.onload = () => {
          const w = el.naturalWidth, h = el.naturalHeight;
          let dominant = null;
          try { dominant = D._average(el, 8); } catch (e) { /* tainted origin */ }
          done({ idx: im.idx, w, h, ratio: w / h, dominant, bucket: D._bucket(w / h) });
        };
        el.onerror = () => done(null);
        el.src = base + im.local;
      }))).then((rows) => {
        const per = {}, families = {};
        rows.filter(Boolean).forEach((r) => {
          per[r.idx] = r;
          families[r.bucket] = (families[r.bucket] || 0) + 1;
        });
        return { n: Object.keys(per).length, perImage: per, families };
      });
    },
    _bucket(r) { return r > 1.6 ? 'wide' : r > 1.15 ? 'landscape' : r > 0.87 ? 'square' : r > 0.55 ? 'upright' : 'tall'; },
    _average(img, n) {
      const c = document.createElement('canvas'); c.width = c.height = n;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, 0, 0, n, n);
      const d = g.getImageData(0, 0, n, n).data;
      let r = 0, gg = 0, b = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; }
      const k = d.length / 4;
      return C.rgb2hex([r / k, gg / k, b / k]);
    },

    /* ───────────── samplePalette / fibreTile (§6.5, §6.6, §6.10) ─────────────
       The ground is the SUBSTRATE, not the picture: a margin band pass,
       not a dominant colour. Returns the provenance string the spec is
       required to carry. Throws on a tainted origin; the caller then
       reads the cached digest. */
    /** samplePalette(HTMLImageElement, {x,y,w,h,file}) -> {hex,sigma,coord,provenance} */
    samplePalette(img, o) {
      const c = document.createElement('canvas');
      c.width = o.w; c.height = o.h;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, o.x, o.y, o.w, o.h, 0, 0, o.w, o.h);
      const d = g.getImageData(0, 0, o.w, o.h).data;
      const n = d.length / 4;
      let r = 0, gg = 0, b = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; }
      r /= n; gg /= n; b /= n;
      let v = 0;
      for (let i = 0; i < d.length; i += 4) v += ((d[i] - r) ** 2 + (d[i + 1] - gg) ** 2 + (d[i + 2] - b) ** 2) / 3;
      const sigma = Math.sqrt(v / n);
      const hex = C.rgb2hex([r, gg, b]);
      return {
        hex, sigma: +sigma.toFixed(1),
        coord: { x: o.x, y: o.y, w: o.w, h: o.h },
        provenance: (o.file || 'image') + '@x' + o.x + '-' + (o.x + o.w) + ',y' + o.y + '-' + (o.y + o.h) +
          ' mean rgb(' + r.toFixed(1) + ',' + gg.toFixed(1) + ',' + b.toFixed(1) + ') = ' + hex + ', σ≈' + sigma.toFixed(1),
      };
    },

    /** fibreTile(HTMLImageElement, {x,y,w,h}) -> dataURL — the substrate's
        unevenness, high-passed to its deviation and wrapped seamless (§6.6). */
    fibreTile(img, o) {
      const N = 96;
      const c = document.createElement('canvas'); c.width = c.height = N;
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(img, o.x, o.y, o.w, o.h, 0, 0, N, N);
      const im = g.getImageData(0, 0, N, N), d = im.data;
      let m = 0;
      for (let i = 0; i < d.length; i += 4) m += (d[i] + d[i + 1] + d[i + 2]) / 3;
      m /= d.length / 4;
      const grey = new Float32Array(N * N);
      for (let i = 0, p = 0; i < d.length; i += 4, p++) grey[p] = 128 + ((d[i] + d[i + 1] + d[i + 2]) / 3 - m) * 1.9;
      /* wrap: cross-fade the tile against itself offset by half, so the seam disappears */
      const out = g.createImageData(N, N), q = out.data;
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const a = grey[y * N + x];
          const b = grey[((y + N / 2) % N) * N + ((x + N / 2) % N)];
          const wx = Math.min(x, N - 1 - x) / (N / 2), wy = Math.min(y, N - 1 - y) / (N / 2);
          const t = 1 - Math.min(1, Math.min(wx, wy) * 2);
          const v = Math.max(0, Math.min(255, a * (1 - t * 0.5) + b * (t * 0.5)));
          const i = (y * N + x) * 4;
          q[i] = q[i + 1] = q[i + 2] = v; q[i + 3] = 255;
        }
      }
      g.putImageData(out, 0, 0);
      return c.toDataURL('image/png');
    },

    /* refs resolvers for the derive: grammar */
    sample(args) { return (D.digest && D.digest.sample && D.digest.sample[args]) || D.cache['sample:' + args] || null; },
    fibre(args) { return D.cache['fibre:' + args] || (D.digest && D.digest.fibre && D.digest.fibre[args]) || null; },

    /** parseSampleArgs("img:15@x0-96,y288-384") -> {ref,x,y,w,h} */
    parseSampleArgs(s) {
      const m = /^([^@]+)@x(\d+)-(\d+),y(\d+)-(\d+)$/.exec(String(s).trim());
      if (!m) return null;
      return { ref: m[1], x: +m[2], y: +m[4], w: +m[3] - +m[2], h: +m[5] - +m[4] };
    },

    /* ───────────── typography (§2.2–§2.5) ───────────── */
    /** typeScale([n], body, lead) -> {sizes, perSize:[{lineHeight,tracking}], displayRatio} */
    typeScale(scale, body, lead) {
      const sizes = (scale && scale.length ? scale : [11.5, 13, 15.5, 20, 34, 62, 124]).slice();
      const perSize = sizes.map((s) => ({
        size: s,
        lineHeight: s >= 48 ? 0.9 : s >= 30 ? 1.06 : s >= 21 ? 1.2 : s >= 15 ? 1.4 : lead,
        tracking: s >= 90 ? -0.052 : s >= 48 ? -0.035 : s >= 30 ? -0.022 : s >= 20 ? -0.015 : 0.005,
      }));
      const displayRatio = Math.max.apply(null, sizes) / body;
      return { sizes, perSize, displayRatio, displayRatioOK: displayRatio >= 6 };
    },

    /* ───────────── folds (§7.5 — subordination, never deletion) ───────────── */
    /** foldGroups([{label,refs}], Refs) -> [{label, range, items, words}] */
    foldGroups(list, refs) {
      return (list || []).map((f) => {
        const res = refs.resolve(f.refs);
        if (!res) return null;
        const ids = res.items.map((i) => i.id).filter(Boolean);
        const range = ids.length > 1 ? ids[0] + '–' + ids[ids.length - 1] : (ids[0] || '');
        const w = res.items.reduce((a, i) => a + U.words(i.text).length, 0);
        return { label: f.label || (range + ' — ' + w + ' words'), range: f.label ? range : '', items: res.items, kind: res.kind, words: w };
      }).filter(Boolean);
    },

    /* §4.11 becomes a constraint the interpreter can enforce */
    /** surfaceBudget(contentModel) -> {sourceBodyWords, surfaceCeiling, wpvTarget} */
    surfaceBudget(cm, share) {
      let n = 0;
      (cm.sections || []).forEach((s) => (s.paragraphs || []).forEach((p) => (n += U.words(p.text).length)));
      return { sourceBodyWords: n, surfaceCeiling: Math.round(n * (share || 0.35)), wpvTarget: [150, 300] };
    },

    /* ───────────── typed stubs — M1 targets, not used by this spec ───────────── */
    /** groundCandidates([Image]) -> [{hex,from,sigma,contrastWith}] */
    groundCandidates() { D.notes.push('groundCandidates: not implemented in M0'); return []; },
    /** infoboxToTable(infobox) -> {rows:[{label,value,type,parsed}], sceneCandidate:bool} */
    infoboxToTable(ib) {
      const rows = (ib || []).map((r) => ({ label: r.label, value: r.value, type: /born|died/i.test(r.label) ? 'date' : 'text', parsed: null }));
      return { rows, sceneCandidate: rows.length >= 6 };
    },
    /** structureSignals(cm, semantic) -> {words, sections, dateDensity, worksCount, quoteCount, imageRatio, ...} */
    structureSignals(cm, sem) {
      const b = D.surfaceBudget(cm);
      return {
        words: b.sourceBodyWords, sections: (cm.sections || []).length,
        worksCount: ((sem || {}).works || []).length, quoteCount: ((sem || {}).quotes || []).length,
        quantityCount: ((sem || {}).quantities || []).length,
        placeCount: ((sem || {}).places || []).length, routeCount: 0,
        imageCount: (cm.images || []).length,
        dateDensity: (((sem || {}).chronology || []).length / Math.max(1, b.sourceBodyWords)) * 1000,
        timestampCount: 0, equationCount: 0, tableCount: 0,
      };
    },
    /** classifyGenre(signals) -> [{kit,score,killed,reason}] */
    classifyGenre(sig) {
      const out = [];
      const ordinal = D._ordinalQuote;
      out.push({
        kit: 'quotation-axis-plot',
        score: (ordinal ? 0.6 : 0) + Math.min(0.4, sig.worksCount / 40),
        killed: !ordinal || sig.worksCount < 8,
        reason: !ordinal ? 'no source-supplied ordinal scale in the quotes' : sig.worksCount < 8 ? 'fewer than 8 placeable items' : '',
      });
      out.push({ kit: 'time-score', score: 0.2, killed: sig.timestampCount < 12, reason: 'fewer than ~12 real timestamps' });
      out.push({ kit: 'artifact-catalogue', score: sig.imageCount / 40, killed: sig.imageCount < 14, reason: '' });
      return out.sort((a, b) => b.score - a.score);
    },
    /** quoteRank(quotes) -> ranked [{i, isFirstPerson, isOrdinalSeries, score}] */
    quoteRank(quotes) {
      const out = (quotes || []).map((q, i) => {
        const t = q.text || '';
        const ages = (t.match(/\b(?:age of )?(six|fifty|seventy|seventy-three|eighty-six|ninety|one hundred(?: and ten)?|\d{1,3})\b/gi) || []).length;
        const isOrdinalSeries = ages >= 4 && /\bI shall\b|\bby my\b|\bat \w+/i.test(t);
        const isFirstPerson = /\bI\b|\bmy\b/.test(t);
        return { i, isFirstPerson, isOrdinalSeries, hasNumbers: /\d|six|fifty|seventy/i.test(t), length: t.length, score: (isOrdinalSeries ? 2 : 0) + (isFirstPerson ? 1 : 0) };
      }).sort((a, b) => b.score - a.score);
      D._ordinalQuote = out.length && out[0].isOrdinalSeries;
      return out;
    },
    /** numberSpine(semantic) -> [{field,min,max,unit,coverage,derive}] */
    numberSpine(sem) {
      const w = ((sem || {}).works || []);
      const ok = w.filter((x) => D.parseDateToAges(x.date));
      return [{ field: 'age', min: 0, max: 88, unit: 'years', coverage: ok.length / Math.max(1, w.length), derive: 'year − 1760' }];
    },
    /** absenceSet(semantic, images) -> [{name, why}] */
    absenceSet(refs) { return D.plotItems(refs).undated.map((u) => ({ name: u.title, why: u.why })); },
  };

  KW.derive = D;
})(window);
