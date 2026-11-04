import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { images } from '@/assets/images';
import { site } from '@/config/site';
import { destinations } from '@/data/destinations';
import { whatsappUrl } from '@/lib/utils';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travellers: '2',
  dates: '',
  budget: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.address.full)}&output=embed`;

  return (
    <>
      <Seo
        title="Contact Us"
        description="Plan your next trip with Himalayan Trails & Tours in Mohali, Punjab. Call, WhatsApp or send us a message — we reply within 24 hours."
        image={images.home.intro}
      />

      <PageHero
        image={images.home.intro}
        eyebrow="Contact us"
        title="Tell us about the trip you have in mind"
        description="Share a few details and a real coordinator will reply within 24 hours with ideas, honest advice and a clear price."
        breadcrumbs={[{ label: 'Contact' }]}
        size="lg"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold-300" aria-hidden="true" />
            {site.contact.hoursShort}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
            {site.contact.address.city}, {site.contact.address.state}
          </span>
          <span>Replies within 24 hours</span>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${site.contact.phone}`}
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-navy-400">Call us</p>
                <p className="mt-1 font-semibold text-navy transition-colors group-hover:text-gold-700">
                  {site.contact.phoneDisplay}
                </p>
                <p className="mt-1 text-xs text-navy-400">{site.contact.hoursShort}</p>
              </a>

              <a
                href={site.contact.emailHref}
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-navy-400">Email</p>
                <p className="mt-1 break-all font-semibold text-navy transition-colors group-hover:text-gold-700">
                  {site.contact.email}
                </p>
                <p className="mt-1 text-xs text-navy-400">We reply within a day</p>
              </a>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-navy-400">WhatsApp</p>
                <p className="mt-1 font-semibold text-navy transition-colors group-hover:text-teal-700">
                  {site.contact.whatsappDisplay}
                </p>
                <p className="mt-1 text-xs text-navy-400">Fastest way to reach us</p>
              </a>

              <a
                href={site.contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-navy-400">Visit the studio</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-navy transition-colors group-hover:text-gold-700">
                  {site.contact.address.line1}
                </p>
                <p className="mt-1 text-xs text-navy-400">
                  {site.contact.address.city}, {site.contact.address.state} {site.contact.address.postalCode}
                </p>
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft">
              <iframe
                title="Himalayan Trails & Tours office location"
                src={mapSrc}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-navy-500">{site.contact.address.full}</p>
                <Button href={site.contact.mapUrl} target="_blank" rel="noreferrer" variant="outline" size="sm">
                  Open in Maps
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-card sm:p-8">
            {submitted ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-3xl text-navy">Message received</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy-500">
                  Thank you, {form.name.split(' ')[0] || 'traveller'}. Your request is with our team
                  and we will reply within 24 hours. If it is urgent, WhatsApp is the fastest way to
                  reach us.
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Button href={whatsappUrl()} target="_blank" rel="noreferrer" variant="primary" icon={MessageCircle} iconPosition="left">
                    WhatsApp us
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitted(false);
                    }}
                  >
                    Send another
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <span className="eyebrow">Enquiry form</span>
                <h2 className="mt-3 font-display text-2xl font-medium text-navy">
                  A few details and we&apos;ll take it from here.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">
                  No obligation and no automated sales sequence — just a thoughtful reply from a
                  person who knows the places.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                        Full name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={update('name')}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                        Phone *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="+91"
                        className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-destination" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                        Destination
                      </label>
                      <select
                        id="contact-destination"
                        value={form.destination}
                        onChange={update('destination')}
                        className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
                      >
                        <option value="">Not sure yet</option>
                        {destinations.map((destination) => (
                          <option key={destination.slug} value={destination.name}>
                            {destination.name}
                          </option>
                        ))}
                        <option value="Somewhere else">Somewhere else</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-travellers" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                        Travellers
                      </label>
                      <select
                        id="contact-travellers"
                        value={form.travellers}
                        onChange={update('travellers')}
                        className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
                      >
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-dates" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                        Approximate dates
                      </label>
                      <input
                        id="contact-dates"
                        type="text"
                        value={form.dates}
                        onChange={update('dates')}
                        placeholder="e.g. May 2027, 6 days"
                        className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-budget" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                        Budget per person
                      </label>
                      <select
                        id="contact-budget"
                        value={form.budget}
                        onChange={update('budget')}
                        className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
                      >
                        <option value="">Flexible</option>
                        <option value="Under ₹15,000">Under ₹15,000</option>
                        <option value="₹15,000–₹30,000">₹15,000–₹30,000</option>
                        <option value="₹30,000–₹60,000">₹30,000–₹60,000</option>
                        <option value="₹60,000–₹1,00,000">₹60,000–₹1,00,000</option>
                        <option value="₹1,00,000+">₹1,00,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                      Tell us about the trip
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Who is travelling, what you love, anything you want to avoid…"
                      className="w-full resize-none rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" icon={Send}>
                    Send my enquiry
                  </Button>
                  <p className="text-center text-[0.65rem] uppercase tracking-[0.14em] text-navy-300">
                    We never share your details. No spam.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-navy-950 px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-2xl text-white sm:text-3xl">Prefer a quick conversation?</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">
                Call us during office hours or send a WhatsApp message — we are usually quick to reply.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button href={`tel:${site.contact.phone}`} variant="gold" size="md" icon={Phone} iconPosition="left">
                {site.contact.phoneDisplay}
              </Button>
              <Button href={whatsappUrl()} target="_blank" rel="noreferrer" variant="light" size="md" icon={ArrowRight}>
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
