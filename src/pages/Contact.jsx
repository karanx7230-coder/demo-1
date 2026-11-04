import { useSearchParams } from 'react-router-dom';
import { Clock3, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { images } from '@/assets/images';
import { site } from '@/config/site';
import { whatsappUrl } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import PageHero from '@/components/layout/PageHero';
import EnquiryForm from '@/components/forms/EnquiryForm';
import SmartImage from '@/components/ui/SmartImage';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function Contact() {
  const [params] = useSearchParams();
  const packageSlug = params.get('package');
  const destination = params.get('destination');
  const defaultTrip = packageSlug
    ? packageSlug.replaceAll('-', ' ')
    : destination
      ? `${destination.replaceAll('-', ' ')} trip`
      : '';

  return (
    <>
      <SEO
        title="Contact & Book Now"
        description="Talk to a Himalayan Trails trip designer in Mohali. Call, WhatsApp or send an enquiry — we reply within one working day."
        image={images.about.office}
        path="/contact"
      />
      <PageHero
        eyebrow="Let’s plan something"
        title="Every good trip starts with a conversation."
        description="Tell us the rough idea. We’ll ask the right questions and come back with a plan that feels like you — usually within a working day."
        image={images.about.story}
        compact
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-card sm:p-8">
              <p className="eyebrow">Enquiry form</p>
              <h2 className="mt-2 font-display text-display-md font-medium text-navy">Tell us where you’re dreaming of.</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-500">
                No pressure, no obligation. A few details help us send a plan that is actually useful.
              </p>
              <EnquiryForm defaultTrip={defaultTrip} className="mt-7" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="rounded-2xl bg-navy p-6 text-white">
                <p className="eyebrow eyebrow-light">The office</p>
                <h2 className="mt-2 font-display text-2xl">Come say hello in Mohali.</h2>
                <ul className="mt-5 space-y-4 text-sm text-white/65">
                  <li className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-gold-300" /> {site.contact.address.full}</li>
                  <li>
                    <a href={`tel:${site.contact.phone}`} className="flex gap-3 transition hover:text-white">
                      <Phone size={17} className="shrink-0 text-gold-300" /> {site.contact.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={site.contact.emailHref} className="flex gap-3 transition hover:text-white">
                      <Mail size={17} className="shrink-0 text-gold-300" /> {site.contact.email}
                    </a>
                  </li>
                  <li className="flex gap-3"><Clock3 size={17} className="shrink-0 text-gold-300" /> {site.contact.hours}</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button href={whatsappUrl()} target="_blank" rel="noreferrer" size="sm" className="bg-[#25D366] text-white shadow-none hover:bg-[#20bd5a]">
                    <MessageCircle size={15} /> WhatsApp us
                  </Button>
                  <Button href={site.contact.mapUrl} target="_blank" rel="noreferrer" variant="light" size="sm">
                    Get directions
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft">
                <div className="relative">
                  <SmartImage src={images.ui.map} alt="Stylised map placeholder for the Mohali office" className="aspect-[16/9] w-full" />
                  <div className="absolute inset-0 bg-navy-950/45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-gold text-navy shadow-gold">
                      <MapPin size={24} />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-5 pt-14">
                    <p className="text-xs font-semibold text-white">SCO 24, Phase 7, Industrial Area</p>
                    <p className="text-[0.65rem] text-white/55">Mohali, Punjab 160055 · map placeholder</p>
                  </div>
                </div>
                <a
                  href={site.contact.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-5 py-4 text-xs font-semibold text-navy transition hover:bg-cream-50"
                >
                  Open in Google Maps <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-navy/5 bg-white p-4 shadow-soft">
                  <ShieldCheck size={18} className="text-teal-600" />
                  <p className="mt-2 text-xs font-semibold text-navy">Secure payments</p>
                  <p className="mt-1 text-[0.65rem] leading-relaxed text-navy-400">UPI, cards and net banking. GST invoice provided.</p>
                </div>
                <div className="rounded-xl border border-navy/5 bg-white p-4 shadow-soft">
                  <Clock3 size={18} className="text-teal-600" />
                  <p className="mt-2 text-xs font-semibold text-navy">Quick replies</p>
                  <p className="mt-1 text-[0.65rem] leading-relaxed text-navy-400">Within one working day, often much sooner.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-200/60 py-14">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {[
            { title: 'Pay 20% to confirm', text: 'A 20% advance blocks your seats. The balance is due 15 days before departure.' },
            { title: 'Free cancellation', text: 'Cancel 15 or more days before departure and receive a full refund of the booking amount, less third-party costs.' },
            { title: 'A human on call', text: 'Your trip coordinator stays reachable on WhatsApp throughout your journey, including weekends.' },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
