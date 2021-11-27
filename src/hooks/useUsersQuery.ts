import { useQuery } from "react-query"

import { supabase } from "../database/supabase"
import { UserProps } from "../types"

const getUsers = async (filterQuery?: string): Promise<UserProps[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('Not authenticated')
  
    if(!filterQuery) {
      const { data, error } = await supabase    
      .from<UserProps>('users')
      .select()
      .eq('user_id', user.id)      
      .order('nome')
      
      if(error) throw new Error(error.message)
      
      if(!data) throw new Error('No users found')
      
      return data
    }
    
    const { data, error } = await supabase
      .from<UserProps>('users')
      .select()
      .eq('user_id', user.id)      
      .ilike('nome', `${filterQuery}%`)
      .order('nome')

    if(error) throw new Error(error.message)

    if(!data) throw new Error('No users found')

    return data
    
  } catch (error) {
    return error

  }
}

const useUsersQuery = (filterQuery?: string) => {
  const queryKey = filterQuery ? ['users[]', filterQuery] : 'users[]'
  
  return useQuery(queryKey, () => {
    if(!filterQuery) return getUsers()
    
    return getUsers(filterQuery)
  }, {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  })
}

export {
  useUsersQuery,
  getUsers
}
