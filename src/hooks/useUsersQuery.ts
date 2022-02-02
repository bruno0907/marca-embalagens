import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { User } from "./useUserQuery"

export const getUsers = async (query?: string): Promise<User[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('User not authenticated')
  
    if(!query) {
      const { data, error } = await supabase    
      .from<User>('users')
      .select()
      .eq('user_id', user.id)      
      .order('nome')
      
      if(error) throw new Error(error.message)
      
      return data
    }
    
    const { data, error } = await supabase
      .from<User>('users')
      .select()
      .eq('user_id', user.id)      
      .ilike('nome', `%${query}%`)
      .order('nome')

    if(error) throw new Error(error.message)

    return data
    
  } catch (error) {
    throw error

  }
}

export const useUsersQuery = (query?: string) => {
  const queryKey = query ? ['user[]', query] : 'user[]'
  
  return useQuery(
    queryKey, 
      () => !query ? getUsers() : getUsers(query), {
      staleTime: 1000 * 60 * 10,
      useErrorBoundary: true
    }
  )
}
