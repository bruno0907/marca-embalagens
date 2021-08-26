import { Logo } from "../Logo"
import { ActiveLink } from "./ActiveLink"

import { useAuth } from "../../hooks/useAuth"

import { 
  Flex,
  Stack,  
  Button
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
      flexDir="column"      
      align="center"
      justify="space-between"
      px="8"
      py="10"
      bgColor="gray.50"                  
    >
      <Logo />
      <Stack as="nav" spacing="4" my="4">        
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