import { useRouter } from "next/router"

import { useUsersQuery } from "../../../hooks/useUsersQuery"

import { prefetchUser } from "../../../services/prefetchUser"

import { Table } from "../../Table"

import { 
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,  
  Flex,
} from "@chakra-ui/react"

type UsersListProps = {
  filterValue: string;
}

function UsersList ({ filterValue }: UsersListProps) {
  const router = useRouter()

  const users = useUsersQuery(filterValue)  

  const handlePrefetchUser = async (id: string) => await prefetchUser(id)
  
  if(users.isLoading) {
    return (      
      <Table>
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
            <Td colSpan={4} textAlign="center">
              <Spinner size="md" color="blue.500"/>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  if(users.isError) {
    return (
      <Table>
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
            <Td colSpan={4}>Ocorreu um erro ao carregar as informações...</Td>
          </Tr>
        </Tbody>
      </Table>      
    )
  }

  if(users.data.length <= 0) {
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
          <Th color="gray.50">
            <Flex align="center">
              Nome
              { users.isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>
          <Th color="gray.50" w="40">Telefone</Th>
          <Th color="gray.50" w="40">Celular</Th>
          <Th color="gray.50" w="80">E-mail</Th>
        </Tr>
      </Thead>
      <Tbody>
        { users.data?.map(user => {
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

export { UsersList }
