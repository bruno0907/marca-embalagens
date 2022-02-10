import { CreateSupplier, Supplier } from ".."
import { supabase } from "../../infra/database/supabase"

export const createSupplier = async (supplier: CreateSupplier) => {
  return await supabase
    .from<Supplier>('suppliers')
    .insert(supplier)
}