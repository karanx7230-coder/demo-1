import { images } from '@/assets/images';

export const blogPosts = [
  {
    slug: 'best-time-to-visit-spiti-valley',
    title: 'Best Time to Visit Spiti Valley: A Month-by-Month Guide',
    excerpt:
      'Roads, snow, festivals and the real window for Chandratal — here is when Spiti is at its best, and when to wait.',
    category: 'Himachal',
    date: '2026-09-18',
    readTime: 7,
    author: { name: 'Aditya Rana', role: 'Mountain trip designer', initials: 'AR' },
    image: images.blog.spiti,
    tags: ['Spiti', 'Himachal', 'Road trips'],
    featured: true,
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'For most travellers, late June to early September is the best time to visit Spiti. The high passes are open, the days are long, and the landscape is at its most accessible. September is our personal favourite — the crowds thin out, the light softens and the first hint of autumn sits on the poplars.',
          'If your main reason for going is snow and you are comfortable with serious cold, late October and winter can be magical. But winter Spiti is a different trip: fewer services, shorter days and weather-dependent roads.',
        ],
      },
      {
        heading: 'Month by month',
        paragraphs: [
          'May: lower valleys open, but higher passes remain unpredictable. Good for Kinnaur, not yet ideal for a full Spiti circuit.',
          'June: the classic season begins. Atal Tunnel access is reliable and Kaza’s cafés reopen. Expect strong sun and cold nights.',
          'July–August: green valleys, dramatic skies and occasional cloudbursts. Carry buffer days and never plan a tight return flight.',
          'September: stable weather, clear views and the best balance of comfort and quiet. Our top recommendation.',
          'October: cold nights and golden light. Most operators wind down by late October.',
          'November–April: winter expedition territory. Only travel with experienced local support and a flexible plan.',
        ],
      },
      {
        heading: 'Acclimatisation matters more than the month',
        paragraphs: [
          'Kaza sits at around 3,800 metres. Even in perfect weather, a rushed ascent can spoil the trip. We always build in a night at Kalpa or Tabo, keep the first day gentle, and carry oxygen. Anyone with heart or respiratory conditions should speak to their doctor before booking.',
        ],
      },
    ],
    takeaway:
      'Choose late June to early September for a comfortable road trip; choose September for the most beautiful version of it.',
  },
  {
    slug: 'dubai-visa-guide-for-indians',
    title: 'Dubai Visa Guide for Indian Travellers',
    excerpt:
      'Documents, timelines, costs and the small mistakes that delay approval — a practical Dubai visa checklist.',
    category: 'International',
    date: '2026-08-26',
    readTime: 6,
    author: { name: 'Meher Gill', role: 'International travel lead', initials: 'MG' },
    image: images.blog.dubaiVisa,
    tags: ['Dubai', 'Visa', 'International'],
    featured: true,
    sections: [
      {
        heading: 'How the tourist visa works',
        paragraphs: [
          'Indian passport holders need a visa before travelling to the UAE. Most short holidays use a 30-day single-entry tourist visa, though 60-day and multiple-entry options exist. Applications are usually processed through an approved UAE travel partner or airline.',
          'Typical processing takes 3–5 working days, but apply at least three weeks before departure. During school holidays and long weekends, timelines can stretch.',
        ],
      },
      {
        heading: 'Your document checklist',
        paragraphs: ['Keep clear, colour scans ready before you start:'],
        list: [
          'Passport valid for at least six months',
          'Recent passport-size photograph with a white background',
          'Confirmed return flight and hotel booking',
          'Bank statement for the last three months, stamped if possible',
          'PAN card and, if employed, a salary slip or employment letter',
          'Travel insurance covering the UAE',
        ],
      },
      {
        heading: 'Common reasons applications get delayed',
        paragraphs: [
          'Blurry scans, mismatched names across documents and insufficient bank balance are the usual culprits. Make sure the name on your passport matches your tickets exactly. If you have a prior visa rejection, disclose it and provide a short explanation — hiding it rarely helps.',
          'We review every application before submission and coordinate with our UAE partners, but the final decision always rests with the immigration authorities.',
        ],
      },
    ],
    takeaway:
      'Apply three weeks ahead, match every document to your passport, and keep a printed copy of your visa and insurance when you fly.',
  },
  {
    slug: 'manali-in-winter',
    title: 'Manali in Winter: What to Expect (and What to Pack)',
    excerpt:
      'Snow is beautiful, but winter Manali needs a smarter plan. Here is how to enjoy it without the shivers.',
    category: 'Himachal',
    date: '2026-08-04',
    readTime: 5,
    author: { name: 'Aditya Rana', role: 'Mountain trip designer', initials: 'AR' },
    image: images.blog.manaliWinter,
    tags: ['Manali', 'Winter', 'Packing'],
    featured: false,
    sections: [
      {
        heading: 'The reality of a winter visit',
        paragraphs: [
          'Between December and February, daytime temperatures in Manali can sit near freezing and drop well below zero at night. Snowfall is never guaranteed on a specific date, but the higher reaches around Solang and Atal Tunnel usually hold it through the season.',
          'The upside is extraordinary: quiet cafés, misty deodar forests and the satisfying crunch of fresh snow. The downside is that roads, activities and even hot water can be affected. Build flexibility into your dates.',
        ],
      },
      {
        heading: 'What to pack',
        paragraphs: ['Think layers rather than one heavy jacket:'],
        list: [
          'Thermal base layers (two sets)',
          'Fleece or down mid-layer',
          'Waterproof outer shell and gloves',
          'Warm socks, beanie and a scarf',
          'Waterproof shoes with grip',
          'Lip balm, moisturiser and sunscreen',
          'Power bank and a thermos',
        ],
      },
      {
        heading: 'Plan around the weather, not against it',
        paragraphs: [
          'Keep the first and last days flexible, especially if you are flying out of Chandigarh or Delhi. Atal Tunnel can close temporarily after heavy snow. A good local driver and a plan B — a spa afternoon, a bookshop, a long lunch — are part of the experience, not a failure of it.',
        ],
      },
    ],
    takeaway:
      'Winter Manali rewards travellers who pack properly and leave room for the weather to change the plan.',
  },
  {
    slug: 'budget-tips-for-thailand',
    title: 'Thailand on a Budget: Where Your Rupees Go Furthest',
    excerpt:
      'Flights, islands, food and the easy savings that let you travel Thailand for less than you think.',
    category: 'International',
    date: '2026-07-14',
    readTime: 6,
    author: { name: 'Meher Gill', role: 'International travel lead', initials: 'MG' },
    image: images.blog.thailandBudget,
    tags: ['Thailand', 'Budget', 'International'],
    featured: false,
    sections: [
      {
        heading: 'Start with the flight, not the hotel',
        paragraphs: [
          'Flights are usually the largest single cost. Booking 6–8 weeks ahead, flying mid-week and considering a short layover can save more than downgrading a hotel. Bangkok and Phuket have plenty of good mid-range stays, so do not sacrifice flight timing to save a few hundred rupees a night.',
        ],
      },
      {
        heading: 'Where to spend and where to save',
        paragraphs: ['A little planning goes a long way:'],
        list: [
          'Eat where the locals eat: street food and neighbourhood restaurants are excellent value.',
          'Use the BTS Skytrain and MRT in Bangkok instead of taxis.',
          'Book island day trips locally or through a trusted agent, not at the airport.',
          'Carry a no-fee international card and withdraw larger amounts less often.',
          'Choose one premium experience — a nice dinner or spa — rather than several.',
        ],
      },
      {
        heading: 'A realistic budget',
        paragraphs: [
          'A comfortable 6-day trip from India, including flights, 4-star stays and a few tours, typically lands between ₹40,000 and ₹55,000 per person depending on season. Backpacker-style travel can be done for much less; luxury resorts can push it far higher.',
          'The best savings come from travelling in shoulder months — late April and September — when the weather is still good and hotel rates soften.',
        ],
      },
    ],
    takeaway:
      'Book flights early, live on street food and public transport, and spend your money on one or two experiences you will remember.',
  },
  {
    slug: 'ladakh-packing-checklist',
    title: 'The Ladakh Packing Checklist We Actually Use',
    excerpt:
      'A field-tested list for high-altitude weather, long rides and the things first-timers always forget.',
    category: 'Ladakh',
    date: '2026-06-22',
    readTime: 5,
    author: { name: 'Kabir Singh', role: 'Expedition road captain', initials: 'KS' },
    image: images.blog.ladakhPacking,
    tags: ['Ladakh', 'Packing', 'Adventure'],
    featured: false,
    sections: [
      {
        heading: 'Layer for four seasons in one day',
        paragraphs: [
          'Ladakh can be 25°C at noon and close to freezing after sunset. A moisture-wicking base layer, fleece and a windproof shell will serve you better than a single bulky jacket. Bring a warm hat and gloves even in July — you will use them at Pangong.',
        ],
      },
      {
        heading: 'The essentials',
        paragraphs: ['Our non-negotiable list for a seven-to-nine-day trip:'],
        list: [
          'Government ID, permits, insurance and emergency contacts',
          'Sunscreen SPF 50+, sunglasses with UV protection and lip balm',
          'Refillable water bottle and oral rehydration salts',
          'Personal medication, plus paracetamol and a basic first-aid kit',
          'Power bank, extra camera batteries and a universal charger',
          'Quick-dry towels and a small daypack',
          'Cash, because ATMs can be unreliable outside Leh',
        ],
      },
      {
        heading: 'What not to bring',
        paragraphs: [
          'Leave the hard suitcase, the drone (unless you have checked local rules) and the heavy laptop behind. Space matters in a shared vehicle, and you will appreciate a soft duffel on mountain roads. Also resist the urge to over-schedule — altitude is the one thing you cannot rush.',
        ],
      },
    ],
    takeaway:
      'Pack light, layer smart and carry your medication in your daypack — not in the luggage that disappears into the hotel.',
  },
  {
    slug: 'top-weekend-getaways-from-chandigarh',
    title: 'Top 5 Weekend Getaways from Chandigarh',
    excerpt:
      'From a monastery morning in McLeodganj to a houseboat-free Kerala alternative — five escapes that fit a long weekend.',
    category: 'Weekend',
    date: '2026-05-09',
    readTime: 6,
    author: { name: 'Ishita Verma', role: 'Content editor', initials: 'IV' },
    image: images.blog.weekendGetaways,
    tags: ['Chandigarh', 'Weekend', 'Punjab'],
    featured: true,
    sections: [
      {
        heading: '1. Dharamshala & McLeodganj',
        paragraphs: [
          'Three hours of driving and you are in another world. Visit the Tsuglagkhang complex, walk to Bhagsu waterfall and spend the evening in a café looking at the Dhauladhar range. Two nights is enough; three is better.',
        ],
      },
      {
        heading: '2. Manali via Atal Tunnel',
        paragraphs: [
          'The classic. Leave after work on Friday, wake up in the mountains and spend Saturday between Solang and Sissu. A Volvo makes it easy; a private car gives you more freedom. Avoid a Sunday-night return if you can — Monday traffic is real.',
        ],
      },
      {
        heading: '3. Kasol & Manikaran',
        paragraphs: [
          'A riverside weekend with a hot-spring stop at Manikaran and an easy walk to Chalal. It is not the quietest corner of Himachal anymore, but midweek it still feels like a secret.',
        ],
      },
      {
        heading: '4. Amritsar',
        paragraphs: [
          'The Golden Temple at dawn is worth the early start. Add Jallianwala Bagh, the Partition Museum and the Wagah ceremony, then eat your way through the old city. A deeply satisfying two-night trip from Chandigarh.',
        ],
      },
      {
        heading: '5. Rishikesh',
        paragraphs: [
          'A five-hour drive gets you to rafting, riverside camps and the evening Ganga aarti. It is the best pick for a group of friends who want a little adventure with their weekend.',
        ],
      },
    ],
    takeaway:
      'Book one thing properly — a good stay or a carefully timed transfer — and leave the rest of the weekend loose.',
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export default blogPosts;
