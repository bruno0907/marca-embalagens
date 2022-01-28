import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthWrapper } from '../../components/AuthWrapper'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { OrdersList } from '../../components/pages/Orders/OrderList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import {    
  Button,  
  HStack,  
  Icon,
  Stack,
} from '@chakra-ui/react'

import { FiPlus } from 'react-icons/fi'

export default function Orders() {  
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
      <Head>
        <title>Pedidos | MARCA</title>        
      </Head>
      <AuthWrapper>
        <Header title="Pedidos">          
        </Header>
        <Divider />
        <Content>
          <Stack spacing={6}>
            <HStack spacing={3}>
              <SearchInput
                type="number"
                ref={searchInputRef}
                placeholder="Pesquise pelo número do pedido..."
                onClearSearch={clearSearch}  
                hasSearch={!!searchValue}                     
                value={searchValue}
                onChange={handleSearch}
              />
              <Button 
                colorScheme="blue"
                leftIcon={<Icon as={FiPlus} />}
                onClick={handleNewOrder}
                flexShrink={0}
              >
                Novo pedido
              </Button>
            </HStack>
            <OrdersList filterValue={Number(toSearch)}/>
          </Stack>
        </Content>
      </AuthWrapper>
    </>
  )
}
