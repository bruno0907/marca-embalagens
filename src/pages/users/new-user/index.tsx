import Head from 'next/head'

import { Header } from '../../../components/Header'
import { Authenticated } from '../../../components/Layout/Authenticated'
import { Divider } from '../../../components/Layout/Divider'
import { Content } from '../../../components/Layout/Content'
import { CreateUserForm } from './components/CreateUserForm'

export default function NewUser() {
  return (
    <>

      <Head>
        <title>MARCA | Novo Cliente</title>        
      </Head>
      <Authenticated>
        
        <Header title="Novo Cliente" withGoBack/>

        <Divider />

        <Content>
          <CreateUserForm />
        </Content>
      </Authenticated>

    </>
  )
}