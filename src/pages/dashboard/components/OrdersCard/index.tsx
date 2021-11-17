import { Content } from "../../../../components/Content"
import { useOrdersQuery } from "../../../../hooks/useOrdersQuery"

import { 
  Spinner, 
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"

const OrdersCard = () => {  
  const { data, isError, isLoading } = useOrdersQuery()
  
  return (
    <Content>
      <Stat>
        <StatLabel fontSize="medium">Total de pedidos:</StatLabel>
        { 
          isError ? (
            <StatNumber>Ocorreu um erro...</StatNumber>
          ) : isLoading ? (
            <Spinner color="blue.500" size="lg"/>
          ) : (
            <StatNumber fontSize="xxx-large">{data?.length}</StatNumber>
          )
        }
      </Stat>
    </Content>
  )
}

export {
  OrdersCard
}