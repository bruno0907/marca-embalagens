import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { supabase } from '../../services/supabase'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'

import {  
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,  
  Button,
  Icon,
  Heading,
  useToast,  
  Box
} from '@chakra-ui/react'

import {FiPlus} from 'react-icons/fi'

interface UsersProps {
  user: UserProps;
}

type UserProps = {
  id: string;
}

interface OrdersProps {
  user_id: string;
}

export default function Orders({ user }: UsersProps) {
  const toast = useToast()
  const router = useRouter()
  const [orders, setOrders] = useState<OrdersProps[]>([])  

  useEffect(() => {
    //TODO: setOrders com a listagem dos pedidos

  }, [])

  
  return (
    <>
      <Head>
        <title>Marca | Pedidos</title>
        <meta name="description" content="Página de pedidos da Marka" />
      </Head>
      <Layout>
        <Flex justify="space-between">
          <Heading>Pedidos</Heading>
          <NextLink href="/users/new-order" passHref>
            <Button as="a" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiPlus} />}>Cadastrar novo pedido</Button>
          </NextLink>
        </Flex>
        <Divider />
        <Content>
          <Table colorScheme="gray" variant="striped">
            <Thead>
              <Tr>                  
                <Th w="32">Pedido</Th>
                <Th w="32">Data</Th>
                <Th>Cliente</Th>
                <Th w="32">Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr key="" onClick={() => router.push(`/orders/`)} _hover={{ textDecor: 'underline', cursor: 'pointer' }}>
                <Td>0001</Td>
                <Td>15/08/2021</Td>
                <Td>Bruno Mariani</Td>
                <Td>R$1500,00</Td>                    
              </Tr>
            </Tbody>
          </Table>
        </Content>
      </Layout>
    </>
  )
}
