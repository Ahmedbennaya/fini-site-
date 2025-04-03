
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Search, Eye } from 'lucide-react';

interface Customer {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  is_admin: boolean;
  order_count: number;
  total_spent: number;
}

const AdminCustomers = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<{
    id: string;
    created_at: string;
    status: string;
    total: number;
  }[]>([]);

  useEffect(() => {
    // Redirect if not admin
    if (isAdmin === false) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // Fetch users with their profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          avatar_url,
          created_at,
          is_admin
        `);
      
      if (profilesError) throw profilesError;
      
      // For each user, get order count and total spent
      const customersWithOrders = await Promise.all(
        (profiles || []).map(async (profile) => {
          // Get orders for this user
          const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('id, total')
            .eq('user_id', profile.id);
          
          if (ordersError) throw ordersError;
          
          const orderCount = orders ? orders.length : 0;
          const totalSpent = orders ? orders.reduce((sum, order) => sum + order.total, 0) : 0;
          
          return {
            ...profile,
            order_count: orderCount,
            total_spent: totalSpent,
          };
        })
      );
      
      setCustomers(customersWithOrders);
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToLoadCustomers'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const viewCustomerDetails = async (customer: Customer) => {
    setSelectedCustomer(customer);
    
    try {
      // Fetch customer orders
      const { data, error } = await supabase
        .from('orders')
        .select('id, created_at, status, total')
        .eq('user_id', customer.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setCustomerOrders(data || []);
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToLoadCustomerOrders'),
        variant: 'destructive',
      });
    }
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    (customer.first_name && customer.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (customer.last_name && customer.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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

  const getCustomerName = (customer: Customer) => {
    if (customer.first_name && customer.last_name) {
      return `${customer.first_name} ${customer.last_name}`;
    } else if (customer.first_name) {
      return customer.first_name;
    } else if (customer.last_name) {
      return customer.last_name;
    } else {
      return t('unnamedCustomer');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('customerManagement')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-${selectedCustomer ? '2' : '3'}`}>
          <div className="flex items-center mb-6">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <Input
              placeholder={t('searchCustomers')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          {loading ? (
            <div className="text-center py-10">{t('loading')}...</div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-10">{t('noCustomersFound')}</div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('customer')}</TableHead>
                    <TableHead className="text-center">{t('registeredDate')}</TableHead>
                    <TableHead className="text-center">{t('orders')}</TableHead>
                    <TableHead className="text-right">{t('spent')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {getCustomerName(customer)}
                      </TableCell>
                      <TableCell className="text-center">{formatDate(customer.created_at)}</TableCell>
                      <TableCell className="text-center">{customer.order_count}</TableCell>
                      <TableCell className="text-right">${customer.total_spent.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewCustomerDetails(customer)}
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
        
        {selectedCustomer && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t('customerDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">{t('customerProfile')}</h3>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm">
                      <span className="font-medium">{t('name')}:</span>{' '}
                      {getCustomerName(selectedCustomer)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">{t('registered')}:</span>{' '}
                      {formatDate(selectedCustomer.created_at)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium">{t('orderHistory')}</h3>
                  {customerOrders.length === 0 ? (
                    <p className="text-sm mt-2">{t('noOrdersYet')}</p>
                  ) : (
                    <div className="space-y-2 mt-2">
                      {customerOrders.map(order => (
                        <div key={order.id} className="text-sm border rounded-md p-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              {t('orderId')}: {order.id.slice(0, 8)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                              {t(order.status)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span>{formatDate(order.created_at)}</span>
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium">{t('customerStats')}</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-100 p-2 rounded-md text-center">
                      <p className="text-sm text-gray-500">{t('totalOrders')}</p>
                      <p className="text-xl font-bold">{selectedCustomer.order_count}</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-md text-center">
                      <p className="text-sm text-gray-500">{t('totalSpent')}</p>
                      <p className="text-xl font-bold">${selectedCustomer.total_spent.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedCustomer(null)}
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

export default AdminCustomers;
