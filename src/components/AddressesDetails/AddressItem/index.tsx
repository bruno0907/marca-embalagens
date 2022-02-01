import { useState } from "react"
import dynamic from "next/dynamic"

import { prefetchAddress } from "../../../services/prefetchAddress"

import { ModalProps } from "../../Modal"
import { UpdateAddressFormProps } from "../UpdateAddressForm"

import { 
  Box,  
  Flex,
  Icon,
  Text,
  Button,   
  useDisclosure,
  HStack,
} from "@chakra-ui/react"

import { FiEdit, FiHome } from "react-icons/fi"

const Modal = dynamic<ModalProps>(
  () =>import('../../Modal').then(({ Modal }) => Modal)
)
  
const UpdateAddressForm = dynamic<UpdateAddressFormProps>(
  () => import('../UpdateAddressForm').then(({ UpdateAddressForm }) => UpdateAddressForm)  
)
    
import { Address } from "../../../hooks/useAddressQuery"

export type AddressItemProps = {
  address: Address
}

const AddressItem = ({ address }: AddressItemProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [addressToEdit, setAddressToEdit] = useState<Address>(null)

  const handlePrefetchAddress = async () => await prefetchAddress(address.id)

  const handleOpenModal = () => {
    setAddressToEdit(address)
    onOpen()
  }

  return (
    <>
      <HStack 
        as="li"
        listStyleType="none" 
        spacing={3}
        py={2} 
        px={4} 
        bgColor="gray.100" 
        borderRadius="md"
        align="center"
      >
        <Icon as={FiHome} fontSize="24" color="gray.500"/>
        
        <Flex flexDir="column" flex="1">
          <Text fontSize="sm" color="gray.500" fontWeight="medium">
            { address.principal ? 'Endereço principal:' : 'Outro endereço'}
          </Text>        
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            {address.endereco} - {address.bairro}
          </Text>
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            {address.cidade}/{address.estado} 
            {address.cep && ` - ${address.cep}`}
          </Text>
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            {address.complemento}
          </Text>
        </Flex>
        
        <Button
          variant="link"
          colorScheme="blue"
          alignSelf="flex-start"
          ml="auto"
          p="2"
          onMouseEnter={handlePrefetchAddress}
          onClick={handleOpenModal} 
          _hover={{ svg: { color: "blue.600" } }}
        >
          <Icon as={FiEdit} fontSize="24"/>
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} title="Editar endereço">
        <UpdateAddressForm address={addressToEdit} onClose={onClose}/>
      </Modal>
    </>
  )
}

export { AddressItem }
