import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { tel, wa } from '@/data/business';
import { WhatsAppIcon, cx } from '@/components/site/primitives';

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 620);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={cx(
        'fixed inset-x-0 bottom-0 z-[60] border-t border-cream/10 bg-ink px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-500 ease-smooth lg:hidden',
        visible ? 'translate-y-0' : 'invisible translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href={tel}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-cream/25 py-4 text-base font-semibold text-cream"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
        <a
          href={wa()}
          target="_blank"
          rel="noreferrer"
          className="flex flex-[1.35] items-center justify-center gap-2 rounded-full bg-marigold py-4 text-base font-semibold text-ink"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
