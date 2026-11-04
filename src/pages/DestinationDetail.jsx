import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Route,
  Star,
  Wallet,
} from 'lucide-react';
import Seo from '@/components/seo/Seo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import PackageCard from '@/components/cards/PackageCard';
import Reveal from '@/components/ui/Reveal';
import NotFound from '@/pages/NotFound';
import { getDestinationBySlug } from '@/data/destinations';
import { getPackagesByDestination } from '@/data/packages';
import { formatCurrency, whatsappUrl } from '@/lib/utils';

export default function DestinationDetail() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return <NotFound />;
  }

  const relatedPackages = getPackagesByDestination(destination.slug);

  return (
    <>
      <Seo
        title={`${destination.name} Tours`}
        description={destination.summary}
        image={destination.image}
        type="article"
      />

      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.region}`}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-950/80 to-transparent" aria-hidden="true" />

        <div className="container-page flex min-h-[30rem] flex-col justify-end pb-14 pt-28 sm:min-h-[34rem] sm:pb-16 sm:pt-32">
          <div className="max-w-3xl">
            <Breadcrumbs
              light
              items={[{ label: 'Destinations', href: '/destinations' }, { label: destination.name }]}
            />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                {destination.type === 'domestic' ? 'India' : 'International'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold text-navy">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                {destination.rating.toFixed(1)} · {destination.reviewCount} reviews
              </span>
            </div>

            <h1 className="mt-4 font-display text-display-lg font-medium text-white sm:text-display-xl">
              {destination.name}
            </h1>
            <p className="mt-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold-300">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {destination.region}, {destination.country}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {destination.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" variant="gold" size="lg" icon={ArrowRight}>
                Plan this trip
              </Button>
              <Button href={whatsappUrl(`Hi Himalayan Trails! I would like to plan a trip to ${destination.name}.`)} target="_blank" rel="noreferrer" variant="light" size="lg" icon={MessageCircle} iconPosition="left">
                Ask a question
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Clock, label: 'Ideal duration', value: destination.idealDuration },
                { icon: CalendarDays, label: 'Best time', value: destination.bestTime },
                { icon: Wallet, label: 'Starting from', value: formatCurrency(destination.startingPrice) },
                { icon: Route, label: 'Region', value: destination.region },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-navy/5 bg-white p-4 shadow-soft">
                  <item.icon className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  <p className="mt-3 text-[0.6rem] uppercase tracking-[0.14em] text-navy-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-navy">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <span className="eyebrow">The place</span>
              <h2 className="mt-3 font-display text-display-md font-medium text-navy">
                Why {destination.name} works
              </h2>
              <div className="mt-5 space-y-4">
                {destination.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed text-navy-500">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-navy/5 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-2xl font-medium text-navy">Highlights</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-navy-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-navy/5 pt-5">
                {destination.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-cream-200 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-navy-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-medium text-navy">A glimpse of {destination.name}</h2>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {destination.gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`${destination.name} view ${index + 1}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-card">
              <div className="bg-navy-950 p-6 text-white">
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/50">
                  Trips from {formatCurrency(destination.startingPrice)}
                </span>
                <p className="mt-2 font-display text-2xl">Let&apos;s make it yours</p>
                <p className="mt-2 text-sm text-white/60">
                  Every itinerary can be adjusted for dates, pace, hotel category and budget.
                </p>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-start gap-3 text-sm text-navy-500">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                  <span>Best visited {destination.bestTime.toLowerCase()}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-navy-500">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                  <span>We suggest {destination.idealDuration} for a comfortable pace</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-navy-500">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                  <span>Pay 20% now, balance 15 days before departure</span>
                </div>

                <Button to="/contact" variant="primary" size="md" className="w-full" icon={ArrowRight}>
                  Request an itinerary
                </Button>
                <Button
                  href={whatsappUrl(`Hi Himalayan Trails! I am interested in a trip to ${destination.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  size="md"
                  className="w-full"
                  icon={MessageCircle}
                  iconPosition="left"
                >
                  WhatsApp us
                </Button>
                <p className="text-center text-[0.65rem] uppercase tracking-[0.14em] text-navy-300">
                  No obligation · reply within 24 hours
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedPackages.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Ready-made itineraries"
              title={`Packages featuring ${destination.name}`}
              description="Start with one of these, then tell us what you would change."
              align="between"
              action={
                <Button to="/packages" variant="ghost" size="sm" icon={ArrowRight}>
                  All packages
                </Button>
              }
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((tour, index) => (
                <Reveal key={tour.slug} delay={index * 0.06}>
                  <PackageCard tour={tour} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-page">
            <div className="rounded-2xl border border-navy/5 bg-cream p-8 text-center sm:p-12">
              <h2 className="font-display text-2xl text-navy">No fixed departure yet — but we can build one.</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-navy-500">
                This destination is available as a private trip. Share your dates and we will design a route around them.
              </p>
              <Button to="/contact" variant="primary" className="mt-6">
                Plan a private trip
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
