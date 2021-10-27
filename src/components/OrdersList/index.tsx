import { useRouter } from "next/router"

import { useOrdersQuery } from "../../hooks/useOrdersQuery"
import { prefetchOrder } from "../../services/prefetchOrder"

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

type OrdersListProps = {
  filterValue: string;
}

const OrdersList = ({ filterValue }: OrdersListProps) => {
  const router = useRouter()

  const orders = useOrdersQuery(filterValue)

  const handlePrefetchOrder = async (id: string) => await prefetchOrder(id)

  if(orders.isLoading) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Cliente</Th>
              <Th color="gray.50">Data</Th>
              <Th color="gray.50">Valor</Th>
            </Tr>
          </Thead>        
        </Table>
        <Center p="8">
          <Spinner size="md" color="blue.500"/>
        </Center>
      </>
    )
  }

  if(orders.error) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Cliente</Th>
              <Th color="gray.50">Data</Th>
              <Th color="gray.50">Valor</Th>
            </Tr>
          </Thead>
        </Table>
        <Text p="2" bgColor="gray.100">Ocorreu um erro ao carregar as informações...</Text>
      </>
    )
  }

  if(orders.data?.length <= 0) {
    return (
      <>
        <Table colorScheme="gray" variant="striped" >
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Cliente</Th>
              <Th color="gray.50">Data</Th>
              <Th color="gray.50">Valor</Th>
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
              Pedido
              { orders.isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>            
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50">Data</Th>
            <Th color="gray.50">Valor</Th>
        </Tr>
      </Thead>
      <Tbody>
        { orders.data.map(order => {
            return (
              <Tr
                key={order.id}
                fontWeight="medium"
                onClick={() => router.push(`/orders/${order.id}`)}
                onMouseEnter={() => handlePrefetchOrder(order.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{order.numero_pedido}</Td>                        
                <Td>{order.cliente}</Td>
                <Td>{order.created_at}</Td>
                <Td>{order.total.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency'})}</Td>   
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>
  )
}

export { OrdersList }
