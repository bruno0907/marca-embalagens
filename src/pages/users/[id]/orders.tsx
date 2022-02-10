import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { 
  AuthWrapper,
  Header,
  Divider,
  LoadingView,
  ErrorView, 
} from '../../../components'

import { useUserOrdersQuery } from "../../../hooks/useUserOrdersQuery"
import { useUserQuery } from '../../../hooks/useUserQuery'

import { UserOrdersModule } from '../../../modules'

type Props = {
  params: {
    id: string;
  }
}

export default function UserOrders({ params }: Props) {  
  const { id } = params  

  const user = useUserQuery(id)
  const orders = useUserOrdersQuery(id)
  
  if(user.isLoading || orders.isLoading) {
    return (
      <>
        <Head>
          <title>Pedidos</title>
        </Head>
        <AuthWrapper>
          <Header withGoBack title="Pedidos"/>
          <Divider />
          <LoadingView />
        </AuthWrapper>
      </>
    )
  }

  if(user.isError || orders.isError) {
    return (
      <>
        <Head>
          <title>Pedidos</title>
        </Head>
        <AuthWrapper>
          <Header withGoBack title="Pedidos"/>
          <Divider />
          <ErrorView />
        </AuthWrapper>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{`Pedidos de: ${user.data.nome}`}</title>
      </Head>
      <AuthWrapper>
        <Header 
          withGoBack 
          title={`Pedidos de ${user.data.nome}`}>
        </Header>
        <Divider />
        <UserOrdersModule orders={orders.data} />
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
