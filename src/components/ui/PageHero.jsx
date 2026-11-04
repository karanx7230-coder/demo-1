import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { cn } from '@/lib/utils';

export default function PageHero({
  image,
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  children,
  align = 'left',
  size = 'md',
  className,
}) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-navy-950 text-white',
        size === 'lg' ? 'min-h-[34rem]' : 'min-h-[22rem]',
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      ) : null}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/35"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950/70 to-transparent" aria-hidden="true" />

      <div
        className={cn(
          'container-page flex flex-col justify-end pb-14 pt-28 sm:pb-16 sm:pt-32',
          size === 'lg' ? 'min-h-[34rem]' : 'min-h-[22rem]',
          align === 'center' && 'items-center text-center',
        )}
      >
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
          <Breadcrumbs items={breadcrumbs} light />
          {eyebrow ? <span className="eyebrow eyebrow-light mt-8">{eyebrow}</span> : null}
          <h1 className="mt-4 font-display text-display-lg font-medium text-white sm:text-display-xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
