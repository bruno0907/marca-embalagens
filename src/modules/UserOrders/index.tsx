import { Content } from "../../components"
import { handleFormatPrice } from "../../utils"

import { OrderHeader, OrderItemsList } from "./components"

import { Order } from "../../models"

import { Box, Heading, Stack, Text } from "@chakra-ui/react"

type Props = {
  orders: Order[]
}

export const UserOrdersModule = ({ orders }: Props) => {
  return (
    <Content>
      <Stack spacing={6}>
        {orders.map(order => {
          return (                
            <Box key={order.id}>
              <Stack borderWidth="thin" p="4" borderRadius="md" spacing={6}>
                <OrderHeader
                  orderNumber={order.numero_pedido}
                  createdAt={order.created_at}
                  deliveryDate={order.data_entrega}
                />                      
                <Heading fontSize="large" textAlign="center">Descrição do pedido:</Heading>                      
                <OrderItemsList orderItems={order.pedido}/>
                <Text textAlign="end" px="1"><strong>Total do pedido: </strong>{handleFormatPrice(order.total)}</Text>
              </Stack>
            </Box>    
          )
        })}
      </Stack>
    </Content>    
  )
}