import { supabase } from "../database/supabase"

import { ProductProps } from "../types"

const updateProduct = async (product: ProductProps) => {    
  return await supabase
    .from<ProductProps>('products')    
    .update(product)
    .eq('id', product.id)  
}

export {
  updateProduct
}