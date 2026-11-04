import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Breadcrumbs({ items = [], light = false, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-2 text-xs', className)}>
      <Link
        to="/"
        className={cn(
          'inline-flex items-center gap-1.5 transition-colors',
          light ? 'text-white/60 hover:text-white' : 'text-navy-400 hover:text-navy',
        )}
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <ChevronRight
            className={cn('h-3 w-3', light ? 'text-white/30' : 'text-navy-300')}
            aria-hidden="true"
          />
          {item.href ? (
            <Link
              to={item.href}
              className={cn(
                'transition-colors',
                light ? 'text-white/60 hover:text-white' : 'text-navy-400 hover:text-navy',
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                'font-medium',
                light ? 'text-white' : 'text-navy',
              )}
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
