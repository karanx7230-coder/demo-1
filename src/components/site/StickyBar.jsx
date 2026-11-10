import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { tel, wa } from '@/data/business';
import { WhatsAppIcon } from './primitives';

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-cream/10 bg-ink/95 px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl lg:hidden"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex max-w-md items-center gap-2.5">
            <a
              href={tel}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-cream/20 py-3.5 text-[0.8rem] font-semibold text-cream"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <a
              href={wa()}
              target="_blank"
              rel="noreferrer"
              className="flex flex-[1.35] items-center justify-center gap-2 rounded-full bg-marigold py-3.5 text-[0.8rem] font-semibold text-ink"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
