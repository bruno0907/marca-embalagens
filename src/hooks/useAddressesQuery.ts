import { useQuery } from "react-query";
import { getAddresses } from "../services";

export const useAddressesQuery = (userId: string) => useQuery(
  ['address[]', userId], 
  async () => { 
    const { data, error } = await getAddresses(userId)

    if(error) throw Error(error.message)

    return data
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
  }
)  
