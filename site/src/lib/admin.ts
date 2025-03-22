
import { supabase } from './supabase';
import { TablesInsert } from './supabase';
import { toast } from '@/components/ui/use-toast';

// Admin-only functions - these will now work correctly with our fixed RLS policies

export async function getAllOrders(options?: { 
  status?: 'pending' | 'processing' | 'completed' | 'cancelled',
  limit?: number,
  offset?: number
}) {
  try {
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
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') {
  try {
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
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    // We need to get the profiles data - this should now work with our fixed RLS
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw error;
  }
}

export async function setAdminStatus(userId: string, isAdmin: boolean) {
  try {
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
  } catch (error) {
    console.error('Error in setAdminStatus:', error);
    throw error;
  }
}

export async function createCategory(category: TablesInsert['categories']) {
  try {
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
  } catch (error) {
    console.error('Error in createCategory:', error);
    throw error;
  }
}

export async function updateCategory(id: string, updates: Partial<TablesInsert['categories']>) {
  try {
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
  } catch (error) {
    console.error('Error in updateCategory:', error);
    throw error;
  }
}

export async function deleteCategory(id: string) {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    throw error;
  }
}

// Generate a dashboard summary for admins
export async function getDashboardSummary() {
  try {
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
    const { data: recentOrders, error: recentOrdersError } = await supabase
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
    
    if (recentOrdersError) {
      console.error('Error fetching recent orders:', recentOrdersError);
    }
    
    return {
      totalProducts: productsResponse.count || 0,
      totalOrders: ordersResponse.count || 0,
      pendingOrders: pendingOrdersResponse.count || 0,
      totalUsers: usersResponse.count || 0,
      recentOrders: recentOrders || []
    };
  } catch (error) {
    console.error('Error in getDashboardSummary:', error);
    throw error;
  }
}