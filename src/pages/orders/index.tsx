import Head from 'next/head'
import { useRouter } from 'next/router'

import { Authenticated } from '../../components/Layout/Authenticated'
import { Divider } from '../../components/Layout/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Layout/Content'
import { OrdersList } from './components/OrdersList'

import { useSearch, SearchInput } from '../../hooks/useSearch'

import {    
  Button,  
  Icon,
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

      <Authenticated>

        <Header title="Pedidos">
          <Button 
            colorScheme="blue"
            leftIcon={<Icon as={FiPlus} />}
            onClick={handleNewOrder}
          >
            Cadastrar novo pedido
          </Button>
        </Header>

        <Divider />

        <Content>

          <SearchInput
            type="number"
            ref={searchInputRef}
            placeholder="Pesquise pelo número do pedido..."
            onClearSearch={clearSearch}  
            hasSearch={!!searchValue}                     
            value={searchValue}
            onChange={handleSearch}
          />

          <OrdersList filterValue={Number(toSearch)}/>
        </Content>

      </Authenticated>
    </>
  )
}
