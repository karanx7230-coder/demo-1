import { marqueeItems } from '@/data/next';

function Group({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-light tracking-[-0.01em] text-cream/80">
            {item}
          </span>
          <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 fill-marigold" aria-hidden="true">
            <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4L12 0z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-ink py-6">
      <div className="flex w-max animate-marquee items-center">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
