import { ReactNode, useEffect } from "react"

import { SideMenu } from "../SideMenu"

type LayoutProps = {
  children: ReactNode;  
}

import { Center, Flex, Spinner } from '@chakra-ui/react'
import { supabase } from "../../services/supabase"
import { useRouter } from "next/dist/client/router"

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const user = supabase.auth.user()
  
  useEffect(() => {
    if(!user) router.push('/sign-in')
    
  }, [user, router])
  
  if(!user) {
    return (
      <Center minW="100%" minH="100vh">
        <Spinner size="lg" color="blue.500" />
      </Center>
    )
  }
  
  return (
    <Flex maxW="100vw" maxH="100vh">
      <SideMenu />
      <Flex
        as="main"
        flex="1"
        px="8"
        py="10"        
        flexDir="column"
        overflowY="auto"
      >
        {children}
      </Flex>
    </Flex> 
  )
}

export { Layout }
