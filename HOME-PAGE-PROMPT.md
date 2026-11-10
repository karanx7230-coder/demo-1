# MASTER PROMPT — Karnail Tour and Travels · Home Page

## 1. Role

You are a senior creative developer and designer at an Awwwards-level agency. Design and build the **home page** for **Karnail Tour and Travels**, a family-run cab and tour business in Mohali, Punjab. The result must feel premium, warm and human — never like a template, a SaaS product or a tech startup.

---

## 2. One-line brief

A single-page, scroll-driven **spatial travel desk**: the visitor stands inside a layered Himalayan scene, moves through depth as they scroll, and every action ends in a WhatsApp message or a phone call.

---

## 3. Non-negotiables

1. **No booking forms.** Every CTA opens WhatsApp (`wa.me`) or a phone call (`tel:`). No inputs, no date pickers, no "submit".
2. **Fast and smooth on a mid-range phone.** CSS transforms over layout animation. No heavy 3D libraries. Images lazy-loaded below the fold.
3. **Premium and friendly.** Editorial typography, generous space, real warmth. Not luxury-cold, not budget-loud.
4. **Single page.** Anchored sections only (`#services`, `#fleet`, `#destinations`, `#why`, `#reviews`, `#contact`).
5. **Business truth first.** Use only the supplied details. Flag anything unconfirmed instead of inventing it.

**Business facts**

- Name: Karnail Tour and Travels
- Tagline: *Travel Safe. Travel Happy.*
- Base: Mohali, Punjab
- Phone / WhatsApp: +91 98765 43210 *(confirm real number before launch)*
- Hours: 24/7
- Copyright: © 2026 Karnail Tour and Travels

---

## 4. Creative concept & motive

**Concept: “The road, handled.”**

The page is one continuous drive from Mohali into the mountains. Depth is the storytelling device: the visitor is not looking at a flat page, they are looking *into* a scene. Each scroll step moves them a little further down the road; each layer sits at a different distance from the eye.

**Why spatial UI?**

- A cab business sells **trust and presence**. Depth makes the brand feel tangible — like a dashboard, a ticket in hand, a road ahead.
- Spatial layering lets the page carry a lot of information (services, fleet, destinations, proof) without feeling like a long list of cards.
- It creates a memorable first five seconds, which is what separates an award-level site from a good local business site.
- The depth is **quiet**: warm light, soft shadows and slow parallax — not neon sci-fi. It should feel like a premium travel journal, not a video game.

**Spatial hierarchy (back to front)**

1. **Sky / photograph plane** — full-bleed hero image, slowest to move.
2. **Haze plane** — gradients and a warm marigold glow that separate photo from content.
3. **Ridge plane** — two hand-drawn mountain silhouettes at the bottom, shifting at different speeds.
4. **Content plane** — headline, body, buttons, ticket card.
5. **Interface plane** — floating glass navigation and the fixed mobile action bar.

**Spatial devices used across the page**

- Pointer parallax: elements translate by different amounts based on cursor position (`--mx`, `--my`), creating real depth without scroll hijacking.
- 3D tilt: cards rotate up to ~6–9° with a moving specular highlight (`.tilt` + `.tilt-glare`).
- Stacked sections: every major section has rounded top corners and overlaps the previous one by 24px, so the page reads as a stack of physical panels.
- Floating capsule nav: a detached glass pill, not a full-width bar.
- Fleet showroom: a perspective floor grid, a floating vehicle illustration and spatial spec labels.
- Ambient cursor glow: a very soft marigold light that follows the pointer on desktop only.

**Motion rule:** depth must never fight reading. Max 8–10° tilt, 12–40px parallax, 500–800ms eased transitions, and everything disabled for `prefers-reduced-motion` and touch devices.

---

## 5. Design system

### Colour palette

| Token | Hex | Use | Motive |
|---|---|---|---|
| Ink | `#0C1410` | Dark sections, body text on light | Near-black green; softer than pure black |
| Pine | `#14382B` | Primary brand, dark panels, buttons | Himalayan pine at dusk |
| Pine Deep | `#0B241B` | Gradients, ridges | Depth and shadow |
| Cream | `#F6EFE2` | Page background, light cards | Warm paper, not sterile white |
| Cream Light | `#FBF7EF` | Alternating light sections | Breath between dark blocks |
| Sand | `#E3D1B3` | Borders, secondary surfaces | Dusty road, aged print |
| Marigold | `#F0A33B` | CTAs, accents, route markers | Punjab marigold, morning light |
| Clay | `#BF5A38` | Tiny accents only | Terracotta, warmth |

Rules: marigold is for action and emphasis only. Cream text on ink must stay at 70% opacity or above for body copy. Avoid pure white and pure black.

### Typography

- **Display: Fraunces** (300–700, normal + italic). Oversized, tight tracking (`-0.03em` to `-0.045em`), line-height `0.86–1.05`. Italic words in marigold carry emotion: *happy*, *journey*, *take the wheel*.
- **UI/body: Manrope** (400–700). Small labels are uppercase, `0.55–0.7rem`, letter-spacing `0.16–0.26em`.
- Hero H1: `clamp(3.4rem, 10.5vw, 9.5rem)`.
- Section H2: `clamp(2.6rem, 6.2vw, 5.5rem)`.
- Self-host the fonts (woff2). No Google Fonts requests at runtime.

### Shape, texture, light

- Radius: cards `1rem–1.5rem`, feature panels `2rem–2.75rem`, buttons and nav fully rounded.
- Shadows are long and soft: `0 30px 80px -46px rgba(12,20,16,.55)`.
- A fixed 3.5% film-grain overlay across the whole page.
- Hairline borders at 10–15% opacity; never heavy outlines.
- Glass surfaces: blur 16–20px, 1px cream border, subtle inner light.

---

## 6. Image direction

**Style:** editorial documentary travel photography. Warm film tones, real weather, real roads, human scale. Golden hour or early blue hour. No white-suit models, no fake handshakes, no over-saturated HDR, no text baked into images.

**Treatment:** landscape images for full-bleed moments; 3:4 portrait crops for destination cards; dark gradient overlays so type stays legible. Add `alt` text that describes the place, not the file.

| Image | Description (1–2 lines) | Motive / placement |
|---|---|---|
| `hero.webp` | A quiet mountain road curving into pine-covered Himalayan foothills at first light, empty and inviting. | Sets the promise: the road is calm and handled. Full-bleed hero, slow parallax. |
| `hero-mobile.webp` | Vertical crop of the same road and ridgeline, with more sky for the headline. | Keeps the hero composition intact on phones without downloading the large file. |
| `manali.webp` | Tall pines, a river bend and a snow-dusted peak in soft morning haze. | Manali card — the flagship hill escape. |
| `shimla.webp` | Colonial rooftops stacked on a green ridge under a pale sky. | Shimla card — quick weekend trip. |
| `amritsar.webp` | The Golden Temple glowing at dusk, reflected in still water. | Amritsar card — culture and pilgrimage. |
| `goa.webp` | Palm shadows on a warm beach at golden hour, calm sea beyond. | Goa card — the fly-and-transfer package. |
| `dharamshala.webp` | A mountain town tucked under steep pine slopes, prayer flags catching light. | Dharamshala card — slower, spiritual travel. |
| `ladakh.webp` | A thin road crossing a bare high-altitude landscape under a huge sky. | Ladakh card — the aspirational road trip. |
| `peaks.webp` | Snow-capped Himalayan peaks at first light, layered in blue haze. | Intro editorial image — scale and wonder. |

**Fleet:** do **not** use stock car photos. Use custom flat-vector vehicle illustrations (sedan, SUV, Innova, Tempo Traveller) in cream/sand with pine glass and a marigold beltline, placed on a perspective floor.

**Logo:** use a simple pine circular monogram with a cream “K” and a marigold dot. Do not place a white-background raster logo on dark surfaces.

---

## 7. Page anatomy, copy and motive

### 7.1 Floating navigation

- Detached glass capsule, 70px tall, max-width 1280px, inset 16px from the top.
- Left: monogram + “Karnail / TOUR & TRAVELS”.
- Centre: Services · Fleet · Destinations · Why us · Reviews.
- Right: phone number (desktop XL) + marigold “Book a Ride” pill + mobile menu button.
- Transparent over the hero; turns cream and gains a shadow after 28px of scroll.
- Mobile menu: full-screen ink panel, oversized serif links numbered 01–05, Call and WhatsApp buttons at the bottom.

**Motive:** the nav should feel like a floating instrument panel, not a website header.

### 7.2 Hero

**Copy**

- Eyebrow: `MOHALI, PUNJAB · OPEN 24/7`
- H1: “Travel safe. / Travel *happy.*”
- Body: “Cabs, outstation drives and handpicked tours from Mohali — with drivers who know the road and a team that picks up on the first ring.”
- Primary CTA: “Book on WhatsApp”
- Secondary CTA: “Call +91 98765 43210”
- Microcopy: “No forms. No call centres. Just a real person on WhatsApp.”

**Ticket card (floating, tilts with the pointer)**

- “Your next ride” / “One way”
- “Mohali → Manali”
- “Private cab · 7–8 hrs · Doorstep pickup”
- “Fare — On request”
- Link: “Plan this ride”

**Bottom strip:** Airport transfers · Outstation cabs · Tour packages

**Motive:** one image, one promise, two actions, one physical object (the ticket). The mountain ridges create depth; the card proves the “handled” idea before a single scroll.

### 7.3 Services marquee

Marigold ticker with a four-point star between items: Airport transfers · Outstation cabs · Corporate travel · Wedding transport · Tour packages · Local sightseeing.

**Motive:** a fast, warm transition from the hero into the practical side of the business.

### 7.4 Intro / manifesto

- Eyebrow: `01 — THE IDEA`
- H2: “A cab is a cab. / A *journey* is something else.”
- Body: “Karnail Tour and Travels is a family-run travel service in Mohali. We started with one simple belief: the ride should feel as good as the destination. Clean cars, calm drivers, honest fares — and a real person on the other end of the phone.”
- Second paragraph: “Whether it is a 4 AM airport run or a week in the mountains, we plan around you. No call centres. No hidden charges. Just the road, handled.”
- Stats: `24/7` On call, always · `04` Cab classes · `06` Ways to travel · `01` Person who knows your trip
- Image caption: “The road out of Mohali · 5:40 AM” / “Wherever you are headed, someone here has already driven it.” / “Himachal · Punjab · Beyond”
- Floating card: “First pickup · Mohali / 05:40 → Manali / 300 km · tea stop included”

**Motive:** establish family-run trust and a specific, human detail (5:40 AM) instead of generic “about us” language.

### 7.5 Services

- Eyebrow: `02 — WHAT WE DO`
- H2: “Six ways we can / *take the wheel.*”
- Body: “A quick airport run, a wedding convoy or a two-week mountain loop — same care, same clean cars, same person answering the phone.”
- Link: “Ask on WhatsApp”

Cards (each links to WhatsApp with the service name pre-filled):

1. **Airport Transfers** — “Flight at 5 AM? We are outside before you are. On-time pickups and drop-offs to Chandigarh airport and beyond.”
2. **Outstation Cabs** — “Manali, Shimla, Amritsar or somewhere only you know. Comfortable long drives with experienced hill drivers.”
3. **Corporate Travel** — “Monthly billing, verified drivers and cars that show up when the meeting does. Travel that reflects well on you.”
4. **Wedding Transport** — “Decorated cars, coordinated arrivals and a fleet that keeps the whole family moving — without the chaos.”
5. **Tour Packages** — “Curated itineraries for Himachal, Punjab and beyond. Stays, sightseeing and the road, all sorted.”
6. **Local Sightseeing** — “A few hours or a full day around Mohali, Chandigarh and Panchkula — at your pace, with a local at the wheel.”

**Motive:** each card is a real scenario, not a feature. Hover lifts and tilts the card in 3D; the card turns pine with a marigold icon.

### 7.6 Fleet

- Eyebrow: `03 — THE FLEET`
- H2: “Pick the car. / *We handle the rest.*”
- Body: “Every car is cleaned, serviced and checked before it reaches you. Choose the size that fits your trip — we will confirm the exact model on WhatsApp.”
- Stage: perspective floor grid, ambient marigold light, floating vehicle illustration, spatial labels for seating, luggage, model and fare.
- Selector: Sedan (4 seater), SUV (6 seater), Innova (7 seater), Tempo Traveller (12–17 seater).
- CTA: “Book the {vehicle} on WhatsApp”
- Fare: “On request” until real per-km rates are supplied.

**Motive:** a showroom, not a price table. The visitor configures with one tap and leaves for WhatsApp.

### 7.7 Destinations

- Eyebrow: `04 — WHERE TO`
- H2: “Some places are / *worth the drive.*”
- Body: “The classics, plus a few the regulars keep coming back to. Every route can be a quick one-way drop or a full tour with stays — you decide the pace.”
- Horizontal snap rail with arrow controls; cards tilt on hover.

1. **Manali** — 300 km · 7–8 hrs — “Pine air, river stops and the first snow of the season.”
2. **Shimla** — 115 km · 3 hrs — “A quick hill escape for long weekends and spontaneous plans.”
3. **Amritsar** — 220 km · 4 hrs — “Golden Temple, langar and the Wagah border in one day.”
4. **Goa** — Tour package — “Flights, stays and transfers — planned end to end.”
5. **Dharamshala** — 200 km · 4.5 hrs — “Monasteries, mountain cafés and a slower kind of morning.”
6. **Ladakh** — Tour package — “High passes, thin air and the road trip of a lifetime.”

End card: “Somewhere else in mind?” / “Tell us the name. We have probably driven it.” / “Ask on WhatsApp”.

**Motive:** desire before logistics. Each card is a one-tap WhatsApp enquiry with the destination already written.

### 7.8 How it works

- Eyebrow: `05 — HOW IT WORKS`
- H2: “Three messages. / *One good journey.*”
- Body: “No accounts, no forms, no waiting for a callback that never comes. This is the whole process — start to finish.”

1. **Say hello** — “Tell us where you are going, how many of you, and when. A WhatsApp message is enough.”
2. **We plan the route** — “We confirm the cab, the driver and a clear fare — before pickup, not after.”
3. **You travel** — “Doorstep pickup, a spotless car and a driver who knows the way. That is the whole thing.”

Note: “Fares are confirmed on WhatsApp before pickup. No surprises at the end of the road.”
CTA: “Start on WhatsApp”

**Motive:** remove fear. A drawn route line connects the three steps as the visitor scrolls.

### 7.9 Why choose us

- Eyebrow: `06 — THE PROMISE`
- H2: “The boring things, / *done properly.*”
- Body: “Safety, punctuality and a clean car are not extras. They are the minimum. Everything else is why people call us again.”
- Quote: “We would rather fix a small thing than lose a good relationship.” — The Karnail way
- Cards: Safe and reliable · 24/7 support · Affordable prices · Customer satisfaction.

**Motive:** confidence, stated plainly. No superlatives.

### 7.10 Reviews

- Eyebrow: `07 — KIND WORDS`
- H2: “People come back. / *That is the review.*”
- Rating: “5.0” with stars and “From riders across Punjab”.
- Slow marquee of review cards:

1. Rahul Sharma, Chandigarh — “Excellent service! The driver was polite and the journey was super comfortable.”
2. Priya Mehta, Delhi — “Best travel agency in the region. Highly recommended for tours and cabs!”
3. Amanpreet Singh, Mohali — “Smooth booking, on-time pickup and a very professional team.”

Disclaimer: “Reviews shared by our riders · Names shortened for privacy”.

**Motive:** social proof without a wall of logos or fake counters.

### 7.11 Contact

- Eyebrow: `ONE MESSAGE AWAY`
- H2: “Tell us where / you’re *going.*”
- Body: “Send the destination, the date and how many of you are travelling. We will reply with the cab, the driver and a clear fare.”
- CTA 1: “Chat on WhatsApp” — “Fastest reply”
- CTA 2: “+91 98765 43210” — “Prefer to talk?”
- Info row: Based in Mohali, Punjab · Open 24/7 · Serving Punjab · Himachal · Beyond.

**Motive:** the page ends where every real booking starts — a conversation.

### 7.12 Footer

- Monogram + “Karnail / TOUR & TRAVELS”
- Blurb: “Safe, comfortable and reliable cabs and tours from Mohali. Travel safe. Travel happy.”
- WhatsApp and phone links.
- Columns: Explore · Services · Reach us.
- Giant ghost wordmark “Karnail” at 7% opacity.
- “© 2026 Karnail Tour and Travels. All rights reserved.”
- “Travel Safe · Travel Happy” + back-to-top button.

### 7.13 Mobile action bar

After 620px of scroll, a fixed ink bar appears with two thumb-sized buttons: **Call** and **WhatsApp**. Add safe-area padding. Hide on desktop.

---

## 8. Motion specification

- Reveal on scroll: 26px rise + fade, 800ms, `cubic-bezier(0.22, 1, 0.36, 1)`, once only.
- Hero parallax: photo 0→12%, content 0→20%, fade to 0.4.
- Ridge parallax: ±18px and ±36px with pointer; disabled on touch.
- Tilt: max 5–9°, 120ms response on hover, 550ms return.
- Marquee: 34s (services), 55s (reviews), pause on hover.
- Seal: 22s continuous rotation.
- Route line: draws with scroll progress.
- Reduced motion: no transforms, no marquees, no smooth scroll; static layout.

---

## 9. Responsive behaviour

- **Mobile (<768px):** single-column hero, one hero image, no pointer effects, stacked fleet, destination rail 78vw cards, full-screen menu, fixed Call/WhatsApp bar.
- **Tablet (768–1023px):** two-column services, fleet stage + selector stacked, destination cards 46vw.
- **Desktop (≥1024px):** 12-column grid, 7/5 splits, floating ticket card, spatial labels around the fleet, ambient cursor glow.
- Never allow horizontal page scroll. Rails and marquees must be clipped by their own containers.

---

## 10. Accessibility & performance

- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`.
- Every image has meaningful `alt`; decorative images use empty `alt`.
- Visible focus rings (marigold, 2px, 2px offset).
- Skip-to-content link.
- Contrast: body text at ≥70% opacity on dark; labels at ≥45% only when large/bold.
- Buttons have accessible names; tabs use `role="tablist"` / `role="tab"` / `aria-selected`.
- Hero image `fetchpriority="high"`; everything else lazy.
- Target: Lighthouse SEO 100, Best Practices 100, Accessibility ≥95.
- JS budget under ~110KB gzip; CSS under ~12KB gzip.

---

## 11. SEO / meta

- Title: “Karnail Tour and Travels | Cabs & Tours in Mohali”
- Description: “Karnail Tour and Travels — safe, comfortable cabs and curated tours from Mohali. Airport transfers, outstation cabs, corporate travel, weddings and tour packages. Travel Safe. Travel Happy.”
- `TravelAgency` JSON-LD with name, slogan, telephone, Mohali address, area served and 24/7 opening hours.
- Favicon: pine rounded square with cream “K” and marigold dot.

---

## 12. Avoid

- Booking forms, date pickers, search fields, login.
- Stock photos of businessmen shaking hands or generic car interiors.
- Pure black, pure white, neon gradients, glassmorphism for its own sake.
- Scroll hijacking, horizontal page scroll, autoplaying video with sound.
- Invented prices, addresses, emails or social links.
- Logo artwork on a white square over dark backgrounds.

---

## 13. Acceptance checklist

- [ ] Hero reads in under 2 seconds on a phone; headline never clips.
- [ ] Every CTA opens WhatsApp or the dialler with a sensible pre-filled message.
- [ ] Depth effects are invisible on touch and disabled for reduced motion.
- [ ] Fleet selector, destination rail and mobile menu all work with keyboard and touch.
- [ ] No console errors or warnings.
- [ ] No horizontal overflow at 360, 390, 768, 1024, 1440 and 1920px.
- [ ] Build passes; no external font or image requests.
- [ ] Phone number, address, email and social links confirmed with the client before launch.
