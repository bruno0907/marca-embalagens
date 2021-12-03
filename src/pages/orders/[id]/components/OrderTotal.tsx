import { handleFormatPrice } from '../../../../utils/handleFormatPrice'

import { Text } from '@chakra-ui/react'

type OrderTotalProps = {
  orderTotal: number;
}

const OrderTotal = ({ orderTotal }: OrderTotalProps) => {
  return (
    <Text fontWeight="bold" fontSize="large" textAlign="end">
      Total do pedido: {handleFormatPrice(orderTotal)}
    </Text>
  )  
}

export {
  OrderTotal
}