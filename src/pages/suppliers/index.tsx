import { useState, ChangeEvent } from 'react'

import Head from 'next/head'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { Modal } from '../../components/Modal'
import { NewUserForm } from '../../components/NewUserForm'
import { SuppliersList } from '../../components/SuppliersList'

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

import useDebounce from '../../hooks/useDebounce'

export default function Suppliers() {   
  const { isOpen, onClose, onOpen } = useDisclosure()
  
  const [searchValue, setSearchValue] = useState('')  
  
  const debouncedSearch = useDebounce(searchValue, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const handleClearFilter = () => setSearchValue('')

  const handleModalOpen = () => {
    console.log(queryClient.getQueryData('suppliers[]', { exact: true }))
    // onOpen()
  }

  return (
    <>
      <Head>
        <title>MARCA | Fornecedores</title>        
      </Head>
      <Layout>
        
        <Flex align="center">
          <Heading>Fornecedores</Heading>
          <Spacer />          
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
          
          <SuppliersList filterValue={debouncedSearch}/>

        </Content>
        
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar novo fornecedor"
      >
        <NewUserForm userType="Fornecedor" onClose={onClose}/>
      </Modal>
    </>
  )
}
