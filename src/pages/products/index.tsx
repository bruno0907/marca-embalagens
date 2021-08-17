import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { supabase } from '../../services/supabase'

import { Content } from '../../components/Content'

import {    
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,  
  Text,
  Heading,
  Flex,
  Button,
  Icon,
  Box
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
      <Content>
        <Box bgColor="gray.100" p="8" borderRadius="8">
          <Flex justifyContent="space-between" mb="16">
            <Heading>Produtos</Heading>
            <NextLink href="/users/new-user" passHref>
              <Button as="a" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiPlus} />}>Cadastrar novo cliente</Button>
            </NextLink>
          </Flex>  
          <Table colorScheme="blue" variant="striped">
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
                          ? <Text color="gray.500" fontWeight="500">Inativo</Text> 
                          : <Text color="blue.500" fontWeight="500">Ativo</Text>
                          }
                        </Td>   
                        <Td>R$ 30,00</Td>                        
                      </Tr>
                    )
                  })
                }
              </Tbody>
          </Table>
        </Box>
      </Content>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(!user) { 
    return {
      props: {},
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  } 
  
  return {
    props: { user }
  }
}