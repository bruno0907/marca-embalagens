import { ChangeEvent } from 'react'

import { Stack, HStack, Spinner, Text, Flex } from "@chakra-ui/react"

import { Select } from '../../../Select'
import { useAddressesQuery } from '../../../../hooks/useAddressesQuery'
import { useCreateOrder } from '../../../../contexts/useCreateOrder'
import { AddressItem } from '../../../AddressesDetails/AddressItem'

const AddressDetails = () => { 
  const {
    selectedUser,
    selectedAddress,
    setSelectedAddress
  } = useCreateOrder()  

  const addresses = useAddressesQuery(selectedUser?.id)

  const handleSelectAddress = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(null)
    const { value } = event.target
    
    const address = addresses.data?.find(address => address.id === value)

    setSelectedAddress(address)
  }  

  if(addresses.isLoading) {
    return (      
      <HStack spacing={2} align="center">
        <Text fontWeight="medium">Endereço:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>        
    )
  }

  if(addresses.isError) {    
    return (
      <Text pt="4" fontWeight="medium">
        Ocorreu um erro ao carregar os endereços do cliente...
      </Text>
    )
  }

  return (    
    <Stack spacing={3}>
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold">Endereço:</Text>        
      </Flex>
      {!selectedAddress ? (
        <Select
          name="endereco"        
          isLoading={addresses.isLoading}
          onChange={handleSelectAddress}
          value={!selectedAddress ? 'defaultValue' : selectedAddress.endereco}        
        >
          <option value="defaultValue" disabled>Selecione o endereço de entrega...</option>
          { addresses.data?.map(address => {
            return (
              <option key={address.id} value={address.id}>{address.endereco}</option>
            )
          })}
        </Select>
      ) : (
        <AddressItem address={selectedAddress}/>
      )}       
      {selectedAddress && (
        <Text as="button" textAlign="end" fontWeight="bold" color="blue.500" onClick={() => setSelectedAddress(null)}>Selecionar outro endereço</Text>
      )} 
    </Stack>    
  )
}

export {
  AddressDetails
}