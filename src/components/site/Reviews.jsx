import { reviews } from '@/data/business';
import { Reveal, SectionLabel, Stars } from './primitives';
import { Tilt } from './spatial';

function ReviewCard({ review }) {
  return (
    <Tilt className="w-[82vw] shrink-0 rounded-[1.5rem] sm:w-[24rem]" max={5}>
    <figure className="flex h-full w-full flex-col justify-between rounded-[1.5rem] border border-ink/10 bg-cream p-6 sm:p-7">
      <div>
        <Stars />
        <blockquote className="mt-5 font-display text-[1.25rem] font-light leading-snug text-ink/85 sm:text-[1.4rem]">
          “{review.quote}”
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine/10 font-display text-sm font-medium text-pine">
          {review.name.charAt(0)}
        </span>
        <span className="text-[0.78rem]">
          <span className="block font-semibold text-ink">{review.name}</span>
          <span className="block text-ink/45">{review.city}</span>
        </span>
      </figcaption>
    </figure>
    </Tilt>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative z-[16] -mt-6 overflow-hidden rounded-t-[2rem] bg-cream py-20 sm:rounded-t-[2.5rem] sm:py-28 lg:py-32"
      aria-labelledby="reviews-heading"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel number="07">Kind words</SectionLabel>
            <h2 id="reviews-heading" className="mt-5 font-display text-display-xl font-light text-ink">
              People come back.
              <br />
              <em className="font-normal italic text-pine">That is the review.</em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.1}>
            <div className="flex items-end gap-5">
              <p className="font-display text-[4.5rem] font-light leading-none tracking-tight text-ink">5.0</p>
              <div className="pb-2">
                <Stars className="text-pine" />
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-ink/45">
                  From riders across Punjab
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="pause-on-hover mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee-slow gap-4 sm:gap-5">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4 sm:gap-5" aria-hidden={copy === 1 || undefined}>
              {reviews.map((review) => (
                <ReviewCard key={`${copy}-${review.name}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-page mt-8">
        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-ink/35">
          Reviews shared by our riders · Names shortened for privacy
        </p>
      </div>
    </section>
  );
}
