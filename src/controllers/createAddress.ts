import { supabase } from "../services/supabase";
import { AddressProps, NewAddressProps } from "../types"

const createAddress = async (address: NewAddressProps) => { 
  return await supabase
    .from<AddressProps>('addresses')
    .insert(address);
}

export {
  createAddress
}