import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { ProductProps } from "../types"

const getProduct = async (id: string | string[]) => {
  if(!id) {
    return null
  }
  
  return await supabase
    .from<ProductProps>('products')
    .select()
    .eq('id', String(id))
    .single()
}

const useProductQuery = (id: string | string[]) => {
  return useQuery(['product', id], async () => await getProduct(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export { 
  useProductQuery,
  getProduct 
}
