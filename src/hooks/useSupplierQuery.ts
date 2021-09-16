import { supabase } from "../services/supabase"
import { SupplierProps } from "../types"

const getSupplier = async (id: string) => {
  return await supabase
    .from<SupplierProps>('suppliers')
    .select()
    .eq('id', id)
    .single()
}

export {
  getSupplier
}