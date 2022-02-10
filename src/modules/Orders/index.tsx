import { useRouter } from 'next/router'

import { Icon, Stack } from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

import { 
  Section,
  Divider,
  Content,
  Header,
  ButtonPrimary   
} from '../../components'

import { OrdersList } from './components'

import { useSearch, SearchInput } from '../../hooks/useSearch'

export const OrdersModule = () => {  
  const router = useRouter()  

  const { 
    toSearch,
    searchValue,
    handleSearch, 
    clearSearch,
    searchInputRef 
  } = useSearch()

  const handleNewOrder = () => router.push('/orders/new-order')

  return (
    <>
      <Header title="Pedidos"/>
      <Divider />
      <Content>
        <Section>
          <Stack direction={['column', 'column', 'row']} spacing={3}>
            <SearchInput
              type="number"
              ref={searchInputRef}
              placeholder="Pesquise pelo número do pedido..."
              onClearSearch={clearSearch}  
              hasSearch={!!searchValue}                     
              value={searchValue}
              onChange={handleSearch}
            />
            <ButtonPrimary               
              leftIcon={<Icon as={FiPlus} />}
              onClick={handleNewOrder}
            >
              Novo pedido
            </ButtonPrimary>
          </Stack>
          <OrdersList filterValue={Number(toSearch)}/>
        </Section>
      </Content>
    </>
  )
}
