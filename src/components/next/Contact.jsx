import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { tel, wa } from '@/data/business';
import { WhatsAppIcon } from '@/components/site/primitives';
import { gsap } from '@/lib/gsap';

export default function Contact() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const bg = gsap.fromTo(
        root.querySelector('.cta-bg'),
        { scale: 1.22 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        },
      );

      const lines = gsap.from(root.querySelectorAll('.cta-line'), {
        yPercent: 114,
        stagger: 0.09,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 72%', end: 'top 18%', scrub: 0.8 },
      });

      const fade = gsap.from(root.querySelectorAll('.cta-fade'), {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 48%', once: true },
      });

      return () => {
        [bg, lines, fade].forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-cream"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/assets/destinations/kashmir-01.webp"
          alt="A still lake beneath the mountains at first light"
          loading="lazy"
          decoding="async"
          className="cta-bg h-full w-full scale-110 object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(8,16,16,0.82)_0%,rgba(8,16,16,0.32)_38%,rgba(8,16,16,0.94)_100%)]"
        aria-hidden="true"
      />
      <div className="cinema-vignette absolute inset-0 -z-[4] opacity-80" aria-hidden="true" />

      <div className="container-page relative pb-16 pt-36 sm:pb-20 sm:pt-44">
        <h2
          id="contact-heading"
          className="max-w-6xl font-display text-[clamp(3.3rem,10.2vw,10rem)] font-light uppercase leading-[0.84] tracking-[-0.05em]"
        >
          <span className="line-mask">
            <span className="cta-line block">Where will</span>
          </span>
          <span className="line-mask">
            <span className="cta-line block">the road</span>
          </span>
          <span className="line-mask">
            <span className="cta-line block">
              take <em className="font-normal italic normal-case text-marigold">you?</em>
            </span>
          </span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 border-t border-cream/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="cta-fade max-w-lg text-lg leading-relaxed text-cream/70 sm:text-xl">
            Your next journey starts here. Send the destination and the date — we will reply with the
            cab, the driver and a clear fare.
          </p>

          <div className="cta-fade flex flex-col gap-3 sm:flex-row">
            <a
              href={tel}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-marigold px-8 py-5 text-base font-semibold text-ink transition-colors hover:bg-marigold-soft"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call now
              <ArrowUpRight
                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={wa('Hi Karnail Tour and Travels, I would like to book a journey. Here are my details:')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/30 px-8 py-5 text-base font-semibold text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp enquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
