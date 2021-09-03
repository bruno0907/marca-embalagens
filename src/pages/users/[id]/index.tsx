import { useState, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { supabase } from '../../../services/supabase'

import { Layout } from '../../../components/Layout'
import { Divider } from '../../../components/Divider'
import { GoBack } from '../../../components/GoBack'

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
} from '@chakra-ui/react'

import { AddressProps, UserProps } from '../../../types'

export default function User() {  
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = useState<UserProps>(null)
  const [addresses, setAddresses] = useState<AddressProps[]>([])

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
        <title>MARCA | {user?.nome}</title>
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
