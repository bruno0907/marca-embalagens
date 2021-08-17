import NextLink from 'next/link'

import {
  Flex,
  Link,
  Icon,
  Text
} from '@chakra-ui/react'

import { FiArrowLeft } from 'react-icons/fi'

const GoBack = () => {
  return (   
    <Flex justify="space-between" mb="8"> 
      <NextLink href="/users" passHref>
      <Link display="flex" alignItems="center" justifyContent="center" _hover={{ color: 'blue.500' }}>
        <Icon as={FiArrowLeft} fontSize="24" cursor="pointer" />
        <Text fontSize="xl" fontWeight="500" ml="2">Voltar</Text>
      </Link>
      </NextLink>      
    </Flex>
  )
}

export { GoBack }
