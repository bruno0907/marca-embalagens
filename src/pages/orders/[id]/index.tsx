import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { AuthWrapper } from '../../../components'
import { OrderModule } from '../../../modules'
import { CreateOrderProvider } from '../../../contexts/useCreateOrder'

type Props = {
  params: {
    id: string;
  }
}

export default function Order({ params }: Props) {
  const { id } = params

  return (
    <>
      <Head>
        <title>Pedido</title>
      </Head>
      <AuthWrapper>
        <CreateOrderProvider>
          <OrderModule orderId={id}/>
        </CreateOrderProvider>
      </AuthWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
