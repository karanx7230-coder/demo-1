import { Compass } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function EmptyState({
  title = 'Nothing here just yet',
  description = 'Try changing your filters or search for something else.',
  action,
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-navy/15 bg-white/60 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
        <Compass className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-xl text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
      {!action ? (
        <Button to="/packages" variant="outline" size="sm" className="mt-6">
          Browse packages
        </Button>
      ) : null}
    </div>
  );
}
