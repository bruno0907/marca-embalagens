import { useRef } from 'react'

import Head from 'next/head'
import { useRouter } from "next/router"
import { GetServerSideProps } from 'next'

import { useReactToPrint } from 'react-to-print'
import { handleFormatPadStart } from '../../../utils/handleFormatPadStart'

import { WithAuth } from '../../../components/WithAuth'
import { Content } from '../../../components/Content'
import { Divider } from '../../../components/Divider'

import { OrderHeader } from '../../../components/pages/Orders/Order/OrderHeader'
import { OrderUser } from '../../../components/pages/Orders/Order/OrderUser'
import { OrderProducts } from '../../../components/pages/Orders/Order/OrderProducts'
import { Header } from '../../../components/Header'

import { useOrderQuery } from "../../../hooks/useOrderQuery"

import {     
  Box,
  Text,  
  Button,
  Center,
  Spinner,
  Stack
} from "@chakra-ui/react"

import { FiPrinter } from 'react-icons/fi'

type Props = {
  params: {
    id: string;
  }
}

export default function Order({ params }: Props) {
  const router = useRouter()
  
  const { id } = params

  const orderRef = useRef<HTMLDivElement>(null)

  const order = useOrderQuery(id)

  const handlePrintOrder = useReactToPrint({
    content: () => orderRef.current,
    onAfterPrint: () => router.push('/orders')
  })

  return (
    <>
      <Head>
        <title>
          {!order.data?.numero_pedido ? `MARCA` :
            `Pedido: ${handleFormatPadStart(order.data?.numero_pedido)} | MARCA`
          }
        </title>
      </Head>

      <WithAuth>        
        <Header 
          withGoBack 
          title={order.data?.numero_pedido &&
            `Pedido: ${handleFormatPadStart(order.data?.numero_pedido)}`
          }            
        >
          <Button 
            colorScheme="blue" 
            rightIcon={<FiPrinter />} 
            onClick={handlePrintOrder}
          >
            Imprimir
          </Button>
        </Header>

        <Divider />

        <Content>
          { !order.data ? null : order.isLoading ? (
              <Center  minH="70vh">
                <Spinner color="blue.500" />
              </Center>
            ) : order.isError ? (
              <Center  minH="70vh" flexDir="column">            
                <Text 
                  fontSize="xl" 
                  mb="8" 
                  fontWeight="bold"
                >
                  Não foi possível carregar o pedido.
                </Text>
                <Button 
                  colorScheme="blue" 
                  mb="2" 
                  onClick={() => router.reload()}
                >
                  Tentar novamente
                </Button>
                <Button 
                  colorScheme="blue" 
                  variant="ghost" 
                  onClick={() => router.back()}
                >
                  Voltar
                </Button>
              </Center>
            ) : (
              <Stack spacing={2} ref={orderRef} sx={{ "@media print": { p: '4' } }}>
                <OrderHeader 
                  orderNumber={order.data?.numero_pedido} 
                  orderDeliveryDate={order.data?.data_entrega}
                />
                <OrderUser 
                  userId={order.data?.cliente} 
                  addressId={order.data?.endereco_entrega}
                />

                <OrderProducts 
                  order={order.data?.pedido}
                  total={order.data?.total}
                />

                {order.data?.condicao_pagamento && (                  
                  <Stack spacing={2} px={2} py={1} borderWidth="1px" borderRadius="md" borderColor="gray.200" w="100%" minH="80px">                    
                    <Text fontWeight="bold" >Condição de pagamento: {order.data.condicao_pagamento}</Text>
                  </Stack>
                )}
              </Stack>
            )
          }
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
