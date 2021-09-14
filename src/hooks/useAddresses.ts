import { useQuery } from "react-query";
import { supabase } from "../services/supabase";
import { AddressProps } from "../types";

const getAddresses = async (id: string | string[]) => {
  const { data } = await supabase
    .from<AddressProps>('addresses')
    .select('*')
    .eq('user_id', String(id)) 
  
  return data
}

const useAddresses = (id: string | string[]) => {
  return useQuery('address[]', () => getAddresses(id))
}

export {
  useAddresses  
}