import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { CreateEstimateModule } from '../../modules'

export default function NewEstimate() {
  return (
    <>
      <Head>
        <title>Novo orçamento</title>
      </Head>
      <AuthWrapper>
        <CreateEstimateModule/>
      </AuthWrapper>  
    </>
  )
}