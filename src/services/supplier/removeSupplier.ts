import { supabase } from "../../infra/database/supabase"
import { Supplier } from "../../models"

export const removeSupplier = async (id: string) => {
  return await supabase
    .from<Supplier>('suppliers')
    .delete()
    .eq('id', id)
}