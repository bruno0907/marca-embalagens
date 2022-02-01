import { supabase } from "../../database/supabase"
import { Address } from "../address/getAddressService"

export const getAddressesService = async (userId: string) => {    
  return await supabase
    .from<Address>('addresses')
    .select()
    .eq('user_id', userId)
    .order('principal', {
      ascending: false,      
    }) 
}