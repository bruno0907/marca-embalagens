import Link from 'next/link'

import { ActiveLink } from "./ActiveLink"

import { Logo } from "../Logo"
import { useAuth } from "../../hooks/useAuth"

import { 
  Flex,
  Stack,  
  Button,
  Spacer,
  Link as ChakraLink
} from "@chakra-ui/react"

import { 
  FiEdit, 
  FiUsers, 
  FiPackage, 
  FiPhoneCall, 
  FiHome,
  FiLogOut
} from "react-icons/fi"
import { queryClient } from "../../contexts/queryContext"

const SideMenu = () => {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut().then(() => queryClient.clear())
  }

  return (
    <Flex
      as="aside"
      h="100vh"
      flexDir="column"
      justify="flex-start"
      align="center"
      px="8"
      py="10"
      bgColor="gray.50"
      boxShadow="sm"
    >
      <Flex flexDir="column" align="center">
        <Logo />
        <Link href="/profile" passHref>
          <ChakraLink fontWeight="md" _hover={{ textDecor: 'none', color: 'blue.500' }}>
            Ver perfil
          </ChakraLink>
        </Link>
      </Flex>
      <Stack as="nav" spacing={3} mt="16">        
        <ActiveLink 
          href="/dashboard"
          icon={FiHome}
          label="Página Inicial"
        />
        <ActiveLink 
          href="/orders"
          icon={FiEdit}
          label="Pedidos"
        />
        <ActiveLink 
          href="/users"
          icon={FiUsers}
          label="Clientes"
        />
        <ActiveLink 
          href="/products"
          icon={FiPackage}
          label="Produtos"
        />
        <ActiveLink 
          href="/suppliers"
          icon={FiPhoneCall}
          label="Fornecedores"
        />        
      </Stack>
      <Spacer />
      <Button
        rightIcon={<FiLogOut />}        
        onClick={handleSignOut}
        colorScheme="blue"
        flexShrink={0}        
        w="100%"                             
      >Sair</Button>
    </Flex>
  )
}

export { SideMenu }