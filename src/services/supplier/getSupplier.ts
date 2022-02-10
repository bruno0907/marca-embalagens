import { supabase } from "../../infra/database/supabase"
import { Supplier } from "../../models"

export const getSupplier = async (id: string) => {
  const { data, error } = await supabase
    .from<Supplier>('suppliers')
    .select()
    .eq('id', id)
    .single()
    
  if(error) throw new Error(error.message)

  return data  
}