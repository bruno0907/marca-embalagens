import { memo } from 'react'

import Link from 'next/link'

import { ActiveLink } from "../ActiveLink"

import { useSignOutMutation } from '../../hooks/useSignOutMutation'

import { Logo } from "../Logo"

import {
  Box,   
  Flex,
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
  FiLogOut,  
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
      <Flex flexDir="column" align="center">
        <Logo />
        <Link href="/profile" passHref>
          <ChakraLink fontWeight="md" _hover={{ textDecor: 'none', color: 'blue.500' }}>
            Ver perfil
          </ChakraLink>
        </Link>
      </Flex>
      <Box as="nav" mt="16">        
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
      </Box>
      <Spacer />
      <Flex px="8" w="100%">
        <Button
          rightIcon={<FiLogOut />}
          onClick={handleSignOut}
          colorScheme="blue"
          flexShrink={0}
          flex="1"
        >Sair</Button>
      </Flex>
    </Flex>
  )
}

const SideMenu = memo(SideMenuComponent)

export { SideMenu }