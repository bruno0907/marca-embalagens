import { useQuery } from "react-query"
import { supabase } from "../services/supabase"
import { ProductProps } from "../types"

const getProducts = async (pattern?: string): Promise<ProductProps[]> => {
  const user = supabase.auth.user()

  if(pattern) {
    const { data } = await supabase
      .from<ProductProps>('products')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `${pattern}%`)
      .order('nome')
      
    return data
  }

  const { data } = await supabase
    .from<ProductProps>('products')
    .select()
    .eq('user_id', user.id)
    .order('nome')

  return data
}

const useProductsQuery = (pattern?: string) => {
  const queryKey = pattern ? ['products[]', pattern] : ['products[]']

  return useQuery(queryKey, async () => {
    if(pattern) {
      return await getProducts(pattern)
    }

    return await getProducts()

  }, {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  })
}

export {
  useProductsQuery
}