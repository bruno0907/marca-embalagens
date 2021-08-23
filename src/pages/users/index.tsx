import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

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
  useToast, 
  Text,
} from '@chakra-ui/react'

interface UsersProps {
  data: UsersDataProps[];
}

interface UsersDataProps {
  id: string;
  user_id: string;
  user_type: string;
  name: string;
  email: string;
  phone_number: string;
  mobile_number: string;
  status: boolean;
}

export default function Users({ data }: UsersProps) {
  const router = useRouter()
  const toast = useToast()

  const [usersData, setUsersData] = useState<UsersDataProps[]>(null)

  async function handleDeleteUser (id: string) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

      if (error) throw new Error('Não foi possível excluir o registro do cliente')

      await supabase
        .from('addresses')
        .delete()
        .eq('user_id', id)

      const currentUsersList = [...usersData]

      const updatedUsersList = currentUsersList.filter(user => user.id !== id)

      setUsersData(updatedUsersList)

      toast({      
        description: 'Usuário excluído com sucesso',
        status: 'success',
        duration: 3000
      })
      
    } catch (error){
      toast({
        title: 'Houve um erro',
        description: error.message,
        status: 'error',
        duration: 3000
      })

    }
  }

  useEffect(() => {
    setUsersData(data)

  }, [data])

  return !usersData ? <Loader /> : (
    <>
      <Head>
        <title>MARCA | Clientes</title>
        <meta name="description" content="Dashboard da plataforma da Marka" />
      </Head>
      <Layout>
        <Box bgColor="gray.100" p="8" borderRadius="8">
          <Flex justify="space-between" mb="16">
            <Heading>Clientes</Heading>
            <NextLink href="/users/new-user" passHref>
              <Button as="a" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiPlus} />}>Cadastrar novo cliente</Button>
            </NextLink>
          </Flex>        
          <Table colorScheme="blue" variant="striped">
            <Thead>
              <Tr>                  
                <Th>Nome</Th>
                <Th>Telefone</Th>
                <Th>Celular</Th>
                <Th>E-mail</Th>
                <Th>Situação</Th>                                     
              </Tr>
            </Thead>
              <Tbody>
                { usersData.map(user => {
                    return (
                      <Tr key={user.id} onClick={() => router.push(`/users/${user.id}`)} _hover={{ textDecor: 'underline', cursor: 'pointer' }}>
                        <Td>{user.name}</Td>
                        <Td>{user.phone_number}</Td>
                        <Td>{user.mobile_number}</Td>
                        <Td>{user.email}</Td>                            
                        <Td w="36">{
                          user.status === false 
                          ? <Text color="gray.500" fontWeight="500">Inativo</Text> 
                          : <Text color="blue.500" fontWeight="500">Ativo</Text>
                          }
                        </Td>                           
                      </Tr>
                    )
                  })
                }
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
  
  const { data } = await supabase
    .from<UsersDataProps>('users')
    .select(`*`)
    .eq(`user_id`, user.id)
    .eq('user_type', 'Cliente')

  if(!data) {
    return {
      props: {}
    }
  } 
  
  return {
    props: { 
      data 
    }
  }
}
