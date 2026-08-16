#!/usr/bin/env node
// Named-state shooter for the Hokusai plate: hits each movement deliberately.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const outdir = process.argv[2] || 'screenshots/hokusai-states';
const mobile = process.argv.includes('--mobile');
mkdirSync(outdir, { recursive: true });
const url = pathToFileURL(resolve('experiences/hokusai/index.html')).href;
const EXE = process.env.KW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

async function run(viewport, tag) {
  const browser = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.error(`[pageerror ${tag}]`, e.message));
  page.on('console', m => { if (m.type() === 'error') console.error(`[console ${tag}]`, m.text()); });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  const shot = async (name) => { await page.screenshot({ path: `${outdir}/${tag}-${name}.png` }); console.log(name); };
  const goto = async (frac) => {
    const box = await page.evaluate(() => {
      const g = document.getElementById('graph');
      const r = g.getBoundingClientRect();
      return { top: window.scrollY + r.top, h: r.height };
    });
    const y = Math.round(box.top + (box.h - viewport.height) * frac);
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
    await page.waitForTimeout(1400);
  };

  await shot('00-verdict');
  await goto(0.02); await shot('01-scale');
  await goto(0.30); await shot('02-guess');
  // do the guess
  await page.evaluate(() => {
    const d = document.getElementById('dragsheet');
    const c = document.getElementById('chart').getBoundingClientRect();
    const r = d.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, cw: c.width };
  });
  const h = await page.evaluate(() => {
    const d = document.getElementById('dragsheet').getBoundingClientRect();
    return { x: d.left + d.width / 2, y: d.top + d.height / 2 };
  });
  await page.mouse.move(h.x, h.y);
  await page.mouse.down();
  await page.mouse.move(h.x + 380, h.y - 200, { steps: 14 });
  await page.waitForTimeout(250);
  await shot('02b-dragging');
  await page.mouse.up();
  await page.waitForTimeout(1000);
  await shot('02c-revealed');
  await goto(0.60); await shot('03-population');
  // register filter
  await page.evaluate(() => document.querySelectorAll('.reg .rhit')[1].click());
  await page.waitForTimeout(700);
  await shot('03b-filtered');
  await page.evaluate(() => document.getElementById('filt').click());
  await page.waitForTimeout(500);
  // inspector
  await page.evaluate(() => document.querySelector('.sheet[data-id="w-great-wave"]').click());
  await page.waitForTimeout(900);
  await shot('03c-inspector');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  await goto(0.90); await shot('04-tail');
  await page.evaluate(() => document.getElementById('m5').scrollIntoView());
  await page.waitForTimeout(1200); await shot('05-after');
  await page.evaluate(() => document.getElementById('m6').scrollIntoView());
  await page.waitForTimeout(900); await shot('06-reading');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.6));
  await page.waitForTimeout(700); await shot('06b-reading');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 3));
  await page.waitForTimeout(700); await shot('06c-reading');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700); await shot('06d-end');
  const hgt = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${tag}: ${hgt}px`);
  await browser.close();
}

await run({ width: 1440, height: 900 }, 'desktop');
if (mobile) await run({ width: 390, height: 844 }, 'mobile');
console.log('done');
