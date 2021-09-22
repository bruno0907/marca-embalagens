import Link from 'next/link'

import { 
  Heading,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react"

const Logo = ({ ...rest }) => {
  return (
    <Flex flexDir="column" align="center">
      <Heading color="blue.500" {...rest}>MARCA</Heading>
      <Link href="/profile" passHref>
        <ChakraLink fontWeight="md" _hover={{ textDecor: 'none', color: 'blue.500' }}>
          Ver perfil
        </ChakraLink>
      </Link>
    </Flex>
  )
}

export { Logo }
