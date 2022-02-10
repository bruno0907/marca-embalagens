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

import { useProductsQuery } from "../../../../hooks"

import { prefetchProduct } from "../../../../services"

import { handleFormatPrice } from "../../../../utils"

type Props = {
  filterValue: string;
}

export const ProductsList = ({ filterValue }: Props) => {
  const router = useRouter()

  const { data: products, isLoading, isError, isFetching } = useProductsQuery(filterValue)  

  const handlePrefetchProduct = async (id: string) => prefetchProduct(id)

  if(isLoading) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">
              <HStack spacing={3} align="center">
                <Text>Produto</Text>
                <Spinner size="sm" color="gray.50" ml="4"/>
              </HStack>
            </Th>
            <Th color="gray.50">Estoque</Th>
            <Th color="gray.50">Valor unitário</Th>
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
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="44">Estoque</Th>
            <Th color="gray.50" w="44">Valor unitário</Th>            
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={3}>
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

  if(!products?.length) {
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
          <Th color="gray.50" minW="255px">
            <Flex align="center">
              Produto
              { isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>
          <Th color="gray.50" w="110px">Estoque</Th>
          <Th color="gray.50" w="200px" minW="155px">Valor unitário</Th>
        </Tr>
      </Thead>
      <Tbody>
        { products?.map(product => {
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
