import { useQuery, UseQueryResult } from "react-query";
import { Address } from "../models";
import { getAddress } from "../services";

export const useAddressQuery = (id: string): UseQueryResult<Address> => useQuery(
  ['address', id], 
  async () => {
    if(!id) return
    
    const { data, error } = await getAddress(id)

    if(error) throw new Error(error.message)

    return data
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
  }
)  
