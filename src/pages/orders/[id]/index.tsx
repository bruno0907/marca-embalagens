import { useRef } from 'react'

import Head from 'next/head'
import { useRouter } from "next/router"
import { GetServerSideProps } from 'next'

import { useReactToPrint } from 'react-to-print'

import { Content } from '../../../components/Content'
import { Divider } from '../../../components/Divider'

import { OrderHeader } from '../../../components/pages/Orders/Order/OrderHeader'
import { OrderUser } from '../../../components/pages/Orders/Order/OrderUser'
import { OrderProducts } from '../../../components/pages/Orders/Order/OrderProducts'
import { OrderPaymentConditions } from '../../../components/pages/Orders/Order/OrderPaymentConditions'
import { OrderTotal } from '../../../components/pages/Orders/Order/OrderTotal'
import { Header } from '../../../components/Header'

import { useOrderQuery } from "../../../hooks/useOrderQuery"

import {     
  Box,
  Text,  
  Button,
  Center,
  Spinner
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
        <title>Pedido: {order.data?.numero_pedido} | MARCA</title>
      </Head>

      <Box maxW="1090px" m="auto" px="8">
        <Header withGoBack py="16" title={`Pedido: ${order.data?.numero_pedido}`}>          
          <Button colorScheme="blue" rightIcon={<FiPrinter />} onClick={handlePrintOrder}>
            Imprimir
          </Button>
        </Header>

        <Content>
          { !order.data ? null : order.isLoading ? (
              <Center py="16">
                <Spinner color="blue.500" />
              </Center>
            ) : order.isError ? (
              <Center py="16">
                <Text>Ocorreu um erro ao carregar as informações do pedido. Tente novamente...</Text>
                <Text>Voltar</Text>
              </Center>
            ) : (
              <Box ref={orderRef} p="8">

                <OrderHeader 
                  orderNumber={order.data?.numero_pedido} 
                  orderDeliveryDate={order.data?.data_entrega}
                />

                <Divider/>

                <OrderUser 
                  userId={order.data?.cliente} 
                  deliveryAddress={order.data?.endereco_entrega}
                />
                
                <OrderPaymentConditions 
                  paymentCondition={order.data?.condicao_pagamento}
                />
                
                <Divider/>

                <OrderProducts 
                  order={order.data?.pedido}
                />
                
                <Divider/>

                <OrderTotal 
                  orderTotal={order.data?.total}
                />

              </Box>
            )
          }
        </Content>
      </Box>
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
