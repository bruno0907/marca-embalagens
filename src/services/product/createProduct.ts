import { supabase } from "../../infra/database/supabase"
import { CreateProduct, Product } from "../../models"

export const createProduct = async(product: CreateProduct) => {  
  return await supabase
    .from<Product>('products')
    .insert(product)
}