#!/usr/bin/env node
// Measures "surface density": words visible without interaction, per 900px viewport.
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const EXECUTABLE = process.env.KW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const TARGETS = [
  ['apple/macbook-pro', 'https://www.apple.com/macbook-pro/'],
  ['pudding/pockets', 'https://pudding.cool/2018/08/pockets/'],
  ['wikipedia/apollo-11', 'https://en.wikipedia.org/wiki/Apollo_11'],
  ['ciechanowski/mechanical-watch', 'https://ciechanowski.com/mechanical-watch/'],
  ['kaleidoweb/apollo-11', pathToFileURL(resolve('experiences/apollo-11/index.html')).href],
];

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--ssl-version-max=tls1.2'],
});

for (const [name, url] of TARGETS) {
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(3000);
    const r = await page.evaluate(() => {
      const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const vis = (el) => {
        const s = getComputedStyle(el);
        return s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05;
      };
      let shown = 0, hidden = 0;
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walk.nextNode())) {
        const t = (n.nodeValue || '').trim();
        if (!t) continue;
        const w = t.split(/\s+/).length;
        let el = n.parentElement, ok = true;
        while (el && el !== document.body) { if (!vis(el)) { ok = false; break; } el = el.parentElement; }
        if (ok) shown += w; else hidden += w;
      }
      return { h, shown, hidden, imgs: document.images.length };
    });
    const vp = r.h / 900;
    console.log(
      `${name.padEnd(30)} height=${String(r.h).padStart(6)}px  ${vp.toFixed(1).padStart(5)} viewports  ` +
      `surfaceWords=${String(r.shown).padStart(6)}  hiddenWords=${String(r.hidden).padStart(6)}  ` +
      `words/viewport=${(r.shown / vp).toFixed(0).padStart(5)}  hidden%=${(100 * r.hidden / (r.shown + r.hidden)).toFixed(1)}`
    );
    await page.close();
  } catch (e) { console.error(`FAIL ${name}: ${e.message}`); }
}
await browser.close();
