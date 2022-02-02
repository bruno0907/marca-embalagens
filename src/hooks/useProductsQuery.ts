import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { Product } from "./useProductQuery"

const getProducts = async (pattern?: string): Promise<Product[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('User not authenticated')
  
    if(!pattern) {
      const { data, error } = await supabase
        .from<Product>('products')
        .select()
        .eq('user_id', user.id)
        .order('nome')
    
      if(error) throw new Error(error.message)
    
      return data
    }
    
    const { data, error } = await supabase
      .from<Product>('products')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `%${pattern}%`)
      .order('nome')

    if(error) throw new Error(error.message)

    return data
    
  } catch (error) {
    throw error
    
  }
}

export const useProductsQuery = (pattern?: string) => {
  const queryKey = pattern ? ['product[]', pattern] : ['product[]']

  return useQuery(
    queryKey, 
    () => !pattern ? getProducts() : getProducts(pattern), {
      staleTime: 1000 * 10 * 60,
    }
  )
}

