import { supabase } from "../../infra/database/supabase"
import { User } from "../../models"

export const removeUser = async (id: string) => {
  return await supabase
    .from<User>('users')
    .delete()
    .eq('id', id)
}