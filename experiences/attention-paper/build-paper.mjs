#!/usr/bin/env node
// Divide by Eight — source-prose extraction.
//
// Lifts the paper's own sections out of benchmarks/attention-paper/source.html
// (LaTeXML output, 79 native <math> elements) and splices them into
// index.html between the <!--PAPER:section-id--> / <!--/PAPER--> markers, so
// every word of the paper is in the DOM and reachable by find-in-page
// (§7.5) without a fetch — the page has to work from file://.
//
// Math is kept as native MathML. No KaTeX, no MathJax (CONCEPTS build note 4).
// The <annotation encoding="application/x-tex"> children are dropped: they are
// not rendered, and leaving them in makes Ctrl+F match the same sentence twice.
//
// Run:  node experiences/attention-paper/build-paper.mjs
import { load } from 'cheerio';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const SRC = resolve(root, 'benchmarks/attention-paper/source.html');
const OUT = resolve(here, 'index.html');

const $ = load(readFileSync(SRC, 'utf8'), { xmlMode: false });

// arXiv section ids → our keys.
const SECTIONS = {
  'S1': 'intro',
  'S2': 'background',
  'S3': 'arch-head',
  'S3.SS1': 'stacks',
  'S3.SS2': 'attention-head',
  'S3.SS2.SSS1': 'sdpa',
  'S3.SS2.SSS2': 'mha',
  'S3.SS2.SSS3': 'applications',
  'S3.SS3': 'ffn',
  'S3.SS4': 'embeddings',
  'S3.SS5': 'posenc',
  'S4': 'why',
  'S5': 'training-head',
  'S5.SS1': 'data',
  'S5.SS2': 'hardware',
  'S5.SS3': 'optimizer',
  'S5.SS4': 'regularization',
  'S6': 'results-head',
  'S6.SS1': 'mt',
  'S6.SS2': 'variations',
  'S6.SS3': 'parsing',
  'S7': 'conclusion',
};

function cleanNode($el) {
  // strip the TeX annotations (duplicate text for find-in-page)
  $el.find('annotation').remove();
  // citations become plain bracketed numbers
  $el.find('cite').each((_, c) => { $(c).replaceWith($(c).text().replace(/\s+/g, '')); });
  // internal refs become plain text
  $el.find('a').each((_, a) => { $(a).replaceWith($(a).text()); });
  // drop every arXiv class + id; keep math intact
  $el.find('*').each((_, e) => {
    const tag = e.tagName.toLowerCase();
    if (tag === 'math' || $(e).parents('math').length) return;
    $(e).removeAttr('class').removeAttr('id').removeAttr('style').removeAttr('title');
  });
  $el.find('math').removeAttr('class').removeAttr('id').removeAttr('intent');
  $el.removeAttr('class').removeAttr('id').removeAttr('style');
  return $el;
}

function extract(id) {
  const sec = $(`#${id.replace(/\./g, '\\.')}`).first();
  if (!sec.length) return null;
  const title = sec.children('h2,h3,h4,h5').first().clone();
  title.find('span').first().remove(); // the "3.2.1 " tag span
  const heading = title.text().trim();
  const num = sec.children('h2,h3,h4,h5').first().find('span').first().text().trim();
  const out = [];
  // only this section's own paragraphs, not nested subsections'
  sec.children('div').each((_, d) => {
    const $d = $(d);
    if (!($d.attr('class') || '').includes('ltx_para')) return;
    $d.children().each((_, kid) => {
      const $k = $(kid);
      const tag = kid.tagName.toLowerCase();
      if (tag === 'p') {
        out.push('<p>' + cleanNode($k.clone()).html().replace(/\s+/g, ' ').trim() + '</p>');
      } else if (tag === 'table' && ($k.attr('class') || '').includes('ltx_equation')) {
        const m = $k.find('math').first().clone();
        m.find('annotation').remove();
        m.removeAttr('class').removeAttr('id').removeAttr('intent');
        const tag2 = $k.find('.ltx_tag_equation').first().text().trim();
        out.push(`<p class="eq">${$.html(m)}<span class="eqn">${tag2}</span></p>`);
      } else if (tag === 'figure') {
        const cap = $k.find('figcaption').first();
        if (cap.length) out.push('<p class="cap">' + cleanNode(cap.clone()).text().replace(/\s+/g, ' ').trim() + '</p>');
      }
    });
  });
  return { num, heading, html: out.join('\n') };
}

const bag = {};
for (const [id, key] of Object.entries(SECTIONS)) {
  const r = extract(id);
  if (!r) { console.error('MISSING', id); continue; }
  bag[key] = r;
}

// splice into index.html
let html = readFileSync(OUT, 'utf8');
let n = 0;
for (const [key, r] of Object.entries(bag)) {
  const re = new RegExp(`(<!--PAPER:${key}-->)([\\s\\S]*?)(<!--/PAPER-->)`, 'g');
  if (!re.test(html)) continue;
  html = html.replace(re, (_m, a, _b, c) => {
    n++;
    return `${a}\n<div class="src-sec"><p class="src-h">${r.num ? r.num + ' ' : ''}${r.heading}</p>\n${r.html}\n</div>\n${c}`;
  });
}
writeFileSync(OUT, html);
const words = Object.values(bag).reduce((a, r) => a + r.html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 0);
console.log(`spliced ${n} section(s) into index.html · ${Object.keys(bag).length} extracted · ~${words} words of source prose available`);
