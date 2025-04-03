import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Filter, Heart, Star } from 'lucide-react';

const MaterialDetails = () => {
  const { t } = useTranslation();
  const { material } = useParams<{ material: string }>();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    const fetchProductsByMaterial = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('material', material);

        if (error) {
          console.error('Error fetching products:', error.message);
          return;
        }

        // Ensure images are parsed as arrays
        const parsedData = data.map((product) => ({
          ...product,
          images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
        }));

        setProducts(parsedData || []);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByMaterial();
  }, [material]);

  const sortProducts = (products: any[]) => {
    switch (sortBy) {
      case 'newest':
        return [...products].sort((a, b) => {
          if (a.created_at && b.created_at) {
            return a.created_at < b.created_at ? 1 : -1;
          }
          return 0;
        });
      case 'popular':
      default:
        return [...products].sort((a, b) => {
          if (a.rating && b.rating) {
            return parseFloat(b.rating) - parseFloat(a.rating);
          }
          return 0;
        });
    }
  };

  const sortedProducts = sortProducts(products);

  const getHeroImageUrl = () => {
    const materialImages = {
      velour: '/materials/velour-hero.jpg',
      leather: '/materials/leather-hero.jpg',
      cotton: '/materials/cotton-hero.jpg',
      silk: '/materials/silk-hero.jpg',
      'tringles-rideaux': '/materials/tringles-rideaux-hero.jpg', // Fixed key format
      default: '/materials/default-material-hero.jpg', // Fallback image
    };

    // Normalize material values to match the keys in materialImages
    const normalizedMaterial = material?.trim().toLowerCase();
    const materialKey = normalizedMaterial === 'velours' ? 'velour' : normalizedMaterial; // Handle "velours" case
    const imageUrl = materialImages[materialKey] || materialImages.default;

    console.log('Material:', material, 'Material Key:', materialKey, 'Image URL:', imageUrl);
    return imageUrl;
  };

  const productCountText = `${products.length} ${products.length === 1 ? 'product' : 'products'}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with material image */}
      <div className="relative h-96">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={getHeroImageUrl()}
            alt={`${material} material`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative container mx-auto h-full flex flex-col justify-end py-12 px-4">
          <Link to="/products" className="inline-flex items-center text-white hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('allMaterials', 'All Materials')}
          </Link>
          <h1 className="text-5xl font-bold mb-3 text-white capitalize">{material}</h1>
          <p className="text-gray-100 max-w-2xl text-lg mb-6">
            {material.toLowerCase() === 'velour'
              ? 'Luxurious velour fabric known for its soft, plush texture and elegant appearance. Perfect for upholstery and premium clothing.'
              : `${material} material with unique properties and applications.`}
          </p>
          <div className="flex items-center">
            <span className="bg-white px-4 py-1 rounded-full text-sm font-medium text-gray-800">
              {productCountText}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto py-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <img
              src="/empty-state.svg"
              alt="No products"
              className="w-32 h-32 mx-auto mb-4 opacity-60"
            />
            <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              No products available in {material} material.
            </p>
            <Link
              to="/materials"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Explore Other Materials
            </Link>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <Filter className="w-5 h-5 text-gray-500 mr-2" />
                <span className="font-medium">{productCountText}</span>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={
                        Array.isArray(product.images) && product.images.length > 0
                          ? product.images[0]
                          : '/placeholder.svg'
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      {product.rating && (
                        <>
                          <div className="flex text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-300">•</span>
                        </>
                      )}
                      <span className="text-sm text-gray-500 capitalize">{material}</span>
                    </div>

                    <h3 className="text-lg font-medium mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MaterialDetails;