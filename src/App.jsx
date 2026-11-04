import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { WishlistProvider } from '@/context/WishlistContext';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));
const Destinations = lazy(() => import('@/pages/Destinations'));
const DestinationDetail = lazy(() => import('@/pages/DestinationDetail'));
const Packages = lazy(() => import('@/pages/Packages'));
const PackageDetail = lazy(() => import('@/pages/PackageDetail'));
const About = lazy(() => import('@/pages/About'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Legal = lazy(() => import('@/pages/Legal'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex size-14 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-navy/10 border-t-gold" />
          <span className="font-display text-lg text-navy">HT</span>
        </span>
        <span className="text-xs uppercase tracking-[0.22em] text-navy-400">Preparing your journey</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <WishlistProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="destinations" element={<Destinations />} />
                <Route path="destinations/:slug" element={<DestinationDetail />} />
                <Route path="packages" element={<Packages />} />
                <Route path="packages/:slug" element={<PackageDetail />} />
                <Route path="about" element={<About />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="privacy-policy" element={<Legal type="privacy" />} />
                <Route path="terms" element={<Legal type="terms" />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </WishlistProvider>
    </HelmetProvider>
  );
}
