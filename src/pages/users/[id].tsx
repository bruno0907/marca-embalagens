import Head from 'next/head'

import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'

import { 
  Flex,
  Heading
} from '@chakra-ui/react'

export default function User() {
  return (
    <>
      <Head>
        <title>MARCA | Novo Cliente</title>
        <meta name="description" content="Página de cadastro de novo cliente" />
      </Head>
      <Flex p="8">
        <Header />
        <Flex flexDir="row">
          <SideMenu />
          <Flex p="8">
            <Heading>Tela dos dados do Cliente</Heading>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
