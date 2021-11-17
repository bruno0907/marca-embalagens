import Head from 'next/head'

import { Header } from '../../../components/Header'
import { Authenticated } from '../../../components/Layout/Authenticated'
import { Divider } from '../../../components/Layout/Divider'
import { Content } from '../../../components/Layout/Content'
import { CreateProductForm } from './components/CreateProductForm'

export default function NewProduct() {
  return (
    <>

      <Head>
        <title>MARCA | Cadastrar novo produto</title>        
      </Head>
      <Authenticated>
        
        <Header title="Cadastrar novo produto" withGoBack/>

        <Divider />

        <Content>
          <CreateProductForm />
        </Content>
      </Authenticated>

    </>
  )
}