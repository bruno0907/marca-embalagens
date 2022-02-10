import { supabase } from "../../infra/database/supabase"
import { createAddress, createProfile } from ".."
import { CreateAddress, CreateProfile, CreateProfileMutation, Profile, SignUp } from "../../models"

export const signUp = async ({ email, password }: SignUp): Promise<CreateProfileMutation> => {
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

  const profile: CreateProfile = {
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

  const address: CreateAddress = {
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
    profile: newProfile[0],
    address: newAddress[0]
  }    
}