import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  schemaData?: Record<string, any>;
}

const SEO = ({
  title,
  description,
  keywords = "Bargaoui Rideaux, Bargaoui Rideaux Tahar, BargaouiRideaux, rideaux de luxe, textiles d'ameublement, rideaux sur mesure, Tunisie",
  canonicalUrl,
  imageUrl = "https://bargaoui-rideauxtahar.netlify.app/LOGO_NOIR.png", // Replace with your logo URL
  schemaData,
}: SEOProps) => {
  const baseUrl = "https://bargaoui-rideauxtahar.netlify.app";
  const currentUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  
  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* JSON-LD Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;