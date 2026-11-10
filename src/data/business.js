import manali from '@/assets/img/manali.webp';
import shimla from '@/assets/img/shimla.webp';
import amritsar from '@/assets/img/amritsar.webp';
import goa from '@/assets/img/goa.webp';
import dharamshala from '@/assets/img/dharamshala.webp';
import ladakh from '@/assets/img/ladakh.webp';

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
  phone: '+919876543210',
  phoneDisplay: '+91 98765 43210',
  whatsapp: '919876543210',
  whatsappDisplay: '+91 98765 43210',
  base: 'Mohali, Punjab',
  hours: '24 / 7',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mohali+Punjab',
  intro:
    'Safe, comfortable and reliable cabs and tours from Mohali — with drivers who know the road and a team that picks up on the first ring.',
};

export const wa = (message = 'Hi Karnail Tour and Travels, I would like to plan a ride.') =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

export const tel = `tel:${business.phone}`;

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Why us', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
];

export const services = [
  {
    id: 'airport',
    title: 'Airport Transfers',
    icon: 'plane',
    copy: 'Flight at 5 AM? We are outside before you are. On-time pickups and drop-offs to Chandigarh airport and beyond.',
  },
  {
    id: 'outstation',
    title: 'Outstation Cabs',
    icon: 'car',
    copy: 'Manali, Shimla, Amritsar or somewhere only you know. Comfortable long drives with experienced hill drivers.',
  },
  {
    id: 'corporate',
    title: 'Corporate Travel',
    icon: 'briefcase',
    copy: 'Monthly billing, verified drivers and cars that show up when the meeting does. Travel that reflects well on you.',
  },
  {
    id: 'wedding',
    title: 'Wedding Transport',
    icon: 'heart',
    copy: 'Decorated cars, coordinated arrivals and a fleet that keeps the whole family moving — without the chaos.',
  },
  {
    id: 'tours',
    title: 'Tour Packages',
    icon: 'map',
    copy: 'Curated itineraries for Himachal, Punjab and beyond. Stays, sightseeing and the road, all sorted.',
  },
  {
    id: 'sightseeing',
    title: 'Local Sightseeing',
    icon: 'camera',
    copy: 'A few hours or a full day around Mohali, Chandigarh and Panchkula — at your pace, with a local at the wheel.',
  },
];

export const fleet = [
  {
    id: 'sedan',
    name: 'Sedan',
    seats: '4 seater',
    bags: '2 bags',
    bestFor: 'City rides, airport runs and short outstation trips.',
    note: 'Swift Dzire or similar',
    art: 'sedan',
  },
  {
    id: 'suv',
    name: 'SUV',
    seats: '6 seater',
    bags: '3 bags',
    bestFor: 'Family trips, hill roads and extra breathing room.',
    note: 'Ertiga or similar',
    art: 'suv',
  },
  {
    id: 'innova',
    name: 'Innova',
    seats: '7 seater',
    bags: '4 bags',
    bestFor: 'Long drives where comfort matters as much as the destination.',
    note: 'Toyota Innova or similar',
    art: 'innova',
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller',
    seats: '12–17 seater',
    bags: '10+ bags',
    bestFor: 'Groups, weddings, pilgrimage runs and multi-day tours.',
    note: 'Force Tempo Traveller',
    art: 'tempo',
  },
];

export const destinations = [
  {
    id: 'manali',
    name: 'Manali',
    image: manali,
    alt: 'Pine-covered Himalayan valley around Manali',
    meta: '300 km · 7–8 hrs',
    blurb: 'Pine air, river stops and the first snow of the season.',
    message: 'Hi, I would like to plan a Manali trip from Mohali. Could you share the cab options and fare?',
  },
  {
    id: 'shimla',
    name: 'Shimla',
    image: shimla,
    alt: 'Colonial rooftops and hills in Shimla',
    meta: '115 km · 3 hrs',
    blurb: 'A quick hill escape for long weekends and spontaneous plans.',
    message: 'Hi, I would like to plan a Shimla trip from Mohali. Could you share the cab options and fare?',
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    image: amritsar,
    alt: 'The Golden Temple in Amritsar reflected in water',
    meta: '220 km · 4 hrs',
    blurb: 'Golden Temple, langar and the Wagah border in one day.',
    message: 'Hi, I would like to plan an Amritsar trip from Mohali. Could you share the cab options and fare?',
  },
  {
    id: 'goa',
    name: 'Goa',
    image: goa,
    alt: 'Palm trees on a Goan beach at golden hour',
    meta: 'Tour package',
    blurb: 'Flights, stays and transfers — planned end to end.',
    message: 'Hi, I would like to plan a Goa tour package. Could you share the itinerary and price?',
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala',
    image: dharamshala,
    alt: 'Mountain town of Dharamshala in the Himalayas',
    meta: '200 km · 4.5 hrs',
    blurb: 'Monasteries, mountain cafés and a slower kind of morning.',
    message: 'Hi, I would like to plan a Dharamshala trip from Mohali. Could you share the cab options and fare?',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    image: ladakh,
    alt: 'A road winding through the Ladakh landscape',
    meta: 'Tour package',
    blurb: 'High passes, thin air and the road trip of a lifetime.',
    message: 'Hi, I would like to plan a Ladakh tour. Could you share the itinerary and price?',
  },
];

export const promises = [
  {
    title: 'Safe and reliable',
    copy: 'Verified drivers, maintained cars and a team that tracks every long trip until you reach.',
    icon: 'shield',
  },
  {
    title: '24/7 support',
    copy: 'Early flight, late train, last-minute plan — someone always answers. Every day of the year.',
    icon: 'clock',
  },
  {
    title: 'Affordable prices',
    copy: 'Clear, upfront fares. No meter games, no surprise add-ons when you reach.',
    icon: 'wallet',
  },
  {
    title: 'Customer satisfaction',
    copy: 'We would rather fix a small thing than lose a good relationship. Ask our regulars.',
    icon: 'smile',
  },
];

export const reviews = [
  {
    quote:
      'Excellent service! The driver was polite and the journey was super comfortable.',
    name: 'Rahul Sharma',
    city: 'Chandigarh',
  },
  {
    quote:
      'Best travel agency in the region. Highly recommended for tours and cabs!',
    name: 'Priya Mehta',
    city: 'Delhi',
  },
  {
    quote:
      'Smooth booking, on-time pickup and a very professional team.',
    name: 'Amanpreet Singh',
    city: 'Mohali',
  },
];

export const steps = [
  {
    number: '01',
    title: 'Say hello',
    copy: 'Tell us where you are going, how many of you, and when. A WhatsApp message is enough.',
  },
  {
    number: '02',
    title: 'We plan the route',
    copy: 'We confirm the cab, the driver and a clear fare — before pickup, not after.',
  },
  {
    number: '03',
    title: 'You travel',
    copy: 'Doorstep pickup, a spotless car and a driver who knows the way. That is the whole thing.',
  },
];
