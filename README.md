# Karnail Tour and Travels — One-Page Website

A simple, fast, professional one-page website for Karnail Tour and Travels
(cab & tour operator, Mohali, Punjab), built for good search-engine visibility.

**No 3D, no frameworks on the page** — plain HTML + CSS + a small vanilla JS file.
The old 3D "film" experiment still sits in `src/film/` but is **not loaded** by the
site and is not part of the build.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build / deploy

```bash
npm run build      # outputs to dist/
npm run preview    # serve dist/ locally
```

Deploys to Netlify as-is (`netlify.toml` already points at `dist/`).
Drag-and-drop the `dist/` folder onto https://app.netlify.com/drop also works.

## SEO — what is already done

- Semantic single-page HTML with one `h1`, real section headings, descriptive `alt` text.
- Title, meta description, canonical URL, Open Graph + Twitter cards.
- JSON-LD structured data: `TaxiService`/`LocalBusiness`, `WebSite`, `FAQPage`
  (FAQ schema matches the visible FAQ text).
- `robots.txt` + `sitemap.xml` with the real domain.
- Custom 404 page, favicon, web manifest, preloaded hero image and fonts.
- Very light page: ~6 KB gzipped CSS + ~2 KB JS, lazy images, no tracking, no external requests.

## SEO — what YOU must do to actually appear in Google

1. **Verify the site in Google Search Console** (https://search.google.com/search-console)
   and submit `https://karnailtourandtravel.netlify.app/sitemap.xml`.
2. Create a **Google Business Profile** for the business — this is the single biggest
   factor for local searches like "taxi in Mohali". Keep the name, phone and city
   identical everywhere (NAP consistency).
3. Phone / WhatsApp: **+91 87288 78910** (set across the page — double-check it is the
   client's real number).
4. Add a real street address and email if you want them published (there are none on
   the current site, so none are invented here).
5. Get a few real Google reviews — never fake ones.
6. If you later get a custom domain, update the domain in:
   `index.html` (canonical + OG + JSON-LD), `public/robots.txt`, `public/sitemap.xml`.

## Editing content

Everything visible lives in **`index.html`**:

- Phone / WhatsApp links: search for `918728878910` and replace.
- Services, vehicles, routes, packages, trust, FAQ, footer text: plain HTML sections.
- Business facts (hours, city): also duplicated inside the JSON-LD block in `<head>`.
- Colours/fonts: `src/website/style.css` (`--teal`, `--amber`, `--ink`, `--bone`).

## Project layout

```
index.html              the whole site
src/website/style.css   styles
src/website/main.js     menu, scroll-spy, reveal, WhatsApp booking form
src/assets/fonts/       local fonts (Anton, Manrope) — also in public/fonts
public/                 robots.txt, sitemap.xml, 404.html, favicon, images, manifest
src/film/               archived 3D experiment — NOT used by the site
```

## Notes

- The booking form does not store anything; it opens WhatsApp with a pre-filled message.
- Testimonials are intentionally omitted — the current site has no verified reviews.
