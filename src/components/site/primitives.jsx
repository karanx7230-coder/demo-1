import { useEffect, useRef } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';

export const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Fade + rise reveal driven by IntersectionObserver and CSS.
 * No animation library, no re-renders, one observer per block.
 */
export function Reveal({ children, className, delay = 0, y = 26, as = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -70px 0px', threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={cx('reveal', className)}
      style={{
        '--reveal-delay': `${Math.round(delay * 1000)}ms`,
        '--reveal-y': `${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}

export function SectionLabel({ number, children, light = false, className }) {
  return (
    <p
      className={cx(
        'flex items-center gap-3 text-label font-semibold uppercase',
        light ? 'text-cream/55' : 'text-ink/45',
        className,
      )}
    >
      <span className="h-px w-8 bg-marigold" aria-hidden="true" />
      {number ? <span className="text-marigold">{number}</span> : null}
      <span>{children}</span>
    </p>
  );
}

export function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function Stars({ className }) {
  return (
    <span className={cx('inline-flex items-center gap-0.5 text-marigold', className)} role="img" aria-label="Rated 5 out of 5">
      {[0, 1, 2, 3, 4].map((index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
      ))}
    </span>
  );
}

export function ActionLink({
  href,
  children,
  variant = 'gold',
  icon: Icon,
  className,
  showArrow = false,
  ...rest
}) {
  const styles = {
    gold: 'bg-marigold text-ink hover:bg-marigold-soft',
    cream: 'bg-cream text-ink hover:bg-white',
    outlineLight: 'border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-ink',
    outlineInk: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream',
  };

  const external = href?.startsWith('http');

  return (
    <a
      href={href}
      className={cx(
        'group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-smooth',
        styles[variant],
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {Icon ? <Icon className="h-[1.05rem] w-[1.05rem] shrink-0" aria-hidden="true" /> : null}
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}

export function Seal({ id = 'karnail-seal', className, label = 'TRAVEL SAFE · TRAVEL HAPPY · MOHALI · ' }) {
  return (
    <div className={cx('relative aspect-square', className)} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="none" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeOpacity="0.18" />
        <text className="fill-current text-[7.4px] font-semibold uppercase">
          <textPath href={`#${id}`} startOffset="0" textLength="272" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-8 w-8 text-marigold" fill="currentColor">
          <path d="M24 4l3.6 16.4L44 24l-16.4 3.6L24 44l-3.6-16.4L4 24l16.4-3.6L24 4z" />
        </svg>
      </span>
    </div>
  );
}
