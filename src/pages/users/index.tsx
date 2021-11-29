import { useState, ChangeEvent } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import useDebounce from '../../hooks/useDebounce'

import { Authenticated } from '../../components/Layout/Authenticated'
import { Divider } from '../../components/Layout/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Layout/Content'
import { UsersList } from './components/UsersList'

import {    
  Button,
  Icon,  
  Input,  
  InputGroup,
  InputLeftElement,  
  InputRightElement,
} from '@chakra-ui/react'

import { FiPlus, FiSearch, FiX } from 'react-icons/fi'

export default function Users() {     
  const router = useRouter()
  
  const [searchValue, setSearchValue] = useState('')  
  
  const debouncedSearch = useDebounce(searchValue, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const handleClearFilter = () => setSearchValue('')

  return (
    <>
      <Head>
        <title>MARCA | Clientes</title>        
      </Head>

      <Authenticated>
        
        <Header title="Clientes">
          <Button
            colorScheme="blue"
            leftIcon={<Icon as={FiPlus}/>}
            onClick={() => router.push('/users/new-user')}
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
              borderColor="gray.300"
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
        
      </Authenticated>
    </>
  )
}
