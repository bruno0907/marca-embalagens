import { supabase } from "../services/supabase"
import { UserProps } from "../types"

const removeUser = async (id: string) => {
  return await supabase
    .from<UserProps>('users')
    .delete()
    .eq('id', id)
}

export {
  removeUser
}