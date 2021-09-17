import { useRouter } from "next/router"

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

import { ProductProps } from "../../types"

type ProductsListProps = {
  filterValue: string;
}

const ProductsList = ({ filterValue }: ProductsListProps) => {
  const router = useRouter()

  const products = { // TODO: useProductsQuery
    isLoading: false,
    isFetching: false,
    error: false,
    data: [
      {
        id: '0',
        nome: 'Produto de teste 1',
        preco_unitario: 10.50,
        estoque: 50
      },
      {
        id: '1',
        nome: 'Produto de teste 2',
        preco_unitario: 15.00,
        estoque: 20
      },
      {
        id: '2',
        nome: 'Produto de teste 3',
        preco_unitario: 5.70,
        estoque: 100
      },
    ]
  }

  const handlePrefetchProduct = async (id: string) => console.log(id) // TODO prefetching

  if(products.isLoading || products.isFetching) {
    return (
      <Table colorScheme="gray" variant="striped" >
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">
              <Flex align="center">
                Produto
                <Spinner size="sm" color="gray.50" ml="4"/>
              </Flex>
            </Th>            
            <Th color="gray.50">Quantidade</Th>
            <Th color="gray.50">Valor</Th>
          </Tr>
        </Thead>        
      </Table>
    )
  }

  if(products.error) {
    return (
      <>
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
      </>
    )
  }

  if(products.data?.length <= 0) {
    return (
      <>
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
      </>
    )
  }

  return (
    <Table colorScheme="gray" variant="striped" >
      <Thead>
        <Tr bgColor="blue.500">
            <Th color="gray.50">Produto</Th>
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
                onClick={() => router.push(`/proucts/${product.id}`)}
                onMouseEnter={() => handlePrefetchProduct(product.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{product.nome}</Td>                                        
                <Td>{product.estoque}</Td>   
                <Td>{product.preco_unitario.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</Td>
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>
  )
}

export { ProductsList }
