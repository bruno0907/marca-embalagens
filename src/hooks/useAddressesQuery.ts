import { useQuery } from "react-query";
import { supabase } from "../database/supabase";
import { AddressProps } from "../types";

const getAddresses = async (id: string | string[]) => {
  if(!id) {
    return null
  }
  
  return await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('user_id', String(id))
}

const useAddressesQuery = (id: string | string[]) => {
  return useQuery(['address[]', id], async () => await getAddresses(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export {
  useAddressesQuery,
  getAddresses
}