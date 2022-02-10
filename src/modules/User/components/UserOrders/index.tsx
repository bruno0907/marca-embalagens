import { useRouter } from "next/router"

import {  
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr,
  Spinner,   
  HStack,
  Icon,
  Text,
  Spacer,  
} from "@chakra-ui/react"

import { FiAlertCircle } from "react-icons/fi"

import { 
  Table,
  Section,
  SectionHeader,
  SectionTitle,
  Content,
  ButtonLink 
} from "../../../../components"

import { useUserOrdersQuery } from "../../../../hooks"

import { prefetchOrder } from '../../../../services/'

import { 
  handleFormatDate,
  handleFormatPrice,
  handleFormatPadStart
} from "../../../../utils"

type Props = {
  userId: string;  
}

export const UserOrders = ({ userId }: Props) => { 
  const router = useRouter()

  const { data: orders, isLoading, isError, isFetching } = useUserOrdersQuery(userId, 3)

  const handleNavigateToOrder = () => router.push(`/users/${userId}/orders`)

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
            <Th color="gray.50">Emissão</Th>            
            <Th color="gray.50">Entrega</Th>
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
            <Th color="gray.50">Emissão</Th>
            <Th color="gray.50">Entrega</Th>
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
    <Section>
      <SectionHeader>
        <SectionTitle title="Últimos pedidos"/>
        <Spacer />
        <ButtonLink onClick={handleNavigateToOrder}>
          Ver todos os pedidos
        </ButtonLink>
      </SectionHeader>
      <Content>
        <Table>
          <Thead>
            <Tr bgColor="blue.500">
              <Th color="gray.50">
                <HStack spacing={3} align="center">
                  <Text>Pedido</Text>
                  {isFetching && (<Spinner size="sm" color="gray.50" ml="4"/>) }
                </HStack>
              </Th>
              <Th color="gray.50">Emissão</Th>
              <Th color="gray.50">Entrega</Th>
              <Th color="gray.50" minW="135px">Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map(order => {
              return (
                <Tr
                  key={order.id}
                  fontWeight="medium"
                  onClick={() => router.push(`/orders/${order.id}`)}
                  onMouseEnter={() => handlePrefetchOrder(order.id)}
                  _hover={{ cursor: 'pointer', color: 'blue.500'}}
                >
                  <Td>{handleFormatPadStart(order.numero_pedido)}</Td>
                  <Td>{handleFormatDate(new Date(order.created_at))}</Td>            
                  <Td>{handleFormatDate(new Date(order.data_entrega))}</Td>            
                  <Td>{handleFormatPrice(order.total)}</Td>                
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Content>
    </Section>
  )
}
