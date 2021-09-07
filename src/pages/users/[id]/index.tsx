import { useState, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { supabase } from '../../../services/supabase'

import { Layout } from '../../../components/Layout'
import { Divider } from '../../../components/Divider'
import { GoBack } from '../../../components/GoBack'

import { UserInformation } from '../../../components/UserInformation'
// import { UserAddresses } from '../../../components/UserInformation'
import { UserOrders } from '../../../components/UserOrders'

import {     
  Center,
  Spinner,
  Heading,  
  Box,
  HStack,
  VStack,
  Flex,
  Button,
  Spacer
} from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

import { AddressProps, UserProps } from '../../../types'

export default function User() {  
  const router = useRouter()
  const { id } = router.query
  
  const [user, setUser] = useState<UserProps>(null)
  const [addresses, setAddresses] = useState<AddressProps[]>([])

  function handlePrintUser() {
    console.log('Print User')
  }
  
  useEffect(() => {
    async function fetchUserData() {
      if(id){
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single()
  
        setUser(userData)
        
        const { data: userAddresses } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', id) 
  
        setAddresses(userAddresses)
      }
      return
    }
    fetchUserData()

  }, [id])

  if(!user) {
    return (
      <Center my="8" h="100vh">
        <Spinner size="lg" color="blue.500"/>
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>MARCA | {user?.nome}</title>
        <meta name="description" content="Página de cadastro de novo cliente" />
      </Head>
      <Layout>
        <Flex align="center">
          <GoBack fontSize="32" mr="4"/>
          <Heading>Dados do Cliente</Heading>
          <Spacer />
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}
            onClick={handlePrintUser}
          >Imprimir</Button>
        </Flex>
          <Divider />

          
            <VStack spacing={3} align="flex-start">
              <HStack spacing={3}>
                <UserInformation user={user} />
                {/* <UserAddresses addresses={addresses}/> */}
              </HStack>
              <UserOrders />
            </VStack>
          
      </Layout>
    </>
  )
}
