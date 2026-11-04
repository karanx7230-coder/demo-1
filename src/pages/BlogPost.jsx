import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Copy, MessageCircle, Share2 } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import BlogCard from '@/components/cards/BlogCard';
import SectionHeading from '@/components/ui/SectionHeading';
import NotFound from '@/pages/NotFound';
import { blogPosts, getPostBySlug } from '@/data/blog';
import { site } from '@/config/site';
import { formatDate, whatsappUrl } from '@/lib/utils';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return <NotFound />;
  }

  const related = blogPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .concat(blogPosts.filter((item) => item.slug !== post.slug && item.category !== post.category))
    .slice(0, 3);

  const shareUrl = `${site.url}/blog/${post.slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
      />

      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <img src={post.image} alt={post.title} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/35" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950/80 to-transparent" aria-hidden="true" />

        <div className="container-page flex min-h-[28rem] flex-col justify-end pb-14 pt-28 sm:min-h-[32rem] sm:pb-16 sm:pt-32">
          <div className="max-w-3xl">
            <Breadcrumbs
              light
              items={[{ label: 'Journal', href: '/blog' }, { label: post.category }]}
            />
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em]">
              <span className="rounded-full bg-gold px-3 py-1 font-bold text-navy">{post.category}</span>
              <span className="text-white/60">{formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1.5 text-white/60">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime} min read
              </span>
            </div>
            <h1 className="mt-4 font-display text-display-lg font-medium text-white sm:text-display-xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white backdrop-blur">
                {post.author.initials}
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-white">{post.author.name}</span>
                <span className="block text-xs text-white/50">{post.author.role}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
          <article className="min-w-0">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="prose-editorial mt-10">
              {post.sections.map((section) => (
                <section key={section.heading} className="mb-10">
                  <h2 className="font-display text-2xl font-medium text-navy sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="mt-4 leading-relaxed text-navy-500">
                      {paragraph}
                    </p>
                  ))}
                  {section.list?.length ? (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-navy-500">
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                            <Check className="h-2.5 w-2.5" aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="rounded-2xl border-l-4 border-gold bg-gold-50 p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-700">
                The takeaway
              </p>
              <p className="mt-2 font-display text-xl leading-relaxed text-navy">{post.takeaway}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cream-200 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-navy-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-navy/5 bg-white p-6 shadow-soft sm:flex-row sm:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg text-white">
                {post.author.initials}
              </span>
              <div className="flex-1">
                <p className="font-display text-lg text-navy">{post.author.name}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-700">{post.author.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">
                  Part of the Himalayan Trails team in Mohali. Writes about the routes we travel and
                  the details that make a trip work.
                </p>
              </div>
              <Button to="/contact" variant="outline" size="sm" icon={ArrowRight}>
                Plan a trip
              </Button>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 transition-colors hover:text-navy">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to the journal
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 rounded-full border border-navy/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-500 transition-colors hover:border-navy hover:text-navy"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  {copied ? 'Link copied' : 'Copy link'}
                </button>
                <a
                  href={whatsappUrl(`${post.title} — ${shareUrl}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-500 transition-colors hover:border-navy hover:text-navy"
                >
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Share
                </a>
              </div>
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-white/50">Planning a trip?</p>
              <h2 className="mt-2 font-display text-2xl">Turn this guide into an itinerary.</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Tell us your dates and we will build a route around them — with honest advice on
                what is worth your time.
              </p>
              <Button to="/contact" variant="gold" size="sm" className="mt-5 w-full" icon={ArrowRight}>
                Start planning
              </Button>
              <a
                href={whatsappUrl(`Hi Himalayan Trails! I read your guide on ${post.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:bg-white hover:text-navy"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Ask a question
              </a>
            </div>

            <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
              <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                In this guide
              </h2>
              <ul className="mt-3 space-y-2">
                {post.sections.map((section) => (
                  <li key={section.heading} className="text-sm leading-snug text-navy-500">
                    {section.heading}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Keep reading"
            title="More from the journal"
            description="Other guides our travellers found useful."
            align="between"
            action={
              <Button to="/blog" variant="ghost" size="sm" icon={ArrowRight}>
                All articles
              </Button>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} className="h-full" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
