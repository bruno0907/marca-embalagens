import { useState } from "react"
import dynamic from "next/dynamic"

import { 
  IconButton,   
  Flex,
  Icon,
  Text,    
  useDisclosure,
  HStack,
  ListItem,
} from "@chakra-ui/react"

import { FiEdit, FiHome } from "react-icons/fi"

import { prefetchAddress } from "../../../../services"

import { Address } from "../../../../models"

import { ModalProps } from "../../../../components"

const Modal = dynamic<ModalProps>(
  () =>import('../../../../components/Modal').then(({ Modal }) => Modal)
)
  
import { UpdateAddressModuleProps } from "../../../UpdateAddress"

const UpdateAddressForm = dynamic<UpdateAddressModuleProps>(
  () => import('../../../UpdateAddress').then(({ UpdateAddressModule }) => UpdateAddressModule)  
)

export type AddressItemProps = {
  address: Address
}

export const AddressItem = ({ address }: AddressItemProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [addressToEdit, setAddressToEdit] = useState<Address>(null)

  const handlePrefetchAddress = async () => await prefetchAddress(address.id)

  const handleOpenModal = () => {
    setAddressToEdit(address)
    onOpen()
  }

  return (    
    <ListItem>
      <HStack
        spacing={3}        
        alignItems="center"
        py={2} 
        px={4} 
        bgColor="gray.100" 
        borderRadius="md"
      >
        <Icon as={FiHome} fontSize="24" color="gray.500"/>        
        <Flex flexDir="column" flex="1">
          <Text fontSize={['small', 'small', 'sm']} color="gray.500" fontWeight="medium">
            { address.principal ? 'Endereço principal:' : 'Outro endereço'}
          </Text>        
          <Text fontSize={['small', 'small', 'sm']} color="gray.700" fontWeight="medium">
            {address.endereco} - {address.bairro}
          </Text>
          <Text fontSize={['small', 'small', 'sm']} color="gray.700" fontWeight="medium">
            {address.cidade}/{address.estado} 
            {address.cep && ` - ${address.cep}`}
          </Text>
          <Text fontSize={['small', 'small', 'sm']} color="gray.700" fontWeight="medium">
            {address.complemento}
          </Text>
        </Flex>        
        <IconButton
          aria-label="edit-address"          
          icon={<FiEdit/>}
          color="blue.500"
          fontSize="24"
          onMouseEnter={handlePrefetchAddress}
          onClick={handleOpenModal} 
          _hover={{ svg: { color: "blue.600" } }}
        />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar endereço">
        <UpdateAddressForm address={addressToEdit} onClose={onClose}/>
      </Modal>
    </ListItem>    
  )
}
