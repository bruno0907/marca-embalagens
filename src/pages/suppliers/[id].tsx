import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSupplierQuery } from '../../hooks/useSupplierQuery'
import { useAddresses } from '../../hooks/useAddresses'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { GoBack } from '../../components/GoBack'

import { SupplierInformation } from '../../components/SupplierInformation'
import { UserAddresses } from '../../components/UserAddresses'
import { UserOrders } from '../../components/UserOrders'

import {     
  Center,
  Spinner,
  Heading,
  VStack,
  Flex,
  Button,
  Spacer,
  Text
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

export default function Supplier() {  
  const router = useRouter()
  const id = router.query.id
  
  const supplier = useSupplierQuery(id)  
  const addresses = useAddresses(String(id), 1)

  function handlePrintUser() {
    console.log('Print supplier')
  }  

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

        <Flex align="center" flex="1">
          <GoBack fontSize="32" mr="4"/>
          <Heading>{supplier.data.data.nome}</Heading>
          <Spacer />
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}
            onClick={handlePrintUser}
          >Imprimir</Button>
        </Flex>

        <Divider />
          
        <VStack spacing={3} align="flex-start" >
          <SupplierInformation supplier={supplier.data.data} isFetching={supplier.isFetching}/>
          <UserAddresses addresses={addresses.data.data} isFetching={addresses.isFetching}/>
          <UserOrders />
        </VStack>
          
      </Layout>
    </>
  )
}
