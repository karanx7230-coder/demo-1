import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone, Plane, ShieldCheck } from 'lucide-react';
import heroImage from '@/assets/img/hero.webp';
import heroMobile from '@/assets/img/hero-mobile.webp';
import { business, tel, wa } from '@/data/business';
import { ActionLink, Seal, SectionLabel, WhatsAppIcon } from './primitives';
import { Tilt } from './spatial';

const facts = [
  { icon: Plane, label: 'Airport transfers' },
  { icon: MapPin, label: 'Outstation cabs' },
  { icon: ShieldCheck, label: 'Tour packages' },
];

export default function Hero() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream"
    >
      {/* photograph — back plane */}
      <motion.div
        className="absolute inset-0 -z-30"
        style={reduceMotion ? undefined : { y: sceneY }}
        aria-hidden="true"
      >
        <div
          className="h-full w-full"
          style={{ transform: 'translate3d(calc(var(--mx) * 10px), calc(var(--my) * 6px), 0) scale(1.06)' }}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={heroMobile} />
            <img
              src={heroImage}
              alt=""
              fetchpriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>
      </motion.div>

      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-ink/80 via-ink/25 to-ink/90" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_16%_68%,rgba(12,20,16,0.9),rgba(12,20,16,0.35)_48%,transparent_74%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 -z-20 h-40 bg-gradient-to-b from-ink/90 to-transparent" aria-hidden="true" />

      {/* mountain ridges — foreground planes that shift with the pointer */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-x-[-4%] bottom-0 h-[44%]"
          style={{ transform: 'translate3d(calc(var(--mx) * -18px), calc(var(--my) * -7px), 0)' }}
        >
          <svg viewBox="0 0 1440 360" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0 246 C 110 198, 176 214, 262 166 S 424 118, 526 178 S 704 226, 812 154 S 986 96, 1092 168 S 1268 214, 1440 138 L1440 360 L0 360 Z"
              fill="#0B241B"
              opacity="0.92"
            />
          </svg>
        </div>
        <div
          className="absolute inset-x-[-6%] -bottom-1 h-[31%]"
          style={{ transform: 'translate3d(calc(var(--mx) * -36px), calc(var(--my) * -12px), 0)' }}
        >
          <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0 232 C 132 190, 214 214, 318 176 S 512 138, 636 200 S 828 244, 964 184 S 1186 150, 1440 214 L1440 300 L0 300 Z"
              fill="#0C1410"
            />
          </svg>
        </div>
      </div>

      <motion.div
        className="container-page relative z-10 flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-14 lg:pb-16"
        style={reduceMotion ? undefined : { y: contentY, opacity: fade }}
      >
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <SectionLabel light>Mohali, Punjab · Open 24/7</SectionLabel>

            <h1 className="mt-5 font-display text-display-hero font-light text-cream">
              Travel safe.
              <br />
              Travel <em className="font-normal italic text-marigold">happy.</em>
            </h1>

            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-lg">
              Cabs, outstation drives and handpicked tours from Mohali — with drivers who know the
              road and a team that picks up on the first ring.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ActionLink href={wa()} variant="gold" icon={WhatsAppIcon} className="w-full sm:w-auto">
                Book on WhatsApp
              </ActionLink>
              <ActionLink href={tel} variant="outlineLight" icon={Phone} className="w-full sm:w-auto">
                Call {business.phoneDisplay}
              </ActionLink>
            </div>

            <p className="mt-4 text-[0.72rem] tracking-wide text-cream/45">
              No forms. No call centres. Just a real person on WhatsApp.
            </p>
          </div>

          <div className="lg:col-span-4">
            <Tilt className="mx-auto w-full max-w-sm rounded-2xl lg:ml-auto lg:mr-0" max={9}>
              <a
                href={wa('Hi, I would like to plan a Manali trip from Mohali. Could you share the cab options and fare?')}
                target="_blank"
                rel="noreferrer"
                className="group relative block rounded-2xl bg-cream p-6 text-ink shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)]"
              >
                <div className="flex items-center justify-between text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-ink/40">
                  <span>Your next ride</span>
                  <span className="rounded-full border border-ink/15 px-2 py-1">One way</span>
                </div>

                <div className="mt-5 flex items-center gap-3 font-display text-[1.6rem] font-medium leading-none">
                  <span>Mohali</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-marigold" aria-hidden="true" />
                  <span>Manali</span>
                </div>
                <p className="mt-2 text-[0.72rem] text-ink/50">Private cab · 7–8 hrs · Doorstep pickup</p>

                <div className="relative my-5 border-t border-dashed border-ink/20">
                  <span className="absolute -left-8 -top-[9px] h-[18px] w-[18px] rounded-full bg-ink" aria-hidden="true" />
                  <span className="absolute -right-8 -top-[9px] h-[18px] w-[18px] rounded-full bg-ink" aria-hidden="true" />
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink/40">Fare</p>
                    <p className="mt-1 font-display text-lg font-medium">On request</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[0.7rem] font-semibold text-cream transition-colors group-hover:bg-pine">
                    Plan this ride
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Tilt>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 border-t border-cream/15 bg-ink/20 backdrop-blur-sm">
        <div className="container-page grid grid-cols-3 divide-x divide-cream/10 py-5">
          {facts.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2.5 px-2 first:justify-start last:justify-end sm:gap-3">
              <Icon className="h-4 w-4 shrink-0 text-marigold" aria-hidden="true" />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-cream/60 sm:text-[0.7rem]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-32 z-10 hidden text-cream/55 md:block lg:right-12">
        <Seal className="w-24 lg:w-28" />
      </div>

      <div className="pointer-events-none absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/40 lg:flex">
        <span className="text-[0.55rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-cream/20">
          <span className="block h-4 w-px animate-float bg-marigold" />
        </span>
      </div>

      <span className="sr-only">
        <Clock aria-hidden="true" /> Open 24 hours, 7 days a week in Mohali, Punjab.
      </span>
    </section>
  );
}
