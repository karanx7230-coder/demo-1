import { Helmet } from 'react-helmet-async';
import { site } from '@/config/site';

export default function SEO({ title, description, image, path = '/', type = 'website', noindex = false }) {
  const pageTitle = title ? site.seo.titleTemplate.replace('%s', title) : site.seo.defaultTitle;
  const pageDescription = description || site.seo.description;
  const pageImage = image || site.seo.ogImage;
  const canonical = `${site.url}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
    </Helmet>
  );
}
