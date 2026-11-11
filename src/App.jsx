import { useEffect, useRef } from 'react';
import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import Marquee from '@/components/site/Marquee';
import Intro from '@/components/site/Intro';
import Services from '@/components/site/Services';
import Fleet from '@/components/site/Fleet';
import Destinations from '@/components/site/Destinations';
import RouteStory from '@/components/site/RouteStory';
import Promise from '@/components/site/Promise';
import Reviews from '@/components/site/Reviews';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';
import StickyBar from '@/components/site/StickyBar';
import { useSpatialPointer } from '@/components/site/spatial';

function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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
  useSpatialPointer();

  return (
    <div className="grain relative min-h-screen bg-cream">
      <div className="ambient-glow pointer-events-none fixed inset-0 z-[45] hidden mix-blend-soft-light lg:block" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        <Hero />
        <Marquee />
        <Intro />
        <Services />
        <Fleet />
        <Destinations />
        <RouteStory />
        <Promise />
        <Reviews />
        <Contact />
      </main>

      <Footer />
      <div className="h-[4.75rem] bg-ink lg:hidden" aria-hidden="true" />
      <StickyBar />
    </div>
  );
}
