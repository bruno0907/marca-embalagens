import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { supabase } from '../database/supabase'
import { createAddress } from '../services/createAddress'
import { createProfile } from '../services/createProfile'

import { 
  AddressProps, 
  NewAddressProps, 
  NewProfileProps,   
} from '../types'

type AuthProps = {
  email: string;
  password: string;
}

type NewProfileMutationProps = {
  data: NewProfileProps;
  address: AddressProps;
}

const getProfileByEmail = async (email: string) => {
  return await supabase
    .from('profiles')
    .select()
    .eq('username', email)    
    .single()
}

const signUp = async ({ email, password }: AuthProps): Promise<NewProfileMutationProps> => {
  const { data: userAlreadyExists } = await getProfileByEmail(email)

  console.log(userAlreadyExists)

  if(userAlreadyExists) throw new Error('O e-mail informado já está em uso.')

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

}

const useSignUpMutation = () => {
  return useMutation( async ({ email, password }: AuthProps) => {    
    return await signUp({ email, password })

  }, {
    onSuccess: async profile => queryClient.setQueryData('profile', profile)

  })
}

export {
  useSignUpMutation
}