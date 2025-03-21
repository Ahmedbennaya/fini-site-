
import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Tables } from '@/lib/supabase';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Tables['products'], quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  // Add the missing properties used in other files
  cart: CartItem[];
  calculateTotal: () => number;
  addToCart: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bargaoui_cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Calculate derived values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Tables['products'], quantity = 1) => {
    if (quantity <= 0) return;
    
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...currentItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        
        // Check if new quantity exceeds stock
        if (newQuantity > product.stock) {
          toast({
            title: "Maximum stock reached",
            description: `Sorry, only ${product.stock} items available`,
            variant: "destructive",
          });
          updatedItems[existingItemIndex].quantity = product.stock;
        } else {
          updatedItems[existingItemIndex].quantity = newQuantity;
          toast({
            title: "Cart updated",
            description: `${product.name} quantity updated in cart`,
          });
        }
        
        return updatedItems;
      } else {
        // Add new item
        const finalQuantity = Math.min(quantity, product.stock);
        
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        
        return [...currentItems, {
          id: product.id,
          name: product.name,
          price: product.sale_price || product.price,
          quantity: finalQuantity,
          image: product.images[0] || '',
          stock: product.stock
        }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === productId);
      
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} removed from your cart`,
        });
      }
      
      return currentItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(currentItems => {
      const updatedItems = currentItems.map(item => {
        if (item.id === productId) {
          // Check if new quantity exceeds stock
          if (quantity > item.stock) {
            toast({
              title: "Maximum stock reached",
              description: `Sorry, only ${item.stock} items available`,
              variant: "destructive",
            });
            return { ...item, quantity: item.stock };
          }
          
          return { ...item, quantity };
        }
        return item;
      });
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  // Add the missing functions
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Adding addToCart as an alias for addItem for compatibility
  const addToCart = (item: CartItem) => {
    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      sale_price: null,
      stock: item.stock,
      images: [item.image],
    } as Tables['products'];
    
    addItem(product, item.quantity);
  };

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      // Add the missing properties
      cart: items,
      calculateTotal,
      addToCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
