import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { site } from '@/config/site';
import { cn, whatsappUrl } from '@/lib/utils';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] p-3.5 text-white shadow-lifted transition-all duration-300 hover:gap-2 hover:pr-5 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={22} className="shrink-0" />
      <span className="max-w-0 whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[140px]">
        Chat with us
      </span>
    </a>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-20 right-5 z-40 flex size-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-soft transition-all duration-300 hover:bg-navy hover:text-white sm:bottom-24 sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}

export function ContactRail() {
  return (
    <div className="hidden items-center gap-3 text-xs text-navy-400 lg:flex">
      <span>{site.contact.hoursShort}</span>
    </div>
  );
}
