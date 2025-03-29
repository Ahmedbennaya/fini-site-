import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';

const ProductShowcase = () => {
  const { t } = useTranslation();
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      try {
        const result = await getProducts({ featured: true, limit: 100 });
        return result;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    }
  });

  // Dynamically generate categories based on actual product categories
  const categories = [
    { id: 'all', name: t('categories.all') || 'All' },
    ...Array.from(new Set(products.map(product => product.category)))
      .filter(category => category) // Remove empty categories
      .map(category => ({
        id: category.toLowerCase().replace(/\s+/g, '-'),
        name: category.charAt(0).toUpperCase() + category.slice(1)
      }))
  ];

  // Improved filtering logic
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.category.toLowerCase() === 
        categories.find(cat => cat.id === selectedCategory)?.name.toLowerCase()
      );

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const productId = parseInt(entry.target.id.replace('product-', ''));
          setVisibleProducts(prev => [...prev, productId]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    products.forEach(product => {
      const element = document.getElementById(`product-${product.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [products]);

  // Log categories for debugging
  console.log('Generated Categories:', categories);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-luxury">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">{t('products.title')}</h2>
          <p className="text-luxury-600">
            {t('products.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  console.log(`Selected category: ${category.id}`);
                  setSelectedCategory(category.id);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-luxury-800 text-white'
                    : 'bg-luxury-100 text-luxury-700 hover:bg-luxury-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-800"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => {
                // Ensure images is an array
                const images =
                  typeof product.images === 'string'
                    ? JSON.parse(product.images)
                    : product.images;

                return (
                  <div 
                    key={product.id}
                    id={`product-${product.id}`}
                    className={`relative group overflow-hidden rounded-sm transition-all duration-500 ${
                      visibleProducts.includes(parseInt(product.id.toString())) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={
                          Array.isArray(images) && images.length > 0
                            ? images[0]
                            : '/placeholder.svg' // Fallback image
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-xl md:text-2xl font-medium text-white mb-2">{product.name}</h3>
                      <p className="text-white/80 mb-4 max-w-md">{product.description}</p>
                      <Link 
                        to={`/materials/${product.material}`}
                        className="text-white flex items-center group hover:underline"
                      >
                        <span>{t('buttons.viewDetails')}</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p>No products found for this category.</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/products" className="btn-luxury-outline">
            {t('buttons.viewDetails')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;