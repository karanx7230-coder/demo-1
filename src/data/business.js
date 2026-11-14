/**
 * Business details live here so every call-to-action stays consistent.
 *
 * TODO for the client before launch:
 *  - Confirm the phone / WhatsApp number (currently the demo number from the brief).
 *  - Add the full street address, email and social links.
 *  - Add real per-km fares and destination starting prices if they should be public.
 */
export const business = {
  name: 'Karnail Tour and Travels',
  shortName: 'Karnail',
  tagline: 'Travel Safe. Travel Happy.',
  phone: '+918728878910',
  phoneDisplay: '+91 87288 78910',
  whatsapp: '918728878910',
  whatsappDisplay: '+91 87288 78910',
  base: 'Mohali, Punjab',
  hours: '24 / 7',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mohali+Punjab',
  intro:
    'Safe, comfortable and reliable cabs and tours from Mohali — with drivers who know the road and a team that picks up on the first ring.',
};

export const wa = (message = 'Hi Karnail Tour and Travels, I would like to plan a ride.') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

export const tel = `tel:${business.phone}`;

export const services = [
  {
    id: 'airport',
    title: 'Airport Transfers',
    copy: 'On-time pickups and drop-offs to Chandigarh airport and beyond.',
  },
  {
    id: 'outstation',
    title: 'Outstation Cabs',
    copy: 'Comfortable long drives with experienced hill drivers.',
  },
  {
    id: 'corporate',
    title: 'Corporate Travel',
    copy: 'Monthly billing, verified drivers and cars that show up on time.',
  },
  {
    id: 'tours',
    title: 'Tour Packages',
    copy: 'Curated itineraries for Himachal, Punjab and beyond.',
  },
  {
    id: 'sightseeing',
    title: 'Local Sightseeing',
    copy: 'Mohali, Chandigarh and Panchkula at your pace, with a local at the wheel.',
  },
];
