import { supabase } from "../../infra/database/supabase"
import { Address } from "../../models"

export const getAddress = async (id: string) => {  
  return await supabase
    .from<Address>('addresses')
    .select()
    .eq('id', id)
    .single()
}