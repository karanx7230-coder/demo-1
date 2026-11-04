import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const isOpen = index !== null && index !== undefined && index >= 0;
  const item = isOpen ? items[index] : null;

  const goPrev = useCallback(() => {
    if (!isOpen) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, isOpen, items.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (!isOpen) return;
    onIndexChange((index + 1) % items.length);
  }, [index, isOpen, items.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && item ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt || item.caption || 'Photo preview'}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-navy sm:right-8 sm:top-8"
            aria-label="Close photo viewer"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-navy sm:left-8"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.figure
            className="max-h-full w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={item.image}
              alt={item.alt || ''}
              className="mx-auto max-h-[78vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 flex flex-col items-center gap-1 text-center">
              <span className="font-display text-lg text-white">{item.caption}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                {item.category} · {index + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-navy sm:right-8"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
