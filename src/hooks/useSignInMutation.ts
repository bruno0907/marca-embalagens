import { useMutation } from 'react-query'
import { SignIn } from '../models'
import { signIn } from '../services'

export const useSignInMutation = () => useMutation(
  'signIn', 
  ({ email, password }: SignIn) => signIn({ email, password })
)
