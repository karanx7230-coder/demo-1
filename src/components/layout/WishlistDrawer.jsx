import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Trash2, X } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { packages } from '@/data/packages';
import { formatCurrency } from '@/lib/utils';
import SmartImage from '@/components/ui/SmartImage';
import Button from '@/components/ui/Button';

export default function WishlistDrawer() {
  const { items, isOpen, closeWishlist, toggleItem } = useWishlist();
  const saved = packages.filter((tour) => items.includes(tour.slug));

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[70] cursor-default bg-navy-950/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            aria-label="Close wishlist"
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-cream-50 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Saved packages"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-6 py-5">
              <div>
                <p className="eyebrow">Your shortlist</p>
                <h2 className="mt-1 font-display text-2xl text-navy">Saved trips</h2>
              </div>
              <button
                type="button"
                onClick={closeWishlist}
                className="flex size-10 items-center justify-center rounded-full border border-navy/10 text-navy transition hover:bg-navy hover:text-white"
                aria-label="Close wishlist"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {saved.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <Heart size={26} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl text-navy">Nothing saved yet</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-500">
                    Tap the heart on any package to keep it here for later.
                  </p>
                  <Button to="/packages" onClick={closeWishlist} className="mt-6" size="sm">
                    Browse packages <ArrowRight size={15} />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {saved.map((tour) => (
                    <div key={tour.slug} className="flex gap-4 rounded-2xl border border-navy/5 bg-white p-3 shadow-soft">
                      <SmartImage
                        src={tour.image}
                        alt={`${tour.title} tour`}
                        className="h-24 w-20 shrink-0 rounded-xl"
                      />
                      <div className="min-w-0 flex-1 py-1">
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-teal-700">
                          {tour.duration.days}D / {tour.duration.nights}N · {tour.category}
                        </p>
                        <Link
                          to={`/packages/${tour.slug}`}
                          onClick={closeWishlist}
                          className="mt-1 line-clamp-2 font-display text-base font-medium leading-snug text-navy hover:text-gold-700"
                        >
                          {tour.title}
                        </Link>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm font-semibold text-navy">{formatCurrency(tour.price)}</p>
                          <button
                            type="button"
                            onClick={() => toggleItem(tour.slug)}
                            className="text-navy-300 transition hover:text-red-500"
                            aria-label={`Remove ${tour.title} from wishlist`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {saved.length > 0 ? (
              <div className="border-t border-navy/10 p-6">
                <Button to="/contact" onClick={closeWishlist} fullWidth>
                  Enquire about these trips
                </Button>
                <p className="mt-3 text-center text-xs text-navy-400">We reply within one working day.</p>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
