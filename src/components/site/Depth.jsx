import { useEffect } from 'react';
import { cx } from './primitives';
import { prefersReducedMotion } from './spatial';

/**
 * Writes a 0 → 1 scroll progress value to --depth on the referenced element.
 * Ghost typography uses it for a slow, cinematic parallax drift.
 */
export function useDepth(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const centre = rect.top + rect.height * 0.5;
      const progress = Math.min(1, Math.max(0, 1 - centre / (viewport * 1.5)));
      el.style.setProperty('--depth', progress.toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
}

/**
 * Oversized display type that sits *behind* photographs and cards.
 * It drifts with the pointer and with scroll, so the page reads as layered
 * rather than flat. Purely decorative — hidden from assistive tech.
 */
export function GhostWord({
  children,
  className,
  tone = 'ink',
  drift = 80,
  rotate = 0,
  as: Tag = 'span',
}) {
  return (
    <Tag
      aria-hidden="true"
      className={cx('ghost-word', `ghost-word-${tone}`, className)}
      style={{ '--drift': `${drift}px`, '--rotate': `${rotate}deg` }}
    >
      {children}
    </Tag>
  );
}
