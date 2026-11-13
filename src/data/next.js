export const navLinks = [
  { label: 'Journey', href: '#journey' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Experience', href: '#experience' },
];

export const fleet = [
  {
    id: 'sedan',
    name: 'Sedan',
    image: '/assets/vehicles/sedan-cutout.webp',
    environment: '/assets/hero/hero-landscape.webp',
    glow: 'from-amber-500/20 via-transparent to-transparent',
  },
  {
    id: 'suv',
    name: 'SUV',
    image: '/assets/vehicles/suv-cutout.webp',
    environment: '/assets/destinations/mountains-02.webp',
    glow: 'from-sky-400/15 via-transparent to-transparent',
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller',
    image: '/assets/vehicles/tempo-traveller-cutout.webp',
    environment: '/assets/destinations/highway-aerial.webp',
    glow: 'from-emerald-400/15 via-transparent to-transparent',
  },
  {
    id: 'coach',
    name: 'Luxury Coach',
    image: '/assets/vehicles/bus-cutout.webp',
    environment: '/assets/vehicles/fleet-background.webp',
    glow: 'from-marigold/25 via-transparent to-transparent',
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

export const experience = {
  details: [
    {
      image: '/assets/experience/travel-detail-01.webp',
      title: 'The early start',
      copy: 'Car warmed, route checked, driver outside before you are.',
    },
    {
      image: '/assets/experience/travel-detail-02.webp',
      title: 'Room to stop',
      copy: 'The best views rarely come with a parking sign.',
    },
    {
      image: '/assets/experience/travel-detail-03.webp',
      title: 'The last hour',
      copy: 'We plan arrivals for daylight, not for the meter.',
    },
  ],
};
