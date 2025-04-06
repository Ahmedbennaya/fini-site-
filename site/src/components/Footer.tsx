import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import { Helmet } from 'react-helmet'; // Add for meta tags

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        {/* Structured data for local business */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HomeGoodsStore",
              "name": "Bargaoui Rideaux",
              "description": "Spécialiste en rideaux et décoration d'intérieur à Ariana, Tunisie depuis 1949. Confection sur mesure de rideaux et accessoires.",
              "url": "https://www.bargaouirideaux.com",
              "telephone": "+216 50 92 92 92",
              "email": "bargaoui_rideaux@yahoo.fr",
              "foundingDate": "1949-06",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "143 Avenue UMA La Soukra",
                "addressLocality": "Ariana",
                "addressCountry": "Tunisia"
              },
              "sameAs": [
                "https://www.facebook.com/Bargaoui.Rideaux.Tahar",
                "https://www.instagram.com/bargaoui_rideaux_tahar",
                "https://www.pinterest.com/BargaouiRideauxTahar"
              ]
            }
          `}
        </script>
      </Helmet>

      <footer className="bg-luxury-950 text-white py-16" itemScope itemType="https://schema.org/WPFooter">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1 - About */}
            <div>
              <Link to="/" className="inline-block mb-6" aria-label="Bargaoui Rideaux - Accueil">
                <h3 className="font-display text-2xl">
                  Bargaoui <span className="font-light italic">Rideaux</span>
                </h3>
              </Link>
              <p className="text-white/70 mb-6" itemProp="description">
                Fondée en juin 1949 par Mohamed Bargaoui, Bargaoui Rideaux est une entreprise familiale spécialisée dans la confection de rideaux et la décoration d'intérieur à Ariana, Tunisie. Artisans passionnés depuis plus de 70 ans.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/Bargaoui.Rideaux.Tahar"
                  className="text-white/70 hover:text-white transition-colors w-5 h-5"
                  aria-label="Suivez-nous sur Facebook"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/bargaoui_rideaux_tahar"
                  className="text-white/70 hover:text-white transition-colors w-5 h-5"
                  aria-label="Suivez-nous sur Instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.pinterest.com/BargaouiRideauxTahar"
                  className="text-white/70 hover:text-white transition-colors w-5 h-5"
                  aria-label="Découvrez nos créations sur Pinterest"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaPinterest size={20} />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h4 className="text-lg font-medium mb-6 border-b border-white/10 pb-2">Liens Rapides</h4>
              <nav aria-label="Navigation principale">
                <ul className="space-y-3">
                  <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Accueil</Link></li>
                  <li><Link to="/products" className="text-white/70 hover:text-white transition-colors">Collections</Link></li>
                  <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">À Propos</Link></li>
                  <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </nav>
            </div>

            {/* Column 3 - Collections */}
            <div>
              <h4 className="text-lg font-medium mb-6 border-b border-white/10 pb-2">Nos Collections</h4>
              <nav aria-label="Catégories de produits">
                <ul className="space-y-3">
                  <li><Link to="/materials/accessoires-rideaux" className="text-white/70 hover:text-white transition-colors">Accessoires-Rideaux</Link></li>
                  <li><Link to="/materials/tringles-rideaux" className="text-white/70 hover:text-white transition-colors">Tringles-Rideaux</Link></li>
                  <li><Link to="/materials/synthetique" className="text-white/70 hover:text-white transition-colors">Voilages</Link></li>
                  <li><Link to="/materials/velours" className="text-white/70 hover:text-white transition-colors">Velours</Link></li>
                </ul>
              </nav>
            </div>

            {/* Column 4 - Contact */}
            <div itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="Bargaoui Rideaux" />
              <h4 className="text-lg font-medium mb-6 border-b border-white/10 pb-2">Contactez-nous</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="text-luxury-300 mr-3 mt-1 w-4 h-4" />
                  <span className="text-white/70" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="streetAddress">143 Avenue UMA La Soukra</span>, 
                    <span itemProp="addressLocality">Ariana</span>, 
                    <span itemProp="addressCountry">Tunisia</span>
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-luxury-300 mr-3 w-4 h-4" />
                  <a href="tel:+21650929292" className="text-white/70 hover:text-white transition-colors" itemProp="telephone">+216 50 92 92 92</a>
                </li>
                <li className="flex items-center">
                  <Mail className="text-luxury-300 mr-3 w-4 h-4" />
                  <a href="mailto:bargaoui_rideaux@yahoo.fr" className="text-white/70 hover:text-white transition-colors" itemProp="email">bargaoui_rideaux@yahoo.fr</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-12 pt-6 text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-white/50 text-sm">
              &copy; {currentYear} Bargaoui Rideaux - Spécialiste en rideaux et décoration d'intérieur depuis 1949. Tous droits réservés.
            </p>
            <div className="mt-4 sm:mt-0">
              <ul className="flex flex-wrap justify-center sm:justify-end space-x-6 text-sm text-white/50">
                <li>
                  <Link to="/privacy" className="hover:text-white/70 transition-colors">Politique de confidentialité</Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white/70 transition-colors">Conditions d'utilisation</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;