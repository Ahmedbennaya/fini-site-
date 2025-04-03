import { supabase } from './supabase';
import { Tables, TablesInsert } from './supabase';
import { toast } from '@/components/ui/use-toast';

// =========== PRODUCTS API ===========

export async function getProducts(options?: { 
  featured?: boolean, 
  category?: string, 
  limit?: number
}) {
  try {
    let query = supabase.from('products').select('*').eq('is_active', true); // Apply is_active filter here
    
    if (options?.featured) {
      query = query.eq('is_featured', true);
    }
    
    if (options?.category) {
      query = query.eq('category', options.category);
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      toast({ title: 'Error fetching products', description: error.message, variant: 'destructive' });
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getProducts:', error);
    toast({ title: 'Error', description: 'Failed to fetch products.', variant: 'destructive' });
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching product:', error);
      toast({ title: 'Error fetching product', description: error.message, variant: 'destructive' });
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getProductById:', error);
    toast({ title: 'Error', description: 'Failed to fetch product.', variant: 'destructive' });
    throw error;
  }
}

export async function createProduct(product: TablesInsert['products']) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error creating product:', error);
    toast({ title: 'Error creating product', description: error.message, variant: 'destructive' });
    throw error;
  }
  
  return data;
}

export async function updateProduct(id: string, updates: Partial<TablesInsert['products']>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error updating product:', error);
    toast({ title: 'Error updating product', description: error.message, variant: 'destructive' });
    throw error;
  }
  
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting product:', error);
    toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    throw error;
  }
  
  return true;
}

// =========== CATEGORIES API ===========

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
      
    if (error) {
      console.error('Error fetching categories:', error);
      toast({ title: 'Error fetching categories', description: error.message, variant: 'destructive' });
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getCategories:', error);
    toast({ title: 'Error', description: 'Failed to fetch categories.', variant: 'destructive' });
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error fetching category:', error);
      toast({ title: 'Error fetching category', description: error.message, variant: 'destructive' });
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getCategoryBySlug:', error);
    toast({ title: 'Error', description: 'Failed to fetch category.', variant: 'destructive' });
    throw error;
  }
}

// =========== ORDERS API ===========

export async function createOrder(order: TablesInsert['orders'], orderItems: Omit<TablesInsert['order_items'], 'order_id'>[]) {
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select('*')
    .single();
    
  if (orderError) {
    console.error('Error creating order:', orderError);
    toast({ title: 'Error creating order', description: orderError.message, variant: 'destructive' });
    throw orderError;
  }
  
  const items = orderItems.map(item => ({
    ...item,
    order_id: newOrder.id
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(items);
    
  if (itemsError) {
    console.error('Error adding order items:', itemsError);
    toast({ title: 'Error adding order items', description: itemsError.message, variant: 'destructive' });
    throw itemsError;
  }
  
  return newOrder;
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user orders:', error);
    toast({ title: 'Error fetching user orders', description: error.message, variant: 'destructive' });
    throw error;
  }
  
  return data || [];
}

export async function getOrderById(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('id', orderId)
    .single();
    
  if (error) {
    console.error('Error fetching order:', error);
    toast({ title: 'Error fetching order', description: error.message, variant: 'destructive' });
    throw error;
  }
  
  return data;
}

// =========== ADDRESSES API ===========

export async function getUserAddresses(userId: string) {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });
    
  if (error) {
    console.error('Error fetching user addresses:', error);
    toast({ title: 'Error fetching user addresses', description: error.message, variant: 'destructive' });
    throw error;
  }
  
  return data || [];
}

export async function addUserAddress(address: TablesInsert['addresses']) {
  if (address.is_default) {
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', address.user_id)
      .eq('is_default', true);
  }
  
  const { data, error } = await supabase
    .from('addresses')
    .insert(address)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error adding address:', error);
    toast({ title: 'Error adding address', description: error.message, variant: 'destructive' });
    throw error;
  }
  
  return data;
}

// =========== USER PROFILE API ===========

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      toast({ title: 'Error fetching user profile', description: error.message, variant: 'destructive' });
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    toast({ title: 'Error', description: 'Failed to fetch user profile.', variant: 'destructive' });
    throw error;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<TablesInsert['profiles']>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select('*')
      .single();
      
    if (error) {
      console.error('Error updating user profile:', error);
      toast({ title: 'Error updating user profile', description: error.message, variant: 'destructive' });
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    toast({ title: 'Error', description: 'Failed to update user profile.', variant: 'destructive' });
    throw error;
  }
}

// Check if current user is admin - updated to use our secure function
export async function checkIsAdmin() {
  try {
    const { data, error } = await supabase.rpc('get_user_role');
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return data === 'admin';
  } catch (error) {
    console.error('Error in checkIsAdmin:', error);
    return false;
  }
}