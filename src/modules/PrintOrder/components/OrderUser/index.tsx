import {  
  Box,
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
      <Center p={16}>
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(user.isError || address.isError || !user.data || !address.data) {
    return (
      <Center p={16} fontWeight="bold">
        <FiInfo fontSize={24}/>
        <Text ml={3}>Ocorreu um erro ao carregar as informações do cliente...</Text>
      </Center>
    )
  }

  return (
    <Stack spacing={2} w="100%">
      <SimpleGrid columns={3} gap={3}>
        {user.data.nome && (
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
            <Text fontSize="sm">{user.data.nome}</Text>            
          </Box>
        )}
        {user.data.razao_social &&
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
            <Text fontSize="sm">{user.data.razao_social}</Text>
          </Box>
        }
        {user.data.cpf_cnpj &&
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="semibold">
              {user.data.razao_social ? 'CNPJ' : 'CPF'}
            </Text>
            <Text fontSize="sm">
              {user.data.cpf_cnpj}
            </Text>
          </Box>
        }
        {user.data.telefone && (
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
            <Text fontSize="sm">
              {user.data.telefone}
            </Text>            
          </Box>
        )}
        { user.data.celular && 
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
            <Text fontSize="sm">
              {user.data.celular}
            </Text>            
          </Box>
        }
        { user.data.contato && 
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
            <Text fontSize="sm">
              {user.data.contato}
            </Text>            
          </Box>
        }        
      </SimpleGrid>

      <SimpleGrid columns={3} gap={3}>
        <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
          <Text fontSize="sm">
            {address.data.endereco}
          </Text>
        </Box>
        <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
          <Text fontSize="sm">
            {address.data.bairro}
          </Text>
        </Box>
        {address.data.cep && (
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
            <Text fontSize="sm">
              {address.data.cep}
            </Text>
          </Box>
        )}
        <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Cidade:</Text>
          <Text fontSize="sm">
            {address.data.cidade}
          </Text>
        </Box>
        <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="x-small" fontWeight="bold">Estado:</Text>
          <Text fontSize="sm">
            {address.data.estado}
          </Text>
        </Box>
        {address.data.complemento && (
          <Box px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
            <Text fontSize="x-small" fontWeight="bold">Complemento:</Text>
            <Text fontSize="sm">
              {address.data.complemento}
            </Text>
          </Box>
        )}
      </SimpleGrid>
    </Stack>
  )
}
