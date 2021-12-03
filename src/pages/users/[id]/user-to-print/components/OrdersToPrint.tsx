import { handleFormatDate } from "../../../../../utils/handleFormatDate"
import { handleFormatPrice } from "../../../../../utils/handleFormatPrice"

import { 
  Box,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td, 
  Center,
  Spinner,
} from "@chakra-ui/react"

import { OrderProps } from "../../../../../types"

type OrdersToPrintProps = {
  orders: OrderProps[]
}

const OrdersToPrint = ({ orders }: OrdersToPrintProps) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="4">

      { !orders 
        ? <Center>
            <Spinner color="blue.500"/>
          </Center>         
        : <Table variant="striped" size="sm" w="100%">
          <Thead>
            <Tr>
              <Th w="36">Pedido</Th>
              <Th>Data</Th>
              <Th w="36">Valor</Th>              
            </Tr>
          </Thead>
          <Tbody>
              { orders.map(order => {
              return (
                <Tr key={order.id}>
                  <Td>{order.numero_pedido}</Td>
                  <Td>{handleFormatDate(new Date(order.created_at))}</Td>
                  <Td>{handleFormatPrice(order.total)}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      }
    </Box>
  )
}

export {
  OrdersToPrint
}