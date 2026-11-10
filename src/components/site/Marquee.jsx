import { cx } from './primitives';

const items = [
  'Airport transfers',
  'Outstation cabs',
  'Corporate travel',
  'Wedding transport',
  'Tour packages',
  'Local sightseeing',
];

function Group({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-[0.68rem] font-bold uppercase tracking-[0.22em] sm:px-8 sm:text-[0.74rem]">
            {item}
          </span>
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0 fill-ink/70" aria-hidden="true">
            <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4L12 0z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ className }) {
  return (
    <div className={cx('relative overflow-hidden border-y border-ink/15 bg-marigold py-3.5 text-ink', className)}>
      <div className="flex w-max animate-marquee items-center">
        <Group />
        <Group hidden />
      </div>
      <span className="sr-only">
        Services: airport transfers, outstation cabs, corporate travel, wedding transport, tour packages and local
        sightseeing.
      </span>
    </div>
  );
}
