import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import BlogCard from '@/components/cards/BlogCard';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { images } from '@/assets/images';
import { blogPosts } from '@/data/blog';
import { cn, formatDate } from '@/lib/utils';

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    [],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesQuery =
        !term ||
        [post.title, post.excerpt, post.category, ...post.tags]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const featured = useMemo(
    () => blogPosts.find((post) => post.featured) || blogPosts[0],
    [],
  );

  const rest = filtered.filter((post) => post.slug !== featured.slug || query || category !== 'All');
  const showFeatured = !query && category === 'All';

  return (
    <>
      <Seo
        title="Travel Journal"
        description="Practical travel guides, packing lists and honest advice from the Himalayan Trails team."
        image={images.blog.weekendGetaways}
      />

      <PageHero
        image={images.blog.weekendGetaways}
        eyebrow="The travel journal"
        title="Notes from the road"
        description="Honest guides, packing lists and the kind of advice we give our own friends before they travel."
        breadcrumbs={[{ label: 'Journal' }]}
        size="lg"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gold-300" aria-hidden="true" />
            <strong className="text-white">{blogPosts.length}</strong> field guides
          </span>
          <span>Written by the team that plans the trips</span>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          {showFeatured ? (
            <Reveal className="mb-12">
              <div className="grid overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-card lg:grid-cols-2">
                <div className="relative min-h-[16rem] overflow-hidden lg:min-h-full">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-navy">
                    Editor&apos;s pick
                  </span>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em]">
                    <span className="font-semibold text-teal-700">{featured.category}</span>
                    <span className="text-navy-300">·</span>
                    <span className="text-navy-400">{formatDate(featured.date)}</span>
                    <span className="text-navy-300">·</span>
                    <span className="text-navy-400">{featured.readTime} min read</span>
                  </div>
                  <h2 className="mt-4 font-display text-display-md font-medium leading-tight text-navy">
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-navy-500">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                      {featured.author.initials}
                    </span>
                    <span className="text-sm">
                      <span className="block font-semibold text-navy">{featured.author.name}</span>
                      <span className="block text-xs text-navy-400">{featured.author.role}</span>
                    </span>
                  </div>
                  <Button
                    to={`/blog/${featured.slug}`}
                    variant="primary"
                    size="md"
                    className="mt-7 self-start"
                    icon={ArrowRight}
                  >
                    Read the guide
                  </Button>
                </div>
              </div>
            </Reveal>
          ) : null}

          <div className="flex flex-col gap-4 rounded-2xl border border-navy/5 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
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
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
              <label htmlFor="blog-search" className="sr-only">
                Search the journal
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the journal…"
                className="w-full rounded-full border border-navy/10 bg-cream-50 py-2.5 pl-11 pr-4 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none sm:w-64"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-navy-400">
            Showing <span className="font-semibold text-navy">{rest.length}</span>{' '}
            {rest.length === 1 ? 'article' : 'articles'}
            {query ? ` for “${query}”` : ''}
          </p>

          {rest.length ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal key={post.slug} delay={(index % 3) * 0.05}>
                  <BlogCard post={post} className="h-full" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                title="No articles match that search"
                description="Try a different topic, or clear the filters to browse everything."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery('');
                      setCategory('All');
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
    </>
  );
}
