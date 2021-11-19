import { useRouter } from "next/router"

import { prefetchOrder } from '../../../../../services/prefetchOrder'

import { Content } from "../../../../../components/Layout/Content"

import { useUserOrdersQuery } from "../../../../../hooks/useUserOrdersQuery"

import { handleFormatDate } from "../../../../../utils/handleFormatDate"
import { handleFormatPrice } from "../../../../../utils/handleFormatPrice"

import { 
  Box,
  Button, 
  Flex, 
  Heading, 
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr,  
  Badge,  
  Spinner,
  Text,
} from "@chakra-ui/react"

type UserOrdersProps = {
  userId: string | string[];  
}

const UserOrders = ({ userId }: UserOrdersProps) => { 
  const router = useRouter()

  const orders = useUserOrdersQuery(String(userId), 3)

  const handlePrefetchOrder = async (id: string) => await prefetchOrder(id) 

  if(orders.isLoading || orders.isFetching) {
    return (
      <Content>
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Últimos pedidos</Heading>          
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>
        <Box borderRadius="md" overflow="hidden">
          <Table colorScheme="gray" variant="striped" >
            <Thead>
              <Tr bgColor="blue.500">
                <Th color="gray.50">Pedido</Th>              
                <Th color="gray.50">Data</Th>
                <Th color="gray.50">Valor</Th>
              </Tr>
            </Thead>        
          </Table>        
        </Box>
      </Content>
    )
  }

  if(orders.isError) {
    return (
      <Content>        
        <Heading fontSize="2xl" mb="8">Últimos pedidos</Heading>
        <Box borderRadius="md" overflow="hidden">
          <Table colorScheme="gray" variant="striped">
            <Thead>
              <Tr bgColor="blue.500">
                <Th color="gray.50">Pedido</Th>              
                <Th color="gray.50">Data</Th>
                <Th color="gray.50">Valor</Th>
              </Tr>
            </Thead>
          </Table>        
          <Text p="2" bgColor="gray.100">Ocorreu um erro ao carregar as informações...</Text>
        </Box>
      </Content>
    )
  }

  if(orders.data?.length <= 0) {
    return (
      <Content>        
        <Heading fontSize="2xl" mb="8">Pedidos</Heading>
        <Box borderRadius="md" overflow="hidden">
          <Table colorScheme="gray" variant="striped" >
            <Thead>
              <Tr bgColor="blue.500">
                <Th color="gray.50">Pedido</Th>              
                <Th color="gray.50">Data</Th>
                <Th color="gray.50">Valor</Th>
              </Tr>
            </Thead>
          </Table>
          <Text p="2" bgColor="gray.100">Nenhum pedido encontrado...</Text>
        </Box>
      </Content>
    )
  } 

  return (
    <Content>
      <Flex align="center" justify="space-between" mb="8">
        <Heading fontSize="2xl">Últimos pedidos</Heading>
        <Button variant="link" colorScheme="blue" p="2" onClick={() => router.push(`/users/orders/${userId}`)}>Ver todos os pedidos do cliente</Button>
      </Flex>
      <Box borderRadius="md" overflow="hidden">
        <Table variant="striped" colorScheme="facebook">
          <Thead>
            <Tr bgColor="blue.500">
              <Th w="36" color="gray.50">Pedido</Th>
              <Th color="gray.50">Data</Th>
              <Th w="36" color="gray.50">Valor</Th>
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
                  <Td>{handleFormatPrice(order.total)}</Td>
                  {/* <Td>
                    <Badge variant="subtle" colorScheme="red" py="1" px="4" borderRadius="md">Em aberto</Badge>
                  </Td> */}
                </Tr>                   

              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Content>
  )
}

export { UserOrders }
