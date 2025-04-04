import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Collections', path: '/products' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md py-2' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-luxury flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src="/LOGO NOIR.png"
            alt="Logo"
            className="h-16 transition-all duration-300"
            width="64" /* Add explicit width */
            height="64" /* Add explicit height */
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `luxury-transition text-sm uppercase tracking-wider ${
                  isActive 
                    ? 'text-luxury-900 font-medium' 
                    : 'text-luxury-600 hover:text-luxury-800'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink 
            to="/contact" 
            className="btn-luxury"
          >
            Nous Contacter
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-luxury-900 z-50"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-40 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden flex flex-col`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xl ${
                    isActive ? 'text-luxury-900 font-medium' : 'text-luxury-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink 
              to="/contact" 
              className="btn-luxury mt-4"
            >
              Nous Contacter
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
