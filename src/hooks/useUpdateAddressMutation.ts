import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { Address } from "../models"
import { updateAddress } from "../services"

export const useUpdateAddressMutation = () => useMutation(
  async (address: Address) => {
    try {
      const { data, error } = await updateAddress(address)
  
      if(error) throw Error(error.message)      
  
      return data
      
    } catch (error) {
      throw error
      
    }
  }, {
    onSuccess: async address => {
      await queryClient.invalidateQueries(['address', address[0].id])
      await queryClient.invalidateQueries(['address[]', address[0].user_id])
    }
  }
)
