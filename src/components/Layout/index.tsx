import { ReactNode } from "react"

import { SideMenu } from "../SideMenu"

type LayoutProps = {
  children: ReactNode;  
}

import { Flex } from '@chakra-ui/react'

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex minH="100vh">
      <SideMenu />
      <Flex
        as="main"
        flex="1"
        px="8"
        py="10"        
        flexDir="column"
        minH="100vh"
        bgColor="gray.100"
        borderTopLeftRadius="3xl"
        borderBottomLeftRadius="3xl"
      >
        {children}
      </Flex>
    </Flex> 
  )
}

export { Layout }
