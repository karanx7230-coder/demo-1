import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { footerCompany, footerExplore } from '@/config/navigation';
import { site } from '@/config/site';
import { whatsappUrl } from '@/lib/utils';
import Logo from '@/components/layout/Logo';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.icon] || Instagram;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {footerExplore.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="link-underline transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="link-underline transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Stay in touch</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li>
                <a href={`tel:${site.contact.phone}`} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.contact.emailHref} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>{site.contact.address.full}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>{site.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h3 className="font-display text-2xl text-white">A little travel inspiration, once a month.</h3>
            <p className="mt-2 text-sm text-white/55">
              Honest guides, new itineraries and the occasional early-bird fare. No spam, ever.
            </p>
          </div>
          {subscribed ? (
            <p className="rounded-xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm text-gold-200">
              Thank you — you are on the list. Look out for our next letter.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-400"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved. Established {site.established}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
