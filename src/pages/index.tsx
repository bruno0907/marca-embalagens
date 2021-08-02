import { useRouter } from 'next/router'

import { Container, Button } from "@chakra-ui/react";

export default function Home () {
  const router = useRouter()

  return (
    <Container minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Button colorScheme="blue" onClick={() => router.push('/dashboard')}>Entrar</Button>
    </Container>
  )
}