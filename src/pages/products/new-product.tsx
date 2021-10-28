import Head from 'next/head'

import { Header } from '../../components/Header'
import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { CreateProductForm } from '../../components/CreateProductForm'

export default function NewProduct() {
  return (
    <>

      <Head>
        <title>MARCA | Novo Produto</title>        
      </Head>
      <Layout>
        
        <Header title="Novo Produto" withGoBack/>

        <Divider />

        <Content>
          <CreateProductForm />
        </Content>
      </Layout>

    </>
  )
}