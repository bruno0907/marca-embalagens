import { supabase } from "../../infra/database/supabase"
import { Address } from "../../models"

export const updateAddress = async (address: Address) => {
  return await supabase
    .from<Address>('addresses')    
    .update(address)
    .eq('id', address.id)
}
