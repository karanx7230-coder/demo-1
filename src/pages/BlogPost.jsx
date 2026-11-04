import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Quote } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import SmartImage from '@/components/ui/SmartImage';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <NotFound />;

  const related = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const fallbackRelated = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const suggestions = related.length ? related : fallbackRelated;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        path={`/blog/${post.slug}`}
        type="article"
      />

      <article>
        <header className="relative overflow-hidden bg-navy-950 pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
          <SmartImage src={post.image} alt="" className="absolute inset-0 h-full w-full opacity-30" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/45" />
          <div className="container-page relative max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs text-white/55 transition hover:text-white">
              <ArrowLeft size={14} /> Back to the journal
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge tone="glass">{post.category}</Badge>
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} tone="glass">{tag}</Badge>
              ))}
            </div>
            <h1 className="mt-5 text-display-lg font-medium text-white">{post.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-white/55">
              <span className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-gold text-[0.6rem] font-bold text-navy-950">{post.author.initials}</span>
                {post.author.name} · {post.author.role}
              </span>
              <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><Clock3 size={13} /> {post.readTime} min read</span>
            </div>
          </div>
        </header>

        <div className="container-page py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            {post.sections.map((section, index) => (
              <Reveal key={section.heading} delay={0}>
                <section className={index === 0 ? '' : 'mt-10'}>
                  <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-[1.85] text-navy-500">{paragraph}</p>
                    ))}
                  </div>
                  {section.list ? (
                    <ul className="mt-5 space-y-2.5 rounded-2xl border border-navy/5 bg-cream-200/50 p-5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy-600">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}

            <Reveal className="mt-10">
              <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
                <Quote size={24} className="text-gold-300" />
                <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">{post.takeaway}</p>
              </div>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cream-200 px-3 py-1.5 text-[0.65rem] font-semibold text-navy-500">#{tag}</span>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-navy/5 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-gold-100 font-display text-lg text-gold-800">{post.author.initials}</span>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.16em] text-navy-400">Written by</p>
                  <p className="font-display text-xl text-navy">{post.author.name}</p>
                  <p className="text-xs text-navy-400">{post.author.role}</p>
                </div>
              </div>
              <Button to="/contact" size="sm">Plan a trip with us <ArrowRight size={14} /></Button>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-navy/10 py-14">
        <div className="container-page">
          <h2 className="font-display text-3xl text-navy">Keep reading.</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {suggestions.map((item) => (
              <Link key={item.slug} to={`/blog/${item.slug}`} className="group flex gap-4 rounded-2xl border border-navy/5 bg-white p-3 shadow-soft transition hover:shadow-card">
                <SmartImage src={item.image} alt={item.title} className="size-24 shrink-0 rounded-xl" />
                <div className="min-w-0 py-1">
                  <p className="text-[0.58rem] uppercase tracking-[0.14em] text-teal-700">{item.category}</p>
                  <h3 className="mt-1 line-clamp-2 font-display text-base leading-snug text-navy group-hover:text-gold-700">{item.title}</h3>
                  <p className="mt-2 text-[0.65rem] text-navy-400">{item.readTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
