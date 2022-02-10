import { supabase } from "../../infra/database/supabase"
import { Profile } from "../../models"

export const getProfile = async () => {
  const { id } = supabase.auth.user()

  if(!id) throw new Error('User not authenticated')

  return await supabase
    .from<Profile>('profiles')
    .select()
    .eq('user_id', id)
    .single() 
}
