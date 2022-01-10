import Head from 'next/head'

import { Header } from '../../components/Header'
import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'
import { CreateEstimateForm } from '../../components/pages/Estimates/CreateEstimateForm'

export default function NewEstimate() {
  return (
    <>
      <Head>
        <title>Novo orçamento | MARCA</title>
      </Head>
      <AuthWrapper>        
        <Header title="Novo orçamento" withGoBack/>
        <Divider />        
        <CreateEstimateForm />                
      </AuthWrapper>
    </>   
  )
}