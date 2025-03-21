import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '@/context/AuthContext';
import logo from '@/components/public/LOGO NOIR.png'; // Adjust the path as necessary

const NavbarTranslated = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav 
      id="navbar-container"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-luxury flex items-center justify-between">
  {/* Logo */}
  <Link to="/" className="flex items-center">
    <img 
      src={logo} 
      alt="Logo" 
      className={`h-16 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'h-14' : 'h-16'
      }`} // Adjusted size
    />
  </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            <NavLink to="/" isLight={!isScrolled && isHomePage} label={t('navigation.home')} />
            <NavLink to="/about" isLight={!isScrolled && isHomePage} label={t('navigation.about')} />
            <NavLink to="/products" isLight={!isScrolled && isHomePage} label={t('navigation.products')} />
            <NavLink to="/contact" isLight={!isScrolled && isHomePage} label={t('navigation.contact')} />
          </div>

          <div className="h-6 w-px bg-luxury-200 mx-2"></div>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className={`flex items-center space-x-1 ${
                  isScrolled || !isHomePage ? 'text-luxury-900' : 'text-white'
                }`}>
                  <User size={18} />
                  <span className="ml-1">{user.email?.split('@')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link to="/account" className="block px-4 py-2 text-sm text-luxury-700 hover:bg-luxury-50">
                      {t('navigation.account')}
                    </Link>
                    <Link to="/cart" className="block px-4 py-2 text-sm text-luxury-700 hover:bg-luxury-50">
                      {t('navigation.cart')}
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-luxury-700 hover:bg-luxury-50">
                        {t('navigation.admin')}
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-luxury-700 hover:bg-luxury-50"
                    >
                      {t('navigation.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className={`${isScrolled || !isHomePage ? 'text-luxury-700 hover:text-luxury-900' : 'text-white/80 hover:text-white'} transition-colors`}>
                  {t('buttons.login')}
                </Link>
                <Link to="/signup" className={`px-3 py-1 rounded-md ${isScrolled || !isHomePage ? 'bg-luxury-800 text-white hover:bg-luxury-900' : 'bg-white text-luxury-900 hover:bg-white/90'} transition-colors`}>
                  {t('buttons.signup')}
                </Link>
              </div>
            )}
          </div>

          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageSelector />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`${isScrolled || !isHomePage ? 'text-luxury-900' : 'text-white'}`}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white shadow-lg">
          <div className="container-luxury py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" label={t('navigation.home')} />
              <MobileNavLink to="/about" label={t('navigation.about')} />
              <MobileNavLink to="/products" label={t('navigation.products')} />
              <MobileNavLink to="/contact" label={t('navigation.contact')} />

              <div className="w-full h-px bg-luxury-100 my-2"></div>

              {user ? (
                <>
                  <MobileNavLink to="/account" label={t('navigation.account')} />
                  <MobileNavLink to="/cart" label={t('navigation.cart')} />
                  {isAdmin && (
                    <MobileNavLink to="/admin" label={t('navigation.admin')} />
                  )}
                  <button 
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-luxury-600 hover:bg-luxury-50 hover:text-luxury-900"
                  >
                    {t('navigation.logout')}
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/login" label={t('buttons.login')} />
                  <MobileNavLink to="/signup" label={t('buttons.signup')} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop NavLink component
const NavLink = ({ to, label, isLight }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`inline-block px-2 py-1 ${
        isActive 
          ? isLight ? 'text-white border-b-2 border-white' : 'text-luxury-900 border-b-2 border-luxury-800' 
          : isLight ? 'text-white/80 hover:text-white hover:border-b-2 hover:border-white/50' 
          : 'text-luxury-600 hover:text-luxury-900 hover:border-b-2 hover:border-luxury-300'
      } transition-all`}
    >
      {label}
    </Link>
  );
};

// Mobile NavLink component
const MobileNavLink = ({ to, label }) => {
  return (
    <Link to={to} className="block px-4 py-2 text-luxury-600 hover:bg-luxury-50 hover:text-luxury-900">
      {label}
    </Link>
  );
};

export default NavbarTranslated;
