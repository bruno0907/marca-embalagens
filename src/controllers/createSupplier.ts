import { supabase } from "../services/supabase"
import { NewSupplierProps } from "../types"

const createSupplier = async (supplier: NewSupplierProps) => {
  return await supabase
    .from('suppliers')
    .insert(supplier)
}

export {
  createSupplier
}