import { Content } from "../../../../../components/Content"
import { useOrdersQuery } from "../../../../../hooks/useOrdersQuery"

import { 
  HStack,
  Spinner, 
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Skeleton,  
} from "@chakra-ui/react"

export const OrdersCard = () => {  
  const { data, isError, isLoading, isFetching } = useOrdersQuery()

  if(isLoading) {
    return (
      <Content>
        <Stat>
          <StatLabel>Total de pedidos</StatLabel>          
          <Skeleton h={10} mt={6}/>          
        </Stat>
      </Content>
    )
  }

  if(isError) {
    return (
      <Content>
        <Stat>
          <StatLabel>Total de pedidos</StatLabel>          
          <Text fontSize="large" fontWeight="medium" mt={6}>Ocorreu um erro...</Text>
        </Stat>
      </Content>
    )
  }
  
  return (
    <Content>
      <Stat>
        <StatLabel fontSize="medium">
          <HStack spacing={3} align="center">
            <Text>Total de pedidos</Text>
            {isFetching && <Spinner color="blue.500" size="sm"/>}
          </HStack>
        </StatLabel>
        <StatNumber fontSize="xxx-large">{data?.length}</StatNumber>
      </Stat>
    </Content>
  )
}
