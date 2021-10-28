import Head from 'next/head'

import { Header } from '../../components/Header'
import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { CreateSupplierForm } from '../../components/CreateSupplierForm'

export default function NewSupplier() {
  return (
    <>
      <Head>
        <title>MARCA | Novo Fornecedor</title>        
      </Head>
      <Layout>
        <Header title="Novo Fornecedor" withGoBack/>
        <Divider />
        <Content>
          <CreateSupplierForm />
        </Content>
      </Layout>
    </>
  )
}