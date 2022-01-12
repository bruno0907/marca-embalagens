import { supabase } from "../database/supabase";
import { NewAddress } from "../hooks/useCreateAddressMutation";


const createAddress = async (address: NewAddress) => { 
  return await supabase
    .from<NewAddress>('addresses')
    .insert(address);
}

export {
  createAddress
}