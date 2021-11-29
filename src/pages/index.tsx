import Head from 'next/head'
import { useRouter } from 'next/router'

import { Center, Button, Heading } from "@chakra-ui/react";

export default function Home () {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Seja bem-vindo | MARCA</title>
      </Head>
        <Center h="100vh" flexDir="column">
          <Heading mb="12">Bem-vindo | MARCA</Heading>
          <Button colorScheme="blue" onClick={() => router.push('/dashboard')}>Entrar</Button>
      </Center>
    </>
  )
}
