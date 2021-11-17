import { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useReactToPrint } from 'react-to-print'

import { useUserQuery } from '../../../hooks/useUserQuery'

import { Authenticated } from '../../../components/Layout/Authenticated'
import { Divider } from '../../../components/Layout/Divider'
import { Header } from '../../../components/Header'
import { UserInformation } from './components/UserInformation'
import { AddressesInformation } from '../../../components/AddressInformation'
import { UserOrders } from './components/UserOrders'
import { UserToPrint } from './components/UserToPrint'

import {     
  Center,
  Spinner,
  VStack,
  Button,  
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'
import { Content } from '../../../components/Layout/Content'


export default function User() {  
  const router = useRouter()
  const id = router.query.id

  const userToPrintRef = useRef<HTMLDivElement>(null)
  
  const user = useUserQuery(id)

  const handlePrintUser = useReactToPrint({
    content: () => userToPrintRef.current
  })

  return (
    <>
      <Head>
        <title>MARCA | {user.data?.data.nome}</title>
      </Head>

      <Authenticated>

        <Header withGoBack title={user.data?.data.nome}
        >
          <Button 
            colorScheme="blue" 
            leftIcon={<FiPrinter />} 
            onClick={handlePrintUser}
          >Imprimir</Button>
        </Header>

        <Divider />

        { !user.data?.data ? (
          <Content>
            <Center>
              <Spinner size="lg" color="blue.500"/>
            </Center>
          </Content>
        ) : (
          <VStack spacing={3} align="flex-start">
            <UserInformation userId={id}/>
            <AddressesInformation userId={id}/>
            <UserOrders userId={id}/>          
          </VStack>
        )}
        
      </Authenticated>

      {/* { user.data && <UserToPrint ref={userToPrintRef} user={user.data?.user} addresses={user.data?.addresses} /> } */}

    </>
  )
}
