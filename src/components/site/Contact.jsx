import { Clock, MapPin, Phone } from 'lucide-react';
import { business, tel, wa } from '@/data/business';
import { Reveal, SectionLabel, WhatsAppIcon } from './primitives';
import { Tilt } from './spatial';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-[17] -mt-6 overflow-hidden rounded-t-[2rem] bg-ink py-20 text-cream sm:rounded-t-[2.5rem] sm:py-28 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[540px] w-[860px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-pine/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-marigold/[0.06] to-transparent"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel light className="justify-center">
            One message away
          </SectionLabel>
          <h2
            id="contact-heading"
            className="mt-5 font-display text-[clamp(2.6rem,7.4vw,5.4rem)] font-light leading-[0.94] tracking-tight text-cream"
          >
            Tell us where
            <br />
            you&rsquo;re <em className="font-normal italic text-marigold">going.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[0.95rem] leading-relaxed text-cream/60">
            Send the destination, the date and how many of you are travelling. We will reply with the
            cab, the driver and a clear fare.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row" delay={0.1}>
          <Tilt className="flex-1 rounded-2xl" max={5}>
          <a
            href={wa('Hi Karnail Tour and Travels, I would like to book a ride. Here are my details:')}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full w-full items-center justify-between gap-4 rounded-2xl bg-marigold px-6 py-5 text-ink transition-colors duration-300 hover:bg-marigold-soft"
          >
            <span>
              <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink/50">
                Fastest reply
              </span>
              <span className="mt-1 block text-[1.02rem] font-semibold">Chat on WhatsApp</span>
            </span>
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
          </a>
          </Tilt>

          <Tilt className="flex-1 rounded-2xl" max={5}>
          <a
            href={tel}
            className="group flex h-full w-full items-center justify-between gap-4 rounded-2xl border border-cream/20 px-6 py-5 text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-ink"
          >
            <span>
              <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.2em] opacity-50">
                Prefer to talk?
              </span>
              <span className="mt-1 block text-[1.02rem] font-semibold">{business.phoneDisplay}</span>
            </span>
            <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
          </a>
          </Tilt>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-3">
          <div className="bg-ink px-5 py-5 text-center">
            <MapPin className="mx-auto h-4 w-4 text-marigold" aria-hidden="true" />
            <p className="mt-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream/35">
              Based in
            </p>
            <p className="mt-1 text-[0.82rem] font-medium text-cream/85">{business.base}</p>
          </div>
          <div className="bg-ink px-5 py-5 text-center">
            <Clock className="mx-auto h-4 w-4 text-marigold" aria-hidden="true" />
            <p className="mt-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream/35">
              Available
            </p>
            <p className="mt-1 text-[0.82rem] font-medium text-cream/85">Open {business.hours}</p>
          </div>
          <div className="bg-ink px-5 py-5 text-center">
            <WhatsAppIcon className="mx-auto h-4 w-4 text-marigold" />
            <p className="mt-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream/35">
              Serving
            </p>
            <p className="mt-1 text-[0.82rem] font-medium text-cream/85">Punjab · Himachal · Beyond</p>
          </div>
        </div>
      </div>
    </section>
  );
}
