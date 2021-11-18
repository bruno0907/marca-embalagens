import { useRef } from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'

import { useReactToPrint } from 'react-to-print'

import { useOrderQuery } from "../../../hooks/useOrderQuery"

import { Divider } from '../../../components/Layout/Divider'

import { OrderHeader } from './components/OrderHeader'
import { OrderUser } from './components/OrderUser'
import { OrderProducts } from './components/OrderProducts'

import {   
  Flex,
  Box,
  Text,
  Heading,
  Icon,
  Button,
  Center,
  Spinner
} from "@chakra-ui/react"

import { FiArrowLeft, FiPrinter } from 'react-icons/fi'
import { Content } from '../../../components/Layout/Content'
import { OrderPaymentConditions } from './components/OrderPaymentConditions'
import { OrderTotal } from './components/OrderTotal'
import { Header } from '../../../components/Header'

export default function Order() {
  const router = useRouter()
  const id = router.query.id

  const orderRef = useRef<HTMLDivElement>(null)

  const order = useOrderQuery(id)
  
  const handleGoBack = () => router.push('/orders')

  const handlePrintOrder = useReactToPrint({
    content: () => orderRef.current
    })

  if(!order.data?.data) return null

  return (
    <>
      <Head>
        <title>Pedido: {order.data?.data.numero_pedido} | MARCA</title>
      </Head>

      <Box maxW="1090px" m="auto" px="8">
        <Header withGoBack py="16">
          <Heading fontSize="3xl" fontWeight="bold">
            Pedido: {order.data?.data.numero_pedido}
          </Heading>
          <Button colorScheme="blue" rightIcon={<FiPrinter />} onClick={handlePrintOrder}>
            Imprimir
          </Button>
        </Header>

        <Content>
          { order.isLoading ? (
              <Center py="16">
                <Spinner size="md" color="blue.500" />
              </Center>
            ) : order.isError ? (
              <Center py="16">
                <Text>Ocorreu um erro ao carregar as informações do pedido. Tente novamente...</Text>
                <Text>Voltar</Text>
              </Center>
            ) : (
              <Box ref={orderRef} p="8">
                <OrderHeader 
                  orderNumber={order.data?.data.numero_pedido} 
                  orderDeliveryDate={order.data?.data.data_entrega}
                />
                <Divider/>
                <OrderUser userId={order.data?.data.cliente} deliveryAddress={order.data?.data.endereco_entrega}/>
                <OrderPaymentConditions paymentCondition={order.data?.data.condicao_pagamento}/>
                <Divider/>
                <OrderProducts order={order.data?.data.pedido}/>
                <Divider/>
                <OrderTotal orderTotal={order.data?.data.total}/>
              </Box>
            )
          }
        </Content>
      </Box>
    </>
  )
}