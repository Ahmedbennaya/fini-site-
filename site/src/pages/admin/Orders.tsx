
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Search, Eye } from 'lucide-react';

interface Order {
  id: string;
  created_at: string;
  user_id: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  customer_name?: string | null;
  items_count?: number;
}

interface ShippingAddress {
  first_name: string;
  last_name: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
}

const AdminOrders = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    items: {
      id: string;
      product_name: string;
      price: number;
      quantity: number;
    }[];
    customer: {
      name?: string | null;
    } | null;
    shipping_address: ShippingAddress | null;
  } | null>(null);

  useEffect(() => {
    if (isAdmin === false) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Query orders directly
      let query = supabase.from('orders').select(`
        *,
        order_items (id)
      `);
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Create a map to store customer names
      const customerNames: Record<string, string | null> = {};
      
      // Get profile information for each order's user_id
      for (const order of data || []) {
        if (!customerNames[order.user_id]) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', order.user_id)
            .single();
            
          if (profile) {
            const name = profile.first_name && profile.last_name 
              ? `${profile.first_name} ${profile.last_name}`
              : profile.first_name || profile.last_name || null;
            customerNames[order.user_id] = name;
          }
        }
      }
      
      const processedOrders = (data || []).map(order => ({
        id: order.id,
        created_at: order.created_at,
        user_id: order.user_id,
        status: order.status as 'pending' | 'processing' | 'completed' | 'cancelled',
        total: order.total,
        customer_name: customerNames[order.user_id],
        items_count: order.order_items?.length || 0,
      }));
      
      setOrders(processedOrders);
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToLoadOrders'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    
    try {
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          id,
          price,
          quantity,
          products (name)
        `)
        .eq('order_id', order.id);
      
      if (itemsError) throw itemsError;
      
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('shipping_address')
        .eq('id', order.id)
        .single();
      
      if (orderError) throw orderError;
      
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', order.user_id)
        .single();
      
      if (userError && userError.code !== 'PGRST116') {
        throw userError;
      }
      
      // Process the shipping address to ensure it matches the expected type
      let shippingAddress: ShippingAddress | null = null;
      if (orderData.shipping_address && typeof orderData.shipping_address === 'object') {
        const address = orderData.shipping_address as Record<string, any>;
        shippingAddress = {
          first_name: String(address.first_name || ''),
          last_name: String(address.last_name || ''),
          address: String(address.address || ''),
          apartment: address.apartment ? String(address.apartment) : undefined,
          city: String(address.city || ''),
          state: String(address.state || ''),
          postal_code: String(address.postal_code || ''),
          country: String(address.country || ''),
          phone: String(address.phone || '')
        };
      }
      
      setOrderDetails({
        items: (items || []).map(item => {
          const product = item.products as any;
          return {
            id: item.id,
            product_name: product ? product.name : 'Unknown Product',
            price: item.price,
            quantity: item.quantity,
          };
        }),
        customer: userData ? {
          name: userData.first_name && userData.last_name 
            ? `${userData.first_name} ${userData.last_name}`
            : userData.first_name || userData.last_name || null,
        } : null,
        shipping_address: shippingAddress
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToLoadOrderDetails'),
        variant: 'destructive',
      });
    }
  };

  const updateOrderStatus = async (status: string) => {
    if (!selectedOrder) return;
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', selectedOrder.id);
      
      if (error) throw error;
      
      setOrders(orders.map(o => 
        o.id === selectedOrder.id ? { ...o, status: status as 'pending' | 'processing' | 'completed' | 'cancelled' } : o
      ));
      
      setSelectedOrder({
        ...selectedOrder,
        status: status as 'pending' | 'processing' | 'completed' | 'cancelled',
      });
      
      toast({
        title: t('success'),
        description: t('orderStatusUpdated'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToUpdateOrderStatus'),
        variant: 'destructive',
      });
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.customer_name && order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('orderManagement')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-${selectedOrder ? '2' : '3'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center w-full md:w-auto">
              <Search className="mr-2 h-4 w-4 text-gray-500" />
              <Input
                placeholder={t('searchOrdersOrCustomers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('filterByStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allOrders')}</SelectItem>
                <SelectItem value="pending">{t('pending')}</SelectItem>
                <SelectItem value="processing">{t('processing')}</SelectItem>
                <SelectItem value="completed">{t('completed')}</SelectItem>
                <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            <div className="text-center py-10">{t('loading')}...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-10">{t('noOrdersFound')}</div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('orderId')}</TableHead>
                    <TableHead>{t('date')}</TableHead>
                    <TableHead>{t('customer')}</TableHead>
                    <TableHead className="text-center">{t('status')}</TableHead>
                    <TableHead className="text-center">{t('items')}</TableHead>
                    <TableHead className="text-right">{t('total')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell>{order.customer_name || t('unknownCustomer')}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {t(order.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">{order.items_count || 0}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {t('view')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        
        {selectedOrder && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('orderDetails')}</CardTitle>
                <CardDescription>
                  {t('orderId')}: {selectedOrder.id.slice(0, 8)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">{t('customer')}</h3>
                  <p>{orderDetails?.customer?.name || selectedOrder.customer_name || t('unknownName')}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">{t('shippingAddress')}</h3>
                  {orderDetails?.shipping_address ? (
                    <div className="text-sm">
                      <p>{orderDetails.shipping_address.first_name} {orderDetails.shipping_address.last_name}</p>
                      <p>{orderDetails.shipping_address.address}</p>
                      {orderDetails.shipping_address.apartment && (
                        <p>{orderDetails.shipping_address.apartment}</p>
                      )}
                      <p>
                        {orderDetails.shipping_address.city}, {orderDetails.shipping_address.state} {orderDetails.shipping_address.postal_code}
                      </p>
                      <p>{orderDetails.shipping_address.country}</p>
                      <p>{orderDetails.shipping_address.phone}</p>
                    </div>
                  ) : (
                    <p>{t('addressNotAvailable')}</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium">{t('orderStatus')}</h3>
                  <div className="flex space-x-2 mt-2">
                    <Select
                      defaultValue={selectedOrder.status}
                      onValueChange={updateOrderStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectStatus')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{t('pending')}</SelectItem>
                        <SelectItem value="processing">{t('processing')}</SelectItem>
                        <SelectItem value="completed">{t('completed')}</SelectItem>
                        <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium">{t('orderItems')}</h3>
                  {orderDetails?.items.length === 0 ? (
                    <p>{t('noItemsInOrder')}</p>
                  ) : (
                    <div className="space-y-2 mt-2">
                      {orderDetails?.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.product_name} × {item.quantity}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t mt-2">
                        <div className="flex justify-between font-medium">
                          <span>{t('total')}</span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium">{t('orderDate')}</h3>
                  <p>{formatDate(selectedOrder.created_at)}</p>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedOrder(null)}
                >
                  {t('close')}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
