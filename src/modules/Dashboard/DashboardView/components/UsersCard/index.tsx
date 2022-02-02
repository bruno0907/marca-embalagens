import { Content } from "../../../../../components/Content"
import { useUsersQuery } from "../../../../../hooks/useUsersQuery"

import { 
  Spinner, 
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
  Text,
  HStack 
} from "@chakra-ui/react"

export const UsersCard = () => {  
  const { data, isError, isLoading, isFetching } = useUsersQuery() 
  
  if(isLoading) {
    return (
      <Content>
        <Stat>
          <StatLabel>Total de clientes</StatLabel>          
          <Skeleton h={10} mt={6}/>          
        </Stat>
      </Content>
    )
  }

  if(isError) {
    return (
      <Content>
        <Stat>
          <StatLabel>Total de clientes</StatLabel>          
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
            <Text>Total de clientes</Text>
            {isFetching && <Spinner color="blue.500" size="sm"/>}
          </HStack>
        </StatLabel>
        <StatNumber fontSize="xxx-large">{data?.length}</StatNumber>
      </Stat>
    </Content>
  )
}
