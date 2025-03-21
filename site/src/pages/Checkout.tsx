import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { initializeRazorpay, createRazorpayOrder, RazorpayOptions } from '@/lib/razorpay';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { items, calculateTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  
  // Shipping address
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  
  // Shipping methods
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const shippingCost = shippingMethod === 'express' ? 10 : 5;
  const subtotal = calculateTotal();
  const total = subtotal + shippingCost;

  useEffect(() => {
    // Load saved address if available
    const loadUserAddress = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_default', true)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAddress(data.address);
          setApartment(data.apartment || '');
          setCity(data.city);
          setState(data.state);
          setPostalCode(data.postal_code);
          setCountry(data.country);
          setPhone(data.phone);
        }
      } catch (error: any) {
        console.error('Error loading address:', error.message);
      }
    };
    
    loadUserAddress();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: t('error'),
        description: t('cartEmpty'),
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    // Create the shipping address object
    const shippingAddress = {
      first_name: firstName,
      last_name: lastName,
      address,
      apartment,
      city,
      state,
      postal_code: postalCode,
      country,
      phone,
    };
    
    try {
      // Save the address for future use
      if (user) {
        await supabase.from('addresses').upsert({
          user_id: user.id,
          ...shippingAddress,
          is_default: true,
        });
      }
      
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          status: 'pending',
          total,
          shipping_address: shippingAddress,
          shipping_method: shippingMethod,
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Add order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      // Process payment based on selected method
      if (paymentMethod === 'razorpay') {
        // Create Razorpay order
        const order = await createRazorpayOrder(total * 100);
        
        if (!order) {
          throw new Error('Failed to create payment order');
        }
        
        // Update order with payment intent ID
        await supabase
          .from('orders')
          .update({ payment_intent_id: order.id })
          .eq('id', orderData.id);
        
        // Initialize Razorpay
        const razorpay = await initializeRazorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
          amount: total * 100,
          currency: 'INR',
          name: 'Your Store',
          description: `Order #${orderData.id}`,
          order_id: order.id,
          prefill: {
            name: `${firstName} ${lastName}`,
            email: user?.email,
            contact: phone,
          },
          handler: async (response) => {
            try {
              // Verify payment
              const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
              
              // Update order status
              await supabase
                .from('orders')
                .update({ status: 'processing' })
                .eq('id', orderData.id);
              
              // Clear cart
              clearCart();
              
              // Redirect to success page
              navigate('/order-success', { 
                state: { 
                  orderId: orderData.id,
                  paymentId: razorpay_payment_id
                }
              });
            } catch (error: any) {
              toast({
                title: t('error'),
                description: error.message || t('paymentVerificationFailed'),
                variant: 'destructive',
              });
            }
          },
          theme: {
            color: '#4F46E5',
          },
        });
        
        if (razorpay) {
          razorpay.open();
        }
      } else {
        // For cash on delivery, just update the order status
        await supabase
          .from('orders')
          .update({ status: 'processing' })
          .eq('id', orderData.id);
        
        // Clear cart
        clearCart();
        
        // Redirect to success page
        navigate('/order-success', { 
          state: { 
            orderId: orderData.id,
            paymentMethod: 'cod'
          }
        });
      }
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('checkoutFailed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">{t('checkout')}</h1>
          
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('shippingAddress')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t('firstName')}</Label>
                    <Input 
                      id="firstName" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t('lastName')}</Label>
                    <Input 
                      id="lastName" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">{t('address')}</Label>
                  <Input 
                    id="address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apartment">{t('apartment')}</Label>
                  <Input 
                    id="apartment" 
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder={t('optional')}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">{t('city')}</Label>
                    <Input 
                      id="city" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t('state')}</Label>
                    <Input 
                      id="state" 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">{t('postalCode')}</Label>
                    <Input 
                      id="postalCode" 
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">{t('country')}</Label>
                    <Input 
                      id="country" 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input 
                      id="phone" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('shippingMethod')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={shippingMethod} 
                  onValueChange={setShippingMethod}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex justify-between w-full">
                      <span>{t('standardShipping')} (3-5 {t('businessDays')})</span>
                      <span>$5.00</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex justify-between w-full">
                      <span>{t('expressShipping')} (1-2 {t('businessDays')})</span>
                      <span>$10.00</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('paymentMethod')}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay">{t('creditDebitCard')}</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">{t('cashOnDelivery')}</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto"
              disabled={loading || items.length === 0}
            >
              {loading ? t('processing') : t('placeOrder')}
            </Button>
          </form>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>{t('orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>{t('shipping')}</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>{t('total')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
