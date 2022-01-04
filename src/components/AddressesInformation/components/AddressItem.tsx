import { useState } from "react"
import dynamic from "next/dynamic"

import { prefetchAddress } from "../../../services/prefetchAddress"

import { ModalProps } from "../../Modal"
import { UpdateAddressFormProps } from "./UpdateAddressForm"

import { 
  Box,  
  Flex,
  Icon,
  Text,
  Button,   
  useDisclosure,
  Center,
  Spinner,
} from "@chakra-ui/react"

import { FiEdit, FiHome } from "react-icons/fi"

import { AddressProps } from "../../../types"

const Modal = dynamic<ModalProps>(
  () =>import('../../Modal').then(({ Modal }) => Modal)
)

const UpdateAddressForm = dynamic<UpdateAddressFormProps>(
  () => import('./UpdateAddressForm')
    .then(({ UpdateAddressForm }) => UpdateAddressForm)  
)

export type AddressItemProps = {
  address: AddressProps
}

const AddressItem = ({ address }: AddressItemProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [addressToEdit, setAddressToEdit] = useState<AddressProps>(null)

  const handlePrefetchAddress = async () => await prefetchAddress(address.id)

  const handleOpenModal = () => {
    setAddressToEdit(address)
    onOpen()
  }

  return (
    <>
      <Box as="li" listStyleType="none" py="2" px="4" bgColor="gray.100" borderRadius="md">
        <Flex align="center">        
          <Icon as={FiHome} fontSize="24" color="gray.500"/>
          <Box ml="4">
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              { address.principal ? 'Endereço principal' : 'Outro endereço'}
            </Text>        
            <Text fontSize="sm" color="gray.700" fontWeight="medium">
              {address.endereco} - {address.bairro}
            </Text>
            <Text fontSize="sm" color="gray.700" fontWeight="medium">
              {address.cidade}/{address.estado} - {address.cep}
            </Text>
            <Text fontSize="sm" color="gray.700" fontWeight="medium">
              {address.complemento}
            </Text>
          </Box>
          <Button 
            ml="auto" 
            variant="link"
            onMouseEnter={handlePrefetchAddress}
            onClick={handleOpenModal} 
            _hover={{ svg: { color: "blue.600" } }}
          >
            <Icon as={FiEdit} fontSize="24" color="blue.500"/>
          </Button>
        </Flex>         
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} title="Editar endereço">
        <UpdateAddressForm address={addressToEdit} onClose={onClose}/>
      </Modal>
    </>
  )
}

export { AddressItem }
