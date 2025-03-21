
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { User, Package, CreditCard, MapPin, LogOut } from 'lucide-react';

const AccountProfile = () => {
  // Component implementation
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('profile')}</h2>
      <p>{t('profileComingSoon')}</p>
    </div>
  );
};

const AccountOrders = () => {
  // Component implementation
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('orders')}</h2>
      <p>{t('ordersComingSoon')}</p>
    </div>
  );
};

const AccountAddresses = () => {
  // Component implementation
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('addresses')}</h2>
      <p>{t('addressesComingSoon')}</p>
    </div>
  );
};

const AccountPaymentMethods = () => {
  // Component implementation
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('paymentMethods')}</h2>
      <p>{t('paymentMethodsComingSoon')}</p>
    </div>
  );
};

const Account = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Set active tab based on URL path
    const path = location.pathname.split('/').pop();
    if (path && path !== 'account') {
      setActiveTab(path);
    } else {
      setActiveTab('profile');
    }
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('myAccount')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar / Mobile Tabs */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('welcome')}, {user?.email?.split('@')[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Link to="/account">
                  <Button 
                    variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {t('profile')}
                  </Button>
                </Link>
                <Link to="/account/orders">
                  <Button 
                    variant={activeTab === 'orders' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    {t('orders')}
                  </Button>
                </Link>
                <Link to="/account/addresses">
                  <Button 
                    variant={activeTab === 'addresses' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {t('addresses')}
                  </Button>
                </Link>
                <Link to="/account/payment-methods">
                  <Button 
                    variant={activeTab === 'payment-methods' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {t('paymentMethods')}
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('signOut')}
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <Routes>
                <Route path="/" element={<AccountProfile />} />
                <Route path="/orders" element={<AccountOrders />} />
                <Route path="/addresses" element={<AccountAddresses />} />
                <Route path="/payment-methods" element={<AccountPaymentMethods />} />
              </Routes>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
