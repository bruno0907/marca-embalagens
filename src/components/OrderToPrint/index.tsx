import { forwardRef, ForwardRefRenderFunction } from "react"

import { useAddressQuery } from "../../hooks/useAddressQuery"
import { useProfileQuery } from "../../hooks/useProfileQuery"
import { useUserQuery } from "../../hooks/useUserQuery"

import { handleFormatPrice } from "../../utils/handleFormatPrice"
import { Divider } from "../Divider"

import { OrderToPrintProfile } from "./components/orderToPrintProfile"
import { OrderToPrintUser } from "./components/orderToPrintUser"
import { OrderToPrintAddress } from "./components/orderToPrintAddress"
import { OrderToPrintProducts } from "./components/orderToPrintProducts"

import { 
  Flex,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react"

import { NewOrderProps } from "../../types"
import { handleFormatDate } from "../../utils/handleFormatDate"
import { Logo } from "../Logo"

type OrderToPrintProps = {
  order: NewOrderProps;
}

const OrderToPrintRef: ForwardRefRenderFunction<
  HTMLDivElement, 
  OrderToPrintProps
> = ({ order }, ref) => {

  // Passar essas queries para dentro dos componentes
  const profile = useProfileQuery()
  const user = useUserQuery(order.cliente)
  const address = useAddressQuery(order.endereco_entrega)

  if(profile.error) {
    return (
      <Text>Erro ao carregar as informações do pedido...</Text>
    )
  }

  if(!user || !address) return null

  if(!profile.data?.data || !profile.data?.address || profile.isLoading) return null  

  return (
    <Flex flexDir="column" p="4" ref={ref} m="4" border="2px" borderColor="gray.400" borderRadius="md">
      <Flex justify="space-between">
        <Flex h="28" w="56" align="center" justify="center">
          <Logo />
        </Flex>
        <OrderToPrintProfile profile={profile.data.data} />
        <Flex flexDir="column">
          <Flex align="center">
            <Text mr="2" fontSize="large" mt="2">Número do pedido:</Text>
            <Text fontSize="xx-large" fontWeight="bold">{order.numero_pedido}</Text>            
          </Flex>
          <Flex align="center">
            <Text mr="2" fontSize="large" mt="2">Data de entrega:</Text>
            <Text fontSize="xx-large" fontWeight="bold">{handleFormatDate(order.data_entrega)}</Text>            
          </Flex>
        </Flex>
      </Flex>

      <Heading alignSelf="center" fontSize="x-large" py="8">Dados do pedido</Heading>

      <Box>
        <OrderToPrintUser user={user.data.data}/>
        <OrderToPrintAddress address={address.data.data} />
        <Box>
          <Text fontSize="sm" fontWeight="bold">Condição de pagamento:</Text>
          <Text>{order.condicao_pagamento}</Text>
        </Box>
      </Box>

      <Divider />

      <OrderToPrintProducts order={order.pedido} />

      <Flex justify="flex-end" pt="4">
        <Text fontWeight="bold" fontSize="large" mr="2" mt="4">
          Total do pedido:
        </Text>
        <Text fontWeight="bold" fontSize="xx-large">
          {handleFormatPrice(order.total)}
        </Text>
      </Flex>                    
    </Flex>
  )
}

const OrderToPrint = forwardRef(OrderToPrintRef)

export {
  OrderToPrint
}