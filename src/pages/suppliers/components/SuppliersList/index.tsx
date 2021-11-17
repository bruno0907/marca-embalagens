import { useRouter } from "next/router"

import { prefetchSupplier } from "../../../../services/prefetchSupplier"
import { useSuppliersQuery } from "../../../../hooks/useSuppliersQuery"

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

const SuppliersList = ({ filterValue }: UsersListProps) => {
  const router = useRouter()

  const suppliers = useSuppliersQuery(filterValue)

  const handlePrefetchSupplier = async (id: string) => await prefetchSupplier(id)

  if(suppliers.isLoading) {
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

  if(suppliers.error) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50" align="center">Nome</Th>
              <Th color="gray.50">Produto</Th>
              <Th color="gray.50">Telefone</Th>
              <Th color="gray.50">Celular</Th>
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Ocorreu um erro ao carregar as informações...</Text>
      </>
    )
  }

  if(suppliers.data?.length <= 0) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50" align="center">Nome</Th>
              <Th color="gray.50">Produto</Th>
              <Th color="gray.50">Telefone</Th>
              <Th color="gray.50">Celular</Th>
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
              { suppliers.isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>
          <Th color="gray.50">Produto</Th>
          <Th color="gray.50">Telefone</Th>
          <Th color="gray.50">Celular</Th>
        </Tr>
      </Thead>
      <Tbody>
        { suppliers.data.map(supplier => {
            return (
              <Tr
                key={supplier.id}
                fontWeight="medium"
                onClick={() => router.push(`/suppliers/${supplier.id}`)}
                onMouseEnter={() => handlePrefetchSupplier(supplier.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{supplier.nome}</Td>                        
                <Td>{supplier.produto}</Td>
                <Td>{supplier.telefone}</Td>
                <Td>{supplier.celular}</Td>   
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>
  )
}

export { SuppliersList }
