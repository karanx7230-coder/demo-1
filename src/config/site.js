/**
 * Central brand configuration.
 * Update this file to rebrand the entire site without touching components.
 */
export const site = {
  name: 'Himalayan Trails & Tours',
  shortName: 'Himalayan Trails',
  initials: 'HT',
  tagline: 'Explore India & the World, Beautifully.',
  description:
    'A premium travel studio from Mohali, Punjab, crafting thoughtful journeys across India and the world — from Himalayan road trips to handpicked international escapes.',
  established: 2018,
  url: 'https://www.himalayantrails.demo',

  logo: {
    mark: '/favicon.svg',
    alt: 'Himalayan Trails & Tours mountain emblem',
  },

  contact: {
    phoneDisplay: '+91 98765 43210',
    phone: '+919876543210',
    whatsappDisplay: '+91 98765 43210',
    whatsapp: '919876543210',
    whatsappMessage: 'Hi Himalayan Trails! I would like to plan a trip.',
    email: 'hello@himalayantrails.demo',
    emailHref: 'mailto:hello@himalayantrails.demo',
    address: {
      line1: 'SCO 24, Phase 7, Industrial Area',
      city: 'Mohali',
      state: 'Punjab',
      postalCode: '160055',
      country: 'India',
      full: 'SCO 24, Phase 7, Industrial Area, Mohali, Punjab 160055, India',
    },
    hours: 'Mon–Sat, 10:00 AM – 7:00 PM',
    hoursShort: 'Mon–Sat · 10 AM–7 PM',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=SCO+24+Phase+7+Industrial+Area+Mohali+Punjab+160055',
  },

  socials: [
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

  departures: ['Chandigarh', 'Mohali', 'Delhi'],

  booking: {
    advancePercent: 20,
    freeCancellationDays: 15,
    paymentNote: 'Pay just 20% to confirm your booking.',
    cancellationNote: 'Free cancellation up to 15 days before departure.',
  },

  seo: {
    titleTemplate: '%s | Himalayan Trails & Tours',
    defaultTitle: 'Himalayan Trails & Tours | Explore India & the World, Beautifully',
    description:
      'Premium domestic and international tour packages from Chandigarh, Mohali and Delhi. Curated itineraries, handpicked stays and 24/7 trip support.',
    ogImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=70',
    twitterHandle: '@himalayantrails',
  },

  legal: {
    privacyUpdated: '12 October 2026',
    termsUpdated: '12 October 2026',
  },
};

export default site;
