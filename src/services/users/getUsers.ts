import { supabase } from "../../infra/database/supabase"
import { User } from "../../models"

export const getUsers = async (query?: string) => {
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
}