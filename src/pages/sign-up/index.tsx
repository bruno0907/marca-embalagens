import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  Link as ChakraLink,
  Heading
} from '@chakra-ui/react'

type SignInProps = {
  email: string;
  password: string;
  password_verify: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido').trim(),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha obrigatória').trim(),
  password_verify: yup.string().oneOf(
    [yup.ref('password')],
    'As senhas não coincidem'
    ).required('Por favor confirme a sua senha')
})

export default function SignUp () {  
  const router = useRouter()
  const toast = useToast()
  
  const { signUp } = useAuth()

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

  const handleSignUp: SubmitHandler<SignInProps> = async (values) => {
    try {
      await signUp(values)      

      toast({
        title: 'Cadastro efetuado com sucesso',
        description: 'Redirecionando...',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => router.push('/profile')
      })

      return
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        isClosable: true,
        duration: 5000
      })

      return
    }
  }

  return (
    <>
      <Head>
        <title>Marca | Cadastre-se</title>
        <meta name="description" content="Página de Cadastro da Marka" />
      </Head>
      <Container p={8} display="flex" flexDir="column" alignItems="center" justifyContent="center" h="100vh">
        <Heading mb="8">MARCA | Cadastre-se</Heading>
        <Stack as="form" spacing={3} mb="8" w="100%" onSubmit={handleSubmit(handleSignUp)}>
          <Input 
            type="email"
            label="E-mail"
            isDisabled={isSubmitting}
            error={errors?.email}
            {...register('email')}
          />
          <Input 
            type="password"
            label="Senha"
            isDisabled={isSubmitting}
            error={errors?.password}
            {...register('password')}
          />
          <Input 
            type="password"
            label="Cofirme sua Senha"
            isDisabled={isSubmitting}
            error={errors?.password_verify}
            {...register('password_verify')}
          />

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
            isDisabled={!isDirty}
          >Cadastrar</Button>
        </Stack>
        <Text>Já é cadastrado?
          <Link href="/sign-in" passHref>
            <ChakraLink fontWeight="bold" color="blue.500" _hover={{ color: 'blue.600' }}> Faça seu login aqui!</ChakraLink>
          </Link>              
        </Text>
      </Container>
    </>
  )
}
