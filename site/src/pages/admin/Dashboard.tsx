
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircleDollarSign, ShoppingCart, Users, Package } from 'lucide-react';

interface DashboardStats {
  totalRevenue: number;
  orderCount: number;
  customerCount: number;
  productCount: number;
}

interface SalesData {
  date: string;
  revenue: number;
}

const Dashboard = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    orderCount: 0,
    customerCount: 0,
    productCount: 0,
  });
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // Redirect if not admin
    if (isAdmin === false) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total revenue
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('total');
        
        if (ordersError) throw ordersError;
        
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        
        // Fetch order count
        const orderCount = orders.length;
        
        // Fetch customer count
        const { count: customerCount, error: customerError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });
        
        if (customerError) throw customerError;
        
        // Fetch product count
        const { count: productCount, error: productError } = await supabase
          .from('products')
          .select('id', { count: 'exact', head: true });
        
        if (productError) throw productError;
        
        setStats({
          totalRevenue,
          orderCount,
          customerCount: customerCount || 0,
          productCount: productCount || 0,
        });
        
        // Fetch sales data
        await fetchSalesData(timeRange);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchDashboardData();
  }, []);

  const fetchSalesData = async (range: string) => {
    try {
      let daysToFetch = 7;
      if (range === 'month') {
        daysToFetch = 30;
      } else if (range === 'year') {
        daysToFetch = 365;
      }
      
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysToFetch);
      
      const { data: orders, error } = await supabase
        .from('orders')
        .select('created_at, total')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());
      
      if (error) throw error;
      
      // Process and group data by date
      const salesByDate: Record<string, number> = {};
      
      orders.forEach(order => {
        const date = new Date(order.created_at).toLocaleDateString();
        salesByDate[date] = (salesByDate[date] || 0) + order.total;
      });
      
      const data = Object.entries(salesByDate).map(([date, revenue]) => ({
        date,
        revenue,
      }));
      
      // Sort by date
      data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      setSalesData(data);
      setTimeRange(range);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('adminDashboard')}</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('totalRevenue')}
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {t('fromAllOrders')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('orders')}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orderCount}</div>
            <p className="text-xs text-muted-foreground">
              {t('totalOrders')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('customers')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customerCount}</div>
            <p className="text-xs text-muted-foreground">
              {t('registeredUsers')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('products')}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productCount}</div>
            <p className="text-xs text-muted-foreground">
              {t('activeProducts')}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>{t('salesOverview')}</CardTitle>
          <CardDescription>
            {t('viewSalesPerformance')}
          </CardDescription>
          <Tabs
            defaultValue={timeRange}
            onValueChange={(value) => fetchSalesData(value)}
            className="mt-4"
          >
            <TabsList>
              <TabsTrigger value="week">{t('week')}</TabsTrigger>
              <TabsTrigger value="month">{t('month')}</TabsTrigger>
              <TabsTrigger value="year">{t('year')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, t('revenue')]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
