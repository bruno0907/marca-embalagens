import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { ProductProps } from "../types"

const getProducts = async (pattern?: string): Promise<ProductProps[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('User not authenticated')
  
    if(!pattern) {
      const { data, error } = await supabase
        .from<ProductProps>('products')
        .select()
        .eq('user_id', user.id)
        .order('nome')
    
      if(error) throw new Error(error.message)
    
      return data
    }
    
    const { data, error } = await supabase
      .from<ProductProps>('products')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `%${pattern}%`)
      .order('nome')

    if(error) throw new Error(error.message)

    return data
    
  } catch (error) {
    return error
    
  }
}

const useProductsQuery = (pattern?: string) => {
  const queryKey = pattern ? ['products[]', pattern] : ['products[]']

  return useQuery(
    queryKey, 
    () => !pattern ? getProducts() : getProducts(pattern), {
      staleTime: 1000 * 10 * 60,
      useErrorBoundary: true,
    }
  )
}

export {
  useProductsQuery
}
