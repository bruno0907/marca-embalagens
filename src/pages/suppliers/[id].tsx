import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSupplierQuery } from '../../hooks/useSupplierQuery'
import { useAddressesQuery } from '../../hooks/useAddressesQuery'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'

import { SupplierInformation } from '../../components/SupplierInformation'
import { UserAddresses } from '../../components/UserAddresses'

import {     
  Center,
  Spinner,
  Heading,
  VStack,  
  Button,  
  Text
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

export default function Supplier() {  
  const router = useRouter()
  const id = router.query.id
  
  const supplier = useSupplierQuery(id)  
  const addresses = useAddressesQuery(String(id), 1)

  const handlePrintUser = () => console.log('Print supplier')

  if(supplier.isLoading || addresses.isLoading) {
    return (
      <Center my="8" h="100vh">
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(supplier.error || addresses.error) {
    return (
      <Center my="8" h="100vh">
        <Text>Erro ao carregar as informações...</Text>
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>MARCA | {supplier.data.data.nome}</title>
      </Head>
      <Layout>

        <Header withGoBack title={supplier.data.data.nome}>
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}            
            onClick={handlePrintUser}
          >Imprimir</Button>

        </Header>

        <Divider /> 

        <VStack spacing={3} align="flex-start" >
          <SupplierInformation supplier={supplier.data.data} isFetching={supplier.isFetching}/>
          <UserAddresses addresses={addresses.data.data} isFetching={addresses.isFetching}/>          
        </VStack> 

      </Layout>
    </>
  )
}
