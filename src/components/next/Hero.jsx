import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { business, tel, wa } from '@/data/business';
import { WhatsAppIcon } from '@/components/site/primitives';
import { gsap } from '@/lib/gsap';

const indicators = ['Airport transfers', 'Outstation cabs', 'Curated tours'];

export default function Hero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        .from(root.querySelector('.hero-bg'), { scale: 1.14, duration: 1.8, ease: 'power2.out' }, 0)
        .from(root.querySelectorAll('[data-line]'), { yPercent: 118, duration: 1.1, stagger: 0.1, ease: 'expo.out' }, 0.15)
        .from(root.querySelectorAll('.hero-fade'), { y: 24, opacity: 0, duration: 0.85, stagger: 0.07 }, 0.55)
        .from(root.querySelector('.hero-ghost-text'), { opacity: 0, xPercent: 4, duration: 1.6 }, 0.3);

      return () => intro.kill();
    });

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
        },
      });

      tl.fromTo(root.querySelector('.hero-bg-img'), { scale: 1 }, { scale: 1.26, ease: 'power1.in' }, 0)
        .to(root.querySelector('.hero-copy'), { yPercent: -10, opacity: 0, ease: 'power1.in' }, 0)
        .to(root.querySelector('.hero-indicators'), { y: 30, opacity: 0 }, 0)
        .to(root.querySelector('.hero-shade'), { opacity: 1 }, 0.35)
        .to(root.querySelector('.hero-ghost'), { xPercent: -6, opacity: 0.25 }, 0);

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="top" ref={ref} className="cinematic-hero relative h-[100svh] bg-ink text-cream lg:h-[160svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="hero-bg absolute inset-0 z-0 will-change-transform">
          <img
            src="/assets/hero/hero-landscape.webp"
            alt="A mountain highway at first light"
            fetchpriority="high"
            width="1920"
            height="1080"
            className="hero-bg-img h-full w-full object-cover object-[58%_46%]"
          />
        </div>

        <div
          className="absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(9,18,18,0.92)_0%,rgba(9,18,18,0.58)_34%,rgba(9,18,18,0.04)_62%,rgba(9,18,18,0.3)_100%)]"
          aria-hidden="true"
        />
        <div className="cinema-vignette absolute inset-0 z-[2] opacity-95" aria-hidden="true" />
        <div
          className="hero-shade absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(8,15,15,0.25)_0%,rgba(8,15,15,0.15)_40%,rgba(8,15,15,0.96)_100%)] opacity-0"
          aria-hidden="true"
        />

        <p
          className="hero-ghost pointer-events-none absolute right-[-4%] top-[16%] z-[2] hidden w-max font-display text-[clamp(9rem,24vw,21rem)] font-light uppercase leading-none tracking-[-0.06em] lg:block"
          aria-hidden="true"
        >
          <span className="hero-ghost-text block text-cream/[0.06]">Karnail</span>
        </p>

        <div className="relative z-10 flex h-full flex-col">
          <div className="container-page hero-fade mt-auto pb-32 pt-36 sm:pb-36 lg:pb-40">
            <p className="mb-8 font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-light italic text-marigold">
              The mountains are waiting.
            </p>

            <h1 className="font-display text-[clamp(3.5rem,11.4vw,11.5rem)] font-light uppercase leading-[0.82] tracking-[-0.05em] text-cream">
              <span className="line-mask">
                <span data-line className="block">
                  Leave the
                </span>
              </span>
              <span className="line-mask">
                <span data-line className="block">
                  ordinary<em className="font-normal italic normal-case text-marigold">.</em>
                </span>
              </span>
            </h1>

            <div className="mt-9 flex flex-col gap-8 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
              <p className="hero-fade max-w-lg text-lg leading-relaxed text-cream/75 sm:text-xl">
                Mountain roads, airport runs and long weekends. Private cabs and planned tours from
                Mohali — with drivers who know the way.
              </p>

              <div className="hero-fade flex flex-wrap items-center gap-3">
                <a
                  href={wa('Hi Karnail Tour and Travels, I would like to book a ride.')}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-marigold px-7 py-4 text-base font-semibold text-ink transition-colors hover:bg-marigold-soft"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Book on WhatsApp
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={tel}
                  className="inline-flex items-center gap-2.5 rounded-full border border-cream/30 px-6 py-4 text-base font-semibold text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="hero-indicators relative border-t border-cream/15 bg-ink/55">
            <div className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                {indicators.map((item) => (
                  <span key={item} className="font-display text-[1.2rem] font-light text-cream/80">
                    {item}
                  </span>
                ))}
              </div>
              <span className="font-display text-[1.2rem] font-light text-cream/70">
                {business.base}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
