import { useState, useEffect } from "react"

import { UserAddresses } from "../../pages/users/[id]/components/userAddresses"
import { UserInfo } from "../../pages/users/[id]/components/userInfo"
import { UserOrders } from "../../pages/users/[id]/components/userOrders"

import { 
  Button, 
  HStack, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
} from "@chakra-ui/react"
import { supabase } from "../../services/supabase"

type UserModalProps = {
 isOpen: boolean;
 onClose: () => void;
 user: UserProps;
}

interface UserProps {
  id: string;
  name: string;
  phone_number: string;
  mobile_number: string;
  email: string;  
}

interface AddressesProps {
  id: string;
  address: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string;  
}

const UserModal = ({ isOpen, onClose, user }: UserModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      onEsc={onClose}
      useInert={isOpen}
      size="xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bgColor="gray.100" p="4">
        <ModalHeader>Dados Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Tabs variant="enclosed" borderColor="blue.500" isLazy lazyBehavior="unmount">
            <TabList>
              <Tab _selected={{ bg: 'blue.500', color: 'gray.50' }}>Dados do Cliente</Tab>
              <Tab _selected={{ bg: 'blue.500', color: 'gray.50' }}>Endereços do Cliente</Tab>
              <Tab _selected={{ bg: 'blue.500', color: 'gray.50' }}>Pedidos do Cliente</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserInfo user={user}/>
              </TabPanel>
              <TabPanel>
                <UserAddresses user={user}/>
              </TabPanel>
              <TabPanel>
                <UserOrders />
              </TabPanel>
            </TabPanels>
          </Tabs> */}
        </ModalBody>
        <ModalFooter>
          <HStack spacing={3}>
            <Button colorScheme="blue" variant="ghost" _hover={{ bgColor: 'blue.500', color: 'gray.50' }} onClick={onClose}>Sair</Button>
            <Button colorScheme="blue">Imprimir</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { UserModal }
