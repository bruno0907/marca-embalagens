import { useQuery } from "react-query";
import { supabase } from "../services/supabase";
import { AddressProps } from "../types";

const getAddresses = async (id: string) => {
  return await supabase
    .from<AddressProps>('addresses')
    .select('*')
    .eq('user_id', id) 
}

const useAddresses = (id: string) => {
  return useQuery(['address[]', id], () => getAddresses(id), {
    staleTime: 1000 * 60 * 10 //10minutes
  })
}

export {
  useAddresses  
}