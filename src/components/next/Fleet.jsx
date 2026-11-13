import { useLayoutEffect, useRef } from 'react';
import { fleet } from '@/data/next';
import { gsap } from '@/lib/gsap';

function Panel({ vehicle }) {
  return (
    <article className="fleet-panel relative flex min-h-[92svh] flex-col justify-end overflow-hidden border-b border-cream/10">
      <div className="absolute inset-0">
        <img
          src={vehicle.environment}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-105 object-cover opacity-35"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,22,0.92),rgba(11,22,22,0.42)_48%,rgba(11,22,22,0.96))]"
          aria-hidden="true"
        />
        <div className={`absolute inset-0 bg-gradient-to-tr ${vehicle.glow}`} aria-hidden="true" />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-8 pt-28 sm:px-8">
        <div className="fleet-vehicle relative w-full max-w-6xl">
          <div
            className="absolute inset-x-[12%] bottom-[4%] h-[14%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.62),transparent_72%)]"
            aria-hidden="true"
          />
          <img
            src={vehicle.image}
            alt={vehicle.name}
            loading="lazy"
            decoding="async"
            className="relative mx-auto w-full max-w-full object-contain sm:h-[54svh] sm:w-auto sm:max-w-full lg:h-[62svh]"
          />
        </div>
      </div>

      <div className="container-page relative z-10 pb-12 sm:pb-14">
        <div className="border-t border-cream/15 pt-6">
          <h3 className="fleet-name font-display text-[clamp(2.8rem,7.5vw,6.5rem)] font-light uppercase leading-[0.84] tracking-[-0.05em] text-cream">
            {vehicle.name}
          </h3>
        </div>
      </div>
    </article>
  );
}

export default function Fleet() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tweens = Array.from(root.querySelectorAll('.fleet-panel')).map((panel) => {
        const vehicle = panel.querySelector('.fleet-vehicle');
        const name = panel.querySelector('.fleet-name');

        const enter = gsap.from(vehicle, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 78%', once: true },
        });

        const label = gsap.from(name, {
          yPercent: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: panel, start: 'top 72%', once: true },
        });

        return { enter, label };
      });

      return () =>
        tweens.forEach(({ enter, label }) => {
          enter.scrollTrigger?.kill();
          enter.kill();
          label.scrollTrigger?.kill();
          label.kill();
        });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="fleet" ref={ref} className="relative bg-ink text-cream" aria-labelledby="fleet-heading">
      <h2 id="fleet-heading" className="sr-only">
        Our fleet
      </h2>

      {fleet.map((vehicle) => (
        <Panel key={vehicle.id} vehicle={vehicle} />
      ))}
    </section>
  );
}
