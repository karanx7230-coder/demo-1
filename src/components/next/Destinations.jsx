import { useLayoutEffect, useRef } from 'react';
import { destinations } from '@/data/next';
import { gsap } from '@/lib/gsap';

export default function Destinations() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tweens = Array.from(root.querySelectorAll('.dest-scene')).map((scene) => {
        const image = scene.querySelector('.dest-img');
        const word = scene.querySelector('.dest-word');
        const copy = scene.querySelectorAll('.dest-copy');

        const zoom = gsap.from(image, {
          scale: 1.08,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: scene, start: 'top bottom', once: true },
        });

        const title = gsap.from(word, {
          yPercent: 110,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: scene, start: 'top 68%', once: true },
        });

        const text = gsap.from(copy, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: scene, start: 'top 60%', once: true },
        });

        return { zoom, title, text };
      });

      return () =>
        tweens.forEach(({ zoom, title, text }) => {
          [zoom, title, text].forEach((tween) => {
            tween.scrollTrigger?.kill();
            tween.kill();
          });
        });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="destinations"
      ref={ref}
      className="relative bg-ink text-cream"
      aria-labelledby="destinations-heading"
    >
      <h2 id="destinations-heading" className="sr-only">
        Destinations
      </h2>

      {destinations.map((place, index) => (
        <article
          key={place.name}
          className="dest-scene relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-cream/10"
          aria-label={place.name}
        >
          <img
            src={place.image}
            alt={`${place.name} — ${place.meta}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="dest-img absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,16,0.72)_0%,rgba(8,16,16,0.1)_38%,rgba(8,16,16,0.94)_100%)]"
            aria-hidden="true"
          />
          <div className="cinema-vignette absolute inset-0 opacity-55" aria-hidden="true" />

          <div className="container-page relative z-10 flex items-start justify-between gap-6 pt-28">
            <p className="dest-copy font-display text-[clamp(1.25rem,2vw,1.85rem)] font-light text-cream/75">
              {place.meta}
            </p>
            <span
              className="dest-copy font-display text-[clamp(3rem,7vw,6.5rem)] font-light leading-none text-stroke-cream"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="container-page relative z-10 pb-14 sm:pb-16">
            <div className="overflow-hidden">
              <h3 className="dest-word whitespace-nowrap font-display text-[clamp(2.4rem,7.6vw,7.5rem)] font-light uppercase leading-[0.82] tracking-[-0.055em] text-cream">
                {place.name}
              </h3>
            </div>

            <div className="mt-8 border-t border-cream/20 pt-7">
              <p className="dest-copy max-w-2xl text-lg leading-relaxed text-cream/70 sm:text-xl">
                {place.copy}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
