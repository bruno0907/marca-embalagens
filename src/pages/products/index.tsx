import Head from 'next/head'
import { AuthWrapper } from '../../components'
import { ProductsModule } from '../../modules'

export default function Products() {

  return (
    <>
      <Head>
        <title>Produtos</title>        
      </Head>
      <AuthWrapper>
        <ProductsModule />
      </AuthWrapper>
    </>
  )
}
