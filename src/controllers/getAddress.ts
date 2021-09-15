import { supabase } from "../services/supabase";
import { AddressProps } from "../types";

const getAddress = async (id: string) => {
  return await supabase
    .from<AddressProps>('addresses')
    .select('*')
    .eq('id', id) 
    .single()
}

export {
  getAddress  
}