import { Content } from '../Content'

import { 
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

import { AddressProps } from '../../types'
import { AddressField } from './components/addressField'

type UserAddressesProps = {
  addresses: AddressProps[];  
  isFetching: boolean;
}

const UserAddresses = ({ addresses, isFetching }: UserAddressesProps) => {   
  if(isFetching){
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
              addresses.map(address => (
                <AddressField key={address.id} address={address} />
              ))
          )}
        </Stack>
      </Box>
    </Content>
  )
}

export { UserAddresses }
