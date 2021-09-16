import { useQuery } from "react-query"
import { supabase } from "../services/supabase"
import { SupplierProps } from "../types"

const getSupplier = async (id: string | string[]) => {
  return await supabase
    .from<SupplierProps>('suppliers')
    .select()
    .eq('id', String(id))
    .single()
}

const useSupplierQuery = (id: string | string[]) => {
  return useQuery(['supplier', id], async () => await getSupplier(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })
}

export {
  getSupplier,
  useSupplierQuery
}