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

interface OrdersProps {
  user_id: string;
}

export default function Orders({ user }: UsersProps) {
  const toast = useToast()
  const [orders, setOrders] = useState<OrdersProps[]>([])

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

  //     const currentUsersList = [...usersList]

  //     const updatedUsersList = currentUsersList.filter(user => user.id !== id)

  //     setUsersList(updatedUsersList)

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

  // useEffect(() => {
  //   async function getSuppliers() {
  //     const { data, error } = await supabase
  //       .from<OrdersProps>('suppliers')
  //       .select(`*`)
  //       .eq(`user_id`, user.id)        
      
  //     setOrders(data)
  //   }
  //   getSuppliers()

  // }, [user.id])

  // return !suppliers ? <Loader /> : (
    return (
    <>
      <Head>
        <title>Marka | Pedidos</title>
        <meta name="description" content="Página de pedidos da Marka" />
      </Head>
      <Flex p="8" flexDir="column">
        <Header title="Marka" />
        <Flex pt="16">
          <SideMenu />
          <Flex ml="16" flex="1" flexDir="column" bgColor="gray.100" p="8" borderRadius="8">
            <Flex justifyContent="space-between" mb="16">
              <Heading>Pedidos</Heading>
              <NextLink href="/users/new-order" passHref>
                <Button as="a" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiPlus} />}>Cadastrar novo pedido</Button>
              </NextLink>
            </Flex>        
              <Table colorScheme="blue" variant="striped">
                <Thead>
                  <Tr>                  
                    <Th w="32">Pedido</Th>
                    <Th w="32">Data</Th>
                    <Th>Cliente</Th>
                    <Th w="32">Valor</Th>                    
                    <Th w="38"/>                    
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr key="1">
                    <Td>0001</Td>
                    <Td>15/08/2021</Td>
                    <Td>Bruno Mariani</Td>
                    <Td>R$1500,00</Td>
                    <Td w="36">
                      <NextLink href={`/users/${user.id}`} passHref>
                        <Button as="a" size="sm" fontSize="sm" colorScheme="blue" lineHeight="base" leftIcon={<Icon as={FiEdit}/>}>Editar</Button>
                      </NextLink>
                    </Td>                          
                  </Tr>
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