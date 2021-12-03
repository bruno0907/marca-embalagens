import Head from 'next/head'

import { Header } from '../../../components/Header'
import { WithAuth } from '../../../components/WithAuth'
import { Divider } from '../../../components/Divider'
import { Content } from '../../../components/Content'
import { CreateUserForm } from './components/CreateUserForm'

export default function NewUser() {
  return (
    <>

      <Head>
        <title>MARCA | Novo Cliente</title>        
      </Head>
      <WithAuth>
        
        <Header title="Novo Cliente" withGoBack/>

        <Divider />

        <Content>
          <CreateUserForm />
        </Content>
      </WithAuth>

    </>
  )
}