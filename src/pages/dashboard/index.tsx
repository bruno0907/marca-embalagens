import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { supabase } from '../../services/supabase'

import { 
  FiEdit, 
  FiUsers,   
  FiPackage,
  FiPhoneCall
} from 'react-icons/fi'

import { Box } from '@chakra-ui/react'

import { Header } from '../../components/Header'
import { Button } from './components/Button'

export default function Dashboard () {      
  return (
    <> 
      <Head>
        <title>Marca | Home</title>
        <meta name="description" content="Dashboard da plataforma da Marka" />
      </Head>
      <Box display="flex" flexDir="column" minH="100vh" p="8">        
        <Header />
        <Box display="flex" justifyContent="space-evenly">
          <Button href="/orders" icon={FiEdit}>Pedidos</Button>
          <Button href="/users" icon={FiUsers}>Clientes</Button>
          <Button href="/products" icon={FiPackage}>Produtos</Button>
          <Button href="/suppliers" icon={FiPhoneCall}>Fornecedores</Button>
        </Box>        
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(!user) { 
    return {
      props: {},
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  } 
  
  return {
    props: { user }
  }
}