import { supabase } from "../../infra/database/supabase"
import { Product } from "../../models"

export const updateProduct = async (product: Product) => {    
  return await supabase
    .from<Product>('products')    
    .update(product)
    .eq('id', product.id)  
}