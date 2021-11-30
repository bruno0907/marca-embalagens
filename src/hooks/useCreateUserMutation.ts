import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase";
import { createAddress } from "../services/createAddress";
import { NewAddressProps, NewUserProps, UserProps } from "../types"

const createUser = async (user: NewUserProps) => {
  return await supabase
    .from<UserProps>('users')
    .insert(user);
}

const removeUser = async (id: string) => {
  return await supabase
    .from<UserProps>('users')
    .delete()
    .eq('id', id)
}

type NewUserMutationProps = {
  userData: NewUserProps;
  addressData: Omit<NewAddressProps, 'user_id'>;
}

const useCreateUserMutation = () => useMutation(
  async ({ userData, addressData }: NewUserMutationProps) => {
    try {
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
      
    } catch (error) {
      return error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['users[]']),
    onError: error => console.log('New User Mutation Error: ', error)
  }
)

export {
  useCreateUserMutation
}
