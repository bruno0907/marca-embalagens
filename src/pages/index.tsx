import Head from 'next/head'
import Router from 'next/router'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '../hooks/useAuth'

import { Input } from '../components/Input'

import { 
  Container, 
  Stack,
  Button,  
  useToast,
} from '@chakra-ui/react'

type SignInProps = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido').trim(),
  password: yup.string().required('Senha obrigatória').trim()
})

export default function Home() {  
  const { signIn } = useAuth()

  const toast = useToast()

  const { 
    register, 
    handleSubmit, 
    formState
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })  

  const {
    errors,
    isSubmitting,
    isDirty,
  } = formState

  const handleSignIn: SubmitHandler<SignInProps> = async (values) => {    
    await signIn(values).then(response => {
      toast({
        title: 'Sucesso!',
        description: 'Login feito com sucesso, redirecionando!',
        duration: 1000,
        status: 'success'
      })
      console.log(response)

      setTimeout(() => {
        Router.push('/dashboard')
      }, 2000)
    }).catch(error => {
      toast({
        title: 'Erro!',
        description: error.message,        
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    })
  }

  return (
    <>
      <Head>
        <title>Marka | Entrar</title>
        <meta name="description" content="Página de Login da Marka" />
      </Head>
      <Container p={8} display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Stack as="form" spacing={3} w="100%" onSubmit={handleSubmit(handleSignIn)}>
          <Input 
            type="email"
            label="E-mail"
            error={errors?.email}
            {...register('email')}
          />
          <Input 
            type="password"
            label="Senha"
            error={errors?.password}
            {...register('password')}
          />

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
            isDisabled={!isDirty}
          >Entrar</Button>
        </Stack>
      </Container>
    </>
  )
}
