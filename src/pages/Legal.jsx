import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { site } from '@/config/site';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';

const privacySections = [
  {
    title: '1. Who we are',
    content: `${site.name} is a travel agency based at ${site.contact.address.full}. This policy explains how we collect, use and protect personal information when you enquire about or book a journey with us.`,
  },
  {
    title: '2. Information we collect',
    content:
      'We may collect your name, email address, phone number, postal address, passport details (where required for a booking), travel preferences, dietary or accessibility requirements, and payment confirmation details. We also collect basic usage information such as pages visited and device type when you use this website.',
  },
  {
    title: '3. How we use your information',
    content:
      'Your information is used to respond to enquiries, prepare itineraries and quotations, make bookings with hotels and transport partners, process payments, provide trip support and send relevant travel updates. We do not sell your personal information.',
  },
  {
    title: '4. Sharing with travel partners',
    content:
      'To deliver your trip, we share only the information necessary with airlines, hotels, ground handlers, transport providers, visa agencies and insurance partners. We require our partners to handle it confidentially and use it only for the services requested.',
  },
  {
    title: '5. Payments',
    content:
      'Online payments are processed by secure third-party payment gateways. We do not store full card numbers on our servers. Payment confirmations and invoices are retained for accounting and legal compliance.',
  },
  {
    title: '6. Cookies and analytics',
    content:
      'We use essential cookies to keep the site working and may use privacy-conscious analytics to understand which pages are useful. You can block cookies in your browser settings, though some parts of the site may then not function as intended.',
  },
  {
    title: '7. Data retention',
    content:
      'We retain booking and financial records for the period required by Indian law. Enquiry information that does not become a booking is kept for up to 24 months so we can continue a conversation you started, unless you ask us to delete it sooner.',
  },
  {
    title: '8. Your rights',
    content: `You may request access to, correction of, or deletion of the personal information we hold about you. You may also opt out of marketing communications at any time. Write to ${site.contact.email} and we will respond within a reasonable period.`,
  },
  {
    title: '9. Security',
    content:
      'We use reasonable technical and organisational safeguards to protect your information. No method of transmission over the internet is completely secure, so please share sensitive documents through the secure channels we provide rather than plain email where possible.',
  },
  {
    title: '10. Updates and contact',
    content: `We may update this policy to reflect changes in our services or the law. The revised date will appear at the top of this page. For privacy questions, email ${site.contact.email} or call ${site.contact.phoneDisplay}.`,
  },
];

const termsSections = [
  {
    title: '1. These terms',
    content: `These Terms & Conditions govern your use of this website and any travel services booked through ${site.name}. By making an enquiry or booking, you confirm that you have read and accepted them on behalf of all travellers in your party.`,
  },
  {
    title: '2. Bookings and payments',
    content: `A booking is confirmed only when we receive the ${site.booking.advancePercent}% advance and issue a written confirmation. The balance is due before departure as stated in your invoice. Failure to pay on time may result in cancellation and loss of the advance.`,
  },
  {
    title: '3. Pricing',
    content:
      'Prices are quoted in Indian Rupees and are based on the itinerary, dates, hotel category and number of travellers specified. Flights, taxes, visa fees and peak-season surcharges may change until the booking is fully paid. We will inform you before confirming any increase.',
  },
  {
    title: '4. Cancellations and refunds',
    content: `Free cancellation is available up to ${site.booking.freeCancellationDays} days before departure. After that, cancellation charges apply as set out in your invoice. Refunds are processed within 10–15 working days, less any non-refundable third-party costs.`,
  },
  {
    title: '5. Changes to a booking',
    content: `We will try to accommodate date or itinerary changes, subject to supplier availability and any applicable charges. Changes requested within ${site.booking.freeCancellationDays} days of departure may be treated as a cancellation and rebooking by hotels and airlines.`,
  },
  {
    title: '6. Travel documents',
    content:
      'Travellers are responsible for valid passports, visas, permits, health documents and meeting airline requirements. We provide guidance and visa assistance where included, but approval decisions rest solely with the relevant authorities.',
  },
  {
    title: '7. Health, safety and fitness',
    content:
      'Some journeys involve altitude, long drives or physical activity. You must disclose relevant medical conditions and follow safety instructions from trip leaders and drivers. Our high-altitude itineraries may be adjusted due to weather, road conditions or health concerns.',
  },
  {
    title: '8. Liability and force majeure',
    content:
      'We act as an agent for airlines, hotels and other suppliers and are not liable for delays, cancellations or losses caused by events beyond our reasonable control, including weather, road closures, strikes, pandemics, political unrest or government restrictions. We will always assist in finding a practical alternative.',
  },
  {
    title: '9. Travel insurance',
    content:
      'We strongly recommend comprehensive travel insurance covering medical expenses, cancellation, baggage and adventure activities. Insurance is not included unless expressly stated in your package inclusions.',
  },
  {
    title: '10. Governing law',
    content: `These terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts of ${site.contact.address.city}, ${site.contact.address.state}. For questions, email ${site.contact.email} or call ${site.contact.phoneDisplay}.`,
  },
];

export default function Legal({ type = 'privacy' }) {
  const isPrivacy = type === 'privacy';
  const sections = isPrivacy ? privacySections : termsSections;
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const updated = isPrivacy ? site.legal.privacyUpdated : site.legal.termsUpdated;

  return (
    <>
      <Seo
        title={title}
        description={`${title} for ${site.name}. Last updated ${updated}.`}
        path={isPrivacy ? '/privacy-policy' : '/terms'}
      />
      <PageHero
        eyebrow="The fine print"
        title={title}
        description={`Last updated ${updated}. Written in plain English because clarity matters.`}
        compact
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy-400">On this page</p>
              <nav className="mt-4 space-y-2" aria-label="Legal sections">
                {sections.map((section) => (
                  <a key={section.title} href={`#${section.title.split('.')[0]}`} className="block text-xs leading-relaxed text-navy-500 hover:text-gold-700">
                    {section.title}
                  </a>
                ))}
              </nav>
              <Link to="/" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-teal-700">
                <ArrowLeft size={13} /> Back to home
              </Link>
            </div>
          </aside>

          <div className="max-w-3xl">
            <div className="space-y-9">
              {sections.map((section) => (
                <section key={section.title} id={section.title.split('.')[0]}>
                  <h2 className="font-display text-2xl text-navy">{section.title}</h2>
                  <p className="mt-3 text-sm leading-[1.85] text-navy-500">{section.content}</p>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-cream-200 p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Mail size={16} className="text-gold-700" /> Questions about this policy?
              </p>
              <p className="mt-2 text-sm text-navy-500">Write to {site.contact.email} or call {site.contact.phoneDisplay}.</p>
              <Button to="/contact" size="sm" className="mt-4">Contact us</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
