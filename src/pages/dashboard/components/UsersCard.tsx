import { Content } from "../../../components/Content"
import { useUsersQuery } from "../../../hooks/useUsersQuery"

import { 
  Spinner, 
  Stat,
  StatLabel,
  StatNumber, 
} from "@chakra-ui/react"

const UsersCard = () => {  
  const { data, isError, isLoading } = useUsersQuery() 
  
  return (
    <Content>
      <Stat>
        <StatLabel fontSize="medium">Clientes Cadastrados:</StatLabel>
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
  UsersCard
}