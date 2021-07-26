import Head from 'next/head'
import {
  Container,
  Heading
} from '@chakra-ui/react'

function Dashboard() {
  return (
    <>
      <Head>
        <title>Marka | Entrar</title>
        <meta name="description" content="Página de Login da Marka" />
      </Head>
      <Container>
        <Heading as="h1">Dashboard</Heading>
      </Container>
    </>
  )
}

export { Dashboard }