
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-24">
      <div className="container-luxury">
        <div className="max-w-xl mx-auto text-center">
          <span className="inline-block text-6xl font-display mb-6">404</span>
          <h1 className="heading-lg mb-6">{t('notFound.title')}</h1>
          <p className="text-luxury-600 mb-8">
            {t('notFound.description')}
          </p>
          <Link 
            to="/" 
            className="btn-luxury inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            {t('buttons.back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
