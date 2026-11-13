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
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cx(
            'border-b transition-[background-color,border-color,color] duration-500',
            dark ? 'border-ink/10 bg-cream/95 text-ink' : 'border-cream/15 bg-transparent text-cream',
          )}
        >
          <div className="container-page relative flex h-[5.5rem] items-center justify-between gap-6">
            <a
              href="#top"
              className="group flex shrink-0 items-center gap-3.5"
              onClick={() => setOpen(false)}
              aria-label={`${business.name} — home`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream p-1 ring-1 ring-ink/10 transition-transform duration-500 group-hover:rotate-6">
                <img
                  src="/assets/branding/logo-mark.webp"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.5rem] font-medium tracking-[-0.02em]">Karnail</span>
                <span
                  className={cx(
                    'mt-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.32em] transition-colors',
                    dark ? 'text-ink/45' : 'text-cream/45',
                  )}
                >
                  Tour &amp; Travels
                </span>
              </span>
            </a>

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cx(
                    'group relative py-2 text-[0.95rem] font-medium transition-colors duration-300',
                    dark ? 'text-ink/65 hover:text-ink' : 'text-cream/70 hover:text-cream',
                  )}
                >
                  {link.label}
                  <span
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-marigold transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
              <a
                href={tel}
                className={cx(
                  'hidden items-center gap-2 text-[0.9rem] font-semibold transition-colors xl:flex',
                  dark ? 'text-ink/60 hover:text-ink' : 'text-cream/65 hover:text-cream',
                )}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {business.phoneDisplay}
              </a>

              <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className={cx(
                  'group hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.88rem] font-semibold transition-colors sm:inline-flex',
                  dark
                    ? 'bg-ink text-cream hover:bg-pine'
                    : 'bg-marigold text-ink hover:bg-marigold-soft',
                )}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book a ride
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className={cx(
                  'flex h-11 items-center gap-2.5 rounded-full border px-3.5 transition-colors lg:hidden',
                  dark ? 'border-ink/15 text-ink' : 'border-cream/25 text-cream',
                )}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
                <span className="hidden text-[0.82rem] font-semibold uppercase tracking-[0.18em] sm:block">
                  Menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="menu"
          className="fixed inset-0 z-[70] flex animate-fade-in flex-col overflow-y-auto bg-ink text-cream lg:hidden"
        >
          <div className="container-page flex h-[5.75rem] shrink-0 items-center justify-between border-b border-cream/10">
            <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-cream p-1">
                <img src="/assets/branding/logo-mark.webp" alt="" className="h-full w-full object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.5rem] font-medium">Karnail</span>
                <span className="mt-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-cream/45">
                  Tour &amp; Travels
                </span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-cream/50"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="container-page flex flex-1 flex-col justify-center" aria-label="Mobile">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-5 border-b border-cream/10 py-5 first:border-t"
              >
                <span className="w-7 shrink-0 font-display text-sm italic text-marigold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[clamp(2.2rem,10vw,3rem)] font-light leading-none tracking-tight transition-colors group-hover:text-marigold">
                  {link.label}
                </span>
                <ArrowUpRight
                  className="ml-auto h-6 w-6 text-cream/30 transition-colors group-hover:text-marigold"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div className="container-page shrink-0 pb-10 pt-8">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-marigold px-6 py-4 text-base font-semibold text-ink"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <a
                href={tel}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/30 px-6 py-4 text-base font-semibold text-cream"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-base text-cream/60">{business.base}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
