import { supabase } from "../database/supabase"

import { UserProps } from "../types"

const updateUser = async (user: UserProps) => {
  return await supabase
    .from<UserProps>('users')    
    .update(user)
    .eq('id', user.id)
}

export {
  updateUser
}