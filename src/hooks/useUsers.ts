import { useQuery } from "react-query"
import { supabase } from "../services/supabase"
import { UserProps } from "../types"

const getUsers = async (userType: 'Cliente' | 'Fornecedor', pattern: string = null) => {
  const user = supabase.auth.user()

  if(pattern) {
    const { data, error } = await supabase
      .from<UserProps>('users')
      .select()
      .eq('user_id', user.id)
      .eq('tipo_cliente', userType)
      .ilike('nome', `${pattern}%`)
      .order('nome')

    if(error) throw Error('Ocorreu um erro ao buscar os dados...')

    return data
  }

  const { data, error } = await supabase    
    .from<UserProps>('users')
    .select()
    .eq('user_id', user.id)
    .eq('tipo_cliente', userType)    
    .order('nome')

  if(error) throw Error('Ocorreu um erro ao buscar os dados...')    

  return data
}

const useUsers = (userType: 'Cliente' | 'Fornecedor', pattern?: string) => {  
  return useQuery(pattern || 'users', async () => await getUsers(userType, pattern))
}

export {
  useUsers
}