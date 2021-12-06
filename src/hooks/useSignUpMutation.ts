import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { supabase } from '../database/supabase'
import { createAddress } from '../services/createAddress'

import { 
  AddressProps, 
  NewAddressProps, 
  NewProfileProps,
  ProfileProps,   
} from '../types'

type AuthProps = {
  email: string;
  password: string;
}

type NewProfileMutationProps = {
  data: NewProfileProps;
  address: AddressProps;
}

const createProfile = async (profile: NewProfileProps) => {
  return await supabase
    .from<ProfileProps>('profiles')
    .insert(profile)
}

const signUp = async ({ email, password }: AuthProps): Promise<NewProfileMutationProps> => {
  try {
    const { data: userAlreadyExists } = await supabase
      .from<ProfileProps>('profiles')
      .select('username')
      .eq('username', email)
      .single()

    if(userAlreadyExists) throw new Error('E-mail already in use')
  
    const { user, error } = await supabase.auth.signUp({
      email,
      password
    })
    
    if(error) throw new Error(error.message)
  
    const profile: NewProfileProps = {
      user_id: user.id,
      username: user.email,
      celular: undefined,
      cpf_cnpj: undefined,
      email: user.email,
      nome: undefined,
      razao_social: undefined,
      rg_ie: undefined,
      telefone: undefined
    }
    const { data: newProfile } = await createProfile(profile)
  
    const address: NewAddressProps = {
      user_id: newProfile[0].id,
      bairro: undefined,
      cep: undefined,
      cidade: undefined,
      complemento: undefined,
      endereco: undefined,
      estado: undefined,
      principal: true,
    }
  
    const { data: newAddress } = await createAddress(address)
    
    return {
      data: newProfile[0],
      address: newAddress[0]
    }  
    
  } catch (error) {
    throw Error(error)
    
  }
}

const useSignUpMutation = () => useMutation(
  async ({ email, password }: AuthProps) => await signUp({ email, password }), {
  onSuccess: async profile => queryClient.setQueryData('profile', profile)

})

export {
  useSignUpMutation
}
