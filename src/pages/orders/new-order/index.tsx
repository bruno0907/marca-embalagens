import Head from 'next/head'

import { Header } from '../../../components/Header'
import { WithAuth } from '../../../components/WithAuth'
import { Divider } from '../../../components/Divider'
import { Content } from '../../../components/Content'

import { CreateOrderForm } from './components/CreateOrderForm'
import { CreateOrderProvider } from './hooks/useCreateOrder'

export default function NewOrder() {
  return (
    <>
      <Head>
        <title>Novo pedido | Novo pedido</title>        
      </Head>

      <WithAuth>
        
        <Header title="Novo pedido" withGoBack/>

        <Divider />

        <Content>
          <CreateOrderProvider>
            <CreateOrderForm />
          </CreateOrderProvider>
        </Content>
      </WithAuth> 
    </>   
  )
}