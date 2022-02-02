import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { supabase } from '../database/supabase'
import { createAddressService, NewAddress } from '../services/createAddressService'
import { createProfileService, NewProfile } from '../services/profile/createProfileService'
import { Profile } from '../services/profile/getProfileService'

type SignUp = {
  email: string;
  password: string;
}

type NewProfileMutation = {
  profile: NewProfile;
  address: NewAddress;
}

const signUp = async ({ email, password }: SignUp): Promise<NewProfileMutation> => {
  try {
    const { data: userAlreadyExists } = await supabase
      .from<Profile>('profiles')
      .select('username')
      .eq('username', email)
      .single()

    if(userAlreadyExists) throw new Error('User already exists')
  
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
    const { data: newProfile } = await createProfileService(profile)
  
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
  
    const { data: newAddress } = await createAddressService(address)
    
    return {
      profile: newProfile[0],
      address: newAddress[0]
    }  
    
  } catch (error) {
    throw Error(error)
    
  }
}

export const useSignUpMutation = () => useMutation(
  ({ email, password }: SignUp) => signUp({ email, password }), {
  onSuccess: async profile => queryClient.setQueryData('profile', profile)
})
