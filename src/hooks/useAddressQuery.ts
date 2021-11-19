import { useQuery } from "react-query";
import { supabase } from "../database/supabase";
import { AddressProps } from "../types";

const getAddress = async (id: string): Promise<AddressProps> => {
  if(!id) {
    return null
  }
  
  const { data } = await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('id', id)
    .single()

  return data
}

const useAddressQuery = (id: string) => {
  return useQuery(['address', id], async () => await getAddress(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export {
  useAddressQuery,
  getAddress
}