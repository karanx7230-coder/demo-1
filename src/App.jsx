import { useEffect } from 'react';
import Nav from '@/components/next/Nav';
import Hero from '@/components/next/Hero';
import Journey from '@/components/next/Journey';
import Fleet from '@/components/next/Fleet';
import Destinations from '@/components/next/Destinations';
import Experience from '@/components/next/Experience';
import Contact from '@/components/next/Contact';
import Footer from '@/components/next/Footer';
import StickyBar from '@/components/next/StickyBar';
import { ScrollTrigger } from '@/lib/gsap';

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

      <Nav />

      <main id="main">
        <Hero />
        <Journey />
        <Fleet />
        <Destinations />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <div className="h-[5.5rem] bg-ink lg:hidden" aria-hidden="true" />
      <StickyBar />
    </div>
  );
}
