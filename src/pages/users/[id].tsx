import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUser } from '../../hooks/useUser'
import { useAddresses } from '../../hooks/useAddresses'

import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { GoBack } from '../../components/GoBack'

import { UserInformation } from '../../components/UserInformation'
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

export default function User() {  
  const router = useRouter()
  const id = router.query.id
  
  const user = useUser(id)  
  const addresses = useAddresses(String(id), 1)  

  function handlePrintUser() {
    console.log('Print User')
  }  

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

        <Flex align="center" flex="1">
          <GoBack fontSize="32" mr="4"/>
          <Heading>{user.data.data.nome}</Heading>
          <Spacer />
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}
            onClick={handlePrintUser}
          >Imprimir</Button>
        </Flex>

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
