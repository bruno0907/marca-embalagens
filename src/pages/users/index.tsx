import { useEffect, useState } from 'react'

import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { supabase } from '../../services/supabase'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { UserModal } from '../../components/UserModal'

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
  Badge,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

type UserProps = {
  id: string;
  user_id: string;
  user_type: string;
  name: string;
  email: string;
  phone_number: string;
  mobile_number: string;
  status: boolean;
}

export default function Users() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  const toast = useToast()
  const [users, setUsers] = useState<UserProps[]>(null)
  const [user, setUser] = useState<UserProps>(null)

  // async function handleDeleteUser (id: string) {
  //   try {
  //     const { error } = await supabase
  //       .from('users')
  //       .delete()
  //       .eq('id', id)

  //     if (error) throw new Error('Não foi possível excluir o registro do cliente')

  //     await supabase
  //       .from('addresses')
  //       .delete()
  //       .eq('user_id', id)        

  //     const currentUsersList = [...usersData]

  //     const updatedUsersList = currentUsersList.filter(user => user.id !== id)

  //     setUsersData(updatedUsersList)

  //     toast({      
  //       description: 'Usuário excluído com sucesso',
  //       status: 'success',
  //       duration: 3000
  //     })
      
  //   } catch (error){
  //     toast({
  //       title: 'Houve um erro',
  //       description: error.message,
  //       status: 'error',
  //       duration: 3000
  //     })

  //   }
  // }

  useEffect(() => {
    const user = supabase.auth.user()

    async function fetchUsers() {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
      setUsers(data)
    }
    fetchUsers()

  }, [])

  return (
    <>
      <Head>
        <title>MARCA | Clientes</title>
        <meta name="description" content="Lista de clientes cadastrados" />
      </Head>
      <Layout>        
        <Flex justify="space-between">
          <Heading>Clientes</Heading>
          <NextLink href="/users/new-user" passHref>
            <Button as="a" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiPlus} />}>Cadastrar novo cliente</Button>
          </NextLink>
        </Flex> 
        <Divider />
        <Content>
          <Table colorScheme="gray" variant="striped">
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
              { !users 
                ? <Tr>
                    <Td>
                      <Spinner size="sm" color="blue.500" mr="2"/>
                      Carregando...
                    </Td>
                    <Td/>
                    <Td/>
                    <Td/>
                    <Td/>
                  </Tr>
                : users.map(user => {
                    return (
                      <Tr key={user.id} onClick={() => router.push(`/users/${user.id}`)} _hover={{ textDecor: 'underline', cursor: 'pointer' }}>
                        <Td>{user.name}</Td>
                        <Td>{user.phone_number}</Td>
                        <Td>{user.mobile_number}</Td>
                        <Td>{user.email}</Td>                            
                        <Td w="36">{
                          user.status === false                         
                            ? <Badge variant="subtle" colorScheme="red" py="1" px="4" borderRadius="md">Inativo</Badge> 
                            : <Badge variant="subtle" colorScheme="blue" py="1" px="4" borderRadius="md">Ativo</Badge>
                          }
                        </Td>                           
                      </Tr>
                    )
                  }
                )
              }
            </Tbody>
          </Table>
        </Content>        
      </Layout>
      <UserModal 
        isOpen={isOpen}
        onClose={onClose}
        user={user}
      />
    </>
  )
}
