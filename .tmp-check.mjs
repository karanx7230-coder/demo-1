import puppeteer from 'puppeteer-core';

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = 'http://localhost:4173/';

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

const mob = await browser.newPage();
await mob.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await mob.goto(url, { waitUntil: 'networkidle0' });
await mob.evaluate(() => document.querySelector('.nav-toggle')?.click());
await new Promise((r) => setTimeout(r, 700));
await mob.screenshot({ path: '.tmp/final-mob-menu-open.png' });

// close menu via toggle (X)
await mob.evaluate(() => document.querySelector('.nav-toggle')?.click());
await new Promise((r) => setTimeout(r, 700));
const openAfterClose = await mob.evaluate(() => document.querySelector('.nav')?.classList.contains('is-open'));
console.log('menu open after close:', openAfterClose);

// form fill -> submit opens wa.me window (stub window.open)
await mob.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await mob.waitForNetworkIdle({ idleTime: 800 }).catch(() => {});
await mob.evaluate(() => {
  window.open = (u) => { window.__waUrl = u; return null; };
});
await mob.type('input[name=name]', 'Test Singh');
await mob.type('input[name=phone]', '+91 90000 00000');
await mob.type('input[name=from]', 'Mohali');
await mob.type('input[name=to]', 'Manali');
await mob.select('select[name=service]', 'Outstation Cabs');
await mob.click('.form-card__submit');
await new Promise((r) => setTimeout(r, 400));
const waUrl = await mob.evaluate(() => window.__waUrl);
console.log('wa url:', waUrl);
await mob.screenshot({ path: '.tmp/final-mob-form.png' });

// desktop full page with everything revealed
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000 });
await page.goto(url, { waitUntil: 'networkidle0' });
await page.evaluate(async () => {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  // force-load all lazy images for the full-page capture
  document.querySelectorAll('img[loading=lazy]').forEach((img) => (img.loading = 'eager'));
  await new Promise((r) => setTimeout(r, 100));
});
await page.waitForNetworkIdle({ idleTime: 1000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: '.tmp/final-desktop-full.png', fullPage: true });

await browser.close();
console.log('done');
