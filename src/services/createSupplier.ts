import { supabase } from "../database/supabase"
import { NewSupplierProps } from "../types"

const createSupplier = async (supplier: NewSupplierProps) => {
  return await supabase
    .from('suppliers')
    .insert(supplier)
}

export {
  createSupplier
}