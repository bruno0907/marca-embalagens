import { useRouter } from 'next/router'

import {   
  Icon,
  Stack,
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

import { 
  Content,
  Divider,
  Section,
  Header,
  ButtonPrimary 
} from '../../components'

import { ProductsList } from './components'

import { useSearch, SearchInput } from '../../hooks'

export const ProductsModule = () => {
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
      <Header title="Produtos"/>
      <Divider />
      <Content>
        <Section>
          <Stack direction={['column', 'column', 'row']} spacing={3}>
            <SearchInput
              ref={searchInputRef}
              placeholder="Pesquise pelo nome do produto..."
              hasSearch={!!searchValue}
              value={searchValue}
              onChange={handleSearch}
              onClearSearch={clearSearch}
            />
            <ButtonPrimary                            
              leftIcon={<Icon as={FiPlus} />}
              onClick={() => router.push('/products/new-product')}              
            >
              Novo produto
            </ButtonPrimary> 
          </Stack>            
          <ProductsList filterValue={toSearch}/>
        </Section>
      </Content>      
    </>
  )
}
