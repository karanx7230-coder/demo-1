import { Compass, Home, Search } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import Button from '@/components/ui/Button';
import { images } from '@/assets/images';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." noIndex />

      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-navy-950 py-20 text-white">
        <img
          src={images.destinations.ladakh}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-navy-950/80" aria-hidden="true" />

        <div className="container-narrow text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-gold-300 backdrop-blur">
            <Compass className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-6 font-display text-7xl font-semibold text-gold-300 sm:text-8xl">404</p>
          <h1 className="mt-2 font-display text-display-md font-medium text-white">
            This trail doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-white/65">
            The page you were looking for may have moved, or the link might be slightly off. Let&apos;s
            get you back to somewhere beautiful.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" variant="gold" size="lg" icon={Home} iconPosition="left">
              Back home
            </Button>
            <Button to="/packages" variant="light" size="lg" icon={Search} iconPosition="left">
              Browse packages
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
