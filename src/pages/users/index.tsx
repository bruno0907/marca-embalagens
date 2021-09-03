import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { supabase } from '../../services/supabase'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { Modal } from '../../components/Modal'
import { NewUserForm } from '../../components/NewUserForm'

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
  Spinner,
  Stack,
  Input,  
  InputGroup,
  InputLeftElement,  
  useDisclosure,  
} from '@chakra-ui/react'

import { FiPlus, FiSearch } from 'react-icons/fi'

import { UserProps } from '../../types'

export default function Users() {
  const router = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [users, setUsers] = useState<UserProps[]>(null)

  function handleModalOpen() {
    onOpen()
  }

  useEffect(() => {
    const user = supabase.auth.user()

    async function fetchUsers() {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .eq('tipo_cliente', 'Cliente')
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
          <Button
            colorScheme="blue"
            lineHeight="base"
            leftIcon={<Icon as={FiPlus}/>}
            onClick={handleModalOpen}
          >
            Cadastrar novo cliente
          </Button>
        </Flex> 
        <Divider />
        <Content>
          <Stack direction={['column', 'row']} align="center" spacing={3} mb="8">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.500" />
              </InputLeftElement>
              <Input placeholder="Digite sua pesquisa aqui..." />
            </InputGroup>            
          </Stack>
          <Table colorScheme="gray" variant="striped" >
            <Thead>
              <Tr bgColor="blue.500">
                <Th color="gray.50">Nome</Th>
                <Th color="gray.50">Telefone</Th>
                <Th color="gray.50">Celular</Th>
                <Th color="gray.50">E-mail</Th>
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
                      <Tr key={user.id} fontWeight="medium" onClick={() => router.push(`/users/${user.id}`)} _hover={{ cursor: 'pointer', color: 'blue.500' }}>
                        <Td>{user.nome}</Td>                        
                        <Td>{user.telefone}</Td>
                        <Td>{user.celular}</Td>
                        <Td>{user.email}</Td>   
                      </Tr>
                    )
                  }
                )
              }
            </Tbody>
          </Table>
        </Content>
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <NewUserForm userType="Cliente" onClose={onClose}/>
      </Modal>
    </>
  )
}
