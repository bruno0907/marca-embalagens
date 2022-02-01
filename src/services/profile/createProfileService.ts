import { supabase } from "../../database/supabase"
import { Profile } from "./getProfileService"

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

export const createProfileService = async (profile: NewProfile) => {
  return await supabase
    .from<Profile>('profiles')   
    .insert(profile)
}
