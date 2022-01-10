import Head from 'next/head'

import { Header } from '../../components/Header'
import { WithAuth } from '../../components/WithAuth'
import { Divider } from '../../components/Divider'

import { CreateOrderForm } from '../../components/pages/Orders/CreateOrderForm'
import { CreateOrderProvider } from '../../contexts/useCreateOrder'

export default function NewOrder() {
  
  return (
    <>
      <Head>
        <title>Novo pedido | Novo pedido</title>        
      </Head>

      <WithAuth>
        
        <Header title="Novo pedido" withGoBack/>

        <Divider />
        
        <CreateOrderProvider>
          <CreateOrderForm />
        </CreateOrderProvider>
        
      </WithAuth> 
    </>   
  )
}