import { useQuery } from "react-query"

import { supabase } from "../services/supabase"
import { SupplierProps } from "../types"

const getSuppliers = async (pattern?: string): Promise<SupplierProps[]> => {
  const user = supabase.auth.user()

  if(pattern) {
    const { data } = await supabase
      .from<SupplierProps>('suppliers')
      .select()
      .eq('user_id', user.id)
      .ilike('nome', `${pattern}%`)
      .order('nome')

    return data
  }
  
  const { data } = await supabase    
    .from<SupplierProps>('suppliers')
    .select()
    .eq('user_id', user.id)    
    .order('nome')

  return data
}

const useSuppliers = (pattern?: string) => {
  const queryKey = pattern ? ['suppliers[]', pattern] : 'suppliers[]'
  
  return useQuery(queryKey, () => {
    if(pattern) {
      const response = getSuppliers(pattern)
      return response
    }

    const response = getSuppliers()
    return response
    
  }, {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  })
}

export {
  useSuppliers,
  getSuppliers
}