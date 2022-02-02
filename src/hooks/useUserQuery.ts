import { useQuery } from "react-query"
import { supabase } from "../database/supabase"

export type User = {
  id: string;
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
  situacao_cadastral: boolean;
  outras_informacoes: string;
}

export const getUser = async (id: string): Promise<User> => {  
  try {
    const { data, error } = await supabase
      .from<User>('users')
      .select()
      .eq('id', id)
      .single()
      
    if(error) throw new Error(error.message)
  
    return data  
    
  } catch (error) {
    throw error

  }
}

export const useUserQuery = (id: string) => useQuery(
  ['user', id], 
  () => getUser(id), {
    staleTime: 1000 * 60 * 10    
  }
)
