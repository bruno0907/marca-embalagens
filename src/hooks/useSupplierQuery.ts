import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { SupplierProps } from "../types"

const getSupplier = async (id: string): Promise<SupplierProps> => {
  if(!id) return null

  const { data, error } = await supabase
    .from<SupplierProps>('suppliers')
    .select()
    .eq('id', id)
    .single()
    
  if(error) throw new Error(error.message)

  if(!data) throw new Error('No supplier found')

  return data
}

const useSupplierQuery = (id: string) => {
  return useQuery(['supplier', id], () => {
    return getSupplier(id)

  }, {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })
}

export {
  useSupplierQuery,
  getSupplier,
}