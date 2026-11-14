import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const out = 'C:/Users/Waheguru Ji/AppData/Local/Temp/opencode/karnail';
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
    '--use-angle=swiftshader',
    '--hide-scrollbars',
  ],
});

const page = await browser.newPage();
const logs = [];
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') logs.push(`[${msg.type()}] ${msg.text()}`);
});
page.on('pageerror', (err) => logs.push(`[pageerror] ${err.message}`));
page.on('requestfailed', (req) => logs.push(`[requestfailed] ${req.url()} ${req.failure()?.errorText}`));

async function settle(ms = 1800) {
  await new Promise((r) => setTimeout(r, ms));
}

async function report(name, viewport) {
  await page.setViewport(viewport);
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await settle(5200);

  const base = await page.evaluate(() => {
    const over = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const style = getComputedStyle(el);
        if (style.position === 'fixed' || style.display === 'none' || style.visibility === 'hidden') return false;
        if (el.closest('.veil, .fallback, #loader, .menu')) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
      })
      .slice(0, 12)
      .map((el) => `${el.tagName}.${el.className} ${Math.round(el.getBoundingClientRect().left)}..${Math.round(el.getBoundingClientRect().right)}`);
    return {
      ready: document.documentElement.dataset.ready,
      fallback: document.documentElement.classList.contains('is-fallback'),
      webglReady: document.getElementById('webgl')?.classList.contains('is-ready'),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      filmHeight: document.getElementById('film')?.offsetHeight,
      viewport: [innerWidth, innerHeight],
      scene: document.documentElement.dataset.scene,
      label: document.querySelector('.odometer [data-scene-label]')?.textContent,
      sections: [...document.querySelectorAll('#film .scene')].map((s) => ({
        id: s.id,
        h: s.offsetHeight,
        top: s.offsetTop,
      })),
      over,
    };
  });

  const shots = [];
  for (const id of ['hero', 'services', 'fleet', 'destinations', 'why', 'reviews', 'book']) {
    await page.evaluate((sceneId) => {
      const el = document.getElementById(sceneId);
      if (el) window.scrollTo(0, el.offsetTop + Math.round(innerHeight * 0.32));
    }, id);
    await settle(1600);
    const state = await page.evaluate(() => ({
      y: Math.round(scrollY),
      scene: document.documentElement.dataset.scene,
      label: document.querySelector('.odometer [data-scene-label]')?.textContent,
      pct: document.querySelector('[data-odometer-percent]')?.textContent,
      activeDest: document.querySelector('.dest-slide.is-active .dest-name')?.textContent,
      activeTrust: document.querySelector('.trust-row.is-active .trust-word')?.textContent,
      activeReview: document.querySelector('.review-row.is-active .review-index')?.textContent,
    }));
    const file = `${out}/${name}-${id}.png`;
    await page.screenshot({ path: file, fullPage: false });
    shots.push({ id, ...state, file });
  }

  return { name, base, shots, logs: [...logs] };
}

const results = [];
results.push(await report('desktop-1440', { width: 1440, height: 900, deviceScaleFactor: 1 }));
results.push(await report('wide-1920', { width: 1920, height: 1080, deviceScaleFactor: 1 }));
results.push(await report('tablet-768', { width: 768, height: 1024, deviceScaleFactor: 1 }));
results.push(await report('mobile-390', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }));
results.push(await report('mobile-360', { width: 360, height: 780, deviceScaleFactor: 2, isMobile: true, hasTouch: true }));

// Reduced motion / fallback pass.
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await settle(2500);
const reduced = await page.evaluate(() => ({
  fallback: document.documentElement.classList.contains('is-fallback'),
  webglReady: document.getElementById('webgl')?.classList.contains('is-ready'),
  loading: document.body.classList.contains('is-loading'),
  loaderDisplay: getComputedStyle(document.getElementById('loader') || document.body).display,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
}));
await page.screenshot({ path: `${out}/reduced-390.png` });

console.log(JSON.stringify({ results, reduced, logCount: logs.length }, null, 2));
await browser.close();
