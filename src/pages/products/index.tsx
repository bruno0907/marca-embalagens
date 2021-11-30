import Head from 'next/head'

import { useRouter } from 'next/router'

import { Authenticated } from '../../components/Layout/Authenticated'
import { Content } from '../../components/Layout/Content'
import { Divider } from '../../components/Layout/Divider'
import { Header } from '../../components/Header'
import { ProductsList } from './components/ProductsList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import { 
  Button,
  Icon,
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
        <title>MARCA | Produtos</title>        
      </Head>

      <Authenticated>

        <Header title="Produtos">          
          <Button              
            colorScheme="blue"            
            leftIcon={<Icon as={FiPlus} />}
            onClick={() => router.push('/products/new-product')}
          >
            Cadastrar novo produto
          </Button> 

        </Header>  

        <Divider />

        <Content>

          <SearchInput
            ref={searchInputRef}
            placeholder="Pesquise pelo nome do produto..."
            hasSearch={!!searchValue}
            value={searchValue}
            onChange={handleSearch}
            onClearSearch={clearSearch}
          />

          <ProductsList filterValue={toSearch}/>

        </Content>
      </Authenticated>
    </>
  )
}
