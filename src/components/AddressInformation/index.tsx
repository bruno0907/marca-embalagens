import { Content } from '../Layout/Content'
import { AddressField } from './components/AddressField'

import { useAddressesQuery } from '../../hooks/useAddressesQuery'

import {
  Text, 
  Stack,  
  Button,
  Box,
  Flex,  
  Center,
  Spinner,
  Heading,
  Skeleton,
  Spacer,  
} from "@chakra-ui/react"

import { FiEdit } from 'react-icons/fi'

type Props = {
  userId: string | string[];
}

const AddressesInformation = ({ userId }: Props) => {   
  const addresses = useAddressesQuery(userId)

  if(addresses.isLoading || addresses.isFetching){
    return (
      <Content w="100%">
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Dados Principais</Heading>   
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>
        <Stack spacing={3}>
          <Skeleton h="14" borderRadius="8"/>
        </Stack>
      </Content>    
    )
  } 

  if(addresses.isError) {
    return (
      <Content w="100%">
        <Stack spacing={3}>
          <Heading fontSize="2xl">Endereços</Heading>
          <Text>Ocorreu um erro ao carregar os endereços. Volte e tente novamente...</Text>
        </Stack>
      </Content>    
    )
  }

  if(!addresses.data?.data) return null

  return (
    <Content w="100%">
      <Flex align='center' mb="8">
        <Heading fontSize="2xl">Endereços</Heading>
        <Spacer />
        <Button colorScheme="blue" leftIcon={<FiEdit />}>Novo endereço</Button>
      </Flex>
      <Box mb="8">
        <Stack spacing={3}>
          {!addresses ? (
              <Center my="8">
                <Spinner size="md" color="blue.500" />
              </Center>
            ) : (
              addresses.data.data.map(address => (
                <AddressField key={address.id} address={address} />
              ))
          )}
        </Stack>
      </Box>
    </Content>
  )
}

export { AddressesInformation }
