import { handleFormatPrice } from "../../../../../../utils/handleFormatPrice"

import { Table } from "../../../../../../components/Table"

import { useCreateOrder } from "../../../hooks/useCreateOrder"

import { Thead, Tr, Th, Td, Tbody, Button, Flex, HStack, Text } from "@chakra-ui/react"
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi"

import { OrderItemProps } from "../../../../../../types"

export type OrderProductsProps = {
  canSubmitOrder: boolean;
  handleCancelOrder: () => void;
  isSubmitting: boolean;
}

const OrderProducts = ({ canSubmitOrder, handleCancelOrder, isSubmitting }: OrderProductsProps) => {
  const {
    orderProducts,    
    orderTotal,
    handleRemoveItemFromOrder,
    setOrderProducts,
    setOrderTotal,
  } = useCreateOrder()

  const handleProductAmount = (amount: 'increment' | 'decrement', index: number) => {    
    const currentOrderProducts = [...orderProducts]
    const productInOrder = currentOrderProducts.find((_, i) => i === index)

    if(amount === 'decrement' && productInOrder.quantidade <= 1) {
      const updatedOrderProducts = currentOrderProducts.filter((_, i) => i !== index)      

      setOrderProducts(updatedOrderProducts)
      const total = getSumTotal(updatedOrderProducts)
      setOrderTotal(total)

      return
    }
    
    const updatedOrderProductsAmount = currentOrderProducts.map((product, i) => {
      if(i !== index) return product      
      
      return {
        ...productInOrder,
        quantidade: amount === 'increment' ? product.quantidade + 1: product.quantidade - 1,
        valor_total: amount === 'increment' ? product.valor_total + product.valor_unitario : product.valor_total - product.valor_unitario
      }
    })
     
    setOrderProducts(updatedOrderProductsAmount)
    const total = getSumTotal(updatedOrderProductsAmount)
    
    setOrderTotal(total)

    return
    
  }    

  const getSumTotal = (order: OrderItemProps[]) => {
    return order.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
  }
  

  return (
    <>
      <Table>
        <Thead>
          <Tr bgColor="blue.500">
            <Th color="gray.50" textAlign="center">Quantidade</Th>
            <Th color="gray.50">Produto</Th>
            <Th color="gray.50" w="30" textAlign="end">Valor Unitário</Th>
            <Th color="gray.50" w="30" textAlign="end">Valor Total</Th>
            <Th color="gray.50" textAlign="center">Remover</Th>
          </Tr>
        </Thead>
        <Tbody>
          { orderProducts.map((orderProduct, index) => {
            return (
              <Tr key={index}>
                <Td textAlign="center" display="flex" alignItems="center" justifyContent="center" p="1">
                  <Button 
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => handleProductAmount('decrement', index)} 
                    variant="unstyled"
                    _hover={{ svg: { color: 'blue.500' }}}
                  >
                    <FiMinus/>
                  </Button>
                  <Text px="2">{orderProduct.quantidade}</Text>
                  <Button 
                    onClick={() => handleProductAmount('increment', index)} 
                    variant="unstyled"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ svg: { color: 'blue.500' }}}
                  >
                    <FiPlus/>
                  </Button>
                </Td>
                <Td>{orderProduct.produto}</Td>
                <Td textAlign="end">{handleFormatPrice(orderProduct.valor_unitario)}</Td>
                <Td textAlign="end">{handleFormatPrice(orderProduct.valor_total)}</Td>
                <Td textAlign="center" p="0">
                  <Button 
                    w="100%"
                    variant="unstyled"
                    display="flex"
                    alignItems="center"
                    justifyContent="center" 
                    onClick={() => handleRemoveItemFromOrder(index)}
                    _hover={{ svg: { color: 'blue.500' }}}
                  >
                    <FiTrash2 />
                  </Button>
                </Td>
              </Tr>                    
            )
          })}
          <Tr>
            <Td colSpan={5}>
              <Flex justify="space-between">
                <strong>Total do pedido: </strong> 
                <strong>{handleFormatPrice(orderTotal)}</strong> 
              </Flex>                    
            </Td>                  
          </Tr>
        </Tbody>
      </Table>
      <HStack spacing={3} justify="flex-end">
        <Button
          type="reset" 
          colorScheme="blue"
          variant="ghost" 
          onClick={handleCancelOrder} 
          isDisabled={!orderProducts.length}
        >Cancelar</Button>
        <Button 
          type="submit"
          colorScheme="blue" 
          isDisabled={canSubmitOrder}
          isLoading={isSubmitting}
        >Gerar pedido</Button>
      </HStack>
    </>
  )
}

export {
  OrderProducts
}