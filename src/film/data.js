/**
 * Single source of truth for the film.
 *
 * Business facts mirror the existing site / src/data. Anything the current
 * site does not publish is explicitly marked as a placeholder so it can be
 * swapped before launch.
 */

export const business = {
  name: 'Karnail Tour and Travels',
  shortName: 'Karnail',
  tagline: 'Travel Safe. Travel Happy.',
  phone: '+919876543210',
  phoneDisplay: '+91 98765 43210',
  whatsapp: '919876543210',
  whatsappDisplay: '+91 98765 43210',
  base: 'Mohali, Punjab',
  hours: '24 / 7',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mohali+Punjab',
  intro:
    'Safe, comfortable and reliable cabs and tours from Mohali — with drivers who know the road and a team that picks up on the first ring.',
  // Not published on the current site. Kept empty so the UI shows a placeholder.
  email: '',
  emailPlaceholder: 'Email address to be added',
};

export const wa = (message = 'Hi Karnail Tour and Travels, I would like to plan a ride.') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

export const tel = `tel:${business.phone}`;

export const services = [
  {
    id: 'airport',
    index: '01',
    short: 'AIRPORT',
    title: 'Airport Transfers',
    meta: 'IXC · CHANDIGARH',
    copy: 'On-time pickups and drop-offs to Chandigarh airport and beyond.',
  },
  {
    id: 'outstation',
    index: '02',
    short: 'OUTSTATION',
    title: 'Outstation Cabs',
    meta: 'HILL DRIVERS',
    copy: 'Comfortable long drives with experienced hill drivers.',
  },
  {
    id: 'corporate',
    index: '03',
    short: 'CORPORATE',
    title: 'Corporate Travel',
    meta: 'MONTHLY BILLING',
    copy: 'Monthly billing, verified drivers and cars that show up on time.',
  },
  {
    id: 'wedding',
    index: '04',
    short: 'WEDDINGS',
    title: 'Wedding Transport',
    meta: 'CONVOY',
    copy: 'Decorated cars and coordinated arrivals for the whole family.',
  },
  {
    id: 'tours',
    index: '05',
    short: 'TOURS',
    title: 'Tour Packages',
    meta: '5–9 DAYS',
    copy: 'Curated itineraries for Himachal, Punjab and beyond.',
  },
  {
    id: 'sightseeing',
    index: '06',
    short: 'SIGHTSEEING',
    title: 'Local Sightseeing',
    meta: 'CITY · AT YOUR PACE',
    copy: 'Mohali, Chandigarh and Panchkula at your pace, with a local at the wheel.',
  },
];

/**
 * Fleet categories come from the existing site. Capacities mirror the figures
 * already published in the page's noscript summary — confirm them with the
 * client alongside the phone number before launch.
 */
export const fleet = [
  {
    id: 'sedan',
    name: 'Sedan',
    seats: '4 seats',
    ac: 'Full AC',
    luggage: '2 large bags',
    copy: 'Airport runs, city days and short outstation trips.',
    image: '/assets/vehicles/sedan-cutout.webp',
  },
  {
    id: 'suv',
    name: 'SUV',
    seats: '6–7 seats',
    ac: 'Full AC',
    luggage: '4 large bags',
    copy: 'More room for families, luggage and hill roads.',
    image: '/assets/vehicles/suv-cutout.webp',
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller',
    seats: '12–17 seats',
    ac: 'Full AC',
    luggage: 'Roof carrier',
    copy: 'Group tours, wedding parties and long itineraries.',
    image: '/assets/vehicles/tempo-traveller-cutout.webp',
  },
  {
    id: 'coach',
    name: 'Luxury Coach',
    seats: '27–45 seats',
    ac: 'Full AC',
    luggage: 'Underfloor luggage',
    copy: 'Large groups, corporate offsites and events.',
    image: '/assets/vehicles/bus-cutout.webp',
  },
];

export const destinations = [
  {
    name: 'Kashmir',
    image: '/assets/destinations/kashmir-01.webp',
    meta: 'Dal Lake · 5–7 days',
    copy: 'Shikara mornings, chinar trees and a houseboat that rocks you to sleep.',
  },
  {
    name: 'Himachal',
    image: '/assets/destinations/himachal-01.webp',
    meta: 'Manali · 300 km',
    copy: 'Pine air, river stops and the first snow of the season.',
  },
  {
    name: 'Spiti',
    image: '/assets/destinations/mountains-01.webp',
    meta: 'High passes · 8 days',
    copy: 'Cold desert, old monasteries and a road that keeps opening up.',
  },
  {
    name: 'Ladakh',
    image: '/assets/destinations/mountains-02.webp',
    meta: 'Leh · 9 days',
    copy: 'Thin air, wide skies and the road trip people talk about for years.',
  },
];

export const trust = [
  {
    index: '01',
    word: 'Vetted',
    title: 'Safe drivers. ',
    copy: 'Drivers we know, cars we check, and a team reachable at any hour.',
  },
  {
    index: '02',
    word: 'Clear',
    title: 'Transparent pricing. ',
    copy: 'The car, the driver and the fare are agreed before the wheels move.',
  },
  {
    index: '03',
    word: 'Always',
    title: '24/7 support. ',
    copy: 'Phone answered around the clock — early flights and late arrivals included.',
  },
  {
    index: '04',
    word: 'Local',
    title: 'On-time pickup. ',
    copy: 'Based in Mohali, on the hill roads often enough to know the turns.',
  },
];

/**
 * The current site publishes no testimonials. These are clearly labelled
 * sample slots, never presented as verified reviews.
 */
export const testimonials = [
  {
    quote: 'Booked a 4am airport run and the car was outside ten minutes early.',
    name: 'Sample review',
    trip: 'Airport transfer',
    placeholder: true,
  },
  {
    quote: 'The Manali drive was calm, steady and full of good stops.',
    name: 'Sample review',
    trip: 'Himachal tour',
    placeholder: true,
  },
  {
    quote: 'The wedding convoy arrived together. Nobody was left waiting.',
    name: 'Sample review',
    trip: 'Wedding transport',
    placeholder: true,
  },
];

export const navScenes = [
  { id: 'hero', label: 'Dawn in Mohali', ratio: '01' },
  { id: 'services', label: 'The Highway', ratio: '02' },
  { id: 'fleet', label: 'Turntable', ratio: '03' },
  { id: 'destinations', label: 'Into the Mountains', ratio: '04' },
  { id: 'why', label: 'Night Drive', ratio: '05' },
  { id: 'reviews', label: 'Light Trails', ratio: '06' },
  { id: 'book', label: 'Golden Hour', ratio: '07' },
];

/**
 * Fallback timing. scroll.js recomputes these from the real section heights
 * on every refresh, so desktop/mobile stay in sync with the actual layout.
 */
export const sceneTiming = {
  hero: [0, 0.14],
  services: [0.14, 0.33],
  fleet: [0.33, 0.47],
  destinations: [0.47, 0.63],
  why: [0.63, 0.78],
  reviews: [0.78, 0.91],
  book: [0.91, 1],
};

export const packageNote = 'Package fares and full itineraries on request.';
