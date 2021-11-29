import { useRouter } from "next/router"

import { Content } from "../../../../../components/Layout/Content"
import { Table } from "../../../../../components/Table"

import { useUserOrdersQuery } from "../../../../../hooks/useUserOrdersQuery"

import { prefetchOrder } from '../../../../../services/prefetchOrder'

import { handleFormatDate } from "../../../../../utils/handleFormatDate"
import { handleFormatPrice } from "../../../../../utils/handleFormatPrice"

import {   
  Button, 
  Flex, 
  Heading,
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr,  
  Badge,  
  Spinner,  
} from "@chakra-ui/react"

type UserOrdersProps = {
  userId: string | string[];  
}

const UserOrders = ({ userId }: UserOrdersProps) => { 
  const router = useRouter()

  const orders = useUserOrdersQuery(String(userId), 3)

  const handlePrefetchOrder = async (id: string) => await prefetchOrder(id) 

  if(orders.isLoading) {
    return (
      <Content>
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Últimos pedidos</Heading>          
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>        
        <Table>
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Data de Emissão</Th>
              <Th color="gray.50">Data de Entrega</Th>
              <Th color="gray.50">Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={3}>
                <Spinner size="md" color="blue.500" />
              </Td>
            </Tr>
          </Tbody>        
        </Table>
      </Content>
    )
  }

  if(orders.isError) {
    return (
      <Content>        
        <Heading fontSize="2xl" mb="8">Últimos pedidos</Heading>        
        <Table>
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Data de Emissão</Th>
              <Th color="gray.50">Data de Entrega</Th>
              <Th color="gray.50">Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={3}>Ocorreu um erro ao carregar as informações...</Td>
            </Tr>
          </Tbody>
        </Table>
      </Content>
    )
  }

  if(!orders.data?.length) {
    return (
      <Content>        
        <Heading fontSize="2xl" mb="8">Pedidos</Heading>
        <Table>
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">Pedido</Th>
              <Th color="gray.50">Data de Emissão</Th>
              <Th color="gray.50">Data de Entrega</Th>
              <Th color="gray.50">Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={3}>Nenhum pedido encontrado...</Td>
            </Tr>
          </Tbody>
        </Table>
        
      </Content>
    )
  } 

  return (
    <Content>
      <Flex align="center" justify="space-between" mb="8">
        <Heading fontSize="2xl">Últimos pedidos</Heading>
        <Button variant="link" colorScheme="blue" p="2" onClick={() => router.push(`/users/${userId}/orders`)}>Ver todos os pedidos do cliente</Button>
      </Flex>      
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Pedido</Th>
            <Th color="gray.50">Data de Emissão</Th>
            <Th color="gray.50">Data de Entrega</Th>
            <Th color="gray.50">Valor Total</Th>
            {/* <Th color="gray.50">Situação</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {orders.data?.map(order => {
            return (
              <Tr
                key={order.id}
                fontWeight="medium"
                onClick={() => router.push(`/orders/${order.id}`)}
                onMouseEnter={() => handlePrefetchOrder(order.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{order.numero_pedido}</Td>
                <Td>{handleFormatDate(new Date(order.created_at))}</Td>            
                <Td>{handleFormatDate(new Date(order.data_entrega))}</Td>            
                <Td>{handleFormatPrice(order.total)}</Td>
                {/* <Td>
                  <Badge variant="subtle" colorScheme="red" py="1" px="4" borderRadius="md">Em aberto</Badge>
                </Td> */}
              </Tr>                   

            )
          })}
        </Tbody>
      </Table>      
    </Content>
  )
}

export { UserOrders }
