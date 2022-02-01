import Head from 'next/head'

import { Header } from '../../components/Header'
import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'
import { CreateProductForm } from '../../components/pages/Products/CreateProductForm'
import { Section } from '../../components/Section'

export default function NewProduct() {
  return (
    <>
      <Head>
        <title>Cadastrar novo produto | MARCA</title>        
      </Head>
      <AuthWrapper>        
        <Header title="Cadastrar novo produto" withGoBack/>
        <Divider />        
        <CreateProductForm />        
      </AuthWrapper>
    </>
  )
}