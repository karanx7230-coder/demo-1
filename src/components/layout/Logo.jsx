import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';

export default function Logo({ light = false, className }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-3', className)} aria-label={`${site.name} home`}>
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-transform duration-300 group-hover:scale-105',
          light ? 'border-white/20 bg-white/10' : 'border-navy/10 bg-white shadow-soft',
        )}
      >
        <img src={site.logo.mark} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            'block font-display text-lg font-semibold tracking-tight',
            light ? 'text-white' : 'text-navy',
          )}
        >
          Himalayan Trails
        </span>
        <span
          className={cn(
            'block text-[0.6rem] font-medium uppercase tracking-[0.28em]',
            light ? 'text-white/55' : 'text-navy-400',
          )}
        >
          Tours &amp; Travels
        </span>
      </span>
    </Link>
  );
}
