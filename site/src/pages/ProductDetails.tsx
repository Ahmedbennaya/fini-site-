import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

type Product = Tables['products'];

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        // Ensure images is an array
        if (typeof data.images === 'string') {
          data.images = JSON.parse(data.images);
        }

        setProduct(data);
        if (Array.isArray(data.images) && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }

        // Fetch related products from the same category
        const { data: related, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', data.category)
          .neq('id', id)
          .limit(4);

        if (relatedError) throw relatedError;

        setRelatedProducts(related);
      } catch (error: any) {
        toast({
          title: t('error'),
          description: error.message || t('failedToLoadProduct'),
          variant: 'destructive',
        });
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, toast, t]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem(product, quantity);

    toast({
      title: t('addedToCart'),
      description: t('productAddedToCart', { product: product.name }),
    });
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20">
        <p className="text-center">{t('loadingProduct')}...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-20">
        <p className="text-center">{t('productNotFound')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-gray-100 h-96">
            <img
              src={selectedImage || (Array.isArray(product.images) && product.images[0]) || '/placeholder.svg'}
              alt={product.name}
              className="h-full w-full object-contain object-center"
            />
          </div>

          {Array.isArray(product.images) && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden w-20 h-20 ${
                    selectedImage === image ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500">{t('category')}: {product.category}</p>
          </div>

          <div className="flex items-center space-x-4">
            {product.sale_price ? (
              <>
                <span className="text-2xl font-bold">{product.sale_price.toFixed(2)} DT</span>
                <span className="text-lg text-gray-500 line-through">{product.price.toFixed(2)} DT</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  {Math.round((1 - product.sale_price / product.price) * 100)}% {t('off')}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">{product.price.toFixed(2)} DT</span>
            )}
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-medium mb-2">{t('description')}</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">{t('material')}</h2>
            <p className="text-gray-700">{product.material}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">{t('availability')}</h2>
            {product.stock > 0 ? (
              <p className="text-green-600">
                {t('inStock')} ({product.stock} {t('available')})
              </p>
            ) : (
              <p className="text-red-600">{t('outOfStock')}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={product.stock <= quantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('addToCart')}
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden cursor-pointer"
                onClick={() => navigate(`/products/${relatedProduct.id}`)}
              >
                <div className="aspect-square overflow-hidden">
                  {(() => {
                    // Ensure images is an array
                    const images =
                      typeof relatedProduct.images === 'string'
                        ? JSON.parse(relatedProduct.images)
                        : relatedProduct.images;

                    return (
                      <img
                        src={
                          Array.isArray(images) && images.length > 0
                            ? images[0] // Use the first image in the array
                            : '/placeholder.svg' // Fallback image
                        }
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    );
                  })()}
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{relatedProduct.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {relatedProduct.sale_price ? (
                      <>
                        <span className="font-bold">{relatedProduct.sale_price.toFixed(2)} DT</span>
                        <span className="text-sm text-gray-500 line-through">{relatedProduct.price.toFixed(2)} DT</span>
                      </>
                    ) : (
                      <span className="font-bold">{relatedProduct.price.toFixed(2)} DT</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;