import { useRouter } from "next/router"

import { useUsers } from "../../hooks/useUsers"
import { getUser } from "../../hooks/useUser"
import { queryClient } from "../../services/queryClient"

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

const UsersList = ({ filterValue }: UsersListProps) => {
  const router = useRouter()  

  const { data: users, error, isLoading, isFetching } = useUsers(filterValue)

  const handlePrefetchUser = async (id: string) => {
    await queryClient.prefetchQuery(['user', id], async () => {
      return await getUser(id)
    }, {
      staleTime: 1000 * 60 * 10 //10minutes
    })
  }

  if(isLoading || isFetching) {
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

  if(error) {
    return (
      <Flex>
        <Text>Houve um erro ao carregar as informações...</Text>
      </Flex>
    )
  }

  if(users.length <= 0) {
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
        { users.map(user => {
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
