import Head from 'next/head'
import { useRouter } from 'next/router'

import { WithAuth } from '../../components/WithAuth'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { SuppliersList } from './components/SuppliersList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import {    
  Button,
  Icon,   
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

export default function Suppliers() {   
  const router = useRouter()
  
  const {
    toSearch,
    handleSearch,
    searchValue,
    clearSearch,
    searchInputRef
  } = useSearch()

  return (
    <>
      <Head>
        <title>MARCA | Fornecedores</title>        
      </Head>

      <WithAuth>      

        <Header title="Fornecedores">
          <Button
            colorScheme="blue"            
            leftIcon={<Icon as={FiPlus}/>}
            onClick={() => router.push('/suppliers/new-supplier')}
          >
            Cadastrar novo fornecedor
          </Button>
        </Header>

        <Divider />

        <Content>
          <SearchInput
            ref={searchInputRef}
            placeholder="Pesquise pelo nome do fornecedor..."
            hasSearch={!!searchValue}
            value={searchValue}
            onChange={handleSearch}
            onClearSearch={clearSearch}
          />

          <SuppliersList filterValue={toSearch}/>
        </Content> 

      </WithAuth>
    </>
  )
}
