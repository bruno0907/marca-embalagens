import router from "next/router";
import { useQuery, UseQueryResult } from "react-query";
import { Address, getAddressService } from "../services/address/getAddressService";

const useAddressQuery = (id: string): UseQueryResult<Address> => useQuery(
  ['address', id], 
  async () => {
    const { data, error } = await getAddressService(id)

    if(error) throw new Error(error.message)

    return data
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
  }
)  

export {
  useAddressQuery  
}
