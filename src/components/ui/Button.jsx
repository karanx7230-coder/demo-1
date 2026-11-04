import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const variants = {
  primary:
    'bg-navy text-white hover:bg-navy-800 shadow-soft hover:shadow-lifted focus-visible:ring-gold',
  gold: 'bg-gold text-navy hover:bg-gold-400 shadow-gold focus-visible:ring-navy',
  outline:
    'border border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white',
  light:
    'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-navy',
  ghost: 'bg-transparent text-navy hover:bg-navy/5',
  teal: 'bg-teal-600 text-white hover:bg-teal-700 shadow-soft',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm sm:text-base',
};

export default function Button({
  children,
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconPosition = 'right',
  disabled,
  ...props
}) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-smooth disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span>{children}</span>
      {Icon && iconPosition === 'right' ? (
        <Icon
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
