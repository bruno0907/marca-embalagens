import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

import { supabase } from '../../services/supabase'

import { Layout } from '../../components/Layout'
import { Loader } from '../../components/Loader'

import { FiPlus } from 'react-icons/fi'

import {  
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,  
  Button,
  Icon,
  Heading,
  useToast
} from '@chakra-ui/react'


interface UsersProps {
  user: UserProps;
}

type UserProps = {
  id: string;
}

interface SuppliersProps {
  user_id: string;
}

export default function Suppliers({ user }: UsersProps) {
  const toast = useToast()
  const [suppliers, setSuppliers] = useState<SuppliersProps[]>([])  

  useEffect(() => {
    //TODO: setSuppliers com os dados dos fornecedores

  }, [])

  // return !suppliers ? <Loader /> : (
    return (
    <>
      <Head>
        <title>Marka | Fornecedores</title>
        <meta name="description" content="Página de fornecedores da Marka" />
      </Head>
      <Layout>
        <Box bgColor="gray.100" p="8" borderRadius="8">
          <Flex justify="space-between" mb="16">
            <Heading>Fornecedores</Heading>
              <NextLink href="/users/new-supplier" passHref>
              <Button as="a" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiPlus} />}>Cadastrar novo fornecedor</Button>
            </NextLink>
          </Flex>        
          <Table colorScheme="blue" variant="striped">
            <Thead>
              <Tr>                  
                <Th>Nome</Th>
                <Th>Produto</Th>
                <Th>Telefone</Th>
                <Th>Celular</Th>                                 
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Marka Comércio de etiquetas</Td>
                <Td>Etiquetas</Td>
                <Td>47 99909-6008</Td>
                <Td>47 99909-6008</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Layout>
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