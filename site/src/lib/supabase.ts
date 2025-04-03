
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client directly
export const supabase = supabaseClient;

export type Tables = {
  products: {
    id: string;
    created_at: string;
    name: string;
    description: string;
    price: number;
    sale_price: number | null;
    stock: number;
    category: string;
    material: string;
    images: string[];
    is_featured: boolean;
    is_active: boolean;
  };
  categories: {
    id: string;
    created_at: string;
    name: string;
    description: string;
    slug: string;
  };
  orders: {
    id: string;
    created_at: string;
    user_id: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    total: number;
    shipping_address: {
      first_name: string;
      last_name: string;
      address: string;
      apartment?: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
      phone: string;
    };
    billing_address?: {
      first_name: string;
      last_name: string;
      address: string;
      apartment?: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
      phone: string;
    };
    payment_intent_id?: string;
    shipping_method: 'standard' | 'express';
    discount?: number;
    coupon_code?: string;
  };
  order_items: {
    id: string;
    created_at: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
  };
  addresses: {
    id: string;
    created_at: string;
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    is_default: boolean;
  };
  profiles: {
    id: string;
    created_at: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    is_admin: boolean;
  };
};

export type TablesInsert = {
  products: Omit<Tables['products'], 'id' | 'created_at'>;
  categories: Omit<Tables['categories'], 'id' | 'created_at'>;
  orders: Omit<Tables['orders'], 'id' | 'created_at'>;
  order_items: Omit<Tables['order_items'], 'id' | 'created_at'>;
  addresses: Omit<Tables['addresses'], 'id' | 'created_at'>;
  profiles: Omit<Tables['profiles'], 'id' | 'created_at'>;
};
