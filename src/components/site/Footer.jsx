import { ArrowUp, Phone } from 'lucide-react';
import { business, navLinks, services, tel, wa } from '@/data/business';
import { WhatsAppIcon } from './primitives';
import { BrandMark } from './spatial';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink text-cream">
      <div className="container-page pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <a href="#top" className="flex items-center gap-3">
              <BrandMark className="h-12 w-12 rounded-full ring-1 ring-cream/15" />
              <span className="leading-none">
                <span className="block font-display text-[1.5rem] font-medium tracking-tight text-cream">
                  Karnail
                </span>
                <span className="mt-1 block text-[0.55rem] font-semibold uppercase tracking-[0.26em] text-cream/45">
                  Tour &amp; Travels
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-xs text-[0.88rem] leading-relaxed text-cream/50">
              Safe, comfortable and reliable cabs and tours from Mohali. Travel safe. Travel happy.
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-[0.85rem] font-medium text-cream/75 transition-colors hover:text-marigold"
              >
                <WhatsAppIcon className="h-4 w-4 text-marigold" />
                {business.whatsappDisplay}
              </a>
              <a
                href={tel}
                className="inline-flex items-center gap-2.5 text-[0.85rem] font-medium text-cream/75 transition-colors hover:text-marigold"
              >
                <Phone className="h-4 w-4 text-marigold" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cream/35">
                Explore
              </h2>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[0.85rem] text-cream/65 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" className="text-[0.85rem] text-cream/65 transition-colors hover:text-cream">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cream/35">
                Services
              </h2>
              <ul className="mt-4 space-y-2.5">
                {services.map((service) => (
                  <li key={service.id}>
                    <a
                      href={wa(`Hi, I would like to enquire about ${service.title.toLowerCase()}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.85rem] text-cream/65 transition-colors hover:text-cream"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-cream/35">
                Reach us
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.85rem] text-cream/65">
                <li>{business.base}</li>
                <li>Open {business.hours}</li>
                <li>
                  <a
                    href={wa('Hi, I would like to plan a trip.')}
                    target="_blank"
                    rel="noreferrer"
                    className="text-marigold transition-colors hover:text-marigold-soft"
                  >
                    Plan a ride →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 select-none overflow-hidden border-t border-cream/10 pt-8">
          <p className="text-center font-display text-[clamp(3.4rem,13vw,10rem)] font-light leading-[0.8] tracking-tight text-cream/[0.07]">
            Karnail
          </p>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-cream/10 py-6 sm:flex-row">
          <p className="text-center text-[0.68rem] tracking-wide text-cream/35 sm:text-left">
            © 2026 {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="hidden text-[0.62rem] uppercase tracking-[0.16em] text-cream/25 sm:block">
              Travel Safe · Travel Happy
            </p>
            <a
              href="#top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-colors hover:border-marigold hover:text-marigold"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
