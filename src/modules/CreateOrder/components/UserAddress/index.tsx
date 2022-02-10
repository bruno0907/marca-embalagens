import { ChangeEvent } from 'react'
import dynamic from 'next/dynamic'

import {    
  HStack, 
  Spinner, 
  Text,
  SimpleGrid,  
  Stack, 
  useDisclosure, 
  Icon
} from "@chakra-ui/react"

import { FiAlertCircle, FiEdit, FiRefreshCw } from "react-icons/fi"

import { 
  Select,
  ButtonLink,
  GridItem, 
} from '../../../../components'

import { useAddressesQuery } from '../../../../hooks'

import { useCreateOrder } from '../../../../contexts/useCreateOrder'

import { ModalProps } from '../../../../components/Modal'

const Modal = dynamic<ModalProps>(
  () => import('../../../../components/Modal')
  .then(({ Modal }) => Modal)
)
  
import { UpdateAddressModuleProps } from '../../../UpdateAddress'

const UpdateAddressModule = dynamic<UpdateAddressModuleProps>(
  () => import('../../../UpdateAddress')
  .then(({ UpdateAddressModule }) => UpdateAddressModule)
)

type Props = {
  isSubmitting?: boolean;
}

export const UserAddress = ({ isSubmitting = false }: Props) => { 
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    selectedUser,
    selectedAddress,
    setSelectedAddress
  } = useCreateOrder()  

  const { data: addresses, isLoading, isError } = useAddressesQuery(selectedUser?.id)

  const handleSelectAddress = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(null)
    const { value } = event.target    
    const address = addresses?.find(address => address.id === value)
    setSelectedAddress(address)
  }  

  if(isLoading) {
    return ( 
      <HStack spacing={2} align="center">
        <Text fontWeight="medium" fontSize="md">Endereço:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>
    )
  }

  if(isError) {
    return (
      <HStack spacing={3} aling="center">
        <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
        <Text fontWeight="medium">Erro ao carregar a lista de endereços do usuário...</Text>
      </HStack>
    )
  }

  return (
    <>
      {!selectedAddress && (
        <Select
          name="endereco"
          label="Endereços:"        
          isLoading={isLoading}
          onChange={handleSelectAddress}
          value={!selectedAddress ? 'defaultValue' : selectedAddress.endereco}        
        >
          <option value="defaultValue" disabled>Selecione o endereço de entrega...</option>
          { addresses?.map(address => {
            return (
              <option key={address.id} value={address.id}>{address.endereco}</option>
            )
          })}
        </Select>
      )}
      {selectedAddress && (
        <>
          <Stack spacing={6}>
            <SimpleGrid columns={[1, 2, 3]} gap={3}>
              <GridItem
                label="Endereço:"
                value={selectedAddress.endereco}
              />                
              <GridItem
                label="Bairro:"
                value={selectedAddress.bairro}
              />                
              {selectedAddress.cep && (
                <GridItem
                  label="CEP:"
                  value={selectedAddress.cep}
                />                  
              )}
              <GridItem
                label="Cidade:"
                value={selectedAddress.cidade}
              />                
              <GridItem
                label="Estado:"
                value={selectedAddress.estado}
              />                
              {selectedAddress.complemento && (
                <GridItem
                  label="Complemento:"
                  value={selectedAddress.complemento}
                />
              )}
            </SimpleGrid>
            {!isSubmitting && (
              <HStack spacing={[3, 3, 6]} alignSelf="flex-end" justify="space-between">
                <ButtonLink                 
                  rightIcon={<FiEdit/>}
                  onClick={() => onOpen()}
                >Editar endereço</ButtonLink>
                <Text>|</Text>        
                <ButtonLink 
                  rightIcon={<FiRefreshCw/>}
                  onClick={() => setSelectedAddress(null)}
                >Selecionar outro</ButtonLink>
              </HStack>
            )}
          </Stack>
          <Modal title="Editar endereço" isOpen={isOpen} onClose={onClose}>
            <UpdateAddressModule address={selectedAddress} onClose={onClose}/>
          </Modal>
        </>
      )}
                          
    </>    
  )
}
