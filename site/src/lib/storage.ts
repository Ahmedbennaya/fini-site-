
import { supabase } from '@/integrations/supabase/client';

// Upload a file to Supabase Storage
export async function uploadFile(
  bucketName: string, 
  filePath: string, 
  file: File
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
    
  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
  
  return data;
}

// Get a public URL for a file
export function getPublicUrl(bucketName: string, filePath: string) {
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);
    
  return data.publicUrl;
}

// Delete a file
export async function deleteFile(bucketName: string, filePath: string) {
  const { error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);
    
  if (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
  
  return true;
}

// Upload a product image and return its public URL
export async function uploadProductImage(file: File, productId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}_${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;
  
  await uploadFile('products', filePath, file);
  return getPublicUrl('products', filePath);
}

// Upload a user avatar and return its public URL
export async function uploadUserAvatar(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  // Delete existing avatar if any
  try {
    await deleteFile('avatars', filePath);
  } catch (error) {
    // Ignore error if file doesn't exist
  }
  
  await uploadFile('avatars', filePath, file);
  return getPublicUrl('avatars', filePath);
}
