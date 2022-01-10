import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { AuthWrapper } from '../../../components/AuthWrapper'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'
import { Content } from '../../../components/Content'
import { UpdateProductForm } from '../../../components/pages/Products/UpdateProductForm'

import { useProductQuery } from '../../../hooks/useProductQuery'

import {      
  Text,
  VStack,
  Skeleton,
  HStack
 } from '@chakra-ui/react'

 type Props = {
   params: {
     id: string
   }
 }

export default function Product({ params }: Props) {  
  const { id } = params

  const { data, isLoading, isError } = useProductQuery(id)

  return (
    <>
      <Head>
        <title>{data?.nome ? `MARCA` : `${data.nome} | MARCA`}</title>
      </Head>
      <AuthWrapper>
        <Header withGoBack title={data?.nome} />
        <Divider />
        <Content>
          { isLoading ? (
            <VStack spacing={3}>
              <Skeleton h="10" w="200px" borderRadius="md" alignSelf="flex-end" mb="8"/>        
              <HStack spacing={3} w="100%">
                <Skeleton h="12" w="100%" borderRadius="md"/>
                <Skeleton h="12" w="200px" borderRadius="md"/>
              </HStack>
              <Skeleton h="12" w="100%" borderRadius="md"/>
            </VStack>
          ) : isError ? (
            <Text>Erro ao carregar as informações...</Text>
          ) : (
            <UpdateProductForm product={data} />          
          )}
        </Content>

      </AuthWrapper>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
