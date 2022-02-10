import { useRouter } from 'next/router'
import { Center, Heading } from "@chakra-ui/react";

import { ButtonPrimary } from '../../components';

export const HomeModule = () => {
  const router = useRouter()

  return (    
    <Center h="100vh" flexDir="column" p={12}>
      <Heading mb="12">Bem-vindo</Heading>
      <ButtonPrimary onClick={() => router.push('/dashboard')}>
        Entrar
      </ButtonPrimary>
    </Center>    
  )
}
