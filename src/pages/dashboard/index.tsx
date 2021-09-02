import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'

import {   
  Heading, 
  Text,
  Stack,  
  Box
} from '@chakra-ui/react'

export default function Dashboard () {      
  return (
    <> 
      <Head>
        <title>Marca | Home</title>
        <meta name="description" content="Dashboard da plataforma da Marka" />
      </Head>
      <Layout>
        <Heading>Página Inicial</Heading>
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
