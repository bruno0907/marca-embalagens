import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { SuppliersModule } from '../../modules'

export default function Suppliers() {   
  return (
    <>
      <Head>
        <title>Fornecedores</title>        
      </Head>
      <AuthWrapper>
        <SuppliersModule />
      </AuthWrapper>
    </>
  )
}
