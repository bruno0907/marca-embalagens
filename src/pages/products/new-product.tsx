import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { CreateProductModule } from '../../modules'

export default function NewProduct() {
  return (
    <>
      <Head>
        <title>Cadastrar novo produto</title>        
      </Head>
      <AuthWrapper>        
        <CreateProductModule />      
      </AuthWrapper>
    </>
  )
}