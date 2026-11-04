import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import SmartImage from '@/components/ui/SmartImage';

export default function DestinationCard({ destination, className = '' }) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className={`group relative block overflow-hidden rounded-2xl ${className}`}
      aria-label={`Explore ${destination.name}`}
    >
      <SmartImage
        src={destination.image}
        alt={`${destination.name}, ${destination.region}`}
        className="aspect-[3/4] w-full"
        imgClassName="group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/25 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
        <MapPin size={11} className="text-gold-300" />
        {destination.region}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
          {destination.type === 'domestic' ? 'India' : destination.country}
        </p>
        <h3 className="mt-1 font-display text-2xl font-medium">{destination.name}</h3>
        <p className="mt-1.5 line-clamp-1 text-xs text-white/65">{destination.tagline}</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
          <p className="text-xs text-white/65">
            From <span className="font-semibold text-white">{formatCurrency(destination.startingPrice)}</span>
          </p>
          <span className="flex size-9 items-center justify-center rounded-full border border-white/25 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
