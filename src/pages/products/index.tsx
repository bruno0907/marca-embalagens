import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head'
import NextLink from 'next/link'

import { supabase } from '../../services/supabase'

import { Layout } from '../../components/Layout'
import { Content } from '../../components/Content'
import { Divider } from '../../components/Divider'

import {    
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,    
  Heading,
  Flex,
  Box,
  Button,
  Icon,
  Badge,  
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

interface UsersProps {
  user: UserProps;
}

type UserProps = {
  id: string;
}

interface ProductProps {
  user_id: string;
}

export default function Products({ user }: UsersProps) {  
  const router = useRouter()

  const [products, setProducts] = useState<ProductProps[]>([])  

  useEffect(() => {
    //TODO: setProducts com a listagem de produtos

  }, [])

  // return !products ? <Loader /> : (
    return (
    <>
      <Head>
        <title>Marca | Produtos</title>
        <meta name="description" content="Página dos produtos da Marka" />
      </Head>
      <Layout>
        <Flex justify="space-between">
          <Heading>Produtos</Heading>
          <NextLink href="/users/new-user" passHref>
            <Button
              as="a"
              colorScheme="blue"
              lineHeight="base"
              leftIcon={<Icon as={FiPlus} />}
            >
              Cadastrar novo produto
            </Button>
          </NextLink>
        </Flex>  
        <Divider />
        <Content>

          <Table colorScheme="gray" variant="striped" bgColor="gray.50">
            <Thead>
              <Tr>                  
                <Th>Produto</Th>
                <Th>Descrição</Th>
                <Th>Status</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
              <Tbody>
                { [1, 2, 3].map((_, index) => {
                    return (
                      <Tr key={index} onClick={() => router.push(`/products/`)} _hover={{ textDecor: 'underline', cursor: 'pointer' }}>
                        <Td>Etiqueta Branca</Td>
                        <Td>Etiqueta branca térmica limpa 6x10 rolo 30m</Td>
                        <Td w="36">{
                          index === 2
                          ? <Badge variant="subtle" colorScheme="red" py="1" px="4" borderRadius="md">Inativo</Badge> 
                          : <Badge variant="subtle" colorScheme="blue" py="1" px="4" borderRadius="md">Ativo</Badge>
                          }
                        </Td>   
                        <Td>R$ 30,00</Td>                        
                      </Tr>
                    )
                  })
                }
              </Tbody>
          </Table>
        </Content>
      </Layout>
    </>
  )
}
