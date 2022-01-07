import Head from 'next/head'

import { useRouter } from 'next/router'

import { WithAuth } from '../../components/WithAuth'
import { Content } from '../../components/Content'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { ProductsList } from '../../components/pages/Products/ProductsList'

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

      <WithAuth>

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
      </WithAuth>
    </>
  )
}
