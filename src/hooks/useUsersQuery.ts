import { useQuery, UseQueryResult } from "react-query"

import { supabase } from "../services/supabase"
import { UserProps } from "../types"

const getUsers = async (pattern?: string): Promise<UserProps[]> => {
  const user = supabase.auth.user()

  if(pattern) {
    const { data } = await supabase
      .from<UserProps>('users')
      .select()
      .eq('user_id', user.id)      
      .ilike('nome', `${pattern}%`)
      .order('nome')

    return data
  }
  
  const { data } = await supabase    
    .from<UserProps>('users')
    .select()
    .eq('user_id', user.id)      
    .order('nome')

  return data
}

const useUsersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['users[]', pattern] : 'users[]'
  
  return useQuery(queryKey, async () => {
    if(pattern) return await getUsers(pattern) 
    
    return await getUsers()
  }, {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  })
}

export {
  useUsersQuery,
  getUsers
}