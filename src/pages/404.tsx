import Link from 'next/link'

import { Center, Heading, Link as ChakraLink, Stack, Text } from "@chakra-ui/layout";
import { Button } from '@chakra-ui/react';

export default function NotFound() {
  return(
    <Center h="100vh" flexDir="column">     
      <Stack spacing={6} align="center" justify="center">
        <Stack align="center">
          <Heading>Oops! 404</Heading>
          <Text fontWeight="medium">A página procurada não pôde ser encontrada</Text>
        </Stack>
        <Link href="/sign-in" passHref>
          <Button as={ChakraLink} colorScheme="blue" _hover={{ 
            textDecor: 'none',
            bgColor: 'blue.600'
          } }>Voltar</Button>
        </Link>

      </Stack>
    </Center>
  )
}