import { Flex, FlexProps } from "@chakra-ui/react"

import { 
  FiEdit, 
  FiUsers, 
  FiPackage, 
  FiPhoneCall, 
  FiHome,  
  FiUser
} from "react-icons/fi"

import { ActiveLink } from "./components"

export const NavBar = ({ ...rest }: FlexProps) => {
  return (
    <Flex as="nav" flexDir="column" mt={['6', '6', '12']} {...rest}>
      <ActiveLink 
        href="/dashboard"
        icon={FiHome}
        label="Página Inicial"
      />
      <ActiveLink 
        href="/estimates"
        icon={FiEdit}
        label="Orçamentos"
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
      <ActiveLink         
        href='/profile'
        label='Meu Perfil'
        icon={FiUser}          
      />
    </Flex>
  )
}