import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../contexts/useAuth"

import { Session } from "@supabase/supabase-js"

import { SideMenu } from "../SideMenu"

import { Center, Flex, Spinner, Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode;   
}

const AuthWrapper = ({ children }: Props) => {  
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
        p="12"        
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

export { AuthWrapper }
