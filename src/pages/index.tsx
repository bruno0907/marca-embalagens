import Head from 'next/head'
import { useRouter } from 'next/router'

import { Container, Button, Heading } from "@chakra-ui/react";

export default function Home () {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>MARCA | Seja bem-vindo</title>
      </Head>
      <Container h="100vh" display="flex" flexDir="column" alignItems="center" justifyContent="center">
        <Heading mb="8">MARCA | Bem-vindo</Heading>
        <Button colorScheme="blue" onClick={() => router.push('/dashboard')}>Entrar</Button>
      </Container>
    </>
  )
}
