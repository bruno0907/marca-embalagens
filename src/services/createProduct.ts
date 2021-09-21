import { supabase } from "../database/supabase"
import { NewProductProps, ProductProps } from "../types"

const createProduct = async(product: NewProductProps) => {  
  return await supabase
    .from<ProductProps>('products')
    .insert(product)
}

export {
  createProduct
}