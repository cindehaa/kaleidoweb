#!/usr/bin/env node
// Tiny static server for deterministic local testing.
// Serves the repo root, plus /wiki/<Article_title> from benchmark snapshots
// (so extension URL-matching logic works against localhost).
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const PORT = Number(process.argv[2] || 8790);
const WIKI = {
  Apollo_11: 'benchmarks/apollo-11/source.html',
  Photosynthesis: 'benchmarks/photosynthesis/source.html',
  Ada_Lovelace: 'benchmarks/ada-lovelace/source.html',
  Fourier_transform: 'benchmarks/fourier-transform/source.html',
  Silk_Road: 'benchmarks/silk-road/source.html',
  Hokusai: 'benchmarks/hokusai/source.html',
  Golden_Gate_Bridge: 'benchmarks/golden-gate-bridge/source.html',
};
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg',
};

createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = null;
  const wiki = url.match(/^\/wiki\/(.+)$/);
  if (wiki && WIKI[wiki[1]]) file = join(ROOT, WIKI[wiki[1]]);
  else file = join(ROOT, url.replace(/^\//, '') || 'index.html');
  if (file.endsWith('/')) file += 'index.html';
  if (!existsSync(file)) { res.writeHead(404); res.end('not found: ' + url); return; }
  try {
    const body = readFileSync(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(500); res.end('error');
  }
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
