import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Clock, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { primaryNav } from '@/config/navigation';
import { site } from '@/config/site';
import { cn, whatsappUrl } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Logo from '@/components/layout/Logo';

const ctaClass =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#1E3A4C] px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#162C3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A4C]';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
      'relative py-2 font-sans text-sm font-medium transition-colors duration-200',
      isActive ? 'text-navy' : 'text-navy-500 hover:text-navy',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-navy after:transition-all after:duration-300',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
    );

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-navy/10 bg-white">
        <div className="container-page grid h-20 grid-cols-[1fr_auto] items-center gap-6 py-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Logo: far left */}
          <div className="justify-self-start">
            <Logo />
          </div>

          {/* Navigation: centered */}
          <nav className="hidden items-center gap-[28px] lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink key={item.href} to={item.href} className={linkClass} end={item.href === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA: far right */}
          <div className="hidden justify-self-end lg:block">
            <Link to="/contact" className={ctaClass}>
              Book a Ride
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-navy/10 text-navy lg:hidden"
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
            className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-white px-5 pb-10 pt-6 lg:hidden"
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
                      'flex items-center justify-between py-4 font-sans text-lg font-medium',
                      isActive ? 'text-navy' : 'text-navy-500',
                    )
                  }
                >
                  {item.label}
                  <span className="text-navy-300">→</span>
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                className="flex items-center justify-between py-4 font-sans text-lg font-medium text-navy-500"
              >
                Contact
                <span className="text-navy-300">→</span>
              </NavLink>
              <NavLink
                to="/faq"
                className="flex items-center justify-between py-4 font-sans text-lg font-medium text-navy-500"
              >
                FAQs
                <span className="text-navy-300">→</span>
              </NavLink>
            </nav>

            <div className="mt-8 space-y-3">
              <Link to="/contact" className={cn(ctaClass, 'w-full py-3.5')}>
                Book a Ride
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Button href={whatsappUrl()} target="_blank" rel="noreferrer" variant="outline" size="lg" className="w-full">
                WhatsApp us
              </Button>
            </div>

            <div className="mt-8 space-y-3 rounded-2xl border border-navy/10 bg-light p-5 text-sm text-navy-500">
              <a href={`tel:${site.contact.phone}`} className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-navy" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.emailHref} className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-navy" aria-hidden="true" />
                {site.contact.email}
              </a>
              <p className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-navy" aria-hidden="true" />
                {site.contact.hoursShort}
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden="true" />
                {site.contact.address.full}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
} 