import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import Seo from '@/components/seo/Seo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import SectionHeading from '@/components/ui/SectionHeading';
import PackageCard from '@/components/cards/PackageCard';
import Reveal from '@/components/ui/Reveal';
import NotFound from '@/pages/NotFound';
import { bookingSteps } from '@/config/navigation';
import { site } from '@/config/site';
import { useWishlist } from '@/context/WishlistContext';
import { getPackageBySlug, featuredPackages } from '@/data/packages';
import { getDestinationBySlug } from '@/data/destinations';
import { cn, formatCurrency, formatDate, whatsappUrl } from '@/lib/utils';

const today = new Date().toISOString().split('T')[0];

function BookingWidget({ tour }) {
  const [step, setStep] = useState(0);
  const [travellers, setTravellers] = useState(2);
  const [departure, setDeparture] = useState(tour.departures[0]);
  const [date, setDate] = useState('');
  const [details, setDetails] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [reference] = useState(() => `HT${Math.floor(100000 + Math.random() * 900000)}`);

  const total = tour.price * travellers;
  const advance = Math.round((total * site.booking.advancePercent) / 100);
  const balance = total - advance;

  const canContinue = step === 0 || (step === 1 && Boolean(date));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-navy/5 bg-white p-6 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-navy">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-500">
          Thank you, {details.name.split(' ')[0] || 'traveller'}. Your request for{' '}
          <strong className="text-navy">{tour.title}</strong> is with our team. We will reply within
          24 hours to confirm availability.
        </p>
        <div className="mt-5 rounded-xl bg-cream p-4 text-left text-sm">
          <div className="flex justify-between py-1">
            <span className="text-navy-400">Reference</span>
            <span className="font-semibold text-navy">{reference}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-navy-400">Travellers</span>
            <span className="font-semibold text-navy">{travellers}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-navy-400">Departure</span>
            <span className="font-semibold text-navy">{formatDate(date)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-navy-400">Advance to pay</span>
            <span className="font-semibold text-navy">{formatCurrency(advance)}</span>
          </div>
        </div>
        <div className="mt-5 space-y-2">
          <Button
            href={whatsappUrl(`Hi Himalayan Trails! I have requested ${tour.title} (ref ${reference}).`)}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className="w-full"
            icon={MessageCircle}
            iconPosition="left"
          >
            Continue on WhatsApp
          </Button>
          <Button to="/packages" variant="outline" className="w-full">
            Browse more trips
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-card">
      <div className="border-b border-navy/5 bg-navy-950 p-6 text-white">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/50">From</span>
        <div className="mt-1 flex items-end gap-2">
          <span className="font-display text-3xl font-semibold">{formatCurrency(tour.price)}</span>
          <span className="pb-1 text-sm text-white/50">per person</span>
        </div>
        <p className="mt-2 text-xs text-white/55">
          {tour.duration.days} days · {tour.duration.nights} nights · {tour.groupSize}
        </p>
      </div>

      <div className="p-6">
        <ol className="flex items-center gap-2" aria-label="Booking steps">
          {bookingSteps.map((item, index) => (
            <li key={item.label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold',
                  index < step
                    ? 'bg-teal-600 text-white'
                    : index === step
                      ? 'bg-navy text-white'
                      : 'bg-cream-200 text-navy-400',
                )}
              >
                {index < step ? <Check className="h-3 w-3" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  'text-[0.6rem] font-semibold uppercase tracking-[0.1em]',
                  index === step ? 'text-navy' : 'text-navy-400',
                )}
              >
                {item.shortLabel}
              </span>
              {index < bookingSteps.length - 1 ? <span className="h-px flex-1 bg-navy/10" /> : null}
            </li>
          ))}
        </ol>

        <div className="mt-6 min-h-[13rem]">
          {step === 0 ? (
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                Number of travellers
              </label>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-navy/10 p-2">
                <button
                  type="button"
                  onClick={() => setTravellers((value) => Math.max(1, value - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy/10 text-navy transition-colors hover:bg-navy hover:text-white"
                  aria-label="Remove a traveller"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="font-display text-xl text-navy">
                  {travellers} <span className="text-sm text-navy-400">{travellers === 1 ? 'traveller' : 'travellers'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setTravellers((value) => Math.min(20, value + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy/10 text-navy transition-colors hover:bg-navy hover:text-white"
                  aria-label="Add a traveller"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <label htmlFor="booking-departure" className="mt-5 block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                Departure city
              </label>
              <select
                id="booking-departure"
                value={departure}
                onChange={(event) => setDeparture(event.target.value)}
                className="mt-2 w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
              >
                {tour.departures.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <label htmlFor="booking-date" className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy-400">
                Preferred travel date
              </label>
              <input
                id="booking-date"
                type="date"
                min={today}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
              />
              <div className="mt-4 rounded-xl bg-cream p-4">
                <p className="flex items-start gap-2 text-xs leading-relaxed text-navy-500">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                  Best time for this trip is {tour.bestTime}. We will confirm exact departure
                  availability after your request.
                </p>
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs text-navy-400">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                Free cancellation up to {site.booking.freeCancellationDays} days before departure.
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <form id="booking-form" onSubmit={handleSubmit} className="space-y-3">
              <div className="rounded-xl bg-cream p-4 text-sm">
                <div className="flex justify-between py-0.5">
                  <span className="text-navy-400">{tour.title}</span>
                  <span className="font-semibold text-navy">{formatCurrency(tour.price)} × {travellers}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-navy-400">Departure</span>
                  <span className="font-semibold text-navy">{departure} · {formatDate(date)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-navy/10 pt-2">
                  <span className="text-navy-400">Total</span>
                  <span className="font-semibold text-navy">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-navy-400">Pay now ({site.booking.advancePercent}%)</span>
                  <span className="font-semibold text-gold-700">{formatCurrency(advance)}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-navy-400">Balance later</span>
                  <span className="font-semibold text-navy">{formatCurrency(balance)}</span>
                </div>
              </div>

              <div>
                <label htmlFor="booking-name" className="sr-only">Full name</label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  placeholder="Full name"
                  value={details.name}
                  onChange={(event) => setDetails({ ...details, name: event.target.value })}
                  className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-phone" className="sr-only">Phone</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    placeholder="Phone"
                    value={details.phone}
                    onChange={(event) => setDetails({ ...details, phone: event.target.value })}
                    className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="booking-email" className="sr-only">Email</label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    placeholder="Email"
                    value={details.email}
                    onChange={(event) => setDetails({ ...details, email: event.target.value })}
                    className="w-full rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="booking-notes" className="sr-only">Notes</label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  placeholder="Anything we should know? (optional)"
                  value={details.notes}
                  onChange={(event) => setDetails({ ...details, notes: event.target.value })}
                  className="w-full resize-none rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                />
              </div>
            </form>
          ) : null}
        </div>

        <div className="mt-4 flex gap-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((value) => value - 1)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-navy/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:border-navy"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back
            </button>
          ) : null}

          {step < 2 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((value) => value + 1)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              form="booking-form"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-400"
            >
              Send request
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-[0.6rem] uppercase tracking-[0.14em] text-navy-300">
          No payment taken yet · reply within 24 hours
        </p>
      </div>
    </div>
  );
}

export default function PackageDetail() {
  const { slug } = useParams();
  const tour = getPackageBySlug(slug);
  const { isSaved, toggleItem } = useWishlist();

  if (!tour) {
    return <NotFound />;
  }

  const saved = isSaved(tour.slug);
  const destination = getDestinationBySlug(tour.destinationSlug);
  const sameDestination = featuredPackages.filter(
    (item) => item.destinationSlug === tour.destinationSlug && item.slug !== tour.slug,
  );
  const fill = featuredPackages.filter(
    (item) => item.slug !== tour.slug && !sameDestination.some((match) => match.slug === item.slug),
  );
  const related = [...sameDestination, ...fill].slice(0, 3);

  const itineraryItems = tour.itinerary.map((day) => ({
    title: day.title,
    meta: `Day ${day.day}`,
    content: day.description,
  }));

  return (
    <>
      <Seo
        title={tour.title}
        description={tour.summary}
        image={tour.image}
        type="article"
      />

      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <img
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/25" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-950/80 to-transparent" aria-hidden="true" />

        <div className="container-page flex min-h-[31rem] flex-col justify-end pb-14 pt-28 sm:min-h-[35rem] sm:pb-16 sm:pt-32">
          <div className="max-w-3xl">
            <Breadcrumbs
              light
              items={[
                { label: 'Tour Packages', href: '/packages' },
                { label: tour.title },
              ]}
            />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-navy">
                {tour.badge}
              </span>
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                {tour.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold text-navy">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                {tour.rating.toFixed(1)} · {tour.reviewCount} reviews
              </span>
            </div>

            <h1 className="mt-4 font-display text-display-lg font-medium text-white sm:text-display-xl">
              {tour.title}
            </h1>
            <p className="mt-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold-300">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {destination ? (
                <Link to={`/destinations/${destination.slug}`} className="transition-colors hover:text-white">
                  {tour.destination}
                </Link>
              ) : (
                tour.destination
              )}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {tour.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {tour.duration.days} days / {tour.duration.nights} nights
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {tour.groupSize}
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {tour.difficulty}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {tour.bestTime}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => toggleItem(tour.slug)}
                aria-pressed={saved}
                className={cn(
                  'inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors',
                  saved
                    ? 'border-gold bg-gold text-navy'
                    : 'border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-navy',
                )}
              >
                <Heart className={cn('h-4 w-4', saved && 'fill-navy')} aria-hidden="true" />
                {saved ? 'Saved to your shortlist' : 'Save this trip'}
              </button>
              <Button
                href={whatsappUrl(`Hi Himalayan Trails! I'd like to know more about ${tour.title}.`)}
                target="_blank"
                rel="noreferrer"
                variant="gold"
                size="sm"
                icon={MessageCircle}
                iconPosition="left"
              >
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={tour.gallery[0]}
                alt={`${tour.title} view`}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {tour.gallery.slice(1, 4).map((image, index) => (
                <div key={`${image}-${index}`} className="overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={`${tour.title} gallery ${index + 2}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10">
              <span className="eyebrow">The itinerary</span>
              <h2 className="mt-3 font-display text-display-md font-medium text-navy">
                {tour.duration.days} days, paced properly
              </h2>
              <p className="mt-3 leading-relaxed text-navy-500">
                A day-by-day outline of the journey. We keep the plan flexible enough for weather,
                road conditions and the occasional long lunch.
              </p>
              <Accordion items={itineraryItems} defaultOpen={0} className="mt-7" />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-display text-xl text-navy">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  What&apos;s included
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-navy-500">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-display text-xl text-navy">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </span>
                  Not included
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-navy-500">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-navy/5 bg-white p-6 shadow-soft sm:grid-cols-3">
              {[
                { icon: Wallet, label: 'Booking advance', value: `${site.booking.advancePercent}% of total` },
                { icon: CalendarDays, label: 'Free cancellation', value: `Up to ${site.booking.freeCancellationDays} days` },
                { icon: ShieldCheck, label: 'Trip support', value: '24/7 coordinator' },
              ].map((item) => (
                <div key={item.label}>
                  <item.icon className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  <p className="mt-2 text-[0.6rem] uppercase tracking-[0.14em] text-navy-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-navy">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-cream-200/70 p-6">
              <h3 className="flex items-center gap-2 font-display text-lg text-navy">
                <Info className="h-4 w-4 text-gold-700" aria-hidden="true" />
                Good to know
              </h3>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-navy-500 sm:grid-cols-2">
                <li>Departures available from {tour.departures.join(', ')}.</li>
                <li>Transport: {tour.transport}.</li>
                <li>Prices are per person on twin-sharing basis.</li>
                <li>Itinerary may shift slightly due to weather or road conditions.</li>
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <BookingWidget tour={tour} />

            <div className="mt-4 rounded-2xl border border-navy/5 bg-white p-5 shadow-soft">
              <p className="text-sm font-semibold text-navy">Prefer to talk it through?</p>
              <p className="mt-1 text-xs leading-relaxed text-navy-400">
                A real coordinator can answer questions about pacing, hotels and add-ons.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={whatsappUrl(`Hi Himalayan Trails! I have a question about ${tour.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-800"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp {site.contact.whatsappDisplay}
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-navy-500 transition-colors hover:text-navy"
                >
                  <ChevronRight className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  Call {site.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="You might also like"
            title="More trips worth considering"
            description="Similar journeys our travellers have enjoyed."
            align="between"
            action={
              <Button to="/packages" variant="ghost" size="sm" icon={ArrowRight}>
                All packages
              </Button>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06}>
                <PackageCard tour={item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
