import { useState, useEffect, ChangeEvent } from 'react'

import { Stack, HStack, Box, Spinner, FormLabel, Text } from "@chakra-ui/react"

import { Input } from '../../../../../components/Input'

import { AddressProps } from "../../../../../types"
import { Select } from '../../../../../components/Select'
import { useAddressesQuery } from '../../../../../hooks/useAddressesQuery'

export type UserAddressProps = {  
  userId: string;
  selectedAddress: AddressProps;
  setSelectedAddress: (selectedAddress: AddressProps) => void;  
}

const UserAddress = ({ setSelectedAddress, userId, selectedAddress }: UserAddressProps) => { 

  const addresses = useAddressesQuery(userId)

  const handleSelectAddress = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    setSelectedAddress(null)
    
    const address = addresses.data?.find(address => address.id === value)

    setSelectedAddress(address)
  } 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    return value
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
    <>
      <Select
        label="Endereço:"
        name="endereco"        
        isLoading={addresses.isLoading}
        onChange={handleSelectAddress}
        value={!selectedAddress && 'defaultValue'}        
      >
        <option value="defaultValue" disabled>Selecione o endereço de entrega...</option>
        { addresses.data?.map(address => {
          return (
            <option key={address.id} value={address.id}>{address.endereco}</option>
          )
        })}
      </Select>
      { !selectedAddress ? null : 
        <Stack spacing={3}>
          <HStack spacing={3}>
            <Input 
              name="cidade"
              label="Cidade:"
              isDisabled
              value={selectedAddress?.cidade}
              onChange={handleChange}
            />
            <Box w="100px">
              <Input 
                name="estado"
                label="Estado:"
                isDisabled
                value={selectedAddress?.estado}
                onChange={handleChange}
              />
            </Box>
          </HStack>
          <HStack spacing={3}>
            <Input 
              name="bairro"
              label="Bairro:"
              isDisabled
              value={selectedAddress?.bairro}
              onChange={handleChange}
            />
            <Input 
              name="cep"
              label="CEP:"
              isDisabled
              value={selectedAddress?.cep}
              onChange={handleChange}
            />
          </HStack>
                    
            <Input 
              name="complemento"
              label="Complemento:"
              isDisabled
              value={selectedAddress?.complemento}
              onChange={handleChange}
            />
          
        </Stack>
      }      
    </>
  )
}

export {
  UserAddress
}