import { 
  Flex,
  Text
} from "@chakra-ui/react"

type OrderPaymentConditionsProps = {
  paymentCondition: string;
}

const OrderPaymentConditions = ({ paymentCondition }: OrderPaymentConditionsProps) => {
  return (
    <Flex mt="4" align="center">
      <Text fontSize="sm" fontWeight="bold" mr="2">Condição de pagamento:</Text>
      <Text>
        {paymentCondition}
      </Text>
    </Flex>
  )
}

export {
  OrderPaymentConditions
}