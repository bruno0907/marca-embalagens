import Head from 'next/head'

import { Header } from '../../../components/Header'
import { Layout } from '../../../components/Layout'
import { Divider } from '../../../components/Divider'
import { Content } from '../../../components/Content'
import { CreateProductForm } from './components/CreateProductForm'

export default function NewProduct() {
  return (
    <>

      <Head>
        <title>MARCA | Cadastrar novo produto</title>        
      </Head>
      <Layout>
        
        <Header title="Cadastrar novo produto" withGoBack/>

        <Divider />

        <Content>
          <CreateProductForm />
        </Content>
      </Layout>

    </>
  )
}