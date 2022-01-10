import Head from 'next/head'

import { Header } from '../../components/Header'
import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { CreateUserForm } from '../../components/pages/Users/CreateUserForm'

export default function NewUser() {
  return (
    <>
      <Head>
        <title>MARCA | Novo Cliente</title>        
      </Head>
      <AuthWrapper>        
        <Header title="Novo Cliente" withGoBack/>
        <Divider />
        <Content>
          <CreateUserForm />
        </Content>
      </AuthWrapper>
    </>
  )
}