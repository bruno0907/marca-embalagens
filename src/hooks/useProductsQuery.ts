import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { ProductProps } from "../types"

const getProducts = async (pattern?: string) => {
  const user = supabase.auth.user()

  if(!user) throw new Error('Not authenticated')

  if(pattern) {
    const { data, error } = await supabase
      .from<ProductProps>('products')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `${pattern}%`)
      .order('nome')

    if(error) throw new Error(error.message)

    if(!data) throw new Error('No products found')

    return data
  }

  const { data, error } = await supabase
    .from<ProductProps>('products')
    .select()
    .eq('user_id', user.id)
    .order('nome')

  if(error) throw new Error(error.message)

  if(!data) throw new Error('No products found')

  return data
}

const useProductsQuery = (pattern?: string) => {
  const queryKey = pattern ? ['products[]', pattern] : ['products[]']

  return useQuery(queryKey, () => {
    if(pattern) {
      return getProducts(pattern)
    }
    return getProducts()

  }, {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  })
}

export {
  useProductsQuery
}