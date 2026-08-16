#!/usr/bin/env node
// Kaleidoweb extraction v0: Wikipedia Parsoid HTML -> Content Model JSON.
// Deterministic structural extraction. Semantic passes (chronology, entities,
// emphasis) are layered on top of this model later.
//
// Usage: node pipeline/extract-wikipedia.mjs benchmarks/<slug>
import * as cheerio from 'cheerio';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: node pipeline/extract-wikipedia.mjs <benchmark-dir>'); process.exit(1); }

const html = readFileSync(join(dir, 'source.html'), 'utf8');
const summary = JSON.parse(readFileSync(join(dir, 'summary.json'), 'utf8'));
const mediaList = JSON.parse(readFileSync(join(dir, 'media-list.json'), 'utf8'));

const $ = cheerio.load(html);

const clean = (t) => t.replace(/\[(?:\d+|note \d+|[a-z])\]/gi, '').replace(/\s+/g, ' ').trim();

// ---- infobox ----
function extractInfobox() {
  const box = $('table.infobox').first();
  if (!box.length) return null;
  const rows = [];
  box.find('tr').each((_, tr) => {
    const th = $(tr).find('th').first();
    const td = $(tr).find('td').first();
    if (th.length && td.length) {
      const label = clean(th.text());
      const value = clean(td.text());
      if (label && value) rows.push({ label, value });
    }
  });
  return rows;
}

// ---- images (from media-list: has captions + srcset already) ----
function extractImages() {
  return (mediaList.items || [])
    .filter((it) => it.type === 'image' && it.srcset?.length)
    .map((it) => {
      const src = 'https:' + it.srcset[it.srcset.length - 1].src.split('?')[0];
      return {
        file: it.title,
        section_id: it.section_id,
        caption: it.caption?.text || null,
        src,
        // widen thumbnails: replace /500px- or /1280px- with /1600px-
        srcLarge: src.replace(/\/(\d+)px-/, '/1600px-'),
      };
    });
}

// ---- sections & prose ----
function extractSections() {
  const sections = [];
  let pCounter = 0;
  $('section[data-mw-section-id]').each((_, sec) => {
    const id = $(sec).attr('data-mw-section-id');
    if (Number(id) < 0) return; // synthetic
    const heading = $(sec).children('h1,h2,h3,h4,h5').first();
    const level = heading.length ? Number(heading.prop('tagName')[1]) : 1;
    const title = heading.length ? clean(heading.text()) : (Number(id) === 0 ? '__lead__' : null);
    if (title === null) return;
    // Skip boilerplate sections
    if (/^(References|Notes|External links|Bibliography|Further reading|See also|Sources|Citations)$/i.test(title)) return;

    const paragraphs = [];
    const quotes = [];
    const lists = [];
    $(sec).children('p').each((_, p) => {
      const text = clean($(p).text());
      if (text.length > 40) paragraphs.push({ id: `p${pCounter++}`, text });
    });
    $(sec).find('blockquote').each((_, q) => {
      const text = clean($(q).text());
      if (text) quotes.push(text);
    });
    $(sec).children('ul,ol').each((_, l) => {
      const items = $(l).children('li').map((_, li) => clean($(li).text())).get().filter(Boolean);
      if (items.length) lists.push(items);
    });
    const tables = [];
    $(sec).children('table.wikitable').each((_, t) => {
      const headers = $(t).find('tr').first().find('th').map((_, th) => clean($(th).text())).get();
      const rows = [];
      $(t).find('tr').slice(1).each((_, tr) => {
        const cells = $(tr).find('td,th').map((_, c) => clean($(c).text())).get();
        if (cells.length) rows.push(cells);
      });
      tables.push({ headers, rows });
    });
    sections.push({ section_id: Number(id), level, title, paragraphs, quotes, lists, tables });
  });
  return sections;
}

// ---- coordinates ----
function extractCoords() {
  const geo = $('.geo').first().text();
  if (!geo) return null;
  const [lat, lon] = geo.split(';').map((s) => parseFloat(s));
  return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null;
}

const model = {
  schema: 'kaleidoweb/content-model@0',
  title: summary.title,
  description: summary.description || null,
  extract: summary.extract || null,
  wikidata: summary.wikibase_item || null,
  lang: summary.lang || 'en',
  sourceUrl: summary.content_urls?.desktop?.page || null,
  revision: mediaList.revision || null,
  coordinates: extractCoords(),
  infobox: extractInfobox(),
  images: extractImages(),
  sections: extractSections(),
};

const out = join(dir, 'content-model.json');
writeFileSync(out, JSON.stringify(model, null, 2));
const stats = {
  sections: model.sections.length,
  paragraphs: model.sections.reduce((n, s) => n + s.paragraphs.length, 0),
  images: model.images.length,
  infoboxRows: model.infobox?.length || 0,
  quotes: model.sections.reduce((n, s) => n + s.quotes.length, 0),
  tables: model.sections.reduce((n, s) => n + s.tables.length, 0),
};
console.log(out, JSON.stringify(stats));
