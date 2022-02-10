import { supabase } from "../../infra/database/supabase"
import { User } from "../../models"

export const getUser = async (id: string) => {  
  const { data, error } = await supabase
    .from<User>('users')
    .select()
    .eq('id', id)
    .single()
    
  if(error) throw new Error(error.message)

  return data    
}