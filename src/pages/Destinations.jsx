import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import DestinationCard from '@/components/cards/DestinationCard';
import EmptyState from '@/components/ui/EmptyState';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { images } from '@/assets/images';
import { destinations } from '@/data/destinations';
import { cn } from '@/lib/utils';

const typeFilters = [
  { id: 'all', label: 'All destinations' },
  { id: 'domestic', label: 'India' },
  { id: 'international', label: 'International' },
];

const sortOptions = [
  { id: 'featured', label: 'Most popular' },
  { id: 'price-low', label: 'Price: low to high' },
  { id: 'price-high', label: 'Price: high to low' },
  { id: 'rating', label: 'Highest rated' },
];

export default function Destinations() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('featured');

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = destinations.filter((destination) => {
      const matchesType = type === 'all' || destination.type === type;
      const matchesQuery =
        !term ||
        [destination.name, destination.region, destination.country, destination.tagline, ...destination.tags]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return matchesType && matchesQuery;
    });

    const sorted = [...filtered];
    if (sort === 'price-low') sorted.sort((a, b) => a.startingPrice - b.startingPrice);
    if (sort === 'price-high') sorted.sort((a, b) => b.startingPrice - a.startingPrice);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'featured') sorted.sort((a, b) => Number(b.featured) - Number(a.featured));

    return sorted;
  }, [query, type, sort]);

  return (
    <>
      <Seo
        title="Destinations"
        description="Explore handpicked destinations across India and the world — from Himachal and Kashmir to Dubai, Bali and Europe."
        image={images.destinations.kashmir}
      />

      <PageHero
        image={images.destinations.kashmir}
        eyebrow="Destinations"
        title="A world of places, carefully chosen"
        description="Nineteen destinations across India and beyond, each one travelled and tested by our team. Find the landscape that fits your next break."
        breadcrumbs={[{ label: 'Destinations' }]}
        size="lg"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
          <span><strong className="text-white">{destinations.length}</strong> destinations</span>
          <span><strong className="text-white">12</strong> in India</span>
          <span><strong className="text-white">7</strong> international</span>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="rounded-2xl border border-navy/5 bg-white p-4 shadow-soft sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {typeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setType(filter.id)}
                    className={cn(
                      'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                      type === filter.id
                        ? 'bg-navy text-white'
                        : 'border border-navy/10 text-navy-500 hover:border-navy/30 hover:text-navy',
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
                  <label htmlFor="destination-search" className="sr-only">
                    Search destinations
                  </label>
                  <input
                    id="destination-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a place or region…"
                    className="w-full rounded-full border border-navy/10 bg-cream-50 py-2.5 pl-11 pr-4 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none sm:w-64"
                  />
                </div>

                <div className="relative">
                  <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
                  <label htmlFor="destination-sort" className="sr-only">
                    Sort destinations
                  </label>
                  <select
                    id="destination-sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="w-full appearance-none rounded-full border border-navy/10 bg-cream-50 py-2.5 pl-11 pr-8 text-sm text-navy focus:border-gold focus:outline-none sm:w-56"
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
          </div>

          <p className="mt-6 text-sm text-navy-400">
            Showing <span className="font-semibold text-navy">{results.length}</span>{' '}
            {results.length === 1 ? 'destination' : 'destinations'}
            {query ? ` for “${query}”` : ''}
          </p>

          {results.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((destination, index) => (
                <Reveal key={destination.slug} delay={(index % 4) * 0.04}>
                  <DestinationCard destination={destination} className="h-full" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                title="No destinations match that search"
                description="Try a broader place name, or clear your filters to see everything."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery('');
                      setType('all');
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <img src={images.home.intro} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-15" />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow eyebrow-light justify-center">Not sure where to go?</span>
              <h2 className="mt-4 font-display text-display-md text-white">Tell us the feeling, we&apos;ll find the place.</h2>
              <p className="mt-3 text-white/65">
                Share your dates, budget and travel style. We will suggest two or three destinations that fit — honestly.
              </p>
              <Button to="/contact" variant="gold" size="lg" className="mt-7">
                Get a recommendation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
