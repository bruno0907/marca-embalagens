import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { supabase } from '../../../services/supabase'

import { Layout } from '../../../components/Layout'

import { UserInfo } from './components/userInfo'
import { UserAddresses } from './components/userAddresses'
import { UserOrders } from './components/userOrders'

import {   
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'

interface UserDataProps {
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

interface UserProps {
  user: UserDataProps[],  
  addresses: UserAddressesProps[],
}

export default function User({ user, addresses }: UserProps) {  
  const router = useRouter()
  const { id } = router.query

  console.log(id)

  return (
    <>
      <Head>
        <title>MARCA | {user[0].name}</title>
        <meta name="description" content="Página de cadastro de novo cliente" />
      </Head>
      <Layout withGoBack>
        <Box bgColor="gray.100" p="8" borderRadius="8">          
          <Tabs variant="enclosed" borderColor="blue.500" isLazy>
            <TabList>
              <Tab _selected={{ bg: 'blue.500', color: 'gray.50' }}>Dados do Cliente</Tab>
              <Tab _selected={{ bg: 'blue.500', color: 'gray.50' }}>Endereços do Cliente</Tab>
              <Tab _selected={{ bg: 'blue.500', color: 'gray.50' }}>Pedidos do Cliente</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserInfo user={user}/>
              </TabPanel>
              <TabPanel>
                <UserAddresses addresses={addresses}/>
              </TabPanel>
              <TabPanel>
                <UserOrders />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { user: session } = await supabase.auth.api.getUserByCookie(req)  

  if(!session) {
    return {
      props: {},
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  const { id } = params

  const { data: user } = await supabase
    .from('users')    
    .select()
    .eq('id', id)

  const { data: addresses } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', id)
  
  return {
    props: {
      user,
      addresses
    }
  }
}