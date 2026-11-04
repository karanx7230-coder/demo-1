import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import { images } from '@/assets/images';
import { site } from '@/config/site';

const sections = [
  {
    title: '1. What this policy covers',
    paragraphs: [
      `This Privacy Policy explains how ${site.name} collects, uses and protects personal information when you visit this website, send an enquiry or book a trip with us. By using the site, you agree to the practices described here.`,
      'We keep this policy intentionally readable. If anything is unclear, write to us and we will explain it in plain language.',
    ],
  },
  {
    title: '2. Information we collect',
    paragraphs: ['We only collect what we need to plan and deliver your trip:'],
    list: [
      'Contact details such as your name, email address and phone number.',
      'Trip details such as destinations, travel dates, traveller count and preferences.',
      'Booking information such as passport details, dates of birth and visa documents where required.',
      'Payment information processed by our secure payment partners. We do not store full card numbers.',
      'Basic website analytics such as pages viewed, device type and referral source.',
    ],
  },
  {
    title: '3. How we use your information',
    paragraphs: ['Your information is used to:'],
    list: [
      'Respond to enquiries and prepare itineraries and quotations.',
      'Confirm bookings, issue invoices and arrange hotels, transport, permits and visas.',
      'Provide trip support before and during your journey.',
      'Send service messages about your booking.',
      'Send occasional travel inspiration, only where you have opted in.',
      'Meet legal, tax and accounting obligations.',
    ],
  },
  {
    title: '4. Sharing with partners',
    paragraphs: [
      'To deliver your trip, we share only the information necessary with hotels, airlines, transport providers, local ground operators, visa agencies and payment processors. These partners are required to use the information solely for the services they provide.',
      'We do not sell your personal information to anyone, ever.',
    ],
  },
  {
    title: '5. Payments',
    paragraphs: [
      'Online payments are processed through secure, PCI-compliant payment gateways. We receive confirmation of payment and limited transaction details, but not your full card information. Invoices are issued in accordance with applicable GST requirements.',
    ],
  },
  {
    title: '6. Cookies and analytics',
    paragraphs: [
      'This website may use essential cookies to remember preferences and analytics cookies to understand how the site is used. You can block or delete cookies through your browser settings; some parts of the site may then behave differently.',
    ],
  },
  {
    title: '7. Data retention and security',
    paragraphs: [
      'We retain booking records for as long as required by law and for a reasonable period afterwards for accounting and customer-service purposes. Access to personal data is limited to team members and partners who need it.',
      'We use reasonable technical and organisational safeguards, but no method of transmission over the internet is completely secure. Please avoid sending sensitive documents over unsecured channels.',
    ],
  },
  {
    title: '8. Your rights',
    paragraphs: [
      'You may ask us to access, correct or delete the personal information we hold about you, or to stop sending marketing messages. Write to us at the email below and we will respond within a reasonable time, subject to legal record-keeping requirements.',
    ],
  },
  {
    title: '9. Children',
    paragraphs: [
      'Our website is not directed at children. Where a trip includes minors, we collect their details only from a parent or legal guardian for the purpose of the booking.',
    ],
  },
  {
    title: '10. Changes and contact',
    paragraphs: [
      `We may update this policy from time to time. The current version is dated ${site.legal.privacyUpdated}. Questions can be sent to ${site.contact.email} or posted to ${site.contact.address.full}.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Himalayan Trails & Tours collects, uses and protects your personal information."
        image={images.home.intro}
        noIndex={false}
      />

      <PageHero
        image={images.home.intro}
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${site.legal.privacyUpdated}. Plain-language answers about the information we hold and why.`}
        breadcrumbs={[{ label: 'Privacy Policy' }]}
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
                {section.list?.length ? (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-500 sm:text-base">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
