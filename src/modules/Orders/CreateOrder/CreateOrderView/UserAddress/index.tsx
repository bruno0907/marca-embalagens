import dynamic from 'next/dynamic'
import { ChangeEvent } from 'react'

import { Select } from '../../../../../components/Select'

import { useAddressesQuery } from '../../../../../hooks/useAddressesQuery'
import { useCreateOrder } from '../../../../../contexts/useCreateOrder'

import { 
  Button, 
  HStack, 
  Spinner, 
  Text,
  SimpleGrid,
  GridItem,
  Stack, 
  useDisclosure 
} from "@chakra-ui/react"

import { FiEdit, FiRefreshCw } from "react-icons/fi"

import { ModalProps } from '../../../../../components/Modal'
import { UpdateAddressFormProps } from '../../../../../components/AddressesDetails/UpdateAddressForm'

const Modal = dynamic<ModalProps>(
  () => import('../../../../../components/Modal').then(({ Modal }) => Modal)
)

const UpdateAddressForm = dynamic<UpdateAddressFormProps>(
  () => import('../../../../../components/AddressesDetails/UpdateAddressForm')
  .then(({ UpdateAddressForm }) => UpdateAddressForm)
)

export const UserAddress = () => { 
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    selectedUser,
    selectedAddress,
    setSelectedAddress
  } = useCreateOrder()  

  const { data, isLoading, isError } = useAddressesQuery(selectedUser?.id)

  const handleSelectAddress = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(null)
    const { value } = event.target    
    const address = data.addresses?.find(address => address.id === value)
    setSelectedAddress(address)
  }  

  if(isLoading) {
    return ( 
      <HStack spacing={2} align="center">
        <Text fontWeight="medium">Endereço:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>
    )
  }

  if(isError) {    
    return (      
      <Text pt="4" fontWeight="medium">
        Ocorreu um erro ao carregar os endereços do cliente...
      </Text>                    
    )
  }

  return (
    <>
      {!selectedAddress && (
        <Select
          name="endereco"        
          isLoading={isLoading}
          onChange={handleSelectAddress}
          value={!selectedAddress ? 'defaultValue' : selectedAddress.endereco}        
        >
          <option value="defaultValue" disabled>Selecione o endereço de entrega...</option>
          { data?.addresses.map(address => {
            return (
              <option key={address.id} value={address.id}>{address.endereco}</option>
            )
          })}
        </Select>
      )}
      {selectedAddress && (
        <>
          <Stack spacing={6}>
            <SimpleGrid columns={3} gap={3}>
              <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
                <Text fontSize="sm">
                  {selectedAddress.endereco}
                </Text>
              </GridItem>
              <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
                <Text fontSize="sm">
                  {selectedAddress.bairro}
                </Text>
              </GridItem>
              {selectedAddress.cep && (
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
                  <Text fontSize="sm">
                    {selectedAddress.cep}
                  </Text>
                </GridItem>
              )}
              <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                <Text fontSize="x-small" fontWeight="bold">Cidade:</Text>
                <Text fontSize="sm">
                  {selectedAddress.cidade}
                </Text>
              </GridItem>
              <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                <Text fontSize="x-small" fontWeight="bold">Estado:</Text>
                <Text fontSize="sm">
                  {selectedAddress.estado}
                </Text>
              </GridItem>
              {selectedAddress.complemento && (
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="bold">Complemento:</Text>
                  <Text fontSize="sm">
                    {selectedAddress.complemento}
                  </Text>
                </GridItem>
              )}
            </SimpleGrid>
            <HStack spacing={6} alignSelf="flex-end" justify="space-between">
              <Button 
                colorScheme="blue" 
                variant="link" 
                rightIcon={<FiEdit/>}
                onClick={() => onOpen()}
              >Editar endereço</Button>
              <Text>|</Text>        
              <Button 
                colorScheme="blue" 
                variant="link" 
                rightIcon={<FiRefreshCw/>}
                onClick={() => setSelectedAddress(null)}
              >Selecionar outro</Button>
            </HStack>
          </Stack>
          <Modal title="Editar endereço" isOpen={isOpen} onClose={onClose}>
            <UpdateAddressForm address={selectedAddress} onClose={onClose}/>
          </Modal>
        </>
      )}
                          
    </>    
  )
}
