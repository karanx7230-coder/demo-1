# karnail tour and  travels

A premium, multi-page travel and tour agency website for a demo agency based in Mohali, Punjab. Built with Vite, React, React Router v6, Tailwind CSS, Framer Motion, Lucide React and React Helmet Async.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal, usually **http://localhost:5173**.

Production build:

```bash
npm run build
npm run preview
```

> Windows PowerShell note: if `npm` is blocked by the execution policy, use `npm.cmd install` and `npm.cmd run dev`, or run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` once in the terminal.

## Stack

- Vite 5 + React 18
- React Router v6 with lazy-loaded routes
- Tailwind CSS 3 with custom design tokens
- Framer Motion for reveal and drawer animations
- Lucide React icons
- React Helmet Async for per-page SEO
- LocalStorage wishlist

## Project structure

```
src/
  assets/images.js        All photography, centralized
  components/
    destinations/         DestinationCard
    forms/                EnquiryForm
    layout/               Navbar, Footer, Layout, PageHero, floating actions
    packages/             PackageCard
    seo/                  SEO component
    ui/                   Button, Badge, SectionHeading, SmartImage, Accordion, Modal, Reveal, StarRating
  config/
    site.js               Brand, contact, currency, socials, booking terms
    navigation.js         Navbar and footer links
  context/                Wishlist provider
  data/
    destinations.js       19 destinations
    packages.js           15 full packages with itineraries
    testimonials.js       6 reviews + statistics
    blog.js               6 journal posts
    faqs.js               10 FAQs
    gallery.js            Gallery items
    content.js            Why us, process, team, timeline, certifications
  lib/utils.js            Currency, date, class helpers
  pages/                  All routes
```

## Editing content

- **Brand details** — `src/config/site.js`. Change the name, tagline, phone, email, address, socials, opening hours, departure cities and booking terms here.
- **Currency** — `src/config/site.js` → `currency`. Change `code`, `symbol`, `locale` or `position` (`before`/`after`) once and the whole site updates via `formatCurrency`.
- **Destinations** — `src/data/destinations.js`. Add a new object and it automatically appears on the destinations page and gets a route at `/destinations/:slug`.
- **Packages** — `src/data/packages.js`. Add a package with its itinerary and inclusions to get a full detail page at `/packages/:slug`.
- **Blog** — `src/data/blog.js`. Posts support sections with paragraphs and bullet lists.
- **FAQs** — `src/data/faqs.js`.
- **Gallery** — `src/data/gallery.js` and `src/assets/images.js`.
- **Testimonials** — `src/data/testimonials.js`.
- **Photos** — all image URLs live in `src/assets/images.js`. Replace any Unsplash URL with a local import or your own hosted image. Every image is lazy-loaded with a skeleton loader.

## Changing colours, fonts and logo

Colours are defined in `tailwind.config.js` under `theme.extend.colors`:

- Navy: `#0B1F3A`
- Gold: `#C9A227`
- Off-white: `#FAF8F4`
- Teal: `#1AA6A6`

Updating a shade updates every component using those tokens.

Fonts are loaded in `index.html` and mapped in `tailwind.config.js`:

- Headings — Playfair Display (`font-display`)
- Body — Inter (`font-sans`)

The logo mark is `public/favicon.svg`; the inline navbar/footer mark is in `src/components/layout/Logo.jsx`. Replace both to rebrand the mark.

## Forms

The enquiry form is in `src/components/forms/EnquiryForm.jsx`. At the top:

```js
const FORM_ENDPOINT = '';
```

Paste a Formspree endpoint such as `https://formspree.io/f/xxxxxxxx` (or adapt the submit handler for EmailJS) and the form will post live. With the endpoint blank, the form runs in demo mode and shows the success state.

## SEO

- Per-page title and description are handled through `src/components/seo/SEO.jsx`.
- Open Graph and Twitter tags are included.
- Static `public/robots.txt` and `public/sitemap.xml` are provided. Update the demo domain `karnailtourandtravels.demo` in `src/config/site.js` and the sitemap before launch.
- The sitemap should be regenerated whenever new destinations, packages or posts are added.

## Deploying

### Netlify

1. Push the project to GitHub.
2. In Netlify, **Add new site → Import an existing project**.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add a `_redirects` file in `public/` containing `/* /index.html 200` for client-side routing. Netlify also supports this via a `netlify.toml` redirect.

### Vercel

1. Import the repository at vercel.com.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add a rewrite so all routes serve `index.html` (Vercel’s Vite preset usually handles this; otherwise add a `vercel.json` rewrite).

## Demo data

All company details, reviews, prices and policies are fictional and intended for demonstration. Replace them with the client’s verified information before going live, particularly licence claims, certifications, testimonials and contact details.
