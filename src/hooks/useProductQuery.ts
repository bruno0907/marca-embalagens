import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { ProductProps } from "../types"

const getProduct = async (id: string): Promise<ProductProps> => {
  try {
    const { data, error } = await supabase
      .from<ProductProps>('products')
      .select()
      .eq('id', id)
      .single()
  
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error
    
  }
}

const useProductQuery = (id: string) => useQuery(
  ['product', id], 
  () => getProduct(id), {
  staleTime: 1000 * 60 * 10, //10minutes
  useErrorBoundary: true
})

export { 
  useProductQuery,
  getProduct 
}
