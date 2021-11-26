import { useQuery } from "react-query"

import { supabase } from "../database/supabase"
import { SupplierProps } from "../types"

const getSuppliers = async (pattern?: string): Promise<SupplierProps[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('Not authenticated')
    
    if(!pattern) {
      const { data, error } = await supabase    
        .from<SupplierProps>('suppliers')
        .select()
        .eq('user_id', user.id)    
        .order('nome')
    
      if(error) throw new Error(error.message)
    
      if(!data) throw new Error('No suppliers found')
    
      return data

    }
    
    const { data, error } = await supabase
      .from<SupplierProps>('suppliers')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `${pattern}%`)
      .order('nome')

    if(error) throw new Error(error.message)

    if(!data) throw new Error('No suppliers found')

    return data

  } catch (error) {
    return error

  }
}

const useSuppliersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['suppliers[]', pattern] : 'suppliers[]'
  
  return useQuery(queryKey, () => {
    if(!pattern) {
      return getSuppliers()    
    }
    return getSuppliers(pattern)

  }, {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  })
}

export {
  useSuppliersQuery,
  getSuppliers
}