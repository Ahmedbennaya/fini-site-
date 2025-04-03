
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash, Plus, X } from 'lucide-react';

type Category = Tables['categories'];

const AdminCategories = () => {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    // Redirect if not admin
    if (isAdmin === false) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setCategories(data);
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToLoadCategories'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description);
    setSlug(category.slug);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('confirmDeleteCategory'))) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the categories list
      setCategories(categories.filter(category => category.id !== id));
      
      toast({
        title: t('success'),
        description: t('categoryDeleted'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToDeleteCategory'),
        variant: 'destructive',
      });
    }
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setName('');
    setDescription('');
    setSlug('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !slug) {
      toast({
        title: t('error'),
        description: t('nameAndSlugRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    try {
      if (selectedCategory) {
        // Update existing category
        const { error } = await supabase
          .from('categories')
          .update({
            name,
            description,
            slug,
          })
          .eq('id', selectedCategory.id);
        
        if (error) throw error;
        
        // Update the categories list
        setCategories(categories.map(category => 
          category.id === selectedCategory.id 
            ? { ...category, name, description, slug } 
            : category
        ));
        
        toast({
          title: t('success'),
          description: t('categoryUpdated'),
        });
      } else {
        // Add new category
        const { data, error } = await supabase
          .from('categories')
          .insert({
            name,
            description,
            slug,
          })
          .select()
          .single();
        
        if (error) throw error;
        
        // Add the new category to the list
        setCategories([...categories, data]);
        
        toast({
          title: t('success'),
          description: t('categoryAdded'),
        });
      }
      
      // Reset form
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message || t('failedToSaveCategory'),
        variant: 'destructive',
      });
    }
  };

  const generateSlug = () => {
    setSlug(name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t('categoryManagement')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-${isEditing ? '2' : '3'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{t('categories')}</h2>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addCategory')}
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-10">{t('loading')}...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-10">{t('noCategoriesYet')}</div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('name')}</TableHead>
                    <TableHead>{t('slug')}</TableHead>
                    <TableHead>{t('description')}</TableHead>
                    <TableHead className="text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>
                        {category.description.length > 50
                          ? `${category.description.substring(0, 50)}...`
                          : category.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(category)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(category.id)}
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
        
        {isEditing && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {selectedCategory ? t('editCategory') : t('addNewCategory')}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('categoryName')}</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">
                      {t('slug')}
                      <Button 
                        type="button"
                        variant="link" 
                        size="sm" 
                        className="ml-2 p-0 h-auto text-xs"
                        onClick={generateSlug}
                      >
                        {t('generateFromName')}
                      </Button>
                    </Label>
                    <Input 
                      id="slug" 
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">{t('description')}</Label>
                    <Textarea 
                      id="description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    {t('cancel')}
                  </Button>
                  <Button type="submit">
                    {selectedCategory ? t('update') : t('create')}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
