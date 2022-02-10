import { supabase } from "../../infra/database/supabase"
import { Supplier } from "../../models"

export const updateSupplier = async (supplier: Supplier) => {
  return await supabase
    .from<Supplier>('suppliers')    
    .update(supplier)
    .eq('id', supplier.id)
}