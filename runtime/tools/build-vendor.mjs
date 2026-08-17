#!/usr/bin/env node
/* Bundles the vendored shader runtime into one classic script exposing
   window.KW_SHADERS, because a file:// origin refuses ES-module imports
   and the shoot harness loads file URLs.
     node runtime/tools/build-vendor.mjs */
import { build } from 'esbuild';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');
mkdirSync(resolve(HERE, '../vendor'), { recursive: true });

const entry = resolve(HERE, '../vendor/.entry.mjs');
writeFileSync(entry, `export * from '${resolve(ROOT, 'experiences/hokusai/vendor/paper-shaders.js')}';\n`);

await build({
  entryPoints: [entry],
  outfile: resolve(HERE, '../vendor/paper-shaders.iife.js'),
  bundle: true,
  format: 'iife',
  globalName: 'KW_SHADERS',
  target: ['chrome100', 'safari16', 'firefox110'],
  minify: true,
  legalComments: 'none',
  banner: { js: '/* vendored @paper-design/shaders 0.0.80 — classic build for file:// */' },
});
import { unlinkSync } from 'node:fs';
unlinkSync(entry);
console.log('runtime/vendor/paper-shaders.iife.js built');
