import Head from 'next/head'
import { useRouter } from 'next/router'

import { WithAuth } from '../../../components/WithAuth'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'
import { Content } from '../../../components/Content'
import { UpdateProductForm } from './components/UpdateProductForm'

import { useProductQuery } from '../../../hooks/useProductQuery'

import {   
  Center,
  Spinner,
  Text,
 } from '@chakra-ui/react'

export default function Product() {
  const router = useRouter()
  const { id } = router.query

  const product = useProductQuery(String(id))

  if(product.isLoading) {
    return (
      <Center my="8" h="100vh">
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(product.isError) {
    return (
      <Center my="8" h="100vh">
        <Text>Erro ao carregar as informações...</Text>
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>MARCA | {product.data.nome}</title>
      </Head>

      <WithAuth>

        <Header withGoBack title={product.data.nome} />

        <Divider />

        <Content>
          <UpdateProductForm product={product.data} isFetching={product.isFetching} />          
        </Content>

      </WithAuth>
    </>
  )
}