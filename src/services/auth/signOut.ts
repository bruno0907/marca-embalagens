import { supabase } from "../../infra/database/supabase"

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if(error) throw new Error(error.message)
  return  
}