import Head from 'next/head'

import { Header } from '../../components/Header'
import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { CreateSupplierForm } from '../../components/pages/Suppliers/CreateSupplierForm'

export default function NewSupplier() {
  return (
    <>
      <Head>
        <title>MARCA | Novo Fornecedor</title>        
      </Head>
      <AuthWrapper>
        <Header title="Novo Fornecedor" withGoBack/>
        <Divider />
        <Content>
          <CreateSupplierForm />
        </Content>
      </AuthWrapper>
    </>
  )
}