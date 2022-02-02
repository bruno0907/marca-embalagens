import { User } from '@supabase/gotrue-js'
import { useMutation } from 'react-query'
import { supabase } from '../database/supabase'

export type SignIn = {
  email: string;
  password: string;
}

const signIn = async ({ email, password }: SignIn): Promise<User> => {
  try {
    const { user, error } = await supabase.auth.signIn({ email, password })
  
    if(error) throw new Error(error.message)
  
    return user
    
  } catch (error) {
    throw error
    
  }
}

export const useSignInMutation = () => useMutation(
  'signIn', 
  ({ email, password }: SignIn) => signIn({ email, password })
)
