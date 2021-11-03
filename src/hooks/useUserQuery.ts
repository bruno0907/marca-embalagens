import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { UserProps } from "../types"

const getUser = async (id: string | string[]) => {
  if(!id) return null

  return await supabase
    .from<UserProps>('users')
    .select()
    .eq('id', String(id))
    .single()
}

const useUserQuery = (id: string | string[]) => {  
  return useQuery(['user', id], async () => await getUser(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export { 
  useUserQuery,
  getUser 
}
