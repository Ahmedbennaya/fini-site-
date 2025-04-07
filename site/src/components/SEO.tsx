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
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schemaData,
  noIndex = false,
}: SEOProps) => {
  const siteUrl = 'https://bargaoui-rideauxtahar.netlify.app';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const logoUrl = 'https://oehbiqlfllyxpueofuob.supabase.co/storage/v1/object/public/products//Logo.jpg';

  return (
    <Helmet>
      {/* Title and Meta Description */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={logoUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Bargaoui Rideaux Tahar" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card Tags - Enhanced */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@bargaoui_rideaux" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logoUrl} />
      <meta name="twitter:image:alt" content="Bargaoui Rideaux Tahar Logo" />
      
      {/* Indexing */}
      {noIndex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

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
          "logo": logoUrl,
          "description":
            "Fondée en Juin 1949 par M Mohamed Bargaoui, entrepreneur Bargaoui confection voie le jour a Tunis - Cette entreprise familiale opère a ces débuts dans le secteur textile, plus précisément dans les appelles d'offre de confection - L'entreprise Bargaoui est aujourd'hui à sa deuxième génération forte d'une nouvelle direction générale et artistique",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "143 Avenue UMA La Soukra",
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