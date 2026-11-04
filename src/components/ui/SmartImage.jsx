import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Lazy image with skeleton placeholder and graceful error state.
 * The wrapper owns the aspect ratio; pass it through `className`.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  loading = 'lazy',
  sizes,
  onLoad,
  ...props
}) {
  const [status, setStatus] = useState('loading');

  return (
    <div className={cn('relative overflow-hidden bg-navy-100', className)}>
      {status === 'loading' ? <div className="skeleton absolute inset-0" aria-hidden="true" /> : null}
      {status === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-100 px-4 text-center text-navy-400">
          <ImageOff size={24} aria-hidden="true" />
          <span className="text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
          onLoad={(event) => {
            setStatus('loaded');
            onLoad?.(event);
          }}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-all duration-700 ease-smooth',
            status === 'loaded' ? 'scale-100 opacity-100 blur-0' : 'scale-[1.02] opacity-0 blur-sm',
            imgClassName,
          )}
          {...props}
        />
      )}
    </div>
  );
}
