import Head from 'next/head'

import { Header } from '../../components/Header'
import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { CreateProductForm } from '../../components/pages/Products/CreateProductForm'

export default function NewProduct() {
  return (
    <>
      <Head>
        <title>Cadastrar novo produto | MARCA</title>        
      </Head>
      <AuthWrapper>        
        <Header title="Cadastrar novo produto" withGoBack/>
        <Divider />
        <Content>
          <CreateProductForm />
        </Content>
      </AuthWrapper>
    </>
  )
}