import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  Compass,
  Headset,
  Heart,
  Lock,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import Seo from '@/components/seo/Seo';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import PackageCard from '@/components/cards/PackageCard';
import DestinationCard from '@/components/cards/DestinationCard';
import BlogCard from '@/components/cards/BlogCard';
import TestimonialCard from '@/components/cards/TestimonialCard';
import { images } from '@/assets/images';
import { site } from '@/config/site';
import { destinations, domesticDestinations, internationalDestinations } from '@/data/destinations';
import { featuredPackages, packageCategories } from '@/data/packages';
import { whyChooseUs, howItWorks, trustBadges, instagramGallery } from '@/data/content';
import { testimonials, stats } from '@/data/testimonials';
import { blogPosts } from '@/data/blog';
import { cn, formatCurrency, whatsappUrl } from '@/lib/utils';

const whyIcons = { compass: Compass, heart: Heart, shield: ShieldCheck, headset: Headset };
const trustIcons = { lock: Lock, calendar: CalendarCheck, headset: Headset, badge: BadgeCheck };

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <img
        src={images.home.hero}
        alt="Snow-capped Himalayan peaks at sunrise"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-page relative flex min-h-[42rem] flex-col justify-center pb-16 pt-20 sm:min-h-[46rem] sm:pt-24 lg:min-h-[48rem]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow eyebrow-light">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            A travel studio in Mohali, Punjab
          </span>

          <h1 className="mt-6 font-display text-display-2xl font-medium text-white">
            Travel beautifully,
            <span className="mt-1 block italic text-gold-300">one thoughtful journey at a time.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            From Himalayan road trips to handpicked international escapes, we design journeys
            around how you actually like to travel — not a checklist.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/packages" variant="gold" size="lg" icon={ArrowRight}>
              Explore packages
            </Button>
            <Button to="/contact" variant="light" size="lg">
              Plan a custom trip
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/65">
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <strong className="font-semibold text-white">4.8 / 5</strong> · 1,200+ reviews
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-gold-300" aria-hidden="true" />
              5,000+ travellers since 2018
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-gold-300" aria-hidden="true" />
              20% advance to book
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-10 right-8 hidden w-64 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl lg:block"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/55">Next departure</p>
              <p className="font-display text-lg text-white">Spiti Valley</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/65">
            8 days · small group · from{' '}
            <span className="font-semibold text-white">{formatCurrency(24999)}</span>
          </p>
          <Link
            to="/packages/spiti-valley-road-trip"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300 transition-colors hover:text-white"
          >
            View itinerary
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function QuickPlanner() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('All');

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (category && category !== 'All') params.set('category', category);
    navigate(`/packages${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="relative z-20 -mt-12 sm:-mt-14">
      <div className="container-page">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-2xl border border-navy/5 bg-white p-5 shadow-card sm:p-6 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end"
        >
          <div>
            <label htmlFor="hero-destination" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
              Where would you like to go?
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-600" aria-hidden="true" />
              <select
                id="hero-destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="w-full appearance-none rounded-xl border border-navy/10 bg-cream-50 py-3 pl-11 pr-4 text-sm text-navy focus:border-gold focus:outline-none"
              >
                <option value="">Anywhere beautiful</option>
                {destinations.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="hero-style" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
              Travel style
            </label>
            <select
              id="hero-style"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full appearance-none rounded-xl border border-navy/10 bg-cream-50 px-4 py-3 text-sm text-navy focus:border-gold focus:outline-none"
            >
              {packageCategories.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'Any style' : item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
              Departing from
            </span>
            <div className="flex h-[2.9rem] items-center gap-2 rounded-xl border border-navy/10 bg-cream-50 px-4 text-sm text-navy">
              <Compass className="h-4 w-4 text-gold-600" aria-hidden="true" />
              Chandigarh / Delhi
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" icon={Search} className="h-[2.9rem] w-full lg:w-auto">
            Find trips
          </Button>
        </form>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="border-b border-navy/5 bg-cream">
      <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:py-12">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05} className="text-center sm:text-left">
            <p className="font-display text-3xl font-semibold text-navy sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-navy-400">{stat.label}</p>
            {stat.detail ? <p className="mt-1 text-[0.65rem] text-navy-300">{stat.detail}</p> : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedDestinations() {
  const [tab, setTab] = useState('domestic');
  const list = tab === 'domestic' ? domesticDestinations : internationalDestinations;

  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Where to next"
          title="Places we know by heart"
          description="A curated edit of the regions our team travels, tests and returns to — from the Himalayas to the Indian Ocean."
          align="between"
          action={
            <div className="flex rounded-full border border-navy/10 bg-white p-1" role="tablist" aria-label="Destination type">
              {[
                { id: 'domestic', label: 'India' },
                { id: 'international', label: 'International' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                    tab === item.id ? 'bg-navy text-white' : 'text-navy-500 hover:text-navy',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 6).map((destination, index) => (
            <Reveal key={destination.slug} delay={(index % 3) * 0.06}>
              <DestinationCard destination={destination} tall className="h-full" />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button to="/destinations" variant="outline" size="md" icon={ArrowRight}>
            View all destinations
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  const tours = useMemo(() => featuredPackages.slice(0, 6), []);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Signature itineraries"
          title="Trips our travellers love most"
          description="Thoughtfully paced itineraries with handpicked stays, vetted drivers and a real coordinator on call."
          align="between"
          action={
            <Button to="/packages" variant="ghost" size="sm" icon={ArrowRight}>
              All packages
            </Button>
          }
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, index) => (
            <Reveal key={tour.slug} delay={(index % 3) * 0.06}>
              <PackageCard tour={tour} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Why travel with us"
            title="The difference is in the details nobody advertises"
            description="We are a small team of travellers, not a booking engine. That means honest advice, better pacing and someone who picks up the phone."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {trustBadges.map((badge) => {
              const Icon = trustIcons[badge.icon] || BadgeCheck;
              return (
                <div key={badge.title} className="rounded-xl border border-navy/5 bg-white p-4 shadow-soft">
                  <Icon className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-navy">{badge.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-400">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {whyChooseUs.map((item, index) => {
            const Icon = whyIcons[item.icon] || Compass;
            return (
              <Reveal
                key={item.title}
                delay={(index % 2) * 0.06}
                className={cn(
                  'rounded-2xl border border-navy/5 bg-white p-6 shadow-soft',
                  index === 0 && 'sm:translate-y-6',
                  index === 3 && 'sm:translate-y-6',
                )}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <img
        src={images.ui.pattern}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" aria-hidden="true" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="How it works"
          title="From first message to final boarding pass"
          description="Four simple steps. No pressure, no hidden extras, no copy-paste itineraries."
          align="center"
          light
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.07} className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <span className="font-display text-3xl text-gold-300">{step.step}</span>
                <h3 className="mt-4 font-display text-xl text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
              </div>
              {index < howItWorks.length - 1 ? (
                <ArrowRight
                  className="absolute -right-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-gold/40 lg:block"
                  aria-hidden="true"
                />
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EuropeFeature() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-3xl border border-navy/5 bg-white shadow-card lg:grid-cols-2">
          <div className="relative min-h-[20rem] lg:min-h-full">
            <img
              src={images.destinations.europe}
              alt="Paris at golden hour"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
            <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy">
              Signature journey
            </span>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <span className="eyebrow">The grand tour</span>
            <h2 className="mt-4 font-display text-display-md font-medium text-navy">
              Switzerland &amp; Paris, the slow way
            </h2>
            <p className="mt-4 leading-relaxed text-navy-500">
              Nine nights of alpine railways, lake towns and Paris at golden hour. First-class
              rail, well-located hotels and a local host — with breathing room built in.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {['Jungfraujoch railway', 'Lucerne lake cruise', 'Eiffel Tower summit', 'Seine evening cruise'].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-navy-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-navy/5 pt-6">
              <div>
                <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-navy-400">
                  10 days · from
                </span>
                <span className="font-display text-2xl font-semibold text-navy">
                  {formatCurrency(185000)}
                </span>
                <span className="ml-1 text-xs text-navy-400">per person</span>
              </div>
              <Button to="/packages/switzerland-paris-grand-tour" variant="primary" icon={ArrowRight}>
                View itinerary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Traveller stories"
          title="Kind words from people we now call friends"
          description="A few of the 1,200+ reviews from families, couples and groups across Punjab and beyond."
          align="between"
          action={
            <div className="flex items-center gap-3 rounded-full border border-navy/10 bg-cream px-4 py-2">
              <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
              <span className="text-sm font-semibold text-navy">4.8</span>
              <span className="text-xs text-navy-400">Google rating</span>
            </div>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.07}>
              <TestimonialCard testimonial={testimonial} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalPreview() {
  const posts = blogPosts.filter((post) => post.featured).slice(0, 3);

  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="The travel journal"
          title="Good advice before you go"
          description="Practical guides written by the people who plan and travel these routes."
          align="between"
          action={
            <Button to="/blog" variant="ghost" size="sm" icon={ArrowRight}>
              Read the journal
            </Button>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.07}>
              <BlogCard post={post} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramStrip() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">@himalayantrails</span>
            <h2 className="mt-3 font-display text-2xl font-medium text-navy sm:text-3xl">
              Postcards from the road
            </h2>
          </div>
          <a
            href={site.socials[0].href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy-500 transition-colors hover:text-gold-700"
          >
            Follow along
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramGallery.map((item) => (
            <a
              key={item.image}
              href={site.socials[0].href}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={images.gallery[item.image]}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-navy-950/0 transition-colors duration-300 group-hover:bg-navy-950/40">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  View
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <img
        src={images.home.cta}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/80" aria-hidden="true" />
      <div className="container-narrow text-center">
        <span className="eyebrow eyebrow-light justify-center">Start planning</span>
        <h2 className="mt-4 font-display text-display-lg font-medium text-white">
          Let&apos;s plan something worth remembering.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
          Tell us your dates, your people and the kind of trip you have in mind. We will send a
          thoughtful plan within 24 hours — no obligation.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/contact" variant="gold" size="lg" icon={ArrowRight}>
            Plan my trip
          </Button>
          <Button href={whatsappUrl()} target="_blank" rel="noreferrer" variant="light" size="lg">
            WhatsApp us
          </Button>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/40">
          {site.contact.hoursShort} · {site.contact.phoneDisplay}
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <QuickPlanner />
      <StatsStrip />
      <FeaturedDestinations />
      <FeaturedPackages />
      <WhyUs />
      <HowItWorks />
      <EuropeFeature />
      <Testimonials />
      <JournalPreview />
      <InstagramStrip />
      <ClosingCta />
    </>
  );
}
