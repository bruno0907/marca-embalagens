import { useRouter } from "next/router"

import { 
  Box,
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

import { useProductsQuery } from "../../../../hooks/useProductsQuery"
import { prefetchProduct } from "../../../../services/prefetchProduct"
import { handleFormatPrice } from "../../../../utils/handleFormatPrice"

type ProductsListProps = {
  filterValue: string;
}

const ProductsList = ({ filterValue }: ProductsListProps) => {
  const router = useRouter()

  const products = useProductsQuery(filterValue)  

  const handlePrefetchProduct = async (id: string) => prefetchProduct(id)

  if(products.isLoading) {
    return (
      <Box borderRadius="md" overflow="hidden">
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
      </Box>
    )
  }

  if(products.isError) {
    return (
      <Box borderRadius="md" overflow="hidden">
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Produto</Th>
              <Th color="gray.50">Quantidade</Th>
              <Th color="gray.50">Valor</Th>              
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Ocorreu um erro ao carregar as informações...</Text>
      </Box>
    )
  }

  if(products.data.length <= 0) {
    return (
      <Box borderRadius="md" overflow="hidden">
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
            <Th color="gray.50">Produto</Th>
              <Th color="gray.50">Quantidade</Th>
              <Th color="gray.50">Valor</Th> 
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Nenhum produto encontrado...</Text>
      </Box>
    )
  }

  return (
    <Box borderRadius="md" overflow="hidden">
      <Table colorScheme="gray" variant="striped" >
        <Thead>
          <Tr bgColor="blue.500">
              <Th color="gray.50">
              <Flex align="center">
                Produto
                { products.isFetching && 
                  <Spinner size="sm" color="gray.50" ml="4"/>
                }
              </Flex>
              </Th>
              <Th color="gray.50">Quantidade</Th>
              <Th color="gray.50">Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          { products.data.map(product => {
              return (
                <Tr
                  key={product.id}
                  fontWeight="medium"
                  onClick={() => router.push(`/products/${product.id}`)}
                  onMouseEnter={() => handlePrefetchProduct(product.id)}
                  _hover={{ cursor: 'pointer', color: 'blue.500'}}
                >
                  <Td>{product.nome}</Td>                                        
                  <Td></Td>   
                  <Td>{handleFormatPrice(product.preco_unitario)}</Td>
                </Tr>
              )
            }
          )}
        </Tbody>
      </Table>
    </Box>
  )
}

export { ProductsList }
