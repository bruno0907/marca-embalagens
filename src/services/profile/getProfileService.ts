import { supabase } from "../../database/supabase"

export type Profile = {
  id: string;
  user_id: string;    
  username: string;
  nome: string;
  razao_social: string;  
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;
  avatar: string;
  situacao_cadastral: boolean;
}

export const getProfileService = async () => {
  const { id } = supabase.auth.user()

  return await supabase
    .from<Profile>('profiles')
    .select()
    .eq('user_id', id)
    .single() 
}
