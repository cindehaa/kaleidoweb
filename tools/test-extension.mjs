#!/usr/bin/env node
// E2E smoke test: load the extension in Chromium, open a Wikipedia article,
// trigger the action button (via the service worker), and screenshot the takeover.
// Usage: node tools/test-extension.mjs [url] [outdir]
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.argv[2] || 'https://en.wikipedia.org/wiki/Apollo_11';
const outdir = process.argv[3] || 'screenshots/extension-test';
mkdirSync(outdir, { recursive: true });

const EXT = resolve('extension');
const EXECUTABLE = process.env.KW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const ctx = await chromium.launchPersistentContext('', {
  executablePath: EXECUTABLE,
  headless: true,
  args: [
    '--no-sandbox', '--disable-dev-shm-usage',
    `--disable-extensions-except=${EXT}`,
    `--load-extension=${EXT}`,
  ],
});

let [sw] = ctx.serviceWorkers();
if (!sw) sw = await ctx.waitForEvent('serviceworker', { timeout: 10000 });
console.log('service worker:', sw.url());

const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
// Offline determinism: only localhost + extension resources load.
await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
const shot = (path) => page.screenshot({ path, timeout: 5000 }).catch(() => page.screenshot({ path, timeout: 5000, animations: 'disabled' })).catch(() => console.error('screenshot failed:', path));
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(1000);
await shot(`${outdir}/1-before.png`);

// Simulate the toolbar button click from inside the service worker.
const swResult = await sw.evaluate(async () => {
  const logs = [];
  const orig = console.error;
  console.error = (...a) => { logs.push(a.map(String).join(' ')); orig(...a); };
  const tabs = await chrome.tabs.query({});
  const tab = tabs.find((t) => /localhost|wikipedia/.test(t.url || ''));
  if (!tab) return { error: 'no tab found', tabs: tabs.map((t) => t.url) };
  await chrome.action.onClicked.dispatch(tab);
  await new Promise((r) => setTimeout(r, 1500));
  console.error = orig;
  return { tab: tab.url, logs };
});
console.log('sw dispatch:', JSON.stringify(swResult));
await page.waitForTimeout(2500);
await shot(`${outdir}/2-takeover.png`);

const active = await page.evaluate(() => !!document.getElementById('__kaleidoweb_host'));
console.log('takeover active:', active);

// Escape restores the page.
await page.keyboard.press('Escape');
await page.waitForTimeout(600);
const restored = await page.evaluate(() => !document.getElementById('__kaleidoweb_host'));
console.log('restored:', restored);
await shot(`${outdir}/3-restored.png`);

await ctx.close();
if (!active || !restored) { console.error('SMOKE TEST FAILED'); process.exit(1); }
console.log('smoke test passed');
