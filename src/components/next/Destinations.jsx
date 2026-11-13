import { useLayoutEffect, useRef } from 'react';
import { destinations } from '@/data/next';
import { gsap } from '@/lib/gsap';

const scenes = destinations.slice(0, 5);

export default function Destinations() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const nodes = Array.from(root.querySelectorAll('.dest-scene'));

      nodes.forEach((scene, index) => {
        if (index > 0) gsap.set(scene, { yPercent: 100 });
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * (nodes.length - 1) * 1.05}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(root.querySelector('.dest-first-img'), { scale: 1.14, duration: 1 }, 0);

      nodes.forEach((scene, index) => {
        if (index === 0) return;
        const image = scene.querySelector('.dest-img');
        const word = scene.querySelector('.dest-word');
        const copy = scene.querySelectorAll('.dest-copy');
        const start = index - 1;

        tl.fromTo(
          scene,
          { yPercent: 100 },
          { yPercent: 0, duration: 1, ease: 'power2.inOut' },
          start,
        )
          .fromTo(image, { scale: 1.22, yPercent: -4 }, { scale: 1, yPercent: 0, duration: 1.3, ease: 'power2.out' }, start)
          .fromTo(word, { yPercent: 42, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, start + 0.5)
          .fromTo(copy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, start + 0.6);
      });

      tl.to(root.querySelector('.dest-progress'), { scaleX: 1, duration: nodes.length - 1 }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="destinations"
      ref={ref}
      className="relative overflow-hidden bg-ink text-cream"
      aria-labelledby="destinations-heading"
    >
      <h2 id="destinations-heading" className="sr-only">
        Destinations
      </h2>

      <div className="relative lg:h-[100svh]">
        {scenes.map((place, index) => (
          <article
            key={place.name}
            className="dest-scene relative h-[88svh] w-full overflow-hidden border-b border-cream/10 lg:absolute lg:inset-0 lg:h-full lg:border-b-0"
            aria-label={place.name}
          >
            <img
              src={place.image}
              alt={`${place.name} — ${place.meta}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`dest-img h-full w-full object-cover ${index === 0 ? 'dest-first-img' : ''}`}
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,16,0.7)_0%,rgba(8,16,16,0.12)_38%,rgba(8,16,16,0.92)_100%)]"
              aria-hidden="true"
            />
            <div className="cinema-vignette absolute inset-0 opacity-60" aria-hidden="true" />

            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="container-page flex items-start justify-between gap-6 pt-24 sm:pt-28">
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

              <div className="container-page pb-14 sm:pb-16">
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
            </div>
          </article>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden lg:block" aria-hidden="true">
          <div className="container-page pb-5">
            <span className="block h-[2px] w-full bg-cream/15">
              <span className="dest-progress block h-[2px] origin-left bg-marigold" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
