import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { OrdersModule } from '../../modules'

export default function Orders() {  
  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>
      <AuthWrapper>
        <OrdersModule />
      </AuthWrapper>
    </>
  )
}
