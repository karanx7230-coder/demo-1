import { ArrowUp, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { business, services, tel, wa } from '@/data/business';
import { navLinks } from '@/data/next';
import { WhatsAppIcon } from '@/components/site/primitives';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink text-cream">
      <div className="container-page relative pt-20 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream p-1.5 ring-1 ring-cream/15">
                <img
                  src="/assets/branding/logo-mark.webp"
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-display text-[1.85rem] font-medium tracking-tight text-cream">
                Karnail
              </span>
            </a>

            <p className="mt-7 max-w-sm font-display text-[clamp(1.35rem,2vw,1.75rem)] font-light leading-snug text-cream/80">
              Safe, comfortable and reliable cabs and tours from Mohali. The road, handled.
            </p>

            <div className="mt-8 flex flex-col gap-3.5">
              <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-lg font-medium text-cream/75 transition-colors hover:text-marigold"
              >
                <WhatsAppIcon className="h-5 w-5 text-marigold" />
                {business.whatsappDisplay}
              </a>
              <a
                href={tel}
                className="inline-flex items-center gap-3 text-lg font-medium text-cream/75 transition-colors hover:text-marigold"
              >
                <Phone className="h-5 w-5 text-marigold" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-lg font-medium text-cream/75 transition-colors hover:text-marigold"
              >
                <MapPin className="h-5 w-5 text-marigold" aria-hidden="true" />
                {business.base}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="font-display text-[1.4rem] font-light text-cream">Menu</h2>
              <ul className="mt-6 space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-base text-cream/65 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" className="text-base text-cream/65 transition-colors hover:text-cream">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-[1.4rem] font-light text-cream">Services</h2>
              <ul className="mt-6 space-y-4">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href={wa(`Hi, I would like to enquire about ${service.title.toLowerCase()}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base text-cream/65 transition-colors hover:text-cream"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-display text-[1.4rem] font-light text-cream">Reach us</h2>
              <ul className="mt-6 space-y-4 text-base text-cream/65">
                <li>{business.base}</li>
                <li>Punjab · Himachal · Beyond</li>
                <li>
                  <a
                    href={wa('Hi, I would like to plan a trip.')}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-medium text-marigold transition-colors hover:text-marigold-soft"
                  >
                    Plan a ride
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 select-none overflow-hidden border-t border-cream/10 pt-8">
          <p
            className="text-outline text-center font-display text-[clamp(4rem,15vw,12rem)] font-light leading-[0.78] tracking-tight"
            aria-hidden="true"
          >
            Karnail
          </p>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-cream/10 py-7 sm:flex-row">
          <p className="text-center text-sm tracking-wide text-cream/50 sm:text-left">
            © 2026 {business.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream/60 transition-colors hover:border-marigold hover:text-marigold"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
