import { 
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box
} from "@chakra-ui/react"

import { handleFormatPrice } from "../../../../../../utils"

import { OrderProduct } from "../../../../../../models"

type Props = {
  order: OrderProduct[]
  total: number;
}

export const OrderItems = ({ order, total }: Props) => {
  
  return (
    <Box p="1" borderWidth="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">      
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th w="115px" textAlign="end">Quantidade</Th>
            <Th>Produto</Th>
            <Th textAlign="end">Valor unitário</Th>
            <Th textAlign="end">Valor Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          { order?.map(orderItem => {
            return (
              <Tr key={orderItem.produto}>
                <Td textAlign="end">{orderItem.quantidade}</Td>
                <Td>{orderItem.produto}</Td>
                <Td textAlign="end">{handleFormatPrice(orderItem.valor_unitario)}</Td>
                <Td textAlign="end">{handleFormatPrice(orderItem.valor_total)}</Td>
              </Tr>
            )})}
          <Tr>
            <Td colSpan={4} textAlign="end" fontWeight="bold" py="2">            
              Total: {handleFormatPrice(total)}                
            </Td>
          </Tr>
        </Tbody>
      </Table>      
    </Box>
  )
}
