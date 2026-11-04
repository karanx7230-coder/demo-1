/**
 * Central brand configuration.
 * Update this file to rebrand the entire site without touching components.
 */
export const site = {
  name: 'Karnail Tour and Travels',
  shortName: 'Karnail Travels',
  initials: 'KT',
  tagline: 'Safe. Smart. Secure.',
  slogan: 'We serve each mile with an extra smile!',
  description:
    'Karnail Tour and Travels offers safe, reliable tour packages and vehicle hire for the Himalayas and beyond, with every type of vehicle available for Himachal, Spiti Valley, Leh Ladakh, Uttarakhand, Rajasthan and Kashmir.',
  established: 2015, // APPROX: confirm real year, or hide it in the components
  url: 'https://www.karnailtours.demo', // TODO: real domain

  logo: {
    mark: '/favicon.svg', // TODO: replace with customer's logo
    alt: 'Karnail Tour and Travels logo',
  },

  contact: {
    phoneDisplay: '98156 66135',
    phone: '+919815666135',
    phones: [
      { display: '98156 66135', href: '+919815666135' },
      { display: '99148 63778', href: '+919914863778' },
      { display: '98973 20111', href: '+919897320111' },
    ],
    whatsappDisplay: '98156 66135', // confirm this number has WhatsApp
    whatsapp: '919815666135',
    whatsappMessage: 'Hi Karnail Tour and Travels! I would like to plan a trip.',
    email: 'karnailtours55@gmail.com',
    emailHref: 'mailto:karnailtours55@gmail.com',
    address: {
      line1: 'Main Market', // PLACEHOLDER: replace with real address
      city: 'Your City', // PLACEHOLDER
      state: 'Punjab', // PLACEHOLDER
      postalCode: '', // PLACEHOLDER
      country: 'India',
      full: 'Main Market, Your City, Punjab, India', // PLACEHOLDER
    },
    hours: 'Mon–Sun, 9:00 AM – 8:00 PM', // APPROX
    hoursShort: 'Daily · 9 AM–8 PM', // APPROX
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Karnail+Tour+and+Travels', // swap for exact share link later
  },

  socials: [
    // TODO: replace with real links, or delete any they don't have
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
  ],

  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    position: 'before',
    maximumFractionDigits: 0,
  },

  destinations: [
    'Himachal',
    'Spiti Valley',
    'Leh Ladakh',
    'Uttarakhand',
    'Rajasthan',
    'Kashmir',
  ],

  // APPROX: per-person starting prices, ex-Chandigarh, shared vehicle, standard stays
  startingPrices: {
    Himachal: { duration: '4N / 5D', price: 8500 },
    'Spiti Valley': { duration: '7N / 8D', price: 18500 },
    'Leh Ladakh': { duration: '7N / 8D', price: 24000 },
    Uttarakhand: { duration: '5N / 6D', price: 10500 },
    Rajasthan: { duration: '6N / 7D', price: 14500 },
    Kashmir: { duration: '5N / 6D', price: 16500 },
  },

  // APPROX: vehicle hire, outstation rates (fuel and driver included, tolls/parking extra)
  fleet: [
    { type: 'Sedan (Dzire / Etios)', seats: 4, ratePerKm: 12 },
    { type: 'SUV (Ertiga)', seats: 6, ratePerKm: 15 },
    { type: 'Innova Crysta', seats: 7, ratePerKm: 19 },
    { type: 'Tempo Traveller', seats: 12, ratePerKm: 26 },
    { type: 'Tempo Traveller (Luxury)', seats: 17, ratePerKm: 32 },
    { type: 'Mini Bus', seats: 26, ratePerKm: 42 },
  ],
  fleetTerms: {
    minKmPerDay: 250, // APPROX
    driverNightAllowance: 500, // APPROX
    note: 'Rates are approximate and vary by season and route. Call for an exact quote.',
  },

  departures: ['Chandigarh', 'Mohali', 'Delhi'], // APPROX: confirm

  booking: {
    advancePercent: 25, // APPROX
    freeCancellationDays: 7, // APPROX
    paymentNote: 'Pay 25% in advance to confirm your booking.',
    cancellationNote: 'Free cancellation up to 7 days before departure.',
  },

  seo: {
    titleTemplate: '%s | Karnail Tour and Travels',
    defaultTitle: 'Karnail Tour and Travels | Safe. Smart. Secure.',
    description:
      'Tour packages and vehicle hire for Himachal, Spiti Valley, Leh Ladakh, Uttarakhand, Rajasthan and Kashmir. All types of vehicles available.',
    ogImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=70', // stock mountain photo until they send their own
    twitterHandle: '',
  },

  legal: {
    privacyUpdated: '4 November 2026',
    termsUpdated: '4 November 2026',
  },
};

export default site;