import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { destinations } from '@/data/business';
import { Reveal, SectionLabel } from './primitives';
import { GhostWord, useDepth } from './Depth';
import { Tilt } from './spatial';

export default function Destinations() {
  const railRef = useRef(null);
  const sectionRef = useRef(null);
  useDepth(sectionRef);

  const scrollBy = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const amount = rail.clientWidth * 0.78;
    rail.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="relative z-[13] -mt-6 overflow-hidden rounded-t-[2rem] bg-cream py-24 sm:rounded-t-[2.5rem] sm:py-32 lg:py-40"
      aria-labelledby="destinations-heading"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionLabel number="04">Where to</SectionLabel>
            <h2 id="destinations-heading" className="mt-6 font-display text-display-xl font-light text-ink">
              Some places are
              <br />
              <em className="font-normal italic text-pine">worth the drive.</em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.1}>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-ink/60">
              The classics, plus a few the regulars keep coming back to. Every route can be a quick
              one-way drop or a full tour with stays — you decide the pace.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                aria-label="Previous destinations"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                aria-label="Next destinations"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-16 sm:mt-20">
        <GhostWord
          tone="ink"
          drift={110}
          className="left-8 top-[-2.5rem] text-[clamp(5rem,15vw,12rem)] sm:left-12 lg:left-14"
        >
          Wander
        </GhostWord>

        <div
          ref={railRef}
          className="no-scrollbar relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 sm:gap-5 sm:px-10 lg:px-14"
          style={{ scrollPaddingLeft: '1.25rem' }}
        >
        {destinations.map((place, index) => (
          <Tilt
            key={place.id}
            className="w-[78vw] shrink-0 snap-start rounded-[1.5rem] bg-ink shadow-[0_40px_90px_-45px_rgba(38,56,59,0.5)] sm:w-[46vw] lg:w-[26rem] xl:w-[27rem]"
            max={7}
          >
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(place.message)}`}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-full overflow-hidden rounded-[1.5rem]"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={place.image}
                alt={place.alt}
                width="720"
                height="900"
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                aria-hidden="true"
              />

              <span className="absolute left-4 top-4 rounded-full border border-cream/25 bg-ink/35 px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-cream/80 backdrop-blur-md">
                {place.meta}
              </span>

              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 bg-ink/25 text-cream backdrop-blur-md transition-colors duration-300 group-hover:border-marigold group-hover:bg-marigold group-hover:text-ink">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex items-center gap-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-marigold">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  From Mohali
                </div>
                <h3 className="mt-2 font-display text-[2.1rem] font-light leading-none text-cream">
                  {place.name}
                </h3>
                <p className="mt-2.5 max-w-[18rem] text-[0.8rem] leading-relaxed text-cream/60">
                  {place.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 border-b border-cream/25 pb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cream/80 transition-colors group-hover:border-marigold group-hover:text-marigold">
                  Plan this trip
                </span>
              </div>
            </div>
          </a>
          </Tilt>
        ))}

        <div className="flex w-[60vw] shrink-0 snap-start items-center justify-center rounded-[1.5rem] border border-dashed border-ink/20 px-6 text-center sm:w-[34vw] lg:w-[20rem]">
          <div>
            <p className="font-display text-xl font-light leading-tight text-ink">
              Somewhere else in mind?
            </p>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-ink/50">
              Tell us the name. We have probably driven it.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20destination%20in%20mind.%20Could%20you%20help%20me%20plan%20the%20trip%3F"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-pine"
            >
              Ask on WhatsApp
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
