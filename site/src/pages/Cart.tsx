
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Minus, Plus, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Cart = () => {
  const { t } = useTranslation();
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productToRemove, setProductToRemove] = useState<string | null>(null);

  const handleRemoveItem = (productId: string) => {
    setProductToRemove(null);
    removeItem(productId);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  // Calculate total with shipping and tax
  const shipping = subtotal > 300 ? 0 : 25; // Free shipping over $300
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="heading-lg mb-4">{t('cart.empty')}</h1>
            <p className="text-luxury-600 mb-8 max-w-md mx-auto">
              Explore our collections to find the perfect curtains for your interior.
            </p>
            <Link to="/products" className="btn-luxury">
              {t('cart.startShopping')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <h1 className="heading-lg mb-8">{t('cart.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
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
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-luxury-200 rounded-full">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-luxury-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-luxury-100 transition-colors"
                            disabled={item.quantity >= item.stock}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => setProductToRemove(item.id)}
                          className="text-luxury-600 hover:text-luxury-800 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-sm">
              <h2 className="heading-sm mb-4">{t('cart.summary')}</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.shipping')}</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.tax')}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-luxury-200 pt-4 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>{t('cart.total')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full btn-luxury mt-4"
                >
                  {t('buttons.checkout')}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="text-center mt-4">
                  <Link to="/products" className="text-luxury-600 hover:text-luxury-800 transition-colors text-sm">
                    {t('buttons.continueShopping')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation dialog for removing items */}
      <Dialog
        open={productToRemove !== null}
        onOpenChange={(isOpen) => !isOpen && setProductToRemove(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove item from cart</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this item from your cart?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setProductToRemove(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => productToRemove && handleRemoveItem(productToRemove)}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Cart;
