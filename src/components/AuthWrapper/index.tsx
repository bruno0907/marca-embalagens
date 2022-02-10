import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Session } from "@supabase/supabase-js"

import { 
  Flex, 
  Box, 
  HStack, 
  IconButton, 
  useBreakpointValue 
} from '@chakra-ui/react'

import { FiLogOut, FiMenu } from "react-icons/fi"

import { SideMenu } from "../SideMenu"
import { Logo } from "../Logo"
import { LoadingView } from "../LoadingView"

import { useSidebarDrawer } from "../../contexts/SidebarContext"
import { useAuth } from "../../contexts/useAuth"

import { useSignOutMutation } from "../../hooks"

type Props = {
  children: ReactNode;   
}

const AuthWrapper = ({ children }: Props) => {  
  const router = useRouter() 
  const { session } = useAuth()

  const [hasSession, setHasSession] = useState<Session>(null)

  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const signOutMutation = useSignOutMutation()

  const handleSignOut = () => signOutMutation.mutate()
  
  useEffect(() => {
    if(!session) router.push('/sign-in')

    setHasSession(session)    
    
  }, [session, router])

  if(!hasSession) return <LoadingView isFullScreen/>
  
  return (
    <Flex maxW="100vw" maxH="100vh">      
      <SideMenu />
      {!isWideVersion ? (
        <Box minW="100vw">
          <HStack 
            spacing={3} 
            bgColor="gray.50" 
            align="center" 
            justify="space-between" 
            p={6} 
            boxShadow="md"
          >
            <IconButton
              display="flex"
              align="center"
              justify="center"
              aria-label="Open Navigation"
              icon={<FiMenu/>}
              fontSize={24}
              variant="unstyled"
              onClick={onOpen}
            />
            <Logo />
            <IconButton
              display="flex"
              align="center"
              justify="center"
              aria-label="Open Navigation"
              icon={<FiLogOut/>}
              fontSize={24}
              variant="unstyled"
              onClick={handleSignOut}
            />
          </HStack>
          <Box
            as="main"
            p={6}
            w="100vw"
            overflowY="auto"
          >
            {children}
          </Box>
        </Box>
      ) : (
        <Box
          as="main"
          p={12}
          w="100vw"
          h="100vh" 
          overflowY="auto"
        >
          <>
            {children}
          </>
        </Box>
      )}

    </Flex>
  )
}

export { AuthWrapper }
