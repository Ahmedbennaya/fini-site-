import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - About */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h3 className="font-display text-2xl">
                Bargaoui <span className="font-light italic">Rideaux</span>
              </h3>
            </Link>
            <p className="text-white/70 mb-6">
              Depuis 1998, Bargaoui Rideaux crée des rideaux et textiles d'ameublement sur mesure, alliant tradition et modernité pour sublimer vos intérieurs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Bargaoui.Rideaux.Tahar"
                className="text-white/70 hover:text-white transition-colors w-5 h-5"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/bargaoui_rideaux_tahar"
                className="text-white/70 hover:text-white transition-colors w-5 h-5"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.pinterest.com/BargaouiRideauxTahar"
                className="text-white/70 hover:text-white transition-colors w-5 h-5"
                aria-label="Pinterest"
              >
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 border-b border-white/10 pb-2">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Collections */}
          <div>
            <h4 className="text-lg font-medium mb-6 border-b border-white/10 pb-2">Nos Collections</h4>
            <ul className="space-y-3">
              <li><Link to="/materials/accessoires-rideaux" className="text-white/70 hover:text-white transition-colors">Accessoires-Rideaux</Link></li>
              <li><Link to="/materials/tringles-rideaux" className="text-white/70 hover:text-white transition-colors">Tringles-Rideaux</Link></li>
              <li><Link to="/materials/synthetique" className="text-white/70 hover:text-white transition-colors">Voilages</Link></li>
              <li><Link to="/materials/velours" className="text-white/70 hover:text-white transition-colors">Velours</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-lg font-medium mb-6 border-b border-white/10 pb-2">Contactez-nous</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-luxury-300 mr-3 mt-1 w-4 h-4" />
                <span className="text-white/70">143 Avenue UMA La Soukra, Ariana, Tunisia</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-luxury-300 mr-3 w-4 h-4" />
                <a href="tel:+21671123456" className="text-white/70 hover:text-white transition-colors">+216 50 92 92 92</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-luxury-300 mr-3 w-4 h-4" />
                <a href="mailto:contact@bargaouirideaux.com" className="text-white/70 hover:text-white transition-colors">bargaoui_rideaux@yahoo.fr</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} Bargaoui Rideaux. Tous droits réservés.
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
  );
};

export default Footer;