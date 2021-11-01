import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSignInMutation } from '../../hooks/useSignInMutation'

import { Input } from '../../components/Input'

import { 
  Container,
  Flex, 
  Stack,
  Button,  
  useToast,
  Text,  
  Heading,
  Link as ChakraLink
} from '@chakra-ui/react'
import { Content } from '../../components/Content'

type SignInProps = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido').trim(),
  password: yup.string().required('Senha obrigatória').trim()
})

export default function SignIn () {
  const router = useRouter()
  const toast = useToast()  

  const signInMutation = useSignInMutation()

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
      await signInMutation.mutateAsync(values)

      toast({
        title: 'Login Efetuado com sucesso',
        duration: 3000,
        status: 'success',
        position: 'top-right'
      })

      router.push('/dashboard')
      
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
    }
  }

  return (
    <>
      <Head>
        <title>MARCA | Faça seu login</title>
      </Head>
      <Container p={8} display="flex" flexDir="column" alignItems="center" justifyContent="center" h="100vh">
        <Heading mb="12">MARCA | Login</Heading>
        <Content
          as="form"
          mb="12"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={3} mb="12">
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
          </Stack>

          <Button            
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
            isDisabled={!isDirty}                 
          >Entrar</Button>    
        </Content>
        <Text>Não é cadastrado?
          <Link href="/sign-up" passHref>
            <ChakraLink fontWeight="bold" color="blue.500" _hover={{ color: 'blue.600' }}> Faça seu cadastro aqui!</ChakraLink>
          </Link>              
        </Text>      
      </Container>
    </>
  )
}
