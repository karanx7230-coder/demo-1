import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, MapPin, Users } from 'lucide-react';
import Rating from '@/components/ui/Rating';
import { cn, formatCurrency } from '@/lib/utils';

export default function PackageCard({ tour, className, priority = false }) {
  const discount = tour.oldPrice
    ? Math.round(((tour.oldPrice - tour.price) / tour.oldPrice) * 100)
    : 0;

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <Link to={`/packages/${tour.slug}`} className="block aspect-[4/3] overflow-hidden">
          <img
            src={tour.image}
            alt={`${tour.title} — ${tour.destination}`}
            loading={priority ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          {tour.badge ? (
            <span className="rounded-full bg-navy-950/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              {tour.badge}
            </span>
          ) : (
            <span />
          )}
          {discount > 0 ? (
            <span className="rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-navy">
              Save {discount}%
            </span>
          ) : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-navy-950/80 to-transparent px-4 pb-3 pt-10 text-[0.7rem] text-white/85">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
            {tour.duration.days}D / {tour.duration.nights}N
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
            {tour.destination}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-teal-700">
            {tour.category}
          </span>
          <Rating value={tour.rating} count={tour.reviewCount} compact />
        </div>

        <h3 className="mt-3 font-display text-xl font-medium leading-snug text-navy">
          <Link to={`/packages/${tour.slug}`} className="transition-colors hover:text-gold-700">
            {tour.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-500">{tour.summary}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-navy-400">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {tour.groupSize}
          </span>
          <span>{tour.difficulty}</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-navy/5 pt-4">
          <div>
            <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-navy-400">
              From
            </span>
            <span className="flex items-baseline gap-2">
              <span className="font-display text-xl font-semibold text-navy">
                {formatCurrency(tour.price)}
              </span>
              {tour.oldPrice ? (
                <span className="text-xs text-navy-300 line-through">{formatCurrency(tour.oldPrice)}</span>
              ) : null}
            </span>
            <span className="text-[0.65rem] text-navy-400">per person</span>
          </div>
          <Link
            to={`/packages/${tour.slug}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white"
            aria-label={`View ${tour.title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
