import { useState, ChangeEvent } from 'react'

import Head from 'next/head'

import useDebounce from '../../hooks/useDebounce'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { Modal } from '../../components/Modal'
import { CreateUserForm } from '../../components/CreateUserForm'
import { UsersList } from '../../components/UsersList'

import {    
  Button,
  Icon,
  Heading,  
  Input,  
  InputGroup,
  InputLeftElement,  
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'

import { FiPlus, FiSearch, FiX } from 'react-icons/fi'

export default function Users() {   
  const { isOpen, onClose, onOpen } = useDisclosure()
  
  const [searchValue, setSearchValue] = useState('')  
  
  const debouncedSearch = useDebounce(searchValue, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const handleClearFilter = () => setSearchValue('')

  const handleModalOpen = () => {    
    onOpen()
  }

  return (
    <>
      <Head>
        <title>MARCA | Clientes</title>        
      </Head>
      <Layout>
        
        <Header title="Clientes">
          <Button
            colorScheme="blue"
            leftIcon={<Icon as={FiPlus}/>}
            onClick={handleModalOpen}
          >
            Cadastrar novo cliente
          </Button>
        </Header>

        <Divider />

        <Content>
          
          <InputGroup mb="8">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.500" />
            </InputLeftElement>
            <Input 
              placeholder="Digite sua pesquisa aqui..."
              value={searchValue}              
              onChange={handleChange}
            />
            { !!searchValue &&
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
          
          <UsersList filterValue={debouncedSearch}/>

        </Content>
        
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar novo cliente"
      >
        <CreateUserForm onClose={onClose}/>
      </Modal>
    </>
  )
}
