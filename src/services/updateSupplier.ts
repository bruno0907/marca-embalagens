import { supabase } from "../database/supabase"

import { SupplierProps } from "../types"

const updateSupplier = async (supplier: SupplierProps) => {
  return await supabase
    .from<SupplierProps>('suppliers')    
    .update(supplier)
    .eq('id', supplier.id)
}

export {
  updateSupplier
}