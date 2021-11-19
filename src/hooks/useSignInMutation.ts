import { useMutation } from 'react-query'

import { useAuth } from './useAuth'

type SignInProps = {
  email: string;
  password: string;
}

const useSignInMutation = () => {
  const { signIn } = useAuth()

  return useMutation(
    async (values: SignInProps) => {
      const { error, user } = await signIn(values)

      if(error) throw new Error('E-mail ou senha inválidos')
      
      return user
    }
  )
}

export {
  useSignInMutation
}