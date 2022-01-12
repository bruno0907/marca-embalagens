import { useRouter } from 'next/router'
import Head from 'next/head'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SignIn, useSignInMutation } from '../../hooks/useSignInMutation'

import { Content } from '../../components/Content'
import { Input } from '../../components/Input'

import { 
  Container,
  Stack,
  Button,
  useToast,
  Heading,
} from '@chakra-ui/react'

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Informe o seu e-mail de acesso').email('O formato de e-mail parece ser inválido').trim(),
  password: yup.string().required('Informe a sua senha').trim()
})

export default function SignInPage () {
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

  const handleSignIn: SubmitHandler<SignIn> = async values => {
    try {
      const { email, password } = values
    
      await signInMutation.mutateAsync({ email, password })
    
      toast({
        title: 'Login Efetuado com sucesso, aguarde...',
        duration: 3000,
        status: 'success',
        position: 'top-right'
      })

      return router.push('/dashboard')      
      
    } catch (error) {
      toast({
        title: 'Não foi possível fazer o seu login',
        description: 'O e-mail ou senha informados são inválidos',
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
        message: 'O e-mail ou a senha informados são inválidos.',        
      })
  
      setFocus('password')     
      
    }
  }

  return (
    <>
      <Head>
        <title>Faça seu login | MARCA</title>
      </Head>
      <Container p={8} display="flex" flexDir="column" alignItems="center" justifyContent="center" h="100vh">
        <Heading mb="12">Login | MARCA</Heading>
        <Content
          as="form"
          mb="12"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={3} mb="12">
            <Input 
              type="email"
              label="E-mail:"                        
              isDisabled={isSubmitting}              
              error={errors.email}
              {...register('email')}
            />
            <Input 
              type="password"
              label="Senha:"              
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
        {/* <Text>Não é cadastrado?
          <Link href="/sign-up" passHref>
            <ChakraLink fontWeight="bold" color="blue.500" _hover={{ color: 'blue.600' }}> Faça seu cadastro aqui!</ChakraLink>
          </Link>              
        </Text>       */}
      </Container>
    </>
  )
}
