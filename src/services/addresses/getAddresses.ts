import { supabase } from "../../infra/database/supabase"
import { Address } from "../../models"

export const getAddresses = async (userId: string) => {    
  return await supabase
    .from<Address>('addresses')
    .select()
    .eq('user_id', userId)
    .order('principal', {
      ascending: false,      
    }) 
}