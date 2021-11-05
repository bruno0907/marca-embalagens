import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'

import {     
  Text,
  Stack,
} from '@chakra-ui/react'
import { useOrdersQuery } from '../../hooks/useOrdersQuery'
import { useUsersQuery } from '../../hooks/useUsersQuery'
import { useProductsQuery } from '../../hooks/useProductsQuery'

export default function Dashboard() {   
  const orders = useOrdersQuery()
  const users = useUsersQuery()
  const products = useProductsQuery()

  return (
    <> 
      <Head>
        <title>MARCA | Página inicial</title>
      </Head>

      <Layout>

        <Header title="Página inicial" />

        <Divider />

        <Content>

          <Stack spacing={3}>
            <Text>Total Pedidos: {orders.data?.length}</Text>
            <Text>Total Clientes: {users.data?.length}</Text>
            <Text>Total Produtos: {products.data?.length}</Text>
          </Stack>

        </Content>
        
      </Layout>
    </>
  )
}
