import Head from 'next/head'

import { Header } from '../../components/Header'
import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'

import { CreateOrderProvider } from '../../contexts/useCreateOrder'
import { CreateOrderModule } from '../../modules/Orders/CreateOrder'

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
          <CreateOrderModule />
        </CreateOrderProvider>        
      </AuthWrapper> 
    </>   
  )
}