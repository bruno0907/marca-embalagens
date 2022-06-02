import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { AuthWrapper } from '../../../components'
import { DraftModule } from '../../../modules'

type Props = {
  params: {
    id: string;
  }
}

export default function DraftRoute({ params }: Props) {  
  const { id } = params 

  return (    
    <>
      <Head>
        <title>Orçamento</title>
      </Head>
      <AuthWrapper>        
        <DraftModule draftId={id} />
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
