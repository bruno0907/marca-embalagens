import { supabase } from "../../infra/database/supabase"
import { CreateSupplier, Supplier } from "../../models"

export const createSupplier = async (supplier: CreateSupplier) => {
  return await supabase
    .from<Supplier>('suppliers')
    .insert(supplier)
}