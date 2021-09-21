import { supabase } from "../database/supabase"
import { NewSupplierProps, SupplierProps } from "../types"

const createSupplier = async (supplier: NewSupplierProps) => {
  return await supabase
    .from<SupplierProps>('suppliers')
    .insert(supplier)
}

export {
  createSupplier
}