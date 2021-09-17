import { Logo } from "../Logo"
import { ActiveLink } from "./ActiveLink"

import { useAuth } from "../../hooks/useAuth"

import { 
  Flex,
  Stack,  
  Button,
  Spacer
} from "@chakra-ui/react"

import { 
  FiEdit, 
  FiUsers, 
  FiPackage, 
  FiPhoneCall, 
  FiHome,
  FiLogOut
} from "react-icons/fi"

const SideMenu = () => {
  const { signOut } = useAuth()

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
      <Logo />
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
        onClick={signOut}
        colorScheme="blue"
        flexShrink={0}        
        w="100%"                             
      >Sair</Button>
    </Flex>
  )
}

export { SideMenu }