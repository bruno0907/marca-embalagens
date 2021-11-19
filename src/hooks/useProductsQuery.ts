import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { ProductProps } from "../types"

const getProducts = async (pattern?: string) => {
  const user = supabase.auth.user()

  if(!user) {
    return null
  }

  if(pattern) {
    return await supabase
      .from<ProductProps>('products')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `${pattern}%`)
      .order('nome')
  }

  return await supabase
    .from<ProductProps>('products')
    .select()
    .eq('user_id', user.id)
    .order('nome')
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