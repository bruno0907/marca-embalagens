import { supabase } from "../database/supabase"
import { NewProfileProps, ProfileProps } from "../types"

const createProfile = async (profile: NewProfileProps) => {
  const emailAlreadyExists = await supabase
    .from<ProfileProps>('profiles')
    .select('email')
    .eq('email', profile.email)
    .single()

  if(emailAlreadyExists.data) throw new Error('O e-mail informado já está em uso. Tente outro endereço de e-mail ou se já é cadastrado, faça o seu login.')
  
  return await supabase
    .from<ProfileProps>('profiles')
    .insert(profile)
}

export {
  createProfile
}
