import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { supabase } from '../database/supabase'
import { createAddress } from '../services/createAddress'

import { NewAddress } from './useCreateAddressMutation'
import { Profile } from './useProfileQuery'

type SignUp = {
  email: string;
  password: string;
}

type NewProfileMutation = {
  data: NewProfile;
  address: NewAddress;
}

export type NewProfile = {  
  user_id: string;  
  username: string;
  nome: string | undefined;
  razao_social: string | undefined;  
  cpf_cnpj: string | undefined; 
  rg_ie: string | undefined;  
  email: string;
  telefone: string | undefined;
  celular: string | undefined;    
}

const createProfile = async (profile: NewProfile) => {
  return await supabase
    .from<Profile>('profiles')
    .insert(profile)
}

const signUp = async ({ email, password }: SignUp): Promise<NewProfileMutation> => {
  try {
    const { data: userAlreadyExists } = await supabase
      .from<Profile>('profiles')
      .select('username')
      .eq('username', email)
      .single()

    if(userAlreadyExists) throw new Error('E-mail already in use')
  
    const { user, error } = await supabase.auth.signUp({
      email,
      password
    })
    
    if(error) throw new Error(error.message)
  
    const profile: NewProfile = {
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
  
    const address: NewAddress = {
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
  async ({ email, password }: SignUp) => await signUp({ email, password }), {
  onSuccess: async profile => queryClient.setQueryData('profile', profile)

})

export {
  useSignUpMutation
}
