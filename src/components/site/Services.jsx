import { useRef } from 'react';
import { ArrowUpRight, Briefcase, Camera, Car, Heart, Map, Plane } from 'lucide-react';
import { services, wa } from '@/data/business';
import { Reveal, SectionLabel, WhatsAppIcon } from './primitives';
import { useDepth } from './Depth';
import { Tilt } from './spatial';

const icons = {
  plane: Plane,
  car: Car,
  briefcase: Briefcase,
  heart: Heart,
  map: Map,
  camera: Camera,
};

export default function Services() {
  const ref = useRef(null);
  useDepth(ref);

  return (
    <section
      ref={ref}
      id="services"
      className="relative z-[11] -mt-6 rounded-t-[2rem] border-y border-ink/10 bg-cream-light py-24 sm:rounded-t-[2.5rem] sm:py-32 lg:py-40"
      aria-labelledby="services-heading"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionLabel number="02">What we do</SectionLabel>
            <h2 id="services-heading" className="mt-6 font-display text-display-xl font-light text-ink">
              Six ways we can
              <br />
              <em className="font-normal italic text-pine">take the wheel.</em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.1}>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-ink/60">
              A quick airport run, a wedding convoy or a two-week mountain loop — same care, same
              clean cars, same person answering the phone.
            </p>
            <a
              href={wa('Hi, I would like to know more about your services.')}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-pine"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon] || Car;
            return (
              <Reveal key={service.id} delay={0.04 * index}>
                <Tilt className="h-full rounded-2xl" max={6}>
                <a
                  href={wa(`Hi, I would like to enquire about ${service.title.toLowerCase()}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-cream p-7 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-pine hover:bg-pine hover:text-cream hover:shadow-lift sm:p-8"
                >
                  <span
                    className="ghost-word pointer-events-none right-4 top-1/2 -z-0 text-[7.5rem] text-ink/[0.05] transition-colors duration-500 group-hover:text-cream/[0.09] sm:text-[9rem]"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-cream-light text-pine transition-all duration-500 group-hover:border-marigold group-hover:bg-marigold group-hover:text-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="relative z-10 mt-14">
                    <h3 className="font-display text-[1.55rem] font-medium leading-tight text-ink transition-colors duration-500 group-hover:text-cream">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[0.85rem] leading-relaxed text-ink/55 transition-colors duration-500 group-hover:text-cream/65">
                      {service.copy}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 flex items-center justify-between">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink/35 transition-colors duration-500 group-hover:text-cream/45">
                      Enquire on WhatsApp
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 transition-all duration-500 group-hover:border-marigold group-hover:bg-marigold group-hover:text-ink">
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>

                  <span
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-marigold transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </a>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
