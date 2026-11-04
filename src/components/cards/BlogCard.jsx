import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function BlogCard({ post, className, horizontal = false }) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card',
        horizontal && 'sm:flex-row',
        className,
      )}
    >
      <Link
        to={`/blog/${post.slug}`}
        className={cn(
          'block overflow-hidden',
          horizontal ? 'sm:w-2/5' : '',
        )}
      >
        <div className={cn('overflow-hidden', horizontal ? 'aspect-[4/3] sm:h-full' : 'aspect-[16/10]')}>
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col p-5', horizontal && 'sm:justify-center sm:p-7')}>
        <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em]">
          <span className="rounded-full bg-gold-50 px-3 py-1 font-semibold text-gold-700">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-navy-400">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readTime} min read
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-medium leading-snug text-navy">
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-gold-700">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-500">{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[0.6rem] font-semibold text-white">
              {post.author.initials}
            </span>
            <span className="text-xs text-navy-400">
              {post.author.name} · {formatDate(post.date)}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/10 text-navy transition-all hover:border-navy hover:bg-navy hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
