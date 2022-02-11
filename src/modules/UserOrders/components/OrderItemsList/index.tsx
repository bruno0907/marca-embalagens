import { 
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,  
  TableBodyProps,
  Box
} from "@chakra-ui/react"

import { OrderProduct } from "../../../../models"

import { handleFormatPrice } from "../../../../utils"

type Props = TableBodyProps & {
  orderItems: OrderProduct[]
}

export const OrderItemsList = ({ orderItems }: Props) => {
  return (
    <Box overflowY="auto">
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th minW="60px" textAlign="center">Qtd</Th>
            <Th minW="225px">Produtos</Th>
            <Th minW="145px">Valor unitário</Th>
            <Th minW="125px">Valor total</Th>
          </Tr>
        </Thead>
        <Tbody>                       
          { orderItems.map(item => {
            return (
              <Tr key={item.produto}>
                <Td textAlign="center">{item.quantidade}</Td>
                <Td>{item.produto}</Td>
                <Td>{handleFormatPrice(item.valor_unitario)}</Td>
                <Td>{handleFormatPrice(item.valor_total)}</Td>
              </Tr>
            )})
          }
        </Tbody>
      </Table>
    </Box>
  )
}
