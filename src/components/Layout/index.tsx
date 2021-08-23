import { ReactNode } from "react"

import { Header } from "../Header"
import { SideMenu } from "../SideMenu"
import { GoBack } from "../GoBack"

type LayoutProps = {
  children: ReactNode;
  withGoBack?: boolean;
}

import { 
  Box,
  Flex,  
} from '@chakra-ui/react'

const Layout = ({ children, withGoBack }: LayoutProps) => {
  return (
    <Box p="8" minH="100vh">
      <Header />
      <Flex>
        <SideMenu />
        <Flex flex="1" flexDir="column">
          { withGoBack && <GoBack /> }
          <Box>
              {children}
          </Box>
          </Flex>
        </Flex>
      </Box> 
  )
}

export { Layout }
