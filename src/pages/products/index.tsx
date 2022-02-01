import Head from 'next/head'

import { useRouter } from 'next/router'

import { AuthWrapper } from '../../components/AuthWrapper'
import { Content } from '../../components/Content'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { ProductsList } from '../../components/pages/Products/ProductsList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import { 
  Button,
  HStack,
  Icon,
  Stack,
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

export default function Products() {
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
        <title>Produtos | MARCA</title>        
      </Head>
      <AuthWrapper>
        <Header title="Produtos"/>
        <Divider />
        <Content>
          <Stack spacing={6}>
            <HStack spacing={6}>
              <SearchInput
                ref={searchInputRef}
                placeholder="Pesquise pelo nome do produto..."
                hasSearch={!!searchValue}
                value={searchValue}
                onChange={handleSearch}
                onClearSearch={clearSearch}
              />
              <Button              
                colorScheme="blue"            
                leftIcon={<Icon as={FiPlus} />}
                onClick={() => router.push('/products/new-product')}
                flexShrink={0}
              >
                Novo produto
              </Button> 
            </HStack>            
            <ProductsList filterValue={toSearch}/>
          </Stack>
        </Content>
      </AuthWrapper>
    </>
  )
}
