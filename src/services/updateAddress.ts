import { supabase } from "../database/supabase"
import { Address } from "../hooks/useAddressQuery"

const updateAddress = async (address: Address) => {
  return await supabase
    .from<Address>('addresses')    
    .update(address)
    .eq('id', address.id)
}

export {
  updateAddress
}

