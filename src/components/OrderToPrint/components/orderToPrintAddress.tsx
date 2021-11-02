import {
  Flex,
  Box,
  Text
} from '@chakra-ui/react'

import { AddressProps } from '../../../types'

type OrderToPrintAddressProps = {
  address: AddressProps;
}

const OrderToPrintAddress = ({ address }: OrderToPrintAddressProps) => {
  return (
    <Flex justify="space-between">
      <Box>
        <Text fontSize="sm" fontWeight="bold">Endereço:</Text>
        <Text>{address.endereco}</Text>
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="bold">Bairro:</Text>
        <Text>{address.bairro}</Text>
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="bold">CEP:</Text>
        <Text>{address.cep}</Text>
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="bold">Cidade/UF:</Text>
        <Text>{address.cidade}/{address.estado}</Text>
      </Box>
    </Flex>
  )
}

export {
  OrderToPrintAddress
}