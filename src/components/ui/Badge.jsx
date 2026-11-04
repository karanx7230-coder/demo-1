import { cn } from '@/lib/utils';

const tones = {
  gold: 'bg-gold-100 text-gold-800',
  navy: 'bg-navy text-white',
  teal: 'bg-teal-100 text-teal-800',
  white: 'bg-white/95 text-navy shadow-sm',
  glass: 'border border-white/25 bg-white/15 text-white backdrop-blur-md',
  outline: 'border border-navy/15 bg-transparent text-navy-600',
  cream: 'bg-cream-200 text-navy-600',
};

export default function Badge({ children, tone = 'gold', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
