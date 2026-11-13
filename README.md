# Karnail Tour and Travels

A cinematic, single-page website for a family-run cab and tour service in Mohali, Punjab. The design takes its cues from the `taxi_3d_360_viewer.html` reference: a dark showroom palette, layered depth, pointer-reactive 3D tilt, oversized serif type, illustrated vehicles and a warm marigold accent.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal, usually **http://localhost:5173**.

Production build:

```bash
npm run build
npm run preview
```

> Windows PowerShell note: if `npm` is blocked by the execution policy, use `npm.cmd install` and `npm.cmd run dev`.

## Stack

- Vite 5 + React 18
- Tailwind CSS 3 with custom colour, type and motion tokens
- Lucide React icons
- IntersectionObserver scroll reveals and rAF-throttled pointer effects
- Plain CSS 3D transforms for tilt, parallax and the vehicle showroom

## Project structure

```
src/
  App.jsx                    Page composition + scroll progress
  assets/img/                Local photography (hero, destinations, peaks)
  components/site/
    Navbar.jsx               Floating glass navigation + mobile menu
    Hero.jsx                 Parallax hero, mountain planes, ride ticket
    Marquee.jsx              Service ticker
    Intro.jsx                Story, stats and landscape card
    Services.jsx             Six service cards
    Fleet.jsx                Interactive vehicle showroom with tabs
    VehicleArt.jsx           Branded SVG sedan / SUV / Innova / tempo art
    Destinations.jsx         Draggable destination rail
    RouteStory.jsx           Three-step booking story with drawn route
    Promise.jsx              Trust cards
    Reviews.jsx              Auto-scrolling review rail
    Contact.jsx              WhatsApp / call conversion block
    Footer.jsx               Sitemap, contact and large brand watermark
    StickyBar.jsx            Mobile call / WhatsApp bar
    primitives.jsx           Reveal, buttons, labels, seal and icons
    spatial.jsx              Pointer tracking, Tilt and BrandMark
  data/business.js           All site copy, contact details and fleet/destination data
  index.css                  Fonts, base styles, reveal and 3D utilities
public/                      Favicon, robots.txt, sitemap.xml, redirect
```

## Editing content

- **Business details and phone/WhatsApp** — `src/data/business.js`. Update the demo number before launch.
- **Services, fleet, destinations, promises, reviews and booking steps** — also `src/data/business.js`.
- **Page metadata and structured data** — `index.html`.
- **Colours and type scale** — `tailwind.config.js`.
- **Fonts and custom utilities** — `src/index.css`.
- **Photography** — `src/assets/img/`. Keep the hero at roughly 1600 × 1000 and destination cards portrait (3:4).

## Interactive details

- Pointer-driven parallax in the hero and destination cards.
- 3D tilt with a moving specular highlight on service, fleet, destination and review cards.
- Vehicle tabs swap the illustrated car, specs and WhatsApp booking message.
- Scroll-drawn route line in the booking story.
- Auto-scrolling service ticker and review rail, both paused on hover.
- Mobile menu with staggered links and a sticky call / WhatsApp bar.

All pointer effects are disabled for touch devices and `prefers-reduced-motion`.

## SEO and accessibility

- Descriptive title, meta description, Open Graph, Twitter card and `TravelAgency` JSON-LD in `index.html`.
- `public/robots.txt` and `public/sitemap.xml` point at the demo domain; replace it with the live domain before launch.
- Lighthouse: 100 accessibility, 100 best practices, 100 SEO.

## Deploying

### Netlify

1. Push the repository to GitHub and import it into Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. `netlify.toml` and `public/_redirects` are already configured.

### Vercel

1. Import the repository at vercel.com.
2. Framework preset: **Vite**.
3. Build command: `npm run build`; output directory: `dist`.

Replace the demo phone number, domain and social copy before going live.
