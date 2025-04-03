import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { uploadProductImages } from './upload-products';

// Upload a file to Supabase Storage with improved error handling and file naming
export async function uploadFile(
  bucketName: 'products' | 'avatars', 
  file: File, 
  userId?: string,
  customFileName?: string
) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = customFileName 
      ? `${customFileName}.${fileExt}` 
      : userId 
        ? `${userId}/${uuidv4()}.${fileExt}` 
        : `${uuidv4()}.${fileExt}`;
    
    const filePath = `${fileName}`;
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
    
    return {
      path: data.path,
      publicUrl: getPublicUrl(bucketName, data.path)
    };
  } catch (error: any) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
}

// Get a public URL for a file
export function getPublicUrl(bucketName: 'products' | 'avatars', filePath: string) {
  try {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error('Error in getPublicUrl:', error);
    return '';
  }
}

// Delete a file from storage
export async function deleteFile(bucketName: 'products' | 'avatars', filePath: string) {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);
      
    if (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteFile:', error);
    throw error;
  }
}

// Upload a product image with enhanced functionality
export async function uploadProductImage(file: File, productId: string) {
  try {
    const result = await uploadFile('products', file, undefined, productId);
    return result.publicUrl;
  } catch (error) {
    console.error('Error in uploadProductImage:', error);
    throw error;
  }
}

// Upload a user avatar with enhanced functionality
export async function uploadUserAvatar(file: File, userId: string) {
  try {
    const result = await uploadFile('avatars', file, userId, userId);
    return result.publicUrl;
  } catch (error) {
    console.error('Error in uploadUserAvatar:', error);
    throw error;
  }
}

// Initialize product images
export async function initializeProductImages() {
  try {
    toast({
      title: "Initializing product images",
      description: "Downloading and uploading product images, please wait...",
    });
    
    await uploadProductImages();
    
    toast({
      title: "Success",
      description: "Product images have been successfully initialized.",
    });
    
    return true;
  } catch (error) {
    console.error('Error initializing product images:', error);
    toast({
      title: "Error",
      description: "Failed to initialize product images. Check console for details.",
      variant: "destructive"
    });
    return false;
  }
}