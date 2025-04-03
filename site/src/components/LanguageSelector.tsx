
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇹🇳' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  useEffect(() => {
    // Update current language when i18n language changes
    setCurrentLang(i18n.language);
  }, [i18n.language]);
  
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // For RTL support with Arabic - only for navbar
    if (langCode === 'ar') {
      document.getElementById('navbar-container')?.setAttribute('dir', 'rtl');
      document.getElementById('navbar-container')?.classList.add('rtl');
    } else {
      document.getElementById('navbar-container')?.setAttribute('dir', 'ltr');
      document.getElementById('navbar-container')?.classList.remove('rtl');
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);
  
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center space-x-1 py-2 px-3 border border-transparent hover:border-luxury-200 rounded-sm text-luxury-600 transition-all"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={16} className="mr-1" />
        <span className="mr-1">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.name}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-luxury-200 rounded-sm shadow-md z-50">
          <ul className="py-1">
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    changeLanguage(language.code);
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center ${
                    language.code === currentLang 
                      ? 'bg-luxury-50 text-luxury-900' 
                      : 'hover:bg-luxury-50 text-luxury-600'
                  }`}
                >
                  <span className="mr-2">{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
