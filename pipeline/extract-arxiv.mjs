#!/usr/bin/env node
// Kaleidoweb extraction: arXiv LaTeXML HTML -> Content Model JSON.
// Generalization of the Wikipedia extractor to scientific papers.
// Usage: node pipeline/extract-arxiv.mjs benchmarks/<slug>
import * as cheerio from 'cheerio';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: node pipeline/extract-arxiv.mjs <benchmark-dir>'); process.exit(1); }

const html = readFileSync(join(dir, 'source.html'), 'utf8');
const $ = cheerio.load(html);

const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();

const title = clean($('h1.ltx_title_document').text());
const authors = $('.ltx_personname').map((_, e) => clean($(e).text())).get();
const abstract = clean($('.ltx_abstract .ltx_p').text());

let pCounter = 0, eqCounter = 0;
const sections = [];

function extractSection(secEl, level) {
  const $sec = $(secEl);
  const heading = $sec.children('h2,h3,h4').first();
  const secTitle = clean(heading.find('.ltx_tag').remove().end().text()) || clean(heading.text());
  const tag = clean(heading.find('.ltx_tag').text());
  const section = { title: secTitle, number: tag || null, level, paragraphs: [], equations: [], figures: [], tables: [] };

  const ownsNode = (el) => $(el).closest('section:not(.ltx_paragraph)')[0] === secEl;
  $sec.find('.ltx_para > .ltx_p').filter((_, p) => ownsNode(p)).each((_, p) => {
    const $p = $(p);
    // pull display equations out separately
    const text = clean($p.text());
    if (text.length > 30) section.paragraphs.push({ id: 'p' + pCounter++, text });
  });
  $sec.find('.ltx_equation math, .ltx_equationgroup math').each((_, m) => {
    const latex = $(m).attr('alttext');
    if (latex) section.equations.push({ id: 'eq' + eqCounter++, latex: clean(latex) });
  });
  $sec.find('figure.ltx_figure').filter((_, f) => ownsNode(f)).each((_, f) => {
    const caption = clean($(f).find('figcaption').first().text());
    $(f).find('img').each((_, img) => {
      const src = $(img).attr('src');
      if (src) section.figures.push({ src: 'figures/' + src.split('/').pop(), caption });
    });
  });
  $sec.find('figure.ltx_table').each((_, t) => {
    const caption = clean($(t).find('figcaption').text());
    const headers = $(t).find('tr').first().find('th,td').map((_, c) => clean($(c).text())).get();
    const rows = [];
    $(t).find('tr').slice(1).each((_, tr) => {
      const cells = $(tr).find('td,th').map((_, c) => clean($(c).text())).get();
      if (cells.some(Boolean)) rows.push(cells);
    });
    section.tables.push({ caption, headers, rows });
  });
  return section;
}

$('section.ltx_section').each((_, sec) => {
  sections.push(extractSection(sec, 2));
  $(sec).find('section.ltx_subsection').each((_, sub) => {
    sections.push(extractSection(sub, 3));
    $(sub).find('section.ltx_subsubsection').each((_, sub2) => {
      sections.push(extractSection(sub2, 4));
    });
  });
});
// appendices
$('section.ltx_appendix').each((_, sec) => sections.push(extractSection(sec, 2)));

const bibCount = $('.ltx_bibitem').length;

const model = {
  schema: 'kaleidoweb/content-model@0',
  sourceType: 'arxiv-paper',
  title,
  authors,
  abstract,
  sourceUrl: 'https://arxiv.org/abs/1706.03762',
  sections,
  references: bibCount,
};

const out = join(dir, 'content-model.json');
writeFileSync(out, JSON.stringify(model, null, 2));
console.log(out, JSON.stringify({
  sections: sections.length,
  paragraphs: pCounter,
  equations: eqCounter,
  figures: sections.reduce((n, s) => n + s.figures.length, 0),
  tables: sections.reduce((n, s) => n + s.tables.length, 0),
  authors: authors.length,
  references: bibCount,
}));
