import { useEffect, useState } from 'react'
import { GetServerSideProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

import { supabase } from '../../services/supabase'

import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'
import { Loader } from '../../components/Loader'

import { FiEdit, FiPlus, FiX } from 'react-icons/fi'

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
  useToast
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
  const toast = useToast()
  const [usersList, setUsersList] = useState<UsersListProps[]>(null)

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

      const currentUsersList = [...usersList]

      const updatedUsersList = currentUsersList.filter(user => user.id !== id)

      setUsersList(updatedUsersList)

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
    async function getUsers() {
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
      <Flex p="8" flexDir="column">
        <Header title="Marka" />
        <Flex pt="16">
          <SideMenu />
          <Flex ml="16" flex="1" flexDir="column" bgColor="gray.100" p="8" borderRadius="8">
            <Flex justifyContent="space-between" mb="16">
              <Heading>Clientes </Heading>
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
                        </Tr>
                      )
                  }) }
                </Tbody>
            </Table>
          </Flex>
        </Flex>
      </Flex>
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