import { useQuery } from "react-query"

import { supabase } from "../database/supabase"
import { UserProps } from "../types"

const getUsers = async (pattern?: string) => {
  const user = supabase.auth.user()

  if(!user) {
    return null
  }

  if(pattern) {
    return await supabase
      .from<UserProps>('users')
      .select()
      .eq('user_id', user.id)      
      .ilike('nome', `${pattern}%`)
      .order('nome')
  }
  
  return await supabase    
    .from<UserProps>('users')
    .select()
    .eq('user_id', user.id)      
    .order('nome')
}

const useUsersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['users[]', pattern] : 'users[]'
  
  return useQuery(queryKey, async () => {
    if(pattern) {
      return await getUsers(pattern)
    }
    
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