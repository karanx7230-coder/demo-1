import { useMemo, useState } from 'react';
import { ArrowRight, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { images } from '@/assets/images';
import { site } from '@/config/site';
import { faqs } from '@/data/faqs';
import { cn, whatsappUrl } from '@/lib/utils';

export default function FAQ() {
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(faqs.map((item) => item.category)))],
    [],
  );

  const filtered = useMemo(
    () => (category === 'All' ? faqs : faqs.filter((item) => item.category === category)),
    [category],
  );

  return (
    <>
      <Seo
        title="FAQs"
        description="Answers to common questions about booking, payments, cancellations, visas and travelling with Himalayan Trails & Tours."
        image={images.destinations.manali}
      />

      <PageHero
        image={images.destinations.manali}
        eyebrow="Frequently asked"
        title="The things people ask us most"
        description="Clear answers on bookings, payments, visas and what happens when plans change. If yours is not here, just ask."
        breadcrumbs={[{ label: 'FAQs' }]}
        size="lg"
      />

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
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
                      : 'border border-navy/10 bg-white text-navy-500 hover:border-navy/30 hover:text-navy',
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-navy/5 bg-white px-6 shadow-soft">
              <Accordion items={filtered} defaultOpen={0} className="border-t-0" />
            </div>

            <p className="mt-4 text-xs text-navy-400">
              Showing {filtered.length} of {faqs.length} questions
            </p>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy">
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-2xl">Still have a question?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                A real coordinator will get back to you within one working day — usually much
                sooner.
              </p>
              <div className="mt-5 space-y-2">
                <Button to="/contact" variant="gold" size="sm" className="w-full" icon={ArrowRight}>
                  Send us a message
                </Button>
                <Button
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  variant="light"
                  size="sm"
                  className="w-full"
                  icon={MessageCircle}
                  iconPosition="left"
                >
                  WhatsApp us
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-soft">
              <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                Talk to a human
              </h2>
              <a
                href={`tel:${site.contact.phone}`}
                className="mt-3 flex items-center gap-3 text-sm font-semibold text-navy transition-colors hover:text-gold-700"
              >
                <Phone className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
              <p className="mt-2 text-xs text-navy-400">{site.contact.hours}</p>
              <p className="mt-4 border-t border-navy/5 pt-4 text-xs leading-relaxed text-navy-400">
                {site.contact.address.full}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
