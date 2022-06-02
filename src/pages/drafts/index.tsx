import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { DraftsModule } from '../../modules'

export default function Drafts() {
  return (
    <>
      <Head>
        <title>Orçamentos</title>
      </Head>
      <AuthWrapper>
        <DraftsModule />
      </AuthWrapper>
    </>
  )
}
