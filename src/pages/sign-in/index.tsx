import Head from 'next/head'
import { SignInModule } from '../../modules'

export default function SignIn () {
  return (
    <>
      <Head>
        <title>Entrar</title>
      </Head>
      <SignInModule />
    </>
  )
}
