import { useRouter } from "next/router"

import { prefetchUser } from "../../controllers/prefetchUser"
import { useSuppliers } from "../../hooks/useSuppliers"

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

const SuppliersList = ({ filterValue }: UsersListProps) => {
  const router = useRouter()  

  const { data, error, isLoading, isFetching } = useSuppliers(filterValue)

  console.log(data)

  const handlePrefetchUser = async (id: string) => await prefetchUser(id)  

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

  if(data.length <= 0) {
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
        { data.map(supplier => {
            return (
              <Tr
                key={supplier.id}
                fontWeight="medium"
                onClick={() => router.push(`/suppliers/${supplier.id}`)}
                onMouseEnter={() => handlePrefetchUser(supplier.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{supplier.nome}</Td>                        
                <Td>{supplier.telefone}</Td>
                <Td>{supplier.celular}</Td>
                <Td>{supplier.email}</Td>   
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>
  )
}

export { SuppliersList }
