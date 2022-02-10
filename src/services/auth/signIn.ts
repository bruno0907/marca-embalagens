import { supabase } from "../../infra/database/supabase"
import { SignIn } from "../../models"

export const signIn = async ({ email, password }: SignIn) => {
  const { user, error } = await supabase.auth.signIn({ email, password })
  if(error) throw new Error(error.message)
  return user  
}