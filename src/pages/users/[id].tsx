import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'

import { 
  Flex,
  Heading
} from '@chakra-ui/react'

export default function User() {
  return (
    <Flex p="8">
      <Header title="Marka | Cliente"/>
      <Flex flexDir="row">
        <SideMenu />
        <Flex p="8">
          <Heading>Tela dos dados do Cliente</Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}
