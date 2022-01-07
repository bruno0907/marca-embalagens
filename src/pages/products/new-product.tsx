import Head from 'next/head'

import { Header } from '../../components/Header'
import { WithAuth } from '../../components/WithAuth'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { CreateProductForm } from '../../components/pages/Products/CreateProductForm'

export default function NewProduct() {
  return (
    <>

      <Head>
        <title>MARCA | Cadastrar novo produto</title>        
      </Head>
      <WithAuth>
        
        <Header title="Cadastrar novo produto" withGoBack/>

        <Divider />

        <Content>
          <CreateProductForm />
        </Content>
      </WithAuth>

    </>
  )
}