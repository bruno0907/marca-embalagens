import { Content } from '../../../../components/Content'

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

import { AddressProps } from '../../../../types'

type UserAddressesProps = {
  addresses: AddressProps[];
}

const UserAddresses = ({ addresses }: UserAddressesProps) => {
  
  return (
    <Content>
      <Flex align='center' justify="space-between">
        <Heading fontSize="2xl">Endereços</Heading>
        <Button colorScheme="blue" leftIcon={<FiEdit />}>Novo endereço</Button>
      </Flex>
      {!addresses ? (
          <Center my="8">
            <Spinner size="md" color="blue.500" />
          </Center>
        ) : (
          addresses.map(address => {
            return (              
              <Box key={address.id} my="8">
                <Stack mb="8">
                  <Box p="4" bgColor="gray.100" borderRadius="16" border="1" borderColor="gray.600">
                  <Flex align="center">
                    <Icon as={FiHome} fontSize="24" color="gray.500"/>
                    <Box ml="4">
                      <Text fontSize="sm" color="gray.700" fontWeight="medium">{address.endereco} - {address.bairro}</Text>
                      <Text fontSize="sm" color="gray.700" fontWeight="medium">{address.cidade}/{address.estado} - {address.cep}</Text>                      
                      <Text fontSize="sm" color="gray.700" fontWeight="medium">{address.complemento}</Text>
                    </Box>
                    <Button ml="auto" mb="auto" variant="link" _hover={{ svg: { color: "blue.600" } }}>
                      <Icon as={FiEdit} fontSize="24" color="blue.500"/>
                    </Button>
                  </Flex>
                  </Box>
                </Stack>                
                <Button colorScheme="blue" variant="link" mt="4">Outros endereços</Button>                
              </Box>
            )
          })
        )}
    </Content>
  )
}


export { UserAddresses }
