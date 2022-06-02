import { useRouter } from 'next/router'

import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { 
  Container,
  Stack,  
  useToast,  
} from '@chakra-ui/react'

import { 
  Content,
  Input,
  Form,
  ButtonPrimary, 
  Section,  
  SectionTitle,  
} from '../../components'

import { useSignInMutation } from '../../hooks'

import { SignIn } from '../../models'

const signInFormSchema = yup.object().shape({
  email: yup.string()
    .required('Informe o seu e-mail de acesso')
    .email('O formato de e-mail parece ser inválido')
    .trim(),
  password: yup.string()
    .required('Informe a sua senha')
    .trim()
})

export const SignInModule = () => {
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
        title: 'Login efetuado com sucesso!',
        description: 'Redirecionando...',
        duration: 3000,
        status: 'success',
        position: 'bottom'
      })

      return router.push('/dashboard')      
      
    } catch (error) {
      toast({
        title: 'Ocorreu um erro!',
        description: 'Não foi possível fazer o seu login.',
        duration: 5000,
        status: 'error',
        isClosable: true,
        position: 'bottom'
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
  
   //*** TODO ***
   //const handleRememberMe = (event) => console.log(event)   

  return (    
    <Container p={12} display="flex" flexDir="column" alignItems="center" justifyContent="center" h="100vh">
      <Section>        
        <SectionTitle title="Entrar"/>        
        <Content>
          <Form onSubmit={handleSubmit(handleSignIn)}>
            <Stack spacing={3} w="100%">
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
              {/* <Checkbox
                onChange={handleRememberMe}
              >
                <Text fontWeight="medium" fontSize={['sm', 'sm', 'md']}>Lembrar-me</Text>
              </Checkbox> */}
            </Stack>
            <ButtonPrimary                  
              w="100%"
              type="submit"            
              isLoading={isSubmitting}
              isDisabled={!isDirty}                 
            >Entrar</ButtonPrimary>
          </Form>
        </Content>
        {/* <Text>Não é cadastrado?
          <Link href="/sign-up" passHref>
          <ChakraLink fontWeight="bold" color="blue.500" _hover={{ color: 'blue.600' }}> Faça seu cadastro aqui!</ChakraLink>
          </Link>              
        </Text>       */}
      </Section>        
    </Container>
  )
}
