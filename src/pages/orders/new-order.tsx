import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { CreateOrderModule } from '../../modules'
import { CreateOrderProvider } from '../../contexts/useCreateOrder'

export default function NewOrder() {  
  return (
    <>
      <Head>
        <title>Novo pedido</title>        
      </Head>
      <AuthWrapper>
        <CreateOrderProvider>
          <CreateOrderModule />
        </CreateOrderProvider>        
      </AuthWrapper> 
    </>   
  )
}