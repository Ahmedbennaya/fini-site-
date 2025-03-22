import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const PRODUCT_IMAGES = [
  'https://m.french.upholsterysofafabric.com/photo/pt33315375-300gsm_off_white_jacquard_fabric_polyester_white_cotton_jacquard_fabric.jpg',
  'https://images.unsplash.com/photo-1464198016405-33fd4527b89d?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?q=80&w=2531&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540638349517-3abd5afc5847?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop'
];

export async function uploadProductImages() {
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id, name');

    if (!products) {
      console.error('No products found');
      return;
    }

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const imageUrl = PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]; // Use modulo to prevent array index out of bounds

      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Generate a unique filename
      const fileName = `${product.id}/${uuidv4()}.jpg`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('products')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error(`Error uploading image for ${product.name}:`, error);
        continue;
      }

      // Update the product with the image URL
      const publicUrl = supabase.storage.from('products').getPublicUrl(fileName).data.publicUrl;
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: [publicUrl] })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating product ${product.name} with image:`, updateError);
      }
    }

    console.log('Product images uploaded successfully');
    return true;
  } catch (error) {
    console.error('Error in uploadProductImages:', error);
    throw error;
  }
}