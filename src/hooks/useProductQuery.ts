import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { ProductProps } from "../types"

const getProduct = async (id: string) => {
  if(!id) return null
  
  const { data, error } = await supabase
    .from<ProductProps>('products')
    .select()
    .eq('id', id)
    .single()

  if(error) throw new Error(error.message)

  if(!data) throw new Error('No product found')

  return data
}

const useProductQuery = (id: string) => {
  return useQuery(['product', id], () => {
    getProduct(id)
    
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export { 
  useProductQuery,
  getProduct 
}
