import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';

const MaterialDetails = () => {
  const { t } = useTranslation();
  const { material } = useParams<{ material: string }>();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByMaterial = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products') // Replace 'products' with your actual table name
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

  if (loading) {
    return (
      <div className="container mx-auto py-20">
        <p className="text-center">{t('loadingProducts')}...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto py-20">
        <p className="text-center">{t('noProductsInMaterial')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {t('material')} - {material}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-square overflow-hidden">
              <img
                src={
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0] // Use the first image in the array
                    : '/placeholder.svg' // Fallback image
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-gray-800 font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialDetails;