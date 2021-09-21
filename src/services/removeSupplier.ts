import { supabase } from "../database/supabase"
import { SupplierProps } from "../types"

const removeSupplier = async (id: string) => {
  return await supabase
    .from<SupplierProps>('suppliers')
    .delete()
    .eq('id', id)
}

export {
  removeSupplier
}