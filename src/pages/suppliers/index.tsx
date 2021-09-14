import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

import { supabase } from '../../services/supabase'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { Modal } from '../../components/Modal'
import { NewUserForm } from '../../components/NewUserForm'

import { FiPlus, FiSearch } from 'react-icons/fi'

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
  useDisclosure,
  Spinner,
  Stack,
  InputGroup,
  InputLeftElement,
  Input
} from '@chakra-ui/react'

import { UserProps } from '../../types'

export default function Suppliers() {
  const router = useRouter()
  const { onOpen, isOpen, onClose } = useDisclosure()  
  const [suppliers, setSuppliers] = useState<UserProps[]>([])  

  function handleModalOpen() {
    onOpen()
  }

  useEffect(() => {    
    async function fetchUsers() {      
      const user = supabase.auth.user()

      if(user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', user.id)
          .eq('tipo_cliente', 'Fornecedor')
          setSuppliers(data)
      }
      return
    }
    fetchUsers()

  }, [])
  
  return (
    <>
      <Head>
        <title>Marka | Fornecedores</title>
        <meta name="description" content="Página de fornecedores da Marka" />
      </Head>
      <Layout>        
        <Flex justify="space-between">
          <Heading>Fornecedores</Heading>            
          <Button
            colorScheme="blue"
            lineHeight="base"
            leftIcon={<Icon as={FiPlus}/>}
            onClick={handleModalOpen}
          >
            Cadastrar novo fornecedor
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
              { !suppliers 
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
                : suppliers.map(supplier => {
                    return (
                      <Tr key={supplier.id} fontWeight="medium" onClick={() => router.push(`/users/${supplier.id}`)} _hover={{ cursor: 'pointer', color: 'blue.500' }}>
                        <Td>{supplier.nome}</Td>                        
                        <Td>{supplier.telefone}</Td>
                        <Td>{supplier.celular}</Td>
                        <Td>{supplier.email}</Td>   
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
        title="Novo fornecedor"
        isOpen={isOpen}
        onClose={onClose}        
      >
        <NewUserForm userType="Fornecedor" onClose={onClose} />
      </Modal>
    </>
  )
}
