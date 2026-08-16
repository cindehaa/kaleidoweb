#!/usr/bin/env node
// One-off reference capture for docs/EDITORIAL.md research.
// node tools/shoot-refs3.mjs
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const OUT = 'screenshots/references3';
mkdirSync(OUT, { recursive: true });
const EXECUTABLE = process.env.KW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const TARGETS = [
  ['apple-macbook-pro-one-idea-per-screen', 'https://www.apple.com/macbook-pro/', 6],
  ['pudding-pockets-dimension-cut', 'https://pudding.cool/2018/08/pockets/', 5],
  ['wikipedia-apollo11-surface-parity', 'https://en.wikipedia.org/wiki/Apollo_11', 4],
  ['tate-object-label-discipline', 'https://www.tate.org.uk/art/artworks/turner-the-fighting-temeraire-n00524', 3],
  ['moma-object-label', 'https://www.moma.org/collection/works/79802', 3],
];

const browser = await chromium.launch({
  executablePath: EXECUTABLE,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--ssl-version-max=tls1.2'],
});

for (const [name, url, states] of TARGETS) {
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(3000);
    const height = await page.evaluate(() =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
    console.log(`${name}: ${height}px`);
    for (let i = 0; i < states; i++) {
      const y = Math.round((height - 900) * (i / Math.max(1, states - 1)));
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${OUT}/${name}-s${i}.png` });
    }
    await page.close();
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`);
  }
}
await browser.close();
