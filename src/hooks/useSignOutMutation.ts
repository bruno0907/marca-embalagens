import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
  
    if(error) throw error  
    
  } catch (error) {
    throw error
    
  }
}

export const useSignOutMutation = () => useMutation(
  () => signOut(), 
  { onSuccess: () => queryClient.removeQueries()}
)
