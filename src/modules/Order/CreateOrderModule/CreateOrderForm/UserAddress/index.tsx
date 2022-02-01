import { ChangeEvent } from 'react'

import { Select } from '../../../../../components/Select'
import { AddressItem } from '../../../../../components/AddressesDetails/AddressItem'
import { Content } from '../../../../../components/Content'
import { Section } from '../../../../../components/Section'
import { SectionHeader } from '../../../../../components/SectionHeader'
import { SectionTitle } from '../../../../../components/SectionTitle'

import { useAddressesQuery } from '../../../../../hooks/useAddressesQuery'
import { useCreateOrder } from '../../../../../contexts/useCreateOrder'

import { Button, HStack, Spinner, Text } from "@chakra-ui/react"

export const UserAddress = () => { 
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
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Endereço"/>
        </SectionHeader>
        <Content>
          <HStack spacing={2} align="center">
            <Text fontWeight="medium">Endereço:</Text> 
            <Spinner ml="2" size="sm" color="blue.500"/>
          </HStack>
        </Content>
      </Section>
    )
  }

  if(isError) {    
    return (
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Endereço"/>
        </SectionHeader>
        <Content>
          <Text pt="4" fontWeight="medium">
            Ocorreu um erro ao carregar os endereços do cliente...
          </Text>                    
        </Content>
      </Section>
    )
  }

  return (
    <Section flex="1">
      <SectionHeader>
        <SectionTitle title="Endereço"/>
        <Button colorScheme="blue" variant="link" onClick={() => setSelectedAddress(null)}>Selecionar outro cliente</Button>
      </SectionHeader>
      <Content>
        {!selectedAddress ? (
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
        ) : (
          <AddressItem address={selectedAddress}/>
        )}                    
      </Content>
    </Section>    
  )
}
