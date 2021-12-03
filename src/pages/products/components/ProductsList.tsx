import { useRouter } from "next/router"

import { useProductsQuery } from "../../../hooks/useProductsQuery"
import { prefetchProduct } from "../../../services/prefetchProduct"
import { handleFormatPrice } from "../../../utils/handleFormatPrice"

import { Table } from "../../../components/Table"

import {   
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,  
  Flex,   
} from "@chakra-ui/react"

type ProductsListProps = {
  filterValue: string;
}

const ProductsList = ({ filterValue }: ProductsListProps) => {
  const router = useRouter()

  const products = useProductsQuery(filterValue)  

  const handlePrefetchProduct = async (id: string) => prefetchProduct(id)

  if(products.isLoading) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="44">Estoque</Th>
            <Th color="gray.50" w="44">Valor unitário</Th>
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

  if(products.isError) {
    return (      
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="44">Estoque</Th>
            <Th color="gray.50" w="44">Valor unitário</Th>            
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

  if(!products.data?.length) {
    return (      
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="44">Estoque</Th>
            <Th color="gray.50" w="44">Valor unitário</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4}>Nenhum produto encontrado...</Td>
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
              Produto
              { products.isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>
          <Th color="gray.50" w="44">Estoque</Th>
          <Th color="gray.50" w="44">Valor unitário</Th>
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
  )
}

export { ProductsList }
