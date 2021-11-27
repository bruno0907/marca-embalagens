import { User } from '@supabase/gotrue-js'
import { useMutation } from 'react-query'
import { supabase } from '../database/supabase'

type AuthProps = {
  email: string;
  password: string;
}

const signIn = async ({ email, password }: AuthProps): Promise<User> => {
  try {
    const { user, error } = await supabase.auth.signIn({ email, password })
  
    if(error) throw new Error(error.message)
  
    return user
    
  } catch (error) {
    return error
    
  }
}

const useSignInMutation = () => useMutation(
  'signIn', 
  ({ email, password }: AuthProps) => signIn({ email, password })
)

export {
  useSignInMutation
}
