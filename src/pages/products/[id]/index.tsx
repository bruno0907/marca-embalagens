import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { AuthWrapper } from '../../../components'
import { ProductModule } from '../../../modules'

 type Props = {
   params: {
     id: string
   }
 }

export default function Product({ params }: Props) {  
  const { id } = params  

  return (          
    <>
      <Head>
        <title>Produto</title>
      </Head>
      <AuthWrapper>       
        <ProductModule productId={id} />          
      </AuthWrapper>
    </>
    
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
