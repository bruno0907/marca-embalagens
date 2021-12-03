import { useRouter } from "next/router"

import { Table } from "../../../components/Table"

import { useOrdersQuery } from "../../../hooks/useOrdersQuery"
import { prefetchOrder } from "../../../services/prefetchOrder"

import { handleFormatDate } from "../../../utils/handleFormatDate"
import { handleFormatPrice } from "../../../utils/handleFormatPrice"

import {
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,    
  Flex,
} from "@chakra-ui/react"

type OrdersListProps = {
  filterValue: number;
}

const OrdersList = ({ filterValue }: OrdersListProps) => {
  const router = useRouter()

  const orders = useOrdersQuery(filterValue)

  const handlePrefetchOrder = async (id: string) => await prefetchOrder(id)

  if(orders.isLoading) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50" w="28">Pedido</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="40">Data do Pedido</Th>
            <Th color="gray.50" w="40">Valor Total</Th>
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

  if(orders.error) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50" w="28">Pedido</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="40">Data do Pedido</Th>
            <Th color="gray.50" w="40">Valor Total</Th>
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

  if(!orders.data?.length) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50" w="28">Pedido</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="40">Data do Pedido</Th>
            <Th color="gray.50" w="40">Valor Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4}>Nenhum pedido encontrado...</Td>
          </Tr>
        </Tbody>
      </Table>
    )
  }

  return (
    <Table>
      <Thead>
        <Tr bgColor="blue.500">
        <Th color="gray.50" w="28" textAlign="end">
            <Flex align="center">
              Pedido
              { orders.isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>            
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50" w="40">Data do pedido</Th>
            <Th color="gray.50" w="40">Valor total</Th>
        </Tr>
      </Thead>
      <Tbody>
        { orders.data?.map(order => {
            return (
              <Tr
                key={order.id}
                fontWeight="medium"
                onClick={() => router.push(`/orders/${order.id}`)}
                onMouseEnter={() => handlePrefetchOrder(order.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{order.numero_pedido}</Td>                        
                <Td>{order.users.nome}</Td>
                <Td>{handleFormatDate(order.created_at)}</Td>
                <Td>{handleFormatPrice(order.total)}</Td>   
              </Tr>
            )
          }
        )}
      </Tbody>
    </Table>
    
  )
}

export { OrdersList }
