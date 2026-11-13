import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const motes = [
  { left: '8%', top: '58%', size: 3, delay: '-2s', duration: '16s' },
  { left: '16%', top: '72%', size: 2, delay: '-7s', duration: '19s' },
  { left: '24%', top: '44%', size: 4, delay: '-11s', duration: '22s' },
  { left: '38%', top: '66%', size: 2, delay: '-4s', duration: '15s' },
  { left: '47%', top: '38%', size: 3, delay: '-9s', duration: '20s' },
  { left: '58%', top: '74%', size: 2, delay: '-13s', duration: '17s' },
  { left: '66%', top: '52%', size: 4, delay: '-6s', duration: '21s' },
  { left: '74%', top: '30%', size: 2, delay: '-15s', duration: '18s' },
  { left: '84%', top: '64%', size: 3, delay: '-3s', duration: '16s' },
  { left: '92%', top: '46%', size: 2, delay: '-10s', duration: '23s' },
];

const layerDepth = {
  '.hero-photo-push': -160,
  '.hero-grade': -140,
  '.hero-motes': 10,
  '.hero-ridge-back': -40,
  '.hero-ridge-front': 50,
  '.hero-leak': 70,
  '.hero-shade': 85,
  '.hero-title-layer': 60,
  '.hero-seal': 170,
  '.hero-cue': 170,
};

export default function Hero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const q = gsap.utils.selector(root);

    // Base depth. Applied even with reduced motion so the scene still reads as 3D.
    gsap.set(root.querySelector('.hero-photo'), { scale: 1.2 });
    Object.entries(layerDepth).forEach(([selector, z]) => {
      gsap.set(q(selector), { z });
    });

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const photo = root.querySelector('.hero-photo');
      const photoPush = root.querySelector('.hero-photo-push');
      const titleLayer = root.querySelector('.hero-title-layer');
      const seal = root.querySelector('.hero-seal');
      const sealInner = root.querySelector('.hero-seal-inner');
      const cue = root.querySelector('.hero-cue');
      const leak = root.querySelector('.hero-leak');
      const bars = q('.hero-bar');
      const lines = q('.hero-line');

      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });

      intro
        .fromTo(bars, { height: '16%' }, { height: '0%', duration: 1.25, ease: 'expo.inOut' }, 0)
        .fromTo(
          photo,
          { scale: 1.34, filter: 'brightness(0.4) blur(12px)' },
          { scale: 1.2, filter: 'brightness(1) blur(0px)', duration: 1.9, ease: 'power2.out' },
          0.05,
        )
        .fromTo(
          lines,
          { yPercent: 120, rotateX: -64, opacity: 0, transformPerspective: 900 },
          { yPercent: 0, rotateX: 0, opacity: 1, transformPerspective: 900, duration: 1.25, stagger: 0.12 },
          0.3,
        )
        .fromTo(q('.hero-rule'), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, ease: 'power3.inOut' }, 0.85)
        .fromTo(sealInner, { opacity: 0, scale: 0.72 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.95)
        .fromTo(leak, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.55)
        .fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.15);

      const scroll = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      scroll
        .to(q('.hero-push'), { scale: 1.16, yPercent: -2, duration: 1 }, 0)
        .to(photoPush, { scale: 1.24, yPercent: 6, duration: 1 }, 0)
        .to(titleLayer, { z: 560, yPercent: -24, rotateX: -8, opacity: 0, duration: 1 }, 0)
        .to(q('.hero-ridge-back'), { yPercent: 22, duration: 1 }, 0)
        .to(q('.hero-ridge-front'), { yPercent: 50, duration: 1 }, 0)
        .to(q('.hero-floor'), { backgroundPositionY: -560, opacity: 0.05, duration: 1 }, 0)
        .to(seal, { y: 40, duration: 1 }, 0)
        .to(cue, { y: 40, duration: 0.4 }, 0)
        .to(q('.hero-shade'), { opacity: 0.94, duration: 0.72 }, 0.28)
        .to(q('.hero-curtain'), { opacity: 1, duration: 0.3 }, 0.7);

      return () => {
        intro.kill();
        scroll.scrollTrigger?.kill();
        scroll.kill();
      };
    });

    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 1024px)', () => {
      const camera = root.querySelector('.hero-camera');
      const photo = root.querySelector('.hero-photo');
      const title = root.querySelector('.hero-title');
      const ridgeFront = root.querySelector('.hero-ridge-front');
      const leak = root.querySelector('.hero-leak');

      const quick = (el, prop, duration = 1.1) =>
        gsap.quickTo(el, prop, { duration, ease: 'power3.out' });

      const rx = quick(camera, 'rotateX');
      const ry = quick(camera, 'rotateY');
      const photoX = quick(photo, 'x', 1.2);
      const photoY = quick(photo, 'y', 1.2);
      const titleX = quick(title, 'x', 1.2);
      const titleY = quick(title, 'y', 1.2);
      const ridgeX = quick(ridgeFront, 'x', 1.2);
      const leakX = quick(leak, 'x', 1.5);
      const leakY = quick(leak, 'y', 1.5);

      let frame = 0;
      let px = 0;
      let py = 0;

      const apply = () => {
        frame = 0;
        rx(py * -2.6);
        ry(px * 3.4);
        photoX(px * -16);
        photoY(py * -11);
        titleX(px * 28);
        titleY(py * 18);
        ridgeX(px * 11);
        leakX(px * -34);
        leakY(py * -20);
      };

      const onMove = (event) => {
        px = (event.clientX / window.innerWidth - 0.5) * 2;
        py = (event.clientY / window.innerHeight - 0.5) * 2;
        if (!frame) frame = window.requestAnimationFrame(apply);
      };

      window.addEventListener('pointermove', onMove, { passive: true });

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener('pointermove', onMove);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="cinematic-hero hero-scene relative h-[178svh] bg-ink text-cream sm:h-[196svh]"
      aria-labelledby="hero-heading"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="hero-stage absolute inset-0">
          <div className="hero-camera absolute inset-0">
            <div className="hero-push absolute inset-0">
              <div className="hero-photo-push absolute inset-0">
                <img
                  src="/assets/hero/hero-landscape.webp"
                  alt="A mountain highway at first light"
                  fetchpriority="high"
                  width="1920"
                  height="1080"
                  className="hero-photo h-full w-full origin-center object-cover object-[58%_46%]"
                />
              </div>

              <div className="hero-grade absolute inset-0" aria-hidden="true" />
              <div className="hero-floor" aria-hidden="true" />

              <div className="hero-motes absolute inset-0" aria-hidden="true">
                {motes.map((mote, index) => (
                  <span
                    key={index}
                    className="hero-mote"
                    style={{
                      left: mote.left,
                      top: mote.top,
                      width: mote.size,
                      height: mote.size,
                      animationDelay: mote.delay,
                      animationDuration: mote.duration,
                    }}
                  />
                ))}
              </div>

              <svg
                className="hero-ridge hero-ridge-back"
                viewBox="0 0 1440 340"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-ridge-back-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B3534" />
                    <stop offset="100%" stopColor="#0D1B1B" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 238 L88 196 L150 224 L232 158 L318 206 L402 132 L492 192 L566 150 L664 214 L754 168 L846 226 L936 156 L1032 208 L1124 146 L1216 202 L1312 162 L1400 210 L1440 186 L1440 340 L0 340 Z"
                  fill="url(#hero-ridge-back-fill)"
                  stroke="rgba(233,135,77,0.22)"
                  strokeWidth="1.5"
                />
              </svg>

              <svg
                className="hero-ridge hero-ridge-front"
                viewBox="0 0 1440 300"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-ridge-front-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B1717" />
                    <stop offset="100%" stopColor="#060D0D" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 210 L104 172 L196 208 L300 148 L396 196 L508 138 L614 190 L720 156 L830 204 L942 150 L1054 198 L1160 158 L1272 206 L1372 168 L1440 194 L1440 300 L0 300 Z"
                  fill="url(#hero-ridge-front-fill)"
                  stroke="rgba(233,135,77,0.16)"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="hero-leak absolute inset-0" aria-hidden="true">
                <div className="hero-leak-glow absolute inset-0" />
              </div>

              <div className="hero-shade absolute inset-0" aria-hidden="true" />

              <div className="hero-title-layer pointer-events-none absolute inset-0 flex items-center">
                <div className="container-page min-w-0 w-full">
                  <h1 id="hero-heading" className="hero-title">
                    <span className="hero-line block text-[clamp(2.6rem,8.6vw,8.6rem)] font-light text-cream/90">
                      Far from
                    </span>

                    <span className="hero-rule-wrap" aria-hidden="true">
                      <span className="hero-rule" />
                      <span className="hero-rule-dot" />
                    </span>

                    <span className="hero-line hero-outline block text-[clamp(2.8rem,13.2vw,12.4rem)] font-light">
                      Ordinary
                      <em aria-hidden="true">.</em>
                    </span>
                  </h1>
                </div>
              </div>

              <div className="hero-seal" aria-hidden="true">
                <div className="hero-seal-inner">
                  <div className="hero-seal-ring">
                    <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible">
                      <defs>
                        <path
                          id="hero-seal-arc"
                          d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                        />
                      </defs>
                      <text className="fill-cream/50 text-[8px] font-semibold uppercase [letter-spacing:0.28em]">
                        <textPath href="#hero-seal-arc" textLength="276" lengthAdjust="spacing">
                          Travel safe · Travel happy ·
                        </textPath>
                      </text>
                    </svg>
                    <span className="hero-seal-core">
                      <span />
                    </span>
                  </div>
                </div>
              </div>

              <div className="hero-cue" aria-hidden="true">
                <span className="hero-cue-track">
                  <span className="hero-cue-dot" />
                </span>
              </div>
            </div>
          </div>

          <div className="hero-vignette absolute inset-0" aria-hidden="true" />
          <div className="hero-grain absolute inset-0" aria-hidden="true" />
          <div className="hero-bar hero-bar-top" aria-hidden="true" />
          <div className="hero-bar hero-bar-bottom" aria-hidden="true" />
          <div className="hero-curtain absolute inset-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
