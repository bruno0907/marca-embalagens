import Head from 'next/head'

import { Header } from '../../components/Header'
import { WithAuth } from '../../components/WithAuth'
import { Divider } from '../../components/Divider'
import { CreateEstimateForm } from '../../components/pages/Estimates/CreateEstimateForm'

export default function NewEstimate() {
  return (
    <>
      <Head>
        <title>Novo orçamento | MARCA</title>
      </Head>

      <WithAuth>
        
        <Header title="Novo orçamento" withGoBack/>

        <Divider />
        
        <CreateEstimateForm />        
        
      </WithAuth> 
    </>   
  )
}