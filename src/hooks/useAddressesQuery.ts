import { useQuery } from "react-query";
import { supabase } from "../database/supabase";
import { AddressProps } from "../types";

const getAddresses = async (id: string): Promise<AddressProps[]> => {
  if(!id) return null
  
  const { data, error } = await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('user_id', id)

  if(error) throw new Error(error.message)

  if(!data) throw new Error('No addresses found')

  return data
}

const useAddressesQuery = (id: string) => {
  return useQuery(['address[]', id], () => {
    return getAddresses(id)
    
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export {
  useAddressesQuery,
  getAddresses
}