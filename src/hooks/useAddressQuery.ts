import { useQuery } from "react-query";
import { supabase } from "../database/supabase";
import { AddressProps } from "../types";

const getAddress = async (id: string) => {
  if(!id) {
    return null
  }
  
  return await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('id', id)
    .single()
}

const useAddressQuery = (id: string, limit?: number) => {
  return useQuery(['address', id], async () => await getAddress(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export {
  useAddressQuery,
  getAddress
}