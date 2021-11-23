import { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router"

import { useUserOrdersQuery } from "../../../../hooks/useUserOrdersQuery"
import { useUserQuery } from '../../../../hooks/useUserQuery'

import { Authenticated } from '../../../../components/Layout/Authenticated'
import { Header } from '../../../../components/Header'

import { 
  Text,
  Button,
  Table,
  Box,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Heading,
  Stack,
  HStack,
} from "@chakra-ui/react"
import { Content } from '../../../../components/Layout/Content'
import { handleFormatDate } from '../../../../utils/handleFormatDate'
import { handleFormatPrice } from '../../../../utils/handleFormatPrice'
import { useReactToPrint } from 'react-to-print'
import { Divider } from '../../../../components/Layout/Divider'
import { FiPrinter } from 'react-icons/fi'

export default function UserOrders() {
  const router = useRouter()
  const id = router.query.id  

  const ref = useRef<HTMLDivElement>(null)

  const user = useUserQuery(String(id))
  const orders = useUserOrdersQuery(String(id))  

  const handlePrintOrders = useReactToPrint({
    content: () => ref.current,
  })

  if(orders.isLoading || user.isLoading) {
    return (
      <Text>Carregando...</Text>
    )
  }

  if(orders.isError || user.isError) {
    return (
      <Text>Carregando...</Text>
    )
  }  

  return (
    <>
      <Head>
        <title>Todos os pedidos: {user.data?.nome} | MARCA</title>
      </Head>

      <Authenticated>
        <Header withGoBack title={`Pedidos de ${user.data?.nome}`}>
          <Button 
            leftIcon={<FiPrinter />}
            colorScheme="blue" 
            onClick={handlePrintOrders}
          >Imprimir</Button>
        </Header>
        <Divider />
        <Content p="0">
          <Box ref={ref} m="8">
            <Heading 
              fontSize="2xl" 
              mb="8" 
              display="none"
              sx={{
                "@media print": {
                  display: 'block'
                }
              }}
            >Todos os pedidos de {user.data?.nome}</Heading>
            

            <Stack spacing={6}>
            {orders.data?.map(order => {
              return (                
                <Box key={order.id}>
                  <Stack borderWidth="thin" p="4" borderRadius="md" spacing={6}>
                    <HStack spacing={6} w="100%" justify="space-between">
                      <Box>
                        <Text>Pedido: <strong>{order.numero_pedido}</strong></Text>
                      </Box>
                      <Box>
                        <Text>Data de emissão: <strong>{handleFormatDate(order.created_at)}</strong></Text>
                      </Box>
                      <Box>
                        <Text>Data de entrega: <strong>{handleFormatDate(order.data_entrega)}</strong></Text>
                      </Box>
                    </HStack>
                    
                    <Heading fontSize="large" textAlign="center">Descrição do pedido:</Heading>
                    
                    <Table variant="striped" size="sm">
                      <Thead>
                        <Tr>
                          <Th w="20" textAlign="center">Qtd</Th>
                          <Th>Produtos</Th>
                          <Th w="40" textAlign="end">Valor unitário</Th>
                          <Th w="40" textAlign="end">Valor total</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {order.pedido?.map(item => {
                          return (
                            <Tr key={item.produto}>
                              <Td textAlign="center">{item.quantidade}</Td>
                              <Td>{item.produto}</Td>
                              <Td textAlign="end">{handleFormatPrice(item.valor_unitario)}</Td>
                              <Td textAlign="end">{handleFormatPrice(item.valor_total)}</Td>
                            </Tr>
                          )
                        })}
                      </Tbody>
                    </Table>
                  </Stack>
                </Box>    
              )
            })}
            </Stack>
          </Box>
        </Content>
      </Authenticated>
    </>
  )
}