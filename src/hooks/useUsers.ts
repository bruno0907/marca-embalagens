import { useQuery } from "react-query"

import { supabase } from "../services/supabase"
import { UserProps } from "../types"

const getUsers = async (pattern?: string): Promise<UserProps[]> => {
  const user = supabase.auth.user()

  if(pattern) {
    const { data } = await supabase
      .from<UserProps>('users')
      .select()
      .eq('user_id', user.id)
      .eq('tipo_cliente', 'Cliente')
      .ilike('nome', `${pattern}%`)
      .order('nome')

    return data
  }
  
  const { data } = await supabase    
    .from<UserProps>('users')
    .select()
    .eq('user_id', user.id)
    .eq('tipo_cliente', 'Cliente')    
    .order('nome')

  return data
}

const useUsers = (pattern?: string) => {
  const queryKey = pattern ? ['users[]', pattern] : 'users[]'
  
  return useQuery(queryKey, () => {
    if(pattern) {
      const response = getUsers(pattern)
      return response
    }

    const response = getUsers()
    return response
    
  }, {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  })
}

export {
  useUsers,
  getUsers
}