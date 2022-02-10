import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { EstimatesModule } from '../../modules'

export default function Estimates() {
  return (
    <>
      <Head>
        <title>Orçamentos</title>
      </Head>
      <AuthWrapper>
        <EstimatesModule />
      </AuthWrapper>
    </>
  )
}
