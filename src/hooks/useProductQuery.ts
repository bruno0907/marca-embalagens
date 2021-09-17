import { useQuery } from "react-query"
import { supabase } from "../services/supabase"
import { ProductProps } from "../types"

const getProduct = async (id: string | string[]) => {
  return await supabase
    .from<ProductProps>('products')
    .select()
    .eq('id', String(id))
    .single()
}

const useUserQuery = (id: string | string[]) => {
  return useQuery(['user', id], async () => await getProduct(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export { 
  useUserQuery,
  getProduct 
}
