import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Check, Compass, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { images } from '@/assets/images';
import { site } from '@/config/site';
import { certifications, team, timeline, whyChooseUs } from '@/data/content';
import { stats } from '@/data/testimonials';
import { cn, whatsappUrl } from '@/lib/utils';

const valueIcons = { compass: Compass, heart: Heart, shield: ShieldCheck, headset: Sparkles };

export default function About() {
  return (
    <>
      <Seo
        title="Our Story"
        description="Himalayan Trails & Tours is a small, independent travel studio in Mohali, Punjab, designing thoughtful journeys since 2018."
        image={images.about.story}
      />

      <PageHero
        image={images.about.story}
        eyebrow="Our story"
        title="A small studio with a very large map"
        description="We started with honest Himachal itineraries for families from Punjab. Eight years later, the map is bigger but the approach is the same."
        breadcrumbs={[{ label: 'About' }]}
        size="lg"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
          <span>Established <strong className="text-white">{site.established}</strong></span>
          <span><strong className="text-white">5,000+</strong> travellers</span>
          <span>Based in <strong className="text-white">Mohali, Punjab</strong></span>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={images.about.story}
                alt="A winding road through the mountains"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 w-52 rounded-2xl border border-navy/5 bg-white p-5 shadow-card sm:right-6">
              <p className="font-display text-3xl font-semibold text-navy">8+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-navy-400">Years on the road</p>
              <p className="mt-2 text-xs leading-relaxed text-navy-400">
                Designing trips we would happily take ourselves.
              </p>
            </div>
          </div>

          <div>
            <span className="eyebrow">How we began</span>
            <h2 className="mt-4 font-display text-display-md font-medium text-navy">
              Built on referrals, not advertising.
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-navy-500">
              <p>
                Himalayan Trails began in 2018 at a small desk in Mohali, with a map on the wall and
                a stubborn belief that a mountain holiday should feel personal. Our first travellers
                were families from Chandigarh who wanted honest advice more than a glossy brochure.
              </p>
              <p>
                When travel paused in 2020, we rebuilt our supplier network, trained local guides and
                designed the private-trip model we still use today. Since then we have added Kerala,
                Rajasthan and a growing list of international journeys — but the pace of a trip still
                matters more to us than the number of stops.
              </p>
              <p>
                Most of our business still comes from someone telling a friend. We would like to keep
                it that way.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="rounded-xl border border-navy/5 bg-white p-4 shadow-soft">
                  <p className="font-display text-2xl font-semibold text-navy">{stat.value}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-navy-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we believe"
            title="Four things we refuse to compromise on"
            description="These are not marketing lines — they are the filters every itinerary passes through before it reaches you."
            align="center"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => {
              const Icon = valueIcons[item.icon] || Compass;
              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-navy/5 bg-cream-50 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="The journey so far"
            title="A few milestones along the way"
            description="Eight years, a few thousand travellers and a map that keeps getting bigger."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={images.about.mission}
                alt="Travellers taking in a mountain view"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover lg:aspect-[3/4]"
              />
            </div>
            <ol className="relative space-y-6 border-l border-navy/10 pl-6">
              {timeline.map((item) => (
                <li key={item.year} className="relative">
                  <span className="absolute -left-[1.95rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-cream bg-gold" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">{item.year}</span>
                  <h3 className="mt-1 font-display text-xl text-navy">{item.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-navy-500">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="The people"
            title="Small team, real travellers"
            description="You will likely speak to one of these four people before and during your trip."
            align="between"
            action={
              <Button to="/contact" variant="outline" size="sm" icon={ArrowRight}>
                Say hello
              </Button>
            }
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <div className="group flex h-full flex-col rounded-2xl border border-navy/5 bg-cream-50 p-6 transition-shadow hover:shadow-soft">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-xl text-white">
                    {member.initials}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-navy">{member.name}</h3>
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-gold-700">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-8 rounded-3xl border border-navy/5 bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">Credentials</span>
            <h2 className="mt-3 font-display text-display-md font-medium text-navy">
              Recognised, registered and properly insured.
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-navy-500">
              We work with verified local partners and keep our paperwork in order, so you can focus
              on the trip rather than the fine print.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {certifications.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-600">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-navy-950 p-7 text-white">
            <h3 className="font-display text-2xl">Come say hello.</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Our office is in Phase 7, Mohali. Drop in for a coffee and a map — no appointment
              needed.
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/70">
              <p>{site.contact.address.full}</p>
              <p>{site.contact.hours}</p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button to="/contact" variant="gold" size="sm" icon={ArrowRight}>
                Get in touch
              </Button>
              <Button href={whatsappUrl()} target="_blank" rel="noreferrer" variant="light" size="sm">
                WhatsApp us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
