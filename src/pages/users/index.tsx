import Head from 'next/head'
import { useRouter } from 'next/router'

import { WithAuth } from '../../components/WithAuth'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { UsersList } from '../../components/pages/Users/UsersList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import {    
  Button,
  Icon,  
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

export default function Users() {     
  const router = useRouter()    
  
  const { 
    toSearch,
    clearSearch,
    handleSearch,
    searchValue,
    searchInputRef 
  } = useSearch()

  return (
    <>
      <Head>
        <title>MARCA | Clientes</title>        
      </Head>

      <WithAuth>
        
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
          <SearchInput
            ref={searchInputRef}
            placeholder="Pesquise pelo nome do cliente..."
            onClearSearch={clearSearch}
            hasSearch={!!searchValue}
            value={searchValue}
            onChange={handleSearch}
          />      
          
          <UsersList filterValue={toSearch}/>

        </Content>
        
      </WithAuth>
    </>
  )
}
