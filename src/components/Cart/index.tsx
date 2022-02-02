import { useEffect } from "react"

import { handleFormatPrice } from "../../utils/handleFormatPrice"

import { Table } from "../Table"

import { useCartContext } from "../../contexts/useCart"

import { Thead, Tr, Th, Td, Tbody, Button, Flex, Text, Icon, HStack,  } from "@chakra-ui/react"
import { FiMinus, FiPlus, FiRefreshCw, FiTrash2 } from "react-icons/fi"


const Cart = () => {
  const {
    cartProducts,
    cartTotal,
    handleRemoveProductFromCart,
    handleProductAmountInCart, 
  } = useCartContext()

  return (    
    <Table variant="simple">
      <Thead>
        <Tr bgColor="gray.100">
          <Th textAlign="center">Quantidade</Th>
          <Th>Produto</Th>
          <Th textAlign="end">Valor Unitário</Th>
          <Th textAlign="end">Valor Total</Th>
          <Th textAlign="center">Remover</Th>
        </Tr>
      </Thead>
      <Tbody>
        { cartProducts.map((estimateProduct, index) => {
          return (
            <Tr key={index}>
              <Td p={0}>
                <Flex flex="1" align="center" justify="center">
                  <Button
                    onClick={() => handleProductAmountInCart('decrement', index)}
                    bgColor="transparent"
                    _hover={{ svg: { color: 'blue.500' } }}
                  >
                    <Icon as={FiMinus}/>
                  </Button>
                  <Text px="2">{estimateProduct.quantidade}</Text>
                  <Button 
                    onClick={() => handleProductAmountInCart('increment', index)}
                    bgColor="transparent"
                    _hover={{ svg: { color: 'blue.500' } }}
                  >
                    <Icon as={FiPlus}/>
                  </Button>
                </Flex>
              </Td>
              <Td py="2">{estimateProduct.produto}</Td>
              <Td py="2" textAlign="end">{handleFormatPrice(estimateProduct.valor_unitario)}</Td>
              <Td py="2" textAlign="end">{handleFormatPrice(estimateProduct.valor_total)}</Td>
              <Td py="2" textAlign="center" p="0">
                <Button
                  onClick={() => handleRemoveProductFromCart(index)}
                  bgColor="transparent"
                  _hover={{ svg: { color: 'blue.500' } }}
                >
                  <Icon as={FiTrash2} fontSize={18}/>
                </Button>
              </Td>
            </Tr>                    
          )
        })}
        <Tr bgColor="gray.100">
          <Td colSpan={5} py={3}>
            <HStack spacing={6} justify="space-between" px={4}>
              <strong>Total do pedido: </strong> 
              <strong>{handleFormatPrice(cartTotal)}</strong> 
            </HStack>                    
          </Td>                  
        </Tr>
      </Tbody>
    </Table>
  )
}

export {
  Cart
}
