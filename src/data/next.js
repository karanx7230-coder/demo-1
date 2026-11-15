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
    name: 'Himachal',
    image: '/assets/destinations/himachal-01.webp',
    meta: 'Manali · Shimla · Dharamshala',
    copy: 'See pine forests, mountain villages and winding roads.',
  },
  {
    name: 'Spiti',
    image: '/assets/destinations/mountains-02.webp',
    meta: 'Kaza · High desert',
    copy: 'See old monasteries and quiet mountain valleys.',
  },
  {
    name: 'Leh Ladakh',
    image: '/assets/destinations/highway-aerial.webp',
    meta: 'Leh · Nubra · Pangong',
    copy: 'Visit high mountain passes and open roads.',
  },
  {
    name: 'Uttarakhand',
    image: '/assets/destinations/mountains-01.webp',
    meta: 'Rishikesh · Auli · Chopta',
    copy: 'Visit hill towns and riverside spots.',
  },
  {
    name: 'Rajasthan',
    image: '/assets/destinations/highway-aerial.webp',
    meta: 'Jaipur · Jodhpur · Udaipur',
    copy: 'See colorful cities, forts and desert roads.',
  },
  {
    name: 'Kashmir',
    image: '/assets/destinations/kashmir-01.webp',
    meta: 'Srinagar · Gulmarg · Pahalgam',
    copy: 'Enjoy lake trips, green valleys and mountain views.',
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
