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

import { useOrdersQuery } from "../../../../hooks"
import { prefetchOrder } from "../../../../services"

import { 
  handleFormatDate,
  handleFormatPrice,
  handleFormatPadStart
} from "../../../../utils"

type Props = {
  filterValue: number;
}

export const OrdersList = ({ filterValue }: Props) => {
  const router = useRouter()

  const { data: orders, isLoading, isError, isFetching } = useOrdersQuery(filterValue)

  const handlePrefetchOrder = async (id: string) => await prefetchOrder(id)

  if(isLoading) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">
              <HStack spacing={3} align="center">
                <Text>Pedido</Text>
                <Spinner size="sm" color="gray.50" ml="4"/>
              </HStack>
            </Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50">Emissão</Th>            
            <Th color="gray.50">Valor Total</Th>
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
            <Th color="gray.50">Pedido</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50">Emissão</Th>
            <Th color="gray.50">Valor Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={4}>
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

  if(!orders?.length) {
    return (
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50">Pedido</Th>
            <Th color="gray.50">Cliente</Th>
            <Th color="gray.50">Emissão</Th>
            <Th color="gray.50">Valor Total</Th>
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
        <Th color="gray.50" w="130px">
            <Flex align="center">
              Pedido
              { isFetching && 
                <Spinner size="sm" color="gray.50" ml="4"/>
              }
            </Flex>
          </Th>            
            <Th color="gray.50" minW="225px">Cliente</Th>
            <Th color="gray.50" w="125px">Emissão</Th>
            <Th color="gray.50" minW="140px">Valor total</Th>
        </Tr>
      </Thead>
      <Tbody>
        { orders?.map(order => {
            return (
              <Tr
                key={order.id}
                fontWeight="medium"
                onClick={() => router.push(`/orders/${order.id}`)}
                onMouseEnter={() => handlePrefetchOrder(order.id)}
                _hover={{ cursor: 'pointer', color: 'blue.500'}}
              >
                <Td>{handleFormatPadStart(order.numero_pedido)}</Td>                        
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
