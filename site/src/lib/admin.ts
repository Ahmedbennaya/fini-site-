
import { supabase } from './supabase';
import { TablesInsert } from './supabase';

// Admin-only functions - these will fail if the user doesn't have admin privileges due to RLS

export async function getAllOrders(options?: { 
  status?: 'pending' | 'processing' | 'completed' | 'cancelled',
  limit?: number,
  offset?: number
}) {
  let query = supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (name)
      )
    `);
  
  if (options?.status) {
    query = query.eq('status', options.status);
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
  
  return data || [];
}

export async function updateOrderStatus(orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
  
  return data;
}

export async function getAllUsers() {
  // We need to get the auth.users data through the profiles table
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
    
  if (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
  
  return data || [];
}

export async function setAdminStatus(userId: string, isAdmin: boolean) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error updating admin status:', error);
    throw error;
  }
  
  return data;
}

export async function createCategory(category: TablesInsert['categories']) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }
  
  return data;
}

export async function updateCategory(id: string, updates: Partial<TablesInsert['categories']>) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error updating category:', error);
    throw error;
  }
  
  return data;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
  
  return true;
}

// Generate a dashboard summary for admins
export async function getDashboardSummary() {
  const [
    productsResponse,
    ordersResponse,
    pendingOrdersResponse,
    usersResponse
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('profiles').select('*', { count: 'exact', head: true })
  ]);
  
  // Recent orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items!inner (
        *,
        products (name)
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5);
  
  return {
    totalProducts: productsResponse.count || 0,
    totalOrders: ordersResponse.count || 0,
    pendingOrders: pendingOrdersResponse.count || 0,
    totalUsers: usersResponse.count || 0,
    recentOrders: recentOrders || []
  };
}
