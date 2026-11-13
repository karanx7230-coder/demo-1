import { useLayoutEffect, useRef } from 'react';
import { CircleCheck } from 'lucide-react';
import { experience } from '@/data/next';
import { gsap } from '@/lib/gsap';

const benefits = [
  'Verified drivers on every long route',
  'One person who knows your whole trip',
  'Clear fares before you leave Mohali',
];

export default function Experience() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const heading = gsap.from(root.querySelectorAll('.exp-line'), {
        yPercent: 112,
        duration: 1.1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.querySelector('.exp-heading'), start: 'top 82%', once: true },
      });

      const captions = gsap.from(root.querySelectorAll('.exp-caption'), {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        scrollTrigger: { trigger: root.querySelector('.exp-grid'), start: 'top 78%', once: true },
      });

      const figures = Array.from(root.querySelectorAll('.exp-item')).map((figure) => {
        const frame = figure.querySelector('.exp-frame');
        const image = figure.querySelector('.exp-img');

        const enter = gsap.fromTo(
          frame,
          { yPercent: 10, opacity: 0, scale: 0.97 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: figure, start: 'top 86%', once: true },
          },
        );

        const parallax = gsap.fromTo(
          image,
          { yPercent: -7, scale: 1.18 },
          {
            yPercent: 7,
            scale: 1.18,
            ease: 'none',
            scrollTrigger: { trigger: figure, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
          },
        );

        return { enter, parallax };
      });

      return () => {
        [heading, captions].forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
        figures.forEach(({ enter, parallax }) => {
          enter.scrollTrigger?.kill();
          enter.kill();
          parallax.scrollTrigger?.kill();
          parallax.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden bg-cream py-28 text-ink sm:py-36 lg:py-44"
      aria-labelledby="experience-heading"
    >
      <p
        className="pointer-events-none absolute right-[-3%] top-16 select-none font-display text-[clamp(7rem,21vw,19rem)] font-light uppercase leading-none tracking-[-0.06em] text-stroke-ink"
        aria-hidden="true"
      >
        Slow
      </p>

      <div className="container-page relative">
        <div className="exp-heading grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2
            id="experience-heading"
            className="font-display text-[clamp(3.2rem,9vw,8.8rem)] font-light uppercase leading-[0.86] tracking-[-0.05em] lg:col-span-8"
          >
            <span className="line-mask">
              <span className="exp-line block">More than</span>
            </span>
            <span className="line-mask">
              <span className="exp-line block">
                just a <em className="font-normal italic normal-case text-pine">ride.</em>
              </span>
            </span>
          </h2>

          <p className="max-w-md font-display text-[clamp(1.35rem,2.2vw,1.9rem)] font-light leading-snug text-ink/75 lg:col-span-4 lg:pb-4">
            The best parts of a trip rarely happen on schedule. We build in the tea stops and the
            photo breaks.
          </p>
        </div>

        <div className="exp-grid mt-20 grid grid-cols-12 gap-5 sm:mt-24 sm:gap-6 lg:gap-8">
          <figure className="exp-item col-span-12 sm:col-span-7 lg:col-span-6">
            <div className="exp-frame overflow-hidden border border-ink/10 bg-ink/5">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={experience.details[0].image}
                  alt={experience.details[0].title}
                  loading="lazy"
                  decoding="async"
                  className="exp-img h-full w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="exp-caption mt-5">
              <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-tight text-ink">
                {experience.details[0].title}
              </p>
              <p className="mt-2 max-w-lg text-base leading-relaxed text-ink/55 sm:text-lg">
                {experience.details[0].copy}
              </p>
            </figcaption>
          </figure>

          <figure className="exp-item col-span-12 sm:col-span-5 lg:col-span-5 lg:col-start-8 lg:mt-28">
            <div className="exp-frame overflow-hidden border border-ink/10 bg-ink/5">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={experience.details[1].image}
                  alt={experience.details[1].title}
                  loading="lazy"
                  decoding="async"
                  className="exp-img h-full w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="exp-caption mt-5">
              <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-tight text-ink">
                {experience.details[1].title}
              </p>
              <p className="mt-2 max-w-lg text-base leading-relaxed text-ink/55 sm:text-lg">
                {experience.details[1].copy}
              </p>
            </figcaption>
          </figure>

          <figure className="exp-item col-span-12 lg:col-span-7">
            <div className="exp-frame overflow-hidden border border-ink/10 bg-ink/5">
              <div className="aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
                <img
                  src={experience.details[2].image}
                  alt={experience.details[2].title}
                  loading="lazy"
                  decoding="async"
                  className="exp-img h-full w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="exp-caption mt-5">
              <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-tight text-ink">
                {experience.details[2].title}
              </p>
              <p className="mt-2 max-w-lg text-base leading-relaxed text-ink/55 sm:text-lg">
                {experience.details[2].copy}
              </p>
            </figcaption>
          </figure>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden border-y border-ink/10 bg-ink/10 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-4 bg-cream px-1 py-8 sm:px-7">
              <CircleCheck className="mt-1 h-6 w-6 shrink-0 text-pine" aria-hidden="true" />
              <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-snug text-ink/85">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
