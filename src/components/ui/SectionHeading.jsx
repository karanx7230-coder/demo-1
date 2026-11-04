import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  action,
  className,
  as: Tag = 'h2',
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        align === 'between' && 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <span className={cn('eyebrow', light && 'eyebrow-light')}>
            <span className={cn('h-px w-8 bg-gold', light && 'bg-gold-300')} aria-hidden="true" />
            {eyebrow}
          </span>
        ) : null}
        <Tag
          className={cn(
            'mt-4 font-display text-display-md font-medium',
            light ? 'text-white' : 'text-navy',
          )}
        >
          {title}
        </Tag>
        {description ? (
          <p className={cn('mt-4 leading-relaxed', light ? 'text-white/70' : 'text-navy-500')}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
