import Head from 'next/head'

import { Header } from '../../../components/Header'
import { Layout } from '../../../components/Layout'
import { Divider } from '../../../components/Divider'
import { Content } from '../../../components/Content'

import { CreateOrderForm } from './components/CreateOrderForm'

export default function NewOrder() {
  return (
    <>
      <Head>
        <title>Novo pedido | Novo pedido</title>        
      </Head>
      <Layout>
        
        <Header title="Novo pedido" withGoBack/>

        <Divider />

        <Content>
          <CreateOrderForm />
        </Content>
      </Layout> 
    </>   
  )
}