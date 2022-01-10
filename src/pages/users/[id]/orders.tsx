import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { AuthWrapper } from '../../../components/AuthWrapper'
import { Header } from '../../../components/Header'
import { Content } from '../../../components/Content'
import { Divider } from '../../../components/Divider'
import { OrderHeader } from '../../../components/pages/Users/UserOrders/OrderHeader'
import { OrderItemsList } from '../../../components/pages/Users/UserOrders/OrderItemsList'

import { useUserOrdersQuery } from "../../../hooks/useUserOrdersQuery"
import { useUserQuery } from '../../../hooks/useUserQuery'

import { handleFormatPrice } from '../../../utils/handleFormatPrice'

import { 
  Text,
  Button,  
  Box,  
  Heading,
  Stack,
  Center,
  Spinner,
  Spacer,
} from "@chakra-ui/react"

type Props = {
  params: {
    id: string;
  }
}

export default function UserOrders({ params }: Props) {  
  const { id } = params
  const router = useRouter()  

  const user = useUserQuery(id)
  const orders = useUserOrdersQuery(id)  

  return (
    <>
      <Head>
        <title>
          {!user.data?.nome ? `MARCA` : `
          Todos os pedidos: ${user.data?.nome} | MARCA`}
        </title>
      </Head>

      <AuthWrapper>
        <Header 
          withGoBack 
          title={user.data?.nome && `Pedidos de ${user.data.nome}`}>
        </Header>

        <Divider />
          
        { orders.isLoading || user.isLoading ? (
          <Center minH="50vh">
            <Spinner size="lg" color="blue.500"/>
          </Center>
        ) : orders.isError || user.isError ? (
          <Center  minH="50vh" flexDir="column">            
            <Text 
              fontSize="xl" 
              mb="8" 
              fontWeight="bold"
              >
              Não foi possível carregar os pedidos.
            </Text>
            <Button 
              colorScheme="blue" 
              mb="2" 
              onClick={() => router.reload()}
              >
              Tentar novamente
            </Button>
            <Button
              variant="ghost" 
              onClick={() => router.back()}
              >
              Voltar
            </Button>        
          </Center>             
        ) : (
          <Content>
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
                      <OrderItemsList orderItems={order.pedido}/>
                      <Text textAlign="end" px="1"><strong>Total do pedido: </strong>{handleFormatPrice(order.total)}</Text>
                    </Stack>
                  </Box>    
                )
              })}
            </Stack>
          </Content>
        )}
      </AuthWrapper>
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
