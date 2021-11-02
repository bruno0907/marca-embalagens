import { useState, ChangeEvent } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { Content } from '../../components/Content'
import { OrdersList } from '../../components/OrdersList'

import useDebounce from '../../hooks/useDebounce'

import {    
  Button,
  InputGroup,
  Icon,
  InputLeftElement,
  Input,
  InputRightElement,
} from '@chakra-ui/react'

import { FiPlus, FiSearch, FiX } from 'react-icons/fi'

export default function Orders() {  
  const router = useRouter()

  const [searchValue, setSearchValue] = useState(null)
  
  const debouncedSearch = useDebounce(searchValue, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchValue(value)
  }

  const handleNewOrder = () => router.push('/orders/new-order')

  const handleClearFilter = () => setSearchValue('')

  return (
    <>
      <Head>
        <title>MARCA | Pedidos</title>        
      </Head>

      <Layout>

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
          <InputGroup mb="8">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.500" />
            </InputLeftElement>
            <Input
              type="number" 
              placeholder="Pesquisar pelo número do pedido..."
              borderColor="gray.300"
              value={searchValue}              
              onChange={handleChange}
            />
            { !!searchValue &&
              <InputRightElement 
                cursor="pointer" 
                onClick={handleClearFilter}
                _hover={{
                svg: {
                  color: 'gray.700'
                }
              }}>
                <Icon as={FiX} color="gray.500" fontSize="18px" />
              </InputRightElement>         
            }   
          </InputGroup>
          <OrdersList filterValue={debouncedSearch}/>
        </Content>

      </Layout>
    </>
  )
}
