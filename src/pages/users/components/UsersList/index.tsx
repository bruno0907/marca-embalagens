import { useRouter } from "next/router"

import { useUsersQuery } from "../../../../hooks/useUsersQuery"

import { prefetchUser } from "../../../../services/prefetchUser"

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
  Center
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
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50"></Th>
              <Th color="gray.50">Telefone</Th>
              <Th color="gray.50">Celular</Th>
              <Th color="gray.50">E-mail</Th>
            </Tr>
          </Thead>        
        </Table>
        <Center p="8">
          <Spinner size="md" color="blue.500"/>
        </Center>
      </>
    )
  }

  if(users.error) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50" align="center">Nome</Th>
              <Th color="gray.50">Telefone</Th>
              <Th color="gray.50">Celular</Th>
              <Th color="gray.50">E-mail</Th>
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Ocorreu um erro ao carregar as informações...</Text>
      </>
    )
  }

  if(users.data?.length <= 0) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50" align="center">Nome</Th>
              <Th color="gray.50">Telefone</Th>
              <Th color="gray.50">Celular</Th>
              <Th color="gray.50">E-mail</Th>
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Nenhum registro encontrado...</Text>
      </>
    )
  }

  return (
    <Table colorScheme="gray" variant="striped" >
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
