import Head from 'next/head'
import { useRouter } from 'next/router'

import { WithAuth } from '../../components/WithAuth'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { SuppliersList } from '../../components/pages/Suppliers/SuppliersList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import {    
  Button,
  HStack,
  Icon,
  Stack,   
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

        <Header title="Fornecedores"/>

        <Divider />

        <Content>
          <Stack spacing={6}>
            <HStack spacing={3}>
              <SearchInput
                ref={searchInputRef}
                placeholder="Pesquise pelo nome do fornecedor..."
                hasSearch={!!searchValue}
                value={searchValue}
                onChange={handleSearch}
                onClearSearch={clearSearch}
              />
              <Button
                colorScheme="blue"            
                leftIcon={<Icon as={FiPlus}/>}
                flexShrink={0}
                onClick={() => router.push('/suppliers/new-supplier')}
              >
                Novo fornecedor
              </Button>
            </HStack>

            <SuppliersList filterValue={toSearch}/>
          </Stack>

        </Content> 

      </WithAuth>
    </>
  )
}
