#!/usr/bin/env node
// Download selected images from a benchmark's content model into an assets dir.
// Usage: node tools/fetch-images.mjs <benchmark-dir> <assets-dir> <idx,idx,...|all>
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const [dir, assets, sel] = process.argv.slice(2);
const model = JSON.parse(readFileSync(join(dir, 'content-model.json'), 'utf8'));
const idxs = sel === 'all' ? model.images.map((_, i) => i) : sel.split(',').map(Number);
const UA = 'KaleidowebResearch/0.1 (cindehaa@gmail.com)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const i of idxs) {
  const im = model.images[i];
  if (!im) continue;
  const name = i.toString().padStart(2, '0') + '-' +
    im.file.replace('File:', '').replace(/[^A-Za-z0-9._-]+/g, '_').slice(0, 60) +
    (extname(im.file) ? '' : '.jpg');
  const out = join(assets, name);
  if (existsSync(out) && statSync(out).size > 10000) { console.log('skip', name); continue; }
  let ok = false;
  for (const url of [im.srcLarge, im.src]) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 2000) continue;
      writeFileSync(out, buf);
      console.log('ok', name, (buf.length / 1024).toFixed(0) + 'KB');
      ok = true;
      break;
    } catch (e) { /* try fallback */ }
  }
  if (!ok) console.error('FAIL', im.file);
  await sleep(1200);
}
