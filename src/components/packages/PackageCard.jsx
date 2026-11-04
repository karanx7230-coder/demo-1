import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Heart, MapPin } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { formatCurrency } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import SmartImage from '@/components/ui/SmartImage';
import StarRating from '@/components/ui/StarRating';

export default function PackageCard({ tour, className = '' }) {
  const { isSaved, toggleItem } = useWishlist();
  const saved = isSaved(tour.slug);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-card ${className}`}
    >
      <div className="relative">
        <Link to={`/packages/${tour.slug}`} aria-label={`View ${tour.title}`}>
          <SmartImage
            src={tour.image}
            alt={`${tour.title} — ${tour.destination}`}
            className="aspect-[4/3] w-full"
            imgClassName="group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {tour.badge ? <Badge tone="white">{tour.badge}</Badge> : null}
            {tour.type === 'international' ? <Badge tone="glass">International</Badge> : null}
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-medium text-white">
            <MapPin size={13} className="text-gold-300" />
            {tour.destination}
          </div>
        </Link>

        <button
          type="button"
          onClick={() => toggleItem(tour.slug)}
          aria-label={saved ? `Remove ${tour.title} from wishlist` : `Save ${tour.title} to wishlist`}
          aria-pressed={saved}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/95 text-navy shadow-soft backdrop-blur-md transition hover:scale-105 hover:bg-gold"
        >
          <Heart size={16} className={saved ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-teal-700">{tour.category}</p>
          <StarRating rating={tour.rating} count={tour.reviewCount} showValue={false} />
        </div>

        <Link to={`/packages/${tour.slug}`} className="mt-2 block">
          <h3 className="font-display text-xl font-medium leading-snug text-navy transition-colors group-hover:text-gold-700">
            {tour.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-4 text-xs text-navy-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} className="text-gold-600" />
            {tour.duration.days}D / {tour.duration.nights}N
          </span>
          <span>·</span>
          <span>{tour.transport.split('·')[0].trim()}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-navy-500">{tour.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-navy/5 pt-4 mt-5">
          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-navy-400">Starting from</p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-navy">{formatCurrency(tour.price)}</span>
              {tour.oldPrice ? (
                <span className="text-xs text-navy-300 line-through">{formatCurrency(tour.oldPrice)}</span>
              ) : null}
            </div>
            <p className="text-[0.65rem] text-navy-400">per person</p>
          </div>
          <Link
            to={`/packages/${tour.slug}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy/10 text-navy transition-all duration-300 hover:border-navy hover:bg-navy hover:text-white"
            aria-label={`Explore ${tour.title}`}
          >
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
