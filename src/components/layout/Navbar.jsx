import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Heart, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { primaryNav } from '@/config/navigation';
import { site } from '@/config/site';
import { useWishlist } from '@/context/WishlistContext';
import { cn, whatsappUrl } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { count, openWishlist } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }) =>
    cn(
      'relative py-2 text-sm font-medium transition-colors',
      isActive ? 'text-navy' : 'text-navy-500 hover:text-navy',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
    );

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'border-b border-navy/5 bg-cream/95 backdrop-blur-lg transition-shadow duration-300',
          scrolled && 'shadow-navbar',
        )}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink key={item.href} to={item.href} className={linkClass} end={item.href === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={openWishlist}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              aria-label={`Open saved trips${count ? `, ${count} saved` : ''}`}
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-navy">
                  {count}
                </span>
              ) : null}
            </button>
            <Button to="/contact" variant="primary" size="sm">
              Plan my trip
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/10 text-navy lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-cream px-5 pb-10 pt-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col divide-y divide-navy/10" aria-label="Mobile">
              {primaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-4 font-display text-xl',
                      isActive ? 'text-gold-700' : 'text-navy',
                    )
                  }
                >
                  {item.label}
                  <span className="text-navy-300">→</span>
                </NavLink>
              ))}
              <NavLink to="/contact" className="flex items-center justify-between py-4 font-display text-xl text-navy">
                Contact
                <span className="text-navy-300">→</span>
              </NavLink>
              <NavLink to="/faq" className="flex items-center justify-between py-4 font-display text-xl text-navy">
                FAQs
                <span className="text-navy-300">→</span>
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openWishlist();
                }}
                className="flex items-center justify-between py-4 text-left font-display text-xl text-navy"
              >
                Saved trips{count ? ` (${count})` : ''}
                <Heart className="h-5 w-5 text-gold-600" aria-hidden="true" />
              </button>
            </nav>

            <div className="mt-8 space-y-3">
              <Button to="/contact" variant="primary" size="lg" className="w-full">
                Plan my trip
              </Button>
              <Button href={whatsappUrl()} target="_blank" rel="noreferrer" variant="outline" size="lg" className="w-full">
                WhatsApp us
              </Button>
            </div>

            <div className="mt-8 space-y-3 rounded-2xl border border-navy/10 bg-white p-5 text-sm text-navy-500">
              <a href={`tel:${site.contact.phone}`} className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.emailHref} className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {site.contact.email}
              </a>
              <p className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {site.contact.hoursShort}
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                {site.contact.address.full}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
