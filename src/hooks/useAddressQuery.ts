import { useQuery } from "react-query";
import { supabase } from "../database/supabase";
import { AddressProps } from "../types";

const getAddress = async (id: string): Promise<AddressProps> => {
  if(!id) return null
  
  const { data, error } = await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('id', id)
    .single()

  if(error) throw new Error(error.message)

  if(!data) throw new Error('Address not found')

  return data
}

const useAddressQuery = (id: string) => {
  return useQuery(['address', id], () => {
    return getAddress(id)

  }, {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export {
  useAddressQuery,
  getAddress
}