import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { updateAddress } from "../services/updateAddress"
import { AddressProps } from "../types"

const useUpdateAddressMutation = () => {
  return useMutation(async (address: AddressProps) => {
    const { data, error } = await updateAddress(address)

    if(error) {
      throw Error('Erro ao atualizar o cadastro. Tente novamente.')      
    }

    return data
  }, {
    onSuccess: async (address) => {
      await queryClient.invalidateQueries(['address', address[0].id])
      await queryClient.invalidateQueries(['address[]', address[0].user_id])
    }
  })
}

export {
  useUpdateAddressMutation
}