import { useEffect } from "react"

import { handleFormatPrice } from "../../utils/handleFormatPrice"

import { Table } from "../Table"

import { useCartContext } from "../../contexts/useCart"

import { Thead, Tr, Th, Td, Tbody, Button, Flex, Text, Icon,  } from "@chakra-ui/react"
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi"


const Cart = () => {
  const {
    cartProducts,
    setCartProducts,
    cartTotal,
    handleRemoveProductFromCart,
    handleProductAmountInCart, 
  } = useCartContext()

  useEffect(() => {

    return () => setCartProducts([])
  }, [setCartProducts])

  return (
    <Table>
      <Thead>
        <Tr bgColor="blue.500">
          <Th color="gray.50" w="220px" textAlign="center">Quantidade</Th>
          <Th color="gray.50">Produto</Th>
          <Th color="gray.50" w="30" textAlign="end">Valor Unitário</Th>
          <Th color="gray.50" w="30" textAlign="end">Valor Total</Th>
          <Th color="gray.50" w="150px" textAlign="center"/>
        </Tr>
      </Thead>
      <Tbody>
        { cartProducts.map((estimateProduct, index) => {
          return (
            <Tr key={index}>
              <Td py="2">
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
              <Td py="2" minW="30">{estimateProduct.produto}</Td>
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
        <Tr>
          <Td colSpan={5}>
            <Flex justify="space-between">
              <strong>Total do pedido: </strong> 
              <strong>{handleFormatPrice(cartTotal)}</strong> 
            </Flex>                    
          </Td>                  
        </Tr>
      </Tbody>
    </Table>
  )
}

export {
  Cart
}
