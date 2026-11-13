import { useRef } from 'react';
import { Clock, ShieldCheck, Smile, Wallet } from 'lucide-react';
import { promises } from '@/data/business';
import { Reveal, SectionLabel } from './primitives';
import { GhostWord, useDepth } from './Depth';
import { Tilt } from './spatial';

const icons = { shield: ShieldCheck, clock: Clock, wallet: Wallet, smile: Smile };

export default function Promise() {
  const ref = useRef(null);
  useDepth(ref);

  return (
    <section
      ref={ref}
      id="why"
      className="relative z-[15] -mt-6 rounded-t-[2rem] border-y border-ink/10 bg-cream-light py-24 sm:rounded-t-[2.5rem] sm:py-32 lg:py-40"
      aria-labelledby="promise-heading"
    >
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel number="06">The promise</SectionLabel>
              <h2 id="promise-heading" className="mt-6 font-display text-display-xl font-light text-ink">
                The boring things,
                <br />
                <em className="font-normal italic text-pine">done properly.</em>
              </h2>
              <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink/60">
                Safety, punctuality and a clean car are not extras. They are the minimum. Everything
                else is why people call us again.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 rounded-2xl border border-ink/10 bg-cream p-7">
                <p className="font-display text-lg font-light italic leading-relaxed text-ink/75">
                  “We would rather fix a small thing than lose a good relationship.”
                </p>
                <p className="mt-4 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/40">
                  The Karnail way
                </p>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <GhostWord
              tone="ink"
              drift={90}
              className="right-0 top-[-4.5rem] text-[clamp(4rem,12vw,9rem)]"
            >
              Promise
            </GhostWord>
            <div className="relative z-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
              {promises.map((item, index) => {
                const Icon = icons[item.icon] || ShieldCheck;
                return (
                  <Reveal key={item.title} delay={0.05 * index}>
                    <Tilt className="h-full rounded-2xl" max={5}>
                      <div className="group h-full rounded-2xl border border-ink/10 bg-cream p-7 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-pine/30 hover:shadow-lift">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine/10 text-pine transition-colors duration-500 group-hover:bg-pine group-hover:text-marigold">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h3 className="mt-7 font-display text-[1.35rem] font-medium leading-tight text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-[0.83rem] leading-relaxed text-ink/55">{item.copy}</p>
                      </div>
                    </Tilt>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
