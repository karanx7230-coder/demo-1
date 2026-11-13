import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { business, tel, wa } from '@/data/business';
import { navLinks } from '@/data/next';
import { WhatsAppIcon, cx } from '@/components/site/primitives';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const dark = scrolled || open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <div
          className={cx(
            'mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-full border px-3 py-2.5 transition-all duration-500 ease-smooth sm:px-4',
            dark
              ? 'border-ink/10 bg-cream/85 text-ink shadow-[0_30px_70px_-38px_rgba(38,56,59,0.55)] backdrop-blur-2xl'
              : 'border-cream/15 bg-ink/20 text-cream backdrop-blur-xl',
          )}
        >
          <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream p-1 ring-1 ring-ink/10">
              <img
                src="/assets/branding/logo.svg"
                alt="Karnail Tour and Travels"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.15rem] font-medium tracking-tight">Karnail</span>
              <span
                className={cx(
                  'mt-1 block text-[0.48rem] font-semibold uppercase tracking-[0.26em] transition-colors',
                  dark ? 'text-ink/45' : 'text-cream/55',
                )}
              >
                Tour &amp; Travels
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cx(
                  'rounded-full px-3.5 py-2 text-[0.78rem] font-medium transition-colors duration-300',
                  dark ? 'text-ink/60 hover:bg-ink/5 hover:text-ink' : 'text-cream/65 hover:bg-cream/10 hover:text-cream',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={tel}
              className={cx(
                'hidden items-center gap-2 rounded-full px-3 py-2 text-[0.75rem] font-semibold transition-colors xl:flex',
                dark ? 'text-ink/60 hover:text-ink' : 'text-cream/65 hover:text-cream',
              )}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <a
              href={wa()}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-marigold px-4 py-2.5 text-[0.72rem] font-semibold text-ink transition-colors hover:bg-marigold-soft sm:inline-flex"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              Book a ride
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cx(
                'flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden',
                dark ? 'border-ink/15 text-ink' : 'border-cream/25 text-cream',
              )}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div id="menu" className="fixed inset-0 z-[70] flex animate-fade-in flex-col overflow-y-auto bg-ink text-cream lg:hidden">
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-pine/50 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-20 bottom-24 h-64 w-64 rounded-full bg-marigold/10 blur-3xl" aria-hidden="true" />

          <div className="container-page relative flex h-[5.5rem] shrink-0 items-center justify-between">
            <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-cream p-1">
                <img src="/assets/branding/logo.svg" alt="" className="h-full w-full object-contain" />
              </span>
              <span className="font-display text-[1.25rem] font-medium">Karnail</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="container-page relative flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-cream/10 py-3.5"
              >
                <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-marigold">0{index + 1}</span>
                <span className="font-display text-[2.35rem] font-light leading-none tracking-tight transition-colors group-hover:text-marigold">
                  {link.label}
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-cream/30" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="container-page relative shrink-0 pb-8 pt-6">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-marigold px-6 py-3.5 text-sm font-semibold text-ink"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href={tel}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-semibold text-cream"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
            </div>
            <p className="mt-5 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.2em] text-cream/40">
              <span>{business.base}</span>
              <span>Open {business.hours}</span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
