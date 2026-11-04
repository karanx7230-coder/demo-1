import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/utils';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lifted transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse-soft rounded-full border-2 border-white bg-gold" aria-hidden="true" />
    </a>
  );
}
