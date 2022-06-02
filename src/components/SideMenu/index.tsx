import {
  Flex,   
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton, 
  DrawerBody, 
  DrawerHeader, 
  useBreakpointValue 
} from "@chakra-ui/react"

import { FiLogOut } from 'react-icons/fi'

import { Logo } from "../Logo"
import { NavBar } from '../NavBar'
import { ButtonPrimary } from '../ButtonPrimary'
import { useSignOutMutation } from '../../hooks/useSignOutMutation'
import { useSidebarDrawer } from '../../contexts/SidebarContext'

export const SideMenu = () => {
  const signOutMutation = useSignOutMutation()

  const handleSignOut = () => signOutMutation.mutate()

  const { isOpen, onClose } = useSidebarDrawer()

  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  })


  return isMobile ? (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay>
        <DrawerContent p={0} maxW="265px" bgColor="gray.50">
          <DrawerCloseButton p={4} top={3.5}/>
          <DrawerHeader >Navegação</DrawerHeader>
          <DrawerBody p={0}>
            <NavBar />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  ) : (
    <Flex
      as="aside"
      h="100vh"
      flexDir="column"
      justify="flex-start"
      align="center"
      py="4"
      bgColor="gray.50"
      boxShadow="md"
    >
      <Logo />
      <NavBar />
      <ButtonPrimary          
        rightIcon={<FiLogOut />}
        onClick={handleSignOut}        
        mt="auto"        
        w="70%"
      >Sair</ButtonPrimary>        
    </Flex>

  )
}
