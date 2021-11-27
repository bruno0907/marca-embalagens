import { useQuery } from "react-query";
import { supabase } from "../database/supabase";
import { AddressProps } from "../types";

const getAddress = async (id: string): Promise<AddressProps> => {
  try {
    const { data, error } = await supabase
      .from<AddressProps>('addresses')
      .select()
      .eq('id', id)
      .single()
  
    if(error) throw new Error(error.message)
  
    if(!data) throw new Error('Address not found')
  
    return data
    
  } catch (error) {
    return error
    
  }  
}

const useAddressQuery = (id: string) => useQuery(
  ['address', id], 
  () => getAddress(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  }
)  

export {
  useAddressQuery,
  getAddress
}
