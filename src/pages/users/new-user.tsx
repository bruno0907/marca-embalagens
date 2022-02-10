import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { CreateUserModule } from '../../modules'

export default function NewUser() {
  return (
    <>
      <Head>
        <title>Novo Cliente</title>        
      </Head>
      <AuthWrapper>
        <CreateUserModule />
      </AuthWrapper>
    </>
  )
}