import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase";
import { createAddress } from "../services/createAddress";
import { NewAddress } from "./useCreateAddressMutation";
import { User } from "./useUserQuery";

export type NewUser = {  
  user_id: string;
  natureza_cliente: string;  
  nome: string;
  razao_social: string;
  contato: string;
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;  
  outras_informacoes: string;
} 

const createUser = async (user: NewUser) => {
  return await supabase
    .from<User>('users')
    .insert(user);
}

const removeUser = async (id: string) => {
  return await supabase
    .from<User>('users')
    .delete()
    .eq('id', id)
}

type NewUserMutation = {
  userData: NewUser;
  addressData: Omit<NewAddress, 'user_id'>;
}

const useCreateUserMutation = () => useMutation(
  async ({ userData, addressData }: NewUserMutation) => {
    try {
      const newUserData = await createUser(userData)
  
      if(newUserData.error) throw new Error(newUserData.error.details)
  
      const userAddress = {
        user_id: newUserData.data[0].id,
        ...addressData
      }
  
      const newUserAddress = await createAddress(userAddress)
  
      if(newUserAddress.error) {
        await removeUser(newUserData.data[0].id)
  
        throw new Error(newUserAddress.error.details)
      }
  
      const mutationResult = {
        ...newUserData.data[0],
        ...newUserAddress.data[0]
      }
  
      return mutationResult
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['user[]']),
    onError: error => console.log('New user mutation error: ', error)
  }
)

export {
  useCreateUserMutation
}
