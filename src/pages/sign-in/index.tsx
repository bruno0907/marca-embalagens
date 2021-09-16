import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '../../hooks/useAuth'

import { Input } from '../../components/Input'

import { 
  Container, 
  Stack,
  Button,  
  useToast,
  Text,  
  Heading,
  Link as ChakraLink
} from '@chakra-ui/react'

type SignInProps = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido').trim(),
  password: yup.string().required('Senha obrigatória').trim()
})

export default function SignIn () {  
  const { signIn } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const { 
    register, 
    handleSubmit, 
    formState,
    reset,
    setError,
    setFocus,
    clearErrors
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })  

  const {
    errors,
    isSubmitting,
    isDirty,
  } = formState    

  const handleSignIn: SubmitHandler<SignInProps> = async values => {
    try {
      await signIn(values)

      toast({
        title: 'Login Efetuado com sucesso',
        duration: 3000,
        status: 'success',
        position: 'top-right'
      })

      router.push('/dashboard')

      return
      
    } catch (error) {
      toast({
        title: 'Erro ao fazer o login',
        description: error.message,
        duration: 5000,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
  
      reset({
        ...values,
        password: ''
      })
      
      setError('email', {
        message: 'Usuário ou senha inválidos',        
      })

      setFocus('password')

      return
    }
  }

  return (
    <>
      <Head>
        <title>Marca | Faça seu login</title>
        <meta name="description" content="Página de Login da Marka" />
      </Head>
      <Container p={8} display="flex" flexDir="column" alignItems="center" justifyContent="center" h="100vh">
        <Heading mb="8">MARCA | Login</Heading>
        <Stack as="form" spacing={3} mb="8" w="100%" onSubmit={handleSubmit(handleSignIn)}>          
          <Input 
            type="email"
            label="E-mail"
            isDisabled={isSubmitting}
            error={errors.email}
            {...register('email')}
          />
          <Input 
            type="password"
            label="Senha"
            isDisabled={isSubmitting}
            error={errors.password}
            {...register('password')}
            onKeyUp={() => clearErrors(['email', 'password'])}
          />

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
            isDisabled={!isDirty}                                   
          >Entrar</Button>    
        </Stack>
        <Text>Não é cadastrado?
          <Link href="/sign-up" passHref>
            <ChakraLink fontWeight="bold" color="blue.500" _hover={{ color: 'blue.600' }}> Faça seu cadastro aqui!</ChakraLink>
          </Link>              
        </Text>      
      </Container>
    </>
  )
}
