import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { createAddress } from "../services/createAddress"

import { NewAddressProps } from "../types"

const useCreateAddressMutation = () => useMutation(
  async (newAddress: NewAddressProps) => {
    try {
      const { data, error } = await createAddress(newAddress)
  
      if(error) throw Error('Erro ao cadastrar novo endereço.')
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: address => queryClient.invalidateQueries(['address[]', address[0].user_id]),
    onError: error => console.log('New Product Mutation Error: ', error)
  }
)

export {
  useCreateAddressMutation
}
