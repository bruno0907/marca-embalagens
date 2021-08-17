import { Icon, Link as ChakraLink, Stack } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { FiEdit, FiUsers, FiPackage, FiPhoneCall, FiHome } from "react-icons/fi"


const SideMenu = () => {
  const { asPath } = useRouter()

  return (
    <Stack as="nav" spacing="4" minH="100%" pt="2" mr="16">      
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
  )
}

export { SideMenu }