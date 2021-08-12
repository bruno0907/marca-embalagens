import Link from 'next/link'

import {
  Link as ChakraLink,
  Icon,
  Text,   
} from '@chakra-ui/react'


type ButtonProps = {
  children: string,
  href: string,
  icon: React.ComponentType,
}

const Button = ({ children, href, icon }: ButtonProps) => {
  return (
    <Link href={href} passHref>
      <ChakraLink 
        p="8"
        display="flex" 
        flexDir="column" 
        alignItems="center" 
        justifyContent="center"
        backgroundColor="gray.100"
        borderRadius="8"
        _hover={{ backgroundColor: 'gray.200' }} 
      >
        <Icon as={icon} mb="4" w="6" h="6"/>
        <Text fontSize="larger" fontWeight="bold">{children}</Text>
      </ChakraLink>
    </Link>
  )
}

export { Button }
