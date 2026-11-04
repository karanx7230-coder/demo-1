import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TestimonialCard({ testimonial, className }) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-2xl border border-navy/5 bg-white p-6 shadow-soft sm:p-7',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                'h-4 w-4',
                index < testimonial.rating ? 'fill-gold text-gold' : 'text-navy-200',
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <Quote className="h-7 w-7 text-gold-200" aria-hidden="true" />
      </div>

      <h3 className="mt-5 font-display text-lg font-medium text-navy">{testimonial.title}</h3>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-navy/5 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
          {testimonial.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-navy">{testimonial.name}</span>
          <span className="block text-xs text-navy-400">
            {testimonial.city} · {testimonial.trip}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
