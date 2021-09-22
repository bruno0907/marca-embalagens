import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { createAddress } from '../services/createAddress'
import { createProfile } from '../services/createProfile'
import { NewAddressProps, NewProfileProps } from '../types'
import { useAuth } from './useAuth'

type AuthProps = {
  email: string;
  password: string;
}

const useCreateProfileMutation = () => {
  const { signUp } = useAuth()  

  return useMutation(    
    async (auth: AuthProps) => {
      const newSignUp = await signUp(auth)

      if(newSignUp.error) throw new Error('O e-email informado já está em uso. Tente outro e-mail')

      if(newSignUp.user) {
        const profile: NewProfileProps = {
          user_id: newSignUp.user.id,
          celular: '',
          cpf_cnpj: '',
          email: newSignUp.user.email,
          nome: '',
          razao_social: '',
          rg_ie: '',
          telefone: ''
        }
        const { data: newProfile } = await createProfile(profile)

        const address: NewAddressProps = {
          user_id: newProfile[0].id,
          bairro: '',
          cep: '',
          cidade: '',
          complemento: '',
          endereco: '',
          estado: '',
          principal: true,
        }

        const { data: newAddress } = await createAddress(address)

        return {
          data: newProfile[0],
          address: newAddress[0]
        }
        
      }

      throw new Error('Ocorreu um erro ao efetuar o cadastro. Tente novamente.')
    }, {
      onSuccess: async profile => queryClient.setQueryData('profile', profile)
    }
  )
}

export {
  useCreateProfileMutation
}