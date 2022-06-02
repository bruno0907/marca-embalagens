import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { CreateDraftModule } from '../../modules'

export default function NewDraft() {
  return (
    <>
      <Head>
        <title>Novo orçamento</title>
      </Head>
      <AuthWrapper>
        <CreateDraftModule/>
      </AuthWrapper>  
    </>
  )
}