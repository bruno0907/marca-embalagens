import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/useAuth"

import { Session } from "@supabase/supabase-js"

import { SideMenu } from "./SideMenu"

import { Center, Flex, Spinner, Box, useToast } from '@chakra-ui/react'

type Props = {
  children: ReactNode;   
}

const WithAuth = ({ children }: Props) => {
  const toast = useToast()
  const router = useRouter() 
  const { session } = useAuth()

  const [hasSession, setHasSession] = useState<Session>(null)
  
  useEffect(() => {
    if(!session) router.push('/sign-in')

    setHasSession(session)    
    
  }, [session, router])

  if(!hasSession) {
    return (
      <Center minW="100vw" minH="100vh">
        <Spinner size="lg" color="blue.500" />
      </Center>
    )
  }
  
  return (
    <Flex maxW="100vw" maxH="100vh">
      <SideMenu />
      <Box
        as="main"        
        px="8"
        py="10"
        w="100vw"
        h="100vh"    
        flexDir="column"
        overflowY="auto"
      >
        {children}
      </Box>
    </Flex>
  )  
}

export { WithAuth }