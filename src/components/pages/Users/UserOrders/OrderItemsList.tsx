import { handleFormatPrice } from "../../../../utils/handleFormatPrice"

import { 
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "@chakra-ui/react"

import { OrderItemProps } from "../../../../types"

type OrderItemsListProps = {
  orderItems: OrderItemProps[]
}

const OrderItemsList = ({ orderItems }: OrderItemsListProps) => {
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th w="20" textAlign="center">Qtd</Th>
          <Th>Produtos</Th>
          <Th w="40" textAlign="end">Valor unitário</Th>
          <Th w="40" textAlign="end">Valor total</Th>
        </Tr>
      </Thead>
      <Tbody>                       
        { orderItems.map(item => {
          return (
            <Tr key={item.produto}>
              <Td textAlign="center">{item.quantidade}</Td>
              <Td>{item.produto}</Td>
              <Td textAlign="end">{handleFormatPrice(item.valor_unitario)}</Td>
              <Td textAlign="end">{handleFormatPrice(item.valor_total)}</Td>
            </Tr>
          )})
        }
      </Tbody>
    </Table>
  )
}

export {
  OrderItemsList
}