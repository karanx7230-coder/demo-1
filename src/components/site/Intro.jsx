import { ArrowRight } from 'lucide-react';
import peaks from '@/assets/img/peaks.webp';
import { Reveal, Seal, SectionLabel } from './primitives';
import { Tilt } from './spatial';

const stats = [
  { value: '24/7', label: 'On call, always' },
  { value: '04', label: 'Cab classes' },
  { value: '06', label: 'Ways to travel' },
  { value: '01', label: 'Person who knows your trip' },
];

export default function Intro() {
  return (
    <section className="relative bg-cream py-20 sm:py-28 lg:py-32" aria-labelledby="intro-heading">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <SectionLabel number="01">The idea</SectionLabel>
            <h2 id="intro-heading" className="mt-5 font-display text-display-xl font-light text-ink">
              A cab is a cab.
              <br />
              <em className="font-normal italic text-pine">A journey</em> is something else.
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pt-12" delay={0.1}>
            <p className="text-[0.98rem] leading-relaxed text-ink/65 sm:text-base">
              Karnail Tour and Travels is a family-run travel service in Mohali. We started with one
              simple belief: the ride should feel as good as the destination. Clean cars, calm
              drivers, honest fares — and a real person on the other end of the phone.
            </p>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-ink/65 sm:text-base">
              Whether it is a 4 AM airport run or a week in the mountains, we plan around you. No
              call centres. No hidden charges. Just the road, handled.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Seal className="w-16 shrink-0 text-pine" id="intro-seal" />
              <p className="text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-ink/45">
                Family-run in Mohali
                <br />
                <span className="text-ink/30">One point of contact, start to finish.</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/15 pt-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={0.05 * index}>
              <p className="font-display text-[2.6rem] font-light leading-none tracking-tight text-ink sm:text-[3.2rem]">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink/45 sm:text-[0.68rem]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="relative">
            <Tilt className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]" max={4}>
              <img
                src={peaks}
                alt="Snow-capped Himalayan peaks at first light"
                width="1400"
                height="900"
                loading="lazy"
                decoding="async"
                className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-cream sm:flex-row sm:items-end sm:justify-between sm:p-9">
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-marigold">
                    The road out of Mohali · 5:40 AM
                  </p>
                  <p className="mt-2 max-w-lg font-display text-2xl font-light leading-tight sm:text-3xl">
                    Wherever you are headed, someone here has already driven it.
                  </p>
                </div>
                <p className="shrink-0 text-[0.62rem] uppercase tracking-[0.18em] text-cream/55">
                  Himachal · Punjab · Beyond
                </p>
              </div>
            </Tilt>

            <div className="absolute -bottom-6 right-4 hidden -rotate-2 rounded-2xl border border-ink/10 bg-cream-light px-5 py-4 shadow-lift sm:block">
              <p className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-ink/40">
                First pickup · Mohali
              </p>
              <p className="mt-2 flex items-center gap-2 font-display text-lg font-medium text-ink">
                05:40
                <ArrowRight className="h-3.5 w-3.5 text-marigold" aria-hidden="true" />
                Manali
              </p>
              <p className="mt-1 text-[0.62rem] text-ink/45">300 km · tea stop included</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
