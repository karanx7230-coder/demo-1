import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Accordion({ items, defaultOpen = 0, className }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('divide-y divide-navy/10 border-y border-navy/10', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.title || item.question || index}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-start gap-4">
                {item.step ? (
                  <span className="mt-0.5 font-display text-sm text-gold-600">{item.step}</span>
                ) : null}
                <span>
                  <span className="block font-display text-lg font-medium text-navy">
                    {item.title || item.question}
                  </span>
                  {item.meta ? (
                    <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-navy-400">
                      {item.meta}
                    </span>
                  ) : null}
                </span>
              </span>
              <span
                className={cn(
                  'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                  isOpen ? 'border-navy bg-navy text-white' : 'border-navy/15 text-navy',
                )}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-0 sm:pl-9">
                    <p className="max-w-3xl leading-relaxed text-navy-500">{item.content || item.answer}</p>
                    {item.bullets?.length ? (
                      <ul className="mt-3 space-y-2">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2 text-sm text-navy-500">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
