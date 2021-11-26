import { useRouter } from "next/router"

import { prefetchSupplier } from "../../../../services/prefetchSupplier"
import { useSuppliersQuery } from "../../../../hooks/useSuppliersQuery"

import { Table } from "../../../../components/Table"

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

const SuppliersList = ({ filterValue }: UsersListProps) => {
  const router = useRouter()

  const suppliers = useSuppliersQuery(filterValue)

  const handlePrefetchSupplier = async (id: string) => await prefetchSupplier(id)

  if(suppliers.isLoading) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Nome</Th>
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="44">Telefone</Th>
            <Th color="gray.50" w="44">Celular</Th>
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

  if(suppliers.isError) {
    return (      
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Nome</Th>
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="44">Telefone</Th>
            <Th color="gray.50" w="44">Celular</Th>
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

  if(!suppliers.data?.length) {
    return (      
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Nome</Th>
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="44">Telefone</Th>
            <Th color="gray.50" w="44">Celular</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4}>Nenhum fornecedor encontrado...</Td>
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
              { suppliers.isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>
          <Th color="gray.50">Produto</Th>
          <Th color="gray.50" w="44">Telefone</Th>
          <Th color="gray.50" w="44">Celular</Th>
        </Tr>
      </Thead>
      <Tbody>
        { suppliers.data?.map(supplier => {
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
