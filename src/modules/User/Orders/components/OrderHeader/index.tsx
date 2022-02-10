import { 
  handleFormatDate,
  handleFormatPadStart 
} from '../../../../../utils'

import {
  HStack,
  Box,
  Text,
} from '@chakra-ui/react'

type Props = {
 orderNumber: number;
 createdAt: Date;
 deliveryDate: Date;
}

const OrderHeader = ({
  orderNumber,
  createdAt,
  deliveryDate
}: Props) => {
  return (
    <HStack spacing={6} w="100%" justify="space-between" align="flex-start">
      <Box>
        <Text>Pedido: <strong>{handleFormatPadStart(orderNumber)}</strong></Text>
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