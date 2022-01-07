import { useRef } from 'react'

import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { useReactToPrint } from 'react-to-print'

import { WithAuth } from '../../../components/WithAuth'
import { Header } from '../../../components/Header'
import { Content } from '../../../components/Content'
import { Divider } from '../../../components/Divider'
import { OrderHeader } from '../../../components/pages/Users/UserOrders/OrderHeader'
import { OrderItemsList } from '../../../components/pages/Users/UserOrders/OrderItemsList'

import { useUserOrdersQuery } from "../../../hooks/useUserOrdersQuery"
import { useUserQuery } from '../../../hooks/useUserQuery'

import { 
  Text,
  Button,  
  Box,  
  Heading,
  Stack,
  Center,
  Spinner,
} from "@chakra-ui/react"
import { FiPrinter } from 'react-icons/fi'

type Props = {
  params: {
    id: string;
  }
}

export default function UserOrders({ params }: Props) {  
  const { id } = params

  const OrderstoPrintRef = useRef<HTMLDivElement>(null)

  const user = useUserQuery(id)
  const orders = useUserOrdersQuery(id)  

  const handlePrintOrders = useReactToPrint({
    content: () => OrderstoPrintRef.current,
  })  

  return (
    <>
      <Head>
        <title>Todos os pedidos: {user.data?.nome} | MARCA</title>
      </Head>

      <WithAuth>
        <Header 
          withGoBack 
          title={user.data?.nome && `Pedidos de ${user.data.nome}`}>
          <Button leftIcon={<FiPrinter />} colorScheme="blue"  onClick={handlePrintOrders}>
            Imprimir
          </Button>
        </Header>

        <Divider />

        <Content p="0">
          <Box ref={OrderstoPrintRef} m="8">
            <Heading 
              fontSize="2xl" 
              mb="8" 
              display="none"
              sx={{ "@media print": { display: 'block' } }}
            > Todos os pedidos de {user.data?.nome || ''}            
            </Heading>
            
            { orders.isLoading || user.isLoading ? (
              <Center>
                <Spinner size="lg" color="blue.500"/>
              </Center>
            ) : orders.isError || user.isError ? (
              <Text>Ocorreu um erro ao carregar as informações...</Text>
            ) : (
              <Stack spacing={6}>
                {orders.data?.map(order => {
                  return (                
                    <Box key={order.id}>
                      <Stack borderWidth="thin" p="4" borderRadius="md" spacing={6}>
                        <OrderHeader
                          orderNumber={order.numero_pedido}
                          createdAt={order.created_at}
                          deliveryDate={order.data_entrega}
                        />
                        
                        <Heading fontSize="large" textAlign="center">Descrição do pedido:</Heading>
                        
                        <OrderItemsList orderItems={order?.pedido}/>
                      </Stack>
                    </Box>    
                  )
                })}
              </Stack>
            )}
          </Box>
        </Content>
      </WithAuth>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
