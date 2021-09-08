import { Content } from '../Content'

import { 
  Stack,
  Text,
  Button,
  Box,
  Flex,  
  Center,
  Spinner,
  Heading,
  Icon
} from "@chakra-ui/react"

import { FiEdit, FiHome } from 'react-icons/fi'

import { AddressProps } from '../../types'
import { AddressField } from './components/addressField'

type UserAddressesProps = {
  addresses: AddressProps[];
}

const UserAddresses = ({ addresses }: UserAddressesProps) => {
  
  return (
    <Content w="100%">
      <Flex align='center' justify="space-between">
        <Heading fontSize="2xl">Endereços</Heading>
        <Button colorScheme="blue" leftIcon={<FiEdit />}>Novo endereço</Button>
      </Flex>
      <Box my="8">
        <Stack spacing={3} mb="8">
          {!addresses ? (
              <Center my="8">
                <Spinner size="md" color="blue.500" />
              </Center>
            ) : (
              addresses.map(address => {
                return ( 
                  <>  
                    <AddressField key={address.id} address={address} />
                    <AddressField key={address.id} address={address} />
                    <AddressField key={address.id} address={address} />
                  </>
              )})
          )}
        </Stack>
        {addresses && <Button colorScheme="blue" variant="link">Outros endereços</Button>}
      </Box>
    </Content>
  )
}

export { UserAddresses }
