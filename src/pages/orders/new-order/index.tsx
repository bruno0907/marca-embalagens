import Head from 'next/head'

import { Header } from '../../../components/Header'
import { Authenticated } from '../../../components/Layout/Authenticated'
import { Divider } from '../../../components/Divider'
import { Content } from '../../../components/Content'

import { CreateOrderForm } from './components/CreateOrderForm'

export default function NewOrder() {
  return (
    <>
      <Head>
        <title>Novo pedido | Novo pedido</title>        
      </Head>

      <Authenticated>
        
        <Header title="Novo pedido" withGoBack/>

        <Divider />

        <Content>
          <CreateOrderForm />
        </Content>
      </Authenticated> 
    </>   
  )
}