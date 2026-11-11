import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { business, navLinks, tel, wa } from '@/data/business';
import { ActionLink, WhatsAppIcon, cx } from './primitives';
import { BrandMark } from './spatial';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cx(
            'mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-full border pl-3 pr-2 transition-all duration-500 ease-smooth sm:pl-4 sm:pr-2.5',
            scrolled
              ? 'h-[3.9rem] border-ink/10 bg-cream/90 shadow-[0_24px_60px_-30px_rgba(38,56,59,0.45)] backdrop-blur-2xl'
              : 'h-[4.4rem] border-cream/15 bg-ink/25 backdrop-blur-xl',
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label={`${business.name} — back to top`}
            onClick={() => setOpen(false)}
          >
            <BrandMark className="h-9 w-9 shrink-0 rounded-full ring-1 ring-cream/20 transition-transform duration-500 group-hover:rotate-6 sm:h-10 sm:w-10" />
            <span className="leading-none">
              <span
                className={cx(
                  'block font-display text-[1.2rem] font-medium tracking-tight transition-colors duration-500 sm:text-[1.3rem]',
                  dark ? 'text-ink' : 'text-cream',
                )}
              >
                Karnail
              </span>
              <span
                className={cx(
                  'mt-1 block text-[0.5rem] font-semibold uppercase tracking-[0.24em] transition-colors duration-500',
                  dark ? 'text-ink/45' : 'text-cream/55',
                )}
              >
                Tour &amp; Travels
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cx(
                  'rounded-full px-3.5 py-2 text-[0.8rem] font-medium transition-colors duration-300',
                  dark ? 'text-ink/65 hover:bg-ink/5 hover:text-ink' : 'text-cream/70 hover:bg-cream/10 hover:text-cream',
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
                'hidden items-center gap-2 rounded-full px-3 py-2 text-[0.78rem] font-semibold transition-colors xl:flex',
                dark ? 'text-ink/65 hover:text-ink' : 'text-cream/70 hover:text-cream',
              )}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {business.phoneDisplay}
            </a>

            <ActionLink
              href={wa()}
              variant="gold"
              icon={WhatsAppIcon}
              className="hidden !px-4 !py-2.5 text-[0.75rem] sm:inline-flex"
            >
              Book a Ride
            </ActionLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cx(
                'flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden',
                dark ? 'border-ink/15 text-ink' : 'border-cream/25 text-cream',
              )}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[70] flex animate-fade-in flex-col overflow-hidden bg-ink text-cream lg:hidden"
        >
          <div
            className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-pine/50 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-24 h-64 w-64 rounded-full bg-marigold/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="container-page relative flex h-[5.5rem] shrink-0 items-center justify-between">
            <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <BrandMark className="h-10 w-10" />
              <span className="leading-none">
                <span className="block font-display text-[1.3rem] font-medium">Karnail</span>
                <span className="mt-1 block text-[0.5rem] font-semibold uppercase tracking-[0.24em] text-cream/50">
                  Tour &amp; Travels
                </span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream"
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
                className="group flex animate-menu-item items-baseline gap-4 border-b border-cream/10 py-3.5"
                style={{ animationDelay: `${0.06 * index + 0.08}s` }}
              >
                <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-marigold">
                  0{index + 1}
                </span>
                <span className="font-display text-[2.35rem] font-light leading-none tracking-tight text-cream transition-colors group-hover:text-marigold">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="container-page relative shrink-0 pb-8 pt-6">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <ActionLink href={wa()} variant="gold" icon={WhatsAppIcon} className="w-full">
                Chat on WhatsApp
              </ActionLink>
              <ActionLink href={tel} variant="outlineLight" icon={Phone} className="w-full">
                Call {business.phoneDisplay}
              </ActionLink>
            </div>
            <p className="mt-5 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.2em] text-cream/40">
              <span>{business.base}</span>
              <span>Open {business.hours}</span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
