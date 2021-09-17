import { useQuery } from "react-query";
import { supabase } from "../services/supabase";
import { AddressProps } from "../types";

const getAddresses = async (id: string, limit?: number) => {
  return await supabase
    .from<AddressProps>('addresses')
    .select('*')
    .eq('user_id', id)
    .limit(limit)
}

const useAddressesQuery = (id: string, limit?: number) => {
  return useQuery(['address[]', id], async () => await getAddresses(id, limit), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export {
  useAddressesQuery,
  getAddresses
}