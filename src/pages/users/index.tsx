import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { UsersModule } from '../../modules'

export default function Users() {     
  return (
    <>
      <Head>
        <title>Clientes</title>        
      </Head>
      <AuthWrapper>        
        <UsersModule />        
      </AuthWrapper>
    </>
  )
}
