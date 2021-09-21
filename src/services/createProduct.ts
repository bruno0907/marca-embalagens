import { supabase } from "../database/supabase"
import { NewProductProps } from "../types"

const createProduct = async(product: NewProductProps) => {  
  return await supabase
    .from('products')
    .insert(product)
}

export {
  createProduct
}