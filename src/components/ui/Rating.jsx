import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Rating({ value = 5, count, className, light = false, compact = false }) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <Star
        className={cn('h-3.5 w-3.5 fill-current', light ? 'text-gold-300' : 'text-gold')}
        aria-hidden="true"
      />
      <span className={cn('text-sm font-semibold', light ? 'text-white' : 'text-navy')}>
        {Number(value).toFixed(1)}
      </span>
      {count !== undefined && count !== null ? (
        <span className={cn('text-xs', light ? 'text-white/60' : 'text-navy-400')}>
          {compact ? `(${count})` : `· ${count} reviews`}
        </span>
      ) : null}
    </div>
  );
}
