import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { createAddress } from "../services/createAddress"
import { createUser } from "../services/createUser"
import { removeUser } from "../services/removeUser"
import { NewAddressProps, NewUserProps } from "../types"

type NewUserMutationProps = {
  userData: NewUserProps;
  addressData: Omit<NewAddressProps, 'user_id'>;
}

const useCreateUserMutation = () => {
  return useMutation(
    async ({ userData, addressData }: NewUserMutationProps) => {
      const newUserData = await createUser(userData)
  
      if(newUserData.error) throw Error('Erro ao cadastrar novo cliente.')
  
      const userAddress = {
        user_id: newUserData.data[0].id,
        ...addressData
      }
  
      const newUserAddress = await createAddress(userAddress)
  
      if(newUserAddress.error) {
        await removeUser(newUserData.data[0].id)
  
        throw Error('Erro ao cadastrar o endereço do cliente.')
      }
  
      const mutationResult = {
        ...newUserData.data[0],
        ...newUserAddress.data[0]
      }
  
      return mutationResult
  
    }, {    
      onSuccess: () => queryClient.invalidateQueries(['users[]']),
      onError: error => console.log('New User Mutation Error: ', error)
    }
  )
}

export {
  useCreateUserMutation
}