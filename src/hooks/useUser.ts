import { useQuery } from "react-query"
import { supabase } from "../services/supabase"

import { UserProps } from "../types"

const getUser = async (id: string | string[]) => {
  return await supabase
    .from<UserProps>('users')
    .select()
    .eq('id', String(id))
    .single()
}

const useUser = (id: string | string[]) => {
  return useQuery(['user', id], async () => await getUser(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export { 
  useUser,
  getUser 
}
