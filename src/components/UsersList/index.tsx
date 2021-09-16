import { useRouter } from "next/router"

import { useUsersQuery } from "../../hooks/useUsersQuery"

import { prefetchUser } from "../../controllers/prefetchUser"

import { 
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,  
  Flex,
  Text,  
} from "@chakra-ui/react"

type UsersListProps = {
  filterValue: string;
}

function UsersList ({ filterValue }: UsersListProps) {
  const router = useRouter()

  const users = useUsersQuery(filterValue)

  const handlePrefetchUser = async (id: string) => await prefetchUser(id)
  
  if(users.isLoading || users.isFetching) {
    return (
      <Table colorScheme="gray" variant="striped" >
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">
              <Flex align="center">
                Nome
                <Spinner size="sm" color="gray.50" ml="4"/>
              </Flex>
            </Th>
            <Th color="gray.50">Telefone</Th>
            <Th color="gray.50">Celular</Th>
            <Th color="gray.50">E-mail</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td />
            <Td />
            <Td />
            <Td />
          </Tr>
        </Tbody>
      </Table>
    )
  }

  if(users.error) {
    return (
      <Flex>
        <Text>Houve um erro ao carregar as informações...</Text>
      </Flex>
    )
  }

  if(users.data?.length <= 0) {
    return (
      <Flex>
        <Text>Nenhum registro encontrado...</Text>
      </Flex>
    )
  }

  return (
    <Table colorScheme="gray" variant="striped" >
      <Thead>
        <Tr bgColor="blue.500">
          <Th color="gray.50" align="center">Nome</Th>
          <Th color="gray.50">Telefone</Th>
          <Th color="gray.50">Celular</Th>
          <Th color="gray.50">E-mail</Th>
        </Tr>
      </Thead>
      <Tbody>
        { users.data.map(user => {
            return (
              <Tr
                key={user.id}
                fontWeight="medium"
                onClick={() => router.push(`/users/${user.id}`)}
                onMouseEnter={() => handlePrefetchUser(user.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
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
