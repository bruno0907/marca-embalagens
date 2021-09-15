import { useState, useRef } from 'react'

import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { Modal } from '../../components/Modal'
import { NewUserForm } from '../../components/NewUserForm'
import { UsersList } from '../../components/UsersList'

import {  
  Flex,   
  Button,
  Icon,
  Heading,  
  Input,  
  InputGroup,
  InputLeftElement,  
  InputRightElement,
  useDisclosure,  
  Spacer
} from '@chakra-ui/react'

import { FiPlus, FiSearch, FiX } from 'react-icons/fi'
import { queryClient } from '../../services/queryClient'

export default function Users() {   
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [filterValue, setFilterValue] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleFilter = () => {
    setTimeout(() => {
      setFilterValue(searchInputRef.current.value)
    }, 500)
  }

  const handleClearFilter = () => {
    searchInputRef.current.value = ''
    setFilterValue('')
  }

  const handleModalOpen = () => {
    console.log(queryClient.getQueryData('user[]'))
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
            { !!searchInputRef.current?.value.length &&
              <InputRightElement 
                cursor="pointer" 
                onClick={handleClearFilter}
                _hover={{
                svg: {
                  color: 'gray.700'
                }
              }}>
                <Icon as={FiX} color="gray.500" fontSize="18px" />
              </InputRightElement>         
            }   
          </InputGroup>            
          
          <UsersList filterValue={filterValue}/>

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
