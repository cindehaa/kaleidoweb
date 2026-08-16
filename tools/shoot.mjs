#!/usr/bin/env node
// Kaleidoweb visual-evaluation harness.
// Renders a URL or local HTML file, scrolls through it, and captures
// representative screenshots for the taste loop.
//
// Usage:
//   node tools/shoot.mjs <url-or-file> <outdir> [--mobile] [--full] [--states n]
//     --mobile   also capture at 390x844
//     --full     capture a single full-page screenshot
//     --states   number of evenly spaced scroll states to capture (default 8)
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const target = args[0];
const outdir = args[1];
if (!target || !outdir) {
  console.error('usage: node tools/shoot.mjs <url-or-file> <outdir> [--mobile] [--full] [--states n]');
  process.exit(1);
}
const mobile = args.includes('--mobile');
const full = args.includes('--full');
const statesIdx = args.indexOf('--states');
const nStates = statesIdx > -1 ? parseInt(args[statesIdx + 1], 10) : 8;

const url = /^https?:/.test(target) ? target : pathToFileURL(resolve(target)).href;
mkdirSync(outdir, { recursive: true });

const EXECUTABLE = process.env.KW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

async function capture(viewport, tag) {
  const browser = await chromium.launch({ executablePath: EXECUTABLE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  page.on('pageerror', (e) => console.error(`[pageerror ${tag}]`, e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.error(`[console ${tag}]`, m.text()); });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(async () => {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  });
  await page.waitForTimeout(1500);

  const height = await page.evaluate(() => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
  console.log(`${tag}: page height ${height}px (${(height / viewport.height).toFixed(1)} viewports)`);

  if (full) {
    await page.screenshot({ path: `${outdir}/${tag}-full.png`, fullPage: true });
    console.log(`${outdir}/${tag}-full.png`);
  }

  for (let i = 0; i < nStates; i++) {
    const y = Math.round((height - viewport.height) * (i / Math.max(1, nStates - 1)));
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
    await page.waitForTimeout(900); // allow scroll-linked animation/lazy content to settle
    const name = `${outdir}/${tag}-s${String(i).padStart(2, '0')}-y${y}.png`;
    await page.screenshot({ path: name });
    console.log(name);
  }
  await browser.close();
}

await capture({ width: 1440, height: 900 }, 'desktop');
if (mobile) await capture({ width: 390, height: 844 }, 'mobile');
console.log('done');
