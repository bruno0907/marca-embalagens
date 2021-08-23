import Link from "next/link"
import { useRouter } from "next/router"

import { 
  Icon, 
  Link as ChakraLink, 
  Box,
  Stack 
} from "@chakra-ui/react"

import { FiEdit, FiUsers, FiPackage, FiPhoneCall, FiHome } from "react-icons/fi"


const SideMenu = () => {
  const { asPath } = useRouter()

  return (
    <Box as="aside" pt="2" mr="16">
      <Stack as="nav" spacing="4" >
        <Link href="/dashboard" passHref>
          <ChakraLink display="flex" alignItems="center" color={asPath.includes('/dashboard') && 'blue.500'} fontWeight="bold" _hover={{ color: "blue.500" }}>
            <Icon as={FiHome} mr="2"/>
            Página inicial
          </ChakraLink>
        </Link>
        <Link href="/orders" passHref>
          <ChakraLink display="flex" alignItems="center" color={asPath.includes('/orders') && 'blue.500'} fontWeight="bold" _hover={{ color: "blue.500" }}>
            <Icon as={FiEdit} mr="2"/>
            Pedidos
          </ChakraLink>
        </Link>
        <Link href="/users" passHref>
          <ChakraLink display="flex" alignItems="center" color={asPath.includes('/users') && 'blue.500'} fontWeight="bold" _hover={{ color: "blue.500" }}>
            <Icon as={FiUsers} mr="2"/>
            Clientes
          </ChakraLink>
        </Link>
        <Link href="/products" passHref>
          <ChakraLink display="flex" alignItems="center" color={asPath.includes('/products') && 'blue.500'} fontWeight="bold" _hover={{ color: "blue.500" }}>
            <Icon as={FiPackage} mr="2"/>
            Produtos
          </ChakraLink>
        </Link>
        <Link href="/suppliers" passHref>
          <ChakraLink display="flex" alignItems="center" color={asPath.includes('/suppliers') && 'blue.500'} fontWeight="bold" _hover={{ color: "blue.500" }}>
            <Icon as={FiPhoneCall} mr="2"/>
            Fornecedores
          </ChakraLink>
        </Link>
      </Stack>      
    </Box>
  )
}

export { SideMenu }