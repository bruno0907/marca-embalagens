import { Header } from '../../components/Header'
import { SideMenu } from '../../components/SideMenu'

import { 
  Flex,
  Heading
} from '@chakra-ui/react'

export default function User() {
  return (
    <Flex p="8">
      <Header title="Marka | Fornecedores"/>
      <Flex flexDir="row">
        <SideMenu />
        <Flex p="8">
          <Heading>Tela da lista de fornecedores</Heading>
        </Flex>
      </Flex>
    </Flex>
  )
}
