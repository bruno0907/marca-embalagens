import { handleFormatDate } from '../../../../../utils/handleFormatDate'

import {
  HStack,
  Box,
  Text,
} from '@chakra-ui/react'

type OrderHeaderProps = {
 orderNumber: number;
 createdAt: Date;
 deliveryDate: Date;
}

const OrderHeader = ({
  orderNumber,
  createdAt,
  deliveryDate
}: OrderHeaderProps) => {
  return (
    <HStack spacing={6} w="100%" justify="space-between">
      <Box>
        <Text>Pedido: <strong>{orderNumber}</strong></Text>
      </Box>
      <Box>
        <Text>Data de emissão: <strong>{handleFormatDate(createdAt)}</strong></Text>
      </Box>
      <Box>
        <Text>Data de entrega: <strong>{handleFormatDate(deliveryDate)}</strong></Text>
      </Box>
    </HStack>
  )
}

export { OrderHeader }