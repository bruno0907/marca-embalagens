import { useRouter } from "next/router"

import { Table } from "../../Table"
import { Section } from "../../Section"
import { SectionHeader } from "../../SectionHeader"
import { SectionTitle } from "../../SectionTitle"

import { useUserOrdersQuery } from "../../../hooks/useUserOrdersQuery"

import { prefetchOrder } from '../../../services/prefetchOrder'

import { handleFormatDate } from "../../../utils/handleFormatDate"
import { handleFormatPrice } from "../../../utils/handleFormatPrice"
import { handleFormatPadStart } from "../../../utils/handleFormatPadStart"

import {  
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr,
  Spinner, 
  Button,
} from "@chakra-ui/react"
import { Content } from "../../Content"

type Props = {
  userId: string;  
}

const UserOrders = ({ userId }: Props) => { 
  const router = useRouter()

  const orders = useUserOrdersQuery(userId, 3)

  const handleNavigateToOrder = () => router.push(`/users/${userId}/orders`)

  const handlePrefetchOrder = async (id: string) => await prefetchOrder(id) 

  if(orders.isLoading) {
    return (
      <Section>
        <SectionHeader>
          <SectionTitle title="Últimos pedidos"/>
        </SectionHeader>
        <Content>
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
                <Td colSpan={4} textAlign="center">
                  <Spinner color="blue.500" />
                </Td>
              </Tr>
            </Tbody>        
          </Table>
        </Content>
      </Section>
    )
  }

  if(orders.isError) {
    return (
      <Section>
        <SectionHeader>
          <SectionTitle title="Últimos pedidos"/>
        </SectionHeader>
        <Content>
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
                <Td colSpan={4}>Ocorreu um erro ao carregar as informações...</Td>
              </Tr>
            </Tbody>
          </Table>
        </Content>
      </Section>
    )
  }

  if(!orders.data?.length) {
    return (
      <Section>
        <SectionHeader>
          <SectionTitle title="Últimos pedidos"/>
        </SectionHeader>
        <Content>
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
      </Section>
    )
  } 

  return (
    <Section>
        <SectionHeader>
          <SectionTitle title="Últimos pedidos"/>
          <Button variant="link" colorScheme="blue" onClick={handleNavigateToOrder}>Ver todos os pedidos</Button>
        </SectionHeader>
        <Content>
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
              {orders.data?.map(order => {
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

export { UserOrders }
