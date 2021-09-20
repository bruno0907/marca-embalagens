import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Header } from '../../components/Header'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'

import {     
  Text,
  Stack,
} from '@chakra-ui/react'

export default function Dashboard() {      
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
            <Text>Total Pedidos: 0</Text>
            <Text>Total Clientes: 0</Text>
            <Text>Total Produtos: 0</Text>
          </Stack>

        </Content>
        
      </Layout>
    </>
  )
}
