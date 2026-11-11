import { useEffect, useRef } from 'react';
import { steps, wa } from '@/data/business';
import { Reveal, SectionLabel, WhatsAppIcon } from './primitives';
import { prefersReducedMotion } from './spatial';

export default function RouteStory() {
  const ref = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const path = pathRef.current;
    if (!el || !path) return undefined;

    if (prefersReducedMotion()) {
      path.style.strokeDashoffset = '0';
      return undefined;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewport * 0.8 - rect.top) / (rect.height * 0.75)));
      path.style.strokeDashoffset = `${(1 - progress).toFixed(3)}`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      className="relative z-[14] -mt-6 overflow-hidden rounded-t-[2rem] bg-pine py-20 text-cream sm:rounded-t-[2.5rem] sm:py-28 lg:py-32"
      aria-labelledby="route-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(248,246,240,0.9) 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
        aria-hidden="true"
      />

      <div className="container-page relative" ref={ref}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel number="05" light>
              How it works
            </SectionLabel>
            <h2 id="route-heading" className="mt-5 font-display text-display-xl font-light text-cream">
              Three messages.
              <br />
              <em className="font-normal italic text-marigold">One good journey.</em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.1}>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-cream/60">
              No accounts, no forms, no waiting for a callback that never comes. This is the whole
              process — start to finish.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 sm:mt-20">
          <svg
            className="pointer-events-none absolute left-[1.35rem] top-0 hidden h-full w-8 sm:block"
            viewBox="0 0 40 600"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M20 0 C 20 90, 4 120, 20 200 S 36 300, 20 380 S 4 480, 20 600"
              stroke="rgba(248,246,240,0.16)"
              strokeWidth="2"
              strokeDasharray="4 10"
            />
            <path
              ref={pathRef}
              d="M20 0 C 20 90, 4 120, 20 200 S 36 300, 20 380 S 4 480, 20 600"
              stroke="#E9874D"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </svg>

          <ol className="relative grid gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <li key={step.number}>
                <Reveal delay={0.06 * index}>
                  <div className="group relative grid gap-5 rounded-[1.5rem] border border-cream/10 bg-cream/[0.04] p-5 transition-colors duration-500 hover:border-marigold/40 hover:bg-cream/[0.07] sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 sm:p-7 lg:grid-cols-[4rem_1fr_20rem]">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-marigold/50 bg-pine-deep font-display text-sm font-medium text-marigold sm:h-14 sm:w-14">
                      {step.number}
                    </span>

                    <div>
                      <h3 className="font-display text-[1.6rem] font-light leading-tight text-cream sm:text-[2rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-[0.86rem] leading-relaxed text-cream/55">
                        {step.copy}
                      </p>
                    </div>

                    <div className="hidden justify-end lg:flex">
                      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-cream/30">
                        {index === 0 ? 'On WhatsApp' : index === 1 ? 'Confirmed in writing' : 'Pickup at your door'}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[0.82rem] leading-relaxed text-cream/45">
            Fares are confirmed on WhatsApp before pickup. No surprises at the end of the road.
          </p>
          <a
            href={wa('Hi, I would like to plan a ride. Here are my details:')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-marigold px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-marigold-soft"
          >
            <WhatsAppIcon className="h-[1.05rem] w-[1.05rem]" />
            Start on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
