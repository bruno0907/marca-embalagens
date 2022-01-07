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

type OrderProductsProps = {
  order: OrderItemProps[]
}

const OrderProducts = ({ order }: OrderProductsProps) => {
  
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th w="10">Qtd</Th>
          <Th>Produto</Th>
          <Th w="36">Valor unitário</Th>
          <Th w="30">Valor Total</Th>
        </Tr>
      </Thead>
      <Tbody>
        { order.map(orderItem => {
          return (
            <Tr key={orderItem.produto}>
              <Td>{orderItem.quantidade}</Td>
              <Td>{orderItem.produto}</Td>
              <Td>{handleFormatPrice(orderItem.valor_unitario)}</Td>
              <Td>{handleFormatPrice(orderItem.valor_total)}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export {
  OrderProducts
}