import {
  Flex,
  Box,
  Text,  
  Center,
  Spinner,
} from '@chakra-ui/react'
import { useAddressQuery } from '../../../../../hooks/useAddressQuery'

import { useUserQuery } from '../../../../../hooks/useUserQuery'

type OrderUserProps = {
  userId: string;
  deliveryAddress: string;
}

const OrderUser = ({ userId, deliveryAddress }: OrderUserProps) => {
  const user = useUserQuery(userId)
  const address = useAddressQuery(deliveryAddress)

  if(user.isLoading || address.isLoading) {
    return (
      <Center>
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(user.isError || address.isError) {
    return (
      <Text>Ocorreu um erro ao carregar as informações do cliente...</Text>
    )
  }

  if(!user.data || !address.data) {
    return null
  }

  return (
    <>
      <Flex flexDir="column">
        <Flex justify="space-between">
          <Box>
            <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
            <Text fontSize="sm">{user.data?.nome}</Text>            
          </Box>
          { user.data?.razao_social &&
              <Box>
                <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
                <Text fontSize="sm">{user.data?.razao_social}</Text>
              </Box>
          }
          { user.data?.cpf_cnpj &&
              <Box>
                <Text fontSize="x-small" fontWeight="semibold">
                  {user.data?.razao_social ? 'CNPJ' : 'CPF'}
                </Text>
                <Text fontSize="sm">
                  {user.data?.cpf_cnpj}
                </Text>
              </Box>
          }
        </Flex>
        <Flex justify="space-between">
          <Box>
            <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
            <Text fontSize="sm">
              {user.data?.telefone}
            </Text>            
          </Box>
          { user.data?.celular && 
            <Box>
              <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
              <Text fontSize="sm">
                {user.data?.celular}
              </Text>            
            </Box>
          }
          { user.data?.contato && 
            <Box>
              <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
              <Text fontSize="sm">
                {user.data?.contato}
              </Text>            
            </Box>
          }
        </Flex>
      </Flex>

      <Flex justify="space-between">
        <Box>
          <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
          <Text fontSize="sm">
            {address.data?.endereco}
          </Text>
        </Box>
        <Box>
          <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
          <Text fontSize="sm">
            {address.data?.bairro}
          </Text>
        </Box>
        <Box>
          <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
          <Text fontSize="sm">
            {address.data?.cep}
          </Text>
        </Box>
        <Box>
          <Text fontSize="x-small" fontWeight="bold">Cidade/UF:</Text>
          <Text fontSize="sm">
            {address.data?.cidade}/{address.data?.estado}
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export {
  OrderUser
}