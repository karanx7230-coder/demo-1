import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const route = ['Mohali, Punjab', 'Himachal · Punjab · beyond', 'Yours to set'];

export default function Journey() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const lines = gsap.from(root.querySelectorAll('.journey-line'), {
        yPercent: 112,
        duration: 1.15,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.querySelector('.journey-heading'), start: 'top 82%', once: true },
      });

      const fade = gsap.from(root.querySelectorAll('.journey-fade'), {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        scrollTrigger: { trigger: root.querySelector('.journey-heading'), start: 'top 78%', once: true },
      });

      return () => {
        lines.scrollTrigger?.kill();
        lines.kill();
        fade.scrollTrigger?.kill();
        fade.kill();
      };
    });

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });

      tl.fromTo(root.querySelector('.journey-bg'), { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.02 }, 0)
        .fromTo(root.querySelector('.journey-ghost'), { xPercent: 8 }, { xPercent: -8 }, 0)
        .fromTo(root.querySelector('.journey-frame'), { yPercent: 9 }, { yPercent: -9 }, 0)
        .fromTo(root.querySelector('.journey-vehicle'), { xPercent: 6, yPercent: 4 }, { xPercent: -5, yPercent: -4 }, 0);

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={ref}
      className="relative overflow-hidden bg-pine-deep py-28 text-cream sm:py-36 lg:py-44"
      aria-labelledby="journey-heading"
    >
      <div className="journey-bg absolute inset-0 opacity-30 will-change-transform">
        <img
          src="/assets/destinations/mountains-02.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,28,29,0.96),rgba(13,28,29,0.55)_45%,rgba(13,28,29,0.98))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(233,135,77,0.14),transparent_58%)]"
        aria-hidden="true"
      />

      <p
        className="journey-ghost pointer-events-none absolute right-[-4%] top-[4%] hidden font-display text-[clamp(9rem,27vw,26rem)] font-light uppercase leading-none tracking-[-0.06em] text-stroke-cream-soft md:block"
        aria-hidden="true"
      >
        Story
      </p>

      <div className="container-page relative">
        <div className="journey-heading grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2
            id="journey-heading"
            className="font-display text-[clamp(3.2rem,9.2vw,9rem)] font-light uppercase leading-[0.86] tracking-[-0.05em] lg:col-span-8"
          >
            <span className="line-mask">
              <span className="journey-line block">Every road</span>
            </span>
            <span className="line-mask">
              <span className="journey-line block">
                has a <em className="font-normal italic normal-case text-marigold">story.</em>
              </span>
            </span>
          </h2>

          <p className="journey-fade max-w-md font-display text-[clamp(1.35rem,2.2vw,1.9rem)] font-light leading-snug text-cream/80 lg:col-span-4 lg:pb-4">
            A cab is a cab. A journey is something else. We plan around the way you want to travel.
          </p>
        </div>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <div className="journey-frame relative overflow-hidden border border-cream/15 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.85)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/assets/hero/hero-road.webp"
                  alt="The road out of Mohali climbing into the hills"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full scale-105 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" aria-hidden="true" />
              </div>
            </div>

            <div className="journey-vehicle pointer-events-none absolute -bottom-16 -right-6 z-20 hidden w-[64%] sm:block lg:-right-16 lg:w-[78%]">
              <div
                className="absolute inset-x-[12%] bottom-[6%] h-[16%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_72%)]"
                aria-hidden="true"
              />
              <img
                src="/assets/vehicles/suv-cutout.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="relative w-full"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <div className="journey-fade">
              <p className="font-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-light leading-[1.12] text-cream">
                The best parts of a trip rarely happen on schedule.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/60 sm:text-xl">
                Clean cars, calm drivers and honest fares. Whether it is a 4 AM airport run or a week
                in the mountains, we build the days around you — not around a checklist.
              </p>
            </div>

            <ul className="journey-fade mt-12 border-y border-cream/10">
              {route.map((line) => (
                <li key={line} className="border-b border-cream/10 py-5 last:border-b-0">
                  <span className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-light tracking-[-0.01em] text-cream/85">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
