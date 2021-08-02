import { GetServerSideProps } from 'next'

import { useEffect } from 'react'
import Head from 'next/head'

import { useAuth } from '../hooks/useAuth'

import {
  Container,
  Heading,
  Button,
  Spinner
} from '@chakra-ui/react'
import { supabase } from '../services/supabase'

export default function Dashboard({ user }) {
  const { signOut } = useAuth()  

  const handleSignOut = () => signOut()

  return (
    <>
      <Head>
        <title>Marka | Entrar</title>
        <meta name="description" content="Página de Login da Marka" />
      </Head>
      <Container display="flex" flexDir="column">
        <Heading>Dashboard</Heading>
        <Button onClick={handleSignOut} colorScheme="blue">Sair</Button>
      </Container>
    </>
  ) 
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if(!user) { 
    return {
      props: {},
      redirect: {
        destination: '/'
      }
    }
  }

  return {
    props: {
      user
    }
  }
}