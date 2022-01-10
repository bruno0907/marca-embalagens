import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { UserProps } from "../types"

const getUsers = async (query?: string): Promise<UserProps[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('User not authenticated')
  
    if(!query) {
      const { data, error } = await supabase    
      .from<UserProps>('users')
      .select()
      .eq('user_id', user.id)      
      .order('nome')
      
      if(error) throw new Error(error.message)
      
      return data
    }
    
    const { data, error } = await supabase
      .from<UserProps>('users')
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

const useUsersQuery = (query?: string) => {
  const queryKey = query ? ['users[]', query] : 'users[]'
  
  return useQuery(
    queryKey, 
      () => !query ? getUsers() : getUsers(query), {
      staleTime: 1000 * 60 * 10,
      useErrorBoundary: true
    }
  )
}

export {
  useUsersQuery,
  getUsers
}
