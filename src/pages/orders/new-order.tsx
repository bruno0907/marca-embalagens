import Head from 'next/head'

import { Header } from '../../components/Header'
import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'

import { CreateOrderForm } from '../../components/pages/Orders/CreateOrderForm'
import { CreateOrderProvider } from '../../contexts/useCreateOrder'

export default function NewOrder() {
  
  return (
    <>
      <Head>
        <title>Novo pedido | MARCA</title>        
      </Head>
      <AuthWrapper>        
        <Header title="Novo pedido" withGoBack/>
        <Divider />        
        <CreateOrderProvider>
          <CreateOrderForm />
        </CreateOrderProvider>        
      </AuthWrapper> 
    </>   
  )
}