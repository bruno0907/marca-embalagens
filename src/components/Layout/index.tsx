import { ReactNode, useEffect, useState } from "react"

import { SideMenu } from "../SideMenu"

type LayoutProps = {
  children: ReactNode;   
}

import { Center, Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from "next/dist/client/router"
import { useAuth } from "../../hooks/useAuth"

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter() 
  const { session } = useAuth()

  const [isAuthenticated, setIsAuthenticated] = useState(null)
  
  useEffect(() => {
    if(!session) router.push('/sign-in')

    setIsAuthenticated(session)
    
  }, [session, router])

  if(!isAuthenticated) {
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
