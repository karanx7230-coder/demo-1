import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import PackageCard from '@/components/cards/PackageCard';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { images } from '@/assets/images';
import { packages, packageCategories } from '@/data/packages';
import { destinations } from '@/data/destinations';
import { cn } from '@/lib/utils';

const durationFilters = [
  { id: 'any', label: 'Any duration' },
  { id: 'short', label: '1–3 days' },
  { id: 'medium', label: '4–6 days' },
  { id: 'long', label: '7–9 days' },
  { id: 'epic', label: '10+ days' },
];

const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-low', label: 'Price: low to high' },
  { id: 'price-high', label: 'Price: high to low' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'duration', label: 'Longest first' },
];

function matchesDuration(tour, duration) {
  if (duration === 'any') return true;
  if (duration === 'short') return tour.duration.days <= 3;
  if (duration === 'medium') return tour.duration.days >= 4 && tour.duration.days <= 6;
  if (duration === 'long') return tour.duration.days >= 7 && tour.duration.days <= 9;
  return tour.duration.days >= 10;
}

export default function Packages() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [destination, setDestination] = useState(searchParams.get('destination') || 'All');
  const [duration, setDuration] = useState('any');
  const [sort, setSort] = useState('recommended');

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = packages.filter((tour) => {
      const matchesCategory = category === 'All' || tour.category === category;
      const matchesDestination = destination === 'All' || tour.destinationSlug === destination;
      const matchesDurationFilter = matchesDuration(tour, duration);
      const matchesQuery =
        !term ||
        [tour.title, tour.destination, tour.category, tour.summary, tour.difficulty, ...tour.departures]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesDestination && matchesDurationFilter && matchesQuery;
    });

    const sorted = [...filtered];
    if (sort === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'duration') sorted.sort((a, b) => b.duration.days - a.duration.days);
    if (sort === 'recommended') sorted.sort((a, b) => Number(b.featured) - Number(a.featured));

    return sorted;
  }, [query, category, destination, duration, sort]);

  const hasFilters = query || category !== 'All' || destination !== 'All' || duration !== 'any';

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setDestination('All');
    setDuration('any');
    setSort('recommended');
  };

  return (
    <>
      <Seo
        title="Tour Packages"
        description="Browse curated domestic and international tour packages from Chandigarh, Mohali and Delhi — with transparent pricing and flexible itineraries."
        image={images.destinations.ladakh}
      />

      <PageHero
        image={images.destinations.ladakh}
        eyebrow="Tour packages"
        title="Journeys designed with intention"
        description="Small groups, private departures and honest pricing. Every itinerary below can be tailored to your dates and your people."
        breadcrumbs={[{ label: 'Tour Packages' }]}
        size="lg"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
          <span><strong className="text-white">{packages.length}</strong> curated trips</span>
          <span>Departures from <strong className="text-white">Chandigarh, Mohali &amp; Delhi</strong></span>
          <span><strong className="text-white">20%</strong> advance to confirm</span>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="rounded-2xl border border-navy/5 bg-white p-4 shadow-soft sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
              <div>
                <label htmlFor="package-search" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Search
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
                  <input
                    id="package-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Spiti, honeymoon, Ladakh…"
                    className="w-full rounded-xl border border-navy/10 bg-cream-50 py-3 pl-11 pr-4 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="package-destination" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Destination
                </label>
                <select
                  id="package-destination"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
                >
                  <option value="All">All destinations</option>
                  {destinations.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="package-duration" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Duration
                </label>
                <select
                  id="package-duration"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
                >
                  {durationFilters.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="package-sort" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Sort by
                </label>
                <div className="relative">
                  <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
                  <select
                    id="package-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-navy/10 bg-cream-50 py-3 pl-11 pr-8 text-sm text-navy focus:border-gold focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-navy/5 pt-5">
              {packageCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={cn(
                    'rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors',
                    category === item
                      ? 'bg-navy text-white'
                      : 'border border-navy/10 text-navy-500 hover:border-navy/30 hover:text-navy',
                  )}
                >
                  {item}
                </button>
              ))}
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gold-700 transition-colors hover:bg-gold-50"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear all
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-7 flex items-end justify-between gap-4">
            <p className="text-sm text-navy-400">
              Showing <span className="font-semibold text-navy">{results.length}</span>{' '}
              {results.length === 1 ? 'package' : 'packages'}
              {query ? ` for “${query}”` : ''}
            </p>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((tour, index) => (
                <Reveal key={tour.slug} delay={(index % 3) * 0.05}>
                  <PackageCard tour={tour} className="h-full" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                title="No packages match those filters"
                description="Try a different destination, duration or travel style — or let us build something custom."
                action={
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear filters
                    </Button>
                    <Button to="/contact" variant="primary" size="sm">
                      Plan a custom trip
                    </Button>
                  </div>
                }
              />
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <div className="grid gap-6 rounded-3xl border border-navy/5 bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">Something more personal?</span>
              <h2 className="mt-3 font-display text-display-md font-medium text-navy">
                We build private trips from scratch.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-navy-500">
                A milestone birthday, a multi-family holiday, a corporate offsite or a honeymoon
                with very specific ideas — tell us the brief and we will design the route.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button to="/contact" variant="primary" icon={ArrowRight}>
                Start with a brief
              </Button>
              <Button to="/destinations" variant="outline">
                Browse destinations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
