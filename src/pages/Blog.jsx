import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, Search } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { images } from '@/assets/images';
import { formatDate } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import PageHero from '@/components/layout/PageHero';
import SmartImage from '@/components/ui/SmartImage';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const categories = ['All', 'Himachal', 'International', 'Ladakh', 'Weekend'];

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const featured = blogPosts.find((post) => post.featured) || blogPosts[0];
  const filtered = blogPosts.filter((post) => {
    const matchesCategory = category === 'All' || post.category === category;
    const haystack = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase().trim());
  });
  const rest = filtered.filter((post) => post.slug !== featured.slug);

  return (
    <>
      <SEO
        title="Travel Journal"
        description="Practical guides, honest recommendations and travel inspiration from the Himalayan Trails team in Mohali."
        image={images.blog.spiti}
        path="/blog"
      />
      <PageHero
        eyebrow="The travel journal"
        title="Notes for the curious traveller."
        description="Field notes, honest guides and the things we wish someone had told us before we went."
        image={images.blog.spiti}
        compact
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <Reveal>
              <Link to={`/blog/${featured.slug}`} className="group block overflow-hidden rounded-3xl bg-white shadow-card">
                <div className="relative overflow-hidden">
                  <SmartImage
                    src={featured.image}
                    alt={featured.title}
                    className="aspect-[16/9] w-full"
                    imgClassName="group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-gold px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-navy-950">
                      Editor’s pick
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-[0.65rem] text-navy-400">
                    <span className="font-semibold uppercase tracking-[0.15em] text-teal-700">{featured.category}</span>
                    <span className="flex items-center gap-1"><CalendarDays size={12} /> {formatDate(featured.date)}</span>
                    <span>{featured.readTime} min read</span>
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-medium text-navy transition group-hover:text-gold-700 sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-500">{featured.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                    Read the story <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
                <p className="eyebrow">Browse the journal</p>
                <div className="relative mt-4">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search stories…"
                    aria-label="Search stories"
                    className="min-h-11 w-full rounded-xl border border-navy/10 bg-cream-50 pl-10 pr-4 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold transition',
                        category === item ? 'border-navy bg-navy text-white' : 'border-navy/10 text-navy-500 hover:border-navy/30',
                      )}
                    >
                      {item === 'All' ? 'All stories' : item}
                    </button>
                  ))}
                </div>
                <div className="mt-6 border-t border-navy/10 pt-5">
                  <p className="text-xs leading-relaxed text-navy-500">
                    Looking for something specific — a visa question, a route, a hotel recommendation? Ask us directly.
                  </p>
                  <Button to="/contact" variant="outline" size="sm" className="mt-4">
                    Ask a trip designer
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 flex items-center justify-between">
            <h2 className="font-display text-3xl text-navy">More from the road.</h2>
            <span className="text-xs text-navy-400">{filtered.length} stories</span>
          </div>

          {rest.length ? (
            <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal key={post.slug} delay={Math.min(index * 0.05, 0.2)}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                    <Link to={`/blog/${post.slug}`} className="overflow-hidden">
                      <SmartImage src={post.image} alt={post.title} className="aspect-[16/10]" imgClassName="group-hover:scale-105" />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-3 text-[0.6rem] text-navy-400">
                        <span className="font-semibold uppercase tracking-[0.15em] text-teal-700">{post.category}</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      <Link to={`/blog/${post.slug}`}>
                        <h3 className="mt-2 font-display text-xl leading-snug text-navy transition group-hover:text-gold-700">{post.title}</h3>
                      </Link>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-500">{post.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between border-t border-navy/5 pt-4 mt-5">
                        <span className="text-[0.65rem] text-navy-400">{formatDate(post.date)}</span>
                        <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="text-navy transition hover:text-gold-700">
                          <ArrowUpRight size={17} />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-navy/15 p-10 text-center text-sm text-navy-500">
              No stories match that search yet. Try another word or browse all stories.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
