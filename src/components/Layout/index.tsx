import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../hooks/useAuth"

import { Session } from "@supabase/supabase-js"

import { SideMenu } from "../SideMenu"

import { Center, Flex, Spinner } from '@chakra-ui/react'

type LayoutProps = {
  children: ReactNode;   
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter() 
  const { session } = useAuth()

  const [hasSession, setHasSession] = useState<Session>(null)
  
  useEffect(() => {
    if(!session) router.push('/sign-in')

    setHasSession(session)
    
  }, [session, router])

  if(!hasSession) {
    return (
      <Center minW="100%" minH="100vh">
        <Spinner size="lg" color="blue.500" />
      </Center>
    )
  }
  
  return (
    <Flex align="flex-start" justify="flex-start">
      <SideMenu />
      <Flex
        as="main"
        flex="1"
        px="8"
        py="10"    
        maxW="100vw" 
        maxH="100vh"    
        flexDir="column"
        overflowY="auto"
      >
        {children}
      </Flex>
    </Flex>
  )  
}

export { Layout }
