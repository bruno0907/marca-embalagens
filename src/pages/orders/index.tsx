import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'

import { 
  Flex,
  Heading
} from '@chakra-ui/react'

export default function Orders() {
  return (
    <Flex p="8">
      <Header title="Marka | Pedidos"/>
      <Flex flexDir="row">
        <SideMenu />
        <Flex p="8">
          <Heading>Tela dos Pedidos</Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}
