import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { Supplier } from "./useSupplierQuery"

const getSuppliers = async (pattern?: string): Promise<Supplier[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('User not authenticated')
    
    if(!pattern) {
      const { data, error } = await supabase    
        .from<Supplier>('suppliers')
        .select()
        .eq('user_id', user.id)    
        .order('nome')
    
      if(error) throw new Error(error.message)
    
      return data

    }
    
    const { data, error } = await supabase
      .from<Supplier>('suppliers')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `%${pattern}%`)
      .order('nome')

    if(error) throw new Error(error.message)

    if(!data) throw new Error('No suppliers found')

    return data

  } catch (error) {
    throw error

  }
}

export const useSuppliersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['supplier[]', pattern] : 'supplier[]'
  
  return useQuery(
    queryKey, 
    () => !pattern ? getSuppliers(): getSuppliers(pattern), {
      staleTime: 1000 * 60 * 10
    }
  )
}
