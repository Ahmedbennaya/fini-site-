
import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash, Search } from 'lucide-react';

type Product = Tables['products'];

const AdminProducts = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Redirect if not admin
    if (isAdmin === false) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('products').select('*');
      
      // Filter based on active tab
      if (activeTab === 'active') {
        query = query.eq('is_active', true);
      } else if (activeTab === 'inactive') {
        query = query.eq('is_active', false);
      } else if (activeTab === 'featured') {
        query = query.eq('is_featured', true);
      }
      
      // Add order by
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setProducts(data);
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToLoadProducts'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm(t('confirmDeleteProduct'))) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      // Update the products list
      setProducts(products.filter(product => product.id !== productId));
      
      toast({
        title: t('success'),
        description: t('productDeleted'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToDeleteProduct'),
        variant: 'destructive',
      });
    }
  };

  const toggleProductStatus = async (product: Product) => {
    try {
      const newStatus = !product.is_active;
      
      const { error } = await supabase
        .from('products')
        .update({ is_active: newStatus })
        .eq('id', product.id);
      
      if (error) throw error;
      
      // Update the products list
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, is_active: newStatus } : p
      ));
      
      toast({
        title: t('success'),
        description: newStatus ? t('productActivated') : t('productDeactivated'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToUpdateProduct'),
        variant: 'destructive',
      });
    }
  };

  const toggleFeaturedStatus = async (product: Product) => {
    try {
      const newStatus = !product.is_featured;
      
      const { error } = await supabase
        .from('products')
        .update({ is_featured: newStatus })
        .eq('id', product.id);
      
      if (error) throw error;
      
      // Update the products list
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, is_featured: newStatus } : p
      ));
      
      toast({
        title: t('success'),
        description: newStatus ? t('productFeatured') : t('productUnfeatured'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToUpdateProduct'),
        variant: 'destructive',
      });
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProductList = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center w-full md:w-auto">
          <Search className="mr-2 h-4 w-4 text-gray-500" />
          <Input
            placeholder={t('searchProducts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button onClick={() => navigate('/admin/products/new')}>
          <Plus className="mr-2 h-4 w-4" />
          {t('addProduct')}
        </Button>
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="all">{t('all')}</TabsTrigger>
          <TabsTrigger value="active">{t('active')}</TabsTrigger>
          <TabsTrigger value="inactive">{t('inactive')}</TabsTrigger>
          <TabsTrigger value="featured">{t('featured')}</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="text-center py-10">{t('loading')}...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10">{t('noProductsFound')}</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('category')}</TableHead>
                <TableHead className="text-right">{t('price')}</TableHead>
                <TableHead className="text-center">{t('stock')}</TableHead>
                <TableHead className="text-center">{t('status')}</TableHead>
                <TableHead className="text-center">{t('featured')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    {product.sale_price ? (
                      <div>
                        <span className="font-bold">${product.sale_price.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{product.stock}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant={product.is_active ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleProductStatus(product)}
                    >
                      {product.is_active ? t('active') : t('inactive')}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant={product.is_featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeaturedStatus(product)}
                    >
                      {product.is_featured ? t('yes') : t('no')}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );

  // Form components for adding/editing products will be implemented later
  const ProductForm = ({ mode }: { mode: 'new' | 'edit' }) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {mode === 'new' ? t('addNewProduct') : t('editProduct')}
        </h2>
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          {t('backToProducts')}
        </Button>
      </div>
      <div className="bg-gray-100 p-12 rounded-md">
        <p className="text-center">
          {t('productFormPlaceholder')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('productManagement')}</h1>
      
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/new" element={<ProductForm mode="new" />} />
        <Route path="/edit/:id" element={<ProductForm mode="edit" />} />
      </Routes>
    </div>
  );
};

export default AdminProducts;
