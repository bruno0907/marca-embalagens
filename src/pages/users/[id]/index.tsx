import { useState, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { supabase } from '../../../services/supabase'

import { Layout } from '../../../components/Layout'

import { UserInfo } from './components/userInfo'
import { UserAddresses } from './components/userAddresses'
import { UserOrders } from './components/userOrders'

import {     
  Center,
  Spinner,
  Heading,  
  Box,
  SimpleGrid,  
  GridItem,
  Flex,
  Icon
} from '@chakra-ui/react'

import { Divider } from '../../../components/Divider'
import { FiArrowLeft } from 'react-icons/fi'
import { GoBack } from '../../../components/GoBack'
interface UserInfoProps {
  id: string;
  name: string;
  phone_number: string;
  mobile_number: string;
  email: string;  
}

interface UserAddressesProps {
  id: string;
  address: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string;  
}

export default function User() {  
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = useState<UserInfoProps>(null)
  const [addresses, setAddresses] = useState<UserAddressesProps[]>([])

  function handleGoBack() {
    router.back()
  }

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      setUser(data)
    }
    fetchUser()

    async function fetchAddresses() {
      const { data } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', id)      
      setAddresses(data)
    }
    fetchAddresses()

  }, [id])

  return (
    <>
      <Head>
        <title>MARCA | {user?.name}</title>
        <meta name="description" content="Página de cadastro de novo cliente" />
      </Head>
      <Layout>
        <Flex align="center">
          <GoBack fontSize="32" mr="4"/>
          <Heading>Dados do Cliente</Heading>
        </Flex>
          <Divider />
          { !user ? (
            <Center my="8">
              <Spinner size="lg" color="blue.500"/>
            </Center>
          ) : (
            <Box>              
              <SimpleGrid 
                spacing="3" 
                templateColumns="repeat(3, 1fr)" 
                templateRows="repeat(2, 1fr)"
              >
                <GridItem colSpan={1} rowSpan={1}>
                  <UserInfo user={user} />
                </GridItem>

                <GridItem colSpan={1} rowSpan={1}>
                  <UserAddresses addresses={addresses}/>
                </GridItem>

                <GridItem colSpan={1} rowSpan={1}>
                  <UserInfo user={user} />
                </GridItem>

                <GridItem  colSpan={3} rowSpan={2}>
                  <UserOrders />
                </GridItem>
              </SimpleGrid>

            </Box>
          )}
      </Layout>
    </>
  )
}
