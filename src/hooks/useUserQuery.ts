import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { UserProps } from "../types"

const getUser = async (id: string): Promise<UserProps> => {
  try {
    const { data, error } = await supabase
      .from<UserProps>('users')
      .select()
      .eq('id', id)
      .single()
      
    if(error) throw new Error(error.message)
  
    return data  
    
  } catch (error) {
    return error

  }
}

const useUserQuery = (id: string) => useQuery(
  ['user', id], 
  () => getUser(id), {
    staleTime: 1000 * 60 * 10,
    useErrorBoundary: true
  }
)

export { 
  useUserQuery,
  getUser  
}
