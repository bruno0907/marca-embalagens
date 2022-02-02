import { useMutation, UseMutationResult } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { createAddressService, NewAddress } from "../services/createAddressService"

export const useCreateAddressMutation = () => useMutation(
  async (newAddress: NewAddress) => {
    const { data, error } = await createAddressService(newAddress)

    if(error) throw Error('Erro ao cadastrar novo endereço.')

    return data

  }, {    
    onSuccess: address => queryClient.invalidateQueries(['address[]', address[0].user_id]),
    onError: error => console.log('New product mutation error: ', error)
  }
)
