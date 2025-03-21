import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

interface OrderDetails {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping_method: string;
  items: {
    id: string;
    product_name: string;
    price: number;
    quantity: number;
  }[];
}

const OrderSuccess = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { orderId, paymentId, paymentMethod } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }
    
    const fetchOrderDetails = async () => {
      try {
        // Fetch the order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();
        
        if (orderError) throw orderError;
        
        // Fetch order items with product details
        const { data: items, error: itemsError } = await supabase
          .from('order_items')
          .select(`
            id,
            quantity,
            price,
            products (
              name
            )
          `)
          .eq('order_id', orderId);
        
        if (itemsError) throw itemsError;
        
        // Format the order details
        setOrderDetails({
          id: order.id,
          created_at: order.created_at,
          status: order.status,
          total: order.total,
          shipping_method: order.shipping_method,
          items: items.map(item => ({
            id: item.id,
            product_name: Array.isArray(item.products) && item.products.length > 0 ? item.products[0].name : 'Unknown Product',
            price: item.price,
            quantity: item.quantity,
          })),
        });
      } catch (error: any) {
        toast({
          title: t('error'),
          description: error.message || t('failedToLoadOrderDetails'),
          variant: 'destructive',
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId, navigate, toast, t]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p>{t('loadingOrderDetails')}...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">{t('orderPlaced')}</CardTitle>
            <CardDescription>
              {t('orderSuccessMessage')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">{t('orderNumber')}</p>
              <p className="font-medium">{orderDetails?.id}</p>
            </div>
            
            {paymentId && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{t('paymentId')}</p>
                <p className="font-medium">{paymentId}</p>
              </div>
            )}
            
            {paymentMethod === 'cod' && (
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-yellow-800">{t('codMessage')}</p>
              </div>
            )}
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">{t('orderSummary')}</h3>
              <div className="space-y-2">
                {orderDetails?.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.product_name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="pt-2 border-t mt-2">
                  <div className="flex justify-between font-medium">
                    <span>{t('total')}</span>
                    <span>${orderDetails?.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={() => navigate('/account')} variant="outline">
              {t('viewOrderHistory')}
            </Button>
            <Button onClick={() => navigate('/products')}>
              {t('continueShopping')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
