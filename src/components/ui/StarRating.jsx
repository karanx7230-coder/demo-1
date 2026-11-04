import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StarRating({ rating = 5, count, showValue = true, className }) {
  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-label={`${rating} out of 5 stars`}>
      <span className="flex items-center gap-0.5 text-gold" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            strokeWidth={1.6}
            className={index < Math.round(rating) ? 'fill-current' : 'text-navy-200'}
          />
        ))}
      </span>
      {showValue ? <span className="text-xs font-semibold text-navy">{rating.toFixed(1)}</span> : null}
      {count ? <span className="text-xs text-navy-400">({count})</span> : null}
    </div>
  );
}
