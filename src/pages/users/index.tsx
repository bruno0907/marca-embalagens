import { ChangeEvent, useState, useRef } from 'react'

import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { Modal } from '../../components/Modal'
import { NewUserForm } from '../../components/NewUserForm'

import {  
  Flex,   
  Button,
  Icon,
  Heading,  
  Input,  
  InputGroup,
  InputLeftElement,  
  useDisclosure,  
  Spacer
} from '@chakra-ui/react'

import { FiPlus, FiSearch } from 'react-icons/fi'

import { useUsers } from '../../hooks/useUsers'
import { UsersList } from '../../components/UsersList'
import { queryClient } from '../../services/queryClient'

export default function Users() {   
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [filterValue, setFilterValue] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const { data: users, error, isLoading, isFetching } = useUsers('Cliente', filterValue)

  const handleFilter = () => {
    setTimeout(() => {
      setFilterValue(searchInputRef.current.value)
    }, 500)
  }

  const handleModalOpen = () => {
    onOpen()
  }
  
  return (
    <>
      <Head>
        <title>MARCA | Clientes</title>        
      </Head>
      <Layout>

        <Flex align="center">
          <Heading>Clientes</Heading>
          <Spacer />          
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
          
          <InputGroup mb="8">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.500" />
            </InputLeftElement>
            <Input 
              placeholder="Digite sua pesquisa aqui..."
              ref={searchInputRef}
              onChange={handleFilter}
            />            
          </InputGroup>            
          
          <UsersList 
            users={users}
            isFetching={isFetching}
            isLoading={isLoading}
            error={error}
          />

        </Content>
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar novo cliente"
      >
        <NewUserForm userType="Cliente" onClose={onClose}/>
      </Modal>
    </>
  )
}
