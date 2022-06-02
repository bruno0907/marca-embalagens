import { 
  HStack,
  Spinner, 
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Skeleton,  
} from "@chakra-ui/react"

import { Content } from "../../../../components"
import { useDraftsQuery } from "../../../../hooks"

export const DraftsCard = () => {  
  const { data, isError, isLoading, isFetching } = useDraftsQuery()

  if(isLoading) {
    return (
      <Content>
        <Stat>
          <StatLabel fontSize={['sm', 'sm', 'initial']}>Total de orçamentos</StatLabel>          
          <Skeleton h={10} mt={6}/>          
        </Stat>
      </Content>
    )
  }

  if(isError) {
    return (
      <Content>
        <Stat>
          <StatLabel fontSize={['sm', 'sm', 'initial']}>Total de orçamentos</StatLabel>          
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
            <Text fontSize={['sm', 'sm', 'initial']}>Total de orçamentos</Text>
            {isFetching && <Spinner color="blue.500" size="sm"/>}
          </HStack>
        </StatLabel>
        <StatNumber fontSize={['xx-large', 'xx-large', "xxx-large"]}>{data?.length}</StatNumber>
      </Stat>
    </Content>
  )
}
