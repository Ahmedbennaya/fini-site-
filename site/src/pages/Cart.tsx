import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import SEO from '@/components/SEO';

const Cart = () => {
  const { t } = useTranslation();
  const { items } = useCart();
  const [productToRemove, setProductToRemove] = useState<string | null>(null);

  // Schema for SEO
  const cartSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": "Portfolio - Bargaoui Rideaux Tahar",
    "description": "Découvrez notre portfolio de rideaux de luxe et textiles d'ameublement chez Bargaoui Rideaux Tahar.",
  };

  if (items.length === 0) {
    return (
      <main>
        <SEO
          title="Portfolio | Bargaoui Rideaux Tahar"
          description="Découvrez notre portfolio de rideaux de luxe et textiles d'ameublement chez Bargaoui Rideaux Tahar."
          keywords="portfolio, rideaux de luxe, textiles d'ameublement, Bargaoui Rideaux"
          canonicalUrl="/portfolio"
          schemaData={cartSchema}
        />
        <section className="section-padding">
          <div className="container-luxury">
            <div className="text-center py-16">
              <h1 className="heading-lg mb-4">{t('portfolio.empty')}</h1>
              <p className="text-luxury-600 mb-8 max-w-md mx-auto">
                Explorez nos collections pour découvrir nos réalisations.
              </p>
              <Link to="/products" className="btn-luxury">
                {t('portfolio.explore')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title="Portfolio | Bargaoui Rideaux Tahar"
        description="Découvrez notre portfolio de rideaux de luxe et textiles d'ameublement chez Bargaoui Rideaux Tahar."
        keywords="portfolio, rideaux de luxe, textiles d'ameublement, Bargaoui Rideaux"
        canonicalUrl="/portfolio"
        schemaData={cartSchema}
      />
      <section className="section-padding">
        <div className="container-luxury">
          <h1 className="heading-lg mb-8">{t('portfolio.title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Portfolio items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="glass p-4 rounded-sm">
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium">
                          <h3 className="text-lg font-medium">
                            <Link to={`/products/${item.id}`} className="hover:text-luxury-800 transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
