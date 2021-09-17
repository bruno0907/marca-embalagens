import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'

import {   
  Heading,
  Text
 } from '@chakra-ui/react'

export default function Product() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        Marca | Página do Produto
      </Head>

      <Layout>

        <Header withGoBack title="Produto" />

        <Divider />

        <Content>
          <Heading>Produto</Heading>
          <Text>{id}</Text>
        </Content>

      </Layout>
    </>
  )
}