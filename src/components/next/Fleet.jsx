import { useLayoutEffect, useRef } from 'react';
import { fleet } from '@/data/next';
import { gsap } from '@/lib/gsap';

function Panel({ vehicle }) {
  return (
    <article className="fleet-vehicle-panel relative flex h-[88svh] w-full shrink-0 items-center justify-center overflow-hidden border-b border-cream/10 lg:h-full lg:min-h-0 lg:w-screen lg:border-b-0">
      <div className="absolute inset-0">
        <img
          src={vehicle.environment}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-110 object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,22,22,0.9),rgba(11,22,22,0.5)_45%,rgba(11,22,22,0.96))]" aria-hidden="true" />
        <div className={`absolute inset-0 bg-gradient-to-tr ${vehicle.glow}`} aria-hidden="true" />
      </div>

      <div className="container-page relative flex h-full flex-col items-center justify-center py-20 lg:py-16">
        <h3 className="fleet-name pointer-events-none absolute inset-x-0 top-[11%] text-center font-display text-[clamp(2.6rem,8vw,8rem)] font-light uppercase leading-[0.82] tracking-[-0.055em] text-cream/95">
          {vehicle.name}
        </h3>

        <div className="fleet-vehicle relative mt-[12%] w-[104%] max-w-5xl [transform-style:preserve-3d] lg:mt-[6%] lg:w-[78%]">
          <div
            className="absolute inset-x-[14%] bottom-[3%] h-[14%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_72%)]"
            aria-hidden="true"
          />
          <img
            src={vehicle.image}
            alt={vehicle.name}
            loading="lazy"
            decoding="async"
            className="relative mx-auto h-[42svh] w-auto max-w-full object-contain lg:h-[56vh]"
          />
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

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const track = root.querySelector('.fleet-track');
      const panels = Array.from(root.querySelectorAll('.fleet-vehicle-panel'));
      const distance = () => track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -distance(), duration: panels.length }, 0).fromTo(
        root.querySelector('.fleet-progress'),
        { scaleX: 0 },
        { scaleX: 1, duration: panels.length },
        0,
      );

      panels.forEach((panel, index) => {
        const vehicle = panel.querySelector('.fleet-vehicle');
        const name = panel.querySelector('.fleet-name');
        const at = index + 0.08;

        tl.fromTo(
          vehicle,
          { xPercent: 22, opacity: 0, rotateY: -14, scale: 0.94, transformPerspective: 1100 },
          { xPercent: 0, opacity: 1, rotateY: 0, scale: 1, duration: 0.85, ease: 'power2.out' },
          at,
        ).fromTo(name, { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, at + 0.05);
      });

      return () => tl.scrollTrigger?.kill();
    });

    mm.add('(prefers-reduced-motion: no-preference) and (max-width: 1023px)', () => {
      const tweens = gsap.utils.toArray(root.querySelectorAll('.fleet-vehicle-panel')).map((panel, index) =>
        gsap.from(panel.querySelector('.fleet-vehicle'), {
          yPercent: 12,
          opacity: 0.2,
          duration: 0.9,
          delay: (index % 2) * 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
        }),
      );

      return () => tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="fleet" ref={ref} className="relative overflow-hidden bg-ink text-cream" aria-labelledby="fleet-heading">
      <h2 id="fleet-heading" className="sr-only">
        Our fleet
      </h2>

      <div className="fleet-viewport relative overflow-hidden">
        <div className="fleet-track flex w-full flex-col will-change-transform lg:h-[100svh] lg:w-max lg:flex-row lg:items-stretch">
          {fleet.map((vehicle) => (
            <Panel key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden lg:block" aria-hidden="true">
          <div className="container-page pb-6">
            <span className="block h-[2px] w-full bg-cream/15">
              <span className="fleet-progress block h-[2px] origin-left bg-marigold" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
