import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { UserProps } from "../types"

const getUser = async (id: string): Promise<UserProps> => {
  if(!id) return null

  const { data, error } = await supabase
    .from<UserProps>('users')
    .select()
    .eq('id', id)
    .single()
    
  if(error) throw new Error(error.message)

  if(!data) throw new Error('No user found')

  return data
}

const useUserQuery = (id: string) => {  
  return useQuery(['user', id], () => {
    return getUser(id)

  }, {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  })  
}

export { 
  useUserQuery,
  getUser,
}
