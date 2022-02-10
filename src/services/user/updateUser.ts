import { supabase } from "../../infra/database/supabase"
import { User } from "../../models"

export const updateUser = async (user: User) => {
  return await supabase
    .from<User>('users')    
    .update(user)
    .eq('id', user.id)
}