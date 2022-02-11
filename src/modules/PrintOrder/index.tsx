import { forwardRef, ForwardRefRenderFunction } from 'react';

import { 
  OrderHeader,
  OrderUser,
  OrderItems 
} from './components'

import { Order } from "../../models"

import { Box, Stack, Text } from '@chakra-ui/react'

type Props = {
  order: Order;
}

const PrintModule: ForwardRefRenderFunction<HTMLDivElement, Props> = ({ order }, ref) => {   
  return ( 
    <Box h="0" overflow="hidden">
      <Stack spacing="0.5" ref={ref} p="4">
        <OrderHeader 
          orderNumber={order?.numero_pedido} 
          orderDeliveryDate={order?.data_entrega}
        />
        <OrderUser
          userId={order?.cliente} 
          addressId={order?.endereco_entrega}
        />
        <Box            
          px="2"
          py="1"
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          w="100%"
          >
            <Text fontWeight="bold" >Condição de pagamento: {order?.condicao_pagamento ?? ''}</Text>
          </Box>
        <OrderItems
          order={order?.pedido}
          total={order?.total}
        />
      </Stack>
    </Box>
  )
}

export const PrintOrderModule = forwardRef(PrintModule)
