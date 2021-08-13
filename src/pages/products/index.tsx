import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'

import { 
  Flex,
  Heading
} from '@chakra-ui/react'

export default function Products() {
  return (
    <Flex p="8">
      <Header title="Marka | Produtos"/>
      <Flex flexDir="row">
        <SideMenu />
        <Flex p="8">
          <Heading>Tela da lista de produtos</Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}
