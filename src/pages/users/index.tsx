import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

import { supabase } from '../../services/supabase'

import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'
import { Loader } from '../../components/Loader'

import { FiEdit, FiPlus, FiX } from 'react-icons/fi'

import {
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
} from '@chakra-ui/react'


interface UsersProps {
  user: UserProps;
}

type UserProps = {
  id: string;
}

interface UsersListProps {
  id: string;
  user_id: string;
  user_type: string;
  name: string;
  email: string;
  phone_number: string;
  mobile_number: string;
}

export default function Users({ user }: UsersProps) {
  const [usersList, setUsersList] = useState<UsersListProps[]>(null)

  useEffect(() => {
    async function getUsers () {
      const { data, error } = await supabase
        .from<UsersListProps>('users')
        .select(`*`)
        .eq(`user_id`, user.id)
        .eq('user_type', 'Cliente')
      
      setUsersList(data)
    }

    getUsers()

  }, [user.id])  

  return !usersList ? <Loader /> : (
    <>
      <Head>
        <title>Marka | CLientes</title>
        <meta name="description" content="Dashboard da plataforma da Marka" />
      </Head>
      <Box p="8" display="flex" flexDir="column">
        <Header title="Marka" />
        <Box display="flex" pt="16">
          <SideMenu />
          <Box ml="16" display="flex" flex="1" flexDir="column" bgColor="gray.100" p="8" borderRadius="8">
            <Box display="flex" justifyContent="space-between" mb="16">
              <Heading>Clientes </Heading>
              <NextLink href="/users/new-user" passHref>
                <Button as="a" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiPlus} />}>Cadastrar novo cliente</Button>
              </NextLink>
            </Box>        
              <Table colorScheme="blue" variant="striped">
                <Thead>
                  <Tr>                  
                    <Th>Nome</Th>
                    <Th>Telefone</Th>
                    <Th>Celular</Th>
                    <Th>E-mail</Th>
                    <Th />
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>
                  { 
                    usersList.map(user => {
                      return (
                        <Tr key={user.id}>
                          <Td>{user.name}</Td>
                          <Td>{user.phone_number}</Td>
                          <Td>{user.mobile_number}</Td>
                          <Td>{user.email}</Td>
                          <Td w="36">
                            <NextLink href={`/users/${user.id}`} passHref>
                              <Button as="a" size="sm" fontSize="sm" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiEdit}/>}>Editar</Button>
                            </NextLink>
                          </Td>
                          <Td w="36">
                            <Button as="a" size="sm" fontSize="sm" lineHeight="base" colorScheme="blue" leftIcon={<Icon as={FiX}/>}>Excluir</Button>
                          </Td>
                        </Tr>
                      )
                  }) }
                </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
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