import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUserQuery } from '../../hooks/useUserQuery'
import { useAddressesQuery } from '../../hooks/useAddressesQuery'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Header } from '../../components/Header'
import { UserInformation } from '../../components/UserInformation'
import { UserAddresses } from '../../components/UserAddresses'
import { UserOrders } from '../../components/UserOrders'

import {     
  Center,
  Spinner,
  VStack,
  Button,
  Spacer,
  Text
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

export default function User() {  
  const router = useRouter()
  const id = router.query.id
  
  const user = useUserQuery(id)  
  const addresses = useAddressesQuery(String(id), 1)

  const handlePrintUser = () => console.log('Print User')

  if(user.isLoading || addresses.isLoading) {
    return (
      <Center my="8" h="100vh">
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  if(user.error || addresses.error) {
    return (
      <Center my="8" h="100vh">
        <Text>Erro ao carregar as informações...</Text>
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>MARCA | {user.data.data.nome}</title>
      </Head>

      <Layout>

        <Header withGoBack title={user.data.data.nome}>
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}
            onClick={handlePrintUser}
          >Imprimir</Button>
          </Header>

        <Divider />

        <VStack spacing={3} align="flex-start" >
          <UserInformation user={user.data.data} isFetching={user.isFetching}/>
          <UserAddresses addresses={addresses.data.data} isFetching={addresses.isFetching}/>
          <UserOrders />
        </VStack>
        
      </Layout>
    </>
  )
}
