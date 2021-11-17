import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSupplierQuery } from '../../../hooks/useSupplierQuery'

import { Authenticated } from '../../../components/Layout/Authenticated'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'
import { SupplierInformation } from './components/SupplierInformation'
import { AddressesInformation } from '../../../components/AddressInformation'

import {     
  Center,
  Spinner,  
  VStack,  
  Button,  
  Text
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

export default function Supplier() {  
  const router = useRouter()
  const id = router.query.id
  
  const supplier = useSupplierQuery(id)

  const handlePrintUser = () => console.log('Print supplier')

  return (
    <>
      <Head>
        <title>MARCA | {supplier.data?.supplier.nome}</title>
      </Head>
      <Authenticated>

        <Header withGoBack title={supplier.data?.supplier.nome}>
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}            
            onClick={handlePrintUser}
          >Imprimir</Button>

        </Header>

        <Divider />

        { !supplier.data || supplier.isLoading ? (
          <Center py="16">
            <Spinner size="lg" color="blue.500"/>
          </Center>
        ) : supplier.isError ? (
          <Center py="16">
            <Text>Erro ao carregar as informações...</Text>
          </Center>          
        ) : (
          <VStack spacing={3} align="flex-start" >
            <SupplierInformation supplier={supplier.data.supplier} isFetching={supplier.isFetching}/>
            <AddressesInformation addresses={supplier.data.addresses} isFetching={supplier.isFetching}/>          
          </VStack>
        )}

      </Authenticated>
    </>
  )
}
