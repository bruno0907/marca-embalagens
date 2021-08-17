import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { supabase } from '../../services/supabase'

import { Content } from '../../components/Content'

import { 
  Flex,
  Box,
  Heading,  
  Button,  
  Text,
  Stack,  
  Table
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

  return (
    <>
      <Head>
        <title>MARCA | {user[0].name}</title>
        <meta name="description" content="Página de cadastro de novo cliente" />
      </Head>
      <Content withGoBack>
        <Box bgColor="gray.100" p="8" borderRadius="8" mb="8">
          <Heading mb="12" fontSize="2xl">
            Dados de {user[0].name}
          </Heading>

          <Stack mb="12">
            <Text><strong>Nome completo: </strong>{user[0].name}</Text>              
            <Text><strong>Telefone: </strong>{user[0].phone_number}</Text>
            <Text><strong>Celular: </strong>{user[0].mobile_number}</Text>
            <Text><strong>E-mail: </strong>{user[0].email}</Text>
          </Stack>

          <Button colorScheme="blue" ml="auto">Editar contato</Button>
          
        </Box>

        <Box bgColor="gray.100" p="8" borderRadius="8" mb="8">                
          <Heading mb="12" fontSize="2xl">
            Endereços de {user[0].name}
          </Heading>                  
          
          { addresses.map(address => {
            return (
              <Table key={address.id}>
                
              </Table>
            )
          })}
          
          <Button colorScheme="blue">Editar endereços</Button>
        </Box>

        <Box bgColor="gray.100" p="8" borderRadius="8">                
          <Heading mb="12" fontSize="2xl">
            Últimos Pedidos de {user[0].name}
          </Heading>                  
          
          { addresses.map(address => {
            return (
              <Table key={address.id}>
                
              </Table>
            )
          })}
          
          <Button colorScheme="blue">Ver todos os pedidos</Button>
        </Box>
      </Content>
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