import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Search } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { images } from '@/assets/images';
import { whatsappUrl } from '@/lib/utils';
import SEO from '@/components/seo/SEO';
import PageHero from '@/components/layout/PageHero';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const categories = ['All', 'Booking', 'Payments', 'Cancellation', 'Visa', 'Customisation', 'Groups', 'Travel', 'Safety'];

export default function FAQ() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = faqs.filter((faq) => {
    const matchesCategory = category === 'All' || faq.category === category;
    const haystack = `${faq.question} ${faq.answer}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase().trim());
  });

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers about booking, payments, cancellation, visas, group sizes and trip support at Himalayan Trails & Tours."
        image={images.home.intro}
        path="/faq"
      />
      <PageHero
        eyebrow="Good to know"
        title="Questions, answered honestly."
        description="The things travellers ask us most — from advance payments and cancellations to visas and altitude."
        image={images.home.intro}
        compact
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside>
            <div className="sticky top-28">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search questions…"
                  aria-label="Search FAQs"
                  className="min-h-11 w-full rounded-xl border border-navy/10 bg-white pl-10 pr-4 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-left text-xs font-medium transition',
                      category === item ? 'bg-navy text-white' : 'text-navy-500 hover:bg-cream-200 hover:text-navy',
                    )}
                  >
                    {item === 'All' ? 'All questions' : item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl text-navy">{category === 'All' ? 'All questions' : category}</h2>
              <span className="text-xs text-navy-400">{filtered.length} answers</span>
            </div>
            <Accordion items={filtered} defaultOpen={0} className="mt-5" />
            {!filtered.length ? (
              <p className="rounded-2xl border border-dashed border-navy/15 p-10 text-center text-sm text-navy-500">
                No answers match that search. Ask us directly and we’ll reply personally.
              </p>
            ) : null}

            <Reveal className="mt-10">
              <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
                <p className="eyebrow eyebrow-light">Still wondering?</p>
                <h2 className="mt-2 font-display text-2xl">We’d rather answer than guess.</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55">
                  Payment plans, visas, hotel upgrades, travelling with children — ask us anything. A real person will reply.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button to="/contact" size="sm">Send an enquiry <ArrowRight size={14} /></Button>
                  <Button href={whatsappUrl()} target="_blank" rel="noreferrer" variant="light" size="sm">
                    <MessageCircle size={14} /> WhatsApp
                  </Button>
                </div>
              </div>
            </Reveal>

            <p className="mt-8 text-xs text-navy-400">
              Looking for our policies? Read the <Link to="/privacy-policy" className="font-semibold text-teal-700">Privacy Policy</Link> or <Link to="/terms" className="font-semibold text-teal-700">Terms & Conditions</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
