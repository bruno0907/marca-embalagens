import { handleFormatPrice } from "../../../../utils/handleFormatPrice"

import { 
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box
} from "@chakra-ui/react"

import { OrderItemProps } from "../../../../types"

type OrderProductsProps = {
  order: OrderItemProps[]
  total: number;
}

const OrderProducts = ({ order, total }: OrderProductsProps) => {
  
  return (
    <Box px={2} py={1} borderWidth="1px" borderColor="gray.100" borderRadius="md" overflow="hidden">      
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Produto</Th>
            <Th w="140px" textAlign="end">Quantidade</Th>
            <Th w="150px" textAlign="end">Valor unitário</Th>
            <Th w="140px" textAlign="end">Valor Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          { order.map(orderItem => {
            return (
              <Tr key={orderItem.produto}>
                <Td>{orderItem.produto}</Td>
                <Td textAlign="end">{orderItem.quantidade}</Td>
                <Td textAlign="end">{handleFormatPrice(orderItem.valor_unitario)}</Td>
                <Td textAlign="end">{handleFormatPrice(orderItem.valor_total)}</Td>
              </Tr>
            )})}
          <Tr>
            <Td colSpan={4} textAlign="end" fontWeight="bold" fontSize="larger" py={4}>            
              Total do pedido: {handleFormatPrice(total)}                
            </Td>
          </Tr>
        </Tbody>
      </Table>      
    </Box>
  )
}

export {
  OrderProducts
}