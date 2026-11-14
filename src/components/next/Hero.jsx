import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { tel, wa } from '@/data/business';
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
        .from(root.querySelector('.hero-bg-img'), { scale: 1.12, duration: 1.6, ease: 'power2.out' }, 0)
        .from(root.querySelectorAll('.hero-line'), { yPercent: 115, duration: 1.05, stagger: 0.1, ease: 'expo.out' }, 0.15)
        .from(root.querySelectorAll('.hero-fade'), { y: 22, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.55);

      return () => intro.kill();
    });

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      const scroll = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
        },
      });

      scroll
        .fromTo(root.querySelector('.hero-bg-img'), { scale: 1 }, { scale: 1.16, ease: 'power1.in' }, 0)
        .to(root.querySelector('.hero-copy'), { yPercent: -12, opacity: 0 }, 0)
        .to(root.querySelector('.hero-strip'), { y: 24, opacity: 0 }, 0)
        .to(root.querySelector('.hero-shade'), { opacity: 1 }, 0.25);

      return () => scroll.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="top" ref={ref} className="cinematic-hero relative h-[100svh] bg-ink text-cream lg:h-[135svh]">
      <div className="sticky top-0 h-[150svh] overflow-hidden">
        <img
          src="/assets/hero/hero-landscape.webp"
          alt="A mountain highway at first light"
          fetchpriority="high"
          width="1920"
          height="1080"
          className="hero-bg-img absolute inset-0 h-full w-full object-cover object-[60%_48%]"
        />

        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,17,17,0.9)_0%,rgba(8,17,17,0.58)_34%,rgba(8,17,17,0.04)_64%,rgba(8,17,17,0.42)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,15,0.34)_0%,transparent_30%,transparent_62%,rgba(8,15,15,0.88)_100%)]"
          aria-hidden="true"
        />
        <div
          className="hero-shade absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,15,0.4)_0%,rgba(8,15,15,0.2)_34%,rgba(8,15,15,0.97)_100%)] opacity-0"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="container-page hero-copy mt-auto pb-10 pt-32 sm:pb-12 lg:pb-14">
            <p className="hero-fade mb-6 font-display text-[clamp(1.3rem,2.2vw,1.9rem)] font-light italic text-marigold sm:mb-8">
              The mountains are waiting.
            </p>

            <h1 className="font-display text-[clamp(3.4rem,10.6vw,10.8rem)] font-light uppercase leading-[0.82] tracking-[-0.05em] text-cream">
              <span className="line-mask">
                <span className="hero-line block">Leave the</span>
              </span>
              <span className="line-mask">
                <span className="hero-line block">
                  ordinary<em className="font-normal italic normal-case text-marigold">.</em>
                </span>
              </span>
            </h1>

            <div className="mt-8 flex flex-col gap-7 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
              <p className="hero-fade max-w-lg text-lg leading-relaxed text-cream/75 sm:text-xl">
                Private cabs, airport runs and planned tours from Mohali — with drivers who know the
                road.
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

          <div className="hero-strip hero-fade relative border-t border-cream/15 bg-ink/40">
            <div className="container-page flex flex-wrap items-center gap-x-7 gap-y-2 py-5 sm:gap-x-10">
              {indicators.map((item, index) => (
                <span key={item} className="flex items-center gap-7 sm:gap-10">
                  <span className="font-display text-[1.1rem] font-light text-cream/75 sm:text-[1.2rem]">
                    {item}
                  </span>
                  {index < indicators.length - 1 ? (
                    <span className="hidden h-1 w-1 rounded-full bg-marigold/70 sm:block" aria-hidden="true" />
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
