import Link from 'next/link'

import { Center, Heading, Link as ChakraLink } from "@chakra-ui/layout";

export default function NotFound() {
  return(
    <Center h="100vh" flexDir="column">
      <Heading mb="8">Página não encontrada</Heading>
      <Link href="/sign-in" passHref>
        <ChakraLink>Voltar</ChakraLink>
      </Link>
    </Center>
  )
}