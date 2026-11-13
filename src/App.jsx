import { useEffect, useRef } from 'react';
import Nav from '@/components/next/Nav';
import Hero from '@/components/next/Hero';
import Marquee from '@/components/next/Marquee';
import Journey from '@/components/next/Journey';
import Fleet from '@/components/next/Fleet';
import Destinations from '@/components/next/Destinations';
import Experience from '@/components/next/Experience';
import Contact from '@/components/next/Contact';
import Footer from '@/components/next/Footer';
import StickyBar from '@/components/next/StickyBar';
import { ScrollTrigger } from '@/lib/gsap';

function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    let frame = 0;
    let max = 1;

    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-marigold"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 800);

    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero />
        <Marquee />
        <Journey />
        <Fleet />
        <Destinations />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <div className="h-[5.25rem] bg-ink lg:hidden" aria-hidden="true" />
      <StickyBar />
    </div>
  );
}
