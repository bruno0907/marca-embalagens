import Head from 'next/head'
import { HomeModule } from '../modules';

export default function Home () {
  return (
    <>
      <Head>
        <title>Seja bem-vindo</title>
      </Head>
      <HomeModule />
    </>
  )
}
