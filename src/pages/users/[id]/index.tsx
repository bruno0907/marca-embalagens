import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { useUserQuery } from '../../../hooks/useUserQuery'

import { Authenticated } from '../../../components/Layout/Authenticated'
import { Divider } from '../../../components/Layout/Divider'
import { Header } from '../../../components/Header'

import { UserInformationProps } from './components/UserInformation'
import { AddressesInformationProps } from '../../../components/AddressInformation'
import { UserOrdersProps } from './components/UserOrders'

import { VStack, Button } from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

const UserInformation = dynamic<UserInformationProps>(
  async () => {
    const { UserInformation } = await import('./components/UserInformation')

    return UserInformation
  }
)

const AddressesInformation = dynamic<AddressesInformationProps>(
  async () => {
    const { AddressesInformation } = await import('../../../components/AddressInformation')

    return AddressesInformation
  }
)

const UserOrders = dynamic<UserOrdersProps>(
  async () => {
    const { UserOrders } = await import('./components/UserOrders')

    return UserOrders
  }
)

export default function User() {  
  const router = useRouter()
  const id = router.query.id  
  
  const user = useUserQuery(String(id))

  return (
    <>
      <Head>
        <title>MARCA | {user.data?.nome}</title>
      </Head>

      <Authenticated>

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
        
      </Authenticated>

    </>
  )
}
