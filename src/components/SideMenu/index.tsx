import { memo } from 'react'

import Link from 'next/link'

import { ActiveLink } from "../ActiveLink"

import { useSignOutMutation } from '../../hooks/useSignOutMutation'

import { Logo } from "../Logo"

import {
  Stack,
  Box,   
  Flex,
  Button,  
  Link as ChakraLink
} from "@chakra-ui/react"

import { 
  FiEdit, 
  FiUsers, 
  FiPackage, 
  FiPhoneCall, 
  FiHome,
  FiLogOut,  
  FiUser
} from "react-icons/fi"


const SideMenuComponent = () => {
  const signOutMutation = useSignOutMutation()

  const handleSignOut = () => signOutMutation.mutate()

  return (
    <Flex
      as="aside"
      h="100vh"
      flexDir="column"
      justify="flex-start"
      align="center"
      py="12"
      bgColor="gray.50"
      boxShadow="sm"
    >
      <Logo />

      <Box as="nav" mt="16" mb="auto">        
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
      </Box>
      <Button          
        rightIcon={<FiLogOut />}
        onClick={handleSignOut}
        colorScheme="blue"
        flexShrink={0}
        mt="auto"
        px="14"
      >Sair</Button>        
    </Flex>
  )
}

const SideMenu = memo(SideMenuComponent)

export { SideMenu }