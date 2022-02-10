import { 
  Spinner, 
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
  Text,
  HStack 
} from "@chakra-ui/react"

import { Content } from "../../../../components"
import { useUsersQuery } from "../../../../hooks"

export const UsersCard = () => {  
  const { data, isError, isLoading, isFetching } = useUsersQuery() 
  
  if(isLoading) {
    return (
      <Content>
        <Stat>
          <StatLabel fontSize={['sm', 'sm', 'initial']}>Total de clientes</StatLabel>          
          <Skeleton h={10} mt={6}/>          
        </Stat>
      </Content>
    )
  }

  if(isError) {
    return (
      <Content>
        <Stat>
          <StatLabel fontSize={['sm', 'sm', 'initial']}>Total de clientes</StatLabel>          
          <Text fontSize="large" fontWeight="medium" mt={6}>Ocorreu um erro...</Text>
        </Stat>
      </Content>
    )
  }
  
  return (
    <Content>
      <Stat>
        <StatLabel>
          <HStack spacing={3} align="center">
            <Text fontSize={['sm', 'initial', 'initial']}>Total de clientes</Text>
            {isFetching && <Spinner color="blue.500" size="sm"/>}
          </HStack>
        </StatLabel>
        <StatNumber fontSize={['xx-large', 'xx-large', 'xxx-large']}>{data?.length}</StatNumber>
      </Stat>
    </Content>
  )
}
