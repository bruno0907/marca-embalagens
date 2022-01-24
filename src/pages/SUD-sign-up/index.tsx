import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSignUpMutation } from '../../hooks/useSignUpMutation'

import { Content } from '../../components/Content'
import { Input } from '../../components/Input'

import { 
  Container,
  Stack,
  Button,  
  useToast,
  Text,
  Link as ChakraLink,
  Heading
} from '@chakra-ui/react'

type SignInProps = {
  email: string;
  password: string;
  password_verify: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido')
    .trim(),
  password: yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha obrigatória')
    .trim(),
  password_verify: yup.string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Por favor confirme a sua senha')
    .trim()
})

export default function SignUp () {  
  const router = useRouter()
  const toast = useToast()

  const signUpMutation = useSignUpMutation()

  const { 
    register, 
    handleSubmit, 
    formState,
    setFocus,
    setError,
    reset
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })  

  const {
    errors,
    isSubmitting,
    isDirty,
  } = formState

  const handleSignUp: SubmitHandler<SignInProps> = async values => {    
    try {      
      const { email, password } = values

      await signUpMutation.mutateAsync({ email, password })

      toast({
        title: 'Cadastro efetuado com sucesso!',        
        description: 'Redirecionado...',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',        
      })

      return router.push('/profile')
      
    } catch (error) {
      toast({
        title: 'Ocorreu um erro!',
        description: 'Ocorreu um erro ao criar seu cadastro.',
        status: 'error',
        isClosable: true,
        duration: 5000,
        position: 'bottom'
      })
      
      reset({
        ...values,
        password: '',
        password_verify: ''
      })

      setFocus('email')

      setError('email', {
        message: 'O e-mail informado já está em uso.'
      })

      return
    }
  }

  return (
    <>
      <Head>
        <title>Cadastre-se | MARCA</title>
      </Head>
      <Container p={8} display="flex" flexDir="column" alignItems="center" justifyContent="center" h="100vh">
        <Heading mb="12">Cadastre-se | MARCA</Heading>
        <Content
          as="form"
          mb="12"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <Stack spacing={3} mb="12">
            <Input 
              name="email"
              type="email"
              label="E-mail:"
              isDisabled={isSubmitting}
              error={errors?.email}
              {...register('email')}
            />
            <Input 
              name="password"
              type="password"
              label="Senha:"
              isDisabled={isSubmitting}
              error={errors?.password}
              {...register('password')}
            />
            <Input 
              name="password_verify"
              type="password"
              label="Cofirme sua senha:"
              isDisabled={isSubmitting}
              error={errors?.password_verify}
              {...register('password_verify')}
            />
          </Stack>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
            isDisabled={!isDirty}
          >Cadastrar</Button>
        </Content>
        <Text>Já é cadastrado?
          <Link href="/sign-in" passHref>
            <ChakraLink fontWeight="bold" color="blue.500" _hover={{ color: 'blue.600' }}> Faça seu login aqui!</ChakraLink>
          </Link>              
        </Text>
      </Container>
    </>
  )
}
