import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('src/film/style.css', 'utf8');
const ui = fs.readFileSync('src/film/ui.js', 'utf8');

// classes present in HTML attributes
const htmlClasses = new Set();
for (const m of html.matchAll(/class="([^"]+)"/g)) {
  m[1].split(/\s+/).forEach((c) => c && htmlClasses.add(c));
}
// classes generated in ui.js template strings
const uiClasses = new Set();
for (const m of ui.matchAll(/class="([^"]+)"/g)) {
  m[1].split(/\s+/).forEach((c) => {
    if (!c || c.includes('$') || c.includes('{')) return;
    uiClasses.add(c);
  });
}
// classes used via classList in js
for (const m of ui.matchAll(/classList\.(?:add|toggle|remove)\('([^']+)'/g)) htmlClasses.add(m[1]);

const cssClasses = new Set();
for (const m of css.matchAll(/\.([a-zA-Z][\w-]*)/g)) cssClasses.add(m[1]);

const missing = [...new Set([...htmlClasses, ...uiClasses])].filter((c) => !cssClasses.has(c)).sort();
const unused = [...cssClasses].filter((c) => !htmlClasses.has(c) && !uiClasses.has(c)).sort();

const ids = new Set();
for (const m of html.matchAll(/id="([^"]+)"/g)) ids.add(m[1]);
const missingIds = [...ids].filter((id) => !css.includes('#' + id)).sort();

console.log(JSON.stringify({
  htmlClassCount: htmlClasses.size,
  missingInCss: missing,
  unusedInCssCount: unused.length,
  unusedInCss: unused,
  missingIds,
}, null, 2));
