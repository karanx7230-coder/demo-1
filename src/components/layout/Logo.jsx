import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { cn } from '@/lib/utils';
import logo from '../../assets/logo_hq.svg';
export default function Logo({ light = false, className }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-3', className)} aria-label={`${site.name} home`}>
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center  rounded-full ',
          
        )}
      >
        <img src={logo} alt="" aria-hidden="true" className="h-29 w-29 object-contain" />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            'block font-display text-lg font-semibold tracking-tight',
            light ? 'text-white' : 'text-navy',
          )}
        >
          {site.shortName}
        </span>
        <span
          className={cn(
            'block text-[0.6rem] font-medium uppercase tracking-[0.28em]',
            light ? 'text-white/55' : 'text-navy-400',
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
