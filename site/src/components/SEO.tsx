import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  schemaData?: Record<string, any>;
  noIndex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://bargaoui-rideauxtahar.netlify.app/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schemaData,
  noIndex = false,
}: SEOProps) => {
  const siteUrl = 'https://bargaoui-rideauxtahar.netlify.app';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : undefined;

  return (
    <Helmet>
      {/* Title and Meta Description */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Bargaoui Rideaux Tahar" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Indexing */}
      {noIndex && <meta name="robots" content="noindex, follow" />}

      {/* Structured Data (Schema.org) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}

      {/* Basic Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bargaoui Rideaux Tahar",
          "url": siteUrl,
          "logo": `${siteUrl}/LOGO_NOIR.png`,
          "description":
            "Créateur de rideaux et textiles d'ameublement de luxe sur mesure depuis 1998. Qualité, élégance et savoir-faire artisanal tunisien.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1143 Avenue UMA La Soukra",
            "addressLocality": "Ariana",
            "postalCode": "2036",
            "addressCountry": "TN",
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+216 50 92 92 92",
            "contactType": "customer service",
            "availableLanguage": ["French", "Arabic"],
          },
          "sameAs": [
            "https://www.facebook.com/Bargaoui.Rideaux.Tahar",
            "https://www.instagram.com/bargaoui_rideaux_tahar",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;