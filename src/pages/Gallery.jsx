import { useMemo, useState } from 'react';
import { Camera, Expand } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageHero from '@/components/ui/PageHero';
import Lightbox from '@/components/ui/Lightbox';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { images } from '@/assets/images';
import { galleryCategories, galleryItems } from '@/data/gallery';
import { cn } from '@/lib/utils';

const sizeClasses = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/11]',
  square: 'aspect-square',
};

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () =>
      category === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === category),
    [category],
  );

  const handleCategory = (next) => {
    setCategory(next);
    setLightboxIndex(null);
  };

  return (
    <>
      <Seo
        title="Photo Gallery"
        description="Postcards from the road — mountains, beaches, heritage and cities photographed across India and the world."
        image={images.gallery.himalaya}
      />

      <PageHero
        image={images.gallery.himalaya}
        eyebrow="Photo gallery"
        title="Postcards from the road"
        description="A visual diary from our own trips — the light, the landscapes and the small moments between the big ones."
        breadcrumbs={[{ label: 'Gallery' }]}
        size="lg"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <Camera className="h-4 w-4 text-gold-300" aria-hidden="true" />
            <strong className="text-white">{galleryItems.length}</strong> photographs
          </span>
          <span>Shot across <strong className="text-white">9 countries</strong></span>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-2">
            {galleryCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleCategory(item)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                  category === item
                    ? 'bg-navy text-white'
                    : 'border border-navy/10 bg-white text-navy-500 hover:border-navy/30 hover:text-navy',
                )}
              >
                {item}
              </button>
            ))}
            <span className="ml-auto text-sm text-navy-400">
              {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 0.04}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={cn(
                    'group relative w-full overflow-hidden rounded-2xl bg-navy-900 text-left',
                    sizeClasses[item.size] || 'aspect-square',
                  )}
                  aria-label={`Open photo: ${item.caption}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <span>
                      <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-gold-300">
                        {item.category}
                      </span>
                      <span className="mt-1 block font-display text-lg text-white">{item.caption}</span>
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors group-hover:bg-white group-hover:text-navy">
                      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-navy/5 bg-white p-8 text-center shadow-soft sm:p-12">
            <span className="eyebrow justify-center">Travel with us</span>
            <h2 className="mt-3 font-display text-display-md font-medium text-navy">
              The next postcard could be yours.
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-navy-500">
              Browse our itineraries or tell us where you have been dreaming of. We will take care
              of the route, the stays and the small details.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/packages" variant="primary">
                Explore packages
              </Button>
              <Button to="/contact" variant="outline">
                Plan a custom trip
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
