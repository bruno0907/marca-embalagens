import { handleFormatPrice } from '../../../utils/handleFormatPrice'

import { OrderItemProps } from '../../../types'

import {
  Table,
  Thead,
  Td,
  Th,
  Tbody,
  Tr,
} from '@chakra-ui/react'

type OrderToPrintProductsProps = {
  order: OrderItemProps[]
}

const OrderToPrintProducts = ({ order }: OrderToPrintProductsProps) => {
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th w="28">Qtd</Th>
          <Th>Produto</Th>
          <Th w="40">Valor unitário</Th>
          <Th w="40">Valor Total</Th>
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
  OrderToPrintProducts
}