import { useEffect, useState } from "react"

import { prefetchAddress } from "../../../../services/prefetchAddress"

import { Modal } from "../../../Modal"

import { 
  Box,  
  Flex,
  Icon,
  Text,
  Button,   
  useDisclosure
} from "@chakra-ui/react"

import { FiEdit, FiHome } from "react-icons/fi"

import { AddressProps } from "../../../../types"
import { UpdateAddressForm } from "../UpdateAddressForm"

export type AddressFieldProps = {
  address: AddressProps
}

const AddressField = ({ address }: AddressFieldProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [addressToEdit, setAddressToEdit] = useState<AddressProps>(null)

  const handlePrefetchAddress = async (id: string) => await prefetchAddress(id)

  const handleOpenModal = (address: AddressProps) => {
    setAddressToEdit(address)
    onOpen()
  }

  return (
    <>
      <Box py="2" px="4" bgColor="gray.100" borderRadius="8" border="1" borderColor="gray.600">
        <Flex align="center">        
          <Icon as={FiHome} fontSize="24" color="gray.500"/>
          <Box ml="4">
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              { address.principal ? 'Endereço principal:' : 'Outro endereço:'}
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
            onMouseEnter={() => handlePrefetchAddress(address.id)}
            onClick={() => handleOpenModal(address)} 
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

export { AddressField }
