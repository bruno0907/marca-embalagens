import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { signUp } from '../services'
import { SignUp } from '../models'

export const useSignUpMutation = () => useMutation(
  ({ email, password }: SignUp) => signUp({ email, password }), {
  onSuccess: async profile => queryClient.setQueryData('profile', profile)
})
