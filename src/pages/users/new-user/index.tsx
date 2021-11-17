import Head from 'next/head'

import { Header } from '../../../components/Header'
import { Layout } from '../../../components/Layout'
import { Divider } from '../../../components/Divider'
import { Content } from '../../../components/Content'
import { CreateUserForm } from './components/CreateUserForm'

export default function NewUser() {
  return (
    <>

      <Head>
        <title>MARCA | Novo Cliente</title>        
      </Head>
      <Layout>
        
        <Header title="Novo Cliente" withGoBack/>

        <Divider />

        <Content>
          <CreateUserForm />
        </Content>
      </Layout>

    </>
  )
}