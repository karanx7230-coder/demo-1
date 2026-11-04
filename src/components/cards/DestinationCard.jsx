import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

export default function DestinationCard({ destination, className, tall = false }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className={cn(
        'group relative isolate block overflow-hidden rounded-2xl bg-navy-900',
        tall ? 'aspect-[3/4]' : 'aspect-[4/5]',
        className,
      )}
    >
      <img
        src={destination.image}
        alt={`${destination.name}, ${destination.region}`}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
          {destination.type === 'domestic' ? 'India' : 'International'}
        </span>
        <span className="rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold text-navy">
          {destination.rating.toFixed(1)} ★
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-gold-300">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {destination.region}
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium text-white">{destination.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/65">{destination.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
          <span className="text-sm text-white/70">
            From <span className="font-semibold text-white">{formatCurrency(destination.startingPrice)}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-300 transition-transform duration-300 group-hover:translate-x-1">
            Explore
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
