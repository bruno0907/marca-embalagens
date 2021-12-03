import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUserQuery } from '../../../hooks/useUserQuery'

import { WithAuth } from '../../../components/WithAuth'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'

import { UserInformation } from './components/UserInformation'
import { AddressesInformation } from '../../../components/AddressInformation'
import { UserOrders } from './components/UserOrders'

import { VStack, Button } from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'


export default function User() {  
  const router = useRouter()
  const id = router.query.id  
  
  const user = useUserQuery(String(id))

  return (
    <>
      <Head>
        <title>MARCA | {user.data?.nome}</title>
      </Head>

      <WithAuth>

        <Header withGoBack title={user.data?.nome}>
          <Button 
            colorScheme="blue" 
            leftIcon={<FiPrinter />} 
            onClick={() => router.push(`/users/${id}/user-to-print`)}
          >Imprimir</Button>
        </Header>

        <Divider />

        <VStack spacing={3} align="flex-start">
          <UserInformation userId={id}/>
          <AddressesInformation userId={id}/>
          <UserOrders userId={id}/>          
        </VStack>
        
      </WithAuth>

    </>
  )
}
