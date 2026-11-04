import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Home, MapPin } from 'lucide-react';
import { images } from '@/assets/images';
import SEO from '@/components/seo/SEO';
import Button from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';

const links = [
  { label: 'Destinations', to: '/destinations', note: '19 places, two continents' },
  { label: 'Tour packages', to: '/packages', note: '15 curated itineraries' },
  { label: 'Travel journal', to: '/blog', note: 'Guides from the road' },
  { label: 'Contact us', to: '/contact', note: 'Start a conversation' },
];

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page not found"
        description="The page you are looking for has wandered off the map. Explore our destinations or return home."
        noindex
        path="/404"
      />
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-950 pb-20 pt-32">
        <SmartImage src={images.home.hero} alt="" className="absolute inset-0 h-full w-full opacity-25" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60" />
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow eyebrow-light">A small detour</p>
              <p className="mt-4 font-display text-[clamp(7rem,20vw,15rem)] font-medium leading-none text-white/10">404</p>
              <h1 className="mt-2 font-display text-display-lg font-medium text-white">This path isn’t on the map.</h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
                The page may have moved, or the link might be a little lost. Let’s get you back to somewhere beautiful.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/" size="lg"><Home size={16} /> Back home</Button>
                <Button to="/destinations" variant="light" size="lg"><Compass size={16} /> Explore destinations</Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-gold/40 hover:bg-white/10"
                >
                  <MapPin size={17} className="text-gold-300" />
                  <h2 className="mt-4 font-display text-xl text-white group-hover:text-gold-300">{link.label}</h2>
                  <p className="mt-1 text-xs text-white/45">{link.note}</p>
                  <ArrowRight size={15} className="mt-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-gold-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
