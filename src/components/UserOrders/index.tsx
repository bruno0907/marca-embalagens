import { Content } from "../Content"

import { 
  Button, 
  Flex, 
  Heading, 
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr,
  Badge 
} from "@chakra-ui/react"

const UserOrders = () => {
  return (
    <Content w="100%">
      <Flex align="center" justify="space-between">
        <Heading fontSize="2xl">Ultimos pedidos</Heading>
        <Button variant="link" colorScheme="blue">Ver todos os pedidos do cliente</Button>
      </Flex>
      <Table variant="striped" colorScheme="gray" my="8">
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Produtos</Th>
            <Th>Vendedor</Th>
            <Th>Valor</Th>
            <Th>Situação</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr fontSize="sm" fontWeight="medium" _hover={{ cursor: 'pointer', color: "blue.500", textDecor: "underline" }}>
            <Td w="36">22/08/2021</Td>
            <Td>Produto de exemplo 1</Td>
            <Td>Vendedor 1</Td>
            <Td w="36">R$ 25,00</Td>
            <Td w="36">
              <Badge variant="subtle" colorScheme="red" py="1" px="4" borderRadius="md">Em aberto</Badge>
            </Td>
          </Tr>
          <Tr fontSize="sm" fontWeight="medium" _hover={{ cursor: 'pointer', color: "blue.500", textDecor: "underline" }}>
            <Td w="36">24/08/2021</Td>
            <Td>Produto de exemplo 2</Td>
            <Td>Vendedor 2</Td>
            <Td w="36">R$ 35,00</Td>
            <Td w="36">
              <Badge variant="subtle" colorScheme="green" py="1" px="4" borderRadius="md">Pago</Badge>
            </Td>
          </Tr>
          <Tr fontSize="sm" fontWeight="medium" _hover={{ cursor: 'pointer', color: "blue.500", textDecor: "underline" }}>
            <Td w="36">26/08/2021</Td>
            <Td>Produto de exemplo 3</Td>
            <Td>Vendedor 1</Td>
            <Td w="36">R$ 20,00</Td>
            <Td w="36">
              <Badge variant="subtle" colorScheme="green" py="1" px="4" borderRadius="md">Pago</Badge>
            </Td>
          </Tr>
          <Tr fontSize="sm" fontWeight="medium" _hover={{ cursor: 'pointer', color: "blue.500", textDecor: "underline" }}>
            <Td w="36">28/08/2021</Td>
            <Td>Produto de exemplo 4</Td>
            <Td>Vendedor 1</Td>
            <Td w="36">R$ 45,00</Td>
            <Td w="36">
              <Badge variant="subtle" colorScheme="red" py="1" px="4" borderRadius="md">Em aberto</Badge>
            </Td>
          </Tr>          
        </Tbody>
      </Table>
    </Content>
  )
}

export { UserOrders }
