import { supabase } from "../database/supabase"
import { AddressProps } from "../types"

const updateAddress = async (address: AddressProps) => {
  return await supabase
    .from<AddressProps>('addresses')    
    .update(address)
    .eq('id', address.id)
}

export {
  updateAddress
}
