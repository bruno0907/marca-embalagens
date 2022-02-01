import { useQuery } from "react-query";
import { getAddressesService } from "../services/addresses/getAddressesService";

export const useAddressesQuery = (userId: string) => useQuery(
  ['address[]', userId], 
  async () => { 
    const { data, error } = await getAddressesService(userId)

    if(error) throw Error('No addresses found')

    return {
      addresses: data
    }
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
  }
)  
