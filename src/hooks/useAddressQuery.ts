import { useQuery } from "react-query";
import { supabase } from "../database/supabase";

export type Address = {
  id: string;
  user_id: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string; 
  principal: boolean; 
}

const getAddress = async (id: string): Promise<Address> => {
  try {
    const { data, error } = await supabase
      .from<Address>('addresses')
      .select()
      .eq('id', id)
      .single()
  
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error
    
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
