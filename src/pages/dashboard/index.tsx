import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { supabase } from '../../services/supabase'

import { Layout } from '../../components/Layout'

import {   
  Heading, 
  Text,
  Stack
} from '@chakra-ui/react'
import { Content } from '../../components/Content'

export default function Dashboard () {      
  return (
    <> 
      <Head>
        <title>Marca | Home</title>
        <meta name="description" content="Dashboard da plataforma da Marka" />
      </Head>
      <Layout>
        <Content>
          <Heading mb="16">Página Inicial</Heading>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(!user) { 
    return {
      props: {},
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  } 
  
  return {
    props: { user }
  }
}