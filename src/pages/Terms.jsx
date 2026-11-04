import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import { images } from '@/assets/images';
import { site } from '@/config/site';

const sections = [
  {
    title: '1. Booking and confirmation',
    paragraphs: [
      `A booking is confirmed only when we receive the advance payment and issue a written confirmation. The standard advance is ${site.booking.advancePercent}% of the total trip cost; the balance is due ${site.booking.freeCancellationDays} days before departure unless your invoice states otherwise.`,
      'Prices are quoted per person on a twin-sharing basis unless stated otherwise. They include the services listed in the itinerary and exclude anything listed as not included.',
    ],
  },
  {
    title: '2. Payments',
    paragraphs: [
      'We accept UPI, credit and debit cards, net banking and bank transfers. All prices are in Indian Rupees unless another currency is shown on your invoice. Payments are processed by secure third-party gateways.',
      'For international trips, certain components may be payable in a foreign currency. Exchange-rate fluctuations between quotation and final payment may affect the amount due; we will always explain this before you pay.',
    ],
  },
  {
    title: '3. Cancellation and refunds',
    paragraphs: [
      `Cancellations made ${site.booking.freeCancellationDays} or more days before departure are eligible for a refund of the booking amount, less third-party costs already paid and any non-refundable supplier charges.`,
      'Within the cancellation window, charges apply as set out in your package terms. Airline tickets, visas, permits, event tickets and hotel deposits may be non-refundable. We will always try to offer a date change before processing a cancellation.',
      'Refunds are processed to the original payment method within 7–14 working days of approval, subject to supplier timelines.',
    ],
  },
  {
    title: '4. Changes to your trip',
    paragraphs: [
      'We will try to accommodate changes where possible. Changes are subject to availability and any difference in cost charged by suppliers. A date change within the cancellation window may be treated as a cancellation and rebooking.',
    ],
  },
  {
    title: '5. Itinerary changes and force majeure',
    paragraphs: [
      'Mountain roads, weather, political conditions, landslides, flight delays and other events beyond our control can require changes to the route, accommodation or schedule. We will make reasonable alternative arrangements of a similar standard.',
      'We are not liable for additional costs arising from force majeure events, but we will help you manage them and advocate with suppliers on your behalf.',
    ],
  },
  {
    title: '6. Travel documents and eligibility',
    paragraphs: [
      'You are responsible for holding valid identification, passports, visas, permits and health documents required for your trip. Visa approval is at the sole discretion of the relevant authority; we provide assistance but cannot guarantee an outcome.',
      'Please check the name on your passport matches your tickets exactly. We are not responsible for boarding denial or entry refusal caused by incorrect documents.',
    ],
  },
  {
    title: '7. Health, safety and conduct',
    paragraphs: [
      'Some trips involve high altitude, trekking, riding or adventure activities. You should be medically fit and disclose any condition that may affect your participation. Our team may advise against or restrict participation where safety requires it.',
      'Travellers are expected to respect local laws, cultures and fellow travellers. We may decline or terminate participation in case of behaviour that endangers others, without refund.',
    ],
  },
  {
    title: '8. Insurance',
    paragraphs: [
      'Travel insurance is strongly recommended for all trips and is mandatory for certain adventure and international itineraries. Unless expressly included in your package, insurance is not part of the price.',
    ],
  },
  {
    title: '9. Liability',
    paragraphs: [
      'We act as an organiser and coordinator of travel services. While we choose partners carefully, we are not liable for acts or omissions of independent suppliers such as airlines, hotels and transport operators, except where required by law.',
      'Our liability for any claim is limited to the value of the services booked through us, to the extent permitted by applicable law.',
    ],
  },
  {
    title: '10. Governing law and contact',
    paragraphs: [
      `These terms are governed by the laws of India, with jurisdiction in the courts of Mohali, Punjab. The current version is dated ${site.legal.termsUpdated}. Questions can be sent to ${site.contact.email}.`,
    ],
  },
];

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description="Booking, payment, cancellation and travel terms for Himalayan Trails & Tours."
        image={images.home.intro}
      />

      <PageHero
        image={images.home.intro}
        eyebrow="Legal"
        title="Terms & Conditions"
        description={`Last updated ${site.legal.termsUpdated}. The practical terms behind every booking.`}
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <section className="py-12 sm:py-16">
        <div className="container-narrow">
          <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft sm:p-10">
            {sections.map((section) => (
              <section key={section.title} className="mb-8 last:mb-0">
                <h2 className="font-display text-xl font-medium text-navy sm:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
