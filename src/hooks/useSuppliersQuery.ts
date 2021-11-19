import { useQuery } from "react-query"

import { supabase } from "../database/supabase"
import { SupplierProps } from "../types"

const getSuppliers = async (pattern?: string) => {
  const user = supabase.auth.user()

  if(!user) {
    return null
  }

  if(pattern) {
    return await supabase
      .from<SupplierProps>('suppliers')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `${pattern}%`)
      .order('nome')
  }
  
  return await supabase    
    .from<SupplierProps>('suppliers')
    .select()
    .eq('user_id', user.id)    
    .order('nome')
}

const useSuppliersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['suppliers[]', pattern] : 'suppliers[]'
  
  return useQuery(queryKey, async () => {
    if(pattern) {
      return await getSuppliers(pattern)
    }

    return await getSuppliers()    
  }, {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  })
}

export {
  useSuppliersQuery,
  getSuppliers
}