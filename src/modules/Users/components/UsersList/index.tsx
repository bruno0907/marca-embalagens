import { useRouter } from "next/router"

import { 
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,  
  Flex,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react"

import { FiAlertCircle } from "react-icons/fi"

import { Table } from "../../../../components"

import { useUsersQuery } from "../../../../hooks"
import { prefetchUser } from "../../../../services"

type Props = {
  filterValue: string;
}

export const UsersList = ({ filterValue }: Props) => {
  const router = useRouter()

  const { data: users, isLoading, isError, isFetching } = useUsersQuery(filterValue)  

  const handlePrefetchUser = async (id: string) => await prefetchUser(id)
  
  if(isLoading) {
    return (      
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">
              <HStack spacing={3} align="center">
                <Text>Cliente</Text>
                <Spinner size="sm" color="gray.50" ml="4"/>
              </HStack>
            </Th>
            <Th color="gray.50" w="40">Telefone</Th>
            <Th color="gray.50" w="40">Celular</Th>
            <Th color="gray.50" w="80">E-mail</Th>
          </Tr>
        </Thead>        
      </Table>
    )
  }

  if(isError) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="40">Telefone</Th>
            <Th color="gray.50" w="40">Celular</Th>
            <Th color="gray.50" w="80">E-mail</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4}>
              <HStack spacing={3} aling="center">
                <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
                <Text fontWeight="medium">Ocorreu um erro ao carregar as informações...</Text>
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>      
    )
  }

  if(users?.length <= 0) {
    return (
      <Table colorScheme="gray" variant="striped" >
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Nome</Th>
            <Th color="gray.50" w="40">Telefone</Th>
            <Th color="gray.50" w="40">Celular</Th>
            <Th color="gray.50" w="80">E-mail</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4}>Nenhum cliente encontrado...</Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  return (    
    <Table>
      <Thead>
        <Tr bgColor="blue.500">
          <Th color="gray.50" minW="225px">
            <Flex align="center">
              Cliente
              {isFetching && <Spinner size="sm" color="gray.50" ml="4"/>}
            </Flex>
          </Th>
          <Th color="gray.50" minW="145px">Telefone</Th>
          <Th color="gray.50" minW="145px">Celular</Th>
          <Th color="gray.50" minW="165px">E-mail</Th>
        </Tr>
      </Thead>
      <Tbody>
        { users?.map(user => {
            return (
              <Tr
                key={user.id}
                fontWeight="medium"                  
                onClick={() => router.push(`/users/${user.id}`)}
                onMouseEnter={() => handlePrefetchUser(user.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500' }}
              >
                <Td>{user.nome}</Td>                        
                <Td>{user.telefone}</Td>
                <Td>{user.celular}</Td>
                <Td>{user.email}</Td>   
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>    
  )
}
