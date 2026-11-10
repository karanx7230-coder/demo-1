import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Sets two sets of CSS variables on <html>:
 *   --mx / --my   pointer position normalised to -0.5 … 0.5
 *   --cx / --cy   pointer position in pixels
 * Only runs on devices with a real pointer. Everything is rAF-throttled.
 */
export function useSpatialPointer() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const root = document.documentElement;
    let frame = 0;

    const apply = (x, y) => {
      root.style.setProperty('--mx', x.toFixed(3));
      root.style.setProperty('--my', y.toFixed(3));
    };

    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        apply(event.clientX / window.innerWidth - 0.5, event.clientY / window.innerHeight - 0.5);
        root.style.setProperty('--cx', `${event.clientX}px`);
        root.style.setProperty('--cy', `${event.clientY}px`);
      });
    };

    const onLeave = () => apply(0, 0);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [reduceMotion]);
}

/**
 * Pointer-reactive 3D tilt with a moving specular highlight.
 * Falls back to a plain box on touch devices and for reduced motion.
 */
export function Tilt({
  children,
  className,
  max = 7,
  glare = true,
  style,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleMove = (event) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty('--rx', `${((0.5 - py) * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={['tilt', className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      {children}
      {glare ? <span className="tilt-glare" aria-hidden="true" /> : null}
    </Tag>
  );
}

export function BrandMark({ className, tone = 'pine' }) {
  const fill = tone === 'cream' ? '#F6EFE2' : '#14382B';
  const stroke = tone === 'cream' ? '#14382B' : '#F6EFE2';

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Karnail Tour and Travels">
      <circle cx="32" cy="32" r="31" fill={fill} />
      <path
        d="M21 15v34M21 33l15.5-18M21 33l16 16"
        fill="none"
        stroke={stroke}
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49" cy="15" r="4.6" fill="#F0A33B" />
    </svg>
  );
}
