import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { getProducts } from '@/lib/api';

// Define Product interface for type safety
interface Product {
  id: string | number;
  name: string;
  description: string;
  images: string[] | string;
  price: number;
  category: string;
}

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data: products = [], isLoading, isError } = useQuery<Product[]>({
    queryKey: ['category-products', categoryId],
    queryFn: async () => {
      try {
        const result = await getProducts({ category: categoryId });
        return result.map(product => ({
          ...product,
          images: Array.isArray(product.images) 
            ? product.images 
            : typeof product.images === 'string' 
              ? JSON.parse(product.images) 
              : ['/placeholder.svg']
        }));
      } catch (error) {
        console.error('Error fetching category products:', error);
        return [];
      }
    }
  });

  // Category name mapping
  const categoryNames: { [key: string]: string } = {
    'all': 'Tous les Produits',
    'premium': 'Collection Premium',
    'classic': 'Collection Classique',
    'accessoires-rideaux': 'Accessoires de Rideaux',
    'embrasses-rideaux': 'Embrasses Rideaux',
    'tringles-rideaux': 'Tringles Rideaux'
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-800"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 min-h-screen">
        <p className="text-red-500 text-xl">Erreur de chargement des produits</p>
      </div>
    );
  }

  return (
    <div className="section-padding bg-white min-h-screen">
      <div className="container-luxury">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="heading-lg mb-4">
            {categoryNames[categoryId || 'all']}
          </h1>
          <p className="text-luxury-600">
            Découvrez notre sélection exclusive de produits dans cette catégorie
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-luxury-600">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => {
              // Ensure images is an array with a fallback
              const images = Array.isArray(product.images) 
                ? product.images 
                : ['/placeholder.svg'];

              return (
                <div 
                  key={product.id} 
                  className="relative group overflow-hidden rounded-sm transition-all duration-500 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={images[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-white/80 mb-4 max-w-md line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">
                        {product.price.toLocaleString()} TND
                      </span>
                      <Link 
                        to={`/products/${product.id}`} 
                        className="text-white flex items-center group hover:underline"
                      >
                        <span>Détails</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="btn-luxury-outline"
          >
            Retour aux produits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;