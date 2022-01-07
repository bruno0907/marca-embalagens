import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useUserQuery } from '../../../hooks/useUserQuery'

import { WithAuth } from '../../../components/WithAuth'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'

import { UserInformation } from '../../../components/pages/Users/UserInformation'
import { AddressesInformation } from '../../../components/AddressesInformation'
import { UserOrders } from '../../../components/pages/Users/UserOrders'

import { VStack, Button } from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

type Props = {
  params: {
    id: string;
  }
}

export default function User({ params }: Props) {
  const { id } = params
  const router = useRouter()  
  
  const user = useUserQuery(id)

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
