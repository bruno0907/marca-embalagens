import { Content } from "../../../../../components/Content"
import { useEstimatesQuery } from "../../../../../hooks/useEstimatesQuery"

import { 
  HStack,
  Spinner, 
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Skeleton,  
} from "@chakra-ui/react"

export const EstimatesCard = () => {  
  const { data, isError, isLoading, isFetching } = useEstimatesQuery()

  if(isLoading) {
    return (
      <Content>
        <Stat>
          <StatLabel>Total de orçamentos</StatLabel>          
          <Skeleton h={10} mt={6}/>          
        </Stat>
      </Content>
    )
  }

  if(isError) {
    return (
      <Content>
        <Stat>
          <StatLabel>Total de orçamentos</StatLabel>          
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
            <Text>Total de orçamentos</Text>
            {isFetching && <Spinner color="blue.500" size="sm"/>}
          </HStack>
        </StatLabel>
        <StatNumber fontSize="xxx-large">{data?.length}</StatNumber>
      </Stat>
    </Content>
  )
}
