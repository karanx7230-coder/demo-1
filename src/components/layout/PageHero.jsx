import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';

export default function PageHero({ eyebrow, title, description, image, children, compact = false }) {
  return (
    <section className={`relative overflow-hidden bg-navy-950 ${compact ? 'pb-14 pt-32 sm:pt-36' : 'pb-20 pt-36 sm:pb-24 sm:pt-44'}`}>
      {image ? (
        <>
          <SmartImage src={image} alt="" className="absolute inset-0 h-full w-full" loading="eager" />
          <div className="absolute inset-0 bg-navy-950/72" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
        </>
      ) : (
        <>
          <div className="absolute -right-32 top-0 size-[28rem] rounded-full bg-teal/10 blur-3xl" />
          <div className="absolute -left-32 bottom-0 size-[28rem] rounded-full bg-gold/10 blur-3xl" />
        </>
      )}

      <div className="container-page relative">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="eyebrow eyebrow-light mb-4">
              <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-display-xl font-medium text-white">{title}</h1>
          {description ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{description}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>

      <Link
        to="/destinations"
        className="absolute bottom-6 right-6 hidden items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40 transition hover:text-gold-300 sm:flex"
      >
        Find your place <ArrowUpRight size={13} />
      </Link>
    </section>
  );
}
