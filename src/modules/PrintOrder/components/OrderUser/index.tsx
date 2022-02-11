import {  
  GridItem,
  Text,  
  Center,
  Spinner,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'

import { FiInfo } from 'react-icons/fi'

import { useAddressQuery, useUserQuery } from '../../../../hooks'

type Props = {
  userId: string;
  addressId: string;
}

export const OrderUser = ({ userId, addressId }: Props) => {
  const user = useUserQuery(userId)
  const address = useAddressQuery(addressId)

  if(user.isLoading || address.isLoading) {
    return (
      <Center p="16">
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(user.isError || address.isError || !user.data || !address.data) {
    return (
      <Center p="16" fontWeight="bold">
        <FiInfo fontSize="24"/>
        <Text ml="3">Ocorreu um erro ao carregar as informações do cliente...</Text>
      </Center>
    )
  }

  return (
    <Stack spacing="0.5" w="100%">
      <SimpleGrid columns={3} gap="0.5">        
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">
            {`Nome${user.data.razao_social && ' Fantasia'}:`}
          </Text>
          <Text fontSize="small">{user.data.nome ?? ''}</Text>            
        </GridItem>      
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="semibold">Razão Social:</Text>
          <Text fontSize="small">{user.data.razao_social ?? ''}</Text>
        </GridItem>      
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="semibold">
            {user.data.razao_social ? 'CNPJ:' : 'CPF:'}
          </Text><Text fontSize="small">{user.data.cpf_cnpj ?? ''}
          </Text>
        </GridItem>      
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
          <Text fontSize="small">{user.data.telefone ?? ''}</Text>            
        </GridItem>      
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
          <Text fontSize="small">{user.data.celular ?? ''}</Text>            
        </GridItem>      
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
          <Text fontSize="small">{user.data.contato ?? ''}</Text>            
        </GridItem>        
      </SimpleGrid>
      <SimpleGrid columns={3} gap="0.5">
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
          <Text fontSize="small">{address.data.endereco ?? ''}</Text>
        </GridItem>
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
          <Text fontSize="small">{address.data.bairro ?? ''}</Text>
        </GridItem>        
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
          <Text fontSize="small">{address.data.cep ?? ''}</Text>
        </GridItem>        
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Cidade:</Text>
          <Text fontSize="small">{address.data.cidade ?? ''}</Text>
        </GridItem>
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Estado:</Text>
          <Text fontSize="small">{address.data.estado ?? ''}</Text>
        </GridItem>        
        <GridItem px="2" py="1" borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Complemento:</Text>
          <Text fontSize="small">{address.data.complemento ?? ''}</Text>
        </GridItem>        
      </SimpleGrid>
    </Stack>
  )
}
