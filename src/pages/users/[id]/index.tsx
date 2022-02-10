import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { AuthWrapper } from '../../../components'
import { UserModule } from '../../../modules'

type Props = {
  params: {
    id: string;
  }
}

export default function User({ params }: Props) {
  const { id } = params

  return (
    <>
      <Head>
        <title>Cliente</title>
      </Head>
      <AuthWrapper>        
        <UserModule userId={id} />
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
