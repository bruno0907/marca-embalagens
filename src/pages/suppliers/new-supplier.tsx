import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { CreateSupplierModule } from '../../modules'

export default function NewSupplier() {
  return (
    <>
      <Head>
        <title>Novo Fornecedor</title>        
      </Head>
      <AuthWrapper>
        <CreateSupplierModule />
      </AuthWrapper>
    </>
  )
}