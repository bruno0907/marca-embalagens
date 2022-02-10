import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { AuthWrapper } from '../../../components'
import { SupplierModule } from '../../../modules'

type Props = {
  params: {
    id: string
  }
}

export default function Supplier({ params }: Props) {
  const { id } = params

  return (
    <>
      <Head>
        <title>Fornecedor</title>
      </Head>
      <AuthWrapper>
        <SupplierModule supplierId={id}/>
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
