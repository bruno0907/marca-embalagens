import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'

import {  
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,  
  Button,
  Icon,
  Heading,    
} from '@chakra-ui/react'

import {FiPlus} from 'react-icons/fi'

export default function Orders() {  
  return (
    <>
      <Head>
        <title>Marca | Pedidos</title>        
      </Head>

      <Layout>

        <Header title="Pedidos">
          <Button 
            colorScheme="blue"
            leftIcon={<Icon as={FiPlus} />}
          >
            Cadastrar novo pedido
          </Button>
        </Header>

        <Divider />

        <Content>
          
        </Content>

      </Layout>
    </>
  )
}
