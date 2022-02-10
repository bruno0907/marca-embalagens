import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { AuthWrapper } from '../../../components'
import { EstimateModule } from '../../../modules'

type Props = {
  params: {
    id: string;
  }
}

export default function EstimateRoute({ params }: Props) {  
  const { id } = params 

  return (    
    <>
      <Head>
        <title>Orçamento</title>
      </Head>
      <AuthWrapper>        
        <EstimateModule estimateId={id} />
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
