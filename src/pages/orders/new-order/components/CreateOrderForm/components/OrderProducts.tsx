import { OrderItemProps } from "../../../../../../types"
import { handleFormatPrice } from "../../../../../../utils/handleFormatPrice"

import { Table } from "../../../../../../components/Table"

import { Thead, Tr, Th, Td, Tbody, Button, Flex } from "@chakra-ui/react"
import { FiTrash2 } from "react-icons/fi"

type Props = {
  orderProducts: OrderItemProps[]
  setOrderProducts: (OrderProducts: OrderItemProps[]) => void  
  orderTotal: number;
  setOrderTotal: (orderTotal: number) => void
}

const OrderProducts = ({ orderProducts, setOrderProducts, orderTotal, setOrderTotal }: Props) => {
  
  const handleRemoveItemFromOrder = (itemIndex: number) => {
    const currentOrderProducts = [...orderProducts]

    const updatedOrderProducts = currentOrderProducts.filter((_, index) => index !== itemIndex)

    setOrderProducts(updatedOrderProducts)
    
    const sumTotal = getSumTotal(updatedOrderProducts)
  
    setOrderTotal(sumTotal)
  }

  const getSumTotal = (order: OrderItemProps[]) => {
    return order.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
  } 

  return (
    <Table>
      <Thead>
        <Tr bgColor="blue.500">
          <Th color="gray.50" w="10" textAlign="center">Qtd</Th>
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
              <Td textAlign="center">{orderProduct.quantidade}</Td>
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
  )
}

export {
  OrderProducts
}