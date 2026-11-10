import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Luggage, Users } from 'lucide-react';
import { fleet, wa } from '@/data/business';
import { Reveal, SectionLabel, WhatsAppIcon } from './primitives';
import VehicleArt from './VehicleArt';

const ease = [0.22, 1, 0.36, 1];

function Callout({ className, label, value, side = 'left' }) {
  return (
    <div className={`pointer-events-none absolute hidden items-center gap-2 lg:flex ${className}`}>
      {side === 'right' ? <span className="h-px w-7 bg-marigold/50" /> : null}
      <span className="rounded-full border border-cream/15 bg-ink/55 px-3 py-1.5 backdrop-blur-md">
        <span className="block text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-cream/35">{label}</span>
        <span className="mt-0.5 block text-[0.72rem] font-semibold text-cream/85">{value}</span>
      </span>
      {side === 'left' ? <span className="h-px w-7 bg-marigold/50" /> : null}
    </div>
  );
}

export default function Fleet() {
  const [active, setActive] = useState(fleet[0].id);
  const stageRef = useRef(null);
  const vehicle = fleet.find((item) => item.id === active) || fleet[0];
  const index = fleet.findIndex((item) => item.id === active);

  const handleMove = (event) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--carx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    el.style.setProperty('--cary', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  };

  const handleLeave = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--carx', '0');
    el.style.setProperty('--cary', '0');
  };

  return (
    <section
      id="fleet"
      className="relative z-[12] -mt-6 overflow-hidden rounded-t-[2rem] bg-ink py-20 text-cream sm:rounded-t-[2.5rem] sm:py-28 lg:py-32"
      aria-labelledby="fleet-heading"
    >
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-pine/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-marigold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel number="03" light>
              The fleet
            </SectionLabel>
            <h2 id="fleet-heading" className="mt-5 font-display text-display-xl font-light text-cream">
              Pick the car.
              <br />
              <em className="font-normal italic text-marigold">We handle the rest.</em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.1}>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-cream/60">
              Every car is cleaned, serviced and checked before it reaches you. Choose the size that
              fits your trip — we will confirm the exact model on WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div
              ref={stageRef}
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
              className="relative overflow-hidden rounded-[1.75rem] border border-cream/10 bg-gradient-to-b from-pine-deep/70 via-ink to-ink sm:rounded-[2.25rem]"
            >
              <div className="absolute inset-x-0 bottom-0 h-[58%] [perspective:520px]" aria-hidden="true">
                <div className="floor-grid absolute inset-0 origin-bottom [transform:rotateX(74deg)] opacity-70" />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_62%,rgba(240,163,59,0.14),transparent_58%)]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute right-4 top-2 select-none font-display text-[7rem] font-light leading-none text-cream/[0.045] sm:text-[9rem]"
                aria-hidden="true"
              >
                0{index + 1}
              </span>

              <div className="relative flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6">
                <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-cream/35">
                  Karnail fleet · 0{index + 1} / 04
                </span>
                <span className="flex items-center gap-2 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-marigold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-marigold opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-marigold" />
                  </span>
                  Available
                </span>
              </div>

              <div className="relative mt-2 [perspective:1100px]">
                <Callout className="left-4 top-[22%]" label="Seating" value={vehicle.seats} />
                <Callout className="right-4 top-[16%]" label="Luggage" value={vehicle.bags} side="right" />
                <Callout className="bottom-[30%] left-4" label="Model" value={vehicle.note} />
                <Callout className="bottom-[24%] right-4" label="Fare" value="On request" side="right" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, x: 46 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -46 }}
                    transition={{ duration: 0.5, ease }}
                    className="group relative mx-auto w-full max-w-[30rem] px-4 pb-2 pt-6 sm:px-10"
                  >
                    <div
                      className="layer-3d"
                      style={{
                        transform:
                          'rotateY(calc(var(--carx, 0) * 7deg)) rotateX(calc(var(--cary, 0) * -3deg)) translateZ(40px)',
                      }}
                    >
                      <VehicleArt
                        type={vehicle.art}
                        className="h-auto w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mx-5 mb-5 flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 pt-4 sm:mx-8 sm:mb-6">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-cream/55 sm:text-[0.66rem]">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-marigold" aria-hidden="true" />
                    {vehicle.seats}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Luggage className="h-3.5 w-3.5 text-marigold" aria-hidden="true" />
                    {vehicle.bags}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-marigold" aria-hidden="true" />
                    {vehicle.note}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2" role="tablist" aria-label="Choose a vehicle">
              {fleet.map((item, itemIndex) => {
                const selected = item.id === active;
                return (
                  <Reveal key={item.id} delay={0.04 * itemIndex}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActive(item.id)}
                      className={
                        'group relative w-full overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 ease-smooth sm:px-6 ' +
                        (selected
                          ? 'border-marigold/60 bg-marigold text-ink shadow-gold'
                          : 'border-cream/10 bg-cream/[0.03] text-cream hover:border-cream/30 hover:bg-cream/[0.06]')
                      }
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-3">
                            <span
                              className={
                                'text-[0.6rem] font-bold tracking-[0.16em] ' +
                                (selected ? 'text-ink/45' : 'text-cream/30')
                              }
                            >
                              0{itemIndex + 1}
                            </span>
                            <h3 className="font-display text-[1.4rem] font-medium leading-tight">{item.name}</h3>
                          </div>
                          <p
                            className={
                              'mt-1.5 text-[0.76rem] leading-relaxed ' +
                              (selected ? 'text-ink/65' : 'text-cream/45')
                            }
                          >
                            {item.bestFor}
                          </p>
                        </div>
                        <span
                          className={
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ' +
                            (selected ? 'border-ink/20 text-ink' : 'border-cream/20 text-cream/50')
                          }
                          aria-hidden="true"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <a
                href={wa(`Hi, I would like to book a ${vehicle.name} (${vehicle.seats}). Could you share the fare?`)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-cream px-6 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-marigold"
              >
                <WhatsAppIcon className="h-[1.05rem] w-[1.05rem]" />
                Book the {vehicle.name} on WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
