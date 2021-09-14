import { supabase } from "../services/supabase";
import { AddressProps, NewAddressProps } from "../types"

const newAddress = async (address: NewAddressProps) => { 
  return await supabase
    .from<AddressProps>('addresses')
    .insert(address);
}

export {
  newAddress
}